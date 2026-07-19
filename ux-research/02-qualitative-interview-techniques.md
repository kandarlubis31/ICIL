# 🔬 02 — Qualitative Interview Techniques

> 🟡 Intermediate | Prereq: 01 | ~9 min

The interview is the most powerful — and most misused — tool in UX research. A good interview uncovers needs users can't articulate. A bad interview confirms your biases with leading questions. The difference is technique: how you ask, how you listen, and how you avoid projecting your assumptions onto the participant.

---

## 2.1 Interview Types

| Type | Purpose | Duration | N |
|------|---------|----------|---|
| **Semi-structured** | Core questions + flexibility to follow threads | 45-60 min | 5-8 |
| **Contextual inquiry** | Observe work in real environment | 2-4 hours | 4-6 |
| **Diary study** | Capture experiences over time in-the-moment | 1-4 weeks | 10-20 |
| **Focus group** | Group dynamics, shared experiences | 90 min | 6-10 per group |
| ** Intercept** | Brief, in-context capture at point of experience | 5-10 min | 20-50 |

> **Default choice:** Semi-structured interviews with 5-8 participants. Covers most discovery needs. Use contextual inquiry for complex workflows, diary studies for longitudinal behavior.

## 2.2 The Interview Script Structure

```
WARMUP (5 min)
  → Build rapport, explain purpose, get consent
  → "Tell me about your role and how you use [domain]"

GRAND TOUR (10 min)
  → Broad understanding of their world
  → "Walk me through the last time you [did task]"
  → Listen for vocabulary, pain points, workarounds

DEEP DIVE (30 min)
  → Focus on specific area of interest
  → Follow up on things they mentioned in grand tour
  → "You mentioned X — tell me more about that"

WRAP-UP (5 min)
  → "Is there anything I should have asked but didn't?"
  → Thank + compensation logistics
```

## 2.3 Question Types — Good vs Bad

| ❌ Bad (leading/yes-no) | ✅ Good (open-ended/neutral) |
|--------------------------|---------------------------|
| "Do you think this feature is useful?" | "How would you use this in your workflow?" |
| "Is the interface confusing?" | "Tell me about your experience with the interface" |
| "Would you pay for this?" | "Walk me through how you currently solve this problem and what it costs you" |
| "What's your favorite feature?" | "Which features do you use most, and why?" |
| "Don't you agree that...?" | "What are your thoughts on...?" |

### The 5 Core Interview Questions

```
1. "Tell me about the last time you [did task]."
   → Gets concrete recent experience, not abstract opinions

2. "Walk me through your process for [activity]."
   → Reveals actual workflow, tools, pain points

3. "What's the hardest part about [activity]?"
   → Directly surfaces pain points without leading

4. "Can you tell me more about that?"
   → The follow-up probe. Use liberally. Most valuable question.

5. "Is there anything I should have asked about but didn't?"
   → Catches things you didn't think to ask. Surprising insights.
```

## 2.4 Active Listening Techniques

| Technique | How | Why |
|-----------|-----|-----|
| **Echo** | Repeat their last 2-3 words as a question | Encourages elaboration without biasing |
| **Silence** | Wait 3-5 seconds after they stop | They often continue with the real insight |
| **Neutral acknowledgment** | "Mm", "I see", nod | Shows you're listening without validating content |
| **Contrast probe** | "How is that different from [alternative]?" | Clarifies without assuming |
| **Concrete probe** | "Can you give me a specific example?" | Moves from abstract to real |

> **The 5-second rule:** After the participant finishes speaking, count to 5 silently. In 80% of cases, they'll add the most valuable detail during that silence. Most interviewers rush to fill it.

## 2.5 Avoiding Bias

| Bias | How It Shows Up | Fix |
|------|----------------|-----|
| **Leading questions** | "Don't you think X is better?" | Use neutral phrasing: "What are your thoughts on X?" |
| **Confirmation bias** | Only asking about things that confirm your hypothesis | Write your hypothesis, then write questions that could *disprove* it |
| **Social desirability** | Participants say what they think you want to hear | Ask about past behavior, not future intentions ("Tell me about the last time..." not "Would you...") |
| **Recency bias** | Last thing they did dominates the interview | Ask about multiple instances, compare them |
| **Interviewer effect** | You unconsciously react differently to different demographics | Standardize script, record + review your own behavior |

## 2.6 Contextual Inquiry (the master method)

```
TRADITIONAL INTERVIEW:     CONTEXTUAL INQUIRY:
  "Tell me about X"          [Watch them actually do X]
  → What they REMEMBER       → What they ACTUALLY DO
  → Rationalized             → Raw, real-time
  → 1 hour                   → 2-4 hours in their environment

FOUR PRINCIPLES:
  1. Context     → Go to their workplace/home, don't bring them to yours
  2. Partnership → They're the expert, you're the apprentice
  3. Interpretation → Share your understanding, let them correct it
  4. Focus       → Stay on the specific activity you're studying
```

> **Key insight:** What people *say* they do and what they *actually do* differ dramatically. Contextual inquiry reveals the workarounds, the post-it notes, the "I normally don't do it this way but..." moments that interviews miss.

## 2.7 AI-Augmented Interviewing (2026)

| Tool/Approach | How It Works | Use Case |
|---------------|-------------|----------|
| **AI-moderated interviews** | AI agent conducts adaptive follow-up interviews at scale (Perspective AI, Intergreat) | Run 50-100 interviews in days instead of months |
| **Auto-transcription + coding** | AI transcribes and auto-tags themes (Dovetail, Marvin, Notably) | Save 10+ hours of manual coding per study |
| **Real-time analysis** | AI surfaces patterns as interviews happen | Identify saturation (when no new themes emerge) earlier |

> **Limitation:** AI-moderated interviews lack human rapport-building. They're excellent for breadth (many participants) but poor for depth (emotional nuance, trust-building). Triangulate AI-moderated breadth with human-moderated depth.

## 2.8 Anti-Patterns

- **Yes/no questions** — "Do you like this feature?" → Use "Tell me about your experience with this feature"
- **Future hypotheticals** — "Would you use this if we built it?" → People can't predict future behavior. Ask about past behavior instead.
- **Talking too much** — The interviewee should talk 80% of the time. If you're talking > 20%, you're lecturing, not interviewing.
- **Not recording** — Relying on memory → confirmation bias. Always record (with consent) and transcribe.
- **No follow-up probes** — Sticking rigidly to script → miss the gold that emerges in tangents

## 2.9 ICIL Cross-Ref

Builds on: `01` (fundamentals — research process context)
Next: `03` (quantitative methods — the complement to qualitative), `04` (synthesis — what to do with interview data)
Related: `kognisi/04` (memory — why recall is unreliable, contextual inquiry is better), `ux-psikologi/02` (cognitive biases — interview bias sources)

## ⚡ Action Checklist

- [ ] Write a semi-structured script: warmup → grand tour → deep dive → wrap-up
- [ ] Check every question: is it open-ended? Could it disprove your hypothesis?
- [ ] Practice the 5-second silence rule — don't rush to fill pauses
- [ ] Ask about PAST behavior, not future intentions ("Tell me about the last time...")
- [ ] Record + transcribe every interview (with consent) — never rely on memory
- [ ] For AI-moderated interviews: triangulate with at least 3 human-moderated depth interviews
