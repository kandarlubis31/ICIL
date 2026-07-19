# ✨ 03 — CSS Transitions & Keyframes

> 🟡 Intermediate | Prereq: 02 | ~4 min

Practical CSS animation: transitions vs keyframes, performance, copy-paste toolkit.

---

## 3.1 Transitions — State Changes

```css
.button {
  background: #3498db;
  transition: all 200ms cubic-bezier(0.4, 0.0, 0.2, 1.0);
}
.button:hover { background: #2980b9; transform: scale(1.05); }
.button:active { transform: scale(0.95); }
```

| ✅ Use `transition` | ❌ Don't |
|--------------------|---------|
| Hover/press states | Looping animations |
| Toggle on/off | Multi-step sequences |
| Simple class changes | Auto-start (page load) |

---

## 3.2 Keyframes — Complex Animations

```css
@keyframes slide-up-and-fade {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
.modal { animation: slide-up-and-fade 300ms cubic-bezier(0.4,0.0,0.2,1.0) both; }
```

```css
animation: name duration easing delay iteration-count direction fill-mode;
```

> `fill-mode: forwards` → stays at 100%. Without it → snaps back.

---

## 3.3 Performance Layers

| Layer | Properties | Cost |
|-------|-----------|------|
| Compositor ✅ | `transform`, `opacity` | Cheap GPU |
| Paint ⚠️ | `color`, `background`, `box-shadow` | Medium |
| Layout ❌ | `width`, `height`, `top`, `left`, `margin` | EXPENSIVE |

```css
/* ❌ height triggers reflow every frame */
.element { transition: height 300ms; height: 0; }
.element.open { height: 200px; }

/* ✅ scaleY on transform — compositor only */
.element { transition: transform 300ms; transform: scaleY(0); transform-origin: top; }
.element.open { transform: scaleY(1); }
```

---

## 3.4 Copy-Paste Toolkit

```css
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes scale-in { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }

.animate-fade-in  { animation: fade-in  300ms ease-out both; }
.animate-slide-up { animation: slide-up 300ms cubic-bezier(0.4,0.0,0.2,1.0) both; }
.animate-scale-in { animation: scale-in 250ms cubic-bezier(0.4,0.0,0.2,1.0) both; }

.stagger > * { opacity: 0; animation: slide-up 300ms ease-out both; }
.stagger > *:nth-child(1) { animation-delay: 0ms; }
.stagger > *:nth-child(2) { animation-delay: 50ms; }
.stagger > *:nth-child(3) { animation-delay: 100ms; }
```

---

## 3.5 Transition vs Keyframes Decision

```
State change (hover/toggle)? → transition
Looping? Auto-start on load? Multi-step? → @keyframes
Default → transition (simpler, better perf)
```

---

## ⚡ Action Checklist
- [ ] Hover/toggle/class changes → `transition`. Everything else → `@keyframes`
- [ ] Only animate `transform` + `opacity` — never height/width/top/left
- [ ] Use `fill-mode: both` for keyframe entrance animations
- [ ] Copy toolkit classes: fade-in, slide-up, scale-in, stagger
