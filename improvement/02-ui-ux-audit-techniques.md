# 🔧 02 — UI/UX Audit Techniques

> 🟢 Beginner | Prereq: 01 | ~4 min

Can't fix what you haven't identified. Systematic audit across 6 dimensions.

---

## 2.1 Six Audit Dimensions

| Dimension | Faculty |
|-----------|---------|
| **Visual** (color, typo, spacing, hierarchy) | `warna/`, `tipografi/`, `layout/` |
| **UX** (nav, forms, patterns, feedback) | `design-patterns/`, `ux-psikologi/` |
| **Content** (microcopy, voice, errors) | `ux-writing/` |
| **Accessibility** (WCAG, keyboard, SR) | `aksesibilitas/` |
| **Performance** (loading, animation, render) | `animasi/`, `layout/` |
| **Brand** (consistency, identity) | `branding/` |

---

## 2.2 Quick Audit Checklists

### Visual
```
✓ Defined palette? ✓ Text ≥ 4.5:1? ✓ Type scale? ✓ ≤ 2 font families?
✓ Body ≥ 16px? ✓ Line-height 1.4-1.6? ✓ Consistent 8px spacing? ✓ Touch ≥ 44px?
✓ Most important element identifiable in 2s?
```

### UX
```
✓ Reach any page ≤ 3 clicks? ✓ Breadcrumbs? ✓ Every field has label? ✓ Inline validation?
✓ Button loading states? ✓ Error states clear? ✓ Undo on delete? ✓ Modal ESC close?
```

### Accessibility (Non-Negotiables)
```
✓ Tab through entire page? ✓ Focus indicator visible? ✓ Skip link present?
✓ Icons have labels? ✓ Forms announce labels? ✓ Contrast ≥ 4.5:1?
✓ `<main>`, `<header>`, `<nav>`, `<footer>`? ✓ One `<h1>`? ✓ `<html lang>` set?
```

### Content
```
✓ Buttons verb-led? ✓ Errors helpful (not "invalid input")? ✓ Empty states encouraging?
✓ Voice consistent? ✓ Grade 8 reading level? ✓ Instructions before input?
```

---

## 2.3 Audit Report Template

```
PROJECT: [name] | DATE: [date] | SCOPE: [polish/refinement/overhaul/rebuild]

CRITICAL (must fix):
  #001 [A11y] No skip link → Add <a href="#main"> | aksesibilitas/04 | Low effort, High impact
  #002 [Visual] Contrast 2.8:1 → Darken to #555 | warna/06 | Low, High

IMPORTANT (should fix):
  #003 [UX] No form validation → Add on-blur + aria-invalid | design-patterns/02 | Med, High

SUMMARY: Critical: 2 | Important: 1 | Minor: 0
```

> Automated tools = 30-40% of issues. Manual audit = rest. See `aksesibilitas/06`.

---

## ⚡ Action Checklist
- [ ] Run automated scan (axe, WAVE, Lighthouse) → collect issues
- [ ] Manual keyboard + screen reader test
- [ ] Compile audit report with severity + faculty reference per issue
