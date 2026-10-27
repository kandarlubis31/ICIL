# 🚫 05 — UI Slop Patterns

> 🟡 Intermediate | Prereq: 01 | ~9 min

Generated interfaces converge on the same generic product: purple gradients, glassmorphism, centered card grid, three feature cards with emoji, and a CTA that navigates nowhere. The community skill *anti-ui-slop* hits the root cause: the model guesses components instead of using a **real design system**. This course catalogs the patterns and their fixes.

---

## 5.1 The Default AI Dashboard

| Symptom | Why it is slop | Fix |
|---|---|---|
| Purple/blue gradient background | Default mid-2020s template vending | Use the product palette (e.g. `warna/07` for palettes) |
| Emoji as feature icons | Emoji replace design decisions | Icon set from the design system |
| 3 equal feature cards | Rhythm implies completeness of facts | Layout for actual content volume (compare `layout/04`) |
| CTA "Get Started" without flow state | Dead ends caused by buttons without screens | Bind every CTA to a real target |
| Generic copy "Lorem, Supercharge your workflow" | Marketing shelf copy from list 02 | Write copy from the actual feature |
| Inconsistent spacing, out-of-scale | Components guessed ad hoc | Enforce design-system tokens (`design-systems/05`) |

## 5.2 Forcing Real Components

The generative agent needs constraints, not vibes. The spec given to the AI must include:

1. **Component inventory list** — the buttons, cards, tables, forms that actually exist.
2. **Token budget** — color, spacing, typography taken from tokens, not invented.
3. **Empty states** — every list and view declares a zero-data appearance.
4. **Error states** — what happens on failure, per component (`ux-writing/03`).
5. **Flow graph** — the destination of every interactive element.

A UI generated without items 1 and 5 produces the dead-end look by default; the slop is not in the styling, it is in the **lack of a system**.

## 5.3 Quick Slope Check on a Generated UI

Run this 30-second check before accepting any generated screen:

1. Click every button — is there a real destination?
2. Resize to 360px — does the grid survive or collapse into overflow?
3. Turn off color — how many hierarchies survive in grayscale?
4. Replace images with reality — does copy still make sense?
5. Count gradients — more than one accent gradient = slop.

## 5.4 When Generic Is Fine

Slop control has a budget. Internal admin panels, one-time prototypes, and internal tools can legitimately use defaults. The line: **user-facing and identity-carrying surfaces** get the de-slop pass; internal scaffolding does not. Spending review cycles de-slopping a debug page is the same resource error, just inverted.

---

## ⚡ Action Checklist

- [ ] Audit the latest generated screen with the 5-point check
- [ ] Write the component inventory list before the next UI generation
- [ ] Bind all CTAs to real flows or delete them
- [ ] Adopt the rule: no generated UI without tokens + inventory list

## 🧭 ICIL Cross-Ref

- `design-systems/05` — generating within system boundaries
- `layout/04` — grid discipline for real content volume
- `warna/08` — dark mode and theme tokens that stop gradient soup

> **Next:** [06 — De-Slop Workflow & Trap Prompts](./06-deslop-workflow-trap-prompts.md) — turning these catalogs into a repeatable editing pass.

**Sources:** *anti-ui-slop* (UIZZE, Claude Code skill) — forcing real design systems; buildwithclaude.com skill index; Nielsen Norman Group, *Aesthetic-Usability Effect* (polish masking broken flows).
