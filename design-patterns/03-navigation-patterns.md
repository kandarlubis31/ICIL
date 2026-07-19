# 🧩 03 — Navigation Patterns

> 🟡 Intermediate | Prereq: — | ~3 min

Navigation = app GPS. Users lost → bounce. Users know position → confidence + retention.

---

## 3.1 Pattern Decision Matrix

| Pattern | Best For | ❌ Avoid When |
|---------|----------|--------------|
| **Top Nav** | 3-7 items, simple sites | > 7 items (crowded), deep hierarchy |
| **Sidebar** | Dashboards, CMS, 10+ menus | Marketing sites (wastes space) |
| **Hamburger** | Mobile ONLY | Desktop (lower discoverability) |
| **Bottom Nav** | Mobile apps, 3-5 top items | > 5 items |
| **Breadcrumbs** | Deep hierarchy (e-commerce, docs) | Flat structure, linear flows |
| **Tabs** | Switch views in same context, 2-6 tabs | > 6 tabs (use dropdown) |

---

## 3.2 Site-Type Quick Pick

| Site/App Type | Navigation |
|---------------|-----------|
| Marketing site | Top nav + hamburger (mobile) |
| Dashboard | Sidebar (persistent) |
| E-commerce | Top nav + mega menu + breadcrumbs |
| Mobile app | Bottom nav (3-5 items) |
| Documentation | Sidebar + breadcrumbs |

---

## 3.3 Bottom Nav Rules (Mobile)
- 3-5 items max
- Thumb-friendly zone
- Active state: filled icon + color
- Labels: 1-2 words

---

## ⚡ Action Checklist
- [ ] Desktop: top nav for simple, sidebar for complex (10+ items)
- [ ] Mobile: bottom nav (thumb zone) — never hamburger-only
- [ ] Breadcrumbs for any hierarchy ≥ 3 levels deep
- [ ] Active nav state clearly distinguishable from inactive
- [ ] NEVER hamburger menu on desktop
