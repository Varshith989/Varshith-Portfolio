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

            event.preventDefault();

            if (targetId === "#top") {
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }

            var target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
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


/* =====================================================
   FOOTER INTERACTIVE FLUID DRAWING CANVAS (SIDFZ EXACT)
===================================================== */
document.addEventListener("DOMContentLoaded", function () {
    initFooterCanvas();
    initFooterFloatingCta();
});

function initFooterCanvas() {
    var footer = document.querySelector(".footer");
    var canvas = document.querySelector(".footer__cursor-canvas");
    if (!footer || !canvas) return;

    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var X_ = {
        pointsNumber: 40,
        widthFactor: 0.3,
        spring: 0.4,
        friction: 0.5
    };

    var animFrame;
    var isInside = false;
    var isRunning = false;
    var alpha = 1;
    var mouse = { x: 0, y: 0 };
    var particles = [];
    var points = Array.from({ length: X_.pointsNumber }, function () {
        return { x: 0, y: 0, dx: 0, dy: 0 };
    });

    function resize(init) {
        var rect = footer.getBoundingClientRect();
        var dpr = window.devicePixelRatio || 1;
        canvas.width = Math.max(1, Math.round(rect.width * dpr));
        canvas.height = Math.max(1, Math.round(rect.height * dpr));
        canvas.style.width = rect.width + "px";
        canvas.style.height = rect.height + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        if (init) {
            mouse.x = rect.width / 2;
            mouse.y = rect.height / 2;
            points.forEach(function (p) {
                p.x = mouse.x;
                p.y = mouse.y;
                p.dx = 0;
                p.dy = 0;
            });
        }
    }

    function onPointerMove(e) {
        var rect = footer.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    }

    function onPointerEnter(e) {
        isInside = true;
        isRunning = true;
        alpha = 1;
        document.body.dataset.footerCursor = "active";
        onPointerMove(e);
        points.forEach(function (p) {
            p.x = mouse.x;
            p.y = mouse.y;
        });
    }

    function onPointerLeave() {
        isInside = false;
        delete document.body.dataset.footerCursor;
    }

    function render() {
        var rect = footer.getBoundingClientRect();
        ctx.clearRect(0, 0, rect.width, rect.height);

        if (isRunning) {
            alpha = isInside ? 1 : Math.max(0, alpha - 0.05);

            points.forEach(function (p, i) {
                var prev = i === 0 ? mouse : points[i - 1];
                var spring = i === 0 ? 0.4 * X_.spring : X_.spring;
                p.dx += (prev.x - p.x) * spring;
                p.dy += (prev.y - p.y) * spring;
                p.dx *= X_.friction;
                p.dy *= X_.friction;
                p.x += p.dx;
                p.y += p.dy;
            });

            ctx.strokeStyle = "#ffffff";
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);

            for (var i = 1; i < points.length - 1; i++) {
                var midX = 0.5 * (points[i].x + points[i + 1].x);
                var midY = 0.5 * (points[i].y + points[i + 1].y);
                ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
                ctx.lineWidth = X_.widthFactor * (X_.pointsNumber - i) * alpha;
                ctx.stroke();
            }
            ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
            ctx.stroke();

            // Emit sparkle particles on movement
            if (Math.random() < 0.35) {
                particles.push({
                    x: mouse.x + (Math.random() - 0.5) * 12,
                    y: mouse.y + (Math.random() - 0.5) * 12,
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: (Math.random() - 0.5) * 1.5 - 0.3,
                    life: 1,
                    decay: 0.025 + Math.random() * 0.02,
                    size: 1.2 + Math.random() * 1.8
                });
            }

            // Render and update particles
            for (var pIdx = particles.length - 1; pIdx >= 0; pIdx--) {
                var prt = particles[pIdx];
                prt.x += prt.vx;
                prt.y += prt.vy;
                prt.life -= prt.decay;

                if (prt.life <= 0) {
                    particles.splice(pIdx, 1);
                } else {
                    ctx.fillStyle = "rgba(255, 255, 255, " + (prt.life * 0.8) + ")";
                    ctx.beginPath();
                    ctx.arc(prt.x, prt.y, prt.size * prt.life, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            if (!isInside && alpha === 0) {
                isRunning = false;
            }
        }

        animFrame = window.requestAnimationFrame(render);
    }

    resize(true);
    if (window.ResizeObserver) {
        var resizeObserver = new ResizeObserver(function () { resize(false); });
        resizeObserver.observe(footer);
    }

    animFrame = window.requestAnimationFrame(render);

    footer.addEventListener("pointerenter", onPointerEnter);
    footer.addEventListener("pointermove", onPointerMove);
    footer.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", function () { resize(false); });
}

function initFooterFloatingCta() {
    var footer = document.querySelector(".footer");
    var cta = document.querySelector(".floating-cta");
    if (!footer || !cta) return;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                cta.style.opacity = "0";
                cta.style.pointerEvents = "none";
                cta.style.transform = "translateY(20px)";
            } else {
                cta.style.opacity = "1";
                cta.style.pointerEvents = "auto";
                cta.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.15 });

    observer.observe(footer);
}


