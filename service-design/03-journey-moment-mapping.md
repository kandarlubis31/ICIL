# 🌐 03 — Journey & Moment Mapping

> 🟡 Intermediate | Prereq: 01, 02 | ~10 min

Journey mapping at the **service level** — not just a single app flow but the full cross-channel experience. Identifies **Moments of Truth** (MoT): the critical 5% of interactions that determine loyalty. For AI agents: map where automation helps vs hurts.

---

## 3.1 Service Journey vs UX Journey

| | UX Journey | Service Journey |
|---|---|---|
| Scope | Single app/product flow | Full cross-channel experience |
| Channels | Digital only | Digital + physical + human + phone |
| Timeframe | Minutes (one session) | Days/weeks (end-to-end) |
| Actors | User + interface | User + staff + systems + partners |
| Key artifact | Screen flow | Emotional arc + pain points + MoT |

## 3.2 The Emotional Arc

```
EMOTION
  😊 │     ╭──────╮                    ╭──
     │    ╱        ╲    ╭─╮          ╱
  😐 │───╱          ╲──╱  ╲────────╱
     │ ╱              ╲      ╲    ╱
  😞 │╱                ╲─────╲──╱
     └──────────────────────────────→ TIME
       Onboard  Search  Compare  Pay  Track  Support

  ▲ MoT               ▲ MoT              ▲ MoT (recovery)
  (first impression)  (trust: payment)   (service failure)
```

## 3.3 Pain Point Scoring

```js
function scorePainPoints(journey) {
  return journey.steps.map(step => ({
    step: step.name,
    score: (step.frequency * 2) + (step.severity * 3) + (step.frustration * 1),
    isMoT: step.isMomentOfTruth,
    priority: step.isMomentOfTruth ? "CRITICAL" :
      step.score > 15 ? "HIGH" : step.score > 8 ? "MEDIUM" : "LOW"
  })).sort((a, b) => b.score - a.score);
}
// frequency: 1-5 (how often), severity: 1-5 (impact on outcome)
// frustration: 1-5 (emotional toll), MoT = score multiplier
```

## 3.4 AI Agent: Where to Automate

| Journey Phase | Automate? | Why |
|--------------|-----------|-----|
| Information gathering | ✅ Yes | High volume, low emotional stakes |
| Routine transactions | ✅ Yes | Repetitive, rules-based |
| Complaint handling | ⚠️ Hybrid | Start AI, escalate complex cases |
| Service recovery (after failure) | ❌ Human | High emotion, needs empathy |
| Relationship building | ❌ Human | Trust requires human connection |

## 3.5 ICIL Cross-Ref

Use with: `strategic-design/02` (JTBD), `ux-psikologi/03` (UX laws), `improvement/03` (heuristic eval)

## ⚡ Action Checklist

- [ ] Map emotional arc across ALL channels, not just digital
- [ ] Identify top 3 Moments of Truth — focus improvement efforts here
- [ ] Score pain points: frequency × severity + frustration
- [ ] Decide automation vs human per journey phase (use table above)
- [ ] Test: where does the service FAIL to meet expectations?
