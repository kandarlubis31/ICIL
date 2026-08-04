# 🗃️ 03 — Knowledge Modeling & Taxonomy

> 🟡 Intermediate | Prereq: 01 | ~10 min

A catalog is a model of a knowledge space. Good modeling lets an agent answer “what belongs here?”, “what should I load first?”, and “what is related but distinct?”. Without it, routing keywords become a pile of guesses and every new faculty increases ambiguity.

---

## 3.1 Taxonomy, Ontology, Metadata

| Concept | Meaning | ICIL example |
|---|---|---|
| Taxonomy | Hierarchical classification | Engineering → AI → Agent systems |
| Facet | Independent filter | Level, language, prerequisite |
| Ontology | Entities and relationships | Course **requires** prerequisite |
| Metadata | Descriptive fields | Topic, file, version, owner |
| Controlled vocabulary | Approved terms | `context injection`, not five aliases |

Use taxonomy for navigation, facets for selection, ontology for relationships, and metadata for machine-readable context.

## 3.2 Course Metadata Contract

A practical course record should answer:

```json
{
  "id": "05",
  "title": "Context Retrieval & Routing",
  "level": "advanced",
  "file": "knowledge-context/05-context-retrieval-routing.md",
  "prerequisites": ["02", "03"],
  "topics": ["context routing", "retrieval", "ranking"]
}
```

Keep identifiers stable. Titles can improve; IDs and paths should change only with an explicit migration. Metadata must not claim a course exists unless the file is present.

## 3.3 Boundary Design

A new faculty earns its own boundary when it has a distinct question, vocabulary, learning path, and routing behavior. This faculty covers the context layer; it should not absorb every mention of “AI”, “search”, or “documentation”. Use negative keywords and specific phrases to avoid collisions with:

- `ia/` for human-facing information architecture
- `ai-integration/` for implementation of RAG and embeddings
- `agentic-engineering/` for runtime context compaction and agent operations
- `kognisi/` for human memory and cognitive processing

## 3.4 Cross-References as Graph Edges

A reference is more useful when it states the relationship:

```text
knowledge-context/05 --implements--> ai-integration/02
knowledge-context/03 --extends--> ia/04
knowledge-context/09 --constrains--> security/06
```

Avoid vague “see also” lists. Explain whether the linked course is a prerequisite, implementation deep dive, contrast, or safety control.

## ⚡ Action Checklist

- [ ] Define a controlled vocabulary before adding many trigger keywords
- [ ] Keep IDs, paths, levels, prerequisites, and topics consistent
- [ ] Write explicit boundaries against adjacent faculties
- [ ] Treat cross-references as typed relationships
- [ ] Validate every metadata record against a real file

> **Next:** [04 — Document Engineering & Markdown Standards](./04-document-engineering.md) — make source files consistent and agent-readable.

**Sources:** W3C SKOS Reference (2009); Noy & McGuinness, “Ontology Development 101” (2001); Dublin Core Metadata Initiative terms.
