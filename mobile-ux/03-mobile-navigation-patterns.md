# 📱 03 — Mobile Navigation Patterns

> **Level: 🟡 Intermediate** | Prerequisite: 01, 02 | Est. reading time: 12 min

Navigation is the backbone of mobile UX. Get it wrong, and users are lost. Get it right, and they never think about it. This course covers the complete spectrum of mobile navigation patterns: when to use a hamburger menu, why bottom navigation beats top, and how to design navigation that works at thumb height.

---

## 3.1 The Mobile Navigation Problem

Desktop has a persistent sidebar or top nav. Mobile has ~320-430px of width. You can't just shrink the desktop nav:

```
DESKTOP NAV:  ──────────────────────────────────────────
              Home | Products | About | Blog | Contact | Login
              (All 6 items visible, 1280px wide → plenty of room)

MOBILE NAV:   ───────────────────
              ☰ (hamburger menu)
              (320px wide → only room for 3-4 items OR a menu toggle)
```

### The Hamburger Menu Problem:

```
HAMBURGER ☰ — PROS:                HAMBURGER ☰ — CONS:
  Saves screen space                Hidden: out of sight, out of mind
  Familiar icon                     Lower engagement: ~50% less discovery
  Clean, minimal look               Extra tap required to reveal
  Scales to many items              No visual context of what's inside
                                    Can't highlight current section
```

> **Key research** (NNGroup, 2014): Hidden navigation (hamburger) reduces content discovery by **21%** and increases task time by **~1 second per tap**. Use it only when truly necessary.

---

## 3.2 Mobile Navigation Patterns — Decision Guide

```
                    How many top-level sections?
              │ ≤5         │ 5-8        │ ≥9
              ▼            ▼            ▼
        │ Bottom   │ │ Bottom   │ │ Hamburger│
        │ Nav      │ │ Nav +    │ │ Menu     │
        │ (Tab Bar)│ │ "More"   │ │ (Sidebar)│
```

| Pattern | Best For | Max Items | Example Apps |
|---------|----------|-----------|-------------|
| **Bottom Navigation** | 3-5 top-level destinations | 5 | Instagram, Spotify, Twitter |
| **Tab Bar (top tabs)** | 2-4 content filters within a section | 4 | YouTube (subscriptions tabs) |
| **Hamburger Menu** | 6+ sections, secondary actions | Unlimited | Most apps (settings, account) |
| **Floating Action Button (FAB)** | Single primary action | 1 | Gmail (compose), Google Maps (directions) |
| **Swipeable Tabs** | 2-4 related views | 4 | Weather apps, news apps |
| **Bottom Sheet** | Contextual actions, filters | 3-6 | Maps (place details), Music (now playing) |

---

## 3.3 Bottom Navigation — The Gold Standard

When you have 3-5 primary destinations, bottom navigation is the best pattern:

```
│         APP CONTENT AREA             │
│  🏠 Home  │  🔍 Search │ 👤 Profile │  ← Bottom Navigation Bar
│  (active) │            │            │     56px height
└─────────────────────────────────────┘     3-5 items max
                                            Icons + labels below
```

### Bottom Nav Best Practices:

```css
.bottom-nav {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  height: 56px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  border-top: 1px solid #e0e0e0;
  /* Critical: account for iPhone home indicator */
  padding-bottom: env(safe-area-inset-bottom, 0);
  z-index: 100;
}

.bottom-nav-item {
  display: flex; flex-direction: column;
  align-items: center; gap: 2px;
  padding: 4px 0 6px;
  min-width: 64px; min-height: 48px;
  color: #666; font-size: .65rem;
  text-decoration: none; border: none; background: none; cursor: pointer;
}

.bottom-nav-item.active {
  color: #2563eb;
}

.bottom-nav-item .icon { font-size: 1.5rem; }

/* Badge for notifications */
.bottom-nav-item .badge {
  position: absolute; top: 0; right: calc(50% - 24px);
  background: #d32f2f; color: #fff;
  font-size: .65rem; padding: 1px 5px; border-radius: 10px;
  min-width: 16px; text-align: center;
}
```

```html
<!-- Bottom Navigation Example -->
<nav class="bottom-nav" aria-label="Main navigation">
  <a href="/home" class="bottom-nav-item active" aria-current="page">
    <span class="icon">🏠</span>
    <span>Home</span>
  </a>
  <a href="/search" class="bottom-nav-item">
    <span class="icon">🔍</span>
    <span>Search</span>
  </a>
  <a href="/messages" class="bottom-nav-item">
    <span class="icon">💬</span>
    <span>Messages</span>
    <span class="badge">3</span>
  </a>
  <a href="/profile" class="bottom-nav-item">
    <span class="icon">👤</span>
    <span>Profile</span>
  </a>
</nav>
```

### Rules for Bottom Navigation:

1. **3-5 items only** — 3 is ideal, 5 is the max
2. **Icons + labels** — icons alone aren't clear; labels alone aren't scannable. Use both.
3. **Highlight current** — active item must be visually distinct (color + weight)
4. **Persistent** — don't hide it on scroll (users rely on it for wayfinding)
5. **Don't scroll** — if you have 6+ items, use a hamburger or "More" tab
6. **Mind the home indicator** — add `safe-area-inset-bottom` padding

