# 🖥️ 05 — SDK & Library Design

> 🟡 Intermediate | Prereq: 01, 03 | ~7 min

SDK = your API's handshake. A great SDK makes developers feel smart. A bad SDK makes them rewrite from scratch.

---

## 5.1 Surface Area Design

| Principle | Good | Bad |
|-----------|------|-----|
| **Minimal surface** | `client.orders.create({...})` | `client.post("/v1/orders", {...})` |
| **Progressive complexity** | Simple defaults, opt-in advanced | Everything required upfront |
| **Consistent naming** | `.create()`, `.list()`, `.get()`, `.update()`, `.delete()` | Mix of `.add()`, `.fetch()`, `.remove()` |
| **Predictable returns** | Always `Promise<Result<T>>` | Sometimes throws, sometimes null |

---

## 5.2 TypeScript SDK Pattern

```ts
// ✅ Great DX
const acme = new Acme({ apiKey: process.env.ACME_KEY });

// CRUD = predictable
const order = await acme.orders.create({ items: [{ sku: "W", qty: 2 }] });
const list = await acme.orders.list({ status: "pending", limit: 10 });

// Pagination = auto-iterable
for await (const order of acme.orders.listAll({ status: "pending" })) {
  console.log(order.id);
}

// Errors = typed
try { await acme.orders.cancel("bad_id"); }
catch (e) {
  if (e instanceof AcmeError) {
    e.code;    // "NOT_FOUND"
    e.status;  // 404
    e.docsUrl; // "https://docs.acme.com/errors#not_found"
  }
}
```

---

## 5.3 Configuration & Sensible Defaults

```ts
const client = new SDK({
  apiKey: "...",              // Required
  // Everything below = optional, sensible defaults
  environment: "production",  // "production" | "sandbox"
  timeout: 30_000,            // 30 seconds
  retries: 3,                 // Auto-retry on 429/5xx
  idempotency: true,          // Auto idempotency keys
  telemetry: true,            // Opt-out, not opt-in
});
```

---

## 5.4 Migration Guide Template

```md
# SDK v2 → v3 Migration

## Why v3?
- Smaller bundle (tree-shakeable)
- Type-safe error handling
- Auto-pagination

## Breaking Changes
| v2 | v3 |
|----|----|
| `client.createOrder()` | `client.orders.create()` |
| Throws strings | Throws `AcmeError` |

## Migration
```diff
- const order = await client.createOrder({ items });
+ const order = await client.orders.create({ items });
```
```

---

## 5.5 Anti-Patterns

```
❌ 50 methods on one client
✅ Resource grouping: client.orders.xxx, client.users.xxx

❌ No TypeScript types
✅ Auto-generate types from OpenAPI

❌ v2 → v3 with no migration guide
✅ Migration guide + codemod (automated upgrade)
```

---

## ⚡ Action Checklist

- [ ] SDK surface area: < 7 top-level resources, < 5 methods each
- [ ] Every async function returns typed result, never throws raw
- [ ] Sensible defaults (retries, timeout, idempotency) — opt-out
- [ ] Migration guide exists for each major version bump
- [ ] Types auto-generated from OpenAPI, not hand-maintained
