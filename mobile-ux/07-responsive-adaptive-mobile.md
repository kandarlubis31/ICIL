# 📱 07 — Responsive & Adaptive Mobile Layouts

> **Level: 🔴 Advanced** | Prerequisite: 01, 02, 03, 05 | Est. reading time: 12 min

One layout doesn't fit all. From 320px phones to foldable tablets at 1024px, your interface must adapt seamlessly. This course covers responsive strategies (fluid layouts that stretch), adaptive strategies (layout changes at breakpoints), and the modern CSS tools — container queries, `clamp()`, and subgrid — that make mobile layouts robust.

---

## 7.1 Responsive vs Adaptive

| | Responsive | Adaptive |
|---|-----------|----------|
| **How it works** | Fluid: elements resize proportionally | Snaps: layout changes at breakpoints |
| **Breakpoints** | None — continuous scaling | Defined: 320, 768, 1024, etc. |
| **Best for** | Typography, spacing, images | Layout structure, navigation position |
| **CSS** | `clamp()`, `%`, `vw`, `fr` | `@media` queries, Container queries |
| **Mobile application** | Both: use responsive for content, adaptive for structure |

---

## 7.2 Modern Responsive Tools

### `clamp()` — The One-Line Responsive Solution:

```css
/* clamp(MIN, PREFERRED, MAX) — automatically scales between bounds */

/* Fluid typography: 16px at 320px, scales to 24px at 1200px */
h1 { font-size: clamp(1.5rem, 4vw, 3rem); }

/* Fluid spacing: 16px minimum, 32px maximum */
.section { padding: clamp(1rem, 5vw, 2rem); }

/* Fluid card width: 280px minimum, 2-column at max */
.card { width: clamp(280px, 50%, 600px); }
```

### Container Queries — Style Based on Parent Width:

```css
/* Define a containment context */
.card-container {
  container-type: inline-size;
  container-name: card;
}

/* Style the card based on ITS CONTAINER width, not viewport */
@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 120px 1fr; /* Image + text side by side */
    gap: 1rem;
  }
}

@container card (max-width: 399px) {
  .card {
    display: flex;
    flex-direction: column; /* Stack vertically on narrow containers */
  }
  .card-image { width: 100%; height: 200px; }
}
```

---

## 7.3 Breakpoint Strategy for Mobile

Stop using device-specific breakpoints. Use **content-driven breakpoints** — add a breakpoint when your content looks wrong, not when a specific device exists:

```css
/* Content-driven breakpoints — based on when layout BREAKS, not device names */

/* Mobile portrait: 320-480px (default — no media query needed) */
/* Single column, stacked layout */

/* Mobile landscape / small tablet: when content needs more room */
@media (min-width: 540px) {
  .product-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Tablet portrait: enough width for sidebar + content */
@media (min-width: 768px) {
  .layout { display: grid; grid-template-columns: 240px 1fr; }
  .mobile-nav { display: none; }
  .desktop-nav { display: flex; }
}

/* Tablet landscape / small desktop: wider content areas */
@media (min-width: 1024px) {
  .product-grid { grid-template-columns: repeat(3, 1fr); }
  .container { max-width: 960px; margin: 0 auto; }
}

/* Large desktop */
@media (min-width: 1280px) {
  .product-grid { grid-template-columns: repeat(4, 1fr); }
  .container { max-width: 1200px; }
}
```

---

## 7.4 Responsive Navigation Pattern

```css
/* MOBILE: Bottom nav bar */
.mobile-nav {
  position: fixed; bottom: 0; left: 0; right: 0;
  display: flex; justify-content: space-around;
  height: 56px; background: #fff;
  border-top: 1px solid #eee;
  padding-bottom: env(safe-area-inset-bottom);
}

.desktop-nav { display: none; } /* Hidden on mobile */

/* TABLET+: Top nav replaces bottom nav */
@media (min-width: 768px) {
  .mobile-nav { display: none; }
  .desktop-nav {
    display: flex; gap: 24px;
    align-items: center;
    padding: 0 24px; height: 56px;
    border-bottom: 1px solid #eee;
  }
  .main-content { padding-bottom: 0; } /* Remove mobile bottom nav padding */
}

/* Small mobile landscape: keep bottom nav but minimal */
@media (max-width: 767px) and (orientation: landscape) {
  .mobile-nav { height: 44px; } /* Shorter nav in landscape */
}
```

---

## 7.5 Foldables & Large Screens

Foldables introduce new challenges: ~360px folded, ~690-900px unfolded. Container queries handle this naturally:

```css
/* Foldable-aware layout using container queries */
.app-shell {
  container-type: inline-size;
}

/* Folded (narrow): mobile layout */
@container (max-width: 400px) {
  .app-shell {
    display: flex; flex-direction: column;
  }
  .sidebar { display: none; }
}

/* Unfolded (wide): tablet/desktop layout */
@container (min-width: 690px) {
  .app-shell {
    display: grid;
    grid-template-columns: 280px 1fr;
  }
  .sidebar { display: block; }
}

/* Dual-screen (hinge-aware for Surface Duo, Galaxy Fold) */
/* Uses Viewport Segments API (replaces deprecated @media spanning) */
@media (horizontal-viewport-segments: 2) {
  .app-shell {
    /* Content on left screen, complementary on right */
    grid-template-columns: env(viewport-segment-width 0 0) 1fr;
  }
}
```

---

## 7.6 The Device Spectrum

```
DEVICE SPECTRUM (most → least common):

  SMARTPHONE         PHABLET          TABLET           FOLDABLE         DESKTOP
  │ 360  │          │  430   │       │   768    │      │360 │720 │      │  1280+   │
  │  to  │          │   to   │       │    to    │      │fold│open│      │          │
  │ 430  │          │  540   │       │  1024    │      │    │    │      │          │
    60%               15%               12%               3%                5%
  (design first)  (stretch phone)  (responsive test)  (flexible)       (enhancement)

Design priority: 360 → 430 → 768 → 1024 → 1280+
  (360px is the modern baseline; 320px is legacy but still safe)
```

---

## 7.7 Responsive Grid System

```css
/* Complete responsive grid that works 320px → ∞ */
.grid {
  display: grid;
  gap: clamp(1rem, 3vw, 1.5rem);
  grid-template-columns: repeat(
    auto-fill,
    minmax(min(100%, 300px), 1fr)
  );
  /* 
    min(100%, 300px): on screens < 300px, use full width
    auto-fill: auto-calculates columns based on available space
    No media queries needed — fully responsive!
  */
}

/* Responsive card with container query */
.card-wrapper {
  container-type: inline-size;
}

@container (min-width: 500px) {
  .card { display: grid; grid-template-columns: 150px 1fr; gap: 1rem; }
  .card-image { width: 150px; height: 100%; }
}

@container (max-width: 499px) {
  .card { display: flex; flex-direction: column; }
  .card-image { width: 100%; height: 200px; object-fit: cover; }
}
```

---

## 7.8 Testing Strategy

```
RESPONSIVE TESTING CHECKLIST:

  320px portrait  □ Layout: single column, no overflow
                  □ Touch targets: ≥ 48px
                  □ Text: readable at default zoom
                  □ Nav: bottom or hamburger

  430px portrait  □ Grid: 2 columns where appropriate
                  □ Content: not stretched too wide
                  □ Forms: inputs don't span full width awkwardly

  768px portrait  □ Layout: sidebar + content split
                  □ Nav: transitions from mobile to desktop pattern
                  □ Touch: targets can be smaller (not thumb-driven)

  1024px+         □ Content: max-width capped (~1200px)
                  □ Grid: multi-column where beneficial
                  □ All features available (not simplified)
```

---

## Quick Summary

| Technique | CSS | Best For |
|-----------|-----|----------|
| **`clamp()`** | `font-size: clamp(1rem, 3vw, 2rem)` | Fluid typography & spacing |
| **Container queries** | `@container (min-width: 400px)` | Component-level responsive |
| **`auto-fill` + `minmax`** | `repeat(auto-fill, minmax(280px, 1fr))` | Auto-responsive grids |
| **`env(safe-area-inset-*)`** | `padding-bottom: env(safe-area-inset-bottom)` | Notch & home indicator safe areas |
| **Content-first breakpoints** | `@media (min-width: ...)` | Layout structure changes |
| **`orientation`** | `@media (orientation: landscape)` | Landscape vs portrait adaptations |
