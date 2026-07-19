# 🧭 01 — Design Thinking & the Double Diamond

> **Level: 🟢 Beginner** | Prerequisite: — | Est. reading time: 13 min

Design Thinking is not a buzzword — it's a structured process for solving complex, human-centered problems. This course covers the Double Diamond framework (the most AI-agent-friendly design process), the core mindsets behind human-centered design, and how to apply each phase systematically.

---

## 1.1 What Design Thinking Actually Is

Design Thinking = a **human-centered problem-solving methodology** that alternates between divergent thinking (exploring possibilities) and convergent thinking (narrowing to decisions).

```
WHY IT MATTERS FOR AI AGENTS:

  Without Design Thinking:
  ── Jump straight to building features
  ── Solve symptoms, not root causes
  ── Build things nobody asked for

  With Design Thinking:
  ── First understand the real problem
  ── Explore multiple solutions before committing
  ── Test assumptions with real users
  ── Build things that actually matter
```

### The Core Mindsets

| Mindset | Meaning | AI Agent Application |
|---------|---------|---------------------|
| **Empathy** | Understand users deeply — their context, pain, goals | Before suggesting solutions, ask: "Who is this for? What's their real need?" |
| **Bias toward action** | Prototype and test instead of over-planning | Generate MVPs, not spec documents |
| **Radical collaboration** | Involve diverse perspectives | Cross-reference multiple ICIL faculties |
| **Iterate, iterate** | Never one-and-done — refine through cycles | Apply the improvement/ iterative approach |
| **Embrace ambiguity** | Comfortable with not knowing the answer yet | Explore the problem space before the solution space |

---

## 1.2 Why the Double Diamond (Not d.school 5-Stage)

Three major Design Thinking models exist:

| Model | Structure | Best For |
|-------|-----------|----------|
| **d.school (Stanford)** | Empathize → Define → Ideate → Prototype → Test | Workshops, human teams |
| **IDEO** | Inspiration → Ideation → Implementation | Creative agencies |
| **Double Diamond (UK Design Council)** | Discover → Define → Develop → Deliver | **AI agents** ← structured divergence/convergence |

```
THE DOUBLE DIAMOND:

   │  DISCOVER    │     │   DEVELOP    │
   │  (divergent) │     │  (divergent) │
   │  Explore the │     │  Generate    │
   │  problem     │     │  solutions   │
   │  space       │     │              │
          ▼                    ▼
      │ DEFINE  │          │ DELIVER │
      │(converge)│          │(converge)│

  Diamond 1 = THE RIGHT PROBLEM
  Diamond 2 = THE RIGHT SOLUTION
```

> **Why this works for AI agents**: The Double Diamond explicitly alternates between "explore many options" (divergent, what LLMs are naturally good at) and "narrow to the best" (convergent, what structured reasoning enables). This maps perfectly to AI agent workflows.

---

## 1.3 Diamond 1 — Discover & Define (Problem Space)

### Phase 1: DISCOVER (Divergent)

**Goal**: Understand the problem space deeply before proposing any solutions.

```
DISCOVERY ACTIVITIES:

  ┌─ User research            → Who are the users? What's their context?
  ├─ Stakeholder interviews   → What does success look like for the business?
  ├─ Competitive analysis     → What exists already? What's missing?
  ├─ Data analysis            → What does the quantitative data say?
  ├─ Journey mapping          → What's the current experience like?
  └─ Pain point identification → Where does it hurt the most?

  RULE: No solutions allowed in this phase. ONLY understanding.
```

### Phase 2: DEFINE (Convergent)

**Goal**: Synthesize discoveries into a clear, actionable problem statement.

```
DEFINITION OUTPUTS:

  ┌─ Problem statement        → "New users abandon onboarding at step 3
  │                              because they don't understand the value prop"
  ├─ How Might We questions   → "HMW make the value clear in the first 30 seconds?"
  ├─ User personas            → Who specifically has this problem?
  └─ Success criteria         → "Reduce step-3 dropoff from 40% to 15%"
```

### The Problem Statement Formula

```
[USER GROUP] experiences [PROBLEM] when [CONTEXT] because [ROOT CAUSE].
This leads to [NEGATIVE OUTCOME]. Solving this would [POSITIVE IMPACT].

EXAMPLE:
"First-time sellers on our marketplace experience confusion
when setting up their store because the setup wizard uses
merchant jargon they don't understand. This leads to 40%
dropoff at step 3 and $2M/month in lost GMV. Solving this
would recover ~$1.5M/month in new seller revenue."
```

---

## 1.4 Diamond 2 — Develop & Deliver (Solution Space)

### Phase 3: DEVELOP (Divergent)

**Goal**: Generate multiple possible solutions — quantity over quality.

```
IDEATION PRINCIPLES:

  1. DEFER JUDGMENT — Don't kill ideas too early
  2. GO FOR QUANTITY — 50 ideas > 5 ideas
  3. BUILD ON IDEAS — "Yes, AND..." not "Yes, BUT..."
  4. STAY VISUAL — Sketch, wireframe, flow diagram
  5. HEADLINE FIRST — Can you explain it in one sentence?

TECHNIQUES:
  ── Brainwriting (silent idea generation before discussion)
  ── Crazy 8s (8 sketches in 8 minutes)
  ── Worst Possible Idea (invert the problem → find insights)
  ── Analogous inspiration (how does [other industry] solve this?)
```

### Phase 4: DELIVER (Convergent)

**Goal**: Test, refine, and ship the best solution.

```
DELIVERY LOOP:

  │ PROTOTYPE│───→│   TEST   │───→│  LEARN   │
       ↑                               │
                   iterate

  PROTOTYPE: Build the smallest thing that tests your assumption
  TEST: Put it in front of real users (even 5 is enough)
  LEARN: What worked? What didn't? What surprised you?

  STOP when: You've tested your riskiest assumption
  DON'T STOP when: "It feels done" (that's polish, not validation)
```

---

## 1.5 The Double Diamond in Code

```javascript
// AI Agent: Double Diamond Decision Flow
function doubleDiamond(userRequest) {
  // ── DIAMOND 1: Problem Space ──

  // DISCOVER (divergent) — gather context
  const context = {
    userGroup: identifyUserGroup(userRequest),
    currentPain: extractPainPoints(userRequest),
    businessContext: extractBusinessContext(userRequest),
    existingSolutions: whatAlreadyExists(userRequest),
    constraints: identifyConstraints(userRequest),
  };

  // DEFINE (convergent) — synthesize into problem statement
  const problem = defineProblem(context);
  // "First-time sellers drop off at setup wizard step 3 (40%)
  //  because of merchant jargon confusion"

  if (!problem.isWellDefined) {
    return "Need more discovery. The problem is still ambiguous.";
  }

  // ── DIAMOND 2: Solution Space ──

  // DEVELOP (divergent) — generate options
  const solutions = generateSolutions(problem, { minCount: 10 });

  // DELIVER (convergent) — evaluate & select
  const ranked = solutions
    .map(s => ({
      solution: s,
      score: evaluateSolution(s, problem),
    }))
    .sort((a, b) => b.score - a.score);

  return {
    problem: problem.statement,
    topSolutions: ranked.slice(0, 3),
    recommendation: ranked[0],
    nextStep: "Prototype the top solution and test with 5 users",
  };
}
```

---

## 1.6 When NOT to Use Design Thinking

| Situation | Why Skip Design Thinking | What to Do Instead |
|-----------|-------------------------|-------------------|
| **Well-defined problem** (e.g., "fix this broken button") | Don't need discovery — just fix it | Go straight to solution |
| **Urgent crisis** (e.g., "site is down") | No time for discovery | Chaotic response (see Cynefin, course 06) |
| **Commodity feature** (e.g., "add standard login") | Best practice is already known | Use established patterns (`design-patterns/`) |
| **Regulatory compliance** (e.g., "GDPR cookie banner") | Requirements are fixed | Implement the requirements |
