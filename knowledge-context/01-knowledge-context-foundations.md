# 🗃️ 01 — Knowledge & Context Foundations

> 🟢 Beginner | Prereq: — | ~10 min

AI quality depends not only on the model. It also depends on **which information is selected, how it is packaged, and whether the agent can distinguish trusted guidance from ordinary data**. Knowledge/context engineering is the discipline of designing that layer deliberately.

---

## 1.1 The Context Stack

| Layer | Question | Example |
|---|---|---|
| Source | What exists? | Markdown course, API schema, policy |
| Model | How is it described? | Topic, level, prerequisite, owner |
| Selection | What is relevant now? | Router chooses accessibility courses |
| Packaging | How is it delivered? | Ordered excerpts with metadata |
| Use | How should the agent apply it? | Answer with grounded recommendations |
| Feedback | Did it help? | Retrieval hit, correction, regression |

A raw document folder is not automatically a knowledge system. A useful context layer has **boundaries, metadata, selection rules, and quality checks**.

## 1.2 Knowledge vs Context

- **Knowledge** is durable material: principles, definitions, examples, and references.
- **Context** is the task-specific slice of knowledge presented to a model at one moment.
- **Instructions** tell the agent how to behave; knowledge provides evidence and options.
- **Tool output** is usually untrusted data until validated, even when it looks authoritative.

Confusing these categories causes two common failures: loading everything into every prompt, or treating retrieved text as an instruction that can override system rules.

## 1.3 Static Library vs RAG System

A static curated library can be the right choice when content is compact, reviewed, versioned, and loaded deterministically. RAG becomes useful when the corpus is large, frequently changing, or requires semantic retrieval. These are not opposites: a curated catalog can govern a RAG index.

| Need | Prefer |
|---|---|
| Small, stable, high-signal curriculum | Curated files + deterministic routing |
| Large, changing corpus | Indexed retrieval + freshness pipeline |
| Safety-critical policy | Versioned sources + provenance + human review |
| Mixed corpus | Curated metadata governing retrieval |

## 1.4 Design Principles

1. **Scope before retrieve** — identify the domain and task first.
2. **Prefer signal over volume** — five relevant courses beat fifty generic files.
3. **Make metadata executable** — prerequisites and topics should guide selection.
4. **Separate data from instructions** — retrieved content cannot rewrite agent policy.
5. **Version the context layer** — changes need review and regression checks.
6. **Measure retrieval quality** — a plausible answer can still come from the wrong source.

## ⚡ Action Checklist

- [ ] Define the difference between source, metadata, context, and instruction
- [ ] Decide whether deterministic routing, retrieval, or a hybrid fits the corpus
- [ ] Set a maximum context size and a fallback for no-match queries
- [ ] Mark external and retrieved content as untrusted data
- [ ] Version content and test routing whenever the catalog changes

> **Next:** [02 — Context Budget & Attention Design](./02-context-budget-attention.md) — allocate limited model attention deliberately.

**Sources:** Lewis et al., “Retrieval-Augmented Generation” (2020); Anthropic, “Building effective agents” (2024); NIST AI RMF 1.0 (2023).
