# 🧠 05 — Decision Making & Heuristics

> **Level: 🟡 Intermediate** | Prerequisite: 01, 02 | Est. reading: 9 min

Users rarely make rational decisions. They use mental shortcuts — heuristics. Design for how people actually choose, not how they should.

---

## 5.1 Key Decision Heuristics

| Heuristic | How It Works | UI Pattern |
|-----------|-------------|------------|
| **Availability** | Recent/vivid examples feel more common | Show testimonials + recent activity ("23 people bought today") |
| **Representativeness** | Judge by similarity to prototype | Category icons must match mental model |
| **Affect** | Emotional judgment before rational | First impression matters — hero image sets emotion |
| **Anchoring** | First number sets reference | Show premium tier first → makes mid-tier feel affordable |
| **Scarcity** | Rare = valuable | "Only 3 left" — but use ethically |
| **Social proof** | Others' choices guide ours | Reviews, ratings, "most popular" badge |

---

## 5.2 The Decoy Effect

| | Basic | Premium | Premium+ (Decoy) |
|---|-------|---------|------------------|
| **Price** | $10 | $25 | **$28** (only $3 more than Premium) |
| **Features** | 5 | 10 | 12 |

Adding Premium+ makes Premium look like a great deal → shifts more users to Premium. **The decoy is never meant to be chosen.**

---

## 5.3 Choice Architecture

| Pattern | Description | Example |
|---------|------------|---------|
| **Defaults** | Pre-select the best option | Opt-out organ donation = 90%+; opt-in = ~15% |
| **Partitioning** | Break big decision into smaller | "Pick a category first" before showing 500 products |
| **Elimination by aspects** | Filter progressively | Search filters: price → brand → rating → color |
| **Satisficing** | "Good enough" not "best" | Don't force exhaustive comparison — show "recommended" |

---

## 5.4 Decision Fatigue

> The more decisions users make, the worse their subsequent decisions.

| Countermeasure | Implementation |
|----------------|---------------|
| **Reduce decisions** | Auto-select common options; remember preferences |
| **Front-load important choices** | Ask critical questions early in the flow |
| **Provide breaks** | "Save for later" + resume capability |
| **Limit options** | Jam study: 6 jams → 30% buy; 24 jams → 3% buy |

---

## 5.5 Two-Way Door vs One-Way Door

| Decision Type | UX Strategy |
|---------------|-------------|
| **Two-way door** (reversible) | Let users move fast; minimal friction |
| **One-way door** (irreversible) | Confirmation dialog; cooling-off period; undo |

```
Two-way: changing display name → instant apply
One-way: deleting account → confirm + email + 30-day grace period
```

---

## 5.6 Prospect Theory

| Principle | UI Application |
|-----------|---------------|
| **Loss aversion** (losses hurt ~2-2.25× more than gains, Kahneman & Tversky) | "Don't lose your progress" > "Save your progress" |
| **Diminishing sensitivity** | Upgrade pricing: diminishing cost per feature |
| **Reference dependence** | Show original price crossed out next to sale price |

---

## ⚡ Action Checklist

- [ ] Check your pricing page: does it use anchoring or decoy effect? Is it ethical?
- [ ] Find one irreversible action — add confirmation + undo
- [ ] Audit defaults: are they genuinely the best option for 80%+ of users?
- [ ] Test with users: where do they hesitate? That's decision fatigue — simplify.
