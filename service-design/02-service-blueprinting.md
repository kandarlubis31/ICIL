# 🌐 02 — Service Blueprinting

> 🟡 Intermediate | Prereq: 01 | ~10 min

The service blueprint is the **MRI of a service** — it visualizes everything: what the customer sees AND the invisible operations behind it. Unlike a journey map (emotions), blueprints show structure. For AI agents, it reveals where automation fits.

---

## 2.1 The Five Layers

| Layer | What It Shows | AI Agent Relevance |
|-------|--------------|-------------------|
| **Physical Evidence** | What customer encounters (email, UI, receipt) | Output surface — what agent generates |
| **Customer Actions** | Steps the customer takes | Trigger events that activate the agent |
| **Frontstage** | Visible employee/tech interactions | Agent-to-customer interaction surface |
| **Backstage** | Invisible actions supporting frontstage | Agent logic, API calls, data retrieval |
| **Support Processes** | Infrastructure, training, compliance | Model training, monitoring, guardrails |

## 2.2 Blueprint Structure

```
LINE OF INTERACTION ────────────────────
  Customer: Browse → Search → Compare → Purchase → Track
LINE OF VISIBILITY ────────────────────
  Frontstage:  [Search UI]  [Results]  [Checkout]  [Tracking page]
LINE OF INTERNAL INTERACTION ────────────
  Backstage:   Index products  Query DB  Process payment  Update order
  Support:     [Search engine] [Database] [Payment gateway] [Logistics API]
```

## 2.3 AI-Native Blueprint Additions

| Standard Blueprint | AI-Native Addition |
|-------------------|-------------------|
| Employee actions | Agent decision points (confidence thresholds) |
| Support systems | Model training pipelines, vector DB |
| Physical evidence | Generated text, AI decisions, reasoning traces |
| Wait times | Agent processing time, token latency |

```js
function mapAILane(blueprint, aiAgent) {
  blueprint.addLane("AI_AGENT", {
    triggers: aiAgent.triggerEvents,
    decisions: aiAgent.decisionPoints,
    handoff: aiAgent.escalationRules,
    evidence: aiAgent.outputTypes,
    dependencies: aiAgent.apisRequired
  });
  return blueprint;
}
```

## 2.4 Anti-Patterns

- Building the frontstage before the backstage is mapped
- Blueprinting only digital channels (physical + human matter)
- No failure paths (every line = happy path only)

## 2.5 ICIL Cross-Ref

Use with: `design-patterns/03` (navigation), `conversational-ui/03` (chat patterns), `layout/05` (responsive)

## ⚡ Action Checklist

- [ ] Map all 5 layers before designing any screen
- [ ] Identify LINE OF VISIBILITY — what's hidden from customer?
- [ ] Add AI agent as a dedicated lane with decision points
- [ ] Map failure paths (what happens when backstage fails?)
- [ ] Test: can a new team member understand the full service from the blueprint?
