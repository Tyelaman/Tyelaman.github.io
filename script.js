const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");

function updateThemeControl(theme) {
    if (!themeToggle || !themeIcon) return;
    const isDark = theme === "dark";
    themeIcon.textContent = isDark ? "☀" : "☾";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.title = isDark ? "Switch to light mode" : "Switch to dark mode";
}

const activeTheme = document.documentElement.dataset.theme || "light";
updateThemeControl(activeTheme);

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = nextTheme;
        localStorage.setItem("portfolio-theme", nextTheme);
        updateThemeControl(nextTheme);
    });
}

if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        const isOpen = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", String(!isOpen));
        navToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
        navMenu.classList.toggle("open", !isOpen);
        document.body.classList.toggle("nav-open", !isOpen);
    });

    navMenu.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Open navigation");
            navMenu.classList.remove("open");
            document.body.classList.remove("nav-open");
        }
    });
}

document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
});

const supportsCustomCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (supportsCustomCursor) {
    const cursorDot = document.createElement("div");
    const cursorRing = document.createElement("div");
    cursorDot.className = "cursor-dot";
    cursorRing.className = "cursor-ring";
    cursorDot.setAttribute("aria-hidden", "true");
    cursorRing.setAttribute("aria-hidden", "true");
    document.body.append(cursorDot, cursorRing);
    document.body.classList.add("custom-cursor");

    let pointerX = -100;
    let pointerY = -100;
    let ringX = -100;
    let ringY = -100;

    const moveRing = () => {
        ringX += (pointerX - ringX) * 0.18;
        ringY += (pointerY - ringY) * 0.18;
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
        requestAnimationFrame(moveRing);
    };

    window.addEventListener("mousemove", (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        cursorDot.style.transform = `translate(${pointerX}px, ${pointerY}px) translate(-50%, -50%)`;
        cursorDot.classList.add("visible");
        cursorRing.classList.add("visible");
        const interactiveTarget = event.target instanceof Element && event.target.closest("a, button");
        cursorRing.classList.toggle("hovering", Boolean(interactiveTarget));
    });

    document.documentElement.addEventListener("mouseleave", () => {
        cursorDot.classList.remove("visible");
        cursorRing.classList.remove("visible");
    });

    requestAnimationFrame(moveRing);
}
