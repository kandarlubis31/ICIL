# 📱 04 — Thumb Zone & One-Handed Design

> **Level: 🟡 Intermediate** | Prerequisite: 02 | Est. reading time: 10 min

75% of smartphone users operate their device with one hand — and 49% use only their thumb. Yet most mobile interfaces place critical actions at the top of the screen, in the hardest-to-reach zone. This course covers thumb zone mapping, Fitts' Law applied to mobile, and strategies for designing interfaces that thumbs can actually reach.

---

## 4.1 The Thumb Zone Map

**Steven Hoober** (2013, *"Designing Mobile Interfaces"*) conducted research on how people hold their phones. The findings changed mobile design forever:

```
│            HARD TO REACH              │
│           (two-hand stretch)          │
│  │         AWKWARD ZONE            │  │
│  │    (requires thumb stretch)     │  │
│  │  │      NATURAL ZONE         │  │  │ ← Thumb pivots here
│  │  │    (thumb rests here)     │  │  │   Most natural reaching area
│  │         OW (out of reach)       │  │
│            OW (out of reach)          │

ONE-HANDED (right thumb):         ONE-HANDED (left thumb):
  Natural Zone: bottom-center       Natural Zone: bottom-center
  Stretch: bottom-right corner      Stretch: bottom-left corner
  Pain: top-left corner             Pain: top-right corner
```

### Zone Distribution:

| Zone | Reachability | What to Put Here |
|------|-------------|-----------------|
| **Natural** (bottom-center) | Effortless | Primary actions, navigation, CTAs |
| **Stretch** (bottom-edges) | Moderate effort | Secondary actions, filters |
| **Awkward** (middle) | High effort | Content display (read-only) |
| **Hard/Ow** (top corners) | Two-hand or hand-shift required | Branding, hamburger menu, profile |

---

## 4.2 Fitts' Law on Mobile

**Fitts' Law** (1954) predicts that the time to reach a target is a function of distance and size:

```
TIME = a + b × log₂(D/W + 1)

D = distance to target
W = width of target

→ Farther targets take longer
→ Smaller targets take longer
→ Bottom targets are closer → faster (thumb pivots from bottom)
→ Top targets are farther → slower
```

### Mobile Fitts' Law in Practice:

```css
/* ❌ VIOLATES FITTS' LAW: Primary CTA at top (farthest from thumb) */
.top-cta {
  position: fixed; top: 16px; right: 16px;
  /* Thumb must travel 200+ px → slow, effortful */
}

/* ✅ RESPECTS FITTS' LAW: Primary CTA in natural zone */
.natural-cta {
  position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
  /* Near thumb resting position → fast, effortless */
  width: calc(100% - 32px); max-width: 400px;
  padding: 16px; min-height: 56px;
  border-radius: 14px;
}

/* ✅ RESPECTS FITTS' LAW: Edge targets are infinitely large in one dimension */
/* Corners and edges are the fastest to reach (macOS menu bar concept) */
.bottom-right-fab {
  position: fixed; bottom: 24px; right: 24px;
  /* Edge proximity + bottom position = fastest target on screen */
  width: 56px; height: 56px; border-radius: 16px;
}
```

---

## 4.3 Grip Styles & Design Implications

Hoober identified three primary grip styles:

| Grip | % Users | Thumb Reach | Design Strategy |
|------|---------|-------------|----------------|
| **One-handed (right)** | 49% | Bottom-center dominant | Action at bottom; navigation at bottom |
| **Cradled (two hands)** | 36% | Full screen with two thumbs | Actions on both sides |
| **Two-handed (portrait)** | 15% | Index finger precision | Smaller targets acceptable |

```css
/* Design for one-handed users as the primary audience */
/* 49% is the largest single group → optimize for them first */

/* Bottom-anchored actions for one-handed use */
.mobile-actions {
  position: fixed; bottom: 0; left: 0; right: 0;
  padding: 12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom, 0));
  background: #fff;
  border-top: 1px solid #eee;
}

/* But also support cradled/two-handed with side reach */
@media (min-width: 768px) {
  .mobile-actions {
    /* On tablets, spread actions to both sides for two-thumb use */
    display: flex; justify-content: space-between;
  }
}
```

---

## 4.4 Reachability Patterns

When you MUST place something at the top, provide reachability aids:

| Pattern | How It Works | Example |
|---------|-------------|---------|
| **Pull-down** | Swipe down to bring top UI within reach | iOS Reachability (double-tap home bar) |
| **Bottom sheet** | Critical actions in a sheet that slides up from bottom | Apple Maps place details |
| **Floating action duplication** | Repeat top action at bottom for one-handed access | Search bar duplicated at bottom |
| **Back gesture** | Edge swipe replaces top-left back button | iOS back gesture, Android back gesture |

```html
<!-- Search: Top placement for visibility, bottom duplication for reachability -->
<!-- TOP (visible, scannable, but hard to reach) -->
<header class="search-header">
  <input type="search" id="search-top" placeholder="Search...">
</header>

<!-- BOTTOM (easy to reach for one-handed users) -->
<div class="search-bottom">
  <button class="search-floating" onclick="document.getElementById('search-top').focus()">
    🔍 Search
  </button>
</div>

<style>
.search-header { position: sticky; top: 0; padding: 12px 16px; background: #fff; z-index: 50; }
.search-header input { width: 100%; padding: 12px 16px; border-radius: 12px; border: 1px solid #ddd; font-size: 1rem; }

.search-floating {
  position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
  padding: 12px 24px; border-radius: 24px; border: 1px solid #ddd;
  background: #fff; box-shadow: 0 2px 12px rgba(0,0,0,.1);
  font-size: .95rem; cursor: pointer; z-index: 40;
}
</style>
```

---

## 4.5 Testing Thumb Reach

Simple method to test your designs for one-handed usability:

```
THUMB REACH TEST (on actual device):

  1. Hold phone with your DOMINANT hand
  2. Without shifting grip, try to tap every interactive element
  3. Mark elements that require:
     ✗ Hand shift (fail — redesign)
     △ Thumb stretch (warning — provide alternative)
     ✓ Natural reach (pass)

  4. Redesign "hand shift" elements:
     → Move to bottom of screen
     → Or add floating action button
     → Or enable swipe gesture as alternative
```

### CSS Media Query for One-Handed Mode:

```css
/* Detect when user might want one-handed mode (narrow, portrait) */
@media (max-width: 430px) and (orientation: portrait) {
  /* One-handed optimizations */
  .primary-action { position: fixed; bottom: 80px; }
  .top-nav { display: none; }
  .bottom-nav { display: flex; }
}
```

---

## Quick Summary

| Concept | Key Takeaway |
|---------|-------------|
| **49% one-handed** | Half your users use one thumb — design for them first |
| **Natural zone** | Bottom-center = effortless reach for thumb |
| **Pain zone** | Top corners = requires hand-shift or two hands |
| **Fitts' Law** | Closer + bigger = faster; put CTAs in natural zone |
| **Bottom over top** | Actions at bottom; content (read-only) at top |
| **Reachability aids** | Pull-down, bottom sheets, floating duplicates |
| **Test on device** | Thumb reach test finds problems no simulator catches |
