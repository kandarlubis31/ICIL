# 🗄️ 03 — Indexing & Query Optimization

> 🟡 Intermediate | Prereq: 02 | ~9 min

Indexes are the #1 performance lever in databases. A missing index can turn a 1ms query into a 30-second scan. Understanding B-trees and query plans is non-negotiable.

---

## 3.1 PostgreSQL Index Types

| Type | Use Case | Example |
|------|----------|---------|
| **B-Tree** (default) | Equality, ranges, sorting | `WHERE email = 'x'`, `ORDER BY date` |
| **Hash** | Equality only (faster than B-tree) | `WHERE session_id = 'abc'` |
| **GIN** | Full-text, arrays, JSONB | `WHERE tags @> ARRAY['urgent']` |
| **GiST** | Geometric, full-text, custom | `WHERE geo && bounding_box` |
| **BRIN** | Large tables, physical correlation | `WHERE created_at > '2026-01-01'` (10M+ rows) |
| **SP-GiST** | Partitioned, non-balanced data | IP ranges, phone number prefixes |

### How B-Tree Indexes Work

```
Without index (Seq Scan):
  [row1][row2][row3]...[row1000000]  ← scans ALL rows

With B-Tree index on email:
  Root: [A-M] [N-Z]
         /       \
    [A-F][G-M]  [N-S][T-Z]
      ...          ...
  Leaf pages → direct row pointers
  → Finds row in O(log n) instead of O(n)
```

## 3.2 When to Index

| Column Type | Index? | Reason |
|-------------|--------|--------|
| Primary key | ✅ Auto-indexed | Postgres creates automatically |
| Foreign key | ✅ ALWAYS | Speeds up JOINs dramatically |
| WHERE clause columns | ✅ | Filters scan index, not table |
| ORDER BY columns | ✅ | Avoids sorting in memory |
| Low-cardinality (status, type) | ⚠️ Partial | Index only common values |
| Every column | ❌ | Slows writes, wastes space |

## 3.3 Reading EXPLAIN ANALYZE

```sql
EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 42;

-- GOOD: Index Scan using idx_orders_customer on orders
--   (cost=0.42..8.44 rows=5 width=128)
--   (actual time=0.032..0.045 rows=5 loops=1)

-- BAD: Seq Scan on orders
--   (cost=0.00..24389.00 rows=5 width=128)
--   (actual time=187.234..187.240 rows=5 loops=1)
--   ↑ Full table scan — ADD INDEX immediately
```

## 3.4 Query Optimization Checklist

```sql
-- BEFORE (slow)
SELECT u.*, COUNT(o.id) 
FROM users u 
LEFT JOIN orders o ON u.id = o.user_id 
WHERE o.status = 'completed'  -- ← kills LEFT JOIN (turns into INNER)
GROUP BY u.id;

-- AFTER (fast)
SELECT u.*, o.order_count
FROM users u
JOIN (
  SELECT user_id, COUNT(*) AS order_count
  FROM orders WHERE status = 'completed'
  GROUP BY user_id
) o ON u.id = o.user_id;
-- Push filter to subquery → smaller JOIN → faster
```

## 3.5 Anti-Patterns

- **SELECT \* with indexes** — indexes on (a,b) wasted if you SELECT columns c,d,e
- **Function in WHERE** — `WHERE LOWER(email) = 'x'` kills index; use `WHERE email = 'x'` or expression index
- **No ANALYZE after bulk insert** — statistics get stale; run `ANALYZE table_name`

## 3.6 ICIL Cross-Ref

Use with: `data-viz/04` (dashboard query patterns), `improvement/03` (evaluation)

## ⚡ Action Checklist
- [ ] Index EVERY foreign key column
- [ ] Run EXPLAIN ANALYZE on queries touching > 10K rows
- [ ] Avoid functions on indexed columns in WHERE clauses
- [ ] Use covering indexes (INCLUDE) for frequently fetched columns
- [ ] Run ANALYZE after bulk inserts or schema changes
