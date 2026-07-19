# 🔬 03 — Quantitative Methods, Surveys & Analytics

> 🟡 Intermediate | Prereq: 01 | ~9 min

Qualitative tells you *why*; quantitative tells you *how many*. Without numbers, you can't prioritize — is this pain point affecting 5% of users or 80%? Surveys, analytics, and A/B testing transform research from anecdotes into evidence you can stake decisions on.

---

## 3.1 Quantitative Research Methods

| Method | What It Measures | N Needed | Tools |
|--------|-----------------|----------|-------|
| **Survey** | Attitudes, demographics, satisfaction | 100-500 | Typeform, Google Forms, SurveyMonkey |
| **Web analytics** | Behavior patterns, funnels, retention | All users | GA4, Mixpanel, Amplitude |
| **A/B test** | Causal impact of a change | 1,000+ per variant | Optimizely, VWO, Statsig |
| **Heatmap/session replay** | Where users click, scroll, get confused | 1,000+ sessions | Hotjar, FullStory, Mouseflow |
| **Usability benchmark** | Task success rate, time-on-task | 20-50 | SUS, SUPR-Q, Maze |
| **Card sort / tree test** | IA effectiveness | 30-50 | OptimalSort, Treejack |

## 3.2 Survey Design

```
GOOD SURVEY:                    BAD SURVEY:
  10-15 questions max              50+ questions (fatigue → garbage data)
  Mix of scales + open-ended       All yes/no (no nuance)
  Pilot test with 5 people         Launch to 500 without testing
  Clear, neutral language          Leading/jargon questions
  One concept per question         Double-barreled questions

SCALES:
  Likert (5-7 pt)    "How satisfied are you?" 1=Very dissatisfied → 5=Very satisfied
  Semantic differential  "Rate X on: Boring ○○○○○ Engaging"
  Net Promoter Score  "How likely to recommend?" 0-10 (Promoters 9-10, Detractors 0-6)
  CSAT               "How satisfied with [specific interaction]?" 1-5
  CES                "How easy was it to [task]?" 1-7 (Customer Effort Score)
```

### Survey Anti-Patterns

| ❌ Bad | ✅ Good | Why |
|--------|---------|-----|
| "Do you find the app useful and easy to use?" | Split into 2 questions | Double-barreled — can't tell which part they're rating |
| "How much do you love our product?" | "How would you describe your experience with our product?" | Leading/emotional language biases responses |
| "Rate the excellent new dashboard" | "Rate the dashboard interface" | Adjective primes the response |
| 40-question survey | 12-question survey | Response fatigue → random clicking → invalid data |

## 3.3 Analytics — Behavioral Research

```
WHAT ANALYTICS TELLS YOU (behavioral, no opinion):

  FUNNEL ANALYSIS:     Where users drop off
    Sign up (10,000) → Profile setup (7,200) → First action (4,100) → Return (1,800)
    ↓ 28% drop         ↓ 43% drop           ↓ 56% drop
    → Investigate profile setup friction (biggest drop)

  COHORT ANALYSIS:     Retention over time by signup cohort
    Week 1: 100% | Week 2: 45% | Week 4: 22% | Week 8: 12%
    → When do users churn? What happens in week 2?

  SEGMENTATION:        Compare behavior across user types
    Power users: 8 sessions/week, 12 features used
    Casual users: 1.5 sessions/week, 3 features used
    → Which features drive retention?
```

> **Key:** Analytics shows *what* is happening. Qualitative research explains *why*. Always pair them — analytics identifies the problem, interviews diagnose the cause.

## 3.4 A/B Testing

```ts
// A/B test setup — statistical rigor matters
interface ABTestConfig {
  hypothesis: string;       // "Changing CTA from 'Sign Up' to 'Get Started' increases conversion"
  metric: string;           // "signup_conversion_rate"
  variants: { A: string; B: string };
  sampleSize: number;       // calculated from effect size + power
  significanceLevel: number; // 0.05 (95% confidence)
  minDetectableEffect: number; // e.g., 0.05 (5% relative lift)
}

// Sample size calculation (simplified)
function calculateSampleSize(
  baselineRate: number,     // current conversion, e.g., 0.10
  minDetectableEffect: number, // relative lift, e.g., 0.05
  significance: number,     // 0.05
  power: number             // 0.80
): number {
  // Simplified: ~10,000+ per variant for small effects on low baselines
  // Use a calculator: evanmiller.org/ab-testing/sample-size.html
  return Math.ceil(
    (2 * 1.96 * 1.96 * baselineRate * (1 - baselineRate)) /
    Math.pow(baselineRate * minDetectableEffect, 2)
  );
}
```

