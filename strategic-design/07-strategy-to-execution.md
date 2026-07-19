# 🧭 07 — From Strategy to Execution

> **Level: 🔴 Advanced** | Prerequisite: 03, 04, 06 | Est. reading time: 14 min

A brilliant strategy that never executes is worth zero. This final course bridges the gap between strategic thinking and real-world execution: dual-track agile (running discovery and delivery in parallel), strategic narratives that align stakeholders, and how to measure strategic impact — not just feature output.

---

## 7.1 The Strategy-Execution Gap

```
WHY STRATEGIES FAIL:

  70% of strategic initiatives fail — NOT because the strategy
  was wrong, but because execution broke down.

  THE 5 EXECUTION KILLERS:

  1. NO SHARED UNDERSTANDING
     ── Leadership thinks the strategy is clear
     ── Teams interpret it 5 different ways
     ── Nobody realizes the misalignment until it's too late

  2. STRATEGY-EXECUTION DISCONNECT
     ── Strategy says "become the most trusted marketplace"
     ── Sprint backlog says "fix button alignment" and "add tooltip"
     ── No visible thread connecting daily work to strategy

  3. INITIATIVE OVERLOAD
     ── 15 "strategic priorities" = 0 strategic priorities
     ── Teams spread too thin — nothing gets done well

  4. NO FEEDBACK LOOPS
     ── Strategy set in January, never revisited
     ── Market changes in March — nobody adjusts

  5. OUTPUT AS PROXY FOR OUTCOME
     ── "We shipped 47 features this quarter!"
     ── "Did any of them move the metrics?"
     ── "... we didn't check"
```

---

## 7.2 Dual-Track Agile

**Dual-track agile** separates discovery (figuring out what to build) from delivery (building it right):

```
                           TRADITIONAL AGILE
  Backlog → Sprint → Ship → Backlog → Sprint → Ship → ...

  PROBLEM: You're building features nobody validated.
           "The backlog is full of unvalidated ideas."

                           DUAL-TRACK AGILE

  DISCOVERY TRACK:                    DELIVERY TRACK:
  │  Generate ideas   │               │  Build validated  │
  │        │          │               │  solutions        │
  │        ▼          │               │        │          │
  │  Prototype & test │──────────────→│        ▼          │
  │  with users       │  (only if     │  Ship & measure   │
  │        │          │   validated)  │        │          │
  │        ▼          │               │        ▼          │
  │  Learn & iterate  │               │  Learn from data  │
         ↑                                     │
              (discovery learns from delivery data)

  DISCOVERY feeds DELIVERY with validated ideas.
  DELIVERY feeds DISCOVERY with real-world data.
```

### Discovery Track Activities

| Activity | Duration | Output | When |
|----------|----------|--------|------|
| Customer interview | 30-60 min | Pain points, needs, context | Weekly (ongoing) |
| Assumption mapping | 2-4 hours | Riskiest assumptions identified | Start of each initiative |
| Prototype test | 1-3 days | Validated/invalidated assumption | Before committing to build |
| Opportunity mapping | Weekly | Updated OST | Continuous |

### The Golden Ratio

```
DISCOVERY : DELIVERY TIME ALLOCATION:

  Pre-PMF:        80% Discovery : 20% Delivery
  Post-PMF:       20% Discovery : 80% Delivery

  WHY:
  ── Pre-PMF: you're still figuring out what to build.
     Discovery IS the work.
  ── Post-PMF: you've validated the direction.
     Now scale what works.
```

---

## 7.3 Strategic Narratives

A **strategic narrative** is a one-page document that connects the company's vision to the team's daily work. Inspired by Amazon's narrative culture and Stripe's writing-first approach:

```
THE STRATEGIC NARRATIVE TEMPLATE:

  │  STRATEGIC NARRATIVE: [Initiative Name]                   │
  │  Date: [date] | Owner: [name] | Review cycle: quarterly   │
  │  CONTEXT                                                 │
  │  What changed in the world that makes this urgent NOW?   │
  │  (Not why it's a good idea — why NOW?)                   │
  │  STRATEGIC INTENT                                        │
  │  Where are we going? What does winning look like?        │
  │  (The inspiring, directional statement)                  │
  │  THE BET                                                  │
  │  We believe that [doing X] for [audience]                 │
  │  will result in [outcome] because [reasoning].            │
  │  We'll know we're right when [measurable signal].         │
  │  WHY NOW?                                                │
  │  ── Market timing window (closing in Q3)                 │
  │  ── Competitor gap (nobody solves this well)              │
  │  ── Internal capability ready (we have the right team)    │
  │  WHAT WE'RE NOT DOING                                    │
  │  Explicitly: [X, Y, Z] are OUT OF SCOPE.                 │
  │  (Equally important as what you ARE doing)               │
  │  LEAD MEASURES                                           │
  │  What leading indicators will we track weekly?           │
  │  ── [Measure 1]: current ___ | target ___                │
  │  ── [Measure 2]: current ___ | target ___                │
  │  RISKS & MITIGATIONS                                     │
  │  ── Risk 1: [description] → Mitigation: [action]         │
  │  ── Risk 2: [description] → Mitigation: [action]         │
  │  DECISION RIGHTS                                         │
  │  ── [Person A] decides [type of decisions]               │
  │  ── [Person B] decides [type of decisions]               │
  │  ── Everything else: team autonomy                       │
```

> **The writing culture insight** (Stripe, Amazon): Writing forces clarity. A verbal strategy can be fuzzy. A written strategy either makes sense or it doesn't — there's nowhere to hide.

---

## 7.4 Stakeholder Alignment

```
THE STAKEHOLDER ALIGNMENT MAP:

  │   HIGH POWER,             │   HIGH POWER,                │
  │   LOW INTEREST            │   HIGH INTEREST              │
  │   Keep SATISFIED          │   MANAGE CLOSELY             │
  │   ── Regular status       │   ── Weekly sync            │
  │      summaries            │   ── Pre-align before       │
  │   ── Don't overwhelm      │      big meetings           │
  │      with details         │   ── Co-create strategy     │
  │   LOW POWER,               │   LOW POWER,                 │
  │   LOW INTEREST             │   HIGH INTEREST              │
  │   MONITOR                  │   KEEP INFORMED              │
  │   ── Annual check-in       │   ── Monthly newsletter     │
  │   ── Don't invest          │   ── Invite to demos         │
  │      significant time      │   ── Solicit feedback        │
```

### The Alignment Conversation

```javascript
// AI Agent: Stakeholder Alignment Checklist
function alignStakeholders(strategyNarrative, stakeholders) {
  for (const stakeholder of stakeholders) {
    // 1. What does this stakeholder CARE about?
    const theirPriority = stakeholder.topPriority;
    
    // 2. How does our strategy CONNECT to their priority?
    const connection = findConnection(strategyNarrative, theirPriority);
    
    // 3. What do we NEED from them?
    const ask = stakeholder.requiredSupport;
    
    // 4. What do they NEED from us?
    const theirNeed = stakeholder.whatTheyNeedToKnow;
    
    // 5. Pre-alignment: address concerns BEFORE the big meeting
    return {
      stakeholder: stakeholder.name,
      message: `"I know your top priority is ${theirPriority}. 
                Our strategy supports this because ${connection}.
                We'll need ${ask} from your team, and in return,
                we'll keep you updated on ${theirNeed}."`,
      preAlignmentRequired: stakeholder.power === "high" && stakeholder.interest === "high",
    };
  }
}
```

---

## 7.5 Measuring Strategic Impact

**Vanity metrics vs actionable metrics** — stop measuring what makes you feel good; measure what tells you what to do.

```
VANITY METRICS:                       ACTIONABLE METRICS:
"10,000 total signups"                "35% of signups complete the core
                                       action within 7 days"

