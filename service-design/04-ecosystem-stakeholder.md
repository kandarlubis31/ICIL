# 🌐 04 — Ecosystem & Stakeholder Architecture

> 🟡 Intermediate | Prereq: 02 | ~9 min

Services don't exist in isolation — they're embedded in **ecosystems** of actors (human, AI, system, partner). Mapping the ecosystem reveals dependencies, power dynamics, and hidden bottlenecks invisible in a blueprint alone.

---

## 4.1 Actor Map (Who Does What)

```
                    ┌─────────────┐
                    │  CUSTOMER   │
                    └──────┬──────┘
           ┌───────────────┼───────────────┐
           │               │               │
    ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
    │   FRONT-    │ │   DIGITAL   │ │   SUPPORT   │
    │   LINE STAFF│ │   SYSTEMS   │ │   PARTNERS  │
    └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
           │               │               │
    ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
    │  AI AGENT   │ │  DATABASE   │ │ 3RD-PARTY   │
    │  (chatbot)  │ │  (orders)   │ │  (shipping) │
    └─────────────┘ └─────────────┘ └─────────────┘

  Lines = information flow. Arrows = value exchange direction.
```

## 4.2 Value Exchange Matrix

| From → To | What's Exchanged | Dependency Level |
|-----------|-----------------|-----------------|
| Customer → AI Agent | Query, context, feedback | High |
| AI Agent → Database | Read/write requests | Critical |
| Database → AI Agent | Structured data | Critical |
| AI Agent → Staff | Escalation brief, context | High |
| Staff → Customer | Empathy, complex resolution | Critical (MoT) |
| Partner API → System | Shipping status, tracking | Medium |

```js
function mapDependencies(actors) {
  return actors.map(a => ({
    actor: a.name,
    provides: a.outputs,
    consumes: a.inputs,
    criticality: a.consumes.some(dep => dep.required) ? "CRITICAL" : "SUPPORTING",
    failureImpact: a.consumes.filter(d => d.required).length === 0
      ? "Degraded" : "Service Down"
  }));
}
```

## 4.3 Stakeholder Power/Interest Grid

```
         HIGH POWER
              │
  KEEP SATISFIED  │  MANAGE CLOSELY
  (Regulator,     │  (User, Payer,
   Legal)         │   Decision-maker)
  ────────────────┼─────────────────
  MONITOR         │  KEEP INFORMED
  (Competitor)    │  (Support staff,
                  │   Partner API team)
              │
         LOW POWER
  LOW INTEREST           HIGH INTEREST
```

## 4.4 Anti-Patterns

- Mapping only visible actors (AI agents, databases, APIs are invisible but critical)
- No dependency mapping → surprise failures when downstream breaks
- Treating all stakeholders equally (power × interest matrix reveals priority)

## 4.5 ICIL Cross-Ref

Use with: `strategic-design/07` (stakeholder alignment), `design-systems/05` (governance)

## ⚡ Action Checklist

- [ ] Map ALL actors including invisible ones (AI, APIs, databases)
- [ ] Build value exchange matrix — who gives what to whom?
- [ ] Identify single points of failure (one actor = service dependency)
- [ ] Apply power/interest grid to prioritize stakeholder communication
- [ ] Test: if any ONE actor disappears, does the service still function?
