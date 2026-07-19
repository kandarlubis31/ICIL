# 🧩 05 — Data Display Patterns

> 🟡 Intermediate | Prereq: — | ~3 min

How to display data so users can find, understand, and act quickly.

---

## 5.1 Four Patterns

| Pattern | Density | Best For | ❌ Avoid |
|---------|---------|----------|---------|
| **Table** | High | Comparison, analysis, many attributes | Visual browsing |
| **List** | Medium | Sequential, text-heavy, vertical scan | Rich media |
| **Card** | Low | Visual content, diverse formats | Data comparison |
| **Grid** | Low | Visual browsing, gallery | Text-heavy |

---

## 5.2 Table Rules

| Rule | Detail |
|------|--------|
| Sticky header | Mandatory for data > 1 viewport |
| Left-align text, right-align numbers | For scanning + comparison |
| Sortable columns | Click header → ASC/DESC |
| Density toggle | Compact / Normal / Relaxed |

### Pagination vs Infinite Scroll

| | Pagination | Infinite Scroll |
|---|-----------|----------------|
| Best for | Reporting, precise nav | Exploration, discovery |
| User control | High | Low |
| Accessibility | ✅ Better | ⚠️ Challenging |

---

## 5.3 Quick Decision

```
COMPARISON needed → TABLE    | VISUAL browsing → GRID / CARDS
SIMPLE sequential → LIST     | MANY attributes → TABLE
RICH mixed content → CARDS   |
```

---

## ⚡ Action Checklist
- [ ] Tables: sticky header, sortable columns, density toggle
- [ ] Left-align text, right-align numbers in all tables
- [ ] Pagination for reporting, infinite scroll for discovery
- [ ] Card layouts: only for visual/rich content — never for data comparison
