# ♿ 07 — Inclusive Design Patterns

> 🔴 Advanced | Prereq: 01, 02, 05 | ~4 min

Compliance = floor. Inclusive design = beyond WCAG. Works for ALL — permanent, temporary, situational.

---

## 7.1 Disability Spectrum

```
Permanent        Temporary         Situational
No arm           Broken arm        Holding baby
Blind            Eye surgery       Glaring sunlight
Deaf             Ear infection     Noisy environment
ADHD             Medication        High-stress deadline
```

> Design for permanent → helps temporary + situational too.

---

## 7.2 Cognitive Accessibility

| Condition | Challenge | Solution |
|-----------|-----------|----------|
| Dyslexia | Reading difficulty | Sans-serif, generous spacing, left-aligned |
| ADHD | Focus, distraction | Clear task boundaries, minimize clutter |
| Autism | Sensory sensitivity | Predictable layout, no sudden motion |
| Memory | Forgetting steps | Breadcrumbs, progress, undo |
| Dementia | Confusion, getting lost | Familiar patterns, clear wayfinding |

### Plain Language (WCAG 3.1.5 AAA)
- Short sentences (≤20 words), common words, active voice, present tense
- Target: Grade 8 or lower. Government/health: Grade 6.

---

## 7.3 Low Vision & Visual

```css
/* ✅ rem (relative) — scales with user preference */
body { font-size: 1rem; }  h1 { font-size: 2.5rem; }
/* ❌ px locks users out of zoom */
p { font-size: 16px; }

/* ✅ Reflow-friendly (WCAG 1.4.10 AA) */
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
```

---

## 7.4 System Preferences

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.001ms !important; }
}
@media (forced-colors: active) {
  .card { border: 2px solid CanvasText; background: Canvas; color: CanvasText; }
}
@media (prefers-contrast: more) {
  :root { --text: #000; --border: #000; }
}
@media (prefers-color-scheme: dark) {
  :root { --bg: #0F172A; --text: #F1F5F9; }
}
```

---

## 7.5 Motor Accessibility

| WCAG | Requirement | Solution |
|------|------------|----------|
| 2.5.1 (A) | Pointer gestures need single-point alt | Carousel: swipe + buttons |
| 2.5.4 (A) | Motion needs UI alternative | "Shake to undo" + undo button |
| 2.5.8 (AA) | Touch target ≥ 24px (44px ideal) | `min-width: 44px` |

---

## 7.6 Media Accessibility

| Type | Feature | Level |
|------|---------|-------|
| Image | `alt` text (meaningful), `alt=""` (decorative) | A |
| Video | Captions + audio description | A/AA |
| Audio | Transcript | AAA |
| ALL | No auto-play with sound | Best practice |

---

## 7.7 Accessibility Maturity Model

```
Reactive ("lawsuit → fix") → Compliant (WCAG checklist) → Integrated (a11y in process) → Inclusive (design for diversity)
```

---

## ⚡ Action Checklist
- [ ] Support `prefers-reduced-motion`, `prefers-contrast`, `forced-colors`, `prefers-color-scheme`
- [ ] Plain language: target Grade 8, active voice, short sentences
- [ ] Touch targets ≥ 44px. Gesture alternatives for swipe/pinch.
- [ ] Captions for all video. Transcripts for all audio. Meaningful alt text.
