# 📐 04 — Grid vs Flexbox

> 🟡 Intermediate | Prereq: 02, 03 | ~2 min

**Grid = 2D layout (rows AND columns). Flexbox = 1D (row OR column).**

---

## 4.1 Decision Matrix

| Scenario | Grid | Flexbox | Winner |
|----------|------|---------|--------|
| Full page layout | ✅✅ | ⚠️ Nested | **Grid** |
| Card grid | ✅✅ | ⚠️ | **Grid** |
| Dashboard panels | ✅✅ | ❌ | **Grid** |
| Overlapping elements | ✅✅ | ❌ | **Grid** |
| Horizontal navbar | ⚠️ Overkill | ✅✅ | **Flexbox** |
| Centering 1 item | ✅ | ✅✅ | **Flexbox** |
| Button group (wrap) | ⚠️ | ✅✅ | **Flexbox** |
| Dynamic content wrapping | ⚠️ | ✅✅ | **Flexbox** |

---

## 4.2 Golden Rule

> **Grid for page layout (macro). Flexbox for components (micro).**
>
> Both in one layout is normal: Grid defines the page structure, Flexbox aligns items within each grid cell.

---

## ⚡ Action Checklist
- [ ] Page structure (header, sidebar, main, footer) → Grid
- [ ] Navbar, button groups, card internals → Flexbox
- [ ] If layout has rows AND columns to align → Grid
- [ ] If layout is a single row or column of items → Flexbox
