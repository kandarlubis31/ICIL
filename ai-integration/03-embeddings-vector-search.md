# 🤖 03 — Embeddings & Vector Search

> 🟡 Intermediate | Prereq: 02 | ~9 min

Embeddings convert text/images into dense numerical vectors — enabling semantic search beyond keyword matching. The foundation of RAG, recommendation, and similarity systems.

---

## 3.1 What Embeddings Do

```
"dog"        → [0.23, -0.71, 0.45, ..., 0.12]  (1536-dim vector)
"puppy"      → [0.21, -0.69, 0.43, ..., 0.15]  ← close to "dog"
"cat"        → [0.19, -0.65, 0.41, ..., 0.10]  ← fairly close
"algorithm"  → [-0.53, 0.28, -0.81, ..., 0.42] ← far from "dog"

Similarity = cosine(embedding_a, embedding_b) → 1.0 = identical, 0 = unrelated
```

## 3.2 Embedding Models

| Model | Dims | Max Tokens | Best For |
|-------|------|-----------|----------|
| OpenAI text-embedding-3-small | 1536 | 8191 | General purpose, cheap |
| OpenAI text-embedding-3-large | 3072 | 8191 | High accuracy, more $ |
| Cohere embed-v3 | 1024 | 512 | Multi-language |
| BGE (open-source) | 1024 | 512 | Self-hosted, free |

## 3.3 Vector Search Implementation

```ts
import { PrismaClient } from '@prisma/client';
import { embed } from './embedder';

async function semanticSearch(query: string, limit = 5) {
  const queryVector = await embed(query);
  
  // pgvector cosine similarity search
  const results = await prisma.$queryRaw`
    SELECT 
      id, title, content,
      1 - (embedding <=> ${queryVector}::vector) AS similarity
    FROM documents
    WHERE 1 - (embedding <=> ${queryVector}::vector) > 0.7
    ORDER BY similarity DESC
    LIMIT ${limit}
  `;
  
  return results;
}
```

## 3.4 Vector DB Options

| DB | Type | Best For |
|----|------|----------|
| **pgvector** | Postgres extension | Existing PG users, < 10M vectors |
| **Pinecone** | Managed cloud | Scale, zero ops |
| **Weaviate** | Open-source | Hybrid search (vector + keyword) |
| **Qdrant** | Rust, self-hosted | Performance, filtering |

## 3.5 Anti-Patterns

- **Embedding without chunking** — entire book → one vector = useless retrieval
- **Cosine similarity only** — add keyword/BM25 hybrid search for accuracy
- **No re-indexing** — embeddings go stale when content changes

## 3.6 ICIL Cross-Ref

Use with: `ai-integration/02` (RAG), `database-management/05` (NoSQL)

## ⚡ Action Checklist
- [ ] Choose embedding model based on language + accuracy needs
- [ ] Use pgvector for < 10M vectors; Pinecone for scale
- [ ] Store metadata alongside vectors (source, date, chunk index)
- [ ] Add hybrid search (vector + full-text) for better recall
- [ ] Set similarity threshold (0.7+) to filter irrelevant results
