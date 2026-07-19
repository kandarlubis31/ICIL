# ⚙️ 02 — Software Architecture Patterns

> 🟡 Intermediate | Prereq: 01 | ~9 min

Architecture is the structural foundation — changing it later is 10x more expensive. This covers the 5 most common patterns and when to use each.

---

## 2.1 Architecture Decision Matrix

| Pattern | Best For | Avoid When |
|---------|----------|------------|
| **Monolith** | Early stage, small team, simple domain | Team > 20, need independent deploy |
| **Layered** | Enterprise apps, clear domain separation | High-throughput real-time systems |
| **Microservices** | Large teams, independent scaling | Premature optimization, < 5 devs |
| **Event-Driven** | Async workflows, IoT, real-time | Simple CRUD, debugging complexity |
| **Hexagonal** | Testability, domain-first design | CRUD-heavy, framework-dependent |

## 2.2 Start With Monolith

```
   ┌─────────────────────────────────┐
   │           MONOLITH               │
   │  ┌─────────┐  ┌──────────────┐  │
   │  │   API   │  │  Background   │  │
   │  │  Layer  │  │    Jobs       │  │
   │  └────┬────┘  └──────┬───────┘  │
   │       │              │          │
   │  ┌────┴──────────────┴───────┐  │
   │  │      Service Layer        │  │
   │  └────────────┬──────────────┘  │
   │               │                 │
   │  ┌────────────┴──────────────┐  │
   │  │    Data Access Layer      │  │
   │  └───────────────────────────┘  │
   └─────────────────────────────────┘

Split to microservices ONLY when:
→ Team grows beyond 2-pizza rule
→ Independent deploy cadence needed
→ Clear bounded contexts emerge
```

## 2.3 Event-Driven Architecture

```ts
// Producer
await eventBus.publish('order.placed', {
  orderId: 'ord_123',
  amount: 150.00,
  customerId: 'cus_456'
});

// Consumer (inventory service)
eventBus.subscribe('order.placed', async (event) => {
  await inventory.reserve(event.orderId, event.items);
});

// Consumer (notification service)  
eventBus.subscribe('order.placed', async (event) => {
  await mailer.sendConfirmation(event.customerId, event.orderId);
});
```

## 2.4 Anti-Patterns

- **Distributed monolith** — microservices that share a database (worst of both worlds)
- **Architecture by résumé** — choosing a pattern because it's trendy, not because it fits
- **Over-engineering** — microservices for a 3-person startup's todo app

## 2.5 ICIL Cross-Ref

Use with: `strategic-design/03` (decision frameworks), `service-design/04` (ecosystem maps)

## ⚡ Action Checklist

- [ ] Start with monolith; extract services ONLY when clear boundaries emerge
- [ ] Draw architecture diagram before writing code
- [ ] Identify bounded contexts (order, payment, user, inventory)
- [ ] Choose async communication for cross-service workflows
- [ ] Document architecture decisions in ADR (Architecture Decision Record)
