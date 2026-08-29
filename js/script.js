/* =========================================================
   Finn — VISUAL CREATIVE PORTFOLIO
   CLEAN / FINAL JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. CAMERA PAGE LOADER
    ===================================================== */

    const loader = document.getElementById("camera-loader");
    const loaderNumber = loader?.querySelector(".loader-number");
    const focusText = loader?.querySelector(".focus-text span");

    if (loader) {

        let progress = 0;
        let finished = false;

        const finishLoader = () => {

            if (finished) return;

            finished = true;
            progress = 100;

            if (loaderNumber) {
                loaderNumber.textContent = "100";
            }

            if (focusText) {
                focusText.textContent = "LOCKED";
            }

            setTimeout(() => {

                loader.classList.add("shutter-fired");

                setTimeout(() => {

                    loader.classList.add("hidden");

                    setTimeout(() => {
                        loader.remove();
                    }, 900);

                }, 850);

            }, 450);
        };


        const loadingInterval = setInterval(() => {

            if (finished) {
                clearInterval(loadingInterval);
                return;
            }

            let increment;

            if (progress < 30) {

                increment =
                    Math.floor(Math.random() * 5) + 2;

            } else if (progress < 75) {

                increment =
                    Math.floor(Math.random() * 9) + 3;

            } else {

                increment =
                    Math.floor(Math.random() * 4) + 1;

            }

            progress =
                Math.min(
                    progress + increment,
                    100
                );


            if (loaderNumber) {

                loaderNumber.textContent =
                    String(progress).padStart(2, "0");

            }


            if (progress >= 100) {

                clearInterval(loadingInterval);

                finishLoader();

            }

        }, 90);


        /* Safety fallback: never leave the page blocked. */

        setTimeout(
            finishLoader,
            5000
        );
    }



    /* =====================================================
       02. ELEMENT REFERENCES
    ===================================================== */

    const navMenu =
        document.querySelector(".nav-menu");

    const menuToggle =
        document.querySelector(".menu-toggle");


    const navLinks =
        document.querySelectorAll(
            '.nav-menu a[href^="#"]'
        );


    const sections =
        Array.from(
            document.querySelectorAll(
                "main > section[id]"
            )
        );


    const portfolioTabs =
        document.querySelectorAll(
            ".portfolio-tab"
        );


    const portfolioPanels =
        document.querySelectorAll(
            ".portfolio-panel"
        );



    /* =====================================================
       03. MOBILE NAVIGATION
    ===================================================== */

    const closeMobileMenu = () => {

        if (navMenu) {

            navMenu.classList.remove(
                "active"
            );

        }


        if (menuToggle) {

            menuToggle.classList.remove(
                "active"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    };


    if (menuToggle && navMenu) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    navMenu.classList.toggle(
                        "active"
                    );


                menuToggle.classList.toggle(
                    "active",
                    isOpen
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

            }
        );

    }


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });



    /* =====================================================
       04. HERO TYPEWRITER
    ===================================================== */

    const typewriter =
        document.getElementById(
            "typewriter"
        );


    const roles = [
        "Photography",
        "Graphic Design",
        "Programming",
        "Digital Media"
    ];


    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let typewriterTimer = null;


    const typingSpeed = 90;
    const deletingSpeed = 55;
    const pauseAfterTyping = 1800;
    const pauseAfterDeleting = 400;


    function typeRole() {

        if (
            !typewriter ||
            document.hidden
        ) {

            typewriterTimer =
                setTimeout(
                    typeRole,
                    1000
                );

            return;
        }


        const currentRole =
            roles[roleIndex];


        /* ================================
           TYPING
        ================================= */

        if (!deleting) {

            characterIndex++;


            typewriter.textContent =
                currentRole.substring(
                    0,
                    characterIndex
                );


            if (
                characterIndex >=
                currentRole.length
            ) {

                deleting = true;


                typewriterTimer =
                    setTimeout(
                        typeRole,
                        pauseAfterTyping
                    );


                return;
            }


            typewriterTimer =
                setTimeout(
                    typeRole,
                    typingSpeed
                );


            return;
        }



        /* ================================
           DELETING
        ================================= */

        characterIndex--;


        typewriter.textContent =
            currentRole.substring(
                0,
                characterIndex
            );


        if (characterIndex <= 0) {

            characterIndex = 0;

            deleting = false;


            roleIndex =
                (roleIndex + 1) %
                roles.length;


            typewriterTimer =
                setTimeout(
                    typeRole,
                    pauseAfterDeleting
                );


            return;
        }


        typewriterTimer =
            setTimeout(
                typeRole,
                deletingSpeed
            );

    }


    if (typewriter) {

        typeRole();


        document.addEventListener(
            "visibilitychange",
            () => {

                if (
                    !document.hidden &&
                    !typewriterTimer
                ) {

                    typeRole();

                }

            }
        );

    }



    /* =====================================================
       05. PORTFOLIO TABS
    ===================================================== */

    const activatePortfolioPanel =
        target => {

            if (!target) return;


            const targetPanel =
                document.getElementById(
                    target
                );


            if (!targetPanel) return;



            /* Active tab */

            portfolioTabs.forEach(tab => {

                tab.classList.toggle(
                    "active",
                    tab.dataset.target === target
                );

            });



            /* Active panel */

            portfolioPanels.forEach(panel => {

                panel.classList.toggle(
                    "active",
                    panel === targetPanel
                );

            });



            /* Restart panel animation */

            targetPanel.style.animation =
                "none";

            void targetPanel.offsetWidth;

            targetPanel.style.animation =
                "";



            /* Restart stagger items */

            const staggerItems =
                targetPanel.querySelectorAll(
                    ".stagger-item"
                );


            staggerItems.forEach(item => {

                item.classList.remove(
                    "show"
                );

            });


            requestAnimationFrame(() => {

                staggerItems.forEach(
                    (item, index) => {

                        setTimeout(() => {

                            item.classList.add(
                                "show"
                            );

                        }, index * 80);

                    }
                );

            });

        };


    portfolioTabs.forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                activatePortfolioPanel(
                    tab.dataset.target
                );

            }
        );

    });



    /* =====================================================
       06. WORK FILTER
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(
            ".filter-btn"
        );


    const workCards =
        document.querySelectorAll(
            ".work-card"
        );


    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const filter =
                    button.dataset.filter ||
                    button.dataset.category ||
                    "all";


                /* Active button */

                filterButtons.forEach(btn => {

                    btn.classList.toggle(
                        "active",
                        btn === button
                    );

                });


                /* Filter cards */

                workCards.forEach(card => {

                    const category =
                        card.dataset.category ||
                        "";


                    const shouldShow =
                        filter === "all" ||
                        category === filter;


                    if (shouldShow) {

                        card.style.display =
                            "";


                        requestAnimationFrame(
                            () => {

                                card.style.opacity =
                                    "1";

                                card.style.transform =
                                    "translateY(0)";

                            }
                        );

                    } else {

                        card.style.opacity =
                            "0";

                        card.style.transform =
                            "translateY(10px)";


                        setTimeout(() => {

                            if (
                                card.style.opacity ===
                                "0"
                            ) {

                                card.style.display =
                                    "none";

                            }

                        }, 250);

                    }

                });

            }
        );

    });



    /* =====================================================
       07. LIGHTBOX
    ===================================================== */

    const lightbox =
        document.getElementById(
            "lightbox"
        );


    const lightboxClose =
        document.getElementById(
            "lightboxClose"
        );


    const lightboxImage =
        lightbox?.querySelector(
            ".lightbox-image"
        );


    const lightboxTitle =
        lightbox?.querySelector(
            ".lightbox-title"
        );


    const lightboxCategory =
        lightbox?.querySelector(
            ".lightbox-category"
        );


    const lightboxDescription =
        lightbox?.querySelector(
            ".lightbox-description"
        );


    const openLightbox =
        card => {

            if (
                !lightbox ||
                !card
            ) return;


            const image =
                card.querySelector(
                    "img"
                );


            const title =
                card.dataset.title ||
                card.querySelector(
                    ".work-title"
                )?.textContent ||
                "Project";


            const category =
                card.dataset.category ||
                card.querySelector(
                    ".work-category"
                )?.textContent ||
                "WORK";


            const description =
                card.dataset.description ||
                "Creative project by Finn";



            /* Image */

            if (lightboxImage) {

                lightboxImage.innerHTML =
                    "";


                if (image) {

                    const clonedImage =
                        image.cloneNode(
                            true
                        );


                    clonedImage.removeAttribute(
                        "loading"
                    );


                    clonedImage.style.width =
                        "100%";

                    clonedImage.style.height =
                        "100%";

                    clonedImage.style.objectFit =
                        "contain";


                    lightboxImage.appendChild(
                        clonedImage
                    );

                } else {

                    const placeholder =
                        document.createElement(
                            "span"
                        );


                    placeholder.textContent =
                        "PROJECT PREVIEW";


                    lightboxImage.appendChild(
                        placeholder
                    );

                }

            }



            /* Text */

            if (lightboxTitle) {

                lightboxTitle.textContent =
                    title.trim();

            }


            if (lightboxCategory) {

                lightboxCategory.textContent =
                    category
                        .trim()
                        .toUpperCase();

            }


            if (lightboxDescription) {

                lightboxDescription.textContent =
                    description.trim();

            }



            /* Show */

            lightbox.classList.add(
                "active"
            );


            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.style.overflow =
                "hidden";

        };



    const closeLightbox =
        () => {

            if (!lightbox) return;


            lightbox.classList.remove(
                "active"
            );


            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.style.overflow =
                "";

        };



    workCards.forEach(card => {

        card.addEventListener(
            "click",
            event => {

                /*
                 * Allow links/buttons
                 * inside a card to work normally.
                 */

                if (
                    event.target.closest(
                        "a, button"
                    ) &&
                    !event.target.closest(
                        ".work-card"
                    )
                ) {

                    return;

                }


                openLightbox(card);

            }
        );

    });



    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }



    /* =====================================================
       08. KEYBOARD CONTROLS
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeLightbox();

                closeMobileMenu();

            }

        }
    );



    /* =====================================================
       09. SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) return;


                    event.preventDefault();



                    const header =
                        document.querySelector(
                            ".site-header"
                        );


                    const offset =
                        header?.offsetHeight ||
                        0;


                    const targetPosition =
                        target
                            .getBoundingClientRect()
                            .top +
                        window.scrollY -
                        offset;


                    window.scrollTo({

                        top:
                            Math.max(
                                targetPosition,
                                0
                            ),

                        behavior:
                            "smooth"

                    });

                }
            );

        });



    /* =====================================================
       10. ACTIVE NAVIGATION

       Home → About → Portfolio → Memory → Contact
    ===================================================== */

    let activeSection = "";


    const updateActiveNavigation =
        () => {

            if (!sections.length)
                return;


            const header =
                document.querySelector(
                    ".site-header"
                );


            const headerOffset =
                header?.offsetHeight ||
                0;


            /*
             * The point used to determine
             * which section is currently active.
             */

            const point =
                window.scrollY +
                headerOffset +
                window.innerHeight *
                0.25;


            let current =
                sections[0].id;


            sections.forEach(section => {

                if (
                    point >=
                    section.offsetTop
                ) {

                    current =
                        section.id;

                }

            });



            /* Bottom-of-page correction */

            const bottomReached =
                window.innerHeight +
                window.scrollY >=
                document.documentElement
                    .scrollHeight -
                8;


            if (bottomReached) {

                current =
                    sections[
                        sections.length - 1
                    ].id;

            }



            if (
                current ===
                activeSection
            ) {

                return;

            }


            activeSection =
                current;



            /* Update navbar */

            navLinks.forEach(link => {

                const target =
                    link.getAttribute(
                        "href"
                    );


                link.classList.toggle(
                    "active",
                    target ===
                    `#${current}`
                );

            });

        };



    let navigationTicking =
        false;


    const requestNavigationUpdate =
        () => {

            if (
                navigationTicking
            ) {

                return;

            }


            navigationTicking =
                true;


            requestAnimationFrame(
                () => {

                    updateActiveNavigation();

                    navigationTicking =
                        false;

                }
            );

        };



    window.addEventListener(
        "scroll",
        requestNavigationUpdate,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        requestNavigationUpdate,
        {
            passive: true
        }
    );


    updateActiveNavigation();



    /* =====================================================
       11. RIGHT SIDE SECTION DOTS
    ===================================================== */

    const sectionDots =
        document.querySelectorAll(
            ".section-dot"
        );


    sectionDots.forEach(dot => {

        dot.addEventListener(
            "click",
            event => {

                const target =
                    dot.dataset.target ||
                    dot.getAttribute(
                        "href"
                    );


                if (!target) return;


                const targetId =
                    target.startsWith("#")
                        ? target
                        : `#${target}`;


                const section =
                    document.querySelector(
                        targetId
                    );


                if (!section)
                    return;


                event.preventDefault();


                const header =
                    document.querySelector(
                        ".site-header"
                    );


                const offset =
                    header?.offsetHeight ||
                    0;


                const position =
                    section
                        .getBoundingClientRect()
                        .top +
                    window.scrollY -
                    offset;


                window.scrollTo({

                    top:
                        Math.max(
                            position,
                            0
                        ),

                    behavior:
                        "smooth"

                });

            }
        );

    });



    const updateSectionDots =
        () => {

            const current =
                activeSection;


            sectionDots.forEach(dot => {

                const target =
                    dot.dataset.target ||
                    dot
                        .getAttribute(
                            "href"
                        )
                        ?.replace(
                            "#",
                            ""
                        );


                dot.classList.toggle(
                    "active",
                    target ===
                    current
                );

            });

        };



    window.addEventListener(
        "scroll",
        updateSectionDots,
        {
            passive: true
        }
    );


    updateSectionDots();



    /* =====================================================
       12. CURSOR GLOW
    ===================================================== */

    const cursorGlow =
        document.querySelector(
            ".cursor-glow"
        );


    if (
        cursorGlow &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let glowX = 0;
        let glowY = 0;


        document.addEventListener(
            "mousemove",
            event => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;

            },
            {
                passive: true
            }
        );


        const animateCursor =
            () => {

                glowX +=
                    (
                        mouseX -
                        glowX
                    ) * 0.08;


                glowY +=
                    (
                        mouseY -
                        glowY
                    ) * 0.08;


                cursorGlow.style.left =
                    `${glowX}px`;


                cursorGlow.style.top =
                    `${glowY}px`;


                requestAnimationFrame(
                    animateCursor
                );

            };


        animateCursor();

    }



    /* =====================================================
       13. SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, " +
            ".reveal-left, " +
            ".reveal-right, " +
            ".reveal-scale, " +
            ".stagger-item"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            entry.target.classList.add(
                                "show"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },

                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -50px 0px"
                }

            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "show"
                );

            }
        );

    }



    /* =====================================================
       15. BUTTON HOVER EFFECT
    ===================================================== */

    const interactiveButtons =
        document.querySelectorAll(
            ".btn, .social-link, .filter-btn"
        );


    interactiveButtons.forEach(
        button => {

            button.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        button.getBoundingClientRect();


                    const x =
                        (
                            (
                                event.clientX -
                                rect.left
                            ) /
                            rect.width
                        ) * 100;


                    const y =
                        (
                            (
                                event.clientY -
                                rect.top
                            ) /
                            rect.height
                        ) * 100;


                    button.style.setProperty(
                        "--mouse-x",
                        `${x}%`
                    );


                    button.style.setProperty(
                        "--mouse-y",
                        `${y}%`
                    );

                }
            );

        }
    );



    /* =====================================================
       16. BACK TO TOP
    ===================================================== */

    const backTop =
        document.querySelector(
            ".back-top"
        );


    backTop?.addEventListener(
        "click",
        event => {

            event.preventDefault();


            window.scrollTo({

                top: 0,

                behavior:
                    "smooth"

            });

        }
    );



    /* =====================================================
       17. HEADER SCROLL EFFECT
    ===================================================== */

    const header =
        document.querySelector(
            ".site-header"
        );


    const updateHeader =
        () => {

            if (!header)
                return;


            header.classList.toggle(
                "scrolled",
                window.scrollY > 50
            );

        };


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();



    /* =====================================================
       18. IMAGE SAFETY
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(image => {

            image.setAttribute(
                "draggable",
                "false"
            );


            image.addEventListener(
                "error",
                () => {

                    image.classList.add(
                        "image-error"
                    );

                }
            );

        });



    /* =====================================================
       19. CONSOLE
    ===================================================== */

    console.log(
        "%c FINN PORTFOLIO ",
        "background:#17113d;color:#a78bfa;" +
        "font-size:16px;font-weight:bold;" +
        "padding:8px 14px;"
    );


    console.log(
        "Portfolio system initialized."
    );

});
/* =====================================================
   CONTACT FORM — VERCEL + RESEND
===================================================== */

