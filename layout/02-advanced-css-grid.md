# 📐 02 — Advanced CSS Grid

> 🟡 Intermediate | Prereq: 01 | ~4 min

Grid-template-areas, minmax(), auto-fill/auto-fit, subgrid.

---

## 2.1 Grid Template Areas — "Draw" Your Layout

```css
.container {
  display: grid;
  grid-template-areas:
    "header  header  header"
    "sidebar main    main"
    "sidebar footer  footer";
  grid-template-columns: 250px 1fr 1fr;
  height: 100vh;
}
header { grid-area: header; }  nav { grid-area: sidebar; }
main   { grid-area: main; }    footer { grid-area: footer; }
```

**Responsive with one property change:**
```css
@media (max-width: 480px) {
  grid-template-areas: "header" "nav" "main" "footer";
  /* Item positions don't change — just the template! */
}
```

---

## 2.2 minmax() — Column Clamping

```css
grid-template-columns: minmax(200px, 1fr) 2fr;       /* col1: 200–1fr */
grid-template-columns: minmax(150px, 300px) 1fr;     /* sidebar: 150–300 + fluid main */
```

---

## 2.3 auto-fill vs auto-fit

```css
/* auto-fill: create max columns (leaves empty tracks) */
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

/* auto-fit: create columns + STRETCH items to fill (no empties) */
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
```

| 900px container, minmax(250px, 1fr) | auto-fill | auto-fit |
|--------------------------------------|-----------|----------|
| Columns | 3 + 1 empty | 3 stretched |
| Width per item | 250px each | 300px each |

---

## 2.4 Subgrid — Align Children Across Cards

```css
.card-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
.card {
  display: grid;
  grid-template-rows: subgrid;  /* inherit rows from parent! */
  grid-row: span 3;
}
/* All card headings now automatically align — game changer! */
```

---

## ⚡ Action Checklist
- [ ] Use grid-template-areas for ALL page layouts (readable + responsive)
- [ ] Sidebar + content: `minmax(150px, 300px) 1fr`
- [ ] Card grids: `repeat(auto-fit, minmax(280px, 1fr))` — no media queries needed
- [ ] Card groups: use subgrid to align headings across uneven content
