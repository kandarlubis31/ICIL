# 🎨 06 — Color Accessibility

> 🟡 Intermediate | Prereq: 02 | ~5 min

~8% of men and 0.5% of women have color vision deficiency (CVD). Accessible color = legal compliance + bigger audience + better UX for ALL users.

---

## 6.1 Color Blindness Types (CVD)

| Type | Defect | Prevalence (♂) | Sees Red/Green As |
|------|--------|---------------|-------------------|
| **Deuteranomaly** | Green-weak (M-cones) | ~5% ← MOST COMMON | 🟤/🟡 |
| **Protanomaly** | Red-weak (L-cones) | ~1% | 🟤/🟡 |
| **Deuteranopia** | Green-blind (M-cones absent) | ~1% | 🟤/🟡 |
| **Protanopia** | Red-blind (L-cones absent) | ~1% | 🟤/🟡 |
| **Tritanopia** | Blue-blind | ~0.01% | 🔵/🩷 (rare) |
| **Achromatopsia** | No color (greyscale) | 1:33,000 | ⚫⚪ only |

> 99% of CVD is red-green type. **Blue-Orange = safest combination globally.**

---

## 6.2 WCAG 2.2 Contrast Requirements

| Level | Element | Minimum Ratio |
|-------|---------|--------------|
| **AA** | Normal text (< 18pt / < 14pt bold) | **4.5:1** |
| **AA** | Large text (≥ 18pt / ≥ 14pt bold) | **3:1** |
| **AA** | UI components & graphical objects | **3:1** |
| **AAA** | Normal text | **7:1** |
| **AAA** | Large text | **4.5:1** |

### Real Examples
```
#FFF on #000      → 21:1   ✅ AAA
#FFF on #767676   → 4.54:1 ✅ AA
#CCC on #FFF      → 1.6:1  ❌ FAIL
#FFFF00 on #FFF   → 1.07:1 ❌ EPIC FAIL
#003366 on #FFF   → 13.4:1 ✅ AAA
#FF6600 on #FFF   → 3.4:1  ⚠️ AA large text only
```

---

## 6.3 Golden Rule: Color is NEVER Enough

> Never use color as the ONLY way to convey information.

| Scenario | ❌ Bad (Color Only) | ✅ Good (Color + Text/Icon) |
|----------|-------------------|---------------------------|
| Error | Red text | ❌ icon + "Password must be 8+ chars" |
| Success | Green text | ✅ icon + "Password accepted!" |
| Charts | Different color bars | Colors + patterns/textures/labels |
| Links | Blue text only | Blue + **underline** |
| Required | Red asterisk only | Red * + "(required)" text |
| Selected tab | Color highlight only | Color + outline/border |

---

## 6.4 Colorblind-Safe Palette

Distinguishable in all CVD types:
```
#004949 ■ Dark Teal    #009292 ■ Teal       #FF6DB6 ■ Pink
#490092 ■ Dark Purple  #006DDB ■ Blue       #B66DFF ■ Lavender
#920000 ■ Dark Red     #924900 ■ Brown      #DBD100 ■ Yellow
#24FF24 ■ Bright Green
```

Safest 2-color combo: 🔵 **Blue (#0077BB)** + 🟠 **Orange (#EE7733)**

---

## 6.5 APCA — WCAG 3.0 (Draft)

> ℹ️ **Status**: APCA is the proposed contrast model for WCAG 3.0 (still in draft). Until WCAG 3.0 is finalized, use WCAG 2.2 luminance ratios for compliance; use APCA for advanced design work.

More accurate than WCAG 2.x:
- Accounts for font size/weight granularly
- Accounts for polarity (light-on-dark vs dark-on-light)

| APCA Lc Score | Meaning |
|---------------|---------|
| 75+ | Excellent for all text |
| 60 | Minimum body text |
| 45 | Minimum large text |
| 30 | Minimum very large/bold |
| 15 | Non-text only |

---

## 6.6 Tools

| Tool | Function |
|------|----------|
| WebAIM Contrast Checker | Manual contrast check |
| Stark | Figma/Sketch/XD plugin |
| axe DevTools | Automated a11y testing |
| Color Oracle | Real-time CVD simulator |
| WhoCanUse | Contrast + grading |

---

## ⚡ Action Checklist
- [ ] Verify ALL text has ≥ 4.5:1 contrast (AA minimum)
- [ ] Test entire palette with Color Oracle in deuteranopia mode
- [ ] Add underline to all inline links (never color-only)
- [ ] Use icons + text for ALL error/success/warning states
- [ ] Add patterns/textures to chart segments beyond color
- [ ] Check both light AND dark mode contrast separately
