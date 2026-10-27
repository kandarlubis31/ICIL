# 🧠 SESSION CONTEXT — ICIL

> **Purpose**: If the AI session gets interrupted, load this file first to pick up exactly where we left off. This document is the "save state" for the entire project.

---

## 📍 Current Status

| Attribute | Value |
|-----------|-------|
| **Project** | ICIL — Intelligence Campus Interactive Library |
| **Version** | v27.1.0 |
| **Language** | English (fully translated from Indonesian) |
| **Total Courses** | 243 |
| **Total Faculties** | 32 active |

| **Root files** | AGENTS.md, README.md, SECURITY.md, index.json, campus-core.js, load-context.js, mcp-server.js, index.md, CAMPUS-OVERVIEW.md, CONTEXT.md, CHANGELOG.md, PROGRESS-REPORT.md, eval-set.json, eval-runner.js, ci-validate.js, ci-faculty.js, ROADMAP-v2.md, AUDIT-PLAN.md, ISSUES.md, SKILL.md |
| **Tests** | `npm test` — 15 `node:test` cases (path guard, catalog invariants, ranking, docs + README drift, level parsing) |
| **Eval Set** | `eval-set.json` v1.4.0 — 251 routing + 20 abstention prompts |
| **Faculty CI** | `.github/workflows/faculty.yml` — validates new-faculty PRs against the base commit |

### 🏛️ Faculty Addition CI

When a pull request adds a faculty, GitHub Actions runs `node ci-faculty.js --base <base-sha>` through `.github/workflows/faculty.yml`. The validator checks:

- faculty directory, README, course files, IDs, metadata, and safe file paths;
- `index.json` and `package.json` counts/version, trigger keywords, recommended courses, and duplicate HIGH keywords;
- Markdown links and faculty-qualified course references;
- `eval-set.json` schema, faculty coverage, expected courses, and router coverage;
- required context-document updates and mentions for the new faculty.

Local commands:

```bash
npm run ci:faculty                 # Validate all faculty contracts
node ci-faculty.js --faculty <slug> # Validate one faculty contract
```

`npm run ci:faculty` performs full-catalog validation. Base-commit detection and the changed-file context checklist run in the pull-request workflow.

---

## 🏛️ Active Faculties (32)

| # | Faculty | Dir | Courses | Status |
|---|---------|-----|---------|--------|
| 1 | 🎨 Color | `warna/` | 9 | ✅ Complete |
| 2 | 🧠 UX Psychology | `ux-psikologi/` | 7 | ✅ Complete |
| 3 | ✍️ UX Writing | `ux-writing/` | 7 | ✅ Complete |
| 4 | 🔤 Typography | `tipografi/` | 7 | ✅ Complete |
| 5 | 📐 Layout & Grid | `layout/` | 7 | ✅ Complete |
| 6 | 🧩 Design Patterns | `design-patterns/` | 8 | ✅ Complete |
| 7 | ✨ Animation & Motion | `animasi/` | 7 | ✅ Complete |
| 8 | 🏷️ Branding | `branding/` | 7 | ✅ Complete |
| 9 | ♿ Accessibility | `aksesibilitas/` | 7 | ✅ Complete |
| 10 | 🔧 Improvement | `improvement/` | 7 | ✅ Complete |
| 11 | 🧠 Human Cognition | `kognisi/` | 7 | ✅ Complete |
| 12 | 📱 Mobile UX & Touch Design | `mobile-ux/` | 7 | ✅ Complete |
| 13 | 📊 Data Visualization | `data-viz/` | 7 | ✅ Complete |
| 14 | 🛠️ Design Systems & Tools | `design-systems/` | 7 | ✅ Complete |
| 15 | 💬 Conversational UI & Voice | `conversational-ui/` | 8 | ✅ Complete |
| 16 | 🧭 Strategic Design & Product Thinking | `strategic-design/` | 7 | ✅ Complete |
| 17 | 🌐 Service Design & Systems | `service-design/` | 7 | ✅ Complete |
| 18 | ⚙️ Software Engineering | `software-engineering/` | 9 | ✅ Complete |
| 19 | 🐳 DevOps & Infrastructure | `devops-infra/` | 7 | ✅ Complete |
| 20 | 🗄️ Database Management | `database-management/` | 7 | ✅ Complete |
| 21 | 🤖 AI Integration & LLM | `ai-integration/` | 10 | ✅ Complete (AI Agents, Multi-Modal, Cost Optimization) |
| 22 | 🔐 Security & App Defense | `security/` | 9 | ✅ Complete (Zero Trust, Supply Chain) |
| 23 | ⚡ Performance Engineering | `performance/` | 7 | ✅ Complete |
| 24 | 🧪 Testing & Quality Assurance | `testing-qa/` | 7 | ✅ Complete |
| 25 | 🖥️ Developer Experience | `dx/` | 7 | ✅ Complete |
| 26 | 🗂️ Information Architecture | `ia/` | 7 | ✅ Complete |
| 27 | 🔀 Agentic Engineering & Orchestration | `agentic-engineering/` | 9 | ✅ Complete (A2A Protocols, Agent Economics) |
| 28 | 🔬 UX Research & Discovery | `ux-research/` | 7 | ✅ Complete |
| 29 | ⚖️ Design Ethics | `design-ethics/` | 7 | ✅ Complete |
| 30 | 🗃️ Knowledge & Context Engineering | `knowledge-context/` | 10 | ✅ Complete |
| 31 | 📝 Casual & Slang Writing | `penulisan-gaul/` | 10 | ✅ Complete |
| 32 | 🚫 Anti-Slop & Authentic Output | `anti-slop/` | 7 | ✅ Complete |

