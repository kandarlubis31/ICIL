# ⚙️ 05 — Testing Strategies

> 🟡 Intermediate | Prereq: 01 | ~9 min

Testing isn't about catching bugs — it's about enabling fearless refactoring. A good test suite lets you change code with confidence. The test pyramid is your guide.

---

## 5.1 The Test Pyramid

```
      ╱   E2E    ╲        ← Few: critical user flows (Playwright)
     ╱───────────╲
    ╱ Integration ╲       ← Some: API + DB + services (Supertest)
   ╱───────────────╲
  ╱   Unit Tests    ╲     ← Many: individual functions (Jest)
 ╱───────────────────╲

Rule: More unit, less E2E. Invert the pyramid → slow, flaky tests.
```

## 5.2 Unit Testing with Jest

```ts
// order.service.ts
export function calculateDiscount(order: Order): number {
  if (order.total > 1000) return order.total * 0.15;  // 15% off
  if (order.total > 500) return order.total * 0.10;   // 10% off
  if (order.customer.isVip) return order.total * 0.05; // VIP always 5%
  return 0;
}

// order.service.test.ts
describe('calculateDiscount', () => {
  it('gives 15% for orders over $1000', () => {
    const order = { total: 1500, customer: { isVip: false } };
    expect(calculateDiscount(order)).toBe(225);   // 1500 * 0.15
  });

  it('gives 5% for VIP regardless of total', () => {
    const order = { total: 100, customer: { isVip: true } };
    expect(calculateDiscount(order)).toBe(5);      // 100 * 0.05
  });

  it('gives 0 for small non-VIP orders', () => {
    const order = { total: 50, customer: { isVip: false } };
    expect(calculateDiscount(order)).toBe(0);
  });
});
```

## 5.3 Integration Testing API Endpoints

```ts
import request from 'supertest';
import { app } from '../app';

describe('POST /api/orders', () => {
  it('creates an order and returns 201', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({ productId: 1, quantity: 2 })
      .set('Authorization', `Bearer ${testToken}`);
    
    expect(res.status).toBe(201);
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.status).toBe('pending');
  });

  it('returns 422 for invalid product', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({ productId: 99999, quantity: 2 })
      .set('Authorization', `Bearer ${testToken}`);
    
    expect(res.status).toBe(422);
  });
});
```

## 5.4 Anti-Patterns

- **Testing implementation, not behavior** — test outputs, not internal state
- **No test isolation** — tests sharing DB state; use transactions or mocks
- **Commenting out failing tests** — fix or delete, never ignore

## 5.5 ICIL Cross-Ref

Use with: `improvement/06` (regression handling), `devops-infra/03` (CI/CD)

## ⚡ Action Checklist
- [ ] Pyramid: 70% unit, 20% integration, 10% E2E
- [ ] Test edge cases: empty, null, max, min, negative
- [ ] One `describe` per function, one `it` per behavior
- [ ] Mock external APIs — never call real services in tests
- [ ] Run tests in CI on every push; don't skip failing tests
