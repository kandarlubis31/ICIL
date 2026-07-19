# 🤖 02 — RAG Architecture

> 🟡 Intermediate | Prereq: 01 | ~9 min

RAG (Retrieval-Augmented Generation) — introduced by Lewis et al. (Meta AI, 2020) — grounds LLM responses in external knowledge, eliminating hallucinations on domain-specific facts. The core pattern behind most production AI applications.

---

## 2.1 RAG Pipeline

```
┌─────────┐    ┌──────────┐    ┌─────────┐    ┌─────────┐    ┌──────────┐
│  USER   │───▶│  QUERY   │───▶│ RETRIEVE│───▶│ AUGMENT │───▶│ GENERATE │
│ QUERY   │    │ EMBEDDING│    │ CHUNKS  │    │ PROMPT  │    │ RESPONSE │
└─────────┘    └──────────┘    └─────────┘    └─────────┘    └──────────┘
                                    │                             │
                              ┌─────┴─────┐                 ┌────┴────┐
                              │ VECTOR DB │                 │   LLM   │
                              │(pgvector, │                 │(GPT-4,  │
                              │ Pinecone) │                 │ Claude) │
                              └───────────┘                 └─────────┘
```

## 2.2 Chunking Strategy

| Strategy | Best For | Size |
|----------|----------|------|
| **Fixed-size** | General docs, simple | 256-512 tokens |
| **Semantic** | Complex docs, mixed topics | Variable (by paragraph) |
| **Recursive** | Code, structured docs | Split by headers then paragraphs |
| **Sliding window** | Dense context needed | Overlap 10-20% |

## 2.3 RAG Implementation

```ts
async function ragQuery(userQuery: string, vectorStore: VectorStore, llm: LLM) {
  // 1. EMBED the query
  const queryEmbedding = await embed(userQuery);
  
  // 2. RETRIEVE top-k relevant chunks
  const chunks = await vectorStore.similaritySearch(queryEmbedding, { k: 5 });
  
  // 3. RE-RANK (optional but recommended)
  const reranked = await reranker.rerank(userQuery, chunks, { topN: 3 });
  
  // 4. AUGMENT prompt with retrieved context
  const context = reranked.map(c => c.content).join('\n\n');
  const prompt = `Answer using ONLY the context below. If unsure, say "I don't know."
  
Context:
${context}

Question: ${userQuery}`;

  // 5. GENERATE
  return await llm.complete(prompt);
}
```

## 2.4 RAG Anti-Patterns

- **Chunks too small** — lose context; chunks too large → dilute relevance
- **No re-ranking** — top-k vector search ≠ best-k for answer quality
- **Stale embeddings** — re-index when source docs change
- **Ignoring metadata** — store source, date, section for citation

## 2.5 ICIL Cross-Ref

Use with: `service-design/04` (ecosystem maps), `strategic-design/05` (systems thinking)

## ⚡ Action Checklist

- [ ] Chunk documents at semantic boundaries (paragraphs, sections)
- [ ] Store metadata per chunk: source URL, date, section title
- [ ] Always re-rank retrieved chunks before augmenting prompt
- [ ] Include citation markers in RAG responses
- [ ] Set confidence threshold — fallback to "I don't know" instead of hallucinating