---

## 🔮 Roadmap (Next Faculties)

| Priority | Faculty | Topics |
|----------|---------|--------|
| **Open** | 🎓 New faculty ideas welcome | Submit proposals for new knowledge domains |
| **Candidate** | 🎞️ Visual Storytelling & Slides | Deck narrative arcs, slide grammar, data-story pacing, keynote vs. webinar pacing |
| **Candidate** | 📜 Content Compliance & Policy Docs | Regulatory writing, claims discipline, legal-safe marketing copy, policy tone |

---

## 🗺️ How to Continue

### For AI Agents:
```
1. Read this file (CONTEXT.md) to understand current state
2. Read index.json for complete faculty/course catalog + auto-router
3. Read the next faculty's target README.md if it exists
4. Build the next faculty following the existing patterns:
   - Create directory with English kebab-case filenames
   - Each course: # 🏷️ XX — Title, Level header, content, Next link
   - README.md with course table, learning paths, keyword index
   - Update index.json: trigger_keywords + faculty courses entry
   - Update root README.md: tree + description + roadmap
   - Run `node ci-faculty.js --faculty <slug>` to validate the faculty contract locally
```

### Course File Template:
```markdown
# 🏷️ XX — Course Title

> **Level: 🟢/🟡/🔴** | Prerequisite: — or course IDs | Est. reading time: X min

Brief intro paragraph.

---

## X.1 Section Title

Content with code blocks, tables, ASCII diagrams.

---

> **Next:** Continue to next course in the sequence
```

### For Each New Faculty, Update:
1. **`index.json`**:
   - Bump `version` (e.g., 22.1.0 → 23.0.0)
   - Increment `totalCourses` (52 → 52+N)
   - Add `trigger_keywords` entry under `auto_router`
   - Add faculty entry under `faculties` with all courses
2. **Root `README.md`**:
   - Add directory to tree structure
   - Add entry to "Available Faculties" section
   - Move from Roadmap to active
3. **Optional**: Add a `routing_rules.examples` entry for the new faculty

---

