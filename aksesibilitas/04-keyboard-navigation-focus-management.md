# ♿ 04 — Keyboard Navigation & Focus Management

> 🟡 Intermediate | Prereq: 02, 03 | ~4 min

Keyboard accessibility = WCAG Level A (minimum legal). Many users can't use a mouse.

---

## 4.1 Keyboard-Only Test

```
Put mouse away → Tab through page:
✓ Every interactive element reachable? ✓ Focus visible always?
✓ Activate buttons/links? ✓ Fill forms? ✓ Close modals + return?
```

| Key | Action |
|-----|--------|
| Tab / Shift+Tab | Forward/back focusable elements |
| Enter | Activate link/button |
| Space | Activate button, toggle checkbox |
| Escape | Close dialog, menu, cancel |
| Arrow keys | Navigate lists, menus, tabs, radios |

---

## 4.2 Tab Order = DOM Order (Not Visual!)

```
⚠️ CSS flex-direction: row-reverse, order, grid-template-areas → visual ≠ DOM → broken tab order!
```

> Tab order follows DOM, not CSS. If visual order ≠ DOM order, keyboard users get lost.

---

## 4.3 Focus Visibility — WCAG 2.4.7 (AA)

```css
/* ❌ THE #1 SIN */
*:focus { outline: none; }

/* ✅ Replace with better indicator */
*:focus-visible {
  outline: 3px solid #2563EB;
  outline-offset: 2px;
}
```

| Selector | Triggers | Use |
|----------|----------|-----|
| `:focus` | Any focus (mouse + keyboard) | When always want ring |
| `:focus-visible` | Keyboard focus only | **Default choice** ⭐ |

WCAG 2.2: focus indicator ≥ 2px, contrast ≥ 3:1 against adjacent colors.

---

## 4.4 Skip Links

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
<main id="main-content" tabindex="-1">  <!-- tabindex="-1" needed for focus! -->
```

```css
.skip-link { position: absolute; top: 0; left: 0; transform: translateY(-100%); }
.skip-link:focus { transform: translateY(0); }
```

---

## 4.5 Focus Trapping in Modals

```javascript
function trapFocus(dialog) {
  const els = dialog.querySelectorAll('a[href], button, input, select, [tabindex]:not([tabindex="-1"])');
  const first = els[0], last = els[els.length - 1];
  first?.focus();
  dialog.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
  });
}
```

**Modal checklist**: Focus trap + ESC close + return focus to trigger + scroll lock background.

---

## 4.6 SPA Route Changes

```javascript
// React: move focus to <main> on every route change
useEffect(() => { mainRef.current?.focus(); document.title = getTitle(path); }, [path]);
// <main id="main" ref={mainRef} tabIndex={-1}>
```

---

## ⚡ Action Checklist
- [ ] Keyboard-only test: can you complete every task without a mouse?
- [ ] Focus indicator visible on ALL interactive elements (use `:focus-visible`)
- [ ] Skip link present as first focusable element
- [ ] Modals: focus trapped + ESC close + focus returned to trigger
