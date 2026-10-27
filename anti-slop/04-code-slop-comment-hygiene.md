# 🚫 04 — Code Slop & Comment Hygiene

> 🟡 Intermediate | Prereq: 01 | ~8 min

Code slop is invisible in the diff and expensive at review time: verbose narrating comments, dead abstractions, emoji headers, and try-catch blocks that swallow everything. The reviewer cannot reject the PR because "it works" — so the debt lands in maintenance.

---

## 4.1 The Comment Taxonomy

| Type | Example | Verdict |
|---|---|---|
| Narrating | `// increment counter by 1` above `count++` | Delete — restates the code |
| Law/invariant | `// user_id must match JWT sub; else session split-brain` | Keep — explains *why* |
| Ritual artifact | `// This class handles customer logic. It was written on...` | Delete — version control has this |
| TODO without owner | `// TODO: fix this later` | Make it an issue, then delete |
| Emoji headers | `// 🚀PERSON 🏢COMPANY 💰PAYMENT` | Delete — syntax highlighting exists |

The invariant comments are exactly what a next agent needs when it re-reads the file. Slop deletes the valuable ones by copying a no-comments rule too literally; the discipline is **delete the narration, keep the law**.

## 4.2 Beyond Comments

| Slop | Detection | Fix |
|---|---|---|
| Catch-all error swallow | `catch (e) { /* ignore */ }` chains | Handle or rethrow; silence requires a comment stating the accepted risk |
| Dead abstraction | Interface with a single implementation used once | Inline; an abstraction is bought when the second case arrives |
| Over-explain in prose | PR descriptions restating the diff | Describe intent and risk, not the code path |
| Emoji-driven naming | `initializePayment 🚀` | Linters catch this one automatically |
| README theater | Long README, zero setup commands | Command copy-paste test before merging |

## 4.3 What "Clean" Means for Review

The bar review actually uses:

1. **Read the diff aloud.** Anything a human reviewer would skim past is usually slop.
2. **Comments budget.** New comments must outnumber narrating ones by 5:0.
3. **One change per PR.** Slop multiplies when cosmetic refactors ride along with fixes.

## 4.4 Agent Rules

Agents that generate code should carry these in the system prompt directly:

- No comment unless it states an invariant, a law, a trade-off, or a risk.
- No emoji in code, comments, or commit messages.
- No abstraction before the second concrete use case.
- Errors are handled or rethrown, never silenced silently.

---

## ⚡ Action Checklist

- [ ] Open your last merged PR; count narrating comments and delete them
- [ ] Audit swallowed exceptions; each one needs a stated justification
- [ ] Grep the codebase for emoji in source files
- [ ] Add the four agent rules to the team system prompt

## 🧭 ICIL Cross-Ref

- `software-engineering/01` — clean-code root principles, where slop is the symptom
- `agentic-engineering/02` — programmatically correcting agent output before merging
- `dx/03` — onboarding-driven clarity: for whom is the code written

> **Next:** [05 — UI Slop Patterns](./05-ui-slop-patterns.md) — what generated interfaces get wrong.

**Sources:** Migdat, *Anti-Slop Rules* (code filter); anti-ui-slop (UIZZE) — generated UI defaults critique; Fowler, *Refactoring* (comprehension rate over comment count).
