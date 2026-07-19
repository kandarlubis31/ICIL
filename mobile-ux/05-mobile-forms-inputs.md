# 📱 05 — Mobile Forms & Input Optimization

> **Level: 🟡 Intermediate** | Prerequisite: 02, 03 | Est. reading time: 11 min

Forms are the conversion battlefield. On mobile, bad forms don't just frustrate — they lose customers. This course covers mobile form optimization: input types that trigger the right keyboard, validation that doesn't interrupt flow, and keyboard-aware layouts that never hide the submit button.

---

## 5.1 The Mobile Form Problem

Desktop forms have room for labels, hints, and spacious inputs. Mobile has 320px. Every pixel counts:

```
DESKTOP FORM:                        MOBILE FORM:
│  Email: [________________]    │    │ Email        │
│  Phone: [________________]    │    │ [__________] │
│  City:  [________________]    │    │ Phone        │
│           [Submit]            │    │ [__________] │
└──────────────────────────────┘    │ City         │
                                    │ [__________] │
                                    │  [Submit]    │
```

---

## 5.2 Input Types — The Right Keyboard

The single most impactful mobile form decision: **using the correct input type** to trigger the optimal keyboard:

| Input Type | Keyboard Shown | HTML |
|-----------|---------------|------|
| `type="email"` | Email keyboard (with @ and . ) | `<input type="email">` |
| `type="tel"` | Numeric dial pad | `<input type="tel">` |
| `type="url"` | URL keyboard (with / and .com) | `<input type="url">` |
| `type="number"` | Numeric with decimal | `<input type="number">` |
| `type="date"` | Native date picker | `<input type="date">` |
| `type="search"` | Search keyboard (with search button) | `<input type="search">` |
| `inputmode="numeric"` | Numeric without spinner | `<input inputmode="numeric" pattern="[0-9]*">` |
| `inputmode="decimal"` | Numeric with decimal | `<input inputmode="decimal">` |

```html
<!-- ❌ WRONG: text type shows QWERTY for number input → wrong keyboard -->
<input type="text" placeholder="Credit card number">

<!-- ✅ RIGHT: tel or inputmode triggers numeric keypad -->
<input type="tel" inputmode="numeric" pattern="[0-9]*"
       placeholder="1234 5678 9012 3456"
       autocomplete="cc-number">

<!-- ✅ RIGHT: email type shows email-optimized keyboard -->
<input type="email" placeholder="you@company.com"
       autocomplete="email" autocapitalize="off" autocorrect="off">
```

---

## 5.3 Label Placement

Mobile label placement directly affects scannability and form completion speed:

| Placement | Speed | Space Efficiency | Best For |
|-----------|-------|-----------------|----------|
| **Top-aligned** (above input) | Fastest | Lowest | Standard forms, best accessibility |
| **Floating label** (inside, then moves up) | Medium | Highest | Tight layouts, material design |
| **Left-aligned** (beside input) | Slowest | Medium | Desktop (NOT mobile — too narrow) |
| **Placeholder-only** | Fast (but error-prone) | Highest | NEVER — disappears on input, accessibility fail |

```css
/* ✅ TOP-ALIGNED: Clear, fast, accessible */
.form-group { margin-bottom: 1.25rem; }
.form-group label { display: block; font-size: .9rem; font-weight: 600; margin-bottom: .35rem; color: #333; }
.form-group input { width: 100%; padding: 12px 14px; border: 1px solid #ddd; border-radius: 10px; font-size: 1rem; }

/* ✅ FLOATING LABEL: Space-efficient alternative */
.float-group { position: relative; margin-bottom: 1.25rem; }
.float-group input { width: 100%; padding: 16px 14px 8px; border: 1px solid #ddd; border-radius: 10px; font-size: 1rem; }
.float-group label {
  position: absolute; left: 14px; top: 14px;
  font-size: 1rem; color: #888;
  transition: all .2s ease;
  pointer-events: none;
}
.float-group input:focus + label,
.float-group input:not(:placeholder-shown) + label {
  top: 6px; font-size: .7rem; color: #2563eb;
}
```

---

## 5.4 Inline Validation on Mobile

Don't wait until form submission to show errors. Validate on blur:

```javascript
// Inline validation: validate each field when user leaves it
document.querySelectorAll('.form-group input').forEach(input => {
  input.addEventListener('blur', () => validateField(input));
});

function validateField(input) {
  const errorEl = input.parentElement.querySelector('.field-error');
  let error = null;

  if (input.required && !input.value.trim()) {
    error = 'This field is required';
  } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
    error = 'Enter a valid email address';
  } else if (input.minLength && input.value.length < input.minLength) {
    error = `Minimum ${input.minLength} characters`;
  }

  if (error) {
    input.setAttribute('aria-invalid', 'true');
    errorEl.textContent = error;
    errorEl.style.display = 'block';
    input.style.borderColor = '#d32f2f';
  } else {
    input.removeAttribute('aria-invalid');
    errorEl.textContent = '';
    errorEl.style.display = 'none';
    input.style.borderColor = '#4CAF50'; // Green = valid feedback
  }
}
```

```css
.field-error {
  display: none;
  font-size: .8rem; color: #d32f2f;
  margin-top: 4px; padding-left: 4px;
}
input[aria-invalid="true"] { border-color: #d32f2f; }
```

---

## 5.5 Keyboard-Aware Layout

The on-screen keyboard consumes ~40% of screen height. If your submit button sits below the last input, it may disappear behind the keyboard:

```css
/* Keyboard-aware form: ensure scrollability */
.form-container {
  /* Allow form to scroll when keyboard appears */
  max-height: 100vh;
  overflow-y: auto;
  /* Keep submit visible */
  padding-bottom: 80px; /* Space for sticky submit button */
}

.submit-area {
  position: sticky; bottom: 0;
  padding: 12px 16px;
  background: #fff;
  border-top: 1px solid #eee;
}

/* VisualViewport API: detect keyboard appearance */
/* The keyboard pushes the visual viewport up */
.visualViewport { /* if available */ }
```

```javascript
// Detect keyboard appearance via Visual Viewport API
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    const keyboardHeight = window.innerHeight - window.visualViewport.height;
    if (keyboardHeight > 150) {
      // Keyboard is open — scroll to active input
      document.activeElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}
```

---

## 5.6 Mobile Form Best Practices Summary

```html
<!-- ✅ OPTIMIZED MOBILE FORM -->
<form class="mobile-form" novalidate>
  <!-- Use autocomplete attributes for faster filling -->
  <div class="form-group">
    <label for="name">Full name</label>
    <input id="name" type="text" autocomplete="name" required
           placeholder="John Doe">
    <span class="field-error" role="alert"></span>
  </div>

  <div class="form-group">
    <label for="email">Email address</label>
    <input id="email" type="email" autocomplete="email"
           autocapitalize="off" autocorrect="off" required
           placeholder="john@company.com">
    <span class="field-error" role="alert"></span>
  </div>

  <div class="form-group">
    <label for="phone">Phone number</label>
    <input id="phone" type="tel" autocomplete="tel"
           placeholder="+1 (555) 000-0000">
    <span class="field-error" role="alert"></span>
  </div>

  <div class="form-group">
    <label for="dob">Date of birth</label>
    <input id="dob" type="date" autocomplete="bday">
  </div>

  <!-- Sticky submit at bottom -->
  <div class="submit-area">
    <button type="submit" class="btn-submit">Continue →</button>
  </div>
</form>

<style>
.mobile-form { max-width: 400px; margin: 0 auto; padding: 16px; }
.form-group { margin-bottom: 1rem; }
.form-group label { display: block; font-size: .85rem; font-weight: 600; margin-bottom: .25rem; }
.form-group input { width: 100%; padding: 12px 14px; border: 1px solid #ddd; border-radius: 10px; font-size: 1rem; -webkit-appearance: none; }
.btn-submit { width: 100%; padding: 16px; background: #2563eb; color: #fff; border: none; border-radius: 12px; font-size: 1.1rem; font-weight: 600; cursor: pointer; }
</style>
```

---

## Quick Summary

| Technique | Why | How |
|-----------|-----|-----|
| **Correct input type** | Triggers optimal keyboard | `type="email"`, `type="tel"`, `inputmode="numeric"` |
| **Top-aligned labels** | Fastest scanning and completion | Labels above inputs, not beside |
| **Inline validation** | Errors caught immediately | Validate on `blur`, show inline error |
| **Autocomplete attributes** | Faster filling, fewer typos | `autocomplete="email"`, `autocomplete="tel"` |
| **Keyboard-aware layout** | Submit never hidden behind keyboard | Sticky submit, VisualViewport API detection |
| **No placeholder-only labels** | Disappears on input → accessibility fail | Always use real `<label>` elements |
