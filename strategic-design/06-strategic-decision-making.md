# 🧭 06 — Strategic Decision-Making Under Uncertainty

> **Level: 🔴 Advanced** | Prerequisite: 05 | Est. reading time: 14 min

Strategy is decision-making under uncertainty. Most bad decisions come not from bad analysis but from using the wrong decision-making mode for the situation. This course covers the Cynefin Framework (choosing the right decision mode), pre-mortems and Red Teaming (adversarial validation), and how to make irreversible decisions with confidence.

---

## 6.1 The Cynefin Framework (Dave Snowden)

**Cynefin** (pronounced "kuh-NEV-in") is a sense-making framework that categorizes problems into five domains — each requiring a fundamentally different decision approach:

```
THE FIVE DOMAINS:

    │                    COMPLEX                     │
    │  ── Cause & effect only clear in retrospect   │
    │  ── Unknown unknowns                          │
    │  ── "The realm of emergence"                  │
    │  APPROACH: Probe → Sense → Respond            │
    │  ── Run experiments to learn                   │
    │  ── Amplify what works, dampen what doesn't   │
    │  ── No "best practice" exists                  │
    │     COMPLICATED       │        CHAOTIC        │
    │  ── Cause & effect    │  ── No clear cause    │
    │     separated by      │     & effect          │
    │     analysis          │  ── Act first to      │
    │  ── Known unknowns    │     stabilize          │
    │  ── "The realm of     │  ── "The realm of     │
    │     experts"          │     crisis"            │
    │  APPROACH:            │  APPROACH:            │
    │  Sense → Analyze →    │  Act → Sense →        │
    │  Respond              │  Respond               │
    │                    CLEAR                        │
    │  ── Cause & effect obvious to all              │
    │  ── Known knowns                               │
    │  ── "The realm of best practice"               │
    │  APPROACH: Sense → Categorize → Respond        │
    │  ── Follow established procedures              │
    │  ── Standard operating patterns                │
    │                  CONFUSION (Disorder)                 │
    │  ── Don't know which domain you're in          │
    │  ── Default behavior = personal preference     │
    │  ── DANGER ZONE — move to another domain ASAP  │
```

### Cynefin Decision Matrix

| Domain | Example | Decision Mode | Speed | Error Risk |
|--------|---------|--------------|-------|------------|
| **Clear** | "The login button is broken" | Follow established fix procedure | Fast | Low (if procedure is correct) |
| **Complicated** | "We need to improve our search ranking" | Bring in expert, analyze data | Medium | Medium (expertise-dependent) |
| **Complex** | "Will users adopt this new product category?" | Run experiments, probe the market | Slow | High (unknowable in advance) |
| **Chaotic** | "Site is down, we're losing $10K/min" | Act immediately to stabilize | Immediate | High (but necessary — stabilize first) |
| **Confusion (Disorder)** | "Not sure what kind of problem this is" | MOVE OUT of confusion first | — | Very high (wrong mode = wrong decision) |

```javascript
// AI Agent: Cynefin Classifier
function classifyProblem(description) {
  const features = analyzeFeatures(description);

  if (features.isCrisis || features.immediateThreat) {
    return {
      domain: "CHAOTIC",
      approach: "Act → Sense → Respond",
      action: "STABILIZE FIRST. Stop the bleeding. Then diagnose.",
      example: "Site is down → restart servers → THEN investigate root cause.",
    };
  }

  if (features.hasClearSolution && features.previouslySeen) {
    return {
      domain: "CLEAR",
      approach: "Sense → Categorize → Respond",
      action: "Apply the established solution. Don't overthink it.",
      caution: "Beware of complacency — 'clear' can slip into 'chaotic' if context changes.",
    };
  }

  if (features.requiresExpertise && features.causeEffectKnowable) {
    return {
      domain: "COMPLICATED",
      approach: "Sense → Analyze → Respond",
      action: "Bring in domain expertise. Analyze before acting.",
      caution: "Multiple experts may disagree — the 'right' answer exists but must be found.",
    };
  }

  if (features.novelSituation && features.causeEffectOnlyRetrospect) {
    return {
      domain: "COMPLEX",
      approach: "Probe → Sense → Respond",
      action: "Run safe-to-fail experiments. Amplify what works.",
      caution: "There is no 'right' answer in advance. Emergence will reveal it.",
    };
  }

  return {
    domain: "CONFUSION",
    approach: "Move to another domain ASAP",
    action: "Gather more information before deciding.",
  };
}
```

---

## 6.2 Pre-Mortems

**Gary Klein**: "A pre-mortem in a business setting comes at the beginning of a project rather than the end. Unlike a post-mortem, the project hasn't failed yet — so the pre-mortem imagines it HAS failed and works backward to determine why."

```
THE PRE-MORTEM PROCESS:

  STEP 1: SET THE SCENE
  "It's 12 months from now. Our [project/product/strategy]
   has been a COMPLETE DISASTER. It failed spectacularly.
   Now, write down all the reasons WHY it failed."

  STEP 2: SILENT BRAINSTORMING (5 min)
  ── Everyone writes down failure reasons individually
  ── This prevents groupthink (loud voices dominate)

  STEP 3: SHARE & CLUSTER
  ── Each person shares their #1 failure reason
  ── Group clusters similar themes

  STEP 4: PRIORITIZE RISKS
  ── Which failure modes are most LIKELY?
  ── Which would be most CATASTROPHIC?
  ── Focus on the intersection: likely + catastrophic

  STEP 5: BUILD MITIGATIONS
  ── For each top risk: what can we do NOW to prevent it?
  ── What's our early warning signal?
```