### A/B Test Rules

| Rule | Why |
|------|-----|
| **Pre-register your hypothesis** | Prevents p-hacking (changing the metric after seeing results) |
| **Calculate sample size BEFORE** | Running too short = false negatives; too long = wasted traffic |
| **Test one variable** | Multi-variable tests can't attribute causation |
| **Run full business cycle** | 1-2 weeks minimum to capture day-of-week variation |
| **Check for novelty effect** | Early lift may be from novelty, not real improvement |

## 3.5 Usability Metrics (Quantified Usability)

| Metric | Formula | Good Score |
|--------|---------|------------|
| **Task Success Rate** | Completed / Attempted × 100 | > 78% (Nielsen) |
| **Time on Task** | Avg seconds to complete | Compare to expert baseline |
| **Error Rate** | Errors per task | < 0.5 errors/task |
| **SUS (System Usability Scale)** | 10-item questionnaire, 0-100 | > 68 (average), > 80 (excellent) |
| **NPS** | % Promoters (9-10) - % Detractors (0-6) | > 0 (good), > 50 (excellent) |

```ts
// SUS calculation — 10 odd-numbered questions are positive, 5 even are negative
function calculateSUS(answers: number[]): number { // answers: 1-5 scale, 10 items
  const positive = [0, 2, 4, 6, 8]; // odd-indexed (0-based) are positive
  let total = 0;
  answers.forEach((a, i) => {
    const score = positive.includes(i) ? a - 1 : 5 - a; // transform to 0-4
    total += score;
  });
  return total * 2.5; // multiply by 2.5 to get 0-100 scale
}
```

## 3.6 AI-Augmented Quantitative Research (2026)

| Capability | Tool | Application |
|------------|------|-------------|
| **Automated survey analysis** | AI (ChatGPT, Claude) | Upload 500 responses → AI extracts themes from open-ended + cross-tabs |
| **Anomaly detection** | Amplitude AI, GA4 Insights | Auto-surfacing unexpected behavior changes |
| **Predictive analytics** | Mixpanel Predict, Amplitude | Forecast churn risk based on behavioral patterns |
| **Auto-generated segments** | AI clustering | "AI found 4 user segments you didn't know about" |

## 3.7 Anti-Patterns

- **Vanity metrics** — tracking page views / signups without connecting to retention/revenue
- **Statistical insignificance** — "We tested with 50 users and B won!" → Not enough data. 50 users can't distinguish a 5% lift.
- **Correlation ≠ causation** — "Users who use feature X churn less" → Maybe engaged users use X *because* they're already retained, not because X retains them.
- **Survivorship bias** — Surveying only current users → missing the 90% who already churned (and their reasons)
- **Metric manipulation** — Optimizing for click-through rate → users click more but convert less (misaligned incentives)

## 3.8 ICIL Cross-Ref

Builds on: `01` (fundamentals — triangulation principle), `02` (qualitative — the "why" to this "how many")
Next: `04` (synthesis — combining qual + quant into insights)
Related: `data-viz/01` (visual encoding — how to visualize survey/analytics data), `performance/01` (Core Web Vitals — behavioral metrics), `testing-qa/05` (load testing — quantitative performance)

## ⚡ Action Checklist

- [ ] Before surveying: pilot with 5 people — fix confusing questions before mass launch
- [ ] Cap surveys at 10-15 questions; mix Likert scales + 1-2 open-ended
- [ ] Set up funnel analysis in your analytics tool — find the biggest drop-off
- [ ] For A/B tests: calculate sample size FIRST, pre-register hypothesis, test one variable
- [ ] Track usability metrics (SUS, task success rate) for benchmark comparisons over time
- [ ] Connect quantitative findings to qualitative research — numbers need stories
