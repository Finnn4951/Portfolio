/* =========================================================
   PORTFOLIO 2.0
   FINN — INTERACTION SYSTEM
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const loader = document.getElementById("camera-loader");
    const loaderNumber = document.querySelector(".loader-number");

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    const sections = document.querySelectorAll("main section[id]");


    /* =====================================================
       LOADER
    ===================================================== */

    let progress = 0;

    const loaderInterval = setInterval(() => {

        progress += Math.floor(
            Math.random() * 8
        ) + 3;

        if (progress >= 100) {
            progress = 100;
            clearInterval(loaderInterval);

            if (loaderNumber) {
                loaderNumber.textContent = "100%";
            }

            setTimeout(() => {

                loader?.classList.add("loaded");

                document.body.classList.remove(
                    "no-scroll"
                );

            }, 350);

            return;
        }

        if (loaderNumber) {
            loaderNumber.textContent =
                `${progress}%`;
        }

    }, 70);


    document.body.classList.add("no-scroll");


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    function closeMenu() {

        navMenu?.classList.remove("active");

        menuToggle?.classList.remove("active");

        menuToggle?.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    menuToggle?.addEventListener("click", () => {

        const isOpen =
            navMenu?.classList.toggle("active");

        menuToggle.classList.toggle(
            "active",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    navLinks.forEach(link => {

        link.addEventListener("click", () => {
            closeMenu();
        });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", event => {

        if (
            navMenu &&
            menuToggle &&
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }

    });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".about-copy, " +
        ".about-details, " +
        ".works-cta-inner, " +
        ".education-item, " +
        ".memory-card, " +
        ".contact-title, " +
        ".contact-link"
    );


    revealElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity .7s ease, " +
            "transform .7s ease";

    });


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    revealObserver.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       EDUCATION STAGGER
    ===================================================== */

    const educationItems =
        document.querySelectorAll(
            ".education-item"
        );


    educationItems.forEach(
        (item, index) => {

            item.style.transitionDelay =
                `${index * 120}ms`;

        }
    );


    /* =====================================================
       MEMORY IMAGE LOAD
    ===================================================== */

    const images =
        document.querySelectorAll("img");


    images.forEach(image => {

        image.style.opacity = "0";

        image.style.transition =
            "opacity .6s ease";


        if (image.complete) {

            image.style.opacity = "1";

        } else {

            image.addEventListener(
                "load",
                () => {
                    image.style.opacity = "1";
                },
                {
                    once: true
                }
            );

        }

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const updateActiveNavigation = () => {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 180;


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;


            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.id;

            }

        });


        navLinks.forEach(link => {

            const href =
                link.getAttribute("href");


            link.classList.toggle(
                "active",
                href === `#${currentSection}`
            );

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        {
            passive: true
        }
    );


    updateActiveNavigation();


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const heroImage =
        document.querySelector(".hero-image");


    const supportsHover =
        window.matchMedia(
            "(hover: hover)"
        ).matches;


    if (
        heroImage &&
        supportsHover
    ) {

        window.addEventListener(
            "mousemove",
            event => {

                const x =
                    (event.clientX /
                    window.innerWidth -
                    0.5) * 8;

                const y =
                    (event.clientY /
                    window.innerHeight -
                    0.5) * 5;


                heroImage.style.transform =
                    `scale(1.03) translate(${x}px, ${y}px)`;

            },
            {
                passive: true
            }
        );


        document.addEventListener(
            "mouseleave",
            () => {

                heroImage.style.transform =
                    "scale(1)";

            }
        );

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.querySelector(
            '.footer a[href="#home"]'
        );


    backToTop?.addEventListener(
        "click",
        event => {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetID =
                        link.getAttribute("href");

                    if (
                        !targetID ||
                        targetID === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const offset = 80;

                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        offset;


                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            "smooth"

                    });

                }
            );

        });


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900
            ) {
                closeMenu();
            }

        }
    );


});