# ✨ 01 — Motion Design Principles

> 🟢 Beginner | Prereq: — | ~4 min

Motion in UI = functional tool for usability, hierarchy, brand. Not decoration.

---

## 1.1 Four Purposes of Motion

| Purpose | Example |
|---------|---------|
| **Explain change** | Delete → item slides out, others shift up |
| **Guide attention** | CTA pulses subtly on landing page |
| **Provide feedback** | Button scales on click → "I registered that" |
| **Build personality** | Bouncy playful vs smooth professional |

> If motion doesn't serve one of these → it's fluff. Cut it.

---

## 1.2 Disney's 12 Principles — UI Translation

| Principle | UI Application |
|-----------|---------------|
| **Squash & Stretch** | Button compresses on press → springs back |
| **Anticipation** | Card lifts slightly BEFORE expanding |
| **Staging** | Modal: bg fades, modal scales up → unmistakable focus |
| **Follow-Through** | Dropdown: container first, items stagger in 20ms apart |
| **Slow In & Out** | NEVER linear — always ease-out (enter), ease-in (exit) |
| **Arcs** | Notification slides in with slight arc, not rigid diagonal |
| **Secondary Action** | Like: icon scales (primary) + particles burst (secondary) |

---

## 1.3 When to Animate

```
Functional purpose? → YES: animate ✅ | NO: don't ❌
User sees 100+ times/day? → Keep ≤200ms
```

---

## 1.4 Duration Guidelines

| Duration | Use Case |
|----------|----------|
| 100-150ms | Micro: button press, toggle, hover |
| 200-300ms | Most UI: modals, menus, cards |
| 300-500ms | Complex: page changes, large objects |
| >500ms | Rare: deliberate reveals, onboarding |

> Smaller object + shorter distance = faster animation.

---

## 1.5 Performance Golden Rule

| ✅ Animate (Compositor — GPU) | ❌ NEVER Animate (Triggers Reflow) |
|-----------------------------|----------------------------------|
| `transform: translate/scale/rotate` | `top`, `left`, `right`, `bottom` |
| `opacity` | `width`, `height`, `margin`, `padding` |

---

## 1.6 Accessibility — `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```

> See `aksesibilitas/07-inclusive-design-patterns.md` for vestibular disorders + seizure prevention.

---

## ⚡ Action Checklist
- [ ] Every animation serves a purpose (explain/guide/feedback/personality)
- [ ] Only animate `transform` and `opacity` — never layout-triggering properties
- [ ] Respect `prefers-reduced-motion` — always
- [ ] Repeated animations ≤ 200ms (users see them 100+ times/day)
