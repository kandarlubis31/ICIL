# 🗃️ 08 — Knowledge Graphs & Relational Context

> 🔴 Advanced | Prereq: 03, 05 | ~10 min

Keywords find mentions; relationships explain structure. A knowledge graph represents entities, typed edges, and constraints so an agent can follow prerequisites, alternatives, ownership, and cross-faculty connections instead of relying only on text similarity.

---

## 8.1 Graph Model

```text
[Course 05] --requires--> [Course 03]
[Course 05] --implements--> [AI Integration 02]
[Course 09] --mitigates--> [Security 06]
[Course 06] --owned_by--> [ICIL Maintainers]
```

Useful edge types include `requires`, `extends`, `contrasts_with`, `implements`, `mitigates`, `supersedes`, and `owned_by`. Typed edges make recommendations explainable.

## 8.2 Relational Queries

| User need | Graph operation |
|---|---|
| “What should I learn first?” | Traverse prerequisites |
| “What overlaps with this?” | Find related/contrasting courses |
| “What changed?” | Follow supersession/version edges |
| “What supports this policy?” | Find evidence/provenance edges |
| “What is affected by this edit?” | Reverse dependency traversal |

A graph does not replace documents. It provides a compact map for selecting documents and explaining why they were selected.

## 8.3 Graph Quality

Validate that:

- prerequisite edges point to existing courses
- cycles are intentional or rejected
- IDs remain stable
- every high-risk policy has an owner
- cross-faculty links use canonical paths
- orphan nodes are reviewed

For small libraries, JSON metadata and validation may be enough. Adopt a graph database only when relationship queries justify the operational cost.

## 8.4 ICIL Application

ICIL already stores course prerequisites, topics, faculty membership, and cross-references in `index.json` and Markdown. The practical next step is not adding a database; it is treating those fields as a graph contract and exposing explainable paths through the existing CLI/MCP interfaces.

## ⚡ Action Checklist

- [ ] Define a small, typed relationship vocabulary
- [ ] Keep graph edges separate from document prose
- [ ] Validate prerequisites, cycles, orphan nodes, and canonical paths
- [ ] Use graph traversal to explain recommendations
- [ ] Avoid a graph database until the query needs justify it

> **Next:** [09 — Context Security & Prompt-Injection Resistance](./09-context-security-prompt-injection.md) — defend the knowledge layer from hostile or misleading content.

**Sources:** W3C RDF 1.1 Concepts (2014); W3C SKOS Reference (2009); Hogan et al., “Knowledge Graphs” (2021).
