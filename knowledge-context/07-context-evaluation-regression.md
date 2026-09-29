# 🗃️ 07 — Context Evaluation & Regression Testing

> 🔴 Advanced | Prereq: 04, 05 | ~10 min

A context change can improve one query while degrading ten others. Evaluation turns routing and retrieval from intuition into an observable contract. Test both **what was selected** and **whether the selected context supports a good answer**.

---

## 7.1 Retrieval Metrics

| Metric | Question |
|---|---|
| Precision@k | How many returned faculties/courses are relevant? |
| Recall@k | Did we retrieve the expected relevant items? |
| MRR | How early does the first relevant result appear? |
| No-match rate | How often does routing fail to identify a domain? |
| Context load | How much content was loaded per task? |
| Freshness coverage | How much selected content is current? |

No single metric is sufficient. High recall with terrible precision creates context bloat; high precision with poor recall hides useful evidence.

## 7.2 Test Set Design

Include:

- direct prompts using canonical terms
- paraphrases and Indonesian equivalents where supported
- cross-faculty prompts
- negative prompts that should not trigger the faculty
- ambiguous prompts requiring a reasonable ranking
- no-match prompts
- regression cases from previous releases

An eval case should declare expected faculties, optionally expected courses, category, difficulty, and why the label is correct.

## 7.3 Regression Gate

```text
content/catalog change
  → schema + link validation
  → router eval
  → compare baseline metrics
  → inspect changed failures
  → approve only if regressions are explained
```

A threshold is a guardrail, not a substitute for inspection. A score can pass while a high-risk security query routes incorrectly.

## 7.4 Context-Level Evaluation

Measure whether selected content is:

1. **Relevant** to the user task.
2. **Sufficient** to act without obvious missing prerequisites.
3. **Non-duplicative** and within budget.
4. **Traceable** to a source and version.
5. **Safe** against untrusted instructions.

For answer-level evaluation, check faithfulness to the loaded sources rather than rewarding confident prose alone.

## ⚡ Action Checklist

- [ ] Maintain positive, negative, ambiguous, and no-match eval cases
- [ ] Track precision, recall, rank, no-match, load size, and freshness
- [ ] Compare every catalog release to a baseline
- [ ] Inspect changed failures, especially security and policy cases
- [ ] Evaluate context selection separately from final answer quality

> **Next:** [08 — Knowledge Graphs & Relational Context](./08-knowledge-graphs-relational-context.md) — represent relationships that keyword lists cannot express.

**Sources:** Manning et al., *Introduction to Information Retrieval* (2008); Lewis et al. (2020); RAGAS evaluation framework.
