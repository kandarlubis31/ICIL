# 🗃️ 06 — Provenance, Freshness & Governance

> 🔴 Advanced | Prereq: 03, 04 | ~10 min

A retrieved document is only as trustworthy as its origin, review history, and currentness. Provenance makes claims traceable; freshness prevents stale guidance from silently steering an agent; governance defines who can change the knowledge layer and how those changes are approved.

---

## 6.1 Minimum Provenance Record

```json
{
  "source": "knowledge-context/05-context-retrieval-routing.md",
  "authority": "ICIL maintainers",
  "version": "26.0.0",
  "updated_at": "2026-08-01",
  "review_status": "reviewed",
  "supersedes": null,
  "license": "MIT"
}
```

For external sources, record the URL, publisher, retrieval date, and relevant edition. A citation is not proof of correctness, but it makes review possible.

## 6.2 Freshness Policy

Not every document needs the same refresh interval:

| Content | Freshness strategy |
|---|---|
| Stable principles | Review on major version or evidence change |
| API/tool syntax | Check on dependency release |
| Security guidance | Continuous watch + scheduled review |
| Product policy | Owner approval and expiry date |
| Eval prompts | Review after routing/content changes |

Use explicit states such as `current`, `needs-review`, `deprecated`, and `superseded`. Avoid deleting old material without recording what replaced it.

## 6.3 Governance Workflow

```text
proposal → owner review → technical validation → content review
        → catalog update → routing/eval update → release note
```

Separate authoring permission from publishing permission for sensitive policy. Require an owner for every faculty and a review date for high-risk content.

## 6.4 Conflict Resolution

When two sources disagree:

1. Identify whether they describe different versions or contexts.
2. Prefer the authoritative, newer, task-relevant source.
3. Preserve the conflict in metadata or a note when it matters.
4. Do not merge contradictory rules into a vague compromise.
5. Escalate unresolved policy conflicts to a human owner.

## ⚡ Action Checklist

- [ ] Attach source, version, owner, and review status to important content
- [ ] Define freshness by content risk and change rate
- [ ] Record supersession instead of silently deleting history
- [ ] Add human ownership for policy and security material
- [ ] Treat conflicts as review items, not retrieval noise

> **Next:** [07 — Context Evaluation & Regression Testing](./07-context-evaluation-regression.md) — prove that context changes improve rather than degrade routing.

**Sources:** NIST AI RMF 1.0 (2023); W3C PROV-O (2013); ISO 30401 Knowledge Management Systems (2018).
