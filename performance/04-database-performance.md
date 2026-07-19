# ⚡ 04 — Database Performance

> 🟡 Intermediate | Prereq: 01 | ~9 min

Database queries are the most common performance bottleneck. A missing index turns a 1ms lookup into a 30-second table scan. Query optimization is the highest-leverage performance skill.

---

## 4.1 Find Slow Queries

```sql
-- PostgreSQL: enable slow query logging
ALTER SYSTEM SET log_min_duration_statement = 100; -- log queries > 100ms
SELECT pg_reload_conf();

-- Find the slowest queries in your app
SELECT query, calls, mean_time, total_time 
FROM pg_stat_statements 
ORDER BY total_time DESC 
LIMIT 10;
```

## 4.2 Index Strategy

```
EVERY TABLE NEEDS:
  → PRIMARY KEY (auto-indexed)
  → Index on EVERY foreign key
  → Index on WHERE clause columns
  → Index on ORDER BY columns
  
COVERING INDEX (Postgres 11+):
CREATE INDEX idx_orders_status_date 
  ON orders(status, created_at DESC)
  INCLUDE (total, customer_id);
-- Covers: SELECT total, customer_id FROM orders WHERE status = 'pending' ORDER BY created_at DESC
-- WITHOUT touching the table (index-only scan)
```

## 4.3 Common Slow Query Patterns

| Pattern | Problem | Fix |
|---------|---------|-----|
| `WHERE function(col)` | Kills index | Expression index or avoid function |
| `WHERE col LIKE '%term'` | Leading wildcard | Full-text search (tsvector) |
| `SELECT *` on indexed query | Index not covering | SELECT only needed columns |
| `OFFSET 100000` | Scans all rows | Cursor pagination |
| Missing ANALYZE | Stale statistics | `ANALYZE table_name` after bulk ops |

## 4.4 Cursor Pagination

```sql
-- ❌ OFFSET: scans all skipped rows
SELECT * FROM orders ORDER BY id LIMIT 20 OFFSET 100000; -- Slow!

-- ✅ Cursor: jumps directly to position
SELECT * FROM orders 
WHERE id > 100000  -- last seen ID
ORDER BY id 
LIMIT 20;  -- Instant!
```

## 4.5 Anti-Patterns

- **No `EXPLAIN ANALYZE` habit** — never push a query to prod without checking the plan
- **Indexing every column** — slows writes; index WHERE/ORDER BY columns only
- **No connection pool monitoring** — idle connections waste memory; pool exhaustion crashes

## 4.6 ICIL Cross-Ref

Use with: `database-management/03` (query optimization), `performance/03` (connection pooling)

## ⚡ Action Checklist
- [ ] Run `EXPLAIN ANALYZE` on the 5 slowest queries in your app
- [ ] Every foreign key has an index (this alone fixes 30% of slow queries)
- [ ] Use cursor pagination for lists > 1000 rows (never OFFSET on large tables)
- [ ] `pg_stat_statements` enabled in production; review top 10 weekly
- [ ] Auto-vacuum and auto-analyze enabled (Postgres defaults are good)