const contactForm = document.getElementById("contactForm");
const contactSubmit = document.getElementById("contactSubmit");
const formStatus = document.getElementById("formStatus");

if (contactForm) {

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const subjectInput = document.getElementById("subject");
        const messageInput = document.getElementById("message");

        const name = nameInput?.value.trim();
        const email = emailInput?.value.trim();
        const subject = subjectInput?.value.trim();
        const message = messageInput?.value.trim();

        /* ==============================
           VALIDATION
        ============================== */

        if (!name || !email || !subject || !message) {

            if (formStatus) {
                formStatus.textContent =
                    "Please complete all fields.";
                formStatus.className =
                    "form-status error";
            }

            return;
        }

       const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            if (formStatus) {
                formStatus.textContent =
                    "Please enter a valid email address.";
                formStatus.className =
                    "form-status error";
            }

            return;
        }

        /* ==============================
           LOADING
        ============================== */

        if (contactSubmit) {

            contactSubmit.disabled = true;

            contactSubmit.classList.add(
                "is-loading"
            );

            const text =
                contactSubmit.querySelector(
                    ".submit-text"
                );

            if (text) {
                text.textContent = "Sending...";
            }
        }

        if (formStatus) {

            formStatus.textContent =
                "Sending your message...";

            formStatus.className =
                "form-status";
        }

        /* ==============================
           SEND TO VERCEL API
        ============================== */

        try {

            const response = await fetch(
                "/api/contact",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        subject,
                        message
                    })
                }
            );

            const responseText = await response.text();

let result;

try {
    result = JSON.parse(responseText);
} catch {
    console.error("Server response:", responseText);

    throw new Error(
        "Server returned an invalid response."
    );
}

            /* ==========================
               SERVER ERROR
            ========================== */

            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Failed to send message."
                );
            }

            /* ==========================
               SUCCESS
            ========================== */

            if (formStatus) {

                formStatus.textContent =
                    "✓ Message sent successfully.";

                formStatus.className =
                    "form-status success";
            }

            contactForm.reset();

        } catch (error) {

            console.error(
                "Contact form error:",
                error
            );

            if (formStatus) {

                formStatus.textContent =
                    "✕ " +
                    (
                        error.message ||
                        "Unable to send message."
                    );

                formStatus.className =
                    "form-status error";
            }

        } finally {

            /* ==========================
               RESTORE BUTTON
            ========================== */

            if (contactSubmit) {

                contactSubmit.disabled = false;

                contactSubmit.classList.remove(
                    "is-loading"
                );

                const text =
                    contactSubmit.querySelector(
                        ".submit-text"
                    );

                if (text) {
                    text.textContent =
                        "Send Message";
                }
            }
        }

    });

}