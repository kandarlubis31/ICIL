# AGENTS.md — ICIL Agent Guide

> **Ambient context for any AI agent working in this repo.** Load this file first — it's the single source of truth for how ICIL is structured and how to work in it. (~350 tokens)

---

## What is ICIL?

**ICIL (Intelligence Campus Interactive Library)** — a curated knowledge base of 216 markdown "courses" across 29 "faculties", designed to be loaded as **context injection** for AI agents. Not a RAG corpus — a **static curated context library**. Each `.md` file is self-contained expert knowledge on one topic.

**Current version:** v25.0.5 | **Faculties:** 29 | **Courses:** 216 | **Language:** English

---

## Repo Layout

```
inteligence_mas-aul/
├── AGENTS.md              # ← THIS FILE — load first
├── index.json             # Machine-readable catalog + auto-router (trigger_keywords)
├── index.md               # Ultra-compact AI entry point (491 tokens)
├── campus-core.js         # Shared library (searchCampus, getCourseContent, etc.)
├── load-context.js        # CLI auto-router: `node load-context.js "prompt"`
├── mcp-server.js          # MCP server (10 tools: search_campus, load_course, list_faculties, search_across, compare_courses, get_campus_stats, search_by_faculty, get_course_prerequisites, export_course, recommend_learning_path)
├── CAMPUS-OVERVIEW.md     # Full overview + 16 cross-faculty task paths
├── CONTEXT.md             # Session save state
├── CHANGELOG.md           # Version history
├── CONTRIBUTING.md        # Contribution guide + course template
├── eval-set.json          # 200-prompt eval set (EN+ID bilingual, 3 difficulty tiers)
├── eval-runner.js         # Eval runner: P@3, R@3, MRR, CI gate
├── ci-validate.js         # CI validator: schema, duplicates, cross-refs, eval gate
├── eval/                  # Legacy eval scripts (eval-prompts.json era, pre-v24.1)
├── archive/               # Archive of deprecated files
├── {29 faculty dirs}/     # Each: README.md + 7-10 .md courses
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

- **English only** in course content (auto-router keywords are bilingual EN+ID)
- **Compact format** — avg ~500 words/course. Tables > prose. No ASCII art bloat.
- **Self-contained** — each file stands alone as context
- **Research-backed** — cite sources, don't guess
- **Cross-referenced** — use "ICIL Cross-Ref" sections to link related courses
- **No build step** — pure markdown + Node.js scripts. `node >= 18`.

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

# MCP server smoke test (starts server, kill with Ctrl+C)
node mcp-server.js
```

---

## Current Faculties (29)

`warna` `ux-psikologi` `ux-writing` `tipografi` `layout` `design-patterns` `animasi` `branding` `aksesibilitas` `improvement` `kognisi` `mobile-ux` `data-viz` `design-systems` `conversational-ui` `strategic-design` `service-design` `software-engineering` `devops-infra` `database-management` `ai-integration` `security` `performance` `testing-qa` `dx` `ia` `agentic-engineering` `ux-research` `design-ethics`

Use `node load-context.js --list` for full details.

---

*ICIL is agent-first. This file is the entry point. — Mas Aul 🔥*
