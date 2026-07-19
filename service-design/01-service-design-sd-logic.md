# 🌐 01 — Service Design & S-D Logic

> 🟢 Beginner | Prereq: — | ~8 min

Service design = orchestrating people, props, processes into coherent experiences. **S-D Logic** (Vargo & Lusch, 2004) = the theoretical backbone: value is co-created in use, not embedded in products.

---

## 1.1 Two Logics

| | Goods-Dominant (G-D) | Service-Dominant (S-D) |
|---|---|---|
| Value | Embedded in product | Co-created in use |
| Customer | Passive consumer | Active resource integrator |
| Unit of exchange | Goods for money | Service for service |
| Role of AI | Tool (automation) | Actor (resource integration) |
| Success metric | Units shipped | Outcomes enabled |

## 1.2 Foundational Premises & Axioms

S-D Logic has evolved to **11 Foundational Premises (FPs)**. Five of these have been elevated to **Axiom** status (cannot be derived from other premises):

| # | Axiom | Implication for AI Agent |
|---|---|---|
| FP1 | Service is the fundamental basis of exchange | Design the service, not just the interface |
| FP6 | Value is co-created by multiple actors | Map ALL actors (human, AI, system) |
| FP9 | All actors are resource integrators | Your AI agent IS an actor — design its role |
| FP10 | Value is always uniquely determined by the beneficiary | Same output ≠ same value for different users |
| FP11 | Value co-creation is coordinated through institutions | Rules, norms, compliance shape service logic |

## 1.3 Service Design ≠ UX Design

```
SINGLE TOUCHPOINT?              MULTI-TOUCHPOINT + BACKSTAGE?
  → UX Design (this screen)       → Service Design (the whole system)
  → Use: design-patterns/         → Use: service-design/
  → Use: layout/                  → Use: improvement/02 (audit)
```

```js
function scopeCheck(problem) {
  if (problem.channels.length > 1 || problem.hasBackstageOps) {
    return { domain: "SERVICE_DESIGN", action: "Blueprint the full service first" };
  }
  return { domain: "UX_DESIGN", action: "Design the interface" };
}
```

## 1.4 Anti-Patterns

- **Screen-first design** — designing UI before mapping the service flow
- **Ignoring backstage** — invisible operations WILL break visible touchpoints
- **Feature = Value** fallacy — value is the outcome enabled, not the feature count

## 1.5 ICIL Cross-Ref

Use with: `strategic-design/03` (strategy), `improvement/02` (audit), `kognisi/05` (decision-making)

## ⚡ Action Checklist

- [ ] Map ALL touchpoints before designing any single screen
- [ ] Identify actors behind each touchpoint (human, AI, system, API)
- [ ] Frame as "value co-creation" not "feature delivery"
- [ ] Check backstage constraints won't break frontstage promises
- [ ] Validate user perceives value-in-context, not just feature availability
