# 📱 06 — Mobile Animations & Haptics

> **Level: 🟡 Intermediate** | Prerequisite: 01 | Est. reading time: 10 min

Animation on mobile is not decoration — it's navigation. It tells users where they came from, where they're going, and whether their action succeeded. Combined with haptic feedback, motion creates the tactile illusion that makes glass screens feel like physical objects. This course covers mobile-optimized animations and the haptic vocabulary that makes taps feel real.

---

## 6.1 Why Mobile Animation Matters

| Function | Without Animation | With Animation |
|----------|-------------------|----------------|
| **Navigation** | Abrupt page jumps — disorienting | Smooth transitions maintain spatial model |
| **Feedback** | Did the tap register? Uncertainty | Button press animation + haptic confirms action |
| **Loading** | Blank screen — "Is it broken?" | Skeleton screen, progress indicator |
| **Gestures** | No connection between touch and result | Object follows finger, springs back or commits |
| **Hierarchy** | Flat, unclear relationships | Parent → child transitions show structure |

---

## 6.2 Mobile Animation Principles

Same principles as desktop, but constrained by mobile performance:

| Principle | Mobile-Specific | Implementation |
|-----------|----------------|----------------|
| **200-300ms duration** | Any longer feels sluggish on mobile | Standard UI transitions |
| **Use only `transform` + `opacity`** | GPU-composited, no layout recalculation | Avoid animating width, height, top, left |
| **Spring over ease** | Springs feel more natural on touch | ` cubic-bezier(0.34, 1.56, 0.64, 1)` for bounce |
| **Respect reduced motion** | Critical for accessibility + battery | `@media (prefers-reduced-motion)` |
| **60fps target** | Frame drops are more noticeable on small screens | `will-change` hint, `requestAnimationFrame` |

```css
/* Mobile-optimized page transition */
.page-enter {
  opacity: 0;
  transform: translateY(20px); /* Slide up — natural mobile direction */
}

.page-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity .25s ease-out, transform .3s cubic-bezier(.2,.8,.2,1);
  /* Transform + opacity only → GPU accelerated, no layout thrash */
}

.page-exit-active {
  opacity: 0;
  transform: translateY(-20px); /* Exit upward */
  transition: opacity .2s ease-in, transform .25s ease-in;
}

/* Respect accessibility preferences */
@media (prefers-reduced-motion: reduce) {
  .page-enter-active, .page-exit-active {
    transition: opacity .1s ease; /* Fade only, no movement */
    transform: none;
  }
}
```

---

## 6.3 Button Feedback Animations

The most common mobile animation — and the one users notice most:

```css
/* Button press animation — makes glass feel physical */
.btn {
  padding: 14px 28px; border: none; border-radius: 12px;
  background: #2563eb; color: #fff; font-size: 1rem; font-weight: 600;
  cursor: pointer;
  transition: transform .1s ease, box-shadow .1s ease;
  /* Start "raised" */
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(37,99,235,.3);
}

.btn:active {
  /* Press down — physical metaphor */
  transform: translateY(2px); /* "Pushed in" */
  box-shadow: 0 1px 4px rgba(37,99,235,.2); /* Shadow shrinks on press */
  transition: transform .05s ease, box-shadow .05s ease; /* Instant response */
}

/* Success animation: checkmark + color change */
.btn.success {
  background: #4CAF50;
  animation: success-pulse .6s ease;
}

@keyframes success-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
```

---

## 6.4 Pull-to-Refresh — The Signature Mobile Animation

