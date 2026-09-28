/* =========================================================
   FITZONE GYM
   COMPLETE STATIC WEBSITE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const header = document.getElementById("header");
    const nav = document.getElementById("nav");
    const menuBtn = document.getElementById("menuBtn");
    const backToTop = document.getElementById("backToTop");
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");
    const yearElement = document.getElementById("year");

    const navLinks = document.querySelectorAll(".nav-link");
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
    const sections = document.querySelectorAll("section[id]");


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", () => {

            nav.classList.toggle("menu-open");
            menuBtn.classList.toggle("active");

            const isOpen = nav.classList.contains("menu-open");

            menuBtn.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );

            document.body.classList.toggle("menu-active", isOpen);
        });


        /* Close menu when clicking a navigation link */

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                nav.classList.remove("menu-open");
                menuBtn.classList.remove("active");

                menuBtn.setAttribute(
                    "aria-label",
                    "Open menu"
                );

                document.body.classList.remove("menu-active");
            });

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", (event) => {

        if (!nav || !menuBtn) return;

        const clickedInsideNav = nav.contains(event.target);
        const clickedMenuButton = menuBtn.contains(event.target);

        if (
            nav.classList.contains("menu-open") &&
            !clickedInsideNav &&
            !clickedMenuButton
        ) {

            nav.classList.remove("menu-open");
            menuBtn.classList.remove("active");

            menuBtn.setAttribute(
                "aria-label",
                "Open menu"
            );

            document.body.classList.remove("menu-active");
        }

    });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    allAnchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                !targetId.startsWith("#")
            ) {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (!targetElement) {
                return;
            }

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                targetElement.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );

    handleHeaderScroll();


    /* =====================================================
       ACTIVE NAVIGATION LINK
    ===================================================== */

    function updateActiveNavigation() {

        const scrollPosition =
            window.scrollY +
            (header ? header.offsetHeight : 80) +
            100;

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                currentSection = section.getAttribute("id");

            }

        });


        navLinks.forEach((link) => {

            link.classList.remove("active");

            const linkTarget =
                link.getAttribute("href");

            if (
                currentSection &&
                linkTarget === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================================
       HERO COUNTERS
    ===================================================== */

    const counters = document.querySelectorAll(".counter");

    let countersStarted = false;

    function animateCounters() {

        if (countersStarted || counters.length === 0) {
            return;
        }

        const heroStats =
            document.querySelector(".hero-stats");

        if (!heroStats) {
            return;
        }

        const rect =
            heroStats.getBoundingClientRect();

        const isVisible =
            rect.top < window.innerHeight &&
            rect.bottom > 0;

        if (!isVisible) {
            return;
        }

        countersStarted = true;

        counters.forEach((counter) => {

            const target =
                Number(counter.dataset.target) || 0;

            let current = 0;

            const duration = 1800;
            const startTime = performance.now();

            function updateCounter(currentTime) {

                const elapsed =
                    currentTime - startTime;

                const progress =
                    Math.min(elapsed / duration, 1);

                /* Smooth easing */

                const easedProgress =
                    1 - Math.pow(1 - progress, 3);

                current =
                    Math.floor(
                        easedProgress * target
                    );

                counter.textContent = current;

                if (progress < 1) {

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    counter.textContent = target;

                }

            }

            requestAnimationFrame(updateCounter);

        });

    }

    window.addEventListener(
        "scroll",
        animateCounters,
        { passive: true }
    );

    animateCounters();


    /* =====================================================
       SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".about-card, .program-card, .trainer-card, .price-card, .contact-content, .contact-form"
    );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

    });


    function revealOnScroll() {

        const windowHeight =
            window.innerHeight;

        revealElements.forEach((element) => {

            const elementTop =
                element.getBoundingClientRect().top;

            if (
                elementTop <
                windowHeight - 80
            ) {

                element.classList.add("revealed");

            }

        });

    }


    window.addEventListener(
        "scroll",
        revealOnScroll,
        { passive: true }
    );

    revealOnScroll();


    /* =====================================================
       BACK TO TOP BUTTON
    ===================================================== */

    function handleBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        handleBackToTop,
        { passive: true }
    );


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                const nameInput =
                    document.getElementById("name");

                const phoneInput =
                    document.getElementById("phone");

                const emailInput =
                    document.getElementById("email");

                const goalInput =
                    document.getElementById("goal");

                const messageInput =
                    document.getElementById("message");


                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";

                const phone =
                    phoneInput
                        ? phoneInput.value.trim()
                        : "";

                const email =
                    emailInput
                        ? emailInput.value.trim()
                        : "";

                const goal =
                    goalInput
                        ? goalInput.value
                        : "";

                const message =
                    messageInput
                        ? messageInput.value.trim()
                        : "";


                /* Basic validation */

                if (!name) {

                    showFormMessage(
                        "Please enter your name.",
                        "error"
                    );

                    if (nameInput) {
                        nameInput.focus();
                    }

                    return;
                }


                if (!phone) {

                    showFormMessage(
                        "Please enter your phone number.",
                        "error"
                    );

                    if (phoneInput) {
                        phoneInput.focus();
                    }

                    return;
                }


                if (!email) {

                    showFormMessage(
                        "Please enter your email address.",
                        "error"
                    );

                    if (emailInput) {
                        emailInput.focus();
                    }

                    return;
                }


                if (!isValidEmail(email)) {

                    showFormMessage(
                        "Please enter a valid email address.",
                        "error"
                    );

                    if (emailInput) {
                        emailInput.focus();
                    }

                    return;
                }


                if (!goal) {

                    showFormMessage(
                        "Please select your fitness goal.",
                        "error"
                    );

                    if (goalInput) {
                        goalInput.focus();
                    }

                    return;
                }


                /*

                   This is a static website.

                   No backend/email service is connected.

                   We show a success message instead
                   of pretending that the message was sent.
                */

                showFormMessage(
                    `Thanks ${name}! Your enquiry has been received on this demo website.`,
                    "success"
                );


                /* Optional console information */

                console.log("FitZone Contact Form:", {
                    name,
                    phone,
                    email,
                    goal,
                    message
                });


                /* Clear form */

                contactForm.reset();

            }
        );

    }


    /* =====================================================
       FORM MESSAGE
    ===================================================== */

    function showFormMessage(message, type) {

        if (!formMessage) return;

        formMessage.textContent = message;

        formMessage.classList.remove(
            "success",
            "error"
        );

        formMessage.classList.add(type);


        /* Automatically hide after a few seconds */

        setTimeout(() => {

            formMessage.textContent = "";

            formMessage.classList.remove(
                "success",
                "error"
            );

        }, 5000);

    }


    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    function isValidEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);

    }


    /* =====================================================
       PHONE INPUT
    ===================================================== */

    const phoneInput =
        document.getElementById("phone");

    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            () => {

                phoneInput.value =
                    phoneInput.value.replace(
                        /[^0-9+\-\s()]/g,
                        ""
                    );

            }
        );

    }


    /* =====================================================
       ESCAPE KEY
       CLOSE MOBILE MENU
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key !== "Escape") {
                return;
            }

            if (
                nav &&
                nav.classList.contains("menu-open")
            ) {

                nav.classList.remove(
                    "menu-open"
                );

            }

            if (menuBtn) {

                menuBtn.classList.remove(
                    "active"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Open menu"
                );

            }

            document.body.classList.remove(
                "menu-active"
            );

        }
    );


    /* =====================================================
       PROGRAM CARD INTERACTION
    ===================================================== */

    const programCards =
        document.querySelectorAll(".program-card");

    programCards.forEach((card) => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.classList.add("card-hover");

            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.classList.remove("card-hover");

            }
        );

    });


    /* =====================================================
       PRICING CARD INTERACTION
    ===================================================== */

    const priceCards =
        document.querySelectorAll(".price-card");

    priceCards.forEach((card) => {

        card.addEventListener(
            "click",
            () => {

                priceCards.forEach((item) => {

                    item.classList.remove(
                        "selected"
                    );

                });

                card.classList.add("selected");

            }
        );

    });


    /* =====================================================
       TRAINER CARD INTERACTION
    ===================================================== */

    const trainerCards =
        document.querySelectorAll(".trainer-card");

    trainerCards.forEach((card) => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.classList.add(
                    "trainer-hover"
                );

            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.classList.remove(
                    "trainer-hover"
                );

            }
        );

    });


    /* =====================================================
       BUTTON RIPPLE EFFECT
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn, .price-button, .form-submit, .nav-join"
        );


    buttons.forEach((button) => {

        button.addEventListener(
            "click",
            function (event) {

                const ripple =
                    document.createElement("span");

                ripple.classList.add("button-ripple");

                const rect =
                    button.getBoundingClientRect();

                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );

                ripple.style.width =
                    `${size}px`;

                ripple.style.height =
                    `${size}px`;

                ripple.style.left =
                    `${event.clientX - rect.left - size / 2}px`;

                ripple.style.top =
                    `${event.clientY - rect.top - size / 2}px`;

                button.appendChild(ripple);


                setTimeout(() => {

                    ripple.remove();

                }, 600);

            }
        );

    });


    /* =====================================================
       OPTIONAL BMI CALCULATOR SUPPORT
       
       If you later add these elements to HTML:
       
       calculateBmi
       bmiHeight
       bmiWeight
       bmiResult
       
       this code will automatically work.
    ===================================================== */

    const calculateBmi =
        document.getElementById("calculateBmi");

    const bmiHeight =
        document.getElementById("bmiHeight");

    const bmiWeight =
        document.getElementById("bmiWeight");

    const bmiResult =
        document.getElementById("bmiResult");


    if (
        calculateBmi &&
        bmiHeight &&
        bmiWeight &&
        bmiResult
    ) {

        calculateBmi.addEventListener(
            "click",
            () => {

                const height =
                    parseFloat(
                        bmiHeight.value
                    );

                const weight =
                    parseFloat(
                        bmiWeight.value
                    );


                if (
                    !Number.isFinite(height) ||
                    !Number.isFinite(weight) ||
                    height <= 0 ||
                    weight <= 0
                ) {

                    bmiResult.textContent =
                        "Please enter valid height and weight.";

                    return;
                }


                const heightInMeters =
                    height / 100;

                const bmi =
                    weight /
                    (heightInMeters *
                     heightInMeters);


                let category = "";


                if (bmi < 18.5) {

                    category = "Underweight";

                } else if (bmi < 25) {

                    category = "Healthy range";

                } else if (bmi < 30) {

                    category = "Overweight";

                } else {

                    category = "Obesity";

                }


                bmiResult.textContent =
                    `Your BMI is ${bmi.toFixed(1)} — ${category}.`;

            }
        );

    }


    /* =====================================================
       PAGE LOAD
    ===================================================== */

    document.body.classList.add("page-loaded");


    /* =====================================================
       CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "%c FitZone Gym ",
        "background:#d7ff00;color:#080808;font-size:18px;font-weight:bold;padding:8px;"
    );

    console.log(
        "FitZone Gym website loaded successfully."
    );

});