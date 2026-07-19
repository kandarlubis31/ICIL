# 📐 03 — Search Systems

> 🟡 Intermediate | Prereq: 01 | ~7 min

Search = the fastest path to content when users know what they want. A great search system combines indexing, query understanding, and relevance ranking.

---

## 3.1 Search System Architecture

```
User Query → Query Parser → Index Lookup → Ranking → Results
                ↓               ↓                          ↓
         (tokenize, stem,   (inverted index,          (relevance
          spellcheck)        vector search)            scoring)
```

---

## 3.2 Indexing Strategies

| Strategy | How It Works | Best For |
|----------|-------------|----------|
| **Full-text** | Tokenize all words → inverted index | Documents, articles |
| **Faceted** | Pre-categorize by attributes | E-commerce, filters |
| **Vector/Embedding** | Semantic similarity search | AI-powered, "meaning" search |
| **Hybrid** | Full-text + vector combined | Modern apps (best of both) |

---

## 3.3 Query Understanding

| Technique | Example |
|-----------|---------|
| **Tokenization** | "best laptops 2026" → ["best", "laptops", "2026"] |
| **Stemming** | "running" → "run", "laptops" → "laptop" |
| **Stop words** | Remove "the", "a", "is" (language-dependent) |
| **Spellcheck** | "latpop" → did you mean "laptop"? |
| **Synonyms** | "notebook" = "laptop" (synonym ring) |
| **Query expansion** | "phone" → "smartphone" OR "mobile" |

---

## 3.4 Relevance Ranking

| Signal | Weight | Example |
|--------|--------|---------|
| **TF-IDF** | Term frequency × inverse document frequency | Rare keywords rank higher |
| **Field weight** | Title > H1 > body | "laptop" in title = more relevant |
| **Freshness** | Recent > old | News, blog posts |
| **Popularity** | Clicks, conversions | Most-purchased products |
| **Personalization** | User history + preferences | "Your style" recommendations |

---

## 3.5 Federated Search

Search across multiple sources, unified results:

```
Query: "database migration"
┌─────────────────────────────────────────────┐
│ 📄 Docs (3 results)                         │
│   Database Migration Guide                  │
│   Schema Versioning Tutorial                │
│ 📝 Blog (2 results)                         │
│   Zero-Downtime Migrations                  │
│ 💬 Community (1 result)                     │
│   "Best migration tool for Postgres?"        │
└─────────────────────────────────────────────┘
```

---

## 3.6 Search Analytics

| Metric | What to Track |
|--------|--------------|
| **Zero-result queries** | Top queries returning nothing → create content |
| **Low-CTR queries** | Queries with results but no clicks → poor ranking |
| **Search exit rate** | Users who search then leave → search failing |
| **Top queries** | Most searched terms → prioritize content |
| **Query refinement** | Users rephrasing → poor first-try relevance |

---

## ⚡ Action Checklist

- [ ] Log top 20 zero-result queries → create content or add synonyms
- [ ] Implement spellcheck ("did you mean?") on search
- [ ] Show result count in facets (prevents dead-end filters)
- [ ] Search box: visible on every page, ⌘K shortcut
- [ ] Track search analytics: zero results, low CTR, exit rate
