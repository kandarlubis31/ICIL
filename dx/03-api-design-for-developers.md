# 🖥️ 03 — API Design for Developers

> 🟡 Intermediate | Prereq: 01 | ~7 min

Great API = intuitive + predictable + forgiving. This covers the developer-facing experience: onboarding, playground, changelog, deprecation. (For REST/GraphQL/gRPC patterns, see `software-engineering/03`.)

---

## 3.1 API Onboarding Funnel

```
Landing page → Quickstart (5 min) → Interactive tutorial → Real integration
         ↓              ↓                    ↓                    ↓
    Clear value    First call         Confidence           Production
    proposition    successful         building             ready
```

| Stage | Must Have | Drop-off Fix |
|-------|-----------|-------------|
| Landing | Copy-paste curl example | Generic marketing fluff |
| Quickstart | One command to auth + call | Requiring account first |
| Tutorial | Interactive (browser or CLI) | Video-only tutorial |
| Production | SDK, rate limits, support | No migration guide |

---

## 3.2 API Playground / Explorer

```
✅ Swagger UI / Stoplight Elements / Scalar
✅ "Try it" button → real response (not mock)
✅ Pre-filled auth token from current session
✅ Code snippet generator (curl, Python, Node, Go)
✅ Copy-as-curl on every example
```

---

## 3.3 Changelog & Communication

| Event | Channel | Timeline |
|-------|---------|----------|
| New endpoint | Changelog + email | At release |
| Breaking change | Email + in-API warning | **90 days** before |
| Deprecation | `Sunset` header + changelog | **180 days** before removal |
| Security incident | Email + status page | Within 24 hours |

```
// Sunset header — machine-readable deprecation
Sunset: Sat, 31 Dec 2026 23:59:59 GMT
Deprecation: true
Link: <https://docs.example.com/v2/migration>; rel="deprecation"
```

---

## 3.4 SDK Generation Strategy

| Approach | Pros | Cons |
|----------|------|------|
| **OpenAPI → Auto-gen** | 10+ languages instantly | Generic, no idioms |
| **Hand-written** | Idiomatic, best DX | Maintenance burden |
| **Hybrid** | Auto-gen base + hand-tuned | Best balance |

**Rule**: Auto-gen the data layer (types, serialization). Hand-write the ergonomics (auth, retries, pagination).

---

## 3.5 Anti-Patterns

```
❌ Authentication hidden in docs paragraph 5
✅ Auth example = first code block on landing page

❌ "See docs for error codes"
✅ Every error response includes code + message + docs URL

❌ Silent breaking changes
✅ Sunset header + email + changelog + migration guide
```

---

## ⚡ Action Checklist

- [ ] Landing page: copy-paste curl example makes a real API call
- [ ] Quickstart: one command → authenticated → response visible
- [ ] Deprecation policy: 90-day notice, Sunset header
- [ ] Error responses: `code` + `message` + `docs_url` in every error
- [ ] SDK: auto-gen types, hand-tune ergonomics