/* =====================================================
   INTERACTIVE ANIMATIONS & MICRO-INTERACTIONS
===================================================== */
document.addEventListener("DOMContentLoaded", function () {
    initScrollProgressBar();
    initCardSpotlights();
    initMagneticButtons();
});

/* 1. Scroll Progress Bar */
function initScrollProgressBar() {
    var bar = document.getElementById("scrollProgressBar");
    if (!bar) return;

    window.addEventListener("scroll", function () {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        bar.style.width = progress + "%";
    }, { passive: true });
}

/* 2. Radial Card Spotlights */
function initCardSpotlights() {
    var cards = document.querySelectorAll(".project-card, .category, .process-item");
    if (!cards.length || window.matchMedia("(hover: none)").matches) return;

    cards.forEach(function (card) {
        var spotlight = card.querySelector(".card-spotlight");
        if (!spotlight) {
            spotlight = document.createElement("div");
            spotlight.className = "card-spotlight";
            card.appendChild(spotlight);
        }

        card.addEventListener("mousemove", function (e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", x + "px");
            card.style.setProperty("--mouse-y", y + "px");
        }, { passive: true });
    });
}

/* 3. Magnetic Buttons */
function initMagneticButtons() {
    var magnets = document.querySelectorAll(".primary-btn, .secondary-btn, .footer__social-pill, .footer__social-btn, .floating-btn");
    if (!magnets.length || window.matchMedia("(hover: none)").matches) return;

    magnets.forEach(function (btn) {
        btn.addEventListener("mousemove", function (e) {
            var rect = btn.getBoundingClientRect();
            var x = e.clientX - (rect.left + rect.width / 2);
            var y = e.clientY - (rect.top + rect.height / 2);
            btn.style.transform = "translate(" + (x * 0.22) + "px, " + (y * 0.22) + "px)";
        }, { passive: true });

        btn.addEventListener("mouseleave", function () {
            btn.style.transform = "translate(0px, 0px)";
        });
    });
}


/* =====================================================
   HERO 3D LAPTOP INTERACTIVE PARALLAX TILT
===================================================== */
document.addEventListener("DOMContentLoaded", function () {
    initHeroLaptopTilt();
});

function initHeroLaptopTilt() {
    var hero = document.getElementById("top");
    var laptop = document.getElementById("heroLaptop");
    if (!hero || !laptop || window.matchMedia("(hover: none)").matches) return;

    var raf = null;

    hero.addEventListener("mousemove", function (e) {
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
            var rect = hero.getBoundingClientRect();
            var x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
            var y = (e.clientY - rect.top) / rect.height - 0.5;

            var rotX = 5 - (y * 14); // tilt X
            var rotY = -8 + (x * 18); // tilt Y

            laptop.classList.add("is-tilting");
            laptop.style.transform = "perspective(1200px) rotateX(" + rotX.toFixed(2) + "deg) rotateY(" + rotY.toFixed(2) + "deg) translateZ(10px)";
        });
    }, { passive: true });

    hero.addEventListener("mouseleave", function () {
        if (raf) cancelAnimationFrame(raf);
        laptop.classList.remove("is-tilting");
        laptop.style.transform = "";
    });
}


/* =====================================================
   ELITE LIVE ANIMATION SUITE
===================================================== */
document.addEventListener("DOMContentLoaded", function () {
    initLiveLaptopTypewriter();
    initAmbientGlowFollower();
});

/* 1. Live Laptop Typewriter & Terminal Simulator */
function initLiveLaptopTypewriter() {
    var cmd = document.getElementById("terminalCmd");
    var output = document.getElementById("terminalOutput");
    if (!cmd || !output) return;

    var commands = [
        "ready_to_ship",
        "npm run build",
        "git push origin main",
        "deploy --production"
    ];
    var cmdIndex = 0;

    function runCycle() {
        var text = commands[cmdIndex];
        cmd.textContent = "";
        output.classList.remove("show-output");

        var charIndex = 0;
        function typeChar() {
            if (charIndex < text.length) {
                cmd.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 80 + Math.random() * 60);
            } else {
                // Typed command, show success after short delay
                setTimeout(function () {
                    output.classList.add("show-output");
                    setTimeout(function () {
                        // Erase after reading
                        setTimeout(eraseCommand, 3000);
                    }, 500);
                }, 400);
            }
        }

        function eraseCommand() {
            output.classList.remove("show-output");
            var current = cmd.textContent;
            if (current.length > 0) {
                cmd.textContent = current.substring(0, current.length - 1);
                setTimeout(eraseCommand, 40);
            } else {
                cmdIndex = (cmdIndex + 1) % commands.length;
                setTimeout(runCycle, 800);
            }
        }

        typeChar();
    }

    // Start cycle after hero load
    setTimeout(runCycle, 1200);
}

