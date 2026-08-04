# ICIL Content Audit

> Research-backed audit protocol for the 30-faculty, 226-course catalog.

This directory separates editorial/content review from the release and CI checklist in `AUDIT-PLAN.md`. The audit is intentionally evidence-based: automated scans identify candidates, while research review decides whether a course is accurate, current, well-scoped, and useful for context injection.

## Scope

- **Catalog baseline:** ICIL v26.0.0, 30 faculties, 226 courses.
- **Audit date baseline:** 2026-08-01.
- **Primary source of catalog truth:** `index.json`.
- **Current router baseline:** P@3 73.7%, R@3 96.0%, MRR 0.934.
- **No automatic rewrite policy:** scanners may flag a course, but they must not rewrite content or mark a course research-verified.

## Status vocabulary

| Status | Meaning |
|---|---|
| `automated_pass` | Structural scan found no configured issue. Not an editorial approval. |
| `structural_review` | Structural or risk signal requires human/research review. |
| `verified` | Claims and sources reviewed against the rubric. |
| `verified_with_notes` | Substantively sound, with documented limitations or freshness notes. |
| `needs_sources` | Important claims lack adequate evidence. |
| `needs_update` | Research found stale, inaccurate, or version-sensitive guidance. |
| `structural_fix` | Format, link, metadata, or organization needs correction. |
| `major_rewrite` | Scope or substance needs substantial revision. |
| `deprecated` | Content should no longer be used; replacement must be recorded. |

`automated_pass` and `review` are initial scan results only. Only a documented research review may promote a course to `verified` or `verified_with_notes`.

## Per-course rubric

Review each course against these dimensions:

1. **Accuracy** — concepts, examples, definitions, and code are correct.
2. **Freshness** — APIs, standards, tooling, security guidance, and regulation match the target date/version.
3. **Evidence** — material claims have appropriate sources; primary sources are preferred.
4. **Completeness** — scope, caveats, prerequisites, and failure modes are covered.
5. **Actionability** — checklist items are concrete and verifiable.
6. **Clarity** — structure is scannable, self-contained, and English-only as required.
7. **Context fitness** — signal-dense, non-duplicative, and suitable for deterministic loading.
8. **Relationships** — prerequisites and cross-faculty references are valid and explain the relationship.

A review record should answer:

```text
course: faculty/XX
status: verified | verified_with_notes | needs_sources | needs_update | ...
reviewedAt: YYYY-MM-DD
researchCutoff: YYYY-MM-DD
sourceTier: primary | expert_secondary | community
sources: canonical URLs and relevant editions
findings: factual observations, not vague impressions
actions: keep, clarify, update, remove, split, cross-reference
routingImpact: none | inspect | regression-required
auditor: name or agent
```

## Source policy

Prefer sources in this order:

1. Official specifications, standards, documentation, advisories, and primary papers.
2. Peer-reviewed work, established technical books, and engineering documentation from recognized organizations.
3. Community tutorials and forums only as discovery aids or corroborating material.

Record an access/review date for fast-moving sources. Suggested review cadence:

- evergreen principles: annually or when evidence changes;
- framework/API/tool guidance: every 3–6 months or on major releases;
- security, AI, browser, and regulatory guidance: event-driven plus scheduled review;
- eval prompts and router metadata: after every catalog/content change.

Do not add frontmatter to all 226 files as part of this first pass. Keep audit metadata outside the course content until the schema and workflow have proven useful; this avoids context bloat and a mass diff.

## Workflow

### 1. Generate the structural baseline

```bash
node audit/generate-manifest.js --date 2026-08-01
```

This regenerates `audit/audit-manifest.json` from `index.json` and the actual course files. It does not edit course content.

### 2. Review by risk, not alphabetically

Use the resumable planner to select the next priority faculty and persist a checkpoint:

```bash
npm run audit:loop
npm run audit:status
npm run audit:loop -- --json
```

The planner regenerates the manifest, selects the first priority faculty with `researchStatus: "unreviewed"`, and writes `audit/audit-checkpoint.json`. It stops at the research gate: it never invents sources or findings, marks a course verified, or edits course content. After completing the report and running the validation commands below, run `npm run audit:loop` again to advance automatically.

Recommended order:

1. `knowledge-context` pilot;
2. `security`, `ai-integration`, `agentic-engineering`, `devops-infra`;
3. `database-management`, `performance`, `testing-qa`, `software-engineering`;
4. design systems, conversational UI, mobile UX, DX, IA, service/strategic design;
5. evergreen design, cognition, research, ethics, branding, and improvement faculties.

One completed batch is one faculty or 5–10 courses. Each batch must include research notes, content changes (if any), README/index review, routing/eval review, and CI. The planner's checkpoint is queue state, not evidence of completion.

### 3. Validate every batch

```bash
node ci-validate.js --with-eval
npm run ci:faculty
npm run eval:ci
```

Save the before/after metrics before changing router keywords. A content correction must not be mixed silently with a routing-tuning change.

### 4. Record decisions

Use `faculty-reports/<faculty>.json` for substantive findings. A report should list reviewed courses, source links, unresolved risks, and exact follow-up actions. Do not mark an entire faculty complete merely because its files pass CI.

## Pilot

`faculty-reports/knowledge-context.json` is the first research pilot. It reviews the source families cited by the ten courses and identifies claims requiring version or access-date qualification. It deliberately does not rewrite the ten course files yet.
