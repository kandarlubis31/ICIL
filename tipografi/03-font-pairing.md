# 🔤 03 — Font Pairing

> 🟡 Intermediate | Prereq: 01 | ~3 min

Combine 2-3 typefaces that complement, not fight. Good pairing = elevated design. Bad = amateur.

---

## 3.1 Core Principles

| # | Rule | Detail |
|---|------|--------|
| 1 | **Anchor first** | One main font (body/UI). Second = support only. |
| 2 | **Contrast > Similarity** | Two fonts must be clearly DIFFERENT. Too similar = looks like a bug. |
| 3 | **Two-font max** | Max 2 families. Variety from weights & styles within family. |

```
❌ Helvetica + Arial = too similar (accidental)
❌ Roboto + Inter = both neo-grotesque
✅ Playfair Display + Inter = Serif display + Sans UI ⭐
✅ Oswald + Lora = Geometric + Humanist serif
```

---

## 3.2 Pairing Techniques

| Technique | Heading | Body | Mood |
|-----------|---------|------|------|
| **Serif H + Sans B** | Playfair Display | Inter | Elegant, editorial |
| (Most classic) | Lora | Roboto | Warm, sophisticated |
| **Sans H + Sans B** | Montserrat | Inter | Modern, bold |
| | Poppins | Roboto | Friendly, app UI |
| **Single Family** | Inter (700) | Inter (400) | Max consistency |
| **Display + Workhorse** | Oswald | Open Sans | Impact headlines |

> ⚠️ Display fonts ONLY for large headings. NEVER for body text! Script fonts: accents only.

---

## 3.3 CSS Implementation

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;700&display=swap');

:root {
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}
h1, h2, h3 { font-family: var(--font-heading); }
body { font-family: var(--font-body); }
```

---

## ⚡ Action Checklist
- [ ] Pick anchor font first (body/UI), then find contrasting pair
- [ ] Verify: would a designer notice the difference between your two fonts?
- [ ] Max 2 font families — use weight variations for hierarchy
- [ ] Test pairing: headings at 48px, body at 16px, side by side
