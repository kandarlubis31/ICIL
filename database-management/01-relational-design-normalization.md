# 🗄️ 01 — Relational Database Design & Normalization

> 🟢 Beginner | Prereq: — | ~9 min

A well-designed database schema prevents data anomalies, duplication, and corruption. Normalization is the systematic process of organizing data to minimize redundancy.

---

## 1.1 Normalization Levels

| Form | Rule | Test |
|------|------|------|
| **1NF** | Atomic values, no repeating groups | Every cell holds ONE value |
| **2NF** | 1NF + no partial dependencies | Non-key columns depend on ENTIRE primary key |
| **3NF** | 2NF + no transitive dependencies | Non-key columns depend ONLY on the primary key |

## 1.2 Example: From Denormalized → 3NF

```
DENORMALIZED (violates 1NF):
orders: [id, customer, items: "shirt,shoes,pants", price]

1NF — split repeating groups:
orders:     [id, customer, date]
order_items: [order_id, product, qty, price]

2NF — remove partial deps (product name depends on product_id only):
orders:      [id, customer, date]
order_items: [order_id, product_id, qty]
products:    [id, name, price]

3NF — remove transitive deps (customer city depends on zipcode):
orders:      [id, customer_id, date]
customers:   [id, name, zipcode]
zipcodes:    [code, city, state]
```

## 1.3 Primary & Foreign Keys

```sql
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL REFERENCES customers(id),
  total DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Prevent orphan records
ALTER TABLE orders ADD CONSTRAINT fk_customer
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE;
```

## 1.4 Anti-Patterns

- **EAV (Entity-Attribute-Value)** — storing data as key-value rows; kills query performance
- **Null abuse** — using NULL as a magic value instead of explicit status column
- **Premature denormalization** — optimize ONLY after measuring slow queries

## 1.5 ICIL Cross-Ref

Use with: `data-viz/01` (data types), `improvement/01` (methodology)

## ⚡ Action Checklist

- [ ] Every table has a PRIMARY KEY (preferably auto-increment or UUID)
- [ ] Verify 3NF: no column depends on anything other than the full PK
- [ ] All foreign keys have explicit ON DELETE behavior (CASCADE / SET NULL / RESTRICT)
- [ ] No composite keys with > 3 columns (consider surrogate key)
- [ ] Draw an ERD — every relationship should be clear