---

## 3.4 Tab Bar — For Content Filtering

Unlike bottom navigation (app-level destinations), **tab bars** filter content within a single section:

```
│  ──── Tab Bar (44px height) ────    │
│  [Following] [For You] [Trending]   │  ← Scrollable or fixed tabs
│         FILTERED CONTENT            │
```

```css
.tab-bar {
  display: flex;
  height: 44px;
  border-bottom: 1px solid #e0e0e0;
  overflow-x: auto; /* Scrollable tabs for 4+ items */
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.tab-bar::-webkit-scrollbar { display: none; }

.tab-item {
  padding: 0 16px;
  height: 44px; line-height: 44px;
  font-size: .9rem; font-weight: 500;
  color: #666; white-space: nowrap;
  border-bottom: 2px solid transparent;
  transition: color .2s, border-color .2s;
  text-decoration: none;
  flex-shrink: 0; /* Don't shrink tabs */
}

.tab-item.active {
  color: #2563eb;
  border-bottom-color: #2563eb;
}
```

---

## 3.5 Hamburger Menu — When You Must

When you genuinely have 6+ sections, the hamburger menu is the pragmatic choice. Make it as painless as possible:

```html
<!-- Hamburger Menu with Slide-in Drawer -->
<button class="hamburger" onclick="toggleMenu()" aria-label="Menu" aria-expanded="false">
  <span class="hamburger-line"></span>
  <span class="hamburger-line"></span>
  <span class="hamburger-line"></span>
</button>

<nav class="drawer" id="drawer" aria-hidden="true">
  <div class="drawer-header">
    <h2>Menu</h2>
    <button onclick="toggleMenu()" aria-label="Close menu">✕</button>
  </div>
  <ul class="drawer-nav">
    <li><a href="/">🏠 Home</a></li>
    <li><a href="/products">📦 Products</a></li>
    <li><a href="/blog">📝 Blog</a></li>
    <li><a href="/about">ℹ️ About</a></li>
    <li><a href="/contact">📧 Contact</a></li>
    <li class="divider"></li>
    <li><a href="/settings">⚙️ Settings</a></li>
    <li><a href="/help">❓ Help</a></li>
  </ul>
</nav>

<!-- Overlay: closes menu on tap -->
<div class="drawer-overlay" id="overlay" onclick="toggleMenu()" hidden></div>

<style>
.drawer {
  position: fixed; top: 0; left: 0;
  width: 300px; height: 100%;
  background: #fff; z-index: 200;
  transform: translateX(-100%);
  transition: transform .3s cubic-bezier(.4,0,.2,1);
  padding: 0;
  box-shadow: 2px 0 12px rgba(0,0,0,.15);
}
.drawer.open { transform: translateX(0); }
.drawer-header { display: flex; justify-content: space-between; align-items: center; padding: 16px; border-bottom: 1px solid #eee; }
.drawer-nav { list-style: none; padding: 8px 0; }
.drawer-nav li a { display: block; padding: 14px 16px; text-decoration: none; color: #333; font-size: 1rem; }
.drawer-nav li a:active { background: #f0f0f0; }
.drawer-nav .divider { height: 1px; background: #eee; margin: 8px 16px; }

.drawer-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,.3);
  z-index: 199; transition: opacity .3s;
}
.drawer-overlay[hidden] { opacity: 0; pointer-events: none; display: block !important; }
</style>
```

> Cross-reference: `design-patterns/03-navigation-patterns.md` for the complete navigation patterns catalog including desktop variants.

---

## 3.6 Navigation That Scales

```css
/* Mobile-first navigation that progressively enhances to desktop */
.nav-container {
  /* Mobile: bottom nav */
  position: fixed; bottom: 0; left: 0; right: 0;
  display: flex; justify-content: space-around;
}

@media (min-width: 768px) {
  .nav-container {
    /* Tablet: top nav bar */
    position: static;
    justify-content: flex-start; gap: 8px;
    padding: 0 16px;
  }
}

@media (min-width: 1024px) {
  .nav-container {
    /* Desktop: sidebar navigation */
    position: fixed; left: 0; top: 0;
    width: 240px; height: 100%;
    flex-direction: column; align-items: stretch;
    padding: 16px 0;
  }
  .main-content { margin-left: 240px; }
}
```

---

## Quick Summary

| Pattern | Items | Position | Best For |
|---------|-------|----------|----------|
| **Bottom Nav** | 3-5 | Bottom | Primary app destinations |
| **Tab Bar** | 2-4 | Top | Content filtering within a section |
| **Hamburger** | 6+ | Side drawer | Secondary actions, settings |
| **FAB** | 1 | Bottom-right | Single primary action |
| **Bottom Sheet** | 3-6 | Bottom overlay | Contextual actions |
| **Hamburger cost** | — | — | Reduces discovery by 21%, +1s per tap |
