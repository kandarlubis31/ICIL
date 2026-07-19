# ♿ 02 — Semantic HTML & Structure

> 🟢 Beginner | Prereq: 01 | ~3 min

Right HTML element = free accessibility. Keyboard support, screen reader semantics, focus management — all built-in.

---

## 2.1 Element Choice — Native > Custom

| Need | ✅ Use | ❌ Don't |
|------|-------|---------|
| Clickable action | `<button>` | `<div onclick>` |
| Navigation | `<a href>` | `<span onclick>` |
| Input | `<input>` | `<div contenteditable>` |
| List | `<ul>/<ol>` | `<div>` + CSS bullets |
| Section title | `<h1>-<h6>` | `<div class="title">` |
| Form label | `<label>` | `<span class="label">` |

> No ARIA is better than bad ARIA. Native HTML gives you accessibility for free.

---

## 2.2 Document Landmarks

```html
<header> → <nav aria-label="Primary"> → <main> (exactly ONE) → <footer>
```

| Element | Role | How Many? |
|---------|------|-----------|
| `<header>` | banner | 1 per page (banner) + 1 per section |
| `<nav>` | navigation | Multiple — use `aria-label` to distinguish |
| `<main>` | main | **Exactly one** ← screen reader jump target |
| `<aside>` | complementary | Multiple |
| `<section>` | region | Multiple, each needs a heading |
| `<footer>` | contentinfo | 1 per page + 1 per section |

---

## 2.3 Heading Hierarchy

```
h1: Page Title (ONE) → h2: Major Sections → h3: Subsections → h4: Details
```

| Rule | Why |
|------|-----|
| One `<h1>` per page | Screen readers: "Heading level 1" = page topic |
| Don't skip levels | h1→h3 wrong. Logical progression expected. |
| Don't use headings for styling | Use CSS. `<h5>` ≠ "small text" |

---

## 2.4 Links vs Buttons

| Element | Purpose | Behavior |
|---------|---------|----------|
| `<a href>` | **Navigation** | Changes URL, can open in new tab |
| `<button>` | **Action** | Triggers JS, no URL change |

```html
❌ <a href="#" onclick="openModal()">  <!-- Shifts focus + adds # to URL -->
✅ <button onclick="openModal()">
```

---

## 2.5 Must-Haves

```html
<html lang="en">  <!-- Screen reader pronunciation -->
<main>             <!-- Exactly one per page -->
<caption>          <!-- Table title for screen readers -->
<th scope="col">   <!-- Column/row headers -->
<details><summary> <!-- Free accessible accordion, zero JS -->
```

---

## ⚡ Action Checklist
- [ ] Every interactive element: native HTML first, ARIA only as last resort
- [ ] One `<main>`, one `<h1>`, logical heading hierarchy (no skipped levels)
- [ ] Links = navigation. Buttons = actions. Never mix.
- [ ] `<html lang="en">` set correctly. Inline language changes marked.
