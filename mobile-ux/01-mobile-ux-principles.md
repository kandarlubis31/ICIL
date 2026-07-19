# 📱 01 — Mobile UX Principles & Mobile-First Thinking

> **Level: 🟢 Beginner** | Prerequisite: — | Est. reading time: 12 min

Mobile UX is not "desktop UX shrunk down." It's a fundamentally different paradigm: thumb-driven interaction, context-switching users, constrained viewports, and split-second attention. This course covers the foundational principles of mobile UX and the mobile-first design philosophy that should guide every digital product.

---

## 1.1 Why Mobile Is Different

Mobile devices are not smaller desktops. They introduce constraints and opportunities that fundamentally change how we design:

| Factor | Desktop | Mobile |
|--------|---------|--------|
| **Input** | Mouse (high precision), keyboard | Thumb/finger (low precision, ~48px), voice, gyroscope |
| **Screen** | 1280-2560px, stable | 320-430px, rotating, notch/island interference |
| **Context** | Stationary, sustained attention | On-the-go, interrupted, one-handed, micro-sessions |
| **Interaction model** | Click, hover, right-click, keyboard shortcuts | Tap, swipe, pinch, long-press, force touch |
| **Network** | Reliable broadband | Variable 3G/4G/5G/WiFi, offline gaps |
| **Battery** | Plugged in, unlimited | Conserved, background processes throttled |
| **Sensors** | None | GPS, accelerometer, gyroscope, barometer, NFC |

> **Key Insight**: Designing for desktop and "adapting" to mobile always produces a worse mobile experience. Designing mobile-first and enhancing for desktop produces a better experience on both.

---

## 1.2 The Mobile-First Design Philosophy

**Luke Wroblewski** (2009, *"Mobile First"*) articulated the philosophy that transformed web design:

```
DESKTOP-FIRST (the old way):          MOBILE-FIRST (the right way):
  Design for 1280px                     Design for 320px
  → Remove elements for tablet          → Add elements for tablet
  → Remove more for phone               → Add more for desktop
  → Mobile = stripped, compromised       → Mobile = intentional, core
  → Desktop = full experience            → Desktop = enhanced experience
```

### Mobile-First Principles:

| Principle | Meaning | Why |
|-----------|---------|-----|
| **Content over chrome** | Prioritize what users need, not navigation chrome | Limited space forces prioritization |
| **One thing per screen** | Each screen has ONE primary action | Split attention kills mobile UX |
| **Thumbs design** | Place actions where thumbs naturally reach | 75% of users use one thumb |
| **Progressive enhancement** | Core works everywhere; enhancements layer on | Graceful degradation reversed |
| **Offline-first** | Works without network; syncs when connected | Mobile connectivity is unreliable |
| **Speed is UX** | Perceived performance > actual performance | Users abandon after 3 seconds |

### The Mobile-First CSS Pattern:

```css
/* MOBILE-FIRST: Base styles are mobile; media queries add for larger */
.card { padding: 1rem; }               /* Mobile base */
.grid { display: flex; flex-direction: column; gap: 1rem; }  /* Stack on mobile */

@media (min-width: 768px) {            /* Tablet enhancement */
  .card { padding: 1.5rem; }
  .grid { flex-direction: row; flex-wrap: wrap; }
  .grid > * { flex: 1 1 300px; }
}

@media (min-width: 1024px) {           /* Desktop enhancement */
  .card { padding: 2rem; max-width: 800px; margin: 0 auto; }
}
```

---

## 1.3 Mobile Context States

Mobile users operate in radically different contexts than desktop users. Design for all of them:

| Context | Characteristics | Design Implication |
|---------|----------------|-------------------|
| **On-the-go** | Walking, commuting, one-handed | Large touch targets, simplified actions |
| **Micro-session** | 15-60 second bursts | Save state, allow instant resume |
| **Interrupted** | Notifications, calls, context switches | Auto-save, no data loss on background |
| **Low attention** | TV on, in conversation, distracted | Bold visual hierarchy, minimal reading |
| **Offline** | Subway, airplane, poor signal | Offline-first, optimistic UI, sync queue |
| **One-handed** | Holding coffee, standing on train | Bottom-aligned actions, reachability |
| **Landscape** | Gaming, video, typing | Don't lock portrait; support rotation |
| **High-stress** | Emergency, last-minute booking | Clear CTAs, error prevention, speed |

### Context Detection & Adaptation:

```css
/* Adapt UI based on device posture and capabilities */
@media (pointer: coarse) {
  /* Touch device: larger hit areas */
  button, a, [role="button"] { min-height: 48px; min-width: 48px; }
}

@media (hover: none) {
  /* No hover capability: don't rely on hover states */
  .tooltip { display: none; }
  .hover-menu { /* Replace with tap-to-open pattern */ }
}

@media (prefers-reduced-motion: reduce) {
  /* User prefers minimal motion: disable parallax, spring animations */
  .scroll-parallax { transform: none !important; }
}
```

