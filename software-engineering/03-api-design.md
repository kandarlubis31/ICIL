# ⚙️ 03 — API Design

> 🟡 Intermediate | Prereq: 02 | ~9 min

APIs are the contract between systems. A well-designed API is intuitive, consistent, and resilient to change. This covers REST, GraphQL, and gRPC with design principles applicable to all.

---

## 3.1 REST API Design Rules

| Rule | Do | Don't |
|------|----|----- |
| **Resources, not verbs** | `GET /orders/123` | `GET /getOrder?id=123` |
| **Plural nouns** | `/users`, `/products` | `/user`, `/getProducts` |
| **HTTP status codes** | 201 Created, 404 Not Found | 200 OK for everything |
| **Pagination** | `?page=2&limit=50` | Return all 10,000 rows |
| **Versioning** | `/v1/orders` or `Accept: version=1` | Break existing clients |

## 3.2 REST vs GraphQL vs gRPC

| | REST | GraphQL | gRPC |
|---|------|---------|------|
| Data shape | Server decides | Client specifies | Proto contract |
| Over-fetching | Common | Solved | N/A (compact) |
| Caching | Built-in (HTTP) | Complex | Not standard |
| Best for | CRUD, public APIs | Complex UIs, mobile | Internal microservices |

## 3.3 API Response Envelope

```ts
// Consistent response wrapper
interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error?: {
    code: string;
    message: string;
    details?: Record<string, string>;
  };
  meta?: {
    page: number;
    totalPages: number;
    total: number;
  };
}

// Good: /api/v1/orders/123
// { success: true, data: { id: 123, status: "shipped", ... } }

// Good: /api/v1/orders/99999
// { success: false, error: { code: "NOT_FOUND", message: "Order #99999 not found" } }
```

## 3.4 Rate Limiting Headers

```
# Legacy convention (still widely used: GitHub, Twitter/X)
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 73
X-RateLimit-Reset: 1721030400

# RFC 9421 standard (Aug 2023) — prefer for new APIs
RateLimit-Limit: 100
RateLimit-Remaining: 73
RateLimit-Reset: 1721030400

Retry-After: 3600
```

## 3.5 Anti-Patterns

- **200 OK for errors** — use 400/404/422/500 appropriately
- **Nested resources > 2 levels** — `/users/1/orders/5/items/3` → use `/order-items/3`
- **Breaking changes without versioning** — rename a field = break all clients

## 3.6 ICIL Cross-Ref

Use with: `design-patterns/06` (feedback states), `ux-writing/04` (error messages)

## ⚡ Action Checklist

- [ ] Every endpoint returns a consistent response envelope
- [ ] Pagination on every list endpoint (default 25, max 100)
- [ ] Errors include machine-readable `code` + human-readable `message`
- [ ] API versioned from day 1 (URL prefix or header)
- [ ] Rate limiting headers on all authenticated endpoints
