# 🧠 06 — Problem Solving & Creativity

> **Level: 🟡 Intermediate** | Prerequisite: 01 | Est. reading: 8 min

Users are problem-solving in your UI constantly. When they can't solve it, they blame themselves — but it's usually bad design.

---

## 6.1 Problem-Solving Strategies

| Strategy | How Users Do It | Design Support |
|----------|----------------|---------------|
| **Trial & error** | Click randomly until something works | Clear undo; non-destructive experimentation |
| **Means-end analysis** | "Current state → Goal state" gap | Progress indicators; step-by-step wizards |
| **Analogy** | "This is like X I already know" | Use familiar metaphors (shopping cart, desktop folders) |
| **Decomposition** | Break into sub-problems | Group related settings logically |

---

## 6.2 The Gulfs of Execution & Evaluation

| Gulf | Definition | Bridge |
|------|-----------|--------|
| **Execution** | "I know what I want, but how do I do it?" | Affordances, clear labels, discoverable actions |
| **Evaluation** | "I did something, but did it work?" | Immediate feedback, status indicators, confirmation |

```
Execution Gulf: User wants to export PDF → can't find the option
Fix: "Export" in File menu + Cmd+E shortcut + searchable command palette

Evaluation Gulf: User clicks "Export" → nothing visible happens
Fix: Progress bar + "Downloaded to Downloads/" toast
```

---

## 6.3 Mental Models

| Mental Model Type | Description | Design Rule |
|------------------|-------------|-------------|
| **System model** | How the system actually works | Engineers understand this |
| **User's mental model** | How the user thinks it works | Design to match this, not system model |
| **Conceptual model** | The designer's intended model | Bridge between system and user model |

> **Don't force users to learn your system model.** Match their existing mental model.

```
❌ User's model: "Swipe left to delete" → Developer's model: "Actually it archives"
✅ Match user expectation or label it clearly "Archive" not trash icon
```

---

## 6.4 Problem-Solving Barriers

| Barrier | UI Fix |
|---------|--------|
| **Functional fixedness** — can't see alternative uses | Suggest related features contextually |
| **Mental set** — stuck in one approach | "Try another way" suggestions (not forced) |
| **Confirmation bias** — ignoring contradictory info | Surface relevant data gently |
| **Einstellung effect** — first solution blocks better ones | Show alternative workflows without disrupting current |

---

## 6.5 Creativity in UI

| Principle | UI Application |
|-----------|---------------|
| **Incubation** (stepping away helps) | Save drafts; "continue later" |
| **Constraints breed creativity** | Limited palette, grid constraints → better designs |
| **Divergent → Convergent** thinking | Brainstorm mode (explore) → Commitment mode (decide) |

---

## ⚡ Action Checklist

- [ ] Map your UI's Gulfs of Execution: can a new user complete the top 3 tasks?
- [ ] Map Gulfs of Evaluation: does every action produce visible feedback?
- [ ] Compare your conceptual model vs user mental models — where's the mismatch?
- [ ] Add undo to one destructive action
- [ ] Test: give a user a vague task ("share this") — can they find the path?
