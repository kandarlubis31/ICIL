# 🎨 08 — Color in Design Systems

> 🔴 Advanced | Prereq: 05 | ~5 min

Enterprise color architecture: scalable, semantic, theme-able. From design tokens to Material 3, Tailwind, Pantone.

---

## 8.1 Design Tokens (3-Level Architecture)

| Level | Name | Example | Purpose |
|-------|------|---------|---------|
| 1 | **Primitive** | `blue-500: #3B82F6` | Single source of truth |
| 2 | **Semantic** | `color-primary: blue-500` | Theme without touching components |
| 3 | **Component** | `button-primary-bg: color-primary` | Override per context |

```
tokens/
├── primitives/colors.json     ← raw values
├── semantic/light.json        ← purpose mapping
│   semantic/dark.json
└── component/button.json      ← context tokens
```

---

## 8.2 Material Design 3 (M3)

Seed Color → HCT algorithm → Dynamic Palette:

| Role | Definition |
|------|-----------|
| **Primary** | Main brand color |
| **On Primary** | Text/icons on primary |
| **Primary Container** | Muted primary version |
| **Secondary** | Supporting color |
| **Tertiary** | Contrasting accent |
| **Error** | Error state (red) |
| **Surface** | Background |
| **Outline** | Borders |

**HCT** (Hue, Chroma, Tone): New color space with perceptually uniform brightness. Powers Material You dynamic theming from wallpaper.

---

## 8.3 Tailwind CSS v4 (OKLCH)

22 colors × 11 shades, now in OKLCH:

```css
/* Old (HSL) */
--blue-500: hsl(217, 91%, 60%);

/* New (OKLCH) — perceptual uniformity */
--blue-500: oklch(0.623 0.214 259.82);
```

OKLCH advantages: ✅ Equal brightness across all hues, ✅ No "muddy middle" in gradients, ✅ Wider P3 gamut on supported devices.

---

## 8.4 Build Your Own Token System

```javascript
function generateFromSeed(hexSeed) {
  const [h, s, l] = hexToHSL(hexSeed);
  return {
    primary: hexSeed,
    secondary: `hsl(${(h + 30) % 360}, ${s * 0.7}%, ${l}%)`,
    accent: `hsl(${(h + 180) % 360}, ${s * 0.5}%, ${l}%)`,
    neutral: generateGrayScale(h * 0.02),
    semantic: {
      success: `hsl(142, 76%, ${l}%)`,
      error: `hsl(0, 84%, ${l}%)`,
      warning: `hsl(38, 92%, ${l}%)`,
    }
  };
}
```

---

## 8.5 Light ↔ Dark Mode (Semantic Token Swap)

```css
:root {
  --surface: #FFFFFF;  --text: #1A1A1A;  --primary: #3B82F6;
}
[data-theme="dark"] {
  --surface: #121212;  --text: #E0E0E0;  --primary: #60A5FA;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --surface: #121212;  --text: #E0E0E0;  --primary: #60A5FA;
  }
}
```

Components don't know about light/dark — they just reference semantic tokens.

---

## ⚡ Action Checklist
- [ ] Implement 3-level token architecture (primitive → semantic → component)
- [ ] Use OKLCH for color definitions in new design systems
- [ ] Generate semantic tokens for BOTH light and dark themes
- [ ] Test dynamic theming with a single seed color (M3-style)
- [ ] Document Pantone equivalents if designing for print
