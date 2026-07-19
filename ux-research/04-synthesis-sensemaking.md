# 🔬 04 — Research Synthesis & Sensemaking

> 🟡 Intermediate | Prereq: 01, 02 | ~9 min

Raw research data is worthless without synthesis. 20 hours of interviews produce 200 pages of transcripts — but the value isn't in the transcripts, it's in the **insights** you extract. Synthesis is the craft of transforming messy, contradictory qualitative data into clear, actionable patterns that drive design decisions.

---

## 4.1 From Data to Insight

```
RAW DATA          →  ORGANIZED       →  PATTERNS        →  INSIGHTS
(transcripts)        (codes/tags)       (themes)           (actionable)

"Weekly reports    [tagged:           Theme: "Reporting    Insight: "Users don't
take me 3 hours     reporting,         takes too long       need more report
every Monday"       time, frustration] and is manual"      features — they need
                                                                automated scheduling"

200 pages           →  500 codes      →  15 themes       →  5 key insights
```

> **The synthesis trap:** Most teams stop at "themes" (what users said) and never reach "insights" (what it means for design). An insight connects a user need to a design implication.

## 4.2 Affinity Mapping (the core method)

```
STEP 1: Extract quotes/observations onto sticky notes (1 idea per note)
  "I always export to Excel because the dashboard doesn't let me filter"
  "The weekly report takes me 3 hours"
  "I have a spreadsheet that tracks what the tool should track"

STEP 2: Group related notes into clusters (bottom-up, no predefined categories)
  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐
  │ REPORTING   │  │ DATA EXPORT │  │ WORKAROUNDS  │
  │ PAIN        │  │ BEHAVIOR    │  │              │
  │ 3 hrs/week  │  │ Excel       │  │ Spreadsheets │
  │ Manual      │  │ CSV export  │  │ Shadow tools │
  │ Tedious     │  │ Filter gap  │  │ Manual track │
  └──────┬──────┘  └──────┬──────┘  └──────┬───────┘
         └────────────────┼────────────────┘
                          ▼
STEP 3: Name each cluster → identify patterns → write insight statements

INSIGHT: "Users need reporting that's filterable and schedulable, not more
report types. Current exports are workarounds for missing in-app filtering."
```

## 4.3 Coding Methods

| Method | How | Best For |
|--------|-----|----------|
| **Open coding** | Read transcripts, assign labels to segments | Initial pass — discover themes |
| **Axial coding** | Group open codes into categories, find relationships | Structuring themes |
| **Selective coding** | Identify the core theme that connects everything | Finding the narrative |
| **Framework coding** | Use predefined categories (from research goals) | Evaluative research (testing hypotheses) |

```ts
// Tagging structure for qualitative coding
interface ResearchCode {
  id: string;                    // "PAIN-REPORTING-01"
  quote: string;                 // exact participant quote
  participant: string;           // "P03 — Marketing Manager"
  code: string;                  // "reporting.frustration"
  category: string;              // "workflow.efficiency"
  theme: string;                 // "manual reporting burden"
  severity: "low" | "medium" | "high"; // how impactful
  frequency: number;             // how many participants mentioned this
}
```

## 4.4 Journey Mapping from Research

```
A journey map is SYNTHESIS VISUALIZED — it turns interview data into a shared narrative.

STAGE:     Discover        →   Sign Up      →   Onboard      →   First Use    →   Ongoing
─────────────────────────────────────────────────────────────────────────────────────────
ACTIONS:   Searched for    →   Created      →   Watched      →   Created 1st  →   Daily
           "project mgmt"      account          tutorial         project          check-in
─────────────────────────────────────────────────────────────────────────────────────────
THOUGHTS:  "Is this the    →   "Easy enough" →   "Too many    →   "Finally     →   "Wish I
           right tool?"                       steps..."        worked!"         could..."
─────────────────────────────────────────────────────────────────────────────────────────
EMOTIONS:  😰 Uncertain    →   😊 Hopeful    →   😤 Frustrated →   😄 Relieved   →   😐 Neutral
─────────────────────────────────────────────────────────────────────────────────────────
PAIN:      Too many        →   —                →   Onboarding   →   —              →   No mobile
           options                              too long                                    app
─────────────────────────────────────────────────────────────────────────────────────────
OPPORTUNITY: Clearer       →                  →   Skipable     →                 →   Mobile
             comparison                           onboarding                       companion
```

