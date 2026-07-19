# ⚡ 02 — Caching Strategies

> 🟡 Intermediate | Prereq: 01 | ~9 min

Caching is the #1 performance lever. A well-placed cache turns a 500ms database query into a 1ms memory lookup. The key is knowing WHAT to cache, WHERE, and for HOW LONG.

---

## 2.1 Cache Layers

```
CLIENT (Browser Cache, Service Worker)
   │
   ▼
CDN (CloudFront, Cloudflare) ← Cache static assets at edge
   │
   ▼
APPLICATION (Redis, in-memory) ← Cache API responses, sessions
   │
   ▼
DATABASE (query cache, materialized views) ← Last resort
```

## 2.2 Redis Caching Patterns

```ts
// Cache-Aside (most common)
async function getProduct(id: string): Promise<Product> {
  const cacheKey = `product:${id}`;
  
  // 1. Try cache
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);
  
  // 2. Cache miss → fetch from DB
  const product = await db.product.findUnique({ where: { id } });
  
  // 3. Populate cache with TTL
  if (product) {
    await redis.setex(cacheKey, 3600, JSON.stringify(product)); // 1 hour
  }
  
  return product;
}

// Write-Through: update cache immediately on write
async function updateProduct(id: string, data: Partial<Product>) {
  await db.product.update({ where: { id }, data });
  await redis.del(`product:${id}`); // Invalidate (or setex with new data)
}
```

## 2.3 Cache Invalidation

```
STRATEGIES:
  TTL (Time-to-Live)      → Auto-expire after N seconds
  Write Invalidation       → Delete cache key on DB update
  Stale-While-Revalidate   → Serve stale, refresh in background

RULE: "There are only two hard things in CS: naming, cache invalidation"
```

## 2.4 When NOT to Cache

```
DON'T cache:
  → Real-time data (stock prices, live scores)
  → User-specific data that changes frequently
  → POST/PUT/DELETE responses (HTTP semantics)
  → Data that costs more to invalidate than to fetch

DO cache:
  → Product catalogs, blog posts, config
  → Expensive computed results
  → Session data, rate limit counters
```

## 2.5 Anti-Patterns

- **Cache everything forever** — stale data > no cache; always set TTL
- **No invalidation strategy** — updated DB, stale cache, confused users
- **Caching without measurement** — measure hit rate; < 80% = tune strategy

## 2.6 ICIL Cross-Ref

Use with: `database-management/05` (Redis), `performance/01` (frontend caching)

## ⚡ Action Checklist
- [ ] Cache static assets at CDN (TTL: 1 year for hashed filenames)
- [ ] Redis for API responses: TTL 1-60 min depending on freshness needs
- [ ] Cache hit rate monitored; alert if < 80%
- [ ] Write operations invalidate related cache keys
- [ ] Browser caching: `Cache-Control: public, max-age=31536000` for hashed assets
