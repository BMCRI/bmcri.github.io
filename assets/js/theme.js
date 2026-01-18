(function () {
    "use strict";

    const docElement = document.documentElement;
    const storage = localStorage;

    // Determine current theme
    const getCurrentTheme = () => {
        return docElement.getAttribute("data-theme") || storage.getItem("theme") || "light";
    };

    // Set theme to DOM and Storage
    const setTheme = (themeName) => {
        docElement.setAttribute("data-theme", themeName);
        storage.setItem("theme", themeName);
    };

    // 1. Set Initial Theme
    const initialTheme = getCurrentTheme();
    docElement.setAttribute("data-theme", initialTheme);

    // 2. Wait for DOM to attach listeners
    window.addEventListener("DOMContentLoaded", () => {
        // Click Listener
        document.addEventListener("click", (event) => {
            const button = event.target.closest("#theme-toggle, #mobile-theme-toggle, #footer-theme-btn");
            if (button) {
                event.preventDefault();
                const newTheme = getCurrentTheme() === "dark" ? "light" : "dark";
                setTheme(newTheme);
            }
        });
    });
})();