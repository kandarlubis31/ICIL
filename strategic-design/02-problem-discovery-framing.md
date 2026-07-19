# 🧭 02 — Problem Discovery & Strategic Framing

> **Level: 🟢 Beginner** | Prerequisite: 01 | Est. reading time: 14 min

Framing the right problem is harder than solving it. This course teaches three powerful frameworks for problem discovery: Jobs-to-be-Done (what users are really trying to accomplish), Amazon's Working Backwards (starting from the customer outcome), and How Might We (transforming problems into opportunities).

---

## 2.1 Why Problem Framing Matters More Than Problem Solving

```
ALBERT EINSTEIN: "If I had an hour to solve a problem,
I'd spend 55 minutes thinking about the problem and
5 minutes thinking about solutions."

WRONG FRAMING:                      RIGHT FRAMING:
"We need a faster checkout"         "Users abandon carts because
                                     they don't trust our payment
                                     security indicators"

→ Builds a faster checkout flow     → Adds trust signals (badges,
→ Cart abandonment stays 60%          reviews, SSL indicator)
                                     → Cart abandonment drops to 25%
```

> **The framing trap**: Teams spend 90% of effort *solving* problems and only 10% *framing* them. The result? Beautiful solutions to the wrong problems.

---

## 2.2 Jobs-to-be-Done (JTBD)

**Tony Ulwick's insight (1990), popularized by Clayton Christensen (2003)**: People don't buy products — they *hire* them to do a job.

```
THE JTBD CORE FORMULA:

  When [SITUATION],
  I want to [MOTIVATION],
  so I can [EXPECTED OUTCOME].

EXAMPLES:

  When I'm about to miss a meeting,
  I want to quickly notify my team,
  so I can maintain professional reliability.

  When I'm cooking and realize I'm missing an ingredient,
  I want to get it delivered within 30 minutes,
  so I can finish dinner without leaving the stove.
```

### The JTBD Forces Diagram

```
    │         CURRENT BEHAVIOR             │
    │  (What they do now — the status quo) │
    ┌──────────▼──┐    ┌──────▼──────────┐
    │  PUSH of    │    │   PULL of the   │
    │  the old    │    │   new solution  │
    │  (frustration│    │   (attraction)  │
    │   with now) │    │                 │
              ┌───────▼────────┐
              │   ANXIETY of   │
              │   the new      │  ← HABITS of the old
              │   (what if it  │  ← (inertia, comfort)
              │    doesn't     │
              │    work?)      │

  For users to SWITCH, the push + pull must overcome anxiety + habits.
```

### JTBD for AI Agents

```javascript
// AI Agent: Run a Jobs-to-be-Done analysis
function runJTBD(userPrompt, context) {
  // Step 1: Identify the functional job
  const functional = {
    situation: extractSituation(userPrompt),
    motivation: extractMotivation(userPrompt),
    outcome: extractDesiredOutcome(userPrompt),
  };

  // Step 2: Map the emotional & social jobs
  const emotional = {
    currentFeeling: "frustrated", // or anxious, overwhelmed, confused
    desiredFeeling: "confident",  // or relieved, empowered, clear
  };

  const social = {
    currentPerception: "looks unprofessional",
    desiredPerception: "looks competent and on top of things",
  };

  // Step 3: Identify switching forces
  const forces = {
    push: "Current process takes 5 steps and loses data",
    pull: "New process takes 1 step and auto-saves",
    anxiety: "Will I lose my existing data during migration?",
    habit: "I've used the old flow for 2 years — muscle memory",
  };

  // Step 4: The JTBD statement
  return {
    jobStatement: `When ${functional.situation}, I want to ${functional.motivation} so I can ${functional.outcome}.`,
    emotionalJob: `Currently feel ${emotional.currentFeeling}, want to feel ${emotional.desiredFeeling}.`,
    socialJob: `Currently seen as ${social.currentPerception}, want to be seen as ${social.desiredPerception}.`,
    switchingForces: forces,
    insight: forces.push + " " + forces.pull + " must overcome " + forces.anxiety + " and " + forces.habit,
  };
}
```

---

## 2.3 Amazon's Working Backwards (PR/FAQ)

Amazon's most famous internal process: **before writing a single line of code, write the press release.**

```
THE WORKING BACKWARDS PROCESS:

  1. Write the PRESS RELEASE (PR)
     → Announce the product as if it's launching TODAY
     → Focus on the CUSTOMER PROBLEM and how it's solved
     → Use plain language — your grandmother should understand

  2. Write the FAQ
     → Internal FAQ: Address tough questions from the team
     → External FAQ: Address questions customers will ask
     → If you can't answer a question → you haven't thought it through

  3. Review & Iterate
     → Leadership reviews the PR/FAQ (not a slide deck!)
     → If the document isn't compelling → the idea isn't ready
     → Iterate on the DOCUMENT, not the product
```

### PR/FAQ Template

```markdown
# [Product Name] — Press Release

## [Headline]
[A single sentence that a customer would understand and get excited about]

## Sub-headline
[1-2 sentences expanding on the headline]

## Summary Paragraph
[A concise 3-4 sentence summary of the product and its primary benefit]

## The Problem
[Describe the customer problem in plain language. Make the reader feel it.]

## The Solution
[How does this product solve that problem? What's the key innovation?]

## Customer Quote
[A fictional quote from a hypothetical happy customer]

## How to Get Started
[The simple path from discovery to first value — should be < 3 steps]

## Internal FAQ

### Q: Why is this worth building now?
[A: ...]

### Q: What's the riskiest assumption?
[A: ...]

### Q: What happens if nobody uses it?
[A: ...]

## External FAQ

### Q: How is this different from [competitor]?
[A: ...]

### Q: How much does it cost?
[A: ...]

### Q: Can I use it with my existing [tool/workflow]?
[A: ...]
```

> **The PR/FAQ forces clarity.** If you can't explain it in a press release, you can't build it.

---

## 2.4 How Might We (HMW)

Once you've framed the problem, transform it into **How Might We questions** — these open the door to solutions without prescribing them.

```
FROM PROBLEM TO HMW:

  PROBLEM STATEMENT:
  "Users abandon the signup flow at step 3 (phone verification)
   because the SMS code takes 30+ seconds to arrive."

  HOW MIGHT WE...

  HMW make verification instant?                        (speed focus)
  HMW allow users to start using the product            (bypass focus)
     before verification?
  HMW make the waiting experience enjoyable?            (UX focus)
  HMW verify identity without SMS codes?                (innovation focus)
  HMW give users confidence that the code WILL arrive?  (trust focus)

  Each HMW opens a DIFFERENT solution space.
```

### HMW Quality Checklist

| Good HMW | Bad HMW |
|----------|---------|
| "HMW make checkout feel secure for first-time buyers?" | "HMW improve the checkout?" (too vague) |
| "HMW reduce the 3-day onboarding to 10 minutes?" | "HMW make onboarding better?" (not specific) |
| "HMW let sellers upload 50 products at once?" | "HMW add more features?" (solution-biased) |

```
HMW FORMULA:

  HMW [action verb] + [specific user/context] + [desired outcome]?

  ── Action verb: reduce, increase, eliminate, enable, make
  ── User/context: "first-time buyers," "during checkout," "on mobile"
  ── Outcome: "feel secure," "complete in under 10 minutes"
```

---

## 2.5 Problem Space vs Solution Space

```
│                    PROBLEM SPACE                          │
│  ── What's wrong?                                        │
│  ── Who's affected?                                      │
│  ── Why does it matter?                                  │
│  ── What's the root cause?                               │
│  ── How do we know? (evidence)                           │
│  TOOLS: JTBD, 5 Whys, user interviews, data analysis     │
│  RULE: Stay here until you have a FALSIFIABLE problem    │
│        statement backed by evidence.                     │
│                    SOLUTION SPACE                         │
│  ── How might we solve it?                               │
│  ── What are the options?                                │
│  ── What's the simplest thing that works?                │
│  ── How will we know it worked?                          │
│  TOOLS: HMW, PR/FAQ, prototyping, A/B testing            │
│  RULE: Only enter here AFTER the problem is well-framed. │

  MISTAKE: "The page looks bad, let me redesign it"
  FIX: "What problem are users having on this page?
        Let me gather data before proposing solutions."
```

---

## 2.6 The Problem Discovery Flow for AI Agents

```javascript
// Complete problem discovery flow for AI agents
async function discoverAndFrame(rawPrompt) {
  // Step 1: Extract the stated need
  const statedNeed = extractRequest(rawPrompt);

  // Step 2: Run JTBD analysis
  const jtbd = runJTBD(rawPrompt, {});

  // Step 3: Identify assumptions
  const assumptions = [
    "The problem is what the user says it is",
    "The stated solution is the right solution",
    "The user represents the target audience",
    "The context is correctly understood",
  ];

  // Step 4: Challenge assumptions (inversion)
  const challenges = assumptions.map(a => ({
    assumption: a,
    challenge: `What if the OPPOSITE is true?`,
    risk: `If wrong, we'll build the wrong thing`,
  }));

  // Step 5: Generate How Might We questions
  const hmws = generateHMW(jtbd.problemStatement);

  // Step 6: Draft a PR/FAQ for the top HMW
  const prfaq = draftPRFAQ(hmws[0]);

  // Step 7: Return the complete discovery package
  return {
    originalRequest: rawPrompt,
    jtbd: jtbd.jobStatement,
    riskiestAssumptions: challenges,
    howMightWe: hmws,
    pressRelease: prfaq,
    recommendation: "Before building, test these assumptions with 5 users. Start with the PR/FAQ — if you can't write a compelling press release, the idea isn't ready.",
  };
}
```
