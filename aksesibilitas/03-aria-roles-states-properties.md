# ♿ 03 — ARIA Roles, States & Properties

> 🟡 Intermediate | Prereq: 02 | ~4 min

ARIA = last resort, not first choice. "No ARIA is better than bad ARIA."

---

## 3.1 Five Golden Rules

```
1. Use native HTML first — ARIA only when HTML can't do it
2. Don't change semantics unless absolutely necessary
3. All ARIA controls must be keyboard-operable
4. Never aria-hidden on focusable elements
5. All interactive elements must have accessible name
```

---

## 3.2 ARIA Anatomy

| Category | Purpose | Examples |
|----------|---------|----------|
| **Role** | WHAT is this? (static) | `button`, `tab`, `dialog`, `menu` |
| **State** | Current condition? (dynamic) | `aria-expanded`, `aria-checked`, `aria-hidden` |
| **Property** | Characteristics? (metadata) | `aria-label`, `aria-labelledby`, `aria-describedby` |

---

## 3.3 Accessible Naming Priority

```
1. aria-labelledby → Points to visible text (BEST)
2. <label>         → For form fields
3. aria-label      → Direct string (no visible text)
4. Inner text      → Element's text content
5. title           → LAST RESORT (weak support)
```

### Icon-Only Buttons — #1 Failure

```html
❌ <button><svg><!-- icon --></svg></button>  <!-- Screen reader: "button" -->
✅ <button aria-label="Search"><svg aria-hidden="true"><!-- icon --></svg></button>
```

---

## 3.4 Key Attributes

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `aria-hidden="true"` | Hide from screen readers | Decorative elements |
| `aria-live="polite"` | Announce changes when idle | Search results updated |
| `aria-live="assertive"` | Announce immediately | Critical error alerts |
| `aria-expanded` | Collapsible state | Accordion, dropdown, menu |
| `aria-describedby` | Connect hints/errors | Form instructions, validation |
| `aria-current="page"` | Current location | Breadcrumb, nav, pagination |
| `role="alert"` | Urgent announcement | Error messages |
| `role="status"` | Info announcement | Success messages |

---

## 3.5 Common Patterns

```html
<!-- Tab interface -->
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel-1">Account</button>
  <button role="tab" aria-selected="false" aria-controls="panel-2" tabindex="-1">Privacy</button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">...</div>

<!-- Disclosure (expand/collapse) -->
<button aria-expanded="false" aria-controls="content">Show Options</button>
<div id="content" hidden>...</div>
```

---

## 3.6 Most Dangerous ARIA Mistakes

| Mistake | Fix |
|---------|-----|
| `role="button"` on `<div>` without keyboard | Use `<button>` instead |
| `aria-hidden` on focusable element | Also add `tabindex="-1"` |
| Redundant ARIA (`<button role="button">`) | Remove the redundant role |
| `aria-label` different from visible text | Use `aria-labelledby` to reference visible text |
| `tabindex` > 0 | Never! Only `0` (in order) or `-1` (programmatic) |

---

## ⚡ Action Checklist
- [ ] Native HTML first — ARIA only as last resort
- [ ] Every interactive element has accessible name (test: turn off monitor + use screen reader)
- [ ] `aria-live="polite"` for content updates, `role="alert"` only for errors
- [ ] Never `tabindex` > 0, never `aria-hidden` on focusable elements
