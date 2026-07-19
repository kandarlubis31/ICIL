# 🧠 03 — Laws of UX

> 🟡 Intermediate | Prereq: 01 | ~4 min

UX laws are research-proven fundamentals — the "physics" of UX. Every designer must know these.

---

## 3.1 The 11 Laws

| Law | Core Principle | Application |
|-----|---------------|-------------|
| **Fitts** | Bigger + closer = easier to click | Large CTAs, mobile thumb zone, touch ≥ 24px (WCAG 2.2 min), 44px (Apple HIG) |
| **Hick** | More choices = slower decision | 3-5 options max, progressive disclosure, recommendations |
| **Miller** | ~4±1 items in working memory (Cowan; 7±2 was historical upper bound) | Chunking: phone numbers, form wizards, nav into 4-item groups |
| **Jakob** | Users expect consistency with other sites | Don't reinvent: cart top-right, logo→home, search=magnifying glass |
| **Tesler** | Complexity can't be removed — only moved | Put it on the SYSTEM, not user: auto-fill, smart defaults |
| **Doherty** | <400ms response needed | <100ms=block, 100-400ms=ok, 1s+=skeleton, 3s+=progress bar |
| **Parkinson** | Task expands to fill space/time | Short input = concise answer; time limit = decisive |
| **Poka-Yoke** | Prevent errors before they happen | Dropdowns, format masks, disable-invalid, real-time validation |
| **Aesthetic-Usability** | Aesthetic designs are perceived as easier to use | Polish UI → users forgive minor issues, builds trust |
| **Postel's Law** | Be conservative in what you send, liberal in what you accept | Strict outputs, forgiving input parsing (esp. for AI/NLP interfaces) |
| **Serial Position** | Users recall first & last items best | Put key actions at start/end of lists; middle items get less attention |

---

## 3.2 Fitts's Law: Formula & Details

```
T = a + b × log₂(D/W + 1)     T=time, D=distance, W=target width
```

| Context | Fastest Target | Slowest |
|---------|---------------|---------|
| Desktop | Screen corners (infinite target) | Center of screen |
| Mobile | Bottom (thumb zone) | Top corners |
| Destructive | FAR from frequent-click areas + confirmation |

---

## 3.3 Response Time Guide (Doherty Threshold)

| Response | User Experience | Solution |
|----------|----------------|----------|
| <100ms | Instant | Block (toggle, checkbox) |
| 100-400ms | Perceptible, acceptable | No loader needed |
| 400ms-1s | Focus wavers | Skeleton screen |
| 1s-3s | Flow of thought broken | Progress bar / spinner |
| 3s-10s | User considers switching | Progress + time estimate + distraction |
| >10s | Likely abandoned | Background + notification when done |

> 🤖 **AI Interface Note**: LLMs often can't respond <400ms. Use **streaming responses**, **optimistic UI**, or **progressive disclosure** to maintain perceived performance. Show partial results immediately rather than blocking until completion.

---

## ⚡ Action Checklist
- [ ] CTA buttons: large, high-contrast, close to related content
- [ ] Touch targets: ≥24px for WCAG 2.2 compliance, 44px for optimal usability
- [ ] Mobile nav: bottom screen (thumb zone), not top
- [ ] Limit every dropdown/menu to 4-5 items + "See all" (Miller's 4±1)
- [ ] Apply chunking: split phone numbers, long forms, nav into 4-item groups
- [ ] Add skeleton screens for any load >400ms
- [ ] For AI interfaces: stream responses, use optimistic UI for perceived speed
- [ ] Put key list items at start/end (Serial Position Effect)
