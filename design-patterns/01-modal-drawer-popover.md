# 🧩 01 — Modal, Drawer & Popover

> 🟡 Intermediate | Prereq: — | ~3 min

Where to display content? Modal, drawer, popover, new page, or inline? Wrong choice = ruined UX.

---

## 1.1 Five Container Patterns

| Pattern | Definition | When |
|---------|-----------|------|
| **Modal** | Full overlay, blocks background | Short, high-priority, needs focus |
| **Drawer** | Slides from side | Sub-task needing background context |
| **Popover** | Small panel near trigger | Extra info, small menu |
| **New Page** | Full navigation | Complex flow, multi-step |
| **Inline Expand** | Content expands in place | Minor edit, brief details |

---

## 1.2 Modal Rules

| ✅ Use For | ❌ Don't Use For |
|-----------|-----------------|
| Destructive confirmation ("Delete permanently?") | Long form (> 3-5 fields) |
| Short form (login, subscribe) | Multi-step flow |
| Detail preview (image, quick view) | Primary navigation |
| Important alert needing response | Content needing background reference |

```html
<dialog id="confirm-modal">
  <h2>Delete this file?</h2>
  <p>This file will be permanently deleted.</p>
  <form method="dialog">
    <button value="cancel">Cancel</button>
    <button value="confirm">Delete</button>
  </form>
</dialog>
```

### Accessibility: Focus trap, ESC close, return focus on close, scroll lock background.
> See `aksesibilitas/04-keyboard-navigation-focus-management.md` for complete focus trap + `aksesibilitas/05-accessible-forms-inputs.md`.

---

## 1.3 Drawer Types

| Type | Scrim | BG Interaction | When |
|------|-------|---------------|------|
| Modal Drawer | Yes (dark) | Blocked | Task needs focus |
| Non-modal | No | Allowed | Auxiliary (filter, info) |

---

## 1.4 Decision Framework

```
Need background CONTEXT?
  YES → Light task? → Drawer/Inline | Heavy? → New Page
  NO  → Short (< 3 fields)? → Modal | No → New Page
Just extra info near trigger? → Popover
```

---

## ⚡ Action Checklist
- [ ] Modal: only for short, focused tasks — never multi-step flows
- [ ] Every modal has: focus trap + ESC close + return focus
- [ ] Drawer with background context, modal when context NOT needed
- [ ] Popover for lightweight info — never for critical tasks
