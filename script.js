/* =====================================================
   PORTFOLIO JAVASCRIPT
   Varshith Reddy
===================================================== */


/* =====================================================
   DOM READY
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
    initScrollReveal();
    initFAQ();
    initProjectHover();
    initNavbar();
    initSmoothLinks();
    initMobileMenu();
    initFooterYear();
});


/* =====================================================
   SCROLL REVEAL
===================================================== */

function initScrollReveal() {
    var elements = document.querySelectorAll(".reveal");
    if (!elements.length) { return; }

    var observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin:"0px 0px -60px 0px" });

    elements.forEach(function (element) {
        observer.observe(element);
    });
}


/* =====================================================
   FAQ
===================================================== */

function initFAQ() {
    var faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {
        var button = item.querySelector(".faq-question");
        var icon = item.querySelector(".faq-icon");

        button.addEventListener("click", function () {
            var isActive = item.classList.contains("active");

            faqItems.forEach(function (otherItem) {
                otherItem.classList.remove("active");

                var otherIcon = otherItem.querySelector(".faq-icon");
                if (otherIcon) { otherIcon.textContent = "+"; }

                var otherButton = otherItem.querySelector(".faq-question");
                if (otherButton) { otherButton.setAttribute("aria-expanded", "false"); }
            });

            if (!isActive) {
                item.classList.add("active");
                if (icon) { icon.textContent = "−"; }
                button.setAttribute("aria-expanded", "true");
            }
        });
    });
}


/* =====================================================
   PROJECT HOVER (3D TILT)
===================================================== */

function initProjectHover() {
    var cards = document.querySelectorAll(".project-card");
    if (!cards.length || window.matchMedia("(hover:none)").matches) { return; }

    var frame = null;

    function handleMove(card, event) {
        if (frame) { return; }
        frame = requestAnimationFrame(function () {
            frame = null;
            var rect = card.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;

            var rotateX = ((y - centerY) / centerY) * -1.5;
            var rotateY = ((x - centerX) / centerX) * 1.5;

            card.style.transform = "perspective(1000px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateY(-5px)";
        });
    }

    cards.forEach(function (card) {
        card.addEventListener("mousemove", function (event) { handleMove(card, event); }, { passive: true });

        card.addEventListener("mouseleave", function () {
            if (frame) { cancelAnimationFrame(frame); frame = null; }
            card.style.transform = "";
        });
    });
}


/* =====================================================
   NAVBAR HIDE / SHOW
===================================================== */

function initNavbar() {
    var navbar = document.querySelector(".navbar");
    if (!navbar) { return; }

    var lastScroll = 0;

    window.addEventListener("scroll", function () {
        var currentScroll = window.scrollY;

        if (currentScroll < 80) {
            navbar.style.transform = "translateX(-50%";
            navbar.style.opacity = "1";
            lastScroll = currentScroll;
            return;
        }

        if (currentScroll > lastScroll) {
            navbar.style.transform = "translate(-50%, -120%";
            navbar.style.opacity = "0";
        } else {
            navbar.style.transform = "translateX(-50%";
            navbar.style.opacity = "1";
        }

        lastScroll = currentScroll;
    }, { passive: true });
}


/* =====================================================
   SMOOTH INTERNAL LINKS
===================================================== */

function initSmoothLinks() {
    var links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {
        link.addEventListener("click", function (event) {
            var targetId = link.getAttribute("href");
            if (!targetId || targetId === "#") { return; }

            var target = document.querySelector(targetId);
            if (!target) { return; }

            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });
}


/* =====================================================
   MOBILE MENU
===================================================== */

function initMobileMenu() {
    var toggle = document.querySelector("#menuToggle");
    var menu = document.querySelector("#mobileMenu");
    if (!toggle || !menu) { return; }

    function close() {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        menu.classList.remove("open");
    }

    toggle.addEventListener("click", function () {
        var isOpen = toggle.getAttribute("aria-expanded") === "true";
        if (isOpen) {
            close();
        } else {
            toggle.setAttribute("aria-expanded", "true");
            toggle.setAttribute("aria-label", "Close menu");
            menu.classList.add("open");
        }
    });

    menu.addEventListener("click", function (event) {
        if (event.target.closest("a")) { close(); }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && menu.classList.contains("open")) {
            close();
            toggle.focus();
        }
    });
}


/* =====================================================
   FOOTER YEAR
===================================================== */

function initFooterYear() {
    var year = document.querySelector(".footer .year");
    if (!year) { return; }
    year.textContent = String(new Date().getFullYear());
}


/* =====================================================
   LAPTOP PARALLAX
===================================================== */

var laptop = document.querySelector(".laptop");

if (laptop && !window.matchMedia("(hover:none)").matches) {
    var frame = null;

    window.addEventListener("mousemove", function (event) {
        if (frame) { return; }
        frame = requestAnimationFrame(function () {
            frame = null;
            var x = event.clientX / window.innerWidth - 0.5;
            var y = event.clientY / window.innerHeight - 0.5;
            var rotateY = -8 + x * 8;
            var rotateX = 4 - y * 6;

            laptop.style.transform = "perspective(1200px) rotateY(" + rotateY + "deg) rotateX(" + rotateX + "deg) translateY(0)";
        });
    }, { passive: true });
}


/* =====================================================
   ACTIVE SECTION
===================================================== */

var sections = document.querySelectorAll("section[id]");
var navLinks = document.querySelectorAll(".footer-links a");

if (sections.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                navLinks.forEach(function (link) { link.classList.remove("active"); });

                var selector = ".footer-links a[href=\"#" + entry.target.id + "\"]";
                var activeLink = document.querySelector(selector);
                if (activeLink) { activeLink.classList.add("active"); }
            }
        });
    }, { threshold:  0.35 });

    sections.forEach(function (section) { sectionObserver.observe(section); });
}


/* =====================================================
   CONSOLE
===================================================== */

console.log("%cVarshith Reddy — Portfolio", "font-size:18px;font-weight:bold;");
console.log("Built with HTML, CSS & JavaScript.");
