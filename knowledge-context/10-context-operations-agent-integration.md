# 🗃️ 10 — Context Operations & Agent Integration

> 🔴 Advanced | Prereq: 05, 06, 07, 09 | ~10 min

A context layer becomes operational when agents can discover it, load scoped material, cite sources, report failures, and survive catalog changes. The goal is not to maximize automation; it is to make context delivery observable, reproducible, and safe.

---

## 10.1 Operational Contract

```text
search(prompt)
  → ranked context manifest
load(manifest)
  → versioned documents + provenance
use(context)
  → answer/action grounded in evidence
report(result)
  → citations, misses, latency, budget, safety signals
```

The manifest should contain the prompt, selected faculties/courses, versions, reasons, prerequisites, and a context budget estimate. This allows a failed answer to be investigated without guessing what the agent saw.

## 10.2 Interfaces

| Interface | Best use |
|---|---|
| CLI | Local debugging and reproducible routing |
| Programmatic API | Applications and test harnesses |
| MCP | Tool-capable agent clients |
| Export | Human review, snapshots, offline bundles |
| CI | Catalog, routing, and link quality gates |

Keep read-only discovery separate from write operations. If an agent can edit knowledge, require explicit authorization, review, validation, and a rollback path.

## 10.3 Observability Signals

Track:

- query and router version
- selected sources and reasons
- retrieval latency and context size
- no-match and low-confidence rates
- citation coverage and user corrections
- stale or suspicious source encounters
- evaluation score by faculty and task type

A dashboard is useful only if each metric leads to an action: tune keywords, revise metadata, update a course, or add a safety control.

## 10.4 Release Runbook

```text
draft course → validate Markdown/links → update catalog
→ add routing/eval cases → run CI + smoke prompts
→ review scope/collisions → update context docs
→ publish version + changelog → monitor regressions
```

For ICIL, `AGENTS.md` remains the operating contract, `index.json` the catalog/router source, `campus-core.js` the shared API, and `mcp-server.js` the agent interface.

## ⚡ Action Checklist

- [ ] Emit a versioned context manifest for every important task
- [ ] Keep CLI, API, MCP, export, and CI responsibilities distinct
- [ ] Track retrieval, freshness, safety, and correction signals
- [ ] Require review and rollback for knowledge writes
- [ ] Use a release runbook for every faculty/catalog change

**Capstone:** Add a new faculty with courses, metadata, routing cases, regression prompts, provenance, and synchronized handoff docs—then prove the result with CI.

**Sources:** OpenTelemetry semantic conventions; NIST AI RMF 1.0 (2023); Model Context Protocol specification.
