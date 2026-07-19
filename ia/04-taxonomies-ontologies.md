# 📐 04 — Taxonomies & Ontologies

> 🟡 Intermediate | Prereq: 01 | ~7 min

Taxonomy = how you classify things. Ontology = how things relate. Get both right, and your IA scales. Get them wrong, and every new piece of content breaks the system.

---

## 4.1 Taxonomy Types

| Type | Structure | Example |
|------|-----------|---------|
| **Hierarchical** | Tree, parent-child | Animal > Mammal > Dog > Poodle |
| **Faceted** | Multiple independent dimensions | Color: Red, Size: Large, Brand: Nike |
| **Flat** | No hierarchy, equal weight | Tags, hashtags |
| **Network** | Many-to-many relationships | Knowledge graphs, wikis |

---

## 4.2 Hierarchical Taxonomy Rules

| Rule | Good | Bad |
|------|------|-----|
| **Mutually exclusive** | Item in 1 category only | Same item in 3 categories |
| **Collectively exhaustive** | Every item has a home | Orphan items |
| **Consistent granularity** | Similar depth per branch | Deep in one, shallow in another |
| **Polyhierarchy** (if needed) | Same item in 2+ legitimate places via cross-ref | Duplicate content |

---

## 4.3 Faceted Taxonomy Design

```
PRODUCT CATALOG
┌─────────────────────┐
│ Color   ☐ Red (12)  │
│         ☐ Blue (8)  │
│         ☐ Black (5) │
│ Size    ☐ S (10)    │
│         ☐ M (15)    │
│         ☐ L (7)     │
│ Brand   ☐ A (8)     │
│         ☐ B (12)    │
│ Price   ☐ < $50 (6) │
│         ☐ $50-100   │
└─────────────────────┘
```

**Rules**:
- 3-7 facets max
- Show result count per facet value
- Facets must be independent (no "Color: Red → Size: only S" dependency)
- Applied facets = removable tags at top

---

## 4.4 Controlled Vocabularies

| Tool | Purpose | Example |
|------|---------|---------|
| **Synonym ring** | Equivalent terms → same results | "laptop" = "notebook" = "portable computer" |
| **Authority file** | Preferred term + variants | Preferred: "United States" | Variants: "USA", "US", "America" |
| **Classification scheme** | Formal notation system | Dewey Decimal, UDC |
| **Thesaurus** | Terms + relationships (BT/NT/RT) | Broader Term, Narrower Term, Related Term |

---

## 4.5 Ontology — Beyond Taxonomy

```
TAXONOMY: "What category does X belong to?"
ONTOLOGY: "What is X and how does it relate to Y?"

Example:
Taxonomy: Laptop > Electronics > Computers
Ontology: Laptop [is_a] Computer, Laptop [has] Screen, Laptop [uses] Operating System,
          Operating System [is_a] Software, MacBook [instance_of] Laptop
```

---

## 4.6 Anti-Patterns

```
❌ "Misc" or "Other" categories — lazy catch-all
❌ Deep hierarchy (> 4 levels) — users lost
❌ Same label for different things — "Settings" could be 3 things
❌ No governance — taxonomy drifts, becomes inconsistent
```

---

## ⚡ Action Checklist

- [ ] Audit: do you have "Misc" or "Other" categories? Reclassify.
- [ ] Max depth of any hierarchy = 4. Flatten deeper branches.
- [ ] Create a synonym ring for top 10 search terms
- [ ] Every faceted filter shows result count
- [ ] Taxonomy governance: who owns changes? When is review?
