# ✍️ 03 — Component Microcopy

> 🟡 Intermediate | Prereq: 01 | ~4 min

Microcopy in every UI component: buttons, labels, placeholders, validation, toasts.

---

## 3.1 Buttons (CTA)

| Rule | ❌ Bad | ✅ Good |
|------|--------|---------|
| Verb-led | "Submit" | "Send Application" |
| Specific | "Click Here" | "Download PDF" |
| Short (1-4 words) | "Click to proceed to next step" | "Continue" |

| Type | Style | Example |
|------|-------|---------|
| Primary | Solid, high contrast | "Buy Now", "Sign Up Free" |
| Secondary | Outline | "Save Draft", "View Details" |
| Tertiary | Text only | "Cancel", "Go Back" |
| Destructive | Red/warning | "Delete Account" |

---

## 3.2 Form Labels & Validation

| Element | Rule |
|---------|------|
| **Label** | Above input, stays visible, short |
| **Placeholder** | Example/hint only — NOT a label |
| **Helper text** | Need-to-know, 1 line max |
| **Validation** | Real-time, inline, specific + solution |
| **Required** | Asterisk + "(required)" text, not just red |

```
❌ "Invalid input."          ✅ "Password: 8+ characters needed."
❌ "Error: 0x8004DEF7"       ✅ "Email already registered. Log in instead?"
```

---

## 3.3 Toast / Notifications

| Type | Tone | Example | Rules |
|------|------|---------|-------|
| Success | Positive | "Order created!" | 1-2 lines max |
| Error | Helpful | "Upload failed. Max 10MB." | Auto-dismiss, not too fast |
| Warning | Clear | "Session expires in 2 min." | Scannable <2 sec |
| Info | Neutral | "Update available." | Include action if needed |

---

## ⚡ Action Checklist
- [ ] Every button starts with a verb and is 1-4 words
- [ ] All form labels are ABOVE inputs (not placeholder-only)
- [ ] Validation messages follow BLUF: WHAT + WHY + SOLUTION
- [ ] Toasts auto-dismiss but leave enough time to read (≥5s for errors)