```javascript
// Detect effective connection type for adaptive loading
if (navigator.connection) {
  const { effectiveType, saveData } = navigator.connection;
  if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
    // Load low-res images, defer non-critical JS, disable autoplay video
    document.documentElement.classList.add('low-data-mode');
  }
}

// Detect battery status for power-saving mode
if ('getBattery' in navigator) {
  navigator.getBattery().then(battery => {
    if (battery.level < 0.2 && !battery.charging) {
      document.documentElement.classList.add('power-save');
      // Reduce animation frame rate, pause background sync
    }
  });
}
```

---

## 1.4 Mobile Performance as UX

Performance is not a technical concern — it's UX. On mobile, it's the **primary** UX concern:

```
LOAD TIME IMPACT ON CONVERSION (Google research):
  1s  →  Base conversion rate
  2s  →  -7% conversion
  3s  →  -20% conversion
  5s  →  -38% conversion
  10s →  -53% bounce rate increase

The "3-second rule":
  53% of mobile users abandon if loading takes > 3 seconds
```

### Perceived Performance Tactics:

| Tactic | What It Does | Implementation |
|--------|-------------|----------------|
| **Skeleton screens** | Show layout immediately, fill content async | Gray placeholder shapes that animate → real content |
| **Optimistic UI** | Assume action succeeds, roll back if it fails | Update UI instantly, queue server sync |
| **Lazy loading** | Load content as user scrolls | `loading="lazy"` on images, Intersection Observer |
| **Preload critical path** | Prioritize above-the-fold resources | `<link rel="preload">` for hero image, critical CSS inline |
| **Service Worker cache** | Serve cached content instantly | PWA service worker with cache-first strategy |
| **Progressive images** | Low-res first, high-res on load | Blur-up technique: 50px placeholder → full image |

```html
<!-- Skeleton Screen + Progressive Image Loading Example -->
<div class="card">
  <!-- Skeleton placeholder: visible immediately -->
  <div class="skeleton-image"></div>
  <div class="skeleton-line" style="width:80%"></div>
  <div class="skeleton-line" style="width:60%"></div>

  <!-- Real content: loads asynchronously -->
  <img src="photo-lg.webp"
       srcset="photo-sm.webp 400w, photo-lg.webp 800w"
       sizes="(max-width: 400px) 100vw, 400px"
       loading="lazy"
       onload="this.previousElementSibling.style.display='none'"
       alt="Product photo">
</div>

<style>
.skeleton-image {
  width: 100%; height: 200px; background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200% 100%; animation: shimmer 1.5s infinite;
}
.skeleton-line { height: 16px; background: #eee; border-radius: 4px; margin: 8px 0; }
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
</style>
```

---

## 1.5 Mobile Accessibility Is Non-Negotiable

Mobile accessibility is not a separate concern. It's embedded in every design decision:

| WCAG Criterion | Mobile-Specific Consideration |
|---------------|------------------------------|
| **2.5.5 Target Size** | Touch targets ≥ 44×44 CSS pixels (WCAG AAA) |
| **2.5.1 Pointer Gestures** | Multi-point gestures need single-point alternatives |
| **2.5.2 Pointer Cancellation** | Actions fire on `up` event, not `down` (prevent accidental activation) |
| **2.5.4 Motion Actuation** | Functions triggered by shaking must have button alternatives |
| **1.4.4 Resize Text** | Text must scale to 200% without horizontal scrolling |
| **1.4.10 Reflow** | Content must reflow at 320px width without scrolling |

```css
/* Mobile Accessibility Baseline */
:root {
  /* Minimum touch target size (AAA) */
  --touch-target: 48px;
}

/* Make all interactive elements thumb-friendly */
button, a, input, select, textarea, [role="button"], [tabindex] {
  min-height: var(--touch-target);
  min-width: var(--touch-target);
  /* Don't rely on hover for essential info */
  cursor: pointer;
}

/* Increase spacing between tappable items */
.nav-list li + li { margin-top: 4px; }

/* Ensure text can scale */
html { font-size: 100%; } /* Respect user's browser font size setting */
```

> Cross-reference: `aksesibilitas/07-inclusive-design-patterns.md` for full accessibility patterns including touch target WCAG requirements.

---

## Quick Summary

| Concept | Key Takeaway |
|---------|-------------|
| **Mobile is different** | Touch input, thumb-driven, context-switching, variable connectivity |
| **Mobile-first** | Design for smallest screen first; enhance upward with media queries |
| **Content over chrome** | Prioritize what users need over navigation decoration |
| **Speed is UX** | 53% abandon after 3 seconds; perceived performance matters most |
| **Context-aware** | Design for one-handed, offline, low-attention, micro-sessions |
| **Touch accessibility** | 48px minimum touch targets; single-pointer alternatives for gestures |
| **Progressive enhancement** | Core works everywhere; enhancements layer on for capable devices |
