# 🧪 03 — Integration & API Testing

> 🟡 Intermediate | Prereq: 01,02 | ~9 min

Integration tests verify that components work TOGETHER — your API actually saves to the database, your middleware actually blocks unauthorized requests. This is where most production bugs live.

---

## 3.1 Integration Test Setup

```ts
import request from 'supertest';
import { app } from '../app';
import { createTestUser, cleanDatabase } from './helpers';

beforeEach(async () => {
  await cleanDatabase();
  await createTestUser({ email: 'test@example.com', password: 'password123' });
});

afterAll(async () => {
  await cleanDatabase();
});
```

## 3.2 API Endpoint Tests

```ts
describe('POST /api/auth/login', () => {
  it('returns 200 + token for valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body.data.token).toBeDefined();
    expect(res.body.data.user.email).toBe('test@example.com');
  });

  it('returns 401 for wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'wrong' });

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('INVALID_CREDENTIALS');
  });
});

describe('GET /api/orders (authenticated)', () => {
  it('returns 401 without auth header', async () => {
    const res = await request(app).get('/api/orders');
    expect(res.status).toBe(401);
  });

  it('returns user orders with valid token', async () => {
    const token = await loginAs('test@example.com');
    
    const res = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
```

## 3.3 Database Integration Testing

```ts
test('createOrder inserts a row and returns the order', async () => {
  const user = await db.user.create({ data: { email: 'test@test.com' } });
  
  const order = await orderService.create({
    userId: user.id,
    productId: 1,
    quantity: 2
  });

  // Verify in actual database
  const saved = await db.order.findUnique({ where: { id: order.id } });
  expect(saved).not.toBeNull();
  expect(saved?.status).toBe('pending');
  expect(saved?.userId).toBe(user.id);
});
```

## 3.4 Test Database Strategy

```
OPTIONS:
  In-memory SQLite   → Fast, simple, good for most tests
  Test DB container   → Docker Postgres, realistic but slower
  Transaction rollback → Run each test in transaction, rollback after

RECOMMENDED: Transaction rollback for speed + realism
```

## 3.5 Anti-Patterns

- **Testing against production DB** — one bad test can wipe real data
- **Shared test state** — test A's data breaks test B; each test sets up its own
- **Not testing error paths** — only testing happy path = 50% test coverage of reality

## 3.6 ICIL Cross-Ref

Use with: `testing-qa/02` (unit tests), `software-engineering/03` (API design)

## ⚡ Action Checklist
- [ ] Integration tests use a dedicated test database (never production)
- [ ] Test every endpoint: 200, 400, 401, 403, 404, 500
- [ ] Auth middleware tested independently (no need to login for every test)
- [ ] Test data created in beforeEach, cleaned in afterEach
- [ ] Integration suite runs in < 30 seconds
