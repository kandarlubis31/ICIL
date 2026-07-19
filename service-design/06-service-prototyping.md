# 🌐 06 — Service Prototyping

> 🟡 Intermediate | Prereq: 03 | ~9 min

Services are intangible — you can't click through a prototype of a shipping policy or a refund process. Service prototyping uses behavioral methods (Wizard of Oz, walkthroughs, role-play) to test service logic before building anything.

---

## 6.1 Three Prototyping Methods

| Method | How | Best For | Cost |
|--------|-----|----------|------|
| **Wizard of Oz (WoZ)** | Human simulates AI behind curtain | Testing AI service logic before code | Low |
| **Desktop Walkthrough** | Step through scenario on paper/model | Testing process flow, handoffs | Lowest |
| **Experience Prototyping** | Role-play the full service with props | Testing emotional moments, staff interactions | Medium |

## 6.2 Wizard of Oz Protocol

```
SETUP:
  1. Build a basic interface (no AI — just input/output boxes)
  2. Place a human "Wizard" behind the scenes
  3. Wizard receives user input → manually generates responses
  4. User believes they're talking to an AI

  TEST WHAT: Flow logic, tone, handoff timing, user expectations
  DON'T TEST: Response speed, accuracy (the wizard is human)

RUN:
  ┌──────────┐         ┌──────────┐         ┌──────────┐
  │  USER    │────────→│ INTERFACE│────────→│  WIZARD  │
  │  types   │         │  (basic) │         │  (human) │
  │  query   │←────────│          │←────────│ responds │
  └──────────┘         └──────────┘         └──────────┘

  KEY DATA: Where did the wizard NEED more context?
            Where did the user get confused by the AI response?
            What handoffs felt natural vs forced?
```

## 6.3 Riskiest Assumption Test

```js
function designWoZTest(serviceConcept) {
  const riskiestAssumption = serviceConcept.assumptions
    .sort((a, b) => (b.likelihood * b.impact) - (a.likelihood * a.impact))[0];

  return {
    assumption: riskiestAssumption.statement,
    testMethod: riskiestAssumption.type === "behavioral"
      ? "WIZARD_OF_OZ" : "DESKTOP_WALKTHROUGH",
    scenario: `Test: ${riskiestAssumption.scenario}`,
    passCriteria: riskiestAssumption.validationCriteria,
    wizardScript: riskiestAssumption.type === "behavioral"
      ? buildWizardScript(riskiestAssumption) : null
  };
}
```

## 6.4 Anti-Patterns

- Prototyping only screens (screens are evidence, not the service)
- Testing happy path only (failure paths reveal service weaknesses)
- WoZ with expert as wizard (wizard should match real AI capability level)

## 6.5 ICIL Cross-Ref

Use with: `strategic-design/01` (prototyping phase), `animasi/04` (micro-interactions), `design-patterns/06` (feedback states)

## ⚡ Action Checklist

- [ ] Identify the RISKIEST assumption — test that first
- [ ] Run WoZ before writing a single line of AI code
- [ ] Test failure paths (what if the AI misunderstands? what if it's too slow?)
- [ ] Measure: did the wizard need context they didn't have?
- [ ] Iterate the service logic, not the UI — fix what's broken in the flow
