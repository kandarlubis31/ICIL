# 🚫 06 — De-Slop Workflow & Trap Prompts

> 🔴 Advanced | Prereq: 01, 02 | ~10 min

Catalogs are not enough; slop returns on the next generation cycle. This course packages the catalogs into **a repeatable editing pass and a measurement loop** — the "5-pass edit" plus trap prompts that test the filter's behavior before you trust it.

---

## 6.1 The Skill Document Structure

When packaging anti-slop as a system rule or agent skill, four sections beat prose explanations:

1. **Role & Philosophy** — "You are a ruthless, minimalist human editor" (one paragraph).
2. **Negative Constraints** — banned words and patterns as a list (from 02, 03, 04, 05).
3. **Positive Guidance** — direct lead sentences, active short sentences, facts over claims.
4. **Before vs After** — 2-3 concrete rewrite pairs (models imitate examples better than rules).

Reference implementations follow exactly this shape: *no-ai-slop* (text filter + deleted-word tracking), *anti-ui-slop* (design-system constraint injection), *Anti-Slop Rules* (3-in-1 local filter).

## 6.2 The 5-Pass Edit

| Pass | Question | Tool |
|---|---|---|
| 1. Delete pass | Which sentences would break nothing if deleted? | Read aloud, mute paragraphs |
| 2. Lexicon pass | Which banned words still appear? | Banned-list grep |
| 3. Structure pass | Triads, pivots, ritual closers? | 03 catalog |
| 4. Voice pass | Does it sound like the org's human authors? | Voice sample side-by-side |
| 5. Verify pass | Is every claim a fact? | Fact/statistic check |

Time budget: passes 1-2 for short outputs; all five for anything public-facing. Do not run passes in a single read — each pass gets its own clean sweep or the eyes start skipping.

## 6.3 Trap Prompts (Proactive Evaluation)

Test the filter with prompts deliberately engineered to trigger slop, then measure:

| Trap prompt | Slope triggering |
|---|---|
| "Write an article about the future of technology" | Grandiose + conclusion ritual |
| "Explain our product benefits" | Triple + puffery |
| "Write the documentation for this function" | Narrating comments |
| "Create a landing page for a startup" | Purple template + dead CTA |

Scoring: count banned-word hits per 100 words, count triads, check the presence of a provable claim. Run the same prompt **with the skill and without it** — a real filter drops the score to ~zero on the trap prompts *without* making the output stiffer or blander. The regression signal to watch: "fixed but stiffer" means negative constraints were added without positive guidance.

## 6.4 Automation

1. Grep output against the banned list in CI (`grep -c` per word is enough).
2. Log deleted words per edit (as *no-ai-slop* does) to see the drift.
3. Zero-tolerance threshold: >2 hits per 100 words = regenerate, not edit.

---

## ⚡ Action Checklist

- [ ] Write the 4-section skill document using this template
- [ ] Run the 4 trap prompts before and after the skill
- [ ] Add a banned-word grep step in CI
- [ ] Review the banned list monthly; retire words the model has dropped

## 🧭 ICIL Cross-Ref

- `agentic-engineering/02` — programmatic output correction before merging
- `knowledge-context/07` — evaluating context quality with label-based tests
- `improvement/07` — the campus improvement protocol this faculty follows

> **Next:** [07 — Authentic Voice Systems](./07-authentic-voice-systems.md) — where the output goes beyond "not slop" to having character.

**Sources:** Peter Giyang, *no-ai-slop* (before/after method); anti-ui-slop (UIZZE); Migdat, *Anti-Slop Rules*; Anthropic, *Building effective agents* (test-driven polish).
