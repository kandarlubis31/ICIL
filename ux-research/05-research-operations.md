# 🔬 05 — Research Operations & Repositories

> 🟡 Intermediate | Prereq: 01 | ~9 min

One research study is a project. Continuous research that scales across a team is **an operation**. ResearchOps is the infrastructure — recruitment, consent, repositories, tooling, and democratization — that turns research from ad-hoc activities into a repeatable system. Without ResearchOps, every study reinvents the wheel and insights get lost in slide decks nobody reads.

---

## 5.1 ResearchOps Maturity Model

| Level | State | Characteristics |
|-------|-------|----------------|
| 1 | **Ad-hoc** | Each researcher manages their own recruitment, tools, storage. Insights live in slides. |
| 2 | **Coordinated** | Shared recruitment process, some tools standardized. Insights shared in team meetings. |
| 3 | **Systematic** | Research repository, standardized methods, participant panel. Insights searchable. |
| 4 | **Scaled** | Self-serve research for non-researchers, automated synthesis pipelines, insights integrated into product workflows. |
| 5 | **Strategic** | Research drives roadmap, continuous discovery, insights feed AI/ML systems, research ROI measured. |

## 5.2 Core ResearchOps Components

```
┌─────────────────────────────────────────────────────────────┐
│                     RESEARCH OPERATIONS                       │
├──────────────┬──────────────┬──────────────┬────────────────┤
│  PARTICIPANT │  METHODS &   │  KNOWLEDGE   │  GOVERNANCE    │
│  MANAGEMENT  │  TOOLING     │  MANAGEMENT  │  & ETHICS      │
├──────────────┼──────────────┼──────────────┼────────────────┤
│ Recruitment  │ Method       │ Repository   │ Consent mgmt   │
│ Screening    │ templates    │ (searchable) │ Data retention │
│ Panel mgmt   │ Tool licenses│ Tagging      │ Privacy (GDPR) │
│ Compensation │ Synthesis    │ Insight      │ Democritization│
│ Scheduling   │ workflows    │ lifecycle    │ training       │
└──────────────┴──────────────┴──────────────┴────────────────┘
```

## 5.3 Participant Management

```ts
interface ParticipantPanel {
  id: string;
  profile: {
    role: string;           // "Product Manager"
    industry: string;
    companySize: string;
    demographics: Record<string, string>;
  };
  history: {
    studies: string[];      // study IDs they participated in
    lastContacted: Date;
    satisfactionScore: number; // 1-5, did they have a good experience?
  };
  consent: {
    researchConsent: boolean;
    recordingConsent: boolean;
    contactForFuture: boolean;
    dataRetentionDate: Date;
  };
  compensation: {
    method: "giftcard" | "cash" | "donation";
    amount: number;
    status: "pending" | "paid";
  };
}

// Panel management best practices
const PANEL_RULES = {
  rotationPeriod: "6 months",      // don't over-use the same participants
  maxStudiesPerYear: 3,            // per participant → prevents professional testers
  compensationMinimum: "$75/hour", // respect their time; underpaying = bad data
  noShowBuffer: "20%",             // recruit 120% of needed → account for no-shows
};
```

## 5.4 Research Repository (the knowledge layer)

```
PROBLEM:                              SOLUTION:
  Researcher A does a study →          Research Repository
  Puts insights in a slide deck →      (searchable, tagged, living)
  Deck gets lost in Google Drive →     
  Researcher B repeats the study →     Every insight is:
  Doesn't know A already did it        → Tagged (topic, persona, product area)
                                       → Searchable (full-text + filters)
                                       → Connected (links to raw data)
                                       → Alive (updated, not archived)
```

### Repository Structure

```ts
interface ResearchInsight {
  id: string;
  title: string;               // "Manual reporting adds 3hrs/week per user"
  insight: string;             // full statement with evidence
  evidence: {
    studyId: string;
    participantIds: string[];
    quotes: string[];
    method: "interview" | "survey" | "usability" | "analytics";
  };
  tags: string[];              // ["reporting", "workflow", "b2b", "pain-point"]
  productArea: string;         // "analytics-dashboard"
  personas: string[];          // persona IDs this applies to
  date: Date;
  status: "validated" | "hypothesis" | "deprecated";
  linkedInsights: string[];    // related insight IDs
  actionTaken?: string;        // "Led to reporting redesign Q3 2026"
}
```

