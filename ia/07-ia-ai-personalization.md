# 📐 07 — IA for AI & Personalization

> 🔴 Advanced | Prereq: 01, 04 | ~7 min

Traditional IA assumes humans browse menus. AI-driven IA adapts in real-time — semantic search, recommendations, and dynamic navigation based on intent.

---

## 7.1 Semantic Search vs Keyword Search

| | Keyword Search | Semantic Search |
|---|---------------|-----------------|
| **How** | Matches exact terms | Understands meaning |
| "laptop" | Finds "laptop" | Also finds "notebook", "MacBook" |
| "cheap phone" | "cheap" + "phone" | Budget smartphones under $300 |
| **Technology** | Inverted index, TF-IDF | Embeddings, vector similarity |
| **Query** | Must use exact terms | Natural language intent |

---

## 7.2 Embedding-Based IA

```ts
// Vectorize content for semantic search
const content = [
  { id: "ia-01", text: "Information Architecture fundamentals", embedding: [0.1, 0.3, ...] },
  { id: "dx-01", text: "Developer Experience strategy", embedding: [0.2, 0.1, ...] },
];

// Query: "How to organize content?"
const queryEmbedding = embed("How to organize content?");
// → Nearest: ia-01 (cosine similarity 0.92), dx-01 (0.45)
```

---

## 7.3 RAG & IA

| RAG Component | IA Role |
|---------------|---------|
| **Chunking** | Content type defines chunk boundaries |
| **Metadata** | Filters: date, category, author, status |
| **Retrieval** | Taxonomy → filter search space |
| **Re-ranking** | IA structure provides relevance signals |

> Good IA = better RAG. Bad IA = RAG retrieves the wrong chunks.

---

## 7.4 Adaptive Navigation

| Pattern | How It Works |
|---------|-------------|
| **Personalized menus** | Reorder based on user history |
| **Dynamic recommendations** | "People who read X also read Y" |
| **Intent-based routing** | Detect query intent → route to right section |
| **Progressive disclosure** | Show more detail as user demonstrates expertise |

---

## 7.5 Recommendation Systems Taxonomy

| Type | Mechanism | Example |
|------|-----------|---------|
| **Content-based** | Similar items by attributes | "More like this" (same author, tags) |
| **Collaborative** | Similar users' behavior | "Users who bought X also bought Y" |
| **Knowledge-based** | Rules + domain expertise | "If CPU-intensive, recommend Pro tier" |
| **Hybrid** | Combine all three | Netflix, Amazon |

---

## 7.6 AI-Ready IA Checklist

| Principle | Implementation |
|-----------|---------------|
| **Structured content** | Every piece has type + metadata + embedding |
| **Clean taxonomy** | No "misc" categories, consistent granularity |
| **Rich metadata** | Descriptive + admin + structural + technical |
| **Versioned** | Content changes tracked (when did this change?) |
| **API-accessible** | Content queryable via API, not just rendered HTML |

---

## ⚡ Action Checklist

- [ ] Every content type: generate embeddings for semantic search
- [ ] Build a vector similarity demo for your content (5 min POC)
- [ ] Test: "find {concept}" using keyword vs semantic — compare results
- [ ] Add structured data (JSON-LD) to all content types
- [ ] Is your content API-accessible? If not, make it so.
