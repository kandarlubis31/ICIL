# 📐 05 — Responsive Breakpoints

> 🟡 Intermediate | Prereq: 01 | ~3 min

Breakpoints = points where layout changes to adapt to screen size. **Mobile-first = default approach.**

---

## 5.1 Mobile-First Pattern

```css
/* Base: Mobile (no media query — default!) */
.container { padding: 16px; }

/* Tablet: add complexity */
@media (min-width: 768px) { .container { padding: 32px; max-width: 720px; } }

/* Desktop */
@media (min-width: 1024px) { .container { max-width: 960px; } }
```

> Why mobile-first? Lighter CSS on mobile, progressive enhancement, mobile traffic > desktop (since 2016).

---

## 5.2 Breakpoint Table

| Name | Min Width | Devices |
|------|-----------|---------|
| XS | 0 (default) | All phones |
| SM | 640px | Large phones, small tablets |
| MD | 768px | Tablets |
| LG | 1024px | Laptops, small desktops |
| XL | 1280px | Desktops |
| 2XL | 1536px | Large/ultrawide |

---

## 5.3 Container Queries — Component-Level Responsiveness

```css
.card-wrapper { container-type: inline-size; container-name: card; }

@container card (min-width: 400px) {
  .card { display: grid; grid-template-columns: 150px 1fr; }
}
@container card (max-width: 399px) {
  .card { display: flex; flex-direction: column; }
}
```

> Media queries = viewport. Container queries = parent. Components become TRULY reusable!

### Container Query Units — Fluid Sizing Relative to Parent:

```css
/* cqw = 1% of container width, cqi = inline size, cqh = height, cqmin/cqmax */

/* Fluid typography that scales with CONTAINER, not viewport */
.card-title { font-size: clamp(1rem, 5cqi, 1.5rem); }

/* Spacing relative to container */
.card-padding { padding: 2cqi 4cqi; }

/* Better than vw for components — works in any layout context */
```

---

## ⚡ Action Checklist
- [ ] Always mobile-first: base CSS = mobile, `min-width` queries = tablet+
- [ ] Use standard breakpoints (640, 768, 1024, 1280) — not arbitrary values
- [ ] For reusable components: container queries > media queries
- [ ] Avoid `max-width` media queries (desktop-first anti-pattern)
