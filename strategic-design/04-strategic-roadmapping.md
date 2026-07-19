# 🧭 04 — Strategic Roadmapping & Prioritization

> **Level: 🟡 Intermediate** | Prerequisite: 03 | Est. reading time: 13 min

A roadmap is not a feature list with dates — it's a **strategic communication tool** that shows how you'll achieve your product vision over time. This course covers Now-Next-Later roadmapping, Opportunity Solution Trees (Teresa Torres), story mapping, and how to prioritize at the strategic level (not just tactical ICE/RICE from `improvement/04`).

---

## 4.1 Why Traditional Roadmaps Fail

```
TRADITIONAL ROADMAP:                    STRATEGIC ROADMAP:
Q1: Feature A, B, C                     NOW: Improve seller trust
Q2: Feature D, E, F                     NEXT: Expand to new categories
Q3: Feature G, H                        LATER: AI-powered pricing
Q4: Feature I, J
                                        ── Focused on OUTCOMES not features
PROBLEMS:                               ── Flexible (dates are guesses)
── Dates are fiction after Q1           ── Communicates strategy
── No strategic context — why these?    ── Stakeholders understand the "why"
── Features shipped ≠ problems solved   ── Adjustable without "changing plan"
── Rigid — changing "the plan" = failure
```

---

## 4.2 Now-Next-Later Roadmapping

**Janna Bastow (ProdPad)** — the simplest, most honest roadmap format:

```
THE NOW-NEXT-LATER ROADMAP:

  │  NOW                   │  NEXT              │ LATER │
  │  (This quarter)        │  (Next 1-2 qtrs)  │ (Future)│
  │  Build seller trust    │  Expand to home   │ AI     │
  │  signals: badges,      │  & garden         │ pricing│
  │  reviews, SSL          │  category         │        │
  │  Fix onboarding        │  Seller mobile    │ Inter- │
  │  drop-off at step 3    │  app for on-the-  │ national│
  │                        │  go management    │ markets│

  RULES:
  ── NOW = problems you're actively solving RIGHT NOW
  ── NEXT = problems you'll tackle after NOW (3-5 items max)
  ── LATER = ideas you'll revisit (no commitment)
  ── NO DATES (except for NOW items if necessary)
  ── Describe OUTCOMES, not features
```

### Now-Next-Later for AI Agents

```javascript
// AI Agent: Build a Now-Next-Later roadmap
function buildRoadmap(strategy, currentState, backlog) {
  // Categorize items by strategic proximity
  const now = backlog.filter(item =>
    item.strategicUrgency === "critical" &&
    item.dependencies.length === 0
  ).slice(0, 3); // Limit to 3 focus areas

  const next = backlog.filter(item =>
    item.strategicUrgency === "high" &&
    item.dependencies.every(d => now.some(n => n.id === d))
  ).slice(0, 5);

  const later = backlog.filter(item =>
    !now.includes(item) && !next.includes(item)
  );

  return {
    now: now.map(i => ({ outcome: i.outcome, why: i.strategicRationale })),
    next: next.map(i => ({ outcome: i.outcome, why: i.strategicRationale })),
    later: later.map(i => ({ idea: i.outcome })),
    reviewCadence: "Revisit Next/Later every 6 weeks based on new evidence",
  };
}
```

---

## 4.3 Opportunity Solution Trees (OST)

**Teresa Torres** (*Continuous Discovery Habits*) — the most powerful framework for mapping the messy middle between outcome and solution:

```
THE OST STRUCTURE:

                    │   OUTCOME    │  ← The measurable result you want
                    │ (not output) │     "Increase seller retention by 30%"
         ┌────▼───┐   ┌────▼───┐   ┌────▼───┐
         │OPPORTUNITY│ │OPPORTUNITY│ │OPPORTUNITY│ ← Customer needs/pain points
         │"I don't   │ │"I can't   │ │"I don't   │
         │ trust the │ │ track my  │ │ know if    │
         │ buyer"    │ │ earnings" │ │ I'm priced │
         └────┬──────┘ └────┬──────┘ │ right"     │
  ┌───▼──┐┌──▼──┐┌───▼──┐ │         ┌────▼──────┐
  │SOLUTION│SOLUTION│SOLUTION│        │  SOLUTIONS │
  │Escrow │Verified│Ratings│         │Price comp │
  │system │badge   │system │         │tool       │
```

