# 🗃️ 05 — Context Retrieval & Routing

> 🔴 Advanced | Prereq: 02, 03 | ~10 min

Retrieval is a decision system: given a task, choose evidence that is relevant, sufficient, and safe to load. A good system combines explicit intent signals with broader recall mechanisms, then ranks and caps the result so relevance beats volume.

---

## 5.1 Retrieval Pipeline

```text
PROMPT
  ↓ normalize + classify intent
  ↓ apply negative constraints
  ↓ exact/high-signal matches
  ↓ semantic or full-text expansion
  ↓ rank by relevance, level, freshness, trust
  ↓ add prerequisites
  ↓ cap context + emit manifest
```

Deterministic routing is valuable when the catalog is curated and predictable. Semantic retrieval is valuable for paraphrases and vocabulary gaps. A hybrid system should let explicit high-confidence rules override fuzzy matches.

## 5.2 Ranking Signals

| Signal | Meaning | Typical weight |
|---|---|---|
| Exact phrase | Strong intent evidence | High |
| Course title match | Direct topical relevance | High |
| Topic match | Structured metadata evidence | Medium-high |
| Body match | Supporting evidence | Medium |
| Freshness | Prefer current material | Medium |
| Prerequisite | Required foundation | Constraint |
| Trust/provenance | Source confidence | Constraint or tie-breaker |

Do not pretend these weights are universal. Record them, test them, and inspect failure cases.

## 5.3 ICIL Routing Pattern

ICIL’s router uses word-boundary matching, HIGH → MEDIUM → LOW tiers, negative keywords, prerequisite resolution, sorting, deduplication, and a per-faculty course cap. For the new faculty, use specific HIGH phrases such as `knowledge base architecture` and `context injection`; keep broad terms such as `retrieval`, `memory`, and `documentation` at MEDIUM or LOW to avoid collisions.

A no-match result should be explicit. Never silently load the entire campus as a fallback; ask for a more specific task or offer a small discovery set.

## 5.4 Retrieval Failure Modes

- **False positive:** “context window” routes to knowledge governance when the user means runtime compaction.
- **False negative:** “make my agent remember policy docs” misses provenance and retrieval.
- **Over-retrieval:** every result is loaded because there is no cap.
- **Under-retrieval:** a course is selected without its prerequisite.
- **Ranking inversion:** a generic keyword beats a specific phrase.

Every routing change should add a positive, negative, and ambiguous test where appropriate.

## ⚡ Action Checklist

- [ ] Normalize and classify before searching
- [ ] Let explicit high-signal rules beat fuzzy expansion
- [ ] Rank with relevance, prerequisites, freshness, and provenance
- [ ] Cap results and emit a reproducible context manifest
- [ ] Test false positives, false negatives, and ambiguous prompts

> **Next:** [06 — Provenance, Freshness & Governance](./06-provenance-freshness-governance.md) — keep retrieved knowledge trustworthy over time.

**Sources:** Lewis et al. (2020); Robertson & Zaragoza, BM25 (2009); NIST AI RMF 1.0 (2023).
