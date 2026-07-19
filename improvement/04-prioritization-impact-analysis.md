# 🔧 04 — Prioritization & Impact Analysis

> 🟡 Intermediate | Prereq: 02, 03 | ~3 min

After audit → dozens of issues. Fix in right order: what BLOCKS users before what DELIGHTS users.

---

## 4.1 Impact-Effort Matrix

```
HIGH IMPACT:  Quick Wins (do 1st)  |  Major Projects (plan)
LOW IMPACT:   Fill-ins (when bored)  |  Time Sinks (skip)
              LOW EFFORT               HIGH EFFORT
```

```javascript
function categorize(impact, effort) { // 1-5 scale
  if (impact >= 4 && effort <= 2) return "QUICK_WIN";
  if (impact >= 4 && effort >= 3) return "MAJOR_PROJECT";
  if (impact <= 3 && effort <= 2) return "FILL_IN";
  return "TIME_SINK";
}
```

---

## 4.2 ICE Framework (Simpler)

```
ICE = Impact(1-10) × Confidence(1-10) × Ease(1-10)
→ ICE >500 = Do now | 200-500 = This sprint | <100 = Skip
```

---

## 4.3 RICE Framework (More Precise)

```
RICE = (Reach × Impact × Confidence) / Effort
  Reach: users affected | Impact: 0.25/1/3 | Confidence: 0.5/0.8/1.0 | Effort: person-months
```

---

## 4.4 MoSCoW Method

| Category | Action |
|----------|--------|
| **Must** (non-negotiable) | WCAG, working forms, keyboard access |
| **Should** (important) | Loading states, dark mode, consistent spacing |
| **Could** (nice) | Micro-interactions, page transitions, skeleton screens |
| **Won't** (out of scope) | Full rebrand, new features, tech migration |

---

## 4.5 ICIL Priority Protocol

```
TIER 1 — CRITICAL: A11y blockers, broken functionality, security → aksesibilitas/, design-patterns/
TIER 2 — IMPORTANT: Missing feedback, weak hierarchy, inconsistency → design-patterns/, tipografi/
TIER 3 — ENHANCEMENT: Micro-interactions, transitions, animations → animasi/
TIER 4 — POLISH: Spacing, color harmony, microcopy tone → warna/, ux-writing/
```

> Effort estimate: Low=minutes (CSS value), Medium=hours (form validation), High=days (nav redesign)

---

## ⚡ Action Checklist
- [ ] Categorize every issue: Quick Win / Major / Fill-in / Time Sink
- [ ] Fix Quick Wins first (high impact, low effort = fast ROI)
- [ ] Apply MoSCoW: Must → Should → Could → Won't