```javascript
// Pull-to-refresh implementation with physics-based spring animation
class PullToRefresh {
  constructor(container, { onRefresh }) {
    this.container = container;
    this.indicator = container.querySelector('.ptr-indicator');
    this.pullDistance = 0;
    this.threshold = 80; // px to trigger refresh
    this.refreshing = false;

    this.container.addEventListener('touchstart', (e) => {
      if (this.container.scrollTop <= 0) this.startY = e.touches[0].clientY;
    }, { passive: true });

    this.container.addEventListener('touchmove', (e) => {
      if (this.container.scrollTop > 0 || this.refreshing) return;
      const dy = e.touches[0].clientY - this.startY;
      if (dy > 0) {
        this.pullDistance = Math.min(dy * 0.4, 120); // Resistance: 40% of pull
        this.indicator.style.transform = `translateY(${this.pullDistance}px)`;
        this.indicator.style.opacity = Math.min(this.pullDistance / this.threshold, 1);
      }
    }, { passive: true });

    this.container.addEventListener('touchend', () => {
      if (this.pullDistance > this.threshold) {
        this.refreshing = true;
        this.indicator.textContent = '⟳ Refreshing...';
        onRefresh().finally(() => {
          this.indicator.style.transform = 'translateY(0)';
          this.refreshing = false;
        });
      } else {
        this.indicator.style.transition = 'transform .3s cubic-bezier(.2,.8,.2,1)';
        this.indicator.style.transform = 'translateY(0)';
        setTimeout(() => this.indicator.style.transition = '', 300);
      }
      this.pullDistance = 0;
    });
  }
}
```

---

## 6.5 Haptic Feedback — Making Taps Feel Real

Haptics are vibration patterns that provide physical confirmation. They're processed 4x faster than visual feedback:

```javascript
// Haptic feedback patterns for different interactions
const Haptics = {
  light() {
    // Quick, light tap — button press, selection
    if (navigator.vibrate) navigator.vibrate(10);
  },

  medium() {
    // Confirmation — successful action, toggle on
    if (navigator.vibrate) navigator.vibrate(15);
  },

  heavy() {
    // Significant action — error, delete confirmation
    if (navigator.vibrate) navigator.vibrate([10, 50, 20]);
  },

  success() {
    // Success pattern: tap-tap (like a heartbeat)
    if (navigator.vibrate) navigator.vibrate([10, 60, 30]);
  },

  warning() {
    // Warning pattern: tap-tap-tap
    if (navigator.vibrate) navigator.vibrate([15, 50, 15, 50, 30]);
  },

  selection() {
    // iOS-style selection feedback
    if (navigator.vibrate) navigator.vibrate(5);
  }
};

// Usage
document.querySelector('.like-btn').addEventListener('click', () => {
  Haptics.medium(); // Physical feedback on like
  // ... update UI ...
});

document.querySelector('.delete-btn').addEventListener('click', () => {
  Haptics.heavy(); // Strong feedback on destructive action
  // ... confirm and delete ...
});
```

### Haptic Design Rules:

| Rule | Reason |
|------|--------|
| **Every action deserves feedback** | Confirms tap registered — builds trust |
| **Match intensity to significance** | Light for selection, heavy for delete |
| **Don't overuse** | Constant vibration is annoying → users disable |
| **Respect system setting** | Check accessibility preferences |
| **Fall back gracefully** | `navigator.vibrate` not available on all devices |

---

## 6.6 View Transitions for Mobile

Modern CSS View Transitions API provides smooth cross-page animations:

```javascript
// SPA-like transitions between mobile screens
function navigateTo(url) {
  // Check browser support
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      // Update the DOM inside the transition callback
      return fetch(url).then(r => r.text()).then(html => {
        document.getElementById('app').innerHTML = html;
      });
    });
  } else {
    // Fallback: navigate normally
    window.location.href = url;
  }
}
```

```css
/* Customize the transition animation */
::view-transition-old(root) {
  animation: fade-out .2s ease-in forwards;
}

::view-transition-new(root) {
  animation: slide-up .3s cubic-bezier(.2,.8,.2,1) forwards;
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

> Cross-reference: `animasi/05-page-transitions.md` for the complete View Transitions API guide.

---

## Quick Summary

| Concept | Key Takeaway |
|---------|-------------|
| **transform + opacity only** | GPU-composited, 60fps on mobile |
| **200-300ms durations** | Standard; spring easing for natural feel |
| **Button press animation** | `translateY(2px)` on `:active` — physical metaphor |
| **Haptics 4x faster** | Physical feedback faster than visual — confirms tap |
| **Respect reduced motion** | Always honor accessibility preference |
| **Pull-to-refresh** | Signature mobile pattern — physics-based spring |
| **View Transitions API** | Native smooth SPA-like transitions |
