# 🔬 06 — Usability Testing & Evaluation

> 🟡 Intermediate | Prereq: 01 | ~9 min

Usability testing is the most common evaluative research method — you put a real user in front of your design and watch them try to complete tasks. It reveals the gap between what you *designed* and what users *experience*. Even 5 users will expose 85% of usability problems. The trick is testing early, testing often, and knowing what to look for.

---

## 6.1 Usability Test Types

| Type | How | When | Cost |
|------|-----|------|------|
| **Moderated (in-person)** | Researcher sits with participant, observes + probes | Early prototypes, complex flows, need to understand *why* | $150-300/participant |
| **Moderated (remote)** | Video call + screen share (Zoom, Google Meet) | Same as in-person, broader geography | $100-200/participant |
| **Unmoderated** | Platform records user completing tasks alone (Maze, UserTesting, Lyssna) | Later prototypes, clear tasks, need scale (20-50 users) | $20-50/participant |
| **Guerrilla** | Intercept people in coffee shop / public, quick 10-min test | Early concept, zero budget, quick gut check | $10 + coffee |

## 6.2 Test Plan Template

```
TEST PLAN
═══════════════════════════════════════════════════
Research question: Can users complete the checkout flow without errors?
Prototype: Figma clickable prototype v3 (checkout → payment → confirmation)
Participants: 5 (3 new users, 2 returning users)
Duration: 45 minutes per session

TASKS (written as goals, NOT step-by-step instructions):
  Task 1: "You want to buy a $30 t-shirt. Show me how you'd do that."
  Task 2: "You have a discount code 'SAVE10'. Apply it to your order."
  Task 3: "You realize you ordered the wrong size. Change it to Medium."

METRICS:
  - Task success rate (completed / attempted)
  - Time on task
  - Error count per task
  - Severity rating for each issue (1=cosmetic, 2=minor, 3=major, 4=critical)

MODERATOR GUIDE:
  - Read task, let user attempt without help
  - Only intervene if stuck for 2+ minutes (note as critical issue)
  - Ask: "What were you expecting to happen there?"
  - Ask: "On a scale of 1-7, how difficult was that task?"
```

> **Critical rule:** Give users the *goal*, not the *steps*. "Buy a t-shirt" is a task. "Click the cart icon, then click checkout" is a tutorial — it tests nothing.

## 6.3 Moderation Techniques

| Technique | When | How |
|-----------|------|-----|
| **Think-aloud** | Most moderated tests | "Tell me what you're thinking as you do this" — reveals mental model |
| **Retrospective** | When think-aloud disrupts flow | After task: "Walk me through what you just did and why" |
| **Concurrent probing** | When you need real-time insight | "I noticed you hesitated there — what were you thinking?" |
| **Retrospective probing** | Post-task deep dive | "You clicked X then went back — what made you change your mind?" |
| **Silent observation** | When think-aloud changes behavior too much | Watch + take notes; probe after |

```
THE 3 PROBES (use after every task):
  1. "What were you expecting to happen?"     → reveals mental model gap
  2. "How difficult was that? (1-7)"          → quantifies perceived difficulty
  3. "What would have made that easier?"       → surfaces design solutions
```

## 6.4 Identifying & Rating Usability Issues

```
SEVERITY RATING SCALE:
  4 — CRITICAL:   User cannot complete task. Complete blocker.
  3 — MAJOR:      User completes task but with significant struggle/errors.
  2 — MINOR:      User completes task with mild confusion/delay.
  1 — COSMETIC:   User completes task easily; minor aesthetic issue.
  0 — NON-ISSUE:  Observed behavior that isn't actually a problem.

ISSUE LOG TEMPLATE:
  Issue: "Users couldn't find the 'Apply Discount' field"
  Severity: 3 (MAJOR)
  Frequency: 4/5 participants experienced this
  Task: Task 2 (Apply discount code)
  Evidence: "P01 searched for 90 sec, P03 asked 'where do I put the code?'"
  Root cause: Discount field is below the fold, not near payment summary
  Recommendation: Move discount input above payment summary, add visual cue
```

## 6.5 Heuristic Evaluation (expert review, no users needed)

```
WHEN: Quick assessment before user testing — catch obvious issues first.
HOW: 2-3 evaluators independently review against Nielsen's 10 heuristics.

NIELSEN'S 10 HEURISTICS:
  1. Visibility of system status     → Does the user know what's happening?
  2. Match real world                → Does it use familiar language/concepts?
  3. User control & freedom          → Can users undo/cancel?
  4. Consistency & standards         → Same action = same UI everywhere?
  5. Error prevention                → Are errors prevented before they happen?
  6. Recognition over recall         → Are options visible, not hidden?
  7. Flexibility & efficiency        → Are there shortcuts for power users?
  8. Aesthetic & minimalist design   → Is extraneous info removed?
  9. Error recovery                  → Are error messages helpful?
  10. Help & documentation           → Is help available when needed?

OUTPUT: List of issues with heuristic violated + severity rating
→ Prioritize: fix severity 3-4 before user testing; user test validates 1-2 fixes
```

> **Heuristic eval ≠ usability test.** Heuristic eval catches design issues (experts spot problems users won't articulate). Usability testing catches real-world friction (users hit problems experts didn't predict). Do both — they're complementary.

## 6.6 Unmoderated Testing at Scale (2026)

```ts
// Unmoderated test setup (Maze, UserTesting, Lyssna)
interface UnmoderatedTestConfig {
  tasks: {
    instruction: string;      // "Complete a purchase of any item"
    successCondition: string; // "User reaches order confirmation page"
    timeLimit?: number;       // seconds
  }[];
  targetAudience: {
    demographics: Record<string, string>;
    screenerQuestions: { question: string; correctAnswer: string }[];
  };
  sampleSize: number;         // 20-50 for statistical confidence
  postTaskQuestions: string[];// "How difficult was that? (1-7)"
  postTestQuestions: string[];// "What was the most frustrating part?"
}

// Advantages:
// - 50 users in 2 days (vs 5 users in 2 weeks moderated)
// - Behavioral metrics (click paths, time, drop-off) captured automatically
// - Cost: $500-1000 total vs $750-1500 for 5 moderated sessions

// Limitations:
// - No probing (can't ask "why did you do that?")
// - No rapport building (less depth)
// - Technical issues (user's mic fails → lost session)
```

## 6.7 AI-Augmented Usability Testing (2026)

| Capability | How It Works |
|------------|-------------|
| **AI session analysis** | Auto-flags moments of frustration (repeated clicks, backtracking, silence) |
| **Auto-generated highlight reels** | AI clips key usability issues across sessions → 5-min summary video |
| **Real-time issue detection** | AI alerts: "4 of 5 users struggled on step 3 — investigate" |
| **AI-moderated tests** | AI agent runs adaptive usability test with follow-up questions |
| **Predictive usability scoring** | AI estimates usability scores from click patterns before human review |

## 6.8 Anti-Patterns

- **Testing too late** — usability testing on a shipped product = expensive to fix. Test on prototypes.
- **Leading the user** — "Click the blue button" → tests obedience, not usability. Give goals, not steps.
- **Helping too early** — User stuck for 20 seconds → moderator says "try clicking here." You just destroyed the data. Wait 2 minutes.
- **Only testing happy path** — "Buy one item" works fine. But what about returns? Errors? Edge cases?
- **N=1 conclusions** — One user struggled → "The design is broken!" Maybe they were an outlier. Need 5+ to identify patterns.
- **No severity rating** — "We found 20 issues" → which ones matter? Always rate severity + frequency.

## 6.9 ICIL Cross-Ref

Builds on: `01` (fundamentals — evaluative research), `03` (quantitative — usability metrics like SUS)
Next: `07` (AI-augmented research — the frontier methods)
Related: `improvement/03` (heuristic evaluation — same Nielsen heuristics applied as audit), `aksesibilitas/01` (WCAG — accessibility testing overlaps with usability), `testing-qa/04` (E2E testing — automated usability regression), `design-patterns/06` (feedback states — usability of loading/error/success)

## ⚡ Action Checklist

- [ ] Write tasks as GOALS ("buy a t-shirt"), not steps ("click cart, click checkout")
- [ ] Test 5 users minimum (moderated) or 20-50 (unmoderated) — N=1 is anecdote, not data
- [ ] Use think-aloud protocol: "Tell me what you're thinking as you do this"
- [ ] Wait 2 minutes before helping a stuck user — the struggle IS the data
- [ ] Log every issue with: severity (0-4) + frequency (N/total) + root cause + recommendation
- [ ] Run heuristic evaluation BEFORE user testing — fix obvious issues, test the rest
- [ ] Test edge cases, not just happy path: errors, returns, empty states, slow network
