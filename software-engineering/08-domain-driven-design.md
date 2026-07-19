# ⚙️ 08 — Domain-Driven Design & Bounded Contexts

> **Level: 🔴 Advanced** | Prerequisite: software-engineering/01,02 | ~10 min

DDD bridges the gap between business complexity and code. Instead of "model the database," you model the domain — aligning code structure with how domain experts think. Essential for complex systems where CRUD isn't enough.

---

## 8.1 Core Building Blocks

| Block | What It Is | Example (E-Commerce) |
|-------|-----------|---------------------|
| **Entity** | Object with identity that persists through state changes | `Order` (identity = orderId, even if status changes) |
| **Value Object** | Immutable, no identity — defined by its attributes | `Money { amount: 29.99, currency: "USD" }` |
| **Aggregate** | Cluster of entities + VOs treated as a single unit | `Order` aggregate: Order (root) → OrderLine[] → ShippingAddress |
| **Domain Event** | Something that happened that domain experts care about | `OrderPlaced`, `PaymentRefunded` |
| **Repository** | Mediates between domain and data mapping — like a collection | `OrderRepository.save(order)`, `.findById(id)` |
| **Domain Service** | Stateless operation that doesn't naturally belong to an entity | `PricingService.calculateDiscount(order)` |
| **Factory** | Creates complex aggregates | `OrderFactory.createFromCart(cart)` |

**Aggregate rules:**
- Only access aggregate via its root entity
- One transaction = one aggregate
- Reference other aggregates by ID only (not object reference)

```typescript
// ✅ Reference by ID
class OrderLine {
  productId: string;  // not: product: Product
}

// ❌ Don't nest aggregates
class Order {
  lines: OrderLine[];
  customer: Customer;  // ← Customer is another aggregate!
}
```

---

## 8.2 Ubiquitous Language

A shared language between devs and domain experts — used in code, conversations, and docs. No translation layer.

| Business Term | Ubiquitous Language | NOT |
|--------------|-------------------|-----|
| "Cancel order before it ships" | `order.cancel(shippingStatus)` | `OrderService.setStatus(5)` |
| "Apply loyalty discount" | `pricing.applyLoyaltyDiscount(customer)` | `PriceCalc.discountFlag = 1` |
| "Reserve inventory" | `inventory.reserve(sku, quantity)` | `UPDATE stock SET reserved = 1` |

**Smell test:** If you need a comment to explain what a variable means in business terms, your ubiquitous language is broken.

---

## 8.3 Bounded Contexts

A bounded context is a semantic boundary where a term has ONE specific meaning.

```
┌──────────────────────┐       ┌──────────────────────┐
│     ORDERING         │       │     SHIPPING         │
│                      │       │                      │
│  "Product" =         │  ───▶ │  "Product" =         │
│  name + price +      │ event │  SKU + weight +      │
│  catalog image       │       │  dimensions + hazmat │
│                      │       │                      │
│  "Customer" =        │       │  "Customer" =        │
│  name + email +      │       │  address + contact   │
│  payment method      │       │  phone + delivery    │
│                      │       │  preferences         │
└──────────────────────┘       └──────────────────────┘
```

**Context Map patterns:**

| Pattern | When | Implementation |
|---------|------|---------------|
| **Shared Kernel** | Teams share a subset of the model | Shared lib/package with strict versioning |
| **Customer/Supplier** | Upstream defines, downstream consumes | Upstream API contract, downstream adapts |
| **Conformist** | Downstream has no influence — just conforms | Anti-corruption layer optional |
| **Anti-Corruption Layer** | Downstream protects its model from upstream's model | Adapter + translator between contexts |
| **Open Host Service** | Upstream provides a well-defined API for all | REST/gRPC with published schema |
| **Published Language** | Standard format all contexts use | Protobuf, JSON Schema, Avro — versioned |

---

## 8.4 Tactical Design Patterns

### Event Storming (Discovery Technique)
```
Domain Event (orange) → Command (blue) → Aggregate (yellow) → Policy (purple) → Read Model (green)
      │                      │                  │                  │
  "Order Placed"      "Place Order"       "Order"         "When Order Placed
                                                           → Reserve Inventory"
```

### Layered Architecture for a Bounded Context
```
┌─────────────────────────────────┐
│         INTERFACE LAYER         │  ← HTTP/gRPC/GraphQL controllers
├─────────────────────────────────┤
│        APPLICATION LAYER        │  ← Use cases, orchestration, transactions
├─────────────────────────────────┤
│          DOMAIN LAYER           │  ← Entities, VOs, aggregates, domain services
├─────────────────────────────────┤
│       INFRASTRUCTURE LAYER      │  ← Repositories, message bus, external APIs
└─────────────────────────────────┘
```

**Dependency rule:** Dependencies point inward. Domain layer has ZERO external dependencies.

```typescript
// ✅ Domain layer: pure, no framework code
class Order {
  place(): OrderPlaced {
    if (this.status !== 'draft') throw new Error('Only draft orders can be placed');
    return new OrderPlaced(this.id, this.total);
  }
}

// ❌ Domain should NOT know about HTTP or DB
class Order {
  async place(db: PrismaClient) { ... }  // ← NO!
}
```

---

## 8.5 When to Use DDD

| Use DDD | Skip DDD |
|---------|----------|
| Complex business rules (many if/else, state machines) | Simple CRUD forms |
| Multiple stakeholders with different mental models | Single-table admin panels |
| Domain evolves rapidly — needs shared language | Purely technical systems (CDN, logging) |
| Multiple bounded contexts interacting | Greenfield without domain expert access |

---

## ⚡ Action Checklist

- [ ] Run an Event Storming session with domain experts — capture domain events first, then commands + aggregates
- [ ] Define bounded contexts: what does "User" mean in auth vs billing vs support?
- [ ] Identify aggregate roots — one per transaction boundary
- [ ] Use ubiquitous language in code: rename `setStatus(5)` to `cancel()`
- [ ] Domain layer: zero imports from frameworks, ORMs, or HTTP libraries
- [ ] Reference other aggregates by ID only — no nested object graphs across contexts

> **ICIL Cross-Ref:** software-engineering/01 (SOLID), software-engineering/02 (Architecture), software-engineering/07 (Project Structure & DI), software-engineering/09 (Event Sourcing/CQRS)
