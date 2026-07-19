# ♿ 06 — Screen Reader Testing & Assistive Tech

> 🔴 Advanced | Prereq: 02, 03, 04 | ~3 min

Automated tools = 30-40% of issues. The rest = manual testing with real assistive tech.

---

## 6.1 The Accessibility Tree

```
DOM → Browser Accessibility API → OS Accessibility Layer → Screen Reader
```

Screen readers don't "read" your visual layout — they read the **accessibility tree**. Wrong tree = wrong experience.

---

## 6.2 The Big Four Screen Readers

| Screen Reader | Platform | Cost | Test Priority |
|---------------|----------|------|--------------|
| **NVDA** | Windows | Free | ⭐ #1 — with Chrome (most used combo per WebAIM) |
| **VoiceOver** | macOS/iOS | Built-in | ⭐ #2 — with Safari |
| **JAWS** | Windows | ~$90/yr | #3 — enterprise standard |
| **TalkBack** | Android | Built-in | #4 — mobile |

---

## 6.3 NVDA Quick Start

| Shortcut | Action |
|----------|--------|
| H / Shift+H | Jump headings |
| K | Jump links |
| F | Jump form fields |
| B | Jump buttons |
| T | Jump tables |
| Insert+F7 | Elements list |
| NVDA+Space | Toggle browse/focus mode |

> **NVDA key** = Insert (or Caps Lock). Browse mode = reading. Focus mode = interacting with forms.

---

## 6.4 What Users Hear

```
✅ WITH labels: "Full name, edit, required, blank"
❌ WITHOUT labels: "Edit, blank" ← User has NO idea what field this is!
```

---

## 6.5 Test Protocol

```
1. Title + landmarks (findable?) → 2. Headings (H key — logical?)
3. Links/buttons (K/B key — descriptive?) → 4. Forms (Tab — labels announced?)
5. Dynamic content (aria-live firing?) → 6. Close eyes — can you complete task?
```

---

## 6.6 Issue Detection Guide

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| "Blank" for button | No accessible name | Add `aria-label` or text |
| Not in tab order | Wrong element | Use `<button>`/`<a>` or `tabindex="0"` |
| Dynamic update silent | Missing `aria-live` | Add in initial HTML (not dynamically) |
| Focus lost after modal | Not returned to trigger | Save + restore `document.activeElement` |

---

## 6.7 Tool Suite

| Tool | Catches | Misses |
|------|---------|--------|
| axe DevTools | Labels, ARIA, contrast, alt | UX, focus order, live regions |
| WAVE | Structure, contrast, missing alt | Keyboard flow, timing |
| Lighthouse | ~40% of issues | Everything manual |

```
Issue detection: Automated(30%) < Keyboard(70%) < Screen reader(85%) < Real user(100%)
```

---

## ⚡ Action Checklist
- [ ] Test with NVDA + Chrome at minimum (free, most common combo per WebAIM)
- [ ] Run NVDA "H" key — logical heading structure? Descriptive?
- [ ] Run NVDA "K" key — any "click here" or unlabeled links?
- [ ] Close eyes: can you understand and complete the main task?
