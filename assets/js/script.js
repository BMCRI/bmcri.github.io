document.addEventListener("DOMContentLoaded", () => {
    "use strict";
    // 1. BASE CALCULATION
    const c = document.querySelector('link[href*="style.css"]'), BASE = c ? c.getAttribute("href").split("assets/css/style.css")[0] || "./" : "./";
    console.log("Base:", BASE);

    // 2. HELPER: FIX LINKS
    const fix = () => {
        document.querySelectorAll('#global-header a[href], #global-footer a[href], #global-header img[src], #global-footer img[src]').forEach(e => {
            const a = e.tagName === 'IMG' ? 'src' : 'href', v = e.getAttribute(a);
            if (!v || /^(http|\/\/|mailto:|tel:|#|data:)/.test(v)) return;
            let p = v.replace(/^(\.?\/)/, ''); while (p.startsWith('../')) p = p.substring(3);
            e.setAttribute(a, BASE + p);
        })
    };

    // 3. SCROLL REVEAL
    const obs = new IntersectionObserver(e => { e.forEach(n => { if (n.isIntersecting) { n.target.classList.add('active'); obs.unobserve(n.target) } }) }, { threshold: .1 });
    setTimeout(() => document.querySelectorAll('.reveal').forEach(e => obs.observe(e)), 100);

    // 4. SLIDESHOW
    const initSlide = async () => {
        const box = document.getElementById("dynamic-slideshow"); if (!box) return;
        const run = () => {
            const s = box.querySelectorAll(".hero-slide"); if (!s.length) return;
            let c = 0, t; const show = n => { s[c].classList.remove("active"); c = (n + s.length) % s.length; s[c].classList.add("active") };
            const start = () => t = setInterval(() => show(c + 1), 5000), reset = () => { clearInterval(t); start() };
            const nb = box.querySelector(".next"), pb = box.querySelector(".prev");
            if (nb) nb.onclick = e => { e.stopPropagation(); show(c + 1); reset() }; if (pb) pb.onclick = e => { e.stopPropagation(); show(c - 1); reset() };
            start();
        };
        try {
            const r = await fetch(BASE + "assets/slideshow/slideshow.json"); if (!r.ok) throw 0;
            let d = await r.json(); for (let i = d.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[d[i], d[j]] = [d[j], d[i]] }
            const ov = box.querySelector(".slide-overlay");
            d.forEach((src, i) => { const div = document.createElement("div"); div.className = `hero-slide ${i === 0 ? "active" : ""}`; div.innerHTML = `<img src="${BASE}assets/slideshow/${src}" alt="Slide" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}>`; box.insertBefore(div, ov) });
            run();
        } catch (e) { console.warn("Slide Err", e); run() }
    };

    // 5. COMPONENT LOADER & NAV
    const load = async () => {
        const get = async f => { const r = await fetch(BASE + f); return r.ok ? await r.text() : null };
        const h = await get('header.html'), f = await get('footer.html'), m = document.getElementById("main-content-area");
        if (h) { document.getElementById('global-header').innerHTML = h; fix(); nav() }
        if (f) { document.getElementById('global-footer').innerHTML = f; fix(); const y = document.getElementById("current-year"); if (y) y.textContent = new Date().getFullYear() }
        if (m) { try { const r = await fetch(BASE + "homepage.html"); if (r.ok) { m.innerHTML = await r.text(); fix(); document.querySelectorAll('.reveal').forEach(e => obs.observe(e)); initSlide() } } catch (e) { console.error(e) } }
    };

    // 6. NAVIGATION LOGIC
    const nav = () => {
        const path = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll(".nav-list a").forEach(l => {
            if (l.getAttribute("href")?.endsWith(path)) { l.classList.add("active"); l.closest(".nav-item")?.querySelector(".nav-link")?.classList.add("active") }
        });
        const btn = document.querySelector(".mobile-menu-toggle"), list = document.querySelector(".nav-list"), over = document.getElementById("sidebar-overlay");
        if (btn && list) {
            const tog = f => { const a = f ? 0 : !list.classList.contains("active"); list.classList.toggle("active", a); btn.classList.toggle("active", a); if (over) over.classList.toggle("active", a); document.body.style.overflow = a ? "hidden" : "" };
            btn.onclick = e => { e.stopPropagation(); tog() }; if (over) over.onclick = () => tog(!0);
            list.onclick = e => { const l = e.target.closest("a"); if (!l) return; const s = l.nextElementSibling; if (s && (s.matches('.dropdown-menu') || s.matches('.dropdown-submenu'))) { e.preventDefault(); e.stopPropagation(); l.parentElement.classList.toggle("dropdown-active") } else { tog(!0) } }
        }
    };
    load();
});