# 🔤 07 — Web Typography & Performance

> 🔴 Advanced | Prereq: 01, 06 | ~3 min

Fonts = largest assets after images. Wrong loading = layout shift, invisible text (FOIT), ruined UX.

---

## 7.1 FOIT vs FOUT

| Problem | User Sees | Fix |
|---------|-----------|-----|
| **FOIT** (Flash of Invisible Text) | [BLANK 3s] → [TEXT] | `font-display: swap` |
| **FOUT** (Flash of Unstyled Text) | [FALLBACK] → jump → [CUSTOM] | Match fallback font metrics |

---

## 7.2 font-display Values

| Value | Behavior | Best For |
|-------|----------|----------|
| **swap** | Fallback first, swap when ready | ✅ Body text (recommended) |
| **block** | Hide 3s, fallback if not ready | Headings (avoid FOUT) |
| **optional** | Hide 100ms, fallback, NEVER swap | Icons, non-critical fonts |

---

## 7.3 Loading Strategy

```css
/* 1. font-display: swap */
@font-face {
  font-family: 'Inter';
  src: url('Inter.woff2') format('woff2');
  font-display: swap;
}
```

```html
<!-- 2. Preload critical fonts -->
<link rel="preload" href="/fonts/Inter.woff2" as="font" type="font/woff2" crossorigin>

<!-- 3. Subset to Latin-only if not serving CJK/Cyrillic -->
```

---

## 7.4 Format & Budget

| Decision | Recommendation |
|----------|---------------|
| Format | **WOFF2 only** (30%+ smaller than WOFF, 97%+ support) |
| Budget | **Total font download < 200KB** |
| System fonts | Use for: internal apps, dashboards, MVPs (zero download) |

```css
/* Zero-download system font stack */
body {
  font-family: -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, 'Helvetica Neue', sans-serif;
}
```

---

## ⚡ Action Checklist
- [ ] Use `font-display: swap` on all body fonts
- [ ] Preload critical fonts in `<head>` (1-2 files max)
- [ ] Subset fonts to Latin-only if you don't serve non-Latin scripts
- [ ] Set font budget: total < 200KB, WOFF2 only
- [ ] Match fallback font metrics to minimize FOUT layout shift
