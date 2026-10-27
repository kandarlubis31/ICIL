# 🚫 07 — Authentic Voice Systems

> 🔴 Advanced | Prereq: 01, 02 | ~9 min

Removing slop produces *clean but anonymous* output. Authenticity is a positive property: opinions with trade-offs, named details, a consistent point of view, and the honesty to admit uncertainty. This course reuses slop-filter internals (banned lists, structure checks) as the base layer for building an org-level voice system.

---

## 7.1 What Makes Output Authentic

| Element | Test |
|---|---|
| Specificity | Is there a number, name, or date in the paragraph? |
| POV | Is there a claim a reasonable person could disagree with? |
| Trade-offs | Does the answer state what is lost, not only what is gained? |
| Honesty | Are the limits of knowledge explicitly stated, not hidden by hedges? |
| Consistency | Would two outputs on the same topic read as the same author? |

Slop fails the first two structurally: median-token generation cannot commit to a specific detail or an opinion. Forcing specificity is what produces the POV as a side effect.

## 7.2 The Voice System, Not One Rules File

A voice system is three layers chained together:

```
[ Layer 1: Banned list ]     Prohibition — a level playing field for the whole team
[ Layer 2: Positive style ]     10 concrete sentences from the org's best human writing
[ Layer 3: Decision rules ]     When slang is OK, when to hedge, when to break rules
```

Layer 2 needs real examples, not adjectives. Pick 10 sentences actually written by the team's own humans, pasted into the prompt as-is. "Write friendly and human" instructs nothing; an example sentence instructs everything. For the Indonesian market, layer 2 alternates with `penulisan-gaul/08` (tone calibration).

## 7.3 Calibration Discipline

1. **No vibe-words as instructions** — for every "write it edgy", supply an example sentence.
2. **Track drift** — every 2 weeks, compare N outputs against the voice sample; log for what reason the drift occurs (new feature, new model, new prompt writer).
3. **Consent of the human source** — the example sentences come from real people; quoting them as a style reference is a decision, not a default.
4. **Taste does not scale** — the system seeds the style; a human still signs the high-stakes output. De-slop filters reduce editor load, they do not remove the editor.

## 7.4 When Polish Hurts

Careful polishing can slide into dishonest polish: smooth wording that hides limits, a confident tone masking uncertainty, brand voice covering empty products. The check: **if removing the polish breaks the honesty, the polish is slop.** For the ethics boundary (deceptive fine print, fake scarcity), the final call is in `design-ethics/04`.

---

## ⚡ Action Checklist

- [ ] Gather 10 example sentences from the best human writers, paste them into the prompt
- [ ] Run the 3-layer system on one real writing flow for a week
- [ ] Schedule a biweekly voice-drift review
- [ ] Define the list of outputs that require human sign-off

## 🧭 ICIL Cross-Ref

- `ux-writing/06` — tone calibration for product surfaces
- `design-ethics/04` — the ethics boundary of polished dishonesty
- `branding/06` — brand voice consistency at the system level

> **Back to:** [01 — The Anatomy of AI Slop](./01-anatomy-of-ai-slop.md) — the starter map for this faculty.

**Sources:** Pinker, *The Sense of Style* (voice as choice consistency); Anthropic model card language on sycophancy; Merriam-Webster, Word of the Year 2025 ("slop").
