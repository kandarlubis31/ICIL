# 🧩 04 — Search Patterns

> 🟡 Intermediate | Prereq: — | ~3 min

Search = high-intent traffic. Good search = conversions. Bad search = bounce to competitors.

---

## 4.1 Search Bar Anatomy

| Element | Rule |
|---------|------|
| Position | Top-right or center header |
| Width | Min 200px, expand on focus |
| Icon | 🔍 Magnifying glass (universal) |
| Shortcut | `/` or `Ctrl+K` for power users |

---

## 4.2 Autocomplete Rules

```
Trigger after 3 characters → Group by type (products, categories) → Fuzzy matching (iphne → iphone)
```

---

## 4.3 Faceted Search

```
FILTERS: ☐ Red (5) ☐ Blue (8)   │   RESULTS (24 items)
Applied: [Red ×]                  │   [cards...]
```

| Rule | Why |
|------|-----|
| Show count per facet | Avoid "no results" dead ends |
| Applied as removable tags | Visual feedback |
| Real-time update | No "Apply" button needed |

---

## 4.4 No Results — Don't Dead-End

```
❌ "No results found."
✅ "Sorry, 'xyzzz' wasn't found. Try: check spelling, use broader terms, [See popular]"
```

---

## 4.5 Command Palette (⌘K)

Fuses navigation + action in one input. Popularized by Linear, Notion, VS Code.
```
> del
ACTIONS: ⌫ Delete selected items
NAVIGATION: ⚙️ Settings → Delete Account
```

---

## ⚡ Action Checklist
- [ ] Search bar: top-right or center, min 200px, ⌘K shortcut
- [ ] Autocomplete triggers at 3 chars with fuzzy matching
- [ ] Faceted search: show counts + removable tags + real-time update
- [ ] "No results" always includes suggestions — never a dead end
