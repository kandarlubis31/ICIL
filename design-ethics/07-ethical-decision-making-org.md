# ⚖️ 07 — Ethical Decision-Making & Organizational Ethics

> **Level: 🔴 Advanced** | Prerequisite: 01,05 | ~10 min

Knowing what's ethical is the easy part. Actually making ethical decisions inside an organization — with deadlines, KPIs, and stakeholder pressure — is the hard part. This capstone covers ethical roadmapping, escalation paths, and building ethical culture.

---

## 7.1 The Organizational Ethics Gap

**Why ethical designers still build unethical products:**

| Barrier | Why It Happens | Counter-Strategy |
|---------|---------------|-----------------|
| **Diffusion of responsibility** | "Product made the decision, I just implemented it" | Document your concerns in writing — email, ticket, design doc |
| **KPI tunnel vision** | Optimizing for engagement while ignoring harm | Add ethical KPIs: trust score, churn-by-deception, complaint rate |
| **Sunk cost fallacy** | "We've invested 6 months — can't stop now" | Kill criteria defined before project start |
| **Hierarchical pressure** | "VP wants this shipped by Friday" | Data-driven objection: "Here's the estimated regulatory risk" |
| **Normalization of deviance** | "Everyone in our industry does it" | Competitive analysis: who's NOT doing it and winning? |

---

## 7.2 Ethical Escalation Path

```
Level 1: TEAM
  "I'm uncomfortable with this pattern. Can we discuss?"
  → 80% of issues resolved here

Level 2: DESIGN LEAD / MANAGER
  "Here's why this is problematic + 2 alternative approaches."
  → Present alternatives, not just objections

Level 3: ETHICS CHAMPION / LEGAL
  Formal review: regulatory risk, PR risk, user harm assessment
  → Documented decision with accountability

Level 4: EXECUTIVE / ETHICS COMMITTEE
  Escalation when risks are severe and unresolved
  → Binding decision; if still unethical, consider your options

Level 5: WHISTLEBLOWING (last resort)
  When the organization knowingly causes harm and won't stop
  → Legal protections vary by jurisdiction; document everything
```

---

## 7.3 Building Ethical Culture

| Practice | Implementation |
|----------|---------------|
| **Ethics review in design crits** | 10 minutes of every design review = "What could go wrong?" |
| **Ethical KPIs** | Track trust, user complaints, regulatory inquiries alongside revenue |
| **Pre-mortems** | Before launch: "It's 12 months later, this product is on the front page of NYT for all the wrong reasons. What happened?" |
| **Diverse teams** | Homogeneous teams create homogeneous blind spots — diverse teams catch ethical issues earlier |
| **Ethics champions** | Rotating role: one designer per quarter is the designated ethics question-asker |
| **"When to say no" policy** | Clear criteria for when teams can reject work on ethical grounds without career penalty |

---

## 7.4 The Ethics Roadmap

Integrate ethics into your product roadmap — not as a separate track, but as a dimension of every feature:

| Feature | Standard Criteria | + Ethics Dimension |
|---------|-----------------|-------------------|
| Recommendation algorithm | Accuracy, engagement, revenue | Fairness across demographics, transparency of why |
| Notification system | Open rate, CTR | User control, do-not-disturb, daily limits |
| Personalization | Conversion, time-on-site | Data minimization, on-device processing option |
| Social features | DAU, sharing rate | Anti-harassment tooling, blocking/reporting, mental health impact |

---

## 7.5 The Designer's Oath

> *I will design with the user's genuine interest in mind.*
> *I will not deceive, manipulate, or exploit.*
> *I will question requirements that cause harm, even when they come from power.*
> *I will include those unlike myself in my design process.*
> *I will consider the long-term consequences of what I build.*
> *I will leave the digital world more trustworthy, accessible, and sustainable than I found it.*

---

## ⚡ Action Checklist

- [ ] Map your organization's ethical escalation path — who do you talk to at each level?
- [ ] Add an "ethics check" to your team's design review template (5-10 minutes)
- [ ] Run a pre-mortem on your current project: "What's the worst ethical outcome, and how do we prevent it?"
- [ ] Identify one KPI that measures user trust or wellbeing — propose tracking it alongside business metrics

> **ICIL Cross-Ref:** strategic-design/07 (Strategy to Execution), improvement/01 (ICIL Methodology), design-ethics/01 (Ethical Frameworks), design-ethics/05 (Dark Patterns)
