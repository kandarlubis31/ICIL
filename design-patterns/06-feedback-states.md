# 🧩 06 — Feedback & Status Patterns

> 🟡 Intermediate | Prereq: — | ~3 min

Every user action needs system response. Without feedback = lost users. Right feedback = trust.

---

## 6.1 Loading States

| Pattern | When | Example |
|---------|------|---------|
| **Skeleton** | Page/section load, mirrors content shape | Dashboard loading |
| **Spinner** | Indeterminate, < 3 sec | ⏳ Loading... |
| **Progress Bar** | Measurable, > 3 sec | [████░░░░] 60% — Uploading... |

> Minimum duration rule: always show loading ≥ 300-600ms. 50ms flash = user thinks it's a glitch.

---

## 6.2 Optimistic UI

Update UI BEFORE server response:

```javascript
addItemToList(newItem);              // 1. Immediately update UI
try { await api.addItem(newItem); }  // 2. Server call
catch { removeItemFromList(newItem); showError("Failed"); } // 3. Rollback on error
```

| ✅ Use For | ❌ NEVER |
|-----------|---------|
| Like, favorite, toggle, reorder, delete (with undo) | Payment, password change |

---

## 6.3 Undo Pattern

```javascript
function deleteItem(id) {
  const item = removeFromUI(id);
  showToast(`Deleted. [Undo]`, 5000);
  setTimeout(() => { if (!undoClicked) api.deleteItem(id); }, 5000);
}
```

---

## 6.4 State Cheatsheet

| State | Pattern | Duration |
|-------|---------|----------|
| Loading | Skeleton (>400ms), Spinner (<3s), Progress (>3s) | — |
| Success | Toast, inline checkmark | 3-5 sec auto-dismiss |
| Error | Toast + inline message | Until user dismisses |
| Empty | Illustration + CTA | Persistent |
| Delete | Undo toast (preferred) | 5 sec |

---

## ⚡ Action Checklist
- [ ] Skeleton screens for all page/section loads > 400ms
- [ ] Minimum loading indicator duration: 300ms (never flash)
- [ ] Optimistic UI for like/toggle/reorder — never for payment
- [ ] All destructive actions have undo toast (5 sec window)
