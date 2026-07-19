# 🗄️ 02 — SQL Mastery

> 🟢 Beginner | Prereq: 01 | ~9 min

SQL is the universal language of data. Every developer needs fluency in queries, joins, aggregations, and window functions. This is the practical toolkit.

---

## 2.1 SQL Query Execution Order

```
FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
 ↑      ↑       ↑         ↑          ↑        ↑         ↑         ↑
Pick   Combine  Filter   Bucket    Filter    Choose    Sort     Cap
table  tables   rows     groups    groups   columns   result   rows
```

## 2.2 JOIN Types

| Join | Returns | Use Case |
|------|---------|----------|
| `INNER JOIN` | Matching rows only | "Orders WITH customers" |
| `LEFT JOIN` | All left + matching right | "All users, even without orders" |
| `RIGHT JOIN` | All right + matching left | Rare (prefer LEFT JOIN) |
| `FULL OUTER JOIN` | Everything | "Audit: find orphan records" |
| `CROSS JOIN` | Cartesian product | Generate combinations |

## 2.3 Window Functions

```sql
-- Running total per customer
SELECT 
  order_id,
  customer_id,
  amount,
  SUM(amount) OVER (
    PARTITION BY customer_id 
    ORDER BY created_at
  ) AS running_total,
  RANK() OVER (
    PARTITION BY customer_id 
    ORDER BY amount DESC
  ) AS order_rank
FROM orders;

-- Row comparison: previous order date
SELECT 
  order_id,
  created_at,
  LAG(created_at) OVER (
    PARTITION BY customer_id 
    ORDER BY created_at
  ) AS prev_order_date
FROM orders;
```

## 2.4 Common Table Expressions (CTEs)

```sql
WITH monthly_sales AS (
  SELECT 
    DATE_TRUNC('month', created_at) AS month,
    SUM(amount) AS revenue
  FROM orders
  GROUP BY 1
),
growth AS (
  SELECT 
    month, revenue,
    LAG(revenue) OVER (ORDER BY month) AS prev_revenue
  FROM monthly_sales
)
SELECT 
  month, revenue,
  ROUND((revenue - prev_revenue) / prev_revenue * 100, 1) AS growth_pct
FROM growth
ORDER BY month;
```

## 2.5 Anti-Patterns

- **SELECT \*** — explicitly list columns; prevents breakage on schema changes
- **N+1 queries** — use JOINs instead of looping queries in application code
- **No EXPLAIN** — never push a query to production without checking the query plan

## 2.6 ICIL Cross-Ref

Use with: `data-viz/01` (data types), `improvement/03` (evaluation)

## ⚡ Action Checklist

- [ ] Every JOIN has an explicit ON condition (no accidental cross joins)
- [ ] Aggregations use GROUP BY with clear column references
- [ ] Window functions used instead of self-joins for running totals/ranks
- [ ] Complex queries broken into CTEs for readability
- [ ] Run `EXPLAIN ANALYZE` on any query touching > 10K rows
