document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    // 1. BASE URL CALCULATION
    // Determines the root path of the site relative to the CSS file location
    const cssLink = document.querySelector('link[href*="style.css"]');
    const baseUrl = cssLink ? cssLink.getAttribute("href").split("assets/css/style.css")[0] || "./" : "./";
    console.log("Base URL:", baseUrl);

    // 2. HELPER: FIX RELATIVE LINKS
    // Ensures links and images point to the correct path based on baseUrl
    const fixRelativeLinks = () => {
        const elementsToFix = document.querySelectorAll('#global-header a[href], #global-footer a[href], #global-header img[src], #global-footer img[src]');

        elementsToFix.forEach(element => {
            const attributeName = element.tagName === 'IMG' ? 'src' : 'href';
            const currentValue = element.getAttribute(attributeName);

            // Skip external links, anchors, mailto, etc.
            if (!currentValue || /^(http|\/\/|mailto:|tel:|#|data:)/.test(currentValue)) return;

            // Clean up path (remove ./ and ../)
            let cleanPath = currentValue.replace(/^(\.?\/)/, '');
            while (cleanPath.startsWith('../')) {
                cleanPath = cleanPath.substring(3);
            }

            element.setAttribute(attributeName, baseUrl + cleanPath);
        });
    };

    // 3. SCROLL REVEAL ANIMATION
    // Adds 'active' class to elements when they scroll into view
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.1 });

    // Initial trigger for reveal elements
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 100);

    // 4. SLIDESHOW LOGIC
    const initializeSlideshow = async () => {
        const slideshowContainer = document.getElementById("dynamic-slideshow");
        if (!slideshowContainer) return;

        const runSlideshow = () => {
            const slides = slideshowContainer.querySelectorAll(".hero-slide");
            if (!slides.length) return;

            let currentIndex = 0;
            let slideInterval;

            const showSlide = (newIndex) => {
                slides[currentIndex].classList.remove("active");
                // Calculate next index looping around
                currentIndex = (newIndex + slides.length) % slides.length;
                slides[currentIndex].classList.add("active");
            };

            const startAutoPlay = () => {
                slideInterval = setInterval(() => showSlide(currentIndex + 1), 5000);
            };

            const resetAutoPlay = () => {
                clearInterval(slideInterval);
                startAutoPlay();
            };

            // Setup Controls
            const nextBtn = slideshowContainer.querySelector(".next");
            const prevBtn = slideshowContainer.querySelector(".prev");

            if (nextBtn) nextBtn.onclick = (e) => {
                e.stopPropagation();
                showSlide(currentIndex + 1);
                resetAutoPlay();
            };
            if (prevBtn) prevBtn.onclick = (e) => {
                e.stopPropagation();
                showSlide(currentIndex - 1);
                resetAutoPlay();
            };

            startAutoPlay();
        };

        try {
            // Fetch images from JSON
            const response = await fetch(baseUrl + "assets/slideshow/slideshow.json");
            if (!response.ok) throw new Error("Failed to load slideshow JSON");

            let images = await response.json();

            // Fisher-Yates Shuffle (Randomize order)
            for (let i = images.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [images[i], images[j]] = [images[j], images[i]];
            }

            const overlay = slideshowContainer.querySelector(".slide-overlay");

            // Create slide elements
            images.forEach((src, index) => {
                const slideDiv = document.createElement("div");
                slideDiv.className = `hero-slide ${index === 0 ? "active" : ""}`;
                slideDiv.innerHTML = `<img src="${baseUrl}assets/slideshow/${src}" alt="Slide" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}>`;
                slideshowContainer.insertBefore(slideDiv, overlay);
            });

            runSlideshow();

        } catch (error) {
            console.warn("Slideshow Error:", error);
            // Even if fetch fails, try to run if there are hardcoded slides
            runSlideshow();
        }
    };

    // 5. COMPONENT LOADER (Header/Footer/Home)
    const loadComponents = async () => {
        const fetchHtml = async (file) => {
            const response = await fetch(baseUrl + file);
            return response.ok ? await response.text() : null;
        };

        const headerHtml = await fetchHtml('header.html');
        const footerHtml = await fetchHtml('footer.html');
        const mainContentArea = document.getElementById("main-content-area");

        if (headerHtml) {
            document.getElementById('global-header').innerHTML = headerHtml;
            fixRelativeLinks();
            initializeNavigation();
        }

        if (footerHtml) {
            document.getElementById('global-footer').innerHTML = footerHtml;
            fixRelativeLinks();
            const yearSpan = document.getElementById("current-year");
            if (yearSpan) yearSpan.textContent = new Date().getFullYear();
        }

        // Special handling if we are on the homepage (load content dynamically)
        if (mainContentArea) {
            try {
                const homepageResponse = await fetch(baseUrl + "homepage.html");
                if (homepageResponse.ok) {
                    mainContentArea.innerHTML = await homepageResponse.text();
                    fixRelativeLinks();

                    // Re-attach observers to new content
                    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
                    initializeSlideshow();
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    // 6. NAVIGATION LOGIC
    const initializeNavigation = () => {
        // Highlight active link based on current URL
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';

        document.querySelectorAll(".nav-list a").forEach(link => {
            if (link.getAttribute("href")?.endsWith(currentPath)) {
                link.classList.add("active");
                // Also highlight parent if it's a dropdown
                link.closest(".nav-item")?.querySelector(".nav-link")?.classList.add("active");
            }
        });

        // Mobile Menu Toggles
        const menuBtn = document.querySelector(".mobile-menu-toggle");
        const navList = document.querySelector(".nav-list");
        const sidebarOverlay = document.getElementById("sidebar-overlay");

        if (menuBtn && navList) {
            const toggleMenu = (forceClose) => {
                const isActive = forceClose ? false : !navList.classList.contains("active");

                navList.classList.toggle("active", isActive);
                menuBtn.classList.toggle("active", isActive);

                if (sidebarOverlay) {
                    sidebarOverlay.classList.toggle("active", isActive);
                }

                // Prevent background scrolling when menu is open
                document.body.style.overflow = isActive ? "hidden" : "";
            };

            menuBtn.onclick = (e) => {
                e.stopPropagation();
                toggleMenu();
            };

            if (sidebarOverlay) {
                sidebarOverlay.onclick = () => toggleMenu(true);
            }

            // Handle Dropdowns on Mobile
            navList.onclick = (e) => {
                const link = e.target.closest("a");
                if (!link) return;

                const nextSibling = link.nextElementSibling;
                // If clicked link has a dropdown menu sibling
                if (nextSibling && (nextSibling.matches('.dropdown-menu') || nextSibling.matches('.dropdown-submenu'))) {
                    e.preventDefault();
                    e.stopPropagation();
                    link.parentElement.classList.toggle("dropdown-active");
                } else {
                    // Regular link, close menu
                    toggleMenu(true);
                }
            };
        }
    };

    // Start loading the page components
    loadComponents();
});