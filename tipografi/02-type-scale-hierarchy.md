# 🔤 02 — Type Scale & Hierarchy

> 🟢 Beginner | Prereq: — | ~4 min

Type scale = mathematically related sizes. Hierarchy = what to read first.

---

## 2.1 Modular Scale

| Ratio | Name | Vibe |
|-------|------|------|
| 1.125 | Major Second | Subtle, safe |
| **1.200** | Minor Third | **Default for design systems** ⭐ |
| 1.250 | Major Third | More contrast |
| 1.333 | Perfect Fourth | Classic, editorial |
| 1.500 | Perfect Fifth | Strong, musical |
| 1.618 | Golden Ratio | "Perfect" mathematically |

**Example: Base 16px × 1.250:**
```
Level 0: 16px (body) → 1: 20px → 2: 25px → 3: 31px → 4: 39px → 5: 49px → 6: 61px
```

---

## 2.2 Hierarchy Tools

| Tool | Effect | Example |
|------|--------|---------|
| **Size** | Most dominant | H1(49px) > body(16px) |
| **Weight** | Bold = important | H1(700) vs H2(500) |
| **Color** | Contrast = priority | #000 heading vs #666 body |
| **Spacing** | Whitespace = importance | Section separation |
| **Case** | ALL CAPS = labels | Labels, buttons |

---

## 2.3 Fluid Typography (clamp)

```css
/* clamp(min, preferred, max) — smooth scaling, no breakpoints! */
h1 { font-size: clamp(2rem, 5vw + 0.5rem, 4rem); }
p  { font-size: clamp(1rem, 1vw + 0.75rem, 1.25rem); }
```

---

## 2.4 Tailwind Type Scale

```
xs(12) → sm(14) → base(16) → lg(18) → xl(20)
→ 2xl(24) → 3xl(30) → 4xl(36) → 5xl(48) → 6xl(60)
```

---

## ⚡ Action Checklist
- [ ] Set base font size to 16px (1rem) — never below
- [ ] Pick one modular ratio (1.200 or 1.250) and apply consistently
- [ ] Max 4 heading levels (H1-H4), only 1 H1 per page
- [ ] Use clamp() for fluid headings — not fixed px per breakpoint
- [ ] Mobile body ≥ 16px, H1 ≥ 28px
