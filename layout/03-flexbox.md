# 📐 03 — Complete Flexbox

> 🟡 Intermediate | Prereq: 01 | ~3 min

Flexbox = **one-dimensional** layout (row OR column). Grid = macro (page). Flexbox = micro (components).

---

## 3.1 Container Properties

```css
.container {
  display: flex;
  flex-direction: row;           /* row | column */
  flex-wrap: nowrap;             /* nowrap | wrap */
  justify-content: flex-start;   /* main axis alignment */
  align-items: stretch;          /* cross axis alignment */
  gap: 16px;
}
```

| justify-content | align-items |
|----------------|-------------|
| flex-start (default) | stretch (default) |
| center | center |
| space-between | flex-start |
| space-around | flex-end |

---

## 3.2 Item Properties

```css
.item {
  flex: 1;                 /* grow shrink basis = 1 1 0% */
  flex-grow: 0;            /* can grow to fill space? */
  flex-shrink: 1;          /* can shrink? 1=yes */
  flex-basis: auto;        /* initial size */
  align-self: auto;        /* override parent align-items */
}
```

---

## 3.3 5 Essential Patterns

```css
/* 1. Perfect centering */
.parent { display: flex; justify-content: center; align-items: center; }

/* 2. Navbar: logo left, links right */
.navbar { display: flex; justify-content: space-between; align-items: center; }

/* 3. Media object: image + text */
.media { display: flex; gap: 16px; }  .media-image { flex-shrink: 0; }  .media-body { flex: 1; }

/* 4. Card with sticky footer */
.card { display: flex; flex-direction: column; }  .card-body { flex: 1; }

/* 5. Sidebar + content */
.layout { display: flex; }  .sidebar { flex: 0 0 260px; }  .main { flex: 1; min-width: 0; }
```

---

## ⚡ Action Checklist
- [ ] Use `justify-content: center; align-items: center` for single-item centering
- [ ] Navbars: `space-between` — never float-based hacks
- [ ] Cards with footers: `flex-direction: column` + `flex: 1` on body
- [ ] Sidebar layouts: `flex: 0 0 [width]` (prevents shrinking) + `flex: 1` on content
