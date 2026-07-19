# 📱 02 — Touch Targets & Gesture Design

> **Level: 🟢 Beginner** | Prerequisite: 01 | Est. reading time: 11 min

Fingers are not mouse cursors. They're imprecise, opaque (they cover what they touch), and have a contact area roughly 40-50px wide. This course covers the science of touch interaction: how big targets should be, how much spacing they need, and how to design gestures that feel natural rather than frustrating.

---

## 2.1 The Physics of Touch

The average adult index finger pad is 10-14mm wide (~40-56 CSS pixels). But an imprecise tap can land 12-20px off-target. This means:

```
│              TOUCH CONTACT               │
│       │ ACTUAL  │  ← Finger contact area│
│       │ CONTACT │     (~40px diameter)  │
│       │ (~40px) │                       │
│    │  PERCEIVED    │  ← User thinks they│
│    │  TAP POINT    │     tapped here    │
│    │  (centroid)   │                    │
│     │   TARGET    │  ← Must be large    │
│     │   (≥48px)   │     enough to absorb│
│     │             │     tap imprecision │
```

---

## 2.2 Touch Target Size Standards

| Standard | Minimum Size | Context |
|----------|-------------|---------|
| **Apple HIG** | 44×44 pt (CSS pixels) | All interactive elements |
| **Google Material** | 48×48 dp (density-independent) | All touch targets |
| **WCAG 2.5.8 (AA)** | 24×24 CSS px | Minimum — added in WCAG 2.2 (Oct 2023) |
| **WCAG 2.5.5 (AAA)** | 44×44 CSS px | Enhanced (recommended) |
| **MIT Touch Lab** | 48×48 px | Based on finger pad research |

> **Practical rule**: **48×48px minimum**. Never go below 44px. For high-frequency actions (primary CTA, search, back), aim for **56×56px**.
>
> ℹ️ **WCAG 2.2 exceptions for SC 2.5.8 (24px min)**: Inline links in text, equivalent larger control on same page, user agent control, and essential display (e.g., dense data viz) are exempt. If a target is <24px but has enough spacing that a 24px circle centered on it doesn't overlap adjacent targets, it still passes.

### The "Fat Finger" Problem:

```css
/* ❌ TOO SMALL: 24px targets → mis-taps, frustration */
.too-small { width: 24px; height: 24px; }

/* ✅ MINIMUM: 48px targets → reliable tapping */
.good-target {
  min-width: 48px;
  min-height: 48px;
  /* The VISUAL element can be smaller if hit area is 48px */
}

/* ✅ EXPANDED HIT AREA: Visual 24px icon, 48px invisible hit area */
.icon-button {
  position: relative;
  width: 24px; height: 24px;
}
.icon-button::after {
  content: '';
  position: absolute;
  top: -12px; left: -12px;
  right: -12px; bottom: -12px;
  /* Adds 24px padding all around → 24+24 = 48px hit area */
  /* Invisible to user, but catchable by thumb */
}

/* ✅ OPTIMAL: 56px for primary actions */
.btn-primary {
  min-width: 56px; min-height: 56px;
  padding: 16px 24px;
}
```

---

## 2.3 Spacing Between Touch Targets

Even with large targets, placing them too close causes mis-taps:

| Spacing | Reliability | When to Use |
|---------|------------|-------------|
| **< 8px** | High mis-tap rate | Never — too close for any finger |
| **8-12px** | Acceptable for small fingers | Secondary actions, infrequent taps |
| **12-24px** | Good for most users | List items, navigation items |
| **24-32px** | Excellent for all | Primary actions in toolbars |

```css
/* Safe spacing for touch targets */
.touch-list {
  display: flex;
  flex-direction: column;
  gap: 12px; /* Minimum 12px between tappable items */
}

.toolbar {
  display: flex;
  gap: 24px; /* Toolbar actions need generous spacing */
  padding: 8px 16px;
}

/* Prevent edge-to-edge buttons in list */
.touch-list a {
  padding: 16px;
  min-height: 48px;
  border-radius: 8px; /* Rounded corners help distinguish adjacent targets */
}
```

---

## 2.4 The Gesture Vocabulary

Touch interfaces have a rich gesture vocabulary. Each gesture must be **discoverable** and have a **non-gesture alternative**:

| Gesture | Action | Usage | Discoverability |
|---------|--------|-------|----------------|
| **Tap** | Select, activate, submit | Primary interaction | High — natural pointing |
| **Double-tap** | Zoom in/out, like | Secondary action | Low — must be taught |
| **Long-press** | Context menu, drag | Power user action | Low — requires hint |
| **Swipe** | Navigate, dismiss, reveal actions | Common mobile pattern | Medium — visual affordance |
| **Pinch** | Zoom in/out | Maps, images, documents | Medium — natural zoom |
| **Drag** | Reorder, move | List reordering, kanban | Medium — drag handle hint |
| **Two-finger swipe** | Navigate between tabs | Power user | Very low — must be taught |
| **Force/3D Touch** | Preview, quick actions | Deprecated (removed by Apple) | Very low |

### Swipe Design Principles:

