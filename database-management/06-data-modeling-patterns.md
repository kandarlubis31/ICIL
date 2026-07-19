# 🗄️ 06 — Data Modeling Patterns

> 🔴 Advanced | Prereq: 01,05 | ~8 min

Data modeling is where architecture meets database. Choosing the right pattern — polymorphic associations, tree structures, versioned data — determines whether your app scales or crumbles.

---

## 6.1 Common Modeling Patterns

| Pattern | Problem | Solution |
|---------|---------|----------|
| **Polymorphic** | Comments on posts AND photos | `commentable_type` + `commentable_id` |
| **Adjacency List** | Hierarchical data (categories) | `parent_id` self-reference |
| **Closure Table** | Fast subtree queries | Separate table of all ancestor-descendant pairs |
| **Versioned** | Track changes over time | `current` flag + `version` number |
| **Event Sourcing** | Full audit trail | Append-only event log, compute state from events |

## 6.2 Adjacency List (Simple Tree)

```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  parent_id INT REFERENCES categories(id)
);

-- Get all children of "Electronics"
WITH RECURSIVE tree AS (
  SELECT id, name, parent_id, 0 AS depth
  FROM categories WHERE name = 'Electronics'
  
  UNION ALL
  
  SELECT c.id, c.name, c.parent_id, t.depth + 1
  FROM categories c
  JOIN tree t ON c.parent_id = t.id
)
SELECT * FROM tree ORDER BY depth;
```

## 6.3 Polymorphic Associations

```sql
-- Instead of separate comment tables per entity
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  body TEXT NOT NULL,
  commentable_type VARCHAR(50) NOT NULL,  -- 'Post' or 'Photo'
  commentable_id INT NOT NULL,
  user_id INT REFERENCES users(id)
);

CREATE INDEX idx_comments_poly 
  ON comments(commentable_type, commentable_id);

-- Query: all comments on Post #42
SELECT * FROM comments 
WHERE commentable_type = 'Post' AND commentable_id = 42;
```

## 6.4 When to Denormalize

```
DENORMALIZE when:
  → Read >> Write (100:1 read/write ratio)
  → Query is slow even with indexes
  → Data changes infrequently

DON'T denormalize when:
  → Data changes frequently (sync nightmare)
  → Write volume is high
  → You haven't tried indexing + caching first
```

## 6.5 Anti-Patterns

- **EAV (Entity-Attribute-Value)** — flexible schema killer: impossible to query efficiently
- **JSON columns for relational data** — if you're querying inside JSON, it belongs in a column
- **No foreign keys** — referential integrity is your safety net

## 6.6 ICIL Cross-Ref

Use with: `database-management/01` (normalization), `software-engineering/02` (architecture)

## ⚡ Action Checklist
- [ ] Trees: adjacency list for simple; closure table for heavy subtree queries
- [ ] Polymorphic: always index (type, id) composite
- [ ] Versioned data: prefer append-only over in-place updates
- [ ] Denormalize as last resort — try indexes, caching, materialized views first
- [ ] Every relationship has a foreign key (enforced at DB level)
