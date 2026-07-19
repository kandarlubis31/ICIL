# 🎨 01 — Color Theory Basics

> 🟢 Beginner | Prereq: — | ~5 min

Color is brain's interpretation of light waves (380–750nm), NOT a physical property of objects.

---

## 1.1 Human Color Perception

| Cell | Count | Detects | Active In |
|------|-------|---------|-----------|
| **S-Cones** | ~6M total | Short λ (Blue, ~420nm) | Photopic (bright) |
| **M-Cones** | | Medium λ (Green, ~530nm) | Photopic (bright) |
| **L-Cones** | | Long λ (Red, ~560nm) | Photopic (bright) |
| **Rods** | ~120M | Intensity only (grayscale) | Scotopic (low light) |

> 🧠 **Color Constancy**: Brain auto-corrects color based on ambient light. White paper looks white under sun OR lamp.

**Spectrum**: UV → Violet(450) → Blue(495) → Green(570) → Yellow(590) → Orange(620) → Red(750) → IR (in nm)

---

## 1.2 Color Wheel (Newton, 1666)

| Layer | Colors | Definition |
|-------|--------|-----------|
| **Primary** | 🔴 Red, 🟡 Yellow, 🔵 Blue | Cannot mix from others |
| **Secondary** | 🟠 Orange, 🟢 Green, 🟣 Violet | Mix 2 primaries |
| **Tertiary** | 6 colors (Red-Orange, Yellow-Orange, etc.) | Mix 1 primary + 1 secondary |

---

## 1.3 Color Properties

| Property | Measures | Scale | Variants |
|----------|----------|-------|-----------|
| **Hue** | "What color?" — position on wheel | 0–360° | — |
| **Value** | "How bright?" — luminosity | 0–100% | Tint (+White), Shade (+Black), Tone (+Gray) |
| **Saturation** | "How pure?" — intensity | 0% (gray) → 100% (vivid) | Pastel = low, Vibrant = high |
| **Temperature** | "How warm?" — perceived heat | Subjective | 🔥 Warm (R/O/Y) vs ❄️ Cool (B/G/V) |

> ⚠️ Temperature is **relative** — orange feels "cool" beside red.

---

## 1.4 Color Models

| Model | Type | Primaries | Medium | Mix All → |
|-------|------|-----------|--------|-----------|
| **RGB** | Additive | Red, Green, Blue | Digital screens | ⚪ White |
| **CMYK** | Subtractive | Cyan, Magenta, Yellow, Key | Print/ink | ⚫ Black (needs K) |
| **HSL** | Cylindrical | Hue, Saturation, Lightness | CSS/design tools | — |
| **LAB** | Perceptual | L*, a*, b* | Device-independent | — |

---

## ⚡ Action Checklist
- [ ] Define colors in HSL for intuitive mental mapping
- [ ] Check value contrast before tweaking hue
- [ ] Test palette in grayscale to verify rod-cell readability
- [ ] Use RGB for screens, CMYK only for print output
- [ ] Remember: color perception = light source × object × observer — always test on real devices
