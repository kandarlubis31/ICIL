# 🌐 05 — AI-Human Handoff Design

> 🔴 Advanced | Prereq: 02, 04 | ~11 min

The hardest problem in AI-native services: **when and how** does the AI agent hand off to a human? Bad handoffs = frustrated users + wasted agent time. Good handoffs = seamless escalation where the human has full context. This course covers five handoff patterns and the escalation architecture.

---

## 5.1 The Escalation Ladder

```
      ┌─────────────────────────────────────────┐
      │  LEVEL 5: CRISIS                         │
      │  Immediate human takeover. Agent silent.  │
      │  Trigger: safety, legal, threat detected  │
      ├─────────────────────────────────────────┤
      │  LEVEL 4: COMPLEX                         │
      │  Agent tries, then escalates with context │
      │  Trigger: multi-step, high-stakes, emotion│
      ├─────────────────────────────────────────┤
      │  LEVEL 3: UNCERTAIN                       │
      │  Agent suggests, human confirms           │
      │  Trigger: confidence < threshold          │
      ├─────────────────────────────────────────┤
      │  LEVEL 2: ROUTINE                         │
      │  Agent handles, logs for human review     │
      │  Trigger: known patterns, high confidence │
      ├─────────────────────────────────────────┤
      │  LEVEL 1: FULLY AUTOMATED                 │
      │  Agent completes end-to-end, no human     │
      │  Trigger: deterministic, 99%+ confidence  │
      └─────────────────────────────────────────┘
```

## 5.2 Five Handoff Patterns

| Pattern | How It Works | Best For |
|---------|-------------|----------|
| **Confidence Threshold** | Escalate when confidence < X% | Factual queries (X=70% for general, 95% for medical) |
| **Warm Transfer** | Agent briefs human privately, THEN merges | Complex issues needing seamless transition |
| **Approval Gate** | Agent drafts action, human approves before execution | Irreversible actions (payments, deletions) |
| **Asynchronous Audit** | Agent acts; human reviews batch later | Low-risk, high-volume (triage, categorization) |
| **Agent-in-the-Loop** | Human handles; agent suggests responses in real-time | Live chat, complex sales |

## 5.3 Warm Transfer Protocol

```js
function warmTransfer(agentContext, humanAgent) {
  const brief = {
    intent: agentContext.detectedIntent,
    entities: agentContext.extractedEntities,
    actionsTaken: agentContext.actionsSoFar,
    confidence: agentContext.confidenceScore,
    reasonForEscalation: agentContext.escalationReason,
    customerSentiment: agentContext.sentimentScore,
    suggestedResponse: agentContext.draftResponse
  };
  // Human sees brief BEFORE entering the conversation
  return { action: "ESCALATE", brief, instruction: "Review brief then join" };
}
```

## 5.4 Anti-Patterns

- **Bare handoff** — transferring without context (user must repeat everything)
- **No confidence threshold** — agent never escalates (or escalates everything)
- **Human bottleneck** — every query routes through human (defeats automation purpose)

## 5.5 ICIL Cross-Ref

Use with: `conversational-ui/05` (error recovery), `aksesibilitas/07` (inclusive design), `kognisi/05` (decision heuristics)

## ⚡ Action Checklist

- [ ] Set confidence thresholds per domain (general ≠ medical ≠ financial)
- [ ] Implement warm transfer: ALWAYS brief the human before merging
- [ ] Use approval gates for irreversible actions (delete, pay, publish)
- [ ] Track escalation rate — target 10-15% (higher = poor agent calibration)
- [ ] Test: if agent escalates, does the human have everything they need?
