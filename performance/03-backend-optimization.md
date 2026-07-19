# ⚡ 03 — Backend Optimization

> 🟡 Intermediate | Prereq: 01 | ~9 min

Backend slowness cascades — a 500ms API call delays the entire page. The most common culprits: N+1 queries, no connection pooling, synchronous processing, and missing indexes.

---

## 3.1 N+1 Query Problem

```ts
// ❌ N+1: 1 query for users + N queries for their orders
const users = await db.user.findMany();
for (const user of users) {
  user.orders = await db.order.findMany({ where: { userId: user.id } });
}
// 100 users = 101 queries

// ✅ Eager loading: 1 query with JOIN
const users = await db.user.findMany({
  include: { orders: true }
});
// 100 users = 1 query
```

## 3.2 Connection Pooling

```ts
// Without pooling: new connection per request = 100ms overhead each
// With pooling: reuse connections

import { Pool } from 'pg';

const pool = new Pool({
  max: 20,              // max connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

// Reuse pool connections
async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release(); // CRITICAL: release back to pool
  }
}
```

## 3.3 Async Processing

```ts
// ❌ Blocking: 5s response with 2 emails
async function placeOrder(req: Request) {
  const order = await db.order.create({ data: req.body });
  await mailer.sendConfirmation(order.email);    // 2s
  await analytics.track('order.created', order);  // 1s
  return order; // Total: 3s + DB time
}

// ✅ Non-blocking: return immediately, process async
async function placeOrder(req: Request) {
  const order = await db.order.create({ data: req.body });
  
  // Fire-and-forget (or use Bull/Redis queue)
  queue.add('order.created', { orderId: order.id });
  
  return order; // Total: DB time only (~50ms)
}
```

## 3.4 Optimization Checklist

| Issue | Detection | Fix |
|-------|-----------|-----|
| N+1 queries | Slow endpoint, many DB calls | Eager loading, batch queries |
| No connection pool | Connection timeouts | pg Pool with max=20 |
| Synchronous heavy ops | High response time | Queue + worker pattern |
| No pagination | OOM on large datasets | Cursor/offset pagination |
| Uncompressed responses | Large payload size | gzip/brotli compression |

## 3.5 Anti-Patterns

- **ORM without logging** — enable query logging in dev; you'll be shocked at the N+1s
- **No connection pool limits** — unbounded connections = database crashes under load
- **SELECT \* everywhere** — fetch only columns you need, especially with large TEXT/BLOB

## 3.6 ICIL Cross-Ref

Use with: `database-management/03` (query optimization), `performance/02` (caching)

## ⚡ Action Checklist
- [ ] Enable ORM query logging; find and eliminate ALL N+1 queries
- [ ] Database connection pool: max 20 connections, idle timeout 30s
- [ ] Heavy operations (emails, analytics, image processing) → queue, not inline
- [ ] Every list endpoint has pagination (cursor-based for large datasets)
- [ ] Response compression enabled: gzip level 6 or brotli