## 📊 File Structure
```
inteligence_mas-aul/
├── README.md              # Campus map
├── index.json             # Machine-readable index (v27.1.0)
├── CONTEXT.md             # THIS FILE — session save state
├── CHANGELOG.md           # Version history (v1.0 → v27.1.0)
├── CONTRIBUTING.md        # Contribution guide & templates
├── LICENSE                # MIT License
├── load-context.js        # Auto-router CLI tool
├── ci-faculty.js          # New-faculty contract validator
├── .github/workflows/faculty.yml # Faculty-addition CI workflow
├── warna/                 # Faculty of Color (9 courses)
├── ux-psikologi/          # Faculty of UX Psychology (7 courses)
├── ux-writing/            # Faculty of UX Writing (7 courses)
├── tipografi/             # Faculty of Typography (7 courses)
├── layout/                # Faculty of Layout & Grid (7 courses)
├── design-patterns/       # Faculty of Design Patterns (8 courses)
├── animasi/               # Faculty of Animation & Motion (7 courses)
├── branding/              # Faculty of Branding (7 courses)
├── aksesibilitas/         # Faculty of Accessibility (7 courses)
├── improvement/           # Faculty of Improvement (7 courses)
├── kognisi/               # Faculty of Human Cognition (7 courses)
├── mobile-ux/             # Faculty of Mobile UX & Touch Design (7 courses)
├── data-viz/               # Faculty of Data Visualization (7 courses)
├── design-systems/          # Faculty of Design Systems & Tools (7 courses)
├── conversational-ui/       # Faculty of Conversational UI & Voice (8 courses)
├── strategic-design/        # Faculty of Strategic Design & Product Thinking (7 courses)
├── service-design/          # Faculty of Service Design & Systems (7 courses)
├── software-engineering/    # Faculty of Software Engineering (9 courses)
├── devops-infra/            # Faculty of DevOps & Infrastructure (7 courses)
├── database-management/     # Faculty of Database Management (7 courses)
├── ai-integration/          # Faculty of AI Integration & LLM (10 courses)
├── security/                # Faculty of Security & App Defense (9 courses)
├── performance/             # Faculty of Performance Engineering (7 courses)
├── testing-qa/              # Faculty of Testing & Quality Assurance (7 courses)
├── dx/                     # Faculty of Developer Experience (7 courses)
├── ia/                     # Faculty of Information Architecture (7 courses)
├── agentic-engineering/     # Faculty of Agentic Engineering & Orchestration (9 courses)
├── ux-research/             # Faculty of UX Research & Discovery (7 courses)
├── design-ethics/           # Faculty of Design Ethics (7 courses)
└── knowledge-context/       # Faculty of Knowledge & Context Engineering (10 courses)
└── penulisan-gaul/          # Faculty of Casual & Slang Writing (10 courses)
```

---

## 🔑 Key References

| File | Purpose |
|------|---------|
| `index.json` | Complete catalog + auto-router with trigger_keywords |
| `README.md` | Human-readable campus overview + roadmap |
| `branding/README.md` | Template for new faculty README structure |
| `branding/01-brand-fundamentals-strategy.md` | Template for new course structure |
| `aksesibilitas/README.md` | Template for new faculty README structure |
| `aksesibilitas/01-wcag-foundations.md` | Template for new course structure |

---

## 📋 Session History (Summary)

> Full version-by-version history lives in [`CHANGELOG.md`](./CHANGELOG.md) — v1.0.0 (1 faculty, 9 courses) → v27.1.0 (32 faculties, 243 courses).

