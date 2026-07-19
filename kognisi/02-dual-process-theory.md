# 🧠 02 — Dual Process Theory

> **Level: 🟡 Intermediate** | Prerequisite: 01 | Est. reading: 8 min

Users have two thinking systems. Design for both — because the fast one makes 95% of everyday decisions.

---

## 2.1 System 1 vs System 2

| Trait | System 1 (Fast) | System 2 (Slow) |
|-------|----------------|-----------------|
| **Speed** | Instant, automatic | Deliberate, effortful |
| **Energy** | Low cognitive load | High cognitive load |
| **Usage** | 95% of daily decisions | 5% — complex problems |
| **Triggered by** | Familiarity, patterns | Novelty, conflict, math |
| **UI role** | Scanning, recognition | Reading, comparing, calculating |

---

## 2.2 When Users Use Each System

| Scenario | System | Design Implication |
|----------|--------|-------------------|
| Browsing familiar app | 1 — auto-pilot | Keep layout consistent; muscle memory matters |
| Filling checkout form | 1 → 2 shift | Auto-fill known fields; only engage S2 for payment |
| Comparing 3 subscription tiers | 2 — analysis | Highlight differences; use comparison table |
| Error recovery (404) | 2 — problem-solving | Clear explanation + single clear next action |
| Reading TOS / legal | 2 — reading | Summarize key points visually (don't force reading) |

---

## 2.3 Cognitive Biases from Dual Process

| Bias | System | What it means for UI |
|-------|--------|---------------------|
| **Anchoring** | S1 | First price seen sets expectation — show high anchor first |
| **Framing** | S1 | "Save $10/mo" > "$120/year" — highlight gains not losses |
| **Default effect** | S1 | Users stick with pre-selected — make defaults the best option |
| **Confirmation bias** | S1 | Users seek info confirming beliefs — show counter-evidence gently |
| **Overconfidence** | S2 | Users overestimate their understanding — test with real tasks |

---

## 2.4 Designing for System Transitions

| Transition | UX Pattern | Example |
|------------|-----------|---------|
| S1 → S2 | **Interrupt gently** | "Are you sure?" dialogs on destructive actions |
| S2 → S1 | **Automate pattern recognition** | Saved payment methods; recent files |
| Prevent S2 overload | **Reduce cognitive friction** | Progress bars, steppers, comparison tools |
| Keep S1 engaged | **Consistency + familiarity** | Standard icons, predictable navigation |

---

## 2.5 Practical Patterns

```
S1 OPTIMIZED (familiar users):
✅ Hamburger menu — icon recognized instantly
✅ Swipe gestures — muscle memory
✅ Color-coded statuses — green=good, red=error

S2 SUPPORTED (complex tasks):
✅ Filterable comparison tables
✅ Calculator / preview tools
✅ Readable error messages with next steps
```

---

## ⚡ Action Checklist

- [ ] Identify 3 UI moments where users shift S1→S2; smooth each transition
- [ ] Audit defaults: are all pre-selected options truly best for users?
- [ ] Test with 5 new users: where do they pause/hesitate? (S2 activation point)
- [ ] Remove one forced S2 task — convert to S1 via recognition or automation
