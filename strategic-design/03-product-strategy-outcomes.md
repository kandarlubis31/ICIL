# 🧭 03 — Product Strategy & Outcome Thinking

> **Level: 🟡 Intermediate** | Prerequisite: 01, 02 | Est. reading time: 14 min

Product strategy is not a roadmap of features — it's a system of choices that positions your product to win. This course covers the strategy pyramid (vision → strategy → goals → execution), OKRs vs NCTs, outcome-over-output thinking, and how AI agents can help set strategic direction instead of just building features.

---

## 3.1 The Strategy Pyramid

```
                   │    VISION    │  ← WHY we exist (10+ year horizon)
                   │  The future  │
                   │  we're building│
                   ┌──────▼───────┐
                   │   STRATEGY   │  ← HOW we'll win (2-3 year)
                   │  The game plan│
                   ┌──────▼───────┐
                   │    GOALS     │  ← WHAT success looks like (quarterly)
                   │  OKRs, NCTs   │
                   ┌──────▼───────┐
                   │  EXECUTION   │  ← The actual work (sprints, tasks)
                   │  Roadmap,     │
                   │  epics, tasks │

  MOST TEAMS START HERE  ↑
  STRATEGIC TEAMS START HERE  ↑
```

> **The insight**: Most teams start at execution (what should we build next?) and never climb up to strategy. Strategic product thinkers start at the top and let vision drive everything else.

### Vision Examples

| Company | Vision | What It Does Right |
|---------|--------|-------------------|
| **Tesla** | "Accelerate the world's transition to sustainable energy" | Inspiring, directional, not about cars specifically |
| **Airbnb** | "Create a world where anyone can belong anywhere" | Emotional, aspirational, not about rooms |
| **Slack** | "Make work life simpler, more pleasant, and more productive" | Clear benefit, emotional + functional |

```
GOOD VISION CHECKLIST:
  □ Inspiring — makes people want to join the mission
  □ Directional — tells you what NOT to do
  □ Timeless — not tied to a specific product or technology
  □ Memorable — can be recited from memory

BAD VISION EXAMPLES:
  "Be the #1 provider of enterprise SaaS solutions"
  → Generic, uninspiring, says nothing about the customer
```

---

## 3.2 OKRs — Objectives and Key Results

**Andy Grove (Intel) → John Doerr (Google)** — the most widely adopted goal-setting framework in tech.

```
OKR STRUCTURE:

  OBJECTIVE (O): Where do we want to go?
  ── Qualitative, inspirational, time-bound
  ── "Become the easiest marketplace for first-time sellers"

  KEY RESULTS (KR): How will we know we're getting there?
  ── Quantitative, measurable, outcome-focused
  ── KR1: Reduce seller onboarding time from 3 days to 2 hours
  ── KR2: 80% of new sellers publish their first listing within 24 hours
  ── KR3: Seller NPS during onboarding improves from 30 to 60
```

### OKR Quality Rules

```javascript
// AI Agent: OKR Quality Checker
function validateOKR(objective, keyResults) {
  const issues = [];

  // Objective checks
  if (!objective || objective.length < 10) {
    issues.push("Objective is too short — make it aspirational");
  }
  if (objective.includes("ship") || objective.includes("build") || objective.includes("launch")) {
    issues.push("Objective should describe OUTCOME, not OUTPUT. Replace 'ship X' with 'improve Y'");
  }

  // Key Result checks
  for (const kr of keyResults) {
    if (!hasNumber(kr)) {
      issues.push(`KR "${kr}" has no number — make it measurable`);
    }
    if (kr.includes("ship") || kr.includes("build") || kr.includes("complete")) {
      issues.push(`KR "${kr}" is an output, not an outcome. Measure impact, not completion.`);
    }
  }

  if (keyResults.length < 2 || keyResults.length > 5) {
    issues.push("Should have 2-5 Key Results (ideal: 3)");
  }

  return {
    valid: issues.length === 0,
    issues,
    grade: issues.length === 0 ? "A" : issues.length <= 2 ? "B" : "Needs rewrite",
  };
}

function hasNumber(str) {
  return /\d/.test(str);
}
```

### Output vs Outcome

```
OUTPUT (what you build):            OUTCOME (what changes):
"Ship dark mode"                    "Reduce eye strain complaints by 60%"
"Build onboarding wizard"           "Increase 7-day retention from 45% to 70%"
"Add notification center"           "Cut 'missed important update' tickets by 80%"
"Rewrite in React"                  "Reduce page load time from 4s to 1.5s"

  OUTPUT = you did the work
  OUTCOME = the work changed user behavior or business metrics

  RULE: Always tie output to outcome. If an output has no
        measurable outcome, question why you're building it.
```