/* 2. Ambient Glow Pointer Follower */
function initAmbientGlowFollower() {
    if (window.matchMedia("(hover: none)").matches) return;

    var glow = document.createElement("div");
    glow.className = "ambient-glow-follower";
    document.body.appendChild(glow);

    var mouseX = window.innerWidth / 2;
    var mouseY = window.innerHeight / 2;
    var currentX = mouseX;
    var currentY = mouseY;

    window.addEventListener("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    function animateGlow() {
        // Smooth linear interpolation (lerp)
        currentX += (mouseX - currentX) * 0.08;
        currentY += (mouseY - currentY) * 0.08;

        glow.style.left = currentX + "px";
        glow.style.top = currentY + "px";

        requestAnimationFrame(animateGlow);
    }
    requestAnimationFrame(animateGlow);
}


/* =====================================================
   NEXT-LEVEL INTERACTION SUITE
===================================================== */
document.addEventListener("DOMContentLoaded", function () {
    initTextScrambleEffect();
    initClickSparkleBurst();
    initWordmarkLetterPhysics();
});

/* 1. Hacker / Tech Text Scramble on Hover */
function initTextScrambleEffect() {
    var targets = document.querySelectorAll(".nav-links a, .section-label, .hero-role");
    if (!targets.length || window.matchMedia("(hover: none)").matches) return;

    var chars = "!<>-_\\/[]{}—=+*^?#________";

    targets.forEach(function (el) {
        var originalText = el.innerText.trim();
        var timer = null;

        el.addEventListener("mouseenter", function () {
            var iteration = 0;
            if (timer) clearInterval(timer);

            timer = setInterval(function () {
                el.innerText = originalText
                    .split("")
                    .map(function (char, index) {
                        if (index < iteration || char === " " || char === "—") {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("");

                if (iteration >= originalText.length) {
                    clearInterval(timer);
                    el.innerText = originalText;
                }
                iteration += 1 / 2;
            }, 25);
        });

        el.addEventListener("mouseleave", function () {
            if (timer) clearInterval(timer);
            el.innerText = originalText;
        });
    });
}

/* 2. Interactive Click Sparkle Particle Bursts */
function initClickSparkleBurst() {
    var interactiveElements = document.querySelectorAll(".primary-btn, .secondary-btn, .footer__social-pill, .footer__social-btn, .hero-chips li, .category-skills span");
    if (!interactiveElements.length) return;

    var colors = ["#38bdf8", "#818cf8", "#c084fc", "#34d399", "#fbbf24"];

    interactiveElements.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            var rect = btn.getBoundingClientRect();
            var clickX = e.clientX || rect.left + rect.width / 2;
            var clickY = e.clientY || rect.top + rect.height / 2;

            for (var i = 0; i < 14; i++) {
                var sparkle = document.createElement("div");
                sparkle.className = "click-sparkle";
                
                var size = Math.random() * 6 + 4;
                sparkle.style.width = size + "px";
                sparkle.style.height = size + "px";
                sparkle.style.left = clickX + "px";
                sparkle.style.top = clickY + "px";
                sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
                sparkle.style.boxShadow = "0 0 10px " + sparkle.style.background;

                var angle = Math.random() * Math.PI * 2;
                var velocity = Math.random() * 60 + 20;
                var dx = Math.cos(angle) * velocity;
                var dy = Math.sin(angle) * velocity;

                sparkle.style.setProperty("--dx", dx + "px");
                sparkle.style.setProperty("--dy", dy + "px");

                document.body.appendChild(sparkle);

                setTimeout((function (el) {
                    return function () {
                        if (el && el.parentNode) {
                            el.parentNode.removeChild(el);
                        }
                    };
                })(sparkle), 700);
            }
        });
    });
}

/* 3. Interactive Footer Wordmark Letter Physics */
function initWordmarkLetterPhysics() {
    var wordmark = document.getElementById("footerWordmark");
    if (!wordmark) return;

    var text = wordmark.innerText;
    wordmark.innerHTML = "";

    for (var i = 0; i < text.length; i++) {
        var span = document.createElement("span");
        if (text[i] === " ") {
            span.innerHTML = "&nbsp;";
        } else {
            span.textContent = text[i];
        }
        wordmark.appendChild(span);
    }
}


/* =====================================================
   DIRECT BOTTOM BUTTON & MENU CLICK HANDLERS
===================================================== */
document.addEventListener("DOMContentLoaded", function () {
    initBottomMenuHandlers();
});

function initBottomMenuHandlers() {
    var menuLabel = document.getElementById("footerMenuLabel");
    if (menuLabel) {
        menuLabel.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    var footerLinks = document.querySelectorAll(".footer__menu-links a, .footer-links a");
    footerLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            var href = link.getAttribute("href");
            if (href && href.startsWith("#")) {
                e.preventDefault();
                if (href === "#top") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                    var target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                }
            }
        });
    });
}
