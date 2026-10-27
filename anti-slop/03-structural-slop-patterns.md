# 🚫 03 — Structural Slop Patterns

> 🟡 Intermediate | Prereq: 01 | ~9 min

Slop survives a full vocabulary scrub: delete every buzzword and the paragraph still *breathes* slop because its skeleton is formulaic. This course covers the recurring shapes: the triad, the pivot formula, hedging stacks, and the opening/closing rituals.

---

## 3.1 The Triad Violation

LLMs default to three-part constructions even when the topic has two or five parts:

| Slop | Count | Fix |
|---|---|---|
| "It reduces cost, improves UX, and builds trust." | 3 | State only the parts you can prove |
| "faster, cheaper, better" | 3 | Pick the one that matters for this decision |
| "Every team, every workflow, every vertical" | 3 | Name the actual segment |

The rule is not "never three items" — three is allowed when it is *true and complete*. The violation is a triad assembled for rhythm, with the third item pasted in to sound complete.

## 3.2 The Pivot Formula

"It is not about X — it is about Y." The structure is rhetorically strong, which is why the model reaches for it constantly. Acceptable once per document at most; acceptable never in short answers.

| Slop pattern | Frequency | Allowed? |
|---|---|---|
| "Great question!" openers | every turn | ❌ never |
| "Let's dive in." / "Let's get started." | every document | ❌ never |
| "It's not about X, it's about Y" | 1 per short doc | ⚠️ with purpose |
| "In conclusion..." | 1 per long doc | ⚠️ or just stop writing |

## 3.3 Hedging Stacks

Slop hedges until the sentence means nothing: "It may potentially be possible that..." One hedge per claim; place it at the decision point, not decorating every verb.

## 3.4 Symmetry Obsession

Parallel bullet lists where every bullet has the same shape — even when the content does not. Force the structure to follow the material:

1. Write the bullets as bare sentences first.
2. Break symmetry where the facts are asymmetric.
3. If only one bullet has a number, that asymmetry is *information*.

## 3.5 List Rhythm and Sentence Length

The slop tell is uniformity: every sentence 18-24 words, every paragraph 3 sentences. Human writing has variance. A quick lint: if the standard-deviation of sentence lengths is below ~5 words, the text was machine-structured, and the fix is rewriting for meaning, not for rhythm.

---

## ⚡ Action Checklist

- [ ] Scan the last AI output for triads; delete the decorative third item
- [ ] Remove all opener/closer rituals and re-read
- [ ] Cut hedges to one per claim
- [ ] Check sentence-length variance across the document

## 🧭 ICIL Cross-Ref

- `ux-writing/01` — writing for scanning, where symmetry oversimplification also bites
- `improvement/03` — heuristics that catch structural sameness
- `design-systems/05` — the same uniformity failure in component styling

> **Next:** [04 — Code Slop & Comment Hygiene](./04-code-slop-comment-hygiene.md) — the same disease in source files.

**Sources:** Anthropic skills marketplace community write-ups (anti-ui-slop) on structural defaults; Migdat, *Anti-Slop Rules*; Pinker, *The Sense of Style* (legible prose discipline).