---

## 3.3 NCTs — Narrative, Commitment, Tasks

**Ravi Mehta** (ex-Facebook, TripAdvisor, Tinder) created **NCTs** as an alternative that adds narrative context:

```
OKR PROBLEM:
  "Increase monthly active users from 50K to 80K"
  → Why 80K? What changed? What's the strategy?
  → Teams game the metric without understanding the why.

NCT STRUCTURE:

  NARRATIVE (Why):
  "Our competitor launched a free tier and we're losing
   top-of-funnel signups. We need to capture price-sensitive
   users before they default to the competitor. A free tier
   with core functionality will convert to paid at 15% based
   on industry benchmarks."

  COMMITMENT (What):
  "Launch free tier by Q2. Target: 30K free signups/month,
   converting to 4.5K paid within 90 days."

  TASKS (How):
  - Build free tier feature gates (engineering)
  - Design upgrade prompts at natural conversion points (design)
  - Set up conversion tracking and cohort analysis (data)
```

> **NCT > OKR** when the *why* matters more than the *number*. Use NCTs when the strategy isn't obvious; use OKRs when alignment on numbers is the primary need.

---

## 3.4 Product-Market Fit

**Marc Andreessen**: "Product-market fit means being in a good market with a product that can satisfy that market."

```
THE PMF SIGNALS:

  STRONG PMF:                         WEAK PMF:
  ── Users would be "very               ── Users say "it's fine"
     disappointed" without it           ── Growth requires paid
  ── Organic growth (word of mouth)       acquisition
  ── Users upgrade without prompting    ── Users churn after
  ── Sales cycles are short               onboarding
  ── "I can't imagine going back"       ── "I'll use it if I have to"

  THE 40% RULE (Sean Ellis):
  Ask users: "How would you feel if you could no longer use this product?"
  If ≥ 40% say "very disappointed" → you have PMF
```

### The PMF Spectrum

```
          PRE-PMF                           POST-PMF
  │  Focus: DISCOVERY    │        │  Focus: GROWTH       │
  │  "Do people want     │        │  "How do we scale    │
  │   this at all?"      │        │   what's working?"   │
  │  Strategy:           │        │  Strategy:           │
  │  ── Talk to users    │        │  ── Optimize funnel  │
  │  ── Pivot fast       │        │  ── Scale channels   │
  │  ── Ship MVPs        │        │  ── Build moats      │
  │  ── Ignore metrics   │        │  ── Obsess metrics   │
```

---

## 3.5 The Strategy Choice Cascade (Playing to Win)

**A.G. Lafley & Roger Martin** — the most rigorous strategy framework:

```
THE FIVE STRATEGIC QUESTIONS:

  1. WHAT IS OUR WINNING ASPIRATION?
     → The vision — what does success look like?

  2. WHERE WILL WE PLAY?
     → Which markets? Which customers? Which geographies?
     → Equally important: where will we NOT play?

  3. HOW WILL WE WIN?
     → What's our competitive advantage?
     → Cost leadership OR differentiation (not both)

  4. WHAT CAPABILITIES MUST WE HAVE?
     → What do we need to be excellent at?

  5. WHAT MANAGEMENT SYSTEMS ARE REQUIRED?
     → What infrastructure, culture, processes?

  THE TEST: Do all five answers reinforce each other?
  If "Where to play" contradicts "How to win" → strategy is broken.
```

---

## 3.6 AI Agent: Strategy Generator

```javascript
// AI Agent: Help a user formulate product strategy
function generateStrategyDraft(input) {
  const { product, market, users, competitors } = input;

  // Vision (inspiring, directional)
  const vision = `A world where ${users.pain} is ${users.desiredState}`;

  // Where to play
  const where = {
    market: market.name,
    segment: users.segment,
    geography: market.geography || "global",
    explicitlyExcluded: market.excluded || "Enterprise segment (too slow)",
  };

  // How to win
  const how = {
    advantage: identifyAdvantage(product, competitors),
    type: "differentiation", // or "cost leadership"
    moat: identifyMoat(product),
  };

  // OKRs
  const okrs = generateOKRs(vision, where, how);

  // Risk assessment
  const risks = [
    `What if ${competitors[0]} copies this in 6 months?`,
    `What if ${users.segment} doesn't care about ${how.advantage}?`,
    `What if the ${market.name} market shrinks?`,
  ];

  return { vision, where, how, okrs, risks, nextStep: "Validate these assumptions with 10 customer interviews." };
}

function identifyAdvantage(product, competitors) {
  const gaps = competitors.map(c => ({
    competitor: c.name,
    gap: `${c.name} doesn't ${product.uniqueCapability}`,
  }));
  return gaps;
}
```
