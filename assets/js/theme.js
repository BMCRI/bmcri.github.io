(function () {
    "use strict";

    const docElement = document.documentElement;
    const storage = localStorage;

    // Helper: Determine current theme
    const getCurrentTheme = () => {
        return docElement.getAttribute("data-theme") || storage.getItem("theme") || "light";
    };

    // Helper: Set theme to DOM and Storage
    const setTheme = (themeName) => {
        docElement.setAttribute("data-theme", themeName);
        storage.setItem("theme", themeName);
        updateTextLabels(themeName);
    };

    // Helper: Update text labels (Mobile only)
    // Helper: Update text labels (Mobile only)
    const updateTextLabels = (themeName) => {
        // Logic removed so text remains "Switch Theme" permanently
    };

    // 1. Set Initial Theme (This runs instantly)
    const initialTheme = getCurrentTheme();
    docElement.setAttribute("data-theme", initialTheme);

    // 2. Wait for DOM to update labels
    window.addEventListener("DOMContentLoaded", () => {
        updateTextLabels(initialTheme);

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