# ✨ 05 — Page Transitions

> 🔴 Advanced | Prereq: 01, 03 | ~3 min

Page transitions = continuity between views. "Same app, different room." View Transitions API = native-quality with minimal code.

---

## 5.1 Without vs With Transitions

```
❌ Click → WHITE FLASH → New page (brain resets context)
✅ Click → Current slides out → New slides in (brain maintains spatial continuity)
```

---

## 5.2 View Transitions API

```javascript
// SPA: wrap DOM changes
document.startViewTransition(() => {
  document.getElementById('content').innerHTML = newContent;
});
```

```css
/* MPA: ONE line for cross-page transitions */
@view-transition { navigation: auto; }
```

---

## 5.3 Custom Animations

```css
::view-transition-old(root) { animation: 300ms slide-out-to-left ease-in both; }
::view-transition-new(root) { animation: 300ms slide-in-from-right ease-out both; }

@keyframes slide-out-to-left { to { transform: translateX(-30px); opacity: 0; } }
@keyframes slide-in-from-right { from { transform: translateX(30px); opacity: 0; } }
```

---

## 5.4 Shared Element (Hero Animation)

```css
/* Both pages — browser auto-morphs position/size! */
.product-image { view-transition-name: product-hero; }
```

> ⚠️ Each `view-transition-name` must be UNIQUE per page.

---

## 5.5 Pattern Quick Pick

| Pattern | When | Feel |
|---------|------|------|
| Crossfade (default) | Any page change | Subtle, professional |
| Slide left/right | List → detail (hierarchical) | "Drilling in" |
| Slide up | Modal, bottom sheet | "Something's on top" |
| Scale up | Image expand | "Zooming into content" |
| None | Tab switches, filters | Instant, data-focused |

---

## 5.6 Progressive Enhancement

```javascript
if (!document.startViewTransition) {
  updatePageContent(newContent); // Fallback
  return;
}
document.startViewTransition(() => updatePageContent(newContent));
```

```css
@media (prefers-reduced-motion) {
  ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) {
    animation: none !important;
  }
}
```

---

## ⚡ Action Checklist
- [ ] Add `@view-transition { navigation: auto; }` for instant crossfade MPA transitions
- [ ] Use shared element transitions for image thumbnails → detail pages
- [ ] Always check `document.startViewTransition` support with fallback
- [ ] Respect `prefers-reduced-motion` — disable all transition animations
