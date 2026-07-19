# 📐 02 — Navigation Systems & Wayfinding

> 🟡 Intermediate | Prereq: 01 | ~7 min

Navigation = the visible tip of the IA iceberg. Users don't see your taxonomy — they see menus, breadcrumbs, and links. Make them intuitive.

---

## 2.1 Navigation System Types

| Type | Function | Example |
|------|----------|---------|
| **Global** | Site-wide, persistent | Top nav, sidebar |
| **Local** | Contextual to section | Sidebar submenu, in-page TOC |
| **Contextual** | Embedded in content | Related articles, "see also" links |
| **Supplemental** | Alternative paths | Sitemap, site index, guides |
| **Utility** | Tools, not content | Search, login, language picker |

---

## 2.2 Information Scent

> Users "sniff" their way through content. If scent weakens, they backtrack.

| Strong Scent | Weak Scent |
|-------------|------------|
| "Billing & Payments" | "Financial Operations Management" |
| "Change Password" | "Security Credential Modification" |
| Descriptive link text | "Click here" |
| Category + count: "Shirts (42)" | "Shirts" |

---

## 2.3 Wayfinding Patterns

| Pattern | How It Works | When |
|---------|-------------|------|
| **Breadcrumbs** | Show path: Home > Category > Sub > Item | Hierarchy ≥ 3 levels deep |
| **Progress indicator** | Step 2 of 5 | Multi-step flows |
| **You are here** marker | Visual indicator of current location | Sitemaps, floor plans |
| **Landmarks** | Distinct, memorable nodes | Large sites, returned users |

---

## 2.4 Sitemap Design

```
Home
├── Products
│   ├── Category A
│   │   ├── Product 1
│   │   └── Product 2
│   └── Category B
├── Solutions
│   ├── For Developers
│   └── For Enterprise
├── Docs
│   ├── Quickstart
│   ├── API Reference
│   └── Guides
└── Company
    ├── About
    └── Contact
```

**Rules**: 5-7 top-level items (within working memory limits, consistent with Cowan's 4±1 — see kognisi/01). Depth ≤ 4 levels. No orphan pages.

---

## 2.5 Navigation Anti-Patterns

```
❌ Mystery meat — icons with no labels (users must hover to discover)
❌ Deep hierarchy — 6+ levels (users forget path, get lost)
❌ Inconsistent — different nav per page (breaks mental model)
❌ Orphan pages — no incoming links (unfindable)
```

---

## ⚡ Action Checklist

- [ ] Map your current navigation: global/local/contextual/supplemental
- [ ] Test: can users find your top 3 pages from anywhere in the site?
- [ ] Breadcrumbs on all pages with hierarchy ≥ 3 levels
- [ ] Every nav label: would a new user understand it? (card sort test)
- [ ] No orphan pages — every page has at least 1 incoming link
