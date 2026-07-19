# 🧠 04 — Memory Systems

> **Level: 🟡 Intermediate** | Prerequisite: 01 | Est. reading: 8 min

Memory is the most fragile part of cognition. Design so users don't have to remember anything.

---

## 4.1 The Three Memory Stores

| Store | Capacity | Duration | Role in UX |
|-------|----------|----------|-----------|
| **Sensory** | Very large | ~0.5 sec (visual), ~3 sec (auditory) | Smooth scrolling; audio feedback timing |
| **Working** | 4±1 chunks | ~18-30 sec (no rehearsal) | Form filling; comparing options; navigation |
| **Long-term** | Unlimited | Lifetime | Recognition of icons, patterns, workflows |

---

## 4.2 Working Memory in UI

| UX Situation | Memory Load | Solution |
|-------------|-------------|----------|
| Copying text between tabs | HIGH (must remember + transcribe) | Auto-copy to clipboard; side-by-side view |
| Password from memory | HIGH | Password manager; biometric auth |
| Multi-step checkout | MEDIUM | Show order summary persistent; step indicator |
| Comparing 2 products | MEDIUM | Comparison table; save to wishlist |
| Single search query | LOW | Autocomplete; recent searches |

---

## 4.3 Encoding Strategies (Sensory → Working)

| Strategy | Mechanism | UI Application |
|----------|-----------|---------------|
| **Chunking** | Group items into meaningful units | Phone: 0812-3456-7890 not 081234567890 |
| **Rehearsal** | Repeat to keep in working memory | Don't make users rehearse — persist info on screen |
| **Elaboration** | Connect new info to existing knowledge | Onboarding: "Just like WhatsApp, but for work" |
| **Dual coding** | Combine visual + verbal | Icon + label; diagram + caption |

---

## 4.4 Retrieval Strategies (Long-term → Working)

| Strategy | Example |
|----------|---------|
| **Recognition** (easy) | "Which of these is your recent file?" |
| **Cued recall** (medium) | "Files from last week" (category hint) |
| **Free recall** (hard) | "What's the exact file name?" |
| **Savings** (implicit) | Re-learning a workflow faster after a gap |

> **The Recognition-Recall Gap**: Recognition is 3-4× faster and 8× less error-prone than recall.

---

## 4.5 The Forgetting Curve (Ebbinghaus, 1885)

*Note: Exact percentages vary by study; these are commonly cited approximations from Ebbinghaus's original research on nonsense syllables.*

| Time After Learning | Approx. Retention |
|--------------------|-----------|
| Immediately | 100% |
| 20 min | 58% |
| 1 hour | 44% |
| 1 day | 33% |
| 1 week | 25% |

**Spacing effect:** 3 short exposures over time > 1 long session. Apply to onboarding: progressive tips, not one long tutorial.

---

## 4.6 Memory Design Principles

| Principle | Anti-pattern |
|-----------|-------------|
| **Don't make me remember** | Password re-entry without "show password" toggle |
| **Recognition over recall** | Blank search vs autocomplete with history |
| **Externalize memory** | Shopping cart that clears on refresh |
| **Consistency creates schema** | Different icon for same action across screens |
| **Forgiveness** | Form that clears all fields on single validation error |

---

## ⚡ Action Checklist

- [ ] Find 3 places users must recall info from a previous screen → convert to recognition or persist
- [ ] Reduce working memory load: any task requiring >4 chunks? Split it.
- [ ] Audit: do icons have labels? (dual coding)
- [ ] Test: after 1-day gap, can users complete the same task without re-learning?
