# 🚫 02 — The Banned Lexicon

> 🟡 Intermediate | Prereq: 01 | ~9 min

Slop is built from a small, boring vocabulary. Stopping it means giving the model a **hard negative list** — words, phrases, and constructions that must not appear anywhere in the output. Models respond to "never write X" instruction patterns far better when X is concrete and the replacement is named (see 06 for prompt structure).

---

## 2.1 The Core Cursed Words (English)

| Category | Banned | Why it is slop |
|---|---|---|
| Grandiosity | `tapestry`, `testament`, `beacon`, `crucible` | Drama where facts should be |
| Puffery | `pivotal`, `game-changer`, `seamless`, `unleash`, `empower` | Claim without evidence |
| Fake scholarship | `delve`, `landscape` (as metaphor), `myriad` | Dictionary-flexing, zero content |
| Filler verbs | `elevate`, `streamline`, `leverage`, `unlock` | Space-filling abstractions |
| AI positioning | `in today's fast-paced world`, `as an AI` | Templated opening |
| Conclusion ritual | `In conclusion`, `Challenges and future outlook` | Sign-off furniture |

## 2.2 The Indonesian Layer

| Banned (ID) | Replace with (ID) |
|---|---|
| `menyelami`, `menjelajahi dunia` | Name the actual subject |
| `sangat penting sekali sekali` | State the consequence instead |
| `terlepas dari itu` | Direct transition or silence |
| `dalam era digital saat ini` | Start with the claim |
| `keren banget` as filler | Keep slang only when the audience profile demands it (see `penulisan-gaul/09`) |

## 2.3 Building a Project Banned List

The universal list is a floor, not a ceiling. Each product adds its own list from *observed* output, not theory:

1. Ship with the base list and log what the model writes.
2. Every week, extract words that appear 5+ times and read like PR copy.
3. Add the recurring ones to the list, sorted alphabetically.
4. Keep the list ≤ 60 entries; a 500-word ban list becomes slop of its own.

## 2.4 The Replacement Taboo

Banned lists fail when the model just swaps one cliché for another. The steering rule is replacement by a **concrete noun**:

| Slop | Bad replacement | Good replacement |
|---|---|---|
| "a pivotal moment" | "a truly key moment" | "the day our cache burned down at 2am" |
| "seamless experience" | "smooth experience" | "one click, no email confirmation" |

Replacement must carry a *fact*, or it is the same slop wearing different clothes.

---

## ⚡ Action Checklist

- [ ] Copy the base table into the system prompt's banned list
- [ ] Add the 10 most common words your own project produces
- [ ] Grep the latest shipped output against the list; count hits
- [ ] For every banned phrase logged, write one concrete replacement

## 🧭 ICIL Cross-Ref

- `ux-writing/03` — clarity and specificity in product copy
- `design-ethics/01` — honest claims and dark-pattern avoidance
- `improvement/05` — extracting reusable rules from repeated fixes

> **Next:** [03 — Structural Slop Patterns](./03-structural-slop-patterns.md) — slop survives even with all the words replaced.

**Sources:** Peter Giyang, *no-ai-slop* (20+ banned pattern set); *Anti-Slop Rules* (Migdat) — text/code/UI 3-in-1 filter approach; Strunk & White, *The Elements of Style* (rule 17: omit needless words).
