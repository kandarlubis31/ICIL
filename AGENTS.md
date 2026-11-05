# AGENTS.md — ICIL Agent Guide

> **Ambient context for any AI agent working in this repo.** Load this file first — it's the single source of truth for how ICIL is structured and how to work in it. (~1.4k tokens)

---

## What is ICIL?

**ICIL (Intelligence Campus Interactive Library)** — a curated knowledge base of 243 markdown "courses" across 32 "faculties", designed to be loaded as **context injection** for AI agents. Not a RAG corpus — a **static curated context library**. Each `.md` file is self-contained expert knowledge on one topic.

**Current version:** v27.1.0 | **Faculties:** 32 | **Courses:** 243 | **Language:** English | **Newest:** `anti-slop` (AI output quality)

---

## Repo Layout

```
inteligence_mas-aul/
├── AGENTS.md              # ← THIS FILE — load first
├── index.json             # Machine-readable catalog + auto-router (trigger_keywords)
├── index.md               # Ultra-compact AI entry point (~900 tokens)
├── campus-core.js         # Shared library (searchCampus, getCourseContent, etc.)
├── load-context.js        # CLI auto-router: `node load-context.js "prompt"`
├── mcp-server.js          # MCP server (10 tools: search_campus, load_course, list_faculties, search_across, compare_courses, get_campus_stats, search_by_faculty, get_course_prerequisites, export_course, recommend_learning_path)
├── CAMPUS-OVERVIEW.md     # Full overview + 19 cross-faculty task paths
├── CONTEXT.md             # Session save state
├── CHANGELOG.md           # Version history
├── CONTRIBUTING.md        # Contribution guide + course template
├── eval-set.json          # 244 routing + 20 abstention prompts (EN+ID, 4 difficulty tiers, near-miss regressions)
├── eval-runner.js         # Eval runner: P@3, R@3, MRR, CI gate
├── ci-validate.js         # CI validator: schema, duplicates, cross-refs, eval gate
├── ci-faculty.js          # New-faculty contract validator
├── SECURITY.md            # Security model + private vulnerability reporting
├── tests/                 # Unit tests (node:test) for core, path guard, levels
├── scripts/mcp-smoke.js   # JSON-RPC smoke test for all 10 MCP tools
├── .github/workflows/ci.yml      # Test + audit + schema + eval + MCP smoke
├── .github/workflows/faculty.yml # Faculty-addition PR workflow
├── .github/dependabot.yml        # Weekly npm + monthly Actions updates
├── .gitattributes                # LF normalization
├── .editorconfig                 # Editor defaults
├── audit/                 # Audit runner, manifest, checkpoint
├── eval/                  # Legacy eval scripts (eval-prompts.json era, pre-v24.1)
├── archive/               # Archive of deprecated files
├── {32 faculty dirs}/     # Each: README.md + 7-10 .md courses
└── package.json
```

---

## How to Route a User Prompt

```bash
# CLI — auto-matches prompt to relevant faculties
node load-context.js "build an accessible landing page"
node load-context.js "prompt" --json    # programmatic
node load-context.js --list             # all faculties

# Programmatic (Node.js)
const { searchCampus } = require('./campus-core');
const result = searchCampus("user prompt");
```

The auto-router uses **word-boundary keyword matching** (HIGH → MEDIUM → LOW priority tiers) with `negative_keywords` to filter false-positives. See `index.json → auto_router`.

- Keywords are **bilingual EN+ID**; `auto_router.trigger_keywords` holds the Indonesian layer alongside English (v27.1.0 added ~140 ID terms).
- Course ranking is **direct-match first**: courses explicitly matched by keywords rank above courses auto-loaded as prerequisites, and a faculty's prerequisite chain cannot occupy every slot (`campus-core.js → flattenCourseResults`).
- `matchKeywords()` returns courses with an `isDirect` flag; `flattenCourseResults(results)` gives the canonical ranked list across faculties.

