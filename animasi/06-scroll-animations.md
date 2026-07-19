# ✨ 06 — Scroll Animations

> 🔴 Advanced | Prereq: 01, 03 | ~4 min

Reveal content as user scrolls — creates discovery and progress. Fade-ins to parallax.

---

## 6.1 Three Approaches

| Approach | Complexity | Performance | Best For |
|----------|-----------|-------------|----------|
| **Intersection Observer** | Low | Excellent | Fade-in, reveal once |
| **CSS Scroll-Driven** | Medium | Excellent (compositor) | Progress bars, parallax |
| **GSAP ScrollTrigger** | High | Very good | Complex choreography, pinning |

---

## 6.2 Intersection Observer — Fade on Scroll

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Once only
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

```css
.reveal { opacity: 0; transform: translateY(30px); transition: all 600ms ease-out; }
.reveal.visible { opacity: 1; transform: translateY(0); }
```

---

## 6.3 CSS Scroll-Driven (Native)

```css
/* Progress bar */
@keyframes progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.progress-bar {
  position: fixed; top: 0; height: 4px; background: #3498db;
  transform-origin: left;
  animation: progress linear both;
  animation-timeline: scroll();
}

/* Reveal on scroll */
.reveal-element {
  animation: fade-in linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 30%;
}
```

---

## 6.4 GSAP ScrollTrigger

```javascript
gsap.registerPlugin(ScrollTrigger);
gsap.to('.hero-title', {
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true, pin: true },
  scale: 0.8, opacity: 0,
});
gsap.from('.card', {
  scrollTrigger: '.card-grid', y: 60, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
});
```

---

## 6.5 Performance Rules

| ✅ GPU (Compositor) | ❌ Reflow (Never) |
|---------------------|-------------------|
| `translateY()`, `opacity` | `top`, `left`, `margin-top` |
| `will-change: transform` (sparingly) | `scroll` event + `getBoundingClientRect()` |

---

## ⚡ Action Checklist
- [ ] Use Intersection Observer for simple "fade on scroll" reveals
- [ ] Use CSS scroll-driven for progress bars (no JS needed)
- [ ] GSAP ScrollTrigger only for complex choreography (pinning, scrubbing)
- [ ] Never use `scroll` event + `getBoundingClientRect()` — jank city
