# 🔤 06 — Variable Fonts

> 🔴 Advanced | Prereq: 01, 02 | ~3 min

Single font file = entire family. All weights, widths, slants, optical sizes in one file.

---

## 6.1 Static vs Variable

```
STATIC: Regular(20KB) + Bold(20KB) + Italic(20KB) + BoldItalic(20KB) = 80KB + 5 requests
VARIABLE: 1 file (~60KB) + 1 request. Covers 300-700 weight, regular & italic.
```

---

## 6.2 Registered Axes

| Axis | CSS | Range |
|------|-----|-------|
| Weight | `wght` | 100–900 |
| Width | `wdth` | 50%–200% |
| Slant | `slnt` | 0° to -90° |
| Italic | `ital` | 0 or 1 |
| Optical Size | `opsz` | 6–144 (auto-adjusts: thick+loose at small, fine+tight at large) |

---

## 6.3 CSS Implementation

```css
@font-face {
  font-family: 'InterVariable';
  src: url('InterVariable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-stretch: 50% 200%;
  font-style: oblique 0deg 12deg;
}
.text {
  font-family: 'InterVariable', sans-serif;
  font-weight: 450;           /* ANY value 100-900! */
  font-stretch: 110%;
}
```

### Animation with Variable Fonts:
```css
@keyframes breathe {
  0%, 100% { font-variation-settings: 'wght' 300; }
  50%      { font-variation-settings: 'wght' 800; }
}
```

---

## 6.4 Popular Variable Fonts

| Font | Axes | Best For |
|------|------|----------|
| **Roboto Flex** | wght, wdth, GRAD, opsz, slnt + more | Full range demo |
| **Inter** | wght, slnt | UI body + heading ⭐ |
| **Open Sans** | wght, wdth | General web |
| **Montserrat** | wght | Headings, branding |

> ~96%+ global browser support. Production-ready!

---

## ⚡ Action Checklist
- [ ] Replace multi-file static fonts with single variable font (save ~30% size + requests)
- [ ] Use optical size axis for responsive typography (auto-adjust per size)
- [ ] Set grade (GRAD) axis for dark mode instead of changing weight