---

## Conventions (Follow These)

### Course File Format (compact, ~400-600 words)
```markdown
# 🏷️ XX — Course Title

> 🟢/🟡/🔴 Level | Prereq: IDs or — | ~N min

One-paragraph intro.

---

## X.1 Section
Table or code block. Dense, no fluff.

## X.2 Section
...

## ⚡ Action Checklist
- [ ] Actionable item
```

### Adding a New Faculty
1. Create `kebab-case-dir/` with `01-course.md` … `07-course.md` + `README.md`
2. Add to `index.json`: version bump, `totalCourses`, `faculties` entry (with `courses` array), `trigger_keywords` entry (high/medium/low + negative_keywords)
3. Add routing example to `index.json → routing_rules.examples`
4. Update: `README.md` (tree + faculty list), `CAMPUS-OVERVIEW.md`, `CONTEXT.md`, `CHANGELOG.md`, `index.md`, `package.json` (version + files array), `PROGRESS-REPORT.md`
5. Add emoji to `index.json → faculties[slug].emoji` (single source of truth, validated by ci-validate.js)

### Adding a Course to Existing Faculty
1. Create `XX-course.md` following compact format
2. Add course entry to `index.json → faculties[slug].courses`
3. Update faculty `README.md` course table + keyword index
4. Bump `totalCourses` in `index.json` + `package.json` description

---

## Key Rules

- **English only** in course content (auto-router keywords are bilingual EN+ID; Indonesian examples/quotes are allowed inside English prose)
- **Compact format** — avg ~500 words/course. Tables > prose. No ASCII art bloat.
- **Self-contained** — each file stands alone as context
- **Research-backed** — cite sources, don't guess
- **Cross-referenced** — use "ICIL Cross-Ref" sections to link related courses
- **No build step** — pure markdown + Node.js scripts. `node >= 18`.
- **Security** — all course reads go through `getCourseContent()` (two-segment `.md` paths inside the repo only). Do not add file writes, network calls, or shell execution to MCP tools. See `SECURITY.md`.
- **MCP output budget** — list/stat tools default to compact responses; bulk course details are opt-in (`includeCourses=true`, `includeFaculties=true`).

---

## Testing Changes

```bash
# Validate index.json is valid JSON
node -e "JSON.parse(require('fs').readFileSync('index.json','utf-8')); console.log('✓ index.json valid')"

# Test auto-router
node load-context.js "accessible forms" --json
node load-context.js "build a RAG chatbot" --json

# Test campus-core exports
node -e "const c=require('./campus-core'); console.log(Object.keys(c))"

# Unit tests (path guard, all 243 courses, level parsing)
npm test

# Every local gate: tests + audit + CI + faculty contracts + MCP smoke
npm run verify

# Dependency audit (CI gate: high/critical = fail)
npm audit --omit=dev --audit-level=high

# Full CI gate
node ci-validate.js --with-eval

# Validate all faculty contracts and the new-faculty contract locally
npm run ci:faculty
node ci-faculty.js --faculty <slug>

# Off-topic abstention suite only
node eval-runner.js --abstention

# MCP server smoke test (JSON-RPC, verifies all 10 tools)
npm run mcp:smoke
```

---

## Current Faculties (32)

`warna` `ux-psikologi` `ux-writing` `tipografi` `layout` `design-patterns` `animasi` `branding` `aksesibilitas` `improvement` `kognisi` `mobile-ux` `data-viz` `design-systems` `conversational-ui` `strategic-design` `service-design` `software-engineering` `devops-infra` `database-management` `ai-integration` `security` `performance` `testing-qa` `dx` `ia` `agentic-engineering` `ux-research` `design-ethics` `knowledge-context` `penulisan-gaul` `anti-slop`

Use `node load-context.js --list` for full details.

---

*ICIL is agent-first. This file is the entry point. — Mas Aul 🔥*
