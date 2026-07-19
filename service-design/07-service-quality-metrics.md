# 🌐 07 — Service Health Metrics

> 🔴 Advanced | Prereq: 03, 05 | ~10 min

Measuring service quality is different from measuring app performance. Services are experienced across time and channels — you need metrics that capture the full journey, not just individual touchpoints. For AI-native services, add AI-specific metrics: escalation rate, resolution rate, agent efficiency.

---

## 7.1 The Core Service Metrics

| Metric | What It Measures | Formula | Target |
|--------|-----------------|---------|--------|
| **CSAT** | Satisfaction at touchpoint | % satisfied (4-5 / 5-point scale) | > 80% |
| **CES** | Effort to resolve issue | 1-7 scale (1=very easy) | < 3.0 |
| **NPS** | Loyalty, word-of-mouth | % Promoters − % Detractors | > 30 |
| **First Contact Resolution** | Issues resolved in one interaction | % resolved / total | > 70% |
| **SERVQUAL Gap** | Expectation vs reality | Perception score − Expectation score | Gap < 0.5 |

## 7.2 AI-Specific Service Metrics

| Metric | Formula | Healthy Range | Action If Breached |
|--------|---------|--------------|-------------------|
| **Escalation Rate** | Escalated / Total interactions | 10-15% | > 20%: recalibrate confidence thresholds |
| **Containment Rate** | Resolved by AI / Total | > 70% | < 60%: expand training data, improve NLU |
| **Repeat Contact Rate** | User returns < 24hr / Total | < 15% | > 20%: AI failing to resolve root cause |
| **Handoff Quality** | Human rates context sufficiency | > 4/5 | < 3.5: improve warm transfer briefing |
| **Resolution Time** | Time to resolved (AI + human) | < industry baseline | Track AI-only vs post-handoff segments |

## 7.3 Service Scorecard

```js
function serviceScorecard(metrics) {
  const score = {
    customer: {
      csat: metrics.csat,
      ces: metrics.ces,
      status: metrics.csat > 80 && metrics.ces < 3 ? "✅" : "⚠️"
    },
    ai_agent: {
      containment: metrics.containmentRate,
      escalation: metrics.escalationRate,
      status: metrics.escalationRate < 15 ? "✅" :
        metrics.escalationRate < 25 ? "⚠️" : "🔴"
    },
    operations: {
      firstContactResolution: metrics.fcr,
      repeatContact: metrics.repeatContactRate,
      status: metrics.fcr > 70 ? "✅" : "⚠️"
    },
    overall: metrics.csat > 80 && metrics.escalationRate < 15 &&
      metrics.fcr > 70 ? "HEALTHY" : "NEEDS ATTENTION"
  };
  return score;
}
```

## 7.4 Anti-Patterns

- Measuring only CSAT (captures emotion, not effort or resolution)
- No AI-specific metrics (can't improve what you don't measure)
- Optimizing containment at expense of satisfaction (AI resolves but user hates it)

## 7.5 ICIL Cross-Ref

Use with: `improvement/04` (prioritization metrics), `design-systems/07` (ROI), `data-viz/04` (dashboards)

## ⚡ Action Checklist

- [ ] Implement CSAT + CES + Escalation Rate as baseline
- [ ] Track AI containment rate separately from human resolution
- [ ] Monitor handoff quality — does the human get enough context?
- [ ] Build a service scorecard reviewed weekly (not quarterly)
- [ ] Test: dig into repeat contacts — they reveal what AI is missing
