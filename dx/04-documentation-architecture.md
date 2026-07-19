# 🖥️ 04 — Documentation Architecture

> 🟡 Intermediate | Prereq: 01 | ~7 min

Docs are the product. Developers spend more time reading docs than writing code against your API. Bad docs = silent killer.

---

## 4.1 Diátaxis Framework

| Doc Type | Answers | Example |
|----------|---------|---------|
| **Tutorial** | "How do I start?" | "Build your first chatbot in 5 min" |
| **How-to Guide** | "How do I do X?" | "Add rate limiting to your API" |
| **Reference** | "What does this do?" | API endpoint reference, CLI flags |
| **Explanation** | "Why does it work this way?" | Architecture decisions, design rationale |

> **Rule**: Never mix types. Tutorial ≠ Reference. How-to ≠ Explanation.

---

## 4.2 Documentation IA

```
docs/
├── getting-started/       ← Tutorial (step-by-step)
│   ├── quickstart.md
│   └── first-integration.md
├── guides/                ← How-to (task-focused)
│   ├── authentication.md
│   └── webhooks.md
├── api-reference/         ← Reference (complete, dry)
│   ├── authentication/
│   └── endpoints/
├── concepts/              ← Explanation (background)
│   ├── architecture.md
│   └── rate-limiting.md
└── sdks/                  ← SDK-specific docs
    ├── node.md
    └── python.md
```

---

## 4.3 Reference Doc Template

```markdown
# POST /v1/orders

Create a new order.

## Request
`POST https://api.example.com/v1/orders`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| items | Item[] | ✅ | Array of order items |
| currency | string | ❌ | Default: USD |

## Example
```curl
curl -X POST https://api.example.com/v1/orders \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"items": [{"sku": "WIDGET", "qty": 2}]}'
```

## Response
| Status | Meaning |
|--------|---------|
| 201 | Order created |
| 400 | Invalid items |
| 401 | Missing auth |

## Response Body (201)
```json
{ "id": "ord_9a7b", "status": "pending", "total": 1998 }
```
```

---

## 4.4 Docs-as-Code

| Practice | Tool |
|----------|------|
| Version control | Git (docs next to code) |
| Linting | Vale, markdownlint |
| Preview | PR previews (Netlify/Vercel) |
| Search | Algolia, Pagefind |
| Analytics | Page views, search queries, "was this helpful?" |

---

## 4.5 Anti-Patterns

```
❌ "The /users endpoint returns user data"
✅ Full request/response example with every field

❌ Docs separate from code
✅ Docs in same repo, PR includes doc changes

❌ Only reference docs
✅ Tutorial + How-to + Reference + Explanation
```

---

## ⚡ Action Checklist

- [ ] Does your docs site have all 4 Diátaxis types?
- [ ] Every API endpoint: request example + response example + error table
- [ ] Quickstart: user completes it in < 5 min (time a new developer)
- [ ] Docs live in same repo as code (PR = code + docs update)
- [ ] Track: which pages have highest bounce? (those need fixing)
