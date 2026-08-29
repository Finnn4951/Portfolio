const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function handler(req, res) {

    /* =====================================================
       ONLY POST REQUEST
    ===================================================== */

    if (req.method !== "POST") {

        return res.status(405).json({
            success: false,
            message: "Method not allowed."
        });

    }


    try {

        const {
            name,
            email,
            subject,
            message
        } = req.body;


        /* =================================================
           VALIDATION
        ================================================= */

        if (
            !name ||
            !email ||
            !subject ||
            !message
        ) {

            return res.status(400).json({
                success: false,
                message: "Please complete all fields."
            });

        }


        /* =================================================
           BASIC EMAIL VALIDATION
        ================================================= */

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailRegex.test(email)) {

            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            });

        }


        /* =================================================
           SEND EMAIL
        ================================================= */

        const { data, error } =
            await resend.emails.send({

                from:
                    "Portfolio Contact <onboarding@resend.dev>",

                to: [
                    process.env.CONTACT_EMAIL
                ],

                replyTo: email,

                subject:
                    `[Portfolio] ${subject}`,

                html: `

                    <div style="
                        font-family: Arial, sans-serif;
                        max-width: 650px;
                        margin: auto;
                        padding: 30px;
                        color: #222;
                    ">

                        <h2>
                            New Portfolio Message
                        </h2>

                        <hr>

                        <p>
                            <strong>Name:</strong>
                            ${escapeHtml(name)}
                        </p>

                        <p>
                            <strong>Email:</strong>
                            ${escapeHtml(email)}
                        </p>

                        <p>
                            <strong>Subject:</strong>
                            ${escapeHtml(subject)}
                        </p>

                        <div style="
                            margin-top: 25px;
                            padding: 20px;
                            background: #f5f5f5;
                            border-radius: 10px;
                        ">

                            <strong>Message</strong>

                            <p style="
                                white-space: pre-wrap;
                                line-height: 1.6;
                            ">
                                ${escapeHtml(message)}
                            </p>

                        </div>

                    </div>

                `

            });


        /* =================================================
           RESEND ERROR
        ================================================= */

        if (error) {

            console.error(error);

            return res.status(500).json({

                success: false,

                message:
                    "Failed to send message."

            });

        }


        /* =================================================
           SUCCESS
        ================================================= */

        return res.status(200).json({

            success: true,

            message:
                "Message sent successfully.",

            id: data?.id || null

        });


    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message:
                "Something went wrong."

        });

    }

};


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}