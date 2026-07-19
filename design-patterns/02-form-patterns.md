# 🧩 02 — Form Design Patterns

> 🟡 Intermediate | Prereq: — | ~3 min

Forms = conversion gateway. Bad forms = high drop-off. Good forms = higher conversions.

---

## 2.1 Core Rules

| Rule | Why |
|------|-----|
| **Single-column always** | 1 straight path. Never "do I go right or down?" |
| **Top-aligned labels** | Fastest to scan, responsive-friendly |
| **NEVER placeholder-only labels** | Disappears when typing — user forgets what field is |
| **Inline validation on blur** | Not after submit — "5 errors. Where?!" is useless |
| **DON'T disable submit** | Let them click → show inline error |

---

## 2.2 Input Type Cheatsheet

```html
<input type="text">       <!-- Name, address -->
<input type="email">      <!-- Auto-validation + @ keyboard -->
<input type="tel">        <!-- Numeric keyboard on mobile -->
<input type="password">   <!-- Masked -->
<input type="date">       <!-- Native date picker -->
<input type="search">     <!-- Clear button built-in -->
<input type="file">       <!-- File upload -->
<textarea></textarea>     <!-- Multi-line -->
<select><option>          <!-- 6+ options -->
```

---

## 2.3 Multi-Step Forms (Wizard)

> 7-10+ fields → split into steps.

```
Step 1: Account  →  Step 2: Profile  →  Step 3: Confirm
  ●────────────────○────────────────○
```

| Rule | Detail |
|------|--------|
| Progress indicator | Always visible |
| Back navigation | Can return to previous steps |
| Save state | Data preserved between steps |
| Step count | Max 4-7 steps |

---

## 2.4 Button Hierarchy

```
Primary:   [Save Changes]   ← Solid, high contrast
Secondary: [Cancel]         ← Outline / text only
```

---

## ⚡ Action Checklist
- [ ] All forms single-column, top-aligned labels
- [ ] Every input has the correct HTML type (email, tel, date, etc.)
- [ ] Inline validation on blur — never wait until submit
- [ ] Multi-step for 7+ fields with visible progress indicator
- [ ] Submit button always enabled — validate on click instead
