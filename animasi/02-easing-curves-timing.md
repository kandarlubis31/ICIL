# ✨ 02 — Easing Curves & Timing

> 🟢 Beginner | Prereq: 01 | ~4 min

Easing = soul of animation. Controls *rate of change* — snappy, smooth, bouncy, or robotic.

---

## 2.1 Why Linear = Wrong

Real objects have mass, friction, inertia. Linear motion violates every physical intuition. **Never use `linear`** except for: progress bars, marquee text, spinning loaders.

---

## 2.2 Four Core Easings

| Type | When | Example |
|------|------|---------|
| **Ease-out** (fast→slow) | Elements ENTERING | Modal appears, dropdown opens |
| **Ease-in** (slow→fast) | Elements LEAVING permanently | Notifications dismissed |
| **Ease-in-out** | Elements moving ON-SCREEN | Tab switch, carousel slide |
| **Linear** | Almost NEVER | Progress bars, spin loaders only |

> **Ease-out is default.** Most UI animations are elements appearing.

---

## 2.3 Cubic-Bezier Presets

```css
/* Material Design standard easing */
.element { transition: all 300ms cubic-bezier(0.4, 0.0, 0.2, 1.0); }
```

| Name | Value | Use Case |
|------|-------|----------|
| Material Standard | `(0.4, 0.0, 0.2, 1.0)` | Most transitions ⭐ |
| Material Decelerate | `(0.0, 0.0, 0.2, 1.0)` | Elements appearing |
| Material Accelerate | `(0.4, 0.0, 1.0, 1.0)` | Elements leaving |
| CSS Ease | `(0.25, 0.1, 0.25, 1.0)` | Gentle default |
| Bounce | `(0.68, -0.55, 0.27, 1.55)` | Playful UI |

> [cubic-bezier.com](https://cubic-bezier.com/) — visually craft custom curves.

---

## 2.4 Duration by Element Size

| Element | Distance | Duration |
|---------|----------|----------|
| Micro (button, icon) | Tiny | 100-150ms |
| Small (card, tooltip) | Short | 150-250ms |
| Medium (modal, drawer) | Medium | 250-350ms |
| Large (page transition) | Long | 350-500ms |

---

## 2.5 Choreography — Staggering

```
Container first (0ms) → Item1(+50ms) → Item2(+100ms) → Item3(+150ms)
```

```css
.list-item:nth-child(1) { animation-delay: 0ms; }
.list-item:nth-child(2) { animation-delay: 50ms; }
.list-item:nth-child(3) { animation-delay: 100ms; }
```

> Stagger 20-50ms per item. >50ms = sluggish, <20ms = imperceptible.

---

## ⚡ Action Checklist
- [ ] Default easing: Material Standard `cubic-bezier(0.4, 0.0, 0.2, 1.0)`
- [ ] Ease-out for appearing, ease-in for leaving, ease-in-out for on-screen movement
- [ ] Micro-interactions: 100-150ms. Modals: 250-350ms. Pages: 350-500ms.
- [ ] Stagger list items by 20-50ms each
