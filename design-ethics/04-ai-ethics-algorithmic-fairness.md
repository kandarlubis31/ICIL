# ⚖️ 04 — AI Ethics & Algorithmic Fairness

> **Level: 🔴 Advanced** | Prerequisite: 01,02 | ~10 min

AI systems amplify human biases at scale. A hiring algorithm rejecting women, a loan model charging higher rates to minorities, a chatbot that's rude to non-native English speakers — these aren't bugs, they're design failures. This course covers fairness metrics, auditing, and the EU AI Act.

---

## 4.1 Sources of AI Bias

| Source | Example | Mitigation |
|--------|---------|-----------|
| **Training data** | Resume screening trained on 10 years of mostly-male hires → rejects women | Balanced dataset + synthetic augmentation |
| **Labeling bias** | Human annotators rate AAVE as "unprofessional" | Diverse annotator pool + calibration |
| **Feature selection** | Using ZIP code as feature → proxy for race/income | Remove protected-class proxies |
| **Feedback loop** | Predictive policing sends more officers to area → more arrests → model reinforces | Off-policy evaluation, human-in-the-loop |
| **Deployment context** | Model tested on US data, deployed globally | Local validation before new market launch |

---

## 4.2 Fairness Metrics

| Metric | Definition | When to Use |
|--------|-----------|------------|
| **Demographic parity** | Same outcome rate across groups | Hiring, admissions (equal opportunity) |
| **Equalized odds** | Same TPR and FPR across groups | Criminal justice, lending (accuracy matters) |
| **Individual fairness** | Similar individuals get similar predictions | Recommendation systems |
| **Calibration** | Predicted probability matches actual for all groups | Risk assessment, credit scoring |

**Trade-off:** Equalized odds and calibration CANNOT both be satisfied simultaneously when base rates differ across groups. Choose based on domain and consequence of errors.

---

## 4.3 AI Auditing Framework

```
1. PRE-DEPLOYMENT
   ├── Dataset audit: representation by race/gender/age/geo
   ├── Subgroup performance: accuracy/FPR across slices
   ├── Adversarial testing: edge cases designed to break fairness
   └── Human review: domain experts evaluate 100+ outputs

2. DEPLOYMENT
   ├── Real-time monitoring: model drift, fairness metric drift
   ├── Appeal mechanism: users can challenge AI decisions
   ├── Explainability: "Why was my loan rejected?" → actionable reason
   └── Kill switch: automatic rollback if fairness drops below threshold

3. POST-DEPLOYMENT
   ├── Periodic re-audit: every N transactions or M months
   ├── Model card publication: intended use, performance, limitations
   └── Incident response: documented process for AI harm
```

---

## 4.4 EU AI Act — Risk Tiers (2026)

| Tier | Examples | Requirements |
|------|----------|-------------|
| **Unacceptable** | Social scoring, real-time biometric surveillance | **Banned** |
| **High Risk** | Hiring, credit, medical, education, law enforcement | Conformity assessment, human oversight, transparency, accuracy |
| **Limited Risk** | Chatbots, emotion recognition, deepfakes | Transparency: "You are talking to an AI" |
| **Minimal Risk** | Spam filters, AI in video games | No additional requirements |

**Key requirement for High-Risk AI:** Model cards documenting intended use, training data composition, fairness evaluation, and limitations.

---

## 4.5 AI Content Transparency

| Scenario | Requirement (EU AI Act) |
|----------|----------------------|
| AI-generated text (article, report) | Label as "AI-generated content" |
| AI-generated image/video/audio | Watermark or metadata disclosure |
| Chatbot interaction | Clear disclosure at conversation start |
| Deepfake | Explicit labeling + consent of depicted persons |
| AI-assisted (human-edited AI output) | "Created with AI assistance" |

---

## ⚡ Action Checklist

- [ ] Run subgroup analysis on your AI system: accuracy across race, gender, age, geography
- [ ] Choose a fairness metric (demographic parity vs equalized odds) and document WHY
- [ ] Publish a model card: intended use, training data, performance, limitations, ethical considerations
- [ ] Implement an appeal mechanism — users can challenge AI decisions with human review

> **ICIL Cross-Ref:** ai-integration/06 (AI Safety & Guardrails), security/06 (AI-Specific Security), ux-psikologi/06 (Dark Patterns), agentic-engineering/06 (Agent Safety & Sandboxing)
