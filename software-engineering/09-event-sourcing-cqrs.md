# ⚙️ 09 — Event Sourcing, CQRS & Event-Driven Systems

> **Level: 🔴 Advanced** | Prerequisite: software-engineering/02,08 | ~10 min

Traditional CRUD stores current state. Event Sourcing stores the *history of changes* — every mutation is an immutable event. CQRS separates reads from writes for independent scaling. Together, they power audit trails, temporal queries, and distributed systems.

---

## 9.1 Event Sourcing — Store Events, Not State

```
CRUD:
  UPDATE orders SET status='shipped' WHERE id=123
  → You LOST that it was 'packed' for 2 days before shipping

Event Sourcing:
  APPEND OrderPacked(orderId=123, packedAt=...)
  APPEND OrderShipped(orderId=123, trackingId=TRK456, shippedAt=...)
  → Full audit trail. You can ask: "How long was it packed before shipping?"
```

| Concept | CRUD Approach | Event Sourcing |
|---------|--------------|----------------|
| **Storage** | Current state row | Append-only event log |
| **Update** | `UPDATE ... SET` | `APPEND new event` |
| **Read** | `SELECT ... WHERE` | Replay events → project current state |
| **Delete** | `DELETE` (gone forever) | Append `OrderCancelled` event (soft delete) |
| **History** | Audit table (optional, often missing) | Every change is in the log |

**Event Store (table structure):**
```sql
CREATE TABLE events (
  stream_id    UUID NOT NULL,        -- aggregate ID (e.g., orderId)
  version      INTEGER NOT NULL,     -- monotonically increasing per stream
  event_type   TEXT NOT NULL,        -- 'OrderPlaced', 'OrderShipped'
  payload      JSONB NOT NULL,       -- event data
  metadata     JSONB,                -- correlationId, causationId, userId
  occurred_at  TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (stream_id, version)
);
```

---

## 9.2 CQRS — Separate Read from Write

```
┌──────────┐     COMMANDS      ┌──────────────┐     EVENTS     ┌──────────────┐
│  CLIENT  │ ───────────────▶  │  WRITE MODEL │ ─────────────▶ │  READ MODEL  │
│          │                   │  (aggregates)│                │  (projections)│
│          │ ◀───────────────  └──────────────┘                └──────────────┘
└──────────┘     QUERIES                                       │ denormalized │
                                                               │ for reads    │
```

| Side | Optimized For | DB Type | Example |
|------|--------------|---------|---------|
| **Write** | Consistency, invariants | Event Store / normalized tables | PostgreSQL, EventStoreDB |
| **Read** | Query performance, denormalized | Projection tables / materialized views | PostgreSQL read replica, Elasticsearch |

```typescript
// Command side (write)
class PlaceOrderCommand {
  constructor(
    readonly customerId: string,
    readonly items: { sku: string; qty: number }[]
  ) {}
}

class OrderCommandHandler {
  async handle(cmd: PlaceOrderCommand): Promise<void> {
    const order = Order.place(cmd);
    await this.eventStore.append(order.streamId, order.uncommittedEvents);
    // Events published → read side updates asynchronously
  }
}

// Query side (read)
class OrderSummaryQuery {
  async getOrdersByCustomer(customerId: string): Promise<OrderSummary[]> {
    // Reads from pre-built projection — no joins, no business logic
    return this.db.query('SELECT * FROM order_summaries WHERE customer_id = $1', [customerId]);
  }
}
```

---

## 9.3 Projections — Building Read Models from Events

```typescript
class OrderProjection {
  async handleOrderPlaced(event: OrderPlaced): Promise<void> {
    await this.db.query(`
      INSERT INTO order_summaries (order_id, customer_id, total, status, placed_at)
      VALUES ($1, $2, $3, 'placed', $4)
    `, [event.orderId, event.customerId, event.total, event.occurredAt]);
  }

  async handleOrderShipped(event: OrderShipped): Promise<void> {
    await this.db.query(`
      UPDATE order_summaries
      SET status = 'shipped', tracking_id = $2, shipped_at = $3
      WHERE order_id = $1
    `, [event.orderId, event.trackingId, event.occurredAt]);
  }
}
```

**Rebuilding projections:** Replay all events from the beginning — the ultimate backup strategy.

---

## 9.4 Event-Driven Architecture Patterns

| Pattern | Description | Tool |
|---------|-------------|------|
| **Event Notification** | "Something happened" — downstream fetches details | Webhooks, SNS |
| **Event-Carried State Transfer** | Event contains full payload — downstream fully self-sufficient | Kafka compacted topics |
| **Event Sourcing** | Events are the source of truth — state is derived | EventStoreDB, Axon |
| **Saga / Process Manager** | Long-running transaction across services via compensating events | Temporal, Camunda, custom |
| **Outbox Pattern** | Write events to DB + publish to broker atomically | Debezium, transactional outbox table |

---

## 9.5 When to Use (and When NOT)

| Use Event Sourcing + CQRS | Use CRUD |
|---------------------------|----------|
| Full audit trail required (finance, healthcare) | Simple forms, blogs, marketing sites |
| Complex business logic with state machines | Transactions are single-aggregate, straightforward |
| Read patterns diverge from write patterns (many query types) | Read = show current state (no complex projections) |
| Temporal queries: "What was the order state on Jan 15?" | No need for time-travel queries |
| Multiple read models needed (search, reporting, analytics) | Single consumer of data |

**Cost of Event Sourcing:**
- Event schema evolution (never delete events, only add new types)
- Eventual consistency between write and read side
- More infrastructure (event store + projections + message broker)
- Replaying millions of events takes time (use snapshots)

---

## ⚡ Action Checklist

- [ ] Model your domain as events: what HAPPENS, not what the state IS
- [ ] Start with event store table (stream_id + version as PK) — simple Postgres works for early stage
- [ ] Separate write and read models — start with same DB, different tables/projections
- [ ] Implement the outbox pattern: write events + publish to broker in one DB transaction
- [ ] Add snapshots when replaying >10K events per aggregate gets slow
- [ ] Version your events: `OrderPlaced_v1` → `OrderPlaced_v2` with upcaster migration

> **ICIL Cross-Ref:** software-engineering/02 (Architecture), software-engineering/08 (DDD), database-management/01 (Relational Design), devops-infra/03 (CI/CD), performance/03 (Backend Optimization)