### Pre-Mortem for AI Agents

```javascript
// AI Agent: Run a Pre-Mortem
function runPreMortem(projectPlan, context) {
  // Generate failure scenarios
  const failureScenarios = [
    marketFailure(projectPlan, context),
    executionFailure(projectPlan, context),
    adoptionFailure(projectPlan, context),
    competitiveFailure(projectPlan, context),
    technicalFailure(projectPlan, context),
    organizationalFailure(projectPlan, context),
  ];

  // Score each: likelihood × impact (1-10 each)
  const scored = failureScenarios.map(s => ({
    scenario: s.description,
    likelihood: s.likelihood,
    impact: s.impact,
    riskScore: s.likelihood * s.impact,
    earlyWarningSignals: s.signals,
    mitigation: s.mitigation,
  }));

  // Sort by risk score
  scored.sort((a, b) => b.riskScore - a.riskScore);

  return {
    topRisks: scored.slice(0, 3),
    criticalWarning: scored[0].riskScore > 70
      ? `HIGH RISK: "${scored[0].scenario}" scored ${scored[0].riskScore}/100. Mitigate before proceeding.`
      : "Moderate risk profile. Proceed with monitoring.",
    monitoringPlan: scored.map(s => ({
      watchFor: s.earlyWarningSignals,
      ifSeen: `Execute mitigation: ${s.mitigation}`,
    })),
  };
}
```

---

## 6.3 Red Teaming

**Red Teaming** = designating someone (or an AI agent) to play the adversary — to attack the plan and find weaknesses before real adversaries do.

```
RED TEAM QUESTIONS:

  "If I were a competitor trying to kill this product,
   here's exactly what I'd do..."

  ── How would I copy this in 3 months with 5 engineers?
  ── What's the one feature I'd build that makes yours irrelevant?
  ── How would I poach your best customers?
  ── What regulatory change would destroy your business model?
  ── If I controlled your biggest dependency, how would I squeeze you?

  INTERNAL RED TEAM:
  ── What internal politics could kill this?
  ── Which team has incentive to see this fail?
  ── What past project died from the same causes?
```

### AI Agent Red Team Prompt

```
"You are now in RED TEAM MODE. Your job is to find every weakness,
flaw, and failure mode in the following plan. Be ruthless. Be creative.
Assume the plan WILL fail and your job is to explain exactly how.

For each attack vector, provide:
1. The attack (how it fails)
2. The likelihood (1-10)
3. The impact if it happens (1-10)
4. A countermeasure that would neutralize this attack

Do not be polite. Do not soften the blow. The goal is to make
the plan stronger by finding every weakness NOW, before it's too late."
```

---

## 6.4 Disagree and Commit (Amazon Leadership Principle)

**Disagree and Commit**: Once a decision is made, everyone commits fully — even those who disagreed.

```
THE PROCESS:

  1. DEBATE VIGOROUSLY
     ── Present data, challenge assumptions, argue your position
     ── This is the time for disagreement

  2. DECISION POINT
     ── The decision-maker makes the call
     ── Not consensus — one person owns the decision

  3. COMMIT FULLY
     ── Once the decision is made, EVERYONE executes as if it was their idea
     ── NO "I told you so" later
     ── NO passive resistance
     ── NO waiting for it to fail to prove you were right

  WHY IT WORKS:
  ── Prevents analysis paralysis (endless debate)
  ── Preserves diverse input BEFORE the decision
  ── Ensures unified execution AFTER the decision
  ── Speeds up decision velocity (the #1 predictor of success)
```

---

## 6.5 Decision Matrices (Structured Trade-Offs)

When choosing between strategic options, use a weighted decision matrix:

```
EXAMPLE: CHOOSING A MARKET TO ENTER

  Criteria weights (sum = 100%):
  ── Market size: 25%
  ── Competition level: 20%
  ── Alignment with capabilities: 25%
  ── Time to first revenue: 15%
  ── Strategic moat potential: 15%

  Score each option 1-10 per criterion:

  │ Criterion        │ Wt%  │ Opt A│ Opt B│
  │ Market size      │ 25%  │  8   │  5   │
  │ Competition      │ 20%  │  4   │  8   │
  │ Capability fit   │ 25%  │  9   │  3   │
  │ Time to revenue  │ 15%  │  6   │  7   │
  │ Moat potential   │ 15%  │  7   │  4   │
  │ WEIGHTED SCORE   │      │ 6.85 │ 5.15 │

  → Option A wins, but notice: the matrix REVEALS
    that Option B has lower competition. That might
    be worth a deeper look before finalizing.
```

```javascript
// AI Agent: Weighted Decision Matrix
function weightedDecision(options, criteria) {
  // Validate weights sum to 100
  const totalWeight = criteria.reduce((s, c) => s + c.weight, 0);
  if (Math.abs(totalWeight - 100) > 0.1) {
    return { error: `Criteria weights must sum to 100%. Current: ${totalWeight}%` };
  }

  const scored = options.map(option => {
    let total = 0;
    const breakdown = criteria.map(c => {
      const weighted = (option.scores[c.name] / 10) * c.weight;
      total += weighted;
      return { criterion: c.name, raw: option.scores[c.name], weighted: weighted.toFixed(1) };
    });
    return { option: option.name, breakdown, total: total.toFixed(2) };
  });

  scored.sort((a, b) => b.total - a.total);

  return {
    winner: scored[0],
    allScores: scored,
    note: "The score is a guide, not a dictator. Check if intuition disagrees with the math — that gap is worth exploring.",
  };
}
```