**Key milestones:** v9 Branding + Accessibility · v11 Cognitive Science · v18 4 Engineering Faculties · v19.1 74% token compaction · v20 DX + IA + MCP v2 · v21 Agentic Engineering + router fix · v22 UX Research · v23 Full Content Audit (199 courses, 18 fixes) · v24 Phase A1/B/C (204→216 courses, 5 MCP→10 tools) · v25.0.5 Phase 1 LOW tightening · v26 Knowledge & Context Engineering · v27.0.0 Casual & Slang Writing (236 courses, 31 faculties) · v27.1.0 Indonesian keyword layer + direct-match-first ranking + security hardening + unit tests · v27.1.0 addendum Anti-Slop & Authentic Output (faculty #32, 243 courses)

---

## 🔜 Current State (v27.1.0)

> **🏁 STABLE — CI ALL GREEN.** 243 courses, 32 faculties, 10 MCP tools (smoke-tested 10/10). Eval: P@3=86.5%, R@3=98.9%, MRR=0.986 across 251 routing prompts; 20/20 off-topic prompts blocked. Course-level metrics (informational): P@3 44.4%, R@3 81.7%, MRR 0.806. ID routing (32 tagged prompts): P@3 89.1%, R@3 97.4%, MRR 0.984. Anti-Slop routing: 7/7 prompts perfect (P@3=1, MRR=1).

### What's done (v27.1.0)
- ✅ Indonesian keyword layer: 142 ID keywords across the 31 existing faculties, each mapped to real course IDs
- ✅ **Anti-Slop & Authentic Output faculty (#32) added**: 7 courses (`anti-slop/01`…`07`) covering slop anatomy (Merriam-Webster WOTY 2025), banned-lexicon building, structural patterns, code slop & comment hygiene, generated-UI patterns, the 5-pass de-slop workflow with trap prompts, and authentic voice systems
- ✅ Removed keywords that collided with Indonesian function words: `ADA` (matched "ada"), `DI` (matched "di"), duplicate `Docker`
- ✅ Direct-match-first course ranking — a requested course is never displaced by its own prerequisites
- ✅ `flattenCourseResults()` for canonical cross-faculty ordering; `isDirect` flag exposed on courses
- ✅ eval-runner: dynamic difficulty buckets (the `advanced` tier was silently dropped before)
- ✅ 15 Indonesian regression prompts (eval-228…242, now tagged `language: "id"`); ID routing improved from 10/15 → 13/15 faculty-exact and 6/15 → 14/15 course top-3; 30 tagged ID prompts now report P@3 88.3% in the runner
- ✅ Off-topic abstention suite (20 prompts, incl. near-miss prompts sharing trigger vocabulary) with a 90% CI gate; caught and removed bare `EXPLAIN`, `jakarta`, `light`, `check`, and `cek` keywords
- ✅ Near-miss routing regression prompts (eval-243 `explain query plan` → database-management, eval-244 `light font weight` → tipografi) and `eval-runner.js --omit` for keyword-tuning generalization checks
- ✅ **Anti-Slop reserved keywords**: 46 trigger keywords added to faculty #32 (EN + 6 ID terms: `AI banget`, `kata klise`, `kata terlarang`, `komentar kode`, `klise`, `terlalu AI`), all verified not to collide with another faculty's HIGH tier; eval-245…eval-251 added (one per course, all P@3 = 1.0)
- ✅ Faculty README consistency: every faculty README course table is validated against `index.json` by `tests/catalog.test.js`
- ✅ `service-design` LOW keyword `ecosystem` mapped to course 04 instead of the generic recommended list
- ✅ **Security hardening**: `getCourseContent()` path guard blocks absolute paths, `..`, root-level files, non-`.md` files, and symlinks escaping the repo; all 243 indexed courses still load
- ✅ **Dependencies**: `@modelcontextprotocol/sdk` 1.32.2 + `zod` 4.6.7; `npm audit --omit=dev --audit-level=high` = **0 vulnerabilities**
- ✅ **Tests + CI**: `tests/campus-core.test.js` (`npm test`), `npm audit` and MCP smoke steps in GitHub Actions, `npm ci` for reproducible installs
- ✅ **MCP efficiency**: `list_faculties` 54 KB → 8.9 KB and `get_campus_stats` 6 KB → ~1 KB by default, with opt-in full details
- ✅ **MCP correctness**: level parsing fixed for both header formats; `recommend_learning_path` multi-word matching fixed and `web app` template added
- ✅ `SECURITY.md` added; package-name mismatch corrected to `@kandarlubis/icil`
- ✅ Docs synced (AGENTS, README, CONTEXT, CAMPUS-OVERVIEW, index.md, PROGRESS-REPORT, CHANGELOG) + version bump 27.0.0 → 27.1.0

### What remains
- 32 course-level misses across 251 routing prompts — informational; the router's course targeting is still the weakest layer
- CROSS-FACULTY keyword warnings — informational overlaps, including intentional context/security/AI overlap (count re-measured after the anti-slop keyword map; see `npm run ci:faculty`)
- Re-baseline the legacy 86-item audit plan against current counts and verify remaining manual content-quality items
- `npm ci` (or `npm install`) is required before running `mcp-server.js` (SDK not vendored); `npm run mcp:smoke` verifies all 10 tools over JSON-RPC
- GitHub push is intentionally left to the project owner; no commit or push was performed

### Quick commands
```bash
npm test                          # Unit tests (path guard, catalog, level parsing)
npm run verify                    # All gates: tests + audit + CI + faculty + MCP smoke
npm run mcp:smoke                 # Verify all 10 MCP tools over JSON-RPC
npm audit --omit=dev --audit-level=high  # Dependency audit gate
node ci-validate.js --with-eval   # Full CI: schema + dupes + cross-refs + eval gate
npm run ci:faculty                # Validate all faculty contracts locally
node ci-faculty.js --faculty slug  # Validate one faculty contract
node load-context.js "prompt"     # Auto-route prompt to faculties
node load-context.js --list       # List all 32 faculties
node mcp-server.js                # Start MCP server (10 tools)
```
