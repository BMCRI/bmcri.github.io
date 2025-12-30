(function () {
    "use strict";

    const docElement = document.documentElement;
    const storage = localStorage;

    // Helper: Determine current theme (HTML attribute > LocalStorage > Default 'light')
    const getCurrentTheme = () => {
        return docElement.getAttribute("data-theme") || storage.getItem("theme") || "light";
    };

    // Helper: Update icons and text on all theme toggle buttons
    const updateUI = () => {
        const currentTheme = getCurrentTheme();
        const isDark = currentTheme === "dark";

        const textLabel = isDark ? "Light Mode" : "Dark Mode";
        const iconClass = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";

        // Find all possible toggle buttons (desktop, mobile, footer)
        const toggleButtons = document.querySelectorAll("#theme-toggle, #mobile-theme-toggle, #footer-theme-btn");

        toggleButtons.forEach(button => {
            const icon = button.querySelector("i");
            const span = button.querySelector("span");

            // Update Icon
            if (icon && icon.className !== iconClass) {
                icon.className = iconClass;
            }

            // Update Text Label
            if (span && span.textContent !== textLabel) {
                span.textContent = textLabel;
            }

            // Update Accessibility Label
            if (button.getAttribute("data-theme-text") !== textLabel) {
                button.setAttribute("data-theme-text", textLabel);
            }
        });
    };

    // Helper: Set theme to DOM and Storage, then update UI
    const setTheme = (themeName) => {
        docElement.setAttribute("data-theme", themeName);
        storage.setItem("theme", themeName);
        updateUI();
    };

    // Initialize: Set initial theme attribute
    docElement.setAttribute("data-theme", getCurrentTheme());

    // Event Listeners
    window.addEventListener("DOMContentLoaded", () => {
        updateUI();

        // Global click listener for theme toggles (delegation)
        document.addEventListener("click", (event) => {
            const button = event.target.closest("#theme-toggle, #mobile-theme-toggle, #footer-theme-btn");
            if (button) {
                event.preventDefault();
                const newTheme = getCurrentTheme() === "dark" ? "light" : "dark";
                setTheme(newTheme);
            }
        });

        // Watch for changes to the body to ensure UI stays consistent (e.g., if dynamic content loads)
        new MutationObserver(updateUI).observe(document.body, {
            childList: true,
            subtree: true
        });
    });
})();