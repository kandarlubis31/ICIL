# 🗃️ 02 — Context Budget & Attention Design

> 🟡 Intermediate | Prereq: 01 | ~10 min

A context window is a capacity limit, not a promise that every included token will receive equal attention. As irrelevant, repetitive, or stale material accumulates, the agent has to search harder for the useful signal. Design context like a budget: allocate space to the information that changes the decision.

---

## 2.1 Budget Model

Use a rough allocation before loading content:

```text
TOTAL WINDOW
├── system / safety policy       fixed
├── task and acceptance criteria  fixed
├── conversation state            variable
├── retrieved knowledge            variable
├── tool results                  variable
└── output reserve                fixed
```

Never spend the entire window on retrieved material. Reserve space for reasoning, tool results, and the final response. The exact percentages depend on the model and task; the important practice is explicit budgeting.

## 2.2 Signal-to-Noise Heuristics

| Problem | Symptom | Intervention |
|---|---|---|
| Redundancy | Same rule appears in many files | Deduplicate or link to one authority |
| Staleness | Old guidance conflicts with current metadata | Add version/freshness checks |
| Overbreadth | Many faculties load for a narrow task | Raise specificity of keywords |
| Fragmentation | A definition is separated from its caveat | Package a complete unit |
| Premature detail | Advanced material crowds out foundations | Load prerequisites first, cap depth |

A useful context item should answer at least one of: **what decision it supports, what constraint it introduces, or what action it enables**.

## 2.3 Compaction Without Losing State

Compaction is not simply truncation. Preserve a structured state:

```json
{
  "goal": "What the user wants",
  "constraints": ["must be accessible", "no API key"],
  "decisions": ["use deterministic routing"],
  "open_questions": ["target framework"],
  "artifacts": ["knowledge-context/README.md"],
  "next_action": "Run router and CI"
}
```

Discard conversational filler, repeated explanations, and superseded options. Keep decisions, evidence, unresolved risks, and file paths.

## 2.4 Just-in-Time Context

Load broad metadata early, then load full content only after the task is scoped. For ICIL this means:

1. Read `AGENTS.md` and the catalog.
2. Route the prompt using `load-context.js`.
3. Load the selected files, not the entire campus.
4. Pull prerequisites only when the selected course needs them.
5. Keep the final context manifest for reproducibility.

## ⚡ Action Checklist

- [ ] Reserve output and policy space before selecting documents
- [ ] Define a maximum courses-per-task budget
- [ ] Compact into goals, constraints, decisions, risks, and next action
- [ ] Prefer just-in-time loading over dumping the entire corpus
- [ ] Record a reproducible context manifest for important tasks

> **Next:** [03 — Knowledge Modeling & Taxonomy](./03-knowledge-modeling-taxonomy.md) — model what the corpus contains and how concepts relate.

**Sources:** Anthropic, “Effective context engineering for AI agents” (2025); Liu et al., “Lost in the Middle” (2024); Packer et al., “MemGPT” (2023).
