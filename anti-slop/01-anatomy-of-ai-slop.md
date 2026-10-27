# 🚫 01 — The Anatomy of AI Slop

> 🟢 Beginner | Prereq: — | ~9 min

**Slop** is mass-produced, low-quality, uncured digital content that looks plausible at first glance and collapses under inspection. Merriam-Webster crowned "slop" Word of the Year 2025 precisely because AI generation made this waste class prevalent. This course gives agents a working definition, a taxonomy across text, code, and UI, and the economic reason slop exists.

---

## 1.1 Why Models Produce Slop

| Cause | Mechanism | Result |
|---|---|---|
| Next-token median | The model predicts the most probable continuation | Clichés win: "delve", "tapestry", "Sign up today" |
| RLHF agreeableness | Praise-trained policies prefer friendly verbosity | Filler, hedging, sycophantic openers |
| No curation loop | Draft #1 ships because shipping is cheap | Uncited claims, generic structure, dead UI |
| Prompt volume | One user sends 50 prompts; nobody reads all 50 | Nobody notices decay until quality collapses |

Slop is not "a bad answer". It is **output scaled faster than human judgment can curate it**. A human-written bad article is just bad; an AI-written bad article becomes slop when it is published in bulk regardless.

## 1.2 The Three Slop Domains

| Domain | Symptom | Cost when shipped |
|---|---|---|
| Text | Clichés, triads, hedging walls, conclusion ritual | Reader wastes time; brand voice dies |
| Code | Narrating comments, dead abstractions, emoji headers | Reviewer wastes effort; maintenance debt |
| UI | Purple-gradient SaaS template, cards that do nothing | Users bounce; trust erodes |

## 1.3 Slop vs Legitimate Generic

Not every platitude is slop. Judge by **specificity and accountability**:

| Test | Slop passes? |
|---|---|
| Does it name a concrete detail (number, file, user, date)? | No — slop stays abstract |
| Would a human editor be embarrassed to sign it? | No — slop is anonymous |
| If deleted, does anything break? | No — slop is ornamental |
| Is there a claim that can be checked? | Yes — slop avoids checkable claims |

## 1.4 Detection Heuristic for Agents

1. **Density check** — count curse-words ("delve", "tapestry", "pivotal") per 100 words.
2. **Structure check** — three-part lists, formulaic headings, conclusion ritual.
3. **Specificity check** — abstract nouns with no examples or numbers.
4. **Coder check** — comments that narrate the code they annotate.
5. **UI check** — components the interaction cannot justify.

Agents should run the density check *before* shipping, not after the user gets annoyed.

---

## ⚡ Action Checklist

- [ ] Define which slop domain this team ships most often (text/code/UI)
- [ ] Run the specificity test on your last 3 AI outputs
- [ ] Count curse-words per 100 words on one pasted AI article
- [ ] Decide the curation budget: who reads, edits, and signs outputs

## 🧭 ICIL Cross-Ref

- `ux-writing/01` — voice-of-customer foundations that make copy specific
- `improvement/02` — audit techniques that spot cheap output patterns
- `knowledge-context/08` — routing quality and evaluation of context

> **Next:** [02 — The Banned Lexicon](./02-banned-lexicon.md) — the exact words to never write.

**Sources:** Merriam-Webster, Word of the Year 2025 ("slop"); Peter Giyang, *no-ai-slop* skill (copywriting filter approach); Strunk & White, *The Elements of Style* (vagueness as a style failure).