"1M page views"                       "Bounce rate on landing page: 65%
                                       (target < 40%)"

"500 new features this year"          "3 features account for 80% of
                                       engagement; 12 features used by < 1%"
```

### The North Star Framework

```
NORTH STAR METRIC:
  The single metric that best captures the core value
  your product delivers to customers.

  ── Spotify: "Time spent listening"
  ── Airbnb: "Nights booked"
  ── Slack: "Messages sent"
  ── Shopify: "GMV (Gross Merchandise Volume)"

  A good North Star:
  □ Measures value to the USER (not revenue)
  □ Reflects the core job-to-be-done
  □ Leading indicator of long-term business success
  □ Actionable — you can influence it this week

  INPUT METRICS (drive the North Star):
  ── New listener signups → more potential listening time
  ── Playlist creations → more return visits → more listening time
  ── Song availability → more satisfaction → longer sessions
```

### The Strategic Impact Dashboard

```
STRATEGIC METRICS (reviewed quarterly):

  │ Metric           │ Starting │ Current  │ Target │ Status   │
  │ Seller retention │ 45%      │ 58%      │ 70%    │ 🟡 On trk│
  │ (12-month)       │          │          │        │          │
  │ Time to first    │ 3 days   │ 1.5 days │ 2 hrs  │ 🟢 Ahead │
  │ listing          │          │          │        │          │
  │ NPS (seller)     │ 30       │ 52       │ 60     │ 🟢 Ahead │

  HEALTH METRICS (monitored weekly — early warning):
  ── Seller support ticket volume (rising = problem)
  ── P0 bug count (should be near zero)
  ── Team velocity stability (flat or gently rising)
  ── Discovery interviews per week (≥ 3 = healthy)
```

---

## 7.6 The Product Leadership Mindset Shift

The ultimate goal of this faculty: shift from **builder** to **strategic thinker**.

```
BUILDER MINDSET:                       STRATEGIC MINDSET:
"What should we build next?"           "What outcome should we drive next?"

"Is this feature well-implemented?"    "Is this feature worth building at all?"

"I shipped 12 features this month"     "3 features moved the North Star.
                                         The other 9 were noise."

"The spec says X, so I built X"        "The spec says X, but the user
                                         actually needs Y. Let me flag this."

"More features = better product"       "Fewer, better features = better product"

"I'm measured by output"               "I'm measured by outcomes"
```

### The Strategic Product Thinker's Daily Questions

```
EVERY MORNING, ASK:

  1. What's the most important outcome we're driving this quarter?
  2. Is what I'm doing today directly connected to that outcome?
  3. If not, why am I doing it?

EVERY WEEK, ASK:

  1. What did we learn about our users this week?
  2. What assumption did we invalidate?
  3. Are we still working on the right thing?

EVERY QUARTER, ASK:

  1. Did we move the metrics that matter?
  2. What would we do differently if we were starting over?
  3. Are we still playing the right game?
```

---

## 7.7 The Complete Strategic Product Thinking Stack

```
PUTTING IT ALL TOGETHER:

  COURSE 01: Double Diamond       → HOW to structure the process
  COURSE 02: Problem Framing      → WHAT problem are we really solving?
  COURSE 03: Product Strategy     → WHERE are we going and WHY?
  COURSE 04: Strategic Roadmapping→ WHAT order do we tackle things?
  COURSE 05: First Principles     → HOW to think from fundamentals
  COURSE 06: Decision-Making      → HOW to decide under uncertainty
  COURSE 07: Strategy→Execution   → HOW to make it actually happen

  THE COMPLETE LOOP:

    Design ──→ Frame ──→ Strategize ──→ Roadmap ──→ Execute
       ↑                                              │
       └──────────── Learn & Adapt ←──────────────────┘
```
