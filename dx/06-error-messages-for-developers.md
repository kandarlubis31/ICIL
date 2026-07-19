# 🖥️ 06 — Error Messages for Developers

> 🟡 Intermediate | Prereq: 01 | ~6 min

Great error messages = the difference between a 30-second fix and a 3-hour debugging session. Every error is a teaching moment.

---

## 6.1 Error Anatomy

```json
{
  "error": {
    "code": "INSUFFICIENT_FUNDS",           // Machine-readable
    "message": "Order #123 requires $50.00 but wallet has $32.00. Add $18.00.",  // Human
    "docs_url": "https://docs.acme.com/errors#insufficient-funds",
    "request_id": "req_9a7b3c",             // For support
    "suggestion": "Top up your wallet or reduce order quantity."  // Actionable
  }
}
```

| Field | Required | Purpose |
|-------|----------|---------|
| `code` | ✅ | `if (e.code === "RATE_LIMITED") retry()` |
| `message` | ✅ | Human-readable, includes context values |
| `docs_url` | Recommended | Link to full explanation + fix |
| `request_id` | Recommended | Debug with support team |
| `suggestion` | Ideal | Tells developer what to do next |

---

## 6.2 Error Code Convention

```
CATEGORY_REASON

AUTH_INVALID_TOKEN        ← VERB_NOUN in SCREAMING_SNAKE_CASE
ORDER_NOT_FOUND
RATE_LIMIT_EXCEEDED
VALIDATION_MISSING_FIELD
```

| Category | Prefix |
|----------|--------|
| Authentication | `AUTH_` |
| Authorization | `FORBIDDEN_` |
| Validation | `VALIDATION_` |
| Resources | `RESOURCE_` |
| Rate limiting | `RATE_` |
| Server | `INTERNAL_` |

---

## 6.3 CLI Error Design

```
$ icil deploy --env prod

✗ Error: Missing required flag --token
  Usage: icil deploy --env <name> --token <api_key>
  Run: icil deploy --help for more info
  Exit code: 2

$ icil deploy --env prod --token bad

✗ Error: Invalid API token (AUTH_INVALID_TOKEN)
  Your token has expired. Run: icil login --refresh
  Docs: https://docs.icil.dev/errors#auth
  Exit code: 1
```

---

## 6.4 Error Catalog

Maintain a single source of truth:

```ts
// errors.ts
export const Errors = {
  AUTH_INVALID_TOKEN: {
    status: 401,
    message: "Token is invalid or expired",
    suggestion: "Run `icil login --refresh` to get a new token",
  },
  RATE_LIMIT_EXCEEDED: {
    status: 429,
    message: "Rate limit of {limit} requests/{window}s exceeded",
    suggestion: "Retry after {retry_after} or upgrade your plan",
  },
} as const;
```

**Benefit**: Every endpoint uses same error format. Change message once → updates everywhere.

---

## 6.5 Anti-Patterns

```
❌ "An error occurred"                   ← Zero information
✅ "Payment failed: card declined (code: CARD_DECLINED)"

❌ 500 for validation errors             ← Wrong status code
✅ 422 for validation, 400 for bad request

❌ Stack trace in production             ← Security risk + noise
✅ request_id → developer looks up details in dashboard
```

---

## ⚡ Action Checklist

- [ ] Every error: `code` + `message` + `request_id` minimum
- [ ] Error codes: SCREAMING_SNAKE_CASE, CATEGORY_REASON pattern
- [ ] Error catalog: single source of truth for all error types
- [ ] CLI: errors include suggestion + `--help` reference
- [ ] Never expose stack traces in production responses
