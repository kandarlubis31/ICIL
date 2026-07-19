# ♿ 05 — Accessible Forms & Inputs

> 🟡 Intermediate | Prereq: 02, 03 | ~4 min

Forms = #1 accessibility barrier source. Every field needs a visible, associated label.

---

## 5.1 Label Rules

```html
✅ <label for="email">Email</label><input type="email" id="email">  <!-- Explicit for/id -->
✅ <label>Email <input type="email"></label>                         <!-- Wrapping label -->
❌ <input type="email" placeholder="Email">                          <!-- Placeholder ≠ label! -->
```

**Why placeholder-as-label fails**: disappears on focus → user forgets field. Low contrast. Screen readers inconsistent.

---

## 5.2 Required Fields

```html
<label for="name">Full name <span aria-hidden="true">*</span><span class="sr-only">(required)</span></label>
<input type="text" id="name" required aria-required="true">
```

> Use HTML `required` + visible indicator + screen reader text.

---

## 5.3 Grouping with `<fieldset>` + `<legend>`

```html
<fieldset>
  <legend>Contact method</legend>
  <input type="radio" id="email" name="contact"> <label for="email">Email</label>
  <input type="radio" id="phone" name="contact"> <label for="phone">Phone</label>
</fieldset>
```

Screen reader: "Contact method, group. Email, radio button, 1 of 2."

---

## 5.4 Instructions & Errors

```html
<label for="password">Password</label>
<p id="pw-hint">8+ chars, 1 number, 1 special.</p>  <!-- BEFORE input -->
<input aria-describedby="pw-hint pw-error" aria-invalid="true">
<p id="pw-error" role="alert">Must include a number.</p>
```

| Rule | Example |
|------|---------|
| Instructions BEFORE input | User reads before typing |
| `aria-describedby` | Connects hints + errors |
| `aria-invalid="true"` | Programmatic error flag |
| `role="alert"` on errors | Screen reader interrupts |

---

## 5.5 Input Types — Free Accessibility

```html
type="email" → mobile keyboard + validation + "email, edit text"
type="tel"   → numeric keyboard
type="date"  → native accessible picker (better than custom!)
type="search" → "search" + clear button
```

> Native types give free accessibility. Custom widgets = build everything from scratch.

---

## 5.6 Autocomplete (WCAG 1.3.5 AA)

```html
autocomplete="name" "email" "tel" "street-address" "postal-code" "country"
autocomplete="new-password" "current-password" "username"
```

---

## 5.7 Touch Targets — WCAG 2.5.8

```css
button { min-width: 44px; min-height: 44px; }  /* AAA: 44px, AA (2.2): 24px */
```

---

## ⚡ Action Checklist
- [ ] Every form field has `<label>` with `for`/`id` pairing — never placeholder-only
- [ ] Errors: `aria-invalid` + `aria-describedby` + `role="alert"` + specific fix
- [ ] Radio/checkbox groups wrapped in `<fieldset>` + `<legend>`
- [ ] Native input types first (`email`, `tel`, `date`) — custom only when necessary
