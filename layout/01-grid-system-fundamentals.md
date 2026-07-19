# 📐 01 — Grid System Basics

> 🟢 Beginner | Prereq: — | ~3 min

Grid = backbone of layout. Structure & consistency. Without grid = chaos.

---

## 1.1 Grid Anatomy

| Component | Definition |
|-----------|-----------|
| **Column** | Vertical content track |
| **Row** | Horizontal row |
| **Gutter** | Space between columns (gap) |
| **Margin** | Container edge spacing |
| **Module** | Column × row intersection |

---

## 1.2 12-Column System

12 is the magic number — divisible by 1, 2, 3, 4, 6, 12. Bootstrap and most frameworks use it.

```
1 col:  [████████████████████████]      2 cols: [████████████][████████████]
3 cols: [████████][████████][████████]  4 cols: [██████][██████][██████][██████]
6 cols: [████][████][████][████][████][████]
```

---

## 1.3 CSS Grid Basics

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 1fr;   /* fixed + 2 fluid */
  grid-template-rows: auto 1fr auto;
  gap: 24px;
}
```

### The `fr` Unit
```
1fr = 1 portion of REMAINING space
grid-template-columns: 1fr 2fr 1fr;  → 4 portions: 25% / 50% / 25%
```

---

## ⚡ Action Checklist
- [ ] Every page layout uses a grid — no arbitrary positioning
- [ ] Pick 12 or 4 column system and stick to it project-wide
- [ ] Use `fr` units for fluid columns, not percentages
- [ ] Define gutters as CSS `gap` — not margin/padding hacks
