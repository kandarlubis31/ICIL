# 🔤 05 — Line-Height & Spacing

> 🟡 Intermediate | Prereq: 04 | ~3 min

Spacing = vertical rhythm + readability + "breathing room."

---

## 5.1 Line-Height (Leading)

| Context | Line-Height |
|---------|------------|
| Body text mobile | 1.5–1.6 |
| Body text desktop | 1.5–1.75 |
| Headings (H1-H2) | 1.1–1.3 |
| Captions / small | 1.4–1.5 |
| Buttons / UI labels | 1.0–1.2 (single-line) |

> WCAG AAA: line-height ≥ 1.5 within paragraphs.

---

## 5.2 Vertical Rhythm

Base unit = body line-height (e.g. 16px × 1.5 = 24px). All spacing follows this grid:

```css
:root {
  --base: 1rem;         /* 16px */
  --line-height: 1.5;
  --rhythm: calc(var(--base) * var(--line-height)); /* 24px */
}
h2 { margin-top: calc(var(--rhythm) * 2); }   /* 48px */
p  { margin-bottom: var(--rhythm); }           /* 24px */
section + section { margin-top: calc(var(--rhythm) * 3); }
```

---

## 5.3 Letter-Spacing (Tracking)

| Context | Letter-Spacing |
|---------|---------------|
| Body text | 0 (default — never change!) |
| Large headings | -0.01 to -0.03em |
| **ALL CAPS** | **+0.05 to +0.15em** ← MANDATORY |
| Captions / small | +0.01 to +0.02em |

---

## 5.4 Spacing Scale

```
4px → 8px → 16px → 24px → 32px → 48px → 64px
```

Use CSS custom properties: `--space-1: 0.25rem` through `--space-16: 4rem`.

---

## ⚡ Action Checklist
- [ ] Body line-height: 1.5 minimum (1.6 for mobile)
- [ ] Add letter-spacing (+0.05em) to ALL uppercase text — non-negotiable
- [ ] Build vertical rhythm on body line-height grid
- [ ] Headings: line-height 1.1-1.3 (not 1.5 like body)
