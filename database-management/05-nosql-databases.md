# 🗄️ 05 — NoSQL Databases

> 🟡 Intermediate | Prereq: 01 | ~9 min

Not every data problem fits a relational schema. NoSQL covers document stores, key-value caches, and graph databases. The key is knowing when to use which.

---

## 5.1 NoSQL vs SQL Decision

```
Is your data highly structured with clear relationships?
  YES → SQL (PostgreSQL)
  NO  → Is it documents (JSON), key-value, column-family, or graph?
          DOCS    → MongoDB, Couchbase  (flexible schema, nested data)
          KV      → Redis, DynamoDB      (cache, sessions, rate limiting)
          COLUMN  → Cassandra, ScyllaDB  (time-series, high-write throughput)
          GRAPH   → Neo4j, Dgraph        (social networks, recommendations)
```

## 5.2 MongoDB — Document Store

```js
// MongoDB stores JSON-like documents
db.products.insertOne({
  name: "Wireless Headphones",
  price: 79.99,
  tags: ["audio", "bluetooth", "wireless"],
  variants: [
    { color: "black", sku: "WH-BLK-001", stock: 150 },
    { color: "white", sku: "WH-WHT-001", stock: 85 }
  ],
  ratings: { avg: 4.5, count: 234 },
  createdAt: new Date()
});

// Query products with at least one black variant in stock
db.products.find({
  "variants": {
    $elemMatch: { color: "black", stock: { $gt: 0 } }
  }
});
```

## 5.3 Redis — In-Memory Cache

```ts
import { Redis } from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

// Cache expensive query
async function getProduct(id: string) {
  const cached = await redis.get(`product:${id}`);
  if (cached) return JSON.parse(cached);

  const product = await db.product.findUnique({ where: { id } });
  await redis.setex(`product:${id}`, 3600, JSON.stringify(product)); // 1h TTL
  return product;
}

// Rate limiting
async function checkRateLimit(userId: string, limit = 100) {
  const key = `ratelimit:${userId}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, 60); // reset every 60s
  return count <= limit;
}
```

## 5.4 CAP Theorem

```
         Consistency
            /\
           /  \
          /    \
         /      \
        /________\
  Partition    Availability
  Tolerance

Pick 2 of 3 during network partition:
  CP → MongoDB (strong consistency, may be unavailable)
  AP → Cassandra (always available, may be inconsistent)
  CA → PostgreSQL (works when no partition)
```

## 5.5 Anti-Patterns

- **MongoDB for relational data** — joins in app code instead of SQL
- **Redis as primary DB** — it's a cache; data can evaporate on restart
- **No TTL on cache** — cache grows forever → OOM

## 5.6 ICIL Cross-Ref

Use with: `database-management/01` (relational), `ai-integration/03` (vector DBs)

## ⚡ Action Checklist
- [ ] Use PostgreSQL by default; add NoSQL only for specific use cases
- [ ] Redis: ALWAYS set TTL (never cache indefinitely)
- [ ] MongoDB: embed related data (variants in product doc), don't normalize like SQL
- [ ] Understand CAP tradeoffs before choosing a NoSQL DB
- [ ] Monitor Redis memory usage; eviction policy = allkeys-lru
