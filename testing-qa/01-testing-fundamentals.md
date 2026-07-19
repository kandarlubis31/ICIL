# 🧪 01 — Testing Fundamentals & Pyramid

> 🟢 Beginner | Prereq: — | ~9 min

Testing isn't about finding bugs — it's about enabling confident change. The test pyramid guides investment: many fast unit tests, fewer slow E2E tests. TDD and BDD are mindsets, not just techniques.

---

## 1.1 The Test Pyramid

```
      ╱   E2E    ╲        ← Few: critical user journeys (Playwright)
     ╱───────────╲         ← Slow, flaky-prone, expensive
    ╱ Integration ╲        ← Some: API + DB + service (Supertest)
   ╱───────────────╲       ← Moderate speed, moderate confidence
  ╱   Unit Tests    ╲     ← Many: individual functions (Jest/Vitest)
 ╱───────────────────╲    ← Fast, reliable, cheap

INVERTED PYRAMID = disaster (slow CI, flaky tests, low confidence)
```

## 1.2 TDD: Red → Green → Refactor

```
RED:   Write a failing test
       ↓
GREEN: Write minimal code to pass
       ↓
REFACTOR: Clean up while tests stay green
       ↓
REPEAT
```

```ts
// RED: test first
test('calculateDiscount: 15% off for orders over $1000', () => {
  expect(calculateDiscount({ total: 1500, customer: { isVip: false } })).toBe(225);
});

// GREEN: minimal implementation
function calculateDiscount(order: Order): number {
  if (order.total > 1000) return order.total * 0.15;
  return 0;
}

// REFACTOR: add more cases, extract constants
const DISCOUNT_THRESHOLD = 1000;
const DISCOUNT_RATE = 0.15;
function calculateDiscount(order: Order): number {
  return order.total > DISCOUNT_THRESHOLD ? order.total * DISCOUNT_RATE : 0;
}
```

## 1.3 What Makes a Good Test

| Principle | Bad | Good |
|-----------|-----|------|
| **Isolated** | Tests share DB state | Each test sets up + tears down |
| **Deterministic** | Passes sometimes | Always same result |
| **Fast** | 5+ seconds | < 100ms (unit), < 2s (integration) |
| **Behavioral** | Tests internal state | Tests observable output |
| **Readable** | `test('fn1', ...)`  | `test('returns 404 for missing user', ...)` |

## 1.4 Anti-Patterns

- **Ice cream cone** — lots of E2E, no unit tests (slow, flaky, hard to debug)
- **Testing implementation** — asserting `counter.value === 1` instead of `button.text === '1'`
- **No failing test first** — if you don't see it fail, you don't know it works

## 1.5 ICIL Cross-Ref

Use with: `software-engineering/05` (code-level testing), `devops-infra/03` (CI/CD)

## ⚡ Action Checklist
- [ ] Pyramid: 70% unit, 20% integration, 10% E2E
- [ ] Every PR adds tests for new behavior (not optional)
- [ ] Tests are isolated — no shared mutable state between tests
- [ ] Test names describe behavior: `'returns 401 for expired token'`
- [ ] Run `npm test` before every commit (pre-commit hook)
