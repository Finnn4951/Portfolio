const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function handler(req, res) {

    // =====================================================
    // ONLY ALLOW POST
    // =====================================================

    if (req.method !== "POST") {

        return res.status(405).json({
            success: false,
            message: "Method not allowed."
        });

    }


    try {

        // =================================================
        // GET DATA
        // =================================================

        const {
            name,
            email,
            subject,
            message
        } = req.body || {};


        // =================================================
        // VALIDATION
        // =================================================

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


        // =================================================
        // BASIC EMAIL VALIDATION
        // =================================================

        const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            });

        }


        // =================================================
        // CLEAN DATA
        // =================================================

        const cleanName =
            String(name).trim();

        const cleanEmail =
            String(email).trim();

        const cleanSubject =
            String(subject).trim();

        const cleanMessage =
            String(message).trim();


        // =================================================
        // SEND EMAIL
        // =================================================

        const { data, error } =
            await resend.emails.send({

                /*
                 * Untuk awal, gunakan alamat Resend.
                 * Setelah domain kamu diverifikasi di Resend,
                 * ganti dengan email dari domain tersebut.
                 */

                from:
                    "Finn Portfolio <onboarding@resend.dev>",

                to: [
                    process.env.CONTACT_EMAIL
                ],

                subject:
                    `[Portfolio] ${cleanSubject}`,

                replyTo:
                    cleanEmail,

                html: `

                    <div style="
                        font-family:
                            Arial,
                            Helvetica,
                            sans-serif;

                        max-width: 680px;
                        margin: 0 auto;
                        padding: 32px;

                        color: #17113d;
                        background: #ffffff;
                    ">

                        <div style="
                            margin-bottom: 30px;
                            padding-bottom: 20px;
                            border-bottom:
                                1px solid #e5e7eb;
                        ">

                            <p style="
                                margin: 0 0 8px;
                                font-size: 12px;
                                letter-spacing: 2px;
                                color: #777;
                            ">
                                FINN PORTFOLIO
                            </p>

                            <h1 style="
                                margin: 0;
                                font-size: 28px;
                            ">
                                New Contact Message
                            </h1>

                        </div>


                        <div style="
                            margin-bottom: 24px;
                        ">

                            <p style="
                                margin: 0 0 6px;
                                font-size: 12px;
                                color: #777;
                                text-transform: uppercase;
                                letter-spacing: 1px;
                            ">
                                Name
                            </p>

                            <p style="
                                margin: 0;
                                font-size: 17px;
                                font-weight: 600;
                            ">
                                ${escapeHtml(cleanName)}
                            </p>

                        </div>


                        <div style="
                            margin-bottom: 24px;
                        ">

                            <p style="
                                margin: 0 0 6px;
                                font-size: 12px;
                                color: #777;
                                text-transform: uppercase;
                                letter-spacing: 1px;
                            ">
                                Email
                            </p>

                            <p style="
                                margin: 0;
                                font-size: 17px;
                            ">
                                ${escapeHtml(cleanEmail)}
                            </p>

                        </div>


                        <div style="
                            margin-bottom: 24px;
                        ">

                            <p style="
                                margin: 0 0 6px;
                                font-size: 12px;
                                color: #777;
                                text-transform: uppercase;
                                letter-spacing: 1px;
                            ">
                                Subject
                            </p>

                            <p style="
                                margin: 0;
                                font-size: 17px;
                                font-weight: 600;
                            ">
                                ${escapeHtml(cleanSubject)}
                            </p>

                        </div>


                        <div>

                            <p style="
                                margin: 0 0 10px;
                                font-size: 12px;
                                color: #777;
                                text-transform: uppercase;
                                letter-spacing: 1px;
                            ">
                                Message
                            </p>

                            <div style="
                                padding: 20px;
                                background: #f7f7f9;
                                border-radius: 12px;

                                font-size: 16px;
                                line-height: 1.7;

                                white-space: pre-wrap;
                            ">
                                ${escapeHtml(cleanMessage)}
                            </div>

                        </div>


                        <div style="
                            margin-top: 35px;
                            padding-top: 20px;
                            border-top:
                                1px solid #e5e7eb;

                            font-size: 12px;
                            color: #888;
                        ">

                            Sent from
                            <strong>
                                Finn Portfolio
                            </strong>

                        </div>

                    </div>

                `

            });


        // =================================================
        // RESEND ERROR
        // =================================================

        if (error) {

            console.error(
                "Resend error:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "Unable to send the message right now."
            });

        }


        // =================================================
        // SUCCESS
        // =================================================

        return res.status(200).json({

            success: true,

            message:
                "Message sent successfully.",

            id:
                data?.id || null

        });


    } catch (error) {

        console.error(
            "Contact API error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Something went wrong while sending your message."

        });

    }

};


// =========================================================
// ESCAPE HTML
// Prevent user input from becoming HTML
// =========================================================

function escapeHtml(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}