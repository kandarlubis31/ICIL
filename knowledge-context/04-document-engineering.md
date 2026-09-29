# 🗃️ 04 — Document Engineering & Markdown Standards

> 🟡 Intermediate | Prereq: 01, 03 | ~10 min

Documents are an interface between authors, validators, and models. Document engineering makes that interface predictable: stable headings, compact sections, explicit examples, consistent links, and metadata that can be parsed without guessing.

---

## 4.1 Agent-Readable Document Shape

```markdown
# 🏷️ ID — Specific title

> Level | Prereq | Reading time

One-paragraph purpose and scope.

---

## 4.1 Concept
Dense explanation with a table or example.

## ⚡ Action Checklist
- [ ] Verifiable action

> **Next:** [05 — Context Retrieval & Routing](./05-context-retrieval-routing.md)
```

The opening should establish scope within a few lines. Headings should describe concepts, not vague stages such as “More thoughts”. Tables are useful for comparisons; code blocks are useful for executable patterns; prose is useful for caveats and reasoning.

## 4.2 Content Quality Rules

| Rule | Why it matters |
|---|---|
| Self-contained | A selected file remains useful in isolation |
| Compact | Less context waste and lower retrieval cost |
| Concrete | Examples reduce interpretation ambiguity |
| Version-aware | Readers can detect stale guidance |
| Source-backed | Claims can be checked |
| Cross-referenced | Related knowledge is discoverable without duplication |

Do not hide essential definitions only in a linked file. A cross-reference should deepen the topic, not make the current course incomplete.

## 4.3 Normalization Pipeline

For a growing corpus, normalize before indexing:

1. Parse headings, links, code blocks, and metadata.
2. Normalize whitespace without changing code semantics.
3. Extract a short summary and topic labels.
4. Verify internal links and referenced IDs.
5. Preserve the original file and record the transformation.
6. Re-index only after validation passes.

Never silently rewrite author content during indexing. Transformations should be deterministic and reversible.

## 4.4 Chunking Boundaries

Chunk by meaning, not arbitrary character count. Keep a heading with its definition, table, caveat, and example when they form one decision unit. For a course, section-level chunks are often a better first boundary than fixed-size slices. Add overlap only when a concept genuinely crosses sections.

## ⚡ Action Checklist

- [ ] Keep each document self-contained and scoped
- [ ] Use stable headings, tables, examples, and action checklists
- [ ] Normalize documents deterministically and reversibly
- [ ] Chunk by semantic units before tuning token size
- [ ] Validate links and metadata before indexing

> **Next:** [05 — Context Retrieval & Routing](./05-context-retrieval-routing.md) — select the smallest useful context for a task.

**Sources:** Diátaxis documentation framework; CommonMark specification; W3C Web Content Accessibility Guidelines for readable structure.