```
SWIPE ANATOMY:
  │  Start position ──→ End position │
  │  (touch point)      (release)    │
  │  Rules:                          │
  │  • Threshold: 30-50px before     │
  │    action commits                │
  │  • Velocity: fast swipe commits  │
  │    even below threshold          │
  │  • Spring back: if threshold     │
  │    not reached, item returns     │
  │  • Visual feedback: item follows │
  │    finger with resistance        │
```

```javascript
// Swipe-to-dismiss implementation with threshold and velocity
class SwipeHandler {
  constructor(element, { onDismiss }) {
    this.el = element;
    this.startX = 0;
    this.currentX = 0;
    this.threshold = 80; // px to trigger dismiss
    this.velocityThreshold = 0.5; // px/ms for fast swipe

    this.el.addEventListener('touchstart', this.onStart.bind(this), { passive: true });
    this.el.addEventListener('touchmove', this.onMove.bind(this), { passive: true });
    this.el.addEventListener('touchend', this.onEnd.bind(this));
  }

  onStart(e) {
    this.startX = e.touches[0].clientX;
    this.startTime = Date.now();
    this.el.style.transition = 'none';
  }

  onMove(e) {
    this.currentX = e.touches[0].clientX;
    const dx = this.currentX - this.startX;
    if (dx > 0) { // Only right-swipe
      this.el.style.transform = `translateX(${dx}px)`;
      this.el.style.opacity = 1 - (dx / this.threshold);
    }
  }

  onEnd() {
    const dx = this.currentX - this.startX;
    const dt = Date.now() - this.startTime;
    const velocity = Math.abs(dx) / dt;

    this.el.style.transition = 'transform .3s ease, opacity .3s ease';

    if (dx > this.threshold || velocity > this.velocityThreshold) {
      // Dismiss: animate off screen
      this.el.style.transform = 'translateX(100%)';
      this.el.style.opacity = '0';
      this.el.addEventListener('transitionend', () => this.el.remove());
    } else {
      // Spring back
      this.el.style.transform = 'translateX(0)';
      this.el.style.opacity = '1';
    }
  }
}
```

---

## 2.5 Gesture Discoverability

The biggest problem with gestures: **users don't know they exist**. Unlike buttons with visible labels, gestures are invisible:

| Strategy | Example | Effectiveness |
|----------|---------|---------------|
| **Onboarding hint** | Animated hand showing swipe action on first visit | Medium — forgotten quickly |
| **Visual affordance** | Peeking action behind a list item (partially visible) | High — curiosity triggers discovery |
| **Progressive disclosure** | Gesture hint appears after basic usage is mastered | High — contextual and non-intrusive |
| **Contextual coach mark** | "Swipe to see more" label on first use | Medium — intrusive if overused |
| **Haptic confirmation** | Short vibration on gesture activation | Low — confirms but doesn't teach |

```html
<!-- Visual affordance: peeked action hints at swipe -->
<div class="list-item-swipeable">
  <!-- Action behind the item (partially visible) -->
  <div class="swipe-actions">
    <button class="action-archive">📦 Archive</button>
    <button class="action-delete">🗑 Delete</button>
  </div>

  <!-- The visible item content -->
  <div class="item-content">
    <h3>Meeting notes — July 14</h3>
    <p>Discuss Q3 roadmap and resource allocation</p>
  </div>
</div>

<style>
.list-item-swipeable {
  position: relative; overflow: hidden;
  border-radius: 12px; margin-bottom: 8px;
}
.swipe-actions {
  position: absolute; right: 0; top: 0; bottom: 0;
  display: flex;
}
.swipe-actions button {
  width: 80px; border: none; cursor: pointer;
  font-size: .9rem; font-weight: 600; color: #fff;
}
.action-archive { background: #2196F3; }
.action-delete { background: #f44336; }
.item-content {
  position: relative; z-index: 1;
  padding: 16px; background: #fff;
  border: 1px solid #eee; border-radius: 12px;
  transition: transform .2s ease;
}
</style>
```

---

## 2.6 Gesture Conflicts & Platform Conventions

Some gestures conflict with OS-level gestures. Know when to avoid them:

| Gesture | iOS Conflict | Android Conflict |
|---------|-------------|-----------------|
| **Swipe from left edge** | Back navigation (iOS 7+) | — |
| **Swipe from bottom edge** | Home indicator / app switcher | System navigation |
| **Swipe from top edge** | Notification center | Notification shade |
| **Pinch with 4-5 fingers** | Close app (iPad) | — |
| **Long-press** | Context menu / Haptic Touch | Context menu |

> **Rule**: Never override edge-swipe gestures. Users rely on them for system navigation. If you must use edge gestures, provide a clear visual indicator and an alternative (e.g., explicit back button).

---

## Quick Summary

| Concept | Key Takeaway |
|---------|-------------|
| **48px minimum** | Touch targets must be ≥ 48×48px for reliable tapping |
| **Spacing ≥ 12px** | Minimum 12px gap between adjacent touch targets |
| **Tap > Swipe > Long-press** | Gesture hierarchy based on discoverability |
| **Visual affordance** | Peeking actions, animated hints — gestures need cues |
| **Swipe threshold** | 80px or velocity > 0.5px/ms triggers swipe action |
| **No edge override** | Never hijack system edge-swipe gestures |
| **Alt for every gesture** | Every gesture needs a visible button alternative |
