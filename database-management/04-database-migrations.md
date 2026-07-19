# 🗄️ 04 — Database Migrations

> 🟡 Intermediate | Prereq: 01 | ~8 min

Migrations version-control your database schema — just like git does for code. Every schema change is a migration file: up (apply) and down (rollback). No more "it works on my machine" with databases.

---

## 4.1 Migration Lifecycle

```
DEV                STAGING                 PROD
 │                    │                      │
 ├─ Create migration  │                      │
 ├─ Run up locally    │                      │
 ├─ Test app          │                      │
 ├─ Commit + push ────▶ Run up on staging   │
 │                    ├─ Run tests          │
 │                    ├─ Verify data ───────▶ Run up on prod
 │                    │                    ├─ Monitor
 │                    │                    └─ Keep rollback ready
```

## 4.2 Migration File Structure

```sql
-- 20240715_add_user_avatar.sql

-- UP: apply this migration
ALTER TABLE users 
ADD COLUMN avatar_url VARCHAR(500),
ADD COLUMN avatar_uploaded_at TIMESTAMPTZ;

CREATE INDEX idx_users_avatar ON users(avatar_url) 
  WHERE avatar_url IS NOT NULL;  -- partial index

-- DOWN: rollback this migration
DROP INDEX IF EXISTS idx_users_avatar;
ALTER TABLE users 
DROP COLUMN IF EXISTS avatar_url,
DROP COLUMN IF EXISTS avatar_uploaded_at;
```

## 4.3 Migration Rules

| Rule | Why |
|------|-----|
| **One change per migration** | Easy to isolate failures |
| **Always write DOWN** | Rollback needs to work |
| **Never modify applied migrations** | Rewrite history → broken environments |
| **Add new migration** | New column = new migration file |
| **Backfill with batches** | UPDATE 10M rows → use batches of 1000 |

## 4.4 Safe Migration Patterns

```sql
-- BAD: locks table for 10 minutes
ALTER TABLE orders ALTER COLUMN status SET DEFAULT 'pending';

-- GOOD: add new column, backfill, then swap
-- Step 1: Add nullable column (instant)
ALTER TABLE orders ADD COLUMN status_new VARCHAR(20);

-- Step 2: Backfill in batches
UPDATE orders SET status_new = status WHERE id IN (
  SELECT id FROM orders WHERE status_new IS NULL LIMIT 1000
);
-- Repeat until done

-- Step 3: Swap and drop old column
ALTER TABLE orders DROP COLUMN status;
ALTER TABLE orders RENAME COLUMN status_new TO status;
```

## 4.5 Anti-Patterns

- **No down migration** — if deploy fails, you can't rollback
- **Manual schema changes** — "I'll just run this SQL on prod" = disaster
- **Destructive changes without backup** — `DROP TABLE` without `pg_dump` first

## 4.6 ICIL Cross-Ref

Use with: `devops-infra/03` (CI/CD), `improvement/06` (iterative refinement)

## ⚡ Action Checklist
- [ ] Every migration has a working DOWN script
- [ ] Test migration + rollback on staging before prod
- [ ] Backfill large data changes in batches (< 1000 rows per batch)
- [ ] Never modify migration files already merged to main
- [ ] Backup production DB before running destructive migrations
