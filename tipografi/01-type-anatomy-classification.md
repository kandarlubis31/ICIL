# 🔤 01 — Typeface Anatomy & Classification

> 🟢 Beginner | Prereq: — | ~4 min

Understand letter "parts" before choosing fonts. Like anatomy before medicine.

---

## 1.1 Letter Anatomy

| Term | Definition | Letter Example |
|------|-----------|---------------|
| **Baseline** | Invisible line where letters "sit" | —————— |
| **X-height** | Height of lowercase 'x' | Determines perceived size |
| **Cap Height** | Height of capitals (H, E, T) | Above x-height |
| **Ascender** | Rises above x-height | h, b, d, l |
| **Descender** | Drops below baseline | g, j, p, y |
| **Stem** | Main vertical/diagonal stroke | H, T |
| **Bowl** | Curved enclosed space | d, b, o |
| **Serif** | Decorative "foot" at stroke end | Times New Roman |
| **Counter** | Enclosed empty space | Hole in o, d, p |

> Large x-height = font feels bigger at same size. Use for body text. Small x-height = elegant, use for headings.

---

## 1.2 Classification

> ℹ️ **Note**: The historical Vox-ATypI classification system was **de-adopted by ATypI in 2021** (Eurocentric bias, couldn't accommodate global scripts). The categories below remain useful descriptively, but no single taxonomy is "official" in 2026. Modern practice favors **descriptive/functional** grouping over rigid historical pigeonholing.

| Class | Traits | Examples | Best For |
|-------|--------|----------|----------|
| **Old Style Serif** | Low contrast, angled serifs | Garamond | Long-form print |
| **Transitional** | Medium contrast | Times New Roman | General print |
| **Modern/Didone** | Extreme contrast, thin serifs | Bodoni | Luxury headings |
| **Slab Serif** | Thick block serifs | Rockwell | Headlines |
| **Grotesque Sans** | Slight contrast, square | Helvetica | UI, signage |
| **Neo-Grotesque** | Minimal contrast, neutral | Inter, Geist, DM Sans | Web body, UI ⭐ |
| **Humanist Sans** | Organic forms | Open Sans, Mona Sans | Readable UI |
| **Geometric Sans** | Circles & lines based | Futura, Montserrat | Branding, headings |
| **Script** | Handwriting-like | Pacifico | Logos, accents only |
| **Display** | Unique, expressive | Bebas Neue | Large headings only |
| **Monospace** | Equal width per char | Fira Code, JetBrains Mono | Code, tables |

---

## 1.3 Weight Scale

```
100 Thin → 200 ExtraLight → 300 Light → 400 Regular (base)
→ 500 Medium → 600 SemiBold → 700 Bold → 800 ExtraBold → 900 Black
```

> 📦 **Variable fonts** (mainstream in 2026): A single font file covers the entire 1–1000 range. Use `font-weight: 375` for fine-grained control — no need to download multiple static files. Adjust weight dynamically for different screen sizes (optical sizing).

> Static fonts (fallback): Minimum 400 + 700. Ideal: 400 + 500 + 700.

---

## ⚡ Action Checklist
- [ ] Choose body font with large x-height and open aperture for readability
- [ ] Prefer **variable fonts** — one file, full weight range, dynamic optical sizing
- [ ] If static fonts: verify at least Regular(400) + Bold(700)
- [ ] Deliver as **WOFF2**; consider **Incremental Font Transfer (IFT)** for CJK/large fonts
- [ ] Script fonts: headings/logos only — NEVER body text
- [ ] Match classification to brand: serif=traditional, sans=modern, geo=clean
