const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

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