> **Rule:** Every element of a journey map must be grounded in research data. If you can't point to a participant quote, it's a guess, not a journey.

## 4.5 Persona Development

| Element | Grounded In | Anti-Pattern |
|---------|-------------|--------------|
| **Goals** | Interview data: what they're trying to achieve | "Sarah is ambitious" (personality, not goal) |
| **Behaviors** | Observed patterns across participants | "Sarah likes social media" (demographic assumption) |
| **Pain points** | Coded quotes with frequency | Inventing pain points to fit the narrative |
| **Context** | Environmental factors from research | "Sarah works at a startup" (unless research shows this) |

```ts
// Persona template — every field traced to research evidence
interface ResearchPersona {
  name: string;
  role: string;              // "Marketing Manager at mid-size B2B"
  primaryGoal: string;       // from interviews
  secondaryGoals: string[];
  painPoints: {
    description: string;
    evidence: string[];      // participant IDs + quotes
    frequency: number;       // N out of total participants
  }[];
  behaviors: {
    description: string;
    evidence: string[];
  }[];
  tools: string[];           // what they currently use
  quote: string;             // representative verbatim quote
}
```

> **Anti-pattern:** "Marketing Mary" personas created in a brainstorming session with zero user data. These are stereotypes, not personas. Every persona field must link to research evidence.

## 4.6 Insight Statements (the output)

```
❌ WEAK (observation, not insight):
   "Users find the reporting feature slow."

✅ STRONG (insight with design implication):
   "5 of 8 participants export to Excel and manually filter because the in-app
    reporting lacks custom date ranges. This adds 2-3 hours/week per user and
    creates data inconsistency across teams.

    IMPLICATION: Add custom date range filtering to in-app reporting
    + scheduled export to eliminate manual Excel workarounds."
```

### The Insight Formula

```
INSIGHT = [Observed behavior/pain] + [Evidence: N/total] + [Root cause] + [Design implication]

"We observed [X] in [N of M] participants because [root cause].
 This means we should [design implication]."
```

## 4.7 AI-Augmented Synthesis (2026)

| Task | Traditional | AI-Augmented |
|------|-------------|--------------|
| Transcription | Manual (4h per 1h interview) | AI auto-transcribe (minutes) |
| Initial coding | Manual open coding (8h) | AI suggests codes (review + refine, 2h) |
| Theme clustering | Physical sticky notes (6h) | AI clustering + human validation (3h) |
| Journey map drafting | Manual from notes (4h) | AI draft from coded data + human review (2h) |

> **Human-in-the-loop is mandatory:** AI is excellent at finding patterns in data, but it can also find false patterns. Always have a human researcher validate AI-generated themes against raw transcripts. Check: "Does this theme actually reflect what participants said, or did the AI hallucinate a convenient pattern?"

## 4.8 Anti-Patterns

- **Theme ≠ insight** — "Users want better reporting" is a theme. The insight is *why* and *what to do about it*.
- **Cherry-picking** — highlighting the 2 quotes that support your hypothesis, ignoring the 6 that contradict it
- **Persona theater** — beautiful personas with no research backing, used to justify pre-existing decisions
- **One-and-done synthesis** — coding once, never revisiting as new data comes in
- **Research without implication** — "Here are 15 themes" with no "so what?" Design decisions need insight, not just themes.

## 4.9 ICIL Cross-Ref

Builds on: `02` (interviews — produces the data to synthesize), `03` (quantitative — adds the "how many")
Next: `05` (research ops — how to systematize synthesis at scale)
Related: `service-design/03` (journey & moment mapping — same technique applied to services), `strategic-design/02` (problem framing — insights feed problem statements), `data-viz/06` (data storytelling — presenting research findings)

## ⚡ Action Checklist

- [ ] Extract every participant quote/observation to individual notes (1 idea per note)
- [ ] Cluster bottom-up (affinity mapping) — don't force predefined categories initially
- [ ] Write insight statements using the formula: behavior + evidence (N/M) + root cause + design implication
- [ ] Every persona field must trace to research evidence — if no quote, it's a guess
- [ ] Journey maps: every stage, emotion, and pain point links to a participant quote
- [ ] For AI-augmented synthesis: validate AI themes against raw transcripts — check for hallucinated patterns
