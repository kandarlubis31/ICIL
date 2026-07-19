# 🎨 05 — Digital Color Models & Spaces

> 🟡 Intermediate | Prereq: 01 | ~6 min

Color has many "languages" — RGB, Hex, HSL, CMYK, LAB, LCH, OKLCH. Each serves a specific purpose.

---

## 5.1 Model Overview

| Model | Type | Medium | Key Trait |
|-------|------|--------|-----------|
| **RGB** | Additive | Screens | 0–255 per channel; more light = brighter |
| **Hex** | Additive | Web/CSS | #RRGGBB or #RRGGBBAA (8-digit with alpha) |
| **HSL** | Cylindrical | Design tools | Intuitive: Hue(0-360°), Sat%(0-100), Light%(0-100) |
| **HSV/HSB** | Cylindrical | Color pickers | V=100% = pure color (vs HSL where L=50% = pure) |
| **CMYK** | Subtractive | Print | C+M+Y=dark brown (needs K for true black) |
| **CIELAB** | Perceptual | Color correction | Device-independent; L* a* b*; ΔE metric |
| **LCH** | Cylindrical | Modern CSS | Lightness, Chroma, Hue |
| **OKLCH** | Perceptual | Modern CSS | Fixes HSL's non-uniform brightness |
| **OKLab** | Perceptual | Color science | OKLCH without hue/chroma split; base space |
| **ACES** | Wide gamut | Film/VFX | Academy standard for HDR pipelines |

> ⚠️ Super vivid RGB neon colors **CANNOT** be printed in CMYK. Convert before sending to print!

---

## 5.2 HSL Deep Dive

```
hsl(H, S%, L%)
  H = 0°(Red), 120°(Green), 240°(Blue)
  S = 0%(gray), 100%(pure)
  L = 0%(black), 50%(pure color), 100%(white)
```

```css
hsl(0, 100%, 50%)    → Pure red
hsl(0, 100%, 75%)    → Pastel red (tint)
hsl(0, 100%, 25%)    → Dark red (shade)
hsl(0, 50%, 50%)     → Muted red (tone)
```

---

## 5.3 OKLCH — The Game Changer

Fixes HSL's biggest flaw — **perceptual non-uniformity**. In HSL, `L=50%` blue looks much darker than `L=50%` yellow. OKLCH fixes this:

```css
/* Both have same perceived brightness in OKLCH ✅ */
oklch(0.5, 0.2, 240)  → Blue
oklch(0.5, 0.2, 60)   → Yellow

/* In HSL, same Lightness = different brightness ❌ */
hsl(240, 100%, 50%)    → Dark blue
hsl(60, 100%, 50%)     → Bright yellow
```

**Support**: Chrome 111+, Firefox 113+, Safari 15.4+, Tailwind v4.

## 5.4 CSS Color Module Level 5 — New Features

```css
/* color-mix(): blend two colors in any color space */
color-mix(in oklch, var(--brand) 60%, white)

/* Relative color syntax: derive variants from a base */
oklch(from var(--main) calc(l + 0.1) c h)  /* lighter variant */
oklch(from var(--main) calc(l - 0.1) c h)  /* darker variant */

/* light-dark(): auto-switch based on color-scheme */
color: light-dark(#333, #fff);  /* dark in light mode, light in dark mode */
```

> ℹ️ **Status**: Level 5 is Candidate Recommendation as of 2026 — `color-mix()` and relative colors have wide support; `light-dark()` is newer.

---

## 5.5 CIELAB & ΔE (Color Difference)

| ΔE | Perceived Difference |
|----|---------------------|
| < 1 | Indistinguishable |
| 1–2 | Only experts notice |
| 2–10 | Noticeable at a glance |
| 11–49 | More similar than opposite |
| 50+ | Completely different |

> Branding standard: ΔE < 2 for color consistency.

> 📐 **Modern ΔE**: ΔE 2000 (CIEDE2000) is the print/manufacturing standard. For digital/web, **Oklab-based ΔE** (ΔE_OK) is gaining traction — it's more perceptually uniform than CIELAB-based formulas.

Relative Luminance (for WCAG 2.x contrast):
```
L = 0.2126×R' + 0.7152×G' + 0.0722×B'
```
Eye sensitivity: Green(71%) > Red(21%) > Blue(7%).

> ⚠️ **WCAG 3.0 / APCA**: The upcoming WCAG 3.0 replaces relative luminance with **APCA** (Advanced Perceptual Contrast Algorithm) — a context-dependent model that accounts for font size, weight, and spatial properties. Until WCAG 3.0 is finalized, use WCAG 2.x luminance formula for compliance; use APCA for advanced design work.

---

## 5.6 Color Spaces (Gamut)

| Space | Coverage | Usage |
|-------|----------|-------|
| sRGB | ~35% visible | Web standard |
| Display-P3 | Wider | Apple devices, HDR |
| Adobe RGB | ~50% | Pro photography |
| Rec.2020 | Very wide | 4K/8K HDR video |
| ProPhoto RGB | ~100% | Extreme editing |

---

## 5.7 When to Use What

| Need | Model |
|------|-------|
| CSS / Web | Hex, rgb(), hsl() |
| Modern CSS | oklch() |
| Color picker | HSB/HSV |
| Design system | HSL, OKLCH |
| Print | CMYK |
| Color correction | CIELAB |
| Smooth gradients | OKLCH (no "muddy middle") |
| Dark mode generation | OKLCH (accurate brightness) |

---

## ⚡ Action Checklist
- [ ] Use HSL for manual color tweaking (more intuitive than Hex/RGB)
- [ ] Migrate to OKLCH for new projects — better interpolation + perceptual uniformity
- [ ] Always convert RGB → CMYK before sending to print
- [ ] Use ΔE < 2 as brand color consistency threshold
- [ ] Test palette in P3 gamut for Apple devices (wider colors)