> **Tools:** Dovetail (industry leader), Marvin, Notably, Condens, EnjoyHQ. All offer AI-powered search across past research.

## 5.5 Research Democratization

```
TRADITIONAL (bottlenecked):         DEMOCRATIZED (scaled):
  Researcher does ALL research        Researchers train + enable others
  Non-researchers wait in queue       Product managers run basic usability tests
  Research = gatekeeper               Research = enabler + quality guardian
  
  Researcher role shifts:
    FROM: "I do the research"          TO: "I enable the team to research"
    FROM: "I synthesize everything"    TO: "I review + elevate team findings"
    FROM: "I own all insights"         TO: "I maintain the repository + standards"
```

### Democratization Safeguards

| Risk | Safeguard |
|------|-----------|
| Non-researchers ask leading questions | Provide templates + training; review first 2 sessions |
| Inconsistent methods across team | Standardized method library with step-by-step guides |
| Quality erosion | Researcher reviews all findings before they enter the repository |
| Ethical lapses | Consent templates + privacy training required before anyone can recruit |

## 5.6 Research Lifecycle (continuous discovery)

```
TRADITIONAL (project-based):         CONTINUOUS DISCOVERY:
  Q1: Big research study               Weekly: 2-3 customer conversations
  Q2: Build based on Q1 findings       → Synthesize in real-time
  Q3: Ship                             → Feed insights to team immediately
  Q4: New study (findings may be stale)→ Adjust roadmap continuously
  
  PROBLEM: 6-month gap between         ADVANTAGE: Always-current evidence
  research and decisions               → Decisions based on today's reality
```

> **Teresa Torres (Continuous Discovery Habits):** Interview customers weekly. Each week, one opportunity identified. Monthly: review all opportunities → prioritize → set targets for solution design.

## 5.7 AI in ResearchOps (2026)

| Capability | Impact |
|------------|--------|
| **AI-powered repository search** | "Show me all insights about onboarding from B2B users in the last 6 months" — instant, semantic search |
| **Automated participant matching** | AI screens panel for studies based on criteria → 80% less manual recruitment time |
| **Insight deduplication** | AI flags: "This insight duplicates one from March 2026 — merge?" |
| **Auto-generated research reports** | AI drafts study reports from coded data → human reviews + edits |
| **Live insight dashboards** | AI surfaces trending themes across all ongoing research in real-time |

## 5.8 Anti-Patterns

- **Research graveyard** — studies conducted, insights documented, never referenced again. A repository nobody uses.
- **Professional participants** — same 10 people in every study → data gets stale, they learn to "perform"
- **Under-compensation** — $10 Amazon gift card for a 1-hour interview → disrespect → poor quality data
- **Democratization without training** — letting PMs run interviews with no methodology → garbage data, confirmed biases
- **Consent as afterthought** — recording without consent, storing PII without retention policy → legal risk

## 5.9 ICIL Cross-Ref

Builds on: `01` (fundamentals), `04` (synthesis — repository stores synthesized insights)
Next: `06` (usability testing — the most common research operation to systematize)
Related: `improvement/01` (methodology — ResearchOps IS a methodology), `dx/07` (onboarding & metrics — research onboarding for non-researchers), `agentic-engineering/04` (observability — research observability is insight tracking)

## ⚡ Action Checklist

- [ ] Assess your ResearchOps maturity (1-5) — identify the biggest gap
- [ ] Build a research repository (Dovetail/Marvin/Notably) — every study MUST go in
- [ ] Create a participant panel with rotation rules (max 3 studies/year, 6-month rotation)
- [ ] Set compensation minimums ($75+/hour) — respect participant time
- [ ] Standardize 3-5 method templates so non-researchers can run basic research with guardrails
- [ ] Move toward continuous discovery: weekly customer conversations, real-time synthesis
- [ ] Implement consent management: template consent forms, data retention dates, GDPR compliance
