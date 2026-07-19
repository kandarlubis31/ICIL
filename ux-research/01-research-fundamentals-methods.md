# 🔬 01 — Research Fundamentals & Methods

> 🟢 Beginner | Prereq: — | ~9 min

UX research = systematically gathering evidence about users to inform design decisions. Not opinions, not guesses — **validated understanding**. In 2026, research ranges from traditional human-led studies to AI-augmented continuous discovery. Every AI agent building products needs to know *how to gather evidence*, not just *how to design from assumptions*.

---

## 1.1 Research Types

| Type | Goal | Methods | Output |
|------|------|---------|--------|
| **Generative** (discovery) | Understand the problem space | Interviews, ethnography, diary studies, field research | Personas, journey maps, problem statements |
| **Evaluative** (validation) | Test a solution | Usability testing, A/B testing, heuristic eval | Usability issues, success metrics |
| **Attitudinal** | What users say | Interviews, surveys, focus groups | Opinions, preferences, beliefs |
| **Behavioral** | What users do | Analytics, session replay, heatmaps, eye-tracking | Actual behavior patterns |
| **Qualitative** | Why & how (depth) | 5-8 in-depth interviews, contextual inquiry | Themes, insights, narratives |
| **Quantitative** | How many & how much (breadth) | Surveys (N=100+), analytics, funnel analysis | Statistics, proportions, trends |

## 1.2 The Research Process

```
DEFINE    → What decision are we researching for? (not "research the users")
  ↓
PLAN      → Pick method based on question type + timeline + budget
  ↓
RECRUIT   → Find representative participants (not your colleagues)
  ↓
CONDUCT   → Execute the method (interview, test, survey)
  ↓
SYNTHESIZE→ Analyze raw data → themes → insights
  ↓
ACT       → Convert insights to design decisions / product changes
```

> **Critical:** Research without a decision it informs is academic exercise. Always start with: "What decision will this research change?"

## 1.3 Method Selection Matrix

| Question You Have | Best Method | N (sample) | Time |
|-------------------|-------------|------------|------|
| "What problems do users have?" | Generative interviews | 5-8 | 2-3 weeks |
| "Can users complete this task?" | Moderated usability test | 5-8 | 1-2 weeks |
| "Which design performs better?" | A/B test | 1,000+ | 2-4 weeks |
| "How do users use our app daily?" | Diary study / analytics | 10-20 | 2-4 weeks |
| "What do users think overall?" | Survey | 100-500 | 1-2 weeks |
| "Where do users get stuck?" | Funnel analysis + session replay | All users | 1 week |
| "Is the design usable at scale?" | Unmoderated test (Maze, UserTesting) | 20-50 | 3-5 days |

## 1.4 Qualitative vs Quantitative: The Triangulation Principle

```
ATTITUDINAL (what they say)     BEHAVIORAL (what they do)
    ┌──────────────┐                ┌──────────────┐
    │  Interviews  │                │   Analytics  │
    │  Surveys     │                │  A/B Testing │
    │  Focus Group │                │  Eye-Tracking│
    └──────┬───────┘                └──────┬───────┘
           │                               │
           └──────────┬────────────────────┘
                      ▼
              QUALITATIVE (why)        QUANTITATIVE (how many)
              ┌──────────────┐         ┌──────────────┐
              │  5-8 users   │         │  100+ users  │
              │  Deep themes │         │  Statistical │
              │  "Why"       │         │  "How many"  │
              └──────────────┘         └──────────────┘

TRIANGULATE: combine methods from different quadrants for strongest evidence
```

> **Nielsen's rule:** "You only need 5 users to find 85% of usability problems." But you need 100+ for statistical confidence in *which* problem is most severe.

## 1.5 AI-Augmented Research (2026)

| Traditional | AI-Augmented 2026 |
|------------|-------------------|
| Manual recruitment → 2 weeks | AI screener → 2 days (Perspective AI, UserInterviews.com) |
| Human-moderated interviews | AI-moderated adaptive interviews at scale (100+ parallel) |
| Manual transcription + coding | AI transcription + auto-theming (Dovetail AI, Marvin) |
| Periodic research reports | Continuous discovery streams (always-on analysis) |
| Synthetic personas from guesses | AI-generated personas grounded in real transcript data |

> **Warning:** AI-moderated interviews and synthetic users are for *hypothesis generation*, NOT validated findings. Always triangulate with real human research before acting on AI-generated insights. (NN/g, 2026)

## 1.6 Anti-Patterns

- **Researching without a decision** — "Let's talk to users" without knowing what you'll change based on answers
- **Confirmation bias** — asking leading questions to confirm what you already believe
- **Sample bias** — only interviewing power users; missing the 90% who churned silently
- **Garbage in, garbage out** — poor interview questions produce poor insights regardless of method
- **Research theater** — presenting findings that "prove" what stakeholders already decided

## 1.7 ICIL Cross-Ref

Builds on: `kognisi/03` (perception & attention — how users notice things), `strategic-design/02` (problem framing — what to research)
Next: `02` (interview techniques), `03` (quantitative methods), `04` (synthesis)
Related: `improvement/02` (audit techniques — research as audit input), `ux-psikologi/01` (user behavior foundations)

## ⚡ Action Checklist

- [ ] Before any research: write "What decision will this research change?" — if you can't answer, don't research yet
- [ ] Pick methods using the selection matrix — match the method to the question type
- [ ] Plan for triangulation: combine qualitative (why) + quantitative (how many)
- [ ] Recruit representative users — not your teammates, not power users only
- [ ] For AI-augmented research: always validate AI-generated insights with real human data
