# 📐 07 — Golden Ratio & Spacing System

> 🔴 Advanced | Prereq: 01 | ~3 min

Golden ratio (φ = 1.618) creates naturally pleasing proportions. 8px spacing grid = consistent layouts.

---

## 7.1 Golden Ratio in Layout

```
a / b = (a + b) / a = 1.618...
```

```css
/* Content + Sidebar using golden ratio */
.layout {
  display: grid;
  grid-template-columns: 1.618fr 1fr;
}
/* At 1200px: main=741px, sidebar=459px, ratio=1.614≈φ ✅ */
```

---

## 7.2 8px Spacing Grid

Why 8px? All standard UI sizes are multiples: icons(16/24/32/48), buttons(40/48), screens divide evenly.

| Token | px | Use |
|-------|----|-----|
| `--space-1` | 4px | Micro gap (icon-text) |
| `--space-2` | 8px | Tight (related elements) |
| `--space-4` | 16px | Default (card padding) |
| `--space-6` | 24px | Standard (section gap) |
| `--space-8` | 32px | Loose (large components) |
| `--space-12` | 48px | Section padding |
| `--space-16` | 64px | Macro whitespace |

```css
:root {
  --space-1: 0.25rem;   --space-2: 0.5rem;    --space-4: 1rem;
  --space-6: 1.5rem;    --space-8: 2rem;       --space-12: 3rem;
  --space-16: 4rem;
}
```

---

## ⚡ Action Checklist
- [ ] Base spacing on 8px grid (4px for micro, 16px default, 24px sections)
- [ ] Sidebar + content proportion: `1.618fr 1fr` (golden ratio)
- [ ] Use design tokens for spacing — never hardcode px values
- [ ] Apply golden ratio to type scale: heading size = body × 1.618