### OST Rules

| Rule | Why |
|------|-----|
| **Start with an OUTCOME** | Without a clear outcome, you have no way to evaluate opportunities |
| **Opportunities = customer needs** | NOT your ideas. Interview customers to discover real needs. |
| **One opportunity → many solutions** | Don't marry your first solution idea |
| **Test assumptions, not solutions** | "Will this solution address the opportunity?" is a testable assumption |
| **Recursively break down** | Huge opportunity? Break into sub-opportunities |

```javascript
// AI Agent: Build an Opportunity Solution Tree
function buildOST(outcome, customerInterviews) {
  // Step 1: Extract opportunities from customer language
  const opportunities = extractOpportunities(customerInterviews);
  // "I wish I knew if my prices are competitive" → "Seller pricing confidence"

  // Step 2: Prioritize opportunities by impact
  const prioritized = opportunities
    .map(o => ({
      opportunity: o,
      frequency: countMentions(o, customerInterviews),
      intensity: assessPainLevel(o, customerInterviews),
      score: o.frequency * o.intensity,
    }))
    .sort((a, b) => b.score - a.score);

  // Step 3: For each top opportunity, generate solution ideas
  const solutions = prioritized.slice(0, 3).map(o => ({
    opportunity: o.opportunity,
    solutions: generateSolutions(o.opportunity, { minCount: 5 }),
    testableAssumption: `We believe ${o.opportunity.statement} and solving it will move ${outcome}`,
  }));

  return {
    outcome,
    opportunities: prioritized,
    solutionAreas: solutions,
    nextStep: "Test the riskiest assumption first — interview 5 customers about the top opportunity",
  };
}
```

---

## 4.4 User Story Mapping (Jeff Patton)

**Story mapping** visualizes the user's journey and breaks it into releasable slices:

```
THE STORY MAP STRUCTURE:

  │  BACKBONE (user journey — chronological)                 │
  │  Browse → Search → Compare → Add to Cart → Checkout → Track│
  │  WALKING SKELETON (minimum viable journey)               │
  │  ── Can a user complete the ENTIRE journey?              │
  │  Browse → [basic search] → [manual compare] → Cart → [basic checkout] → [email tracking]│
  │  SLICE 2: Better discovery                               │
  │  [filtered browse] → [autocomplete search] → Compare     │
  │  SLICE 3: Conversion optimization                        │
  │  → [saved items] → [one-click checkout] → [real-time track]│
  │  SLICE 4: Delight                                        │
  │  [personalized browse] → [visual search] → [AR preview]  │

  RULE: Always build the WALKING SKELETON first.
        A partial journey that works = no value.
        A complete skeleton with basic features = VALUE.
```

---

## 4.5 Strategic Prioritization (Beyond ICE/RICE)

`improvement/04` covers tactical prioritization (ICE, RICE, MoSCoW). This section covers **strategic** prioritization — choosing between entire directions, not individual fixes.

### The Strategic Prioritization Matrix

```
         STRATEGIC ALIGNMENT (how well does this serve our strategy?)
    │  ALIGNED│STRATEGIC│  ← DO THESE FIRST
    │  BUT    │IMPERATIVE│  (high alignment)
    │  SMALL  │          │
    │  DON'T  │  ALIGNED│
    │  DO     │  BUT    │  ← REVISIT LATER
    │  (mis-  │  BIG    │  (too big to ignore
    │  aligned)│  BET    │   but not core)
         EXPECTED IMPACT
```

### Amazon's Two-Way vs One-Way Door Decisions

```
TWO-WAY DOOR:                        ONE-WAY DOOR:
── Easily reversible                 ── Hard or impossible to reverse
── Low cost of failure               ── High cost of failure
── "If this doesn't work,            ── "If we do this, we're
   we can change it in a week"          committed for years"

EXAMPLES:                            EXAMPLES:
── A/B test a new button color       ── Rebuild the entire platform
── Try a new email subject line      ── Enter a new market
── Add a feature behind a flag       ── Change the pricing model
── Launch a temporary promotion      ── Acquire a company

RULE: Make two-way door decisions FAST (hours, not weeks).
      Slow down for one-way doors — get more data, more opinions.
```
