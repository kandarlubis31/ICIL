# 🧠 SESSION CONTEXT — ICIL

> **Purpose**: If the AI session gets interrupted, load this file first to pick up exactly where we left off. This document is the "save state" for the entire project.

---

## 📍 Current Status

| Attribute | Value |
|-----------|-------|
| **Project** | ICIL — Intelligence Campus Interactive Library |
| **Version** | v25.0.0 🏁 |
| **Language** | English (fully translated from Indonesian) |
| **Total Courses** | 216 |
| **Total Faculties** | 29 active
| **Root files** | AGENTS.md, README.md, index.json, campus-core.js, load-context.js, mcp-server.js, index.md, CAMPUS-OVERVIEW.md, CONTEXT.md, CHANGELOG.md |

---

## 🏛️ Active Faculties (29)

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
| 21 | 🤖 AI Integration & LLM | `ai-integration/` | 10 | ✅ Complete |
| 22 | 🔐 Security & App Defense | `security/` | 9 | ✅ Complete |
| 23 | ⚡ Performance Engineering | `performance/` | 7 | ✅ Complete |
| 24 | 🧪 Testing & Quality Assurance | `testing-qa/` | 7 | ✅ Complete |
| 25 | 🖥️ Developer Experience | `dx/` | 7 | ✅ Complete |
| 26 | 🗂️ Information Architecture | `ia/` | 7 | ✅ Complete |
| 27 | 🤖 Agentic Engineering & Orchestration | `agentic-engineering/` | 9 | ✅ Complete |
| 28 | 🔬 UX Research & Discovery | `ux-research/` | 7 | ✅ Complete |
| 29 | ⚖️ Design Ethics | `design-ethics/` | 7 | ✅ Complete |

---

## 🔮 Roadmap (Next Faculties)

| Priority | Faculty | Topics |
|----------|---------|--------|
| **Open** | 🎓 New faculty ideas welcome | Submit proposals for new knowledge domains |

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

> **Next:** [XX — Next Course](./xx-next-course.md)
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
├── index.json             # Machine-readable index (v25.0.0)
├── CONTEXT.md             # THIS FILE — session save state
├── CHANGELOG.md           # Version history (v1.0 → v22.2)
├── CONTRIBUTING.md        # Contribution guide & templates
├── LICENSE                # MIT License
├── load-context.js        # Auto-router CLI tool
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
├── ai-integration/          # Faculty of AI Integration & LLM (7 courses)
├── security/                # Faculty of Security & App Defense (9 courses)
├── performance/             # Faculty of Performance Engineering (7 courses)
├── testing-qa/              # Faculty of Testing & Quality Assurance (7 courses)
├── dx/                     # Faculty of Developer Experience (7 courses)
├── ia/                     # Faculty of Information Architecture (7 courses)
├── agentic-engineering/     # Faculty of Agentic Engineering & Orchestration (9 courses)
├── ux-research/             # Faculty of UX Research & Discovery (7 courses)
└── design-ethics/           # Faculty of Design Ethics (7 courses)
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

## ✅ Session Checklist (Completed)

- [x] Created all 7 original faculties (52 courses)
- [x] Built auto-router with 500+ trigger_keywords (EN + ID bilingual)
- [x] Translated entire campus from Indonesian to English
- [x] Renamed all 45 course files from Indonesian to English filenames
- [x] Verified zero untranslated Indonesian text across 52 files
- [x] Added Faculty of Animation & Motion (v7.0.0)
- [x] Added Faculty of Branding (v9.0.0) — 7 courses
- [x] Added Faculty of Accessibility (v9.0.0) — 7 courses
- [x] Updated index.json with 14 new courses + trigger_keywords for both faculties
- [x] Updated root README.md with both new faculties
- [x] All 9 faculties complete (66 courses total)
- [x] Added Faculty of Improvement (v10.0.0) — 7 courses (meta-faculty for systematic project improvement)
- [x] Added trigger_keywords + 2 routing examples for improvement faculty
- [x] All 10 faculties complete (73 courses total)
- [x] Added Faculty of Human Cognition (v11.0.0) — 7 courses (cognitive science: architecture, dual process, perception, memory, decision making, problem solving, language/emotion/metacognition)
- [x] Added Faculty of Mobile UX & Touch Design (v12.0.0) — 7 courses (mobile-first, touch targets & gestures, navigation patterns, thumb zone, mobile forms, haptics & animations, responsive/adaptive layouts)
- [x] Added Faculty of Data Visualization (v13.0.0) — 7 courses (visual encoding, chart selection, color in data-viz, dashboard design, interactive charts, data storytelling, accessibility)
- [x] Added Faculty of Design Systems & Tools (v14.0.0) — 7 courses (foundations & strategy, design tokens, component library, Figma workflows, governance & versioning, multi-brand, measuring ROI)
- [x] Added Faculty of Conversational UI & Voice (v15.0.0) — 7 courses (conversational design, intent mapping & NLU, chatbot UX patterns, voice UI design, error recovery, personality & tone, multi-modal interfaces)
- [x] Added Faculty of Service Design & Systems (v17.0.0) — 7 courses (S-D logic, blueprinting, journey mapping, ecosystem maps, AI-human orchestration, service prototyping, health metrics)
- [x] Added 3 quality/security faculties (v19.0.0) — Security & App Defense, Performance Engineering, Testing & QA
- [x] All 26 faculties complete (185 courses total)
- [x] Compacted all 11 old faculties — 74% token reduction (v19.1.0)
- [x] Built Faculty #25: Developer Experience (dx/) — 7 compact courses + MCP tools upgrade (v20.0.0)
- [x] Built Faculty #26: Information Architecture (ia/) — 7 compact courses (v20.0.0)
- [x] Enhanced MCP server: search_across + compare_courses (5 tools total)
- [x] index.json: v20.0.0, 185 courses, 26 faculties, 26 TK groups, 31 routing examples

### v24.1.0 🚀 — Phase A1: Deepen AI & Agentic Faculties
- [x] **Phase A1 complete** — 5 new advanced courses: ai-integration/08 (AI Agents), 09 (Multi-Modal), 10 (Cost Optimization), agentic-engineering/08 (A2A Protocols), 09 (Agent Economics)
- [x] **204 courses, 28 faculties** — 5/12 deepening courses delivered
- [x] ai-integration: 7→10 courses, agentic-engineering: 7→9 courses
- [x] Faculty READMEs updated with new courses, learning paths, and keywords
- [x] index.json: v24.1.0, 204 courses
- [x] All meta files synced

### v23.0.0 🏁 — FULL CONTENT AUDIT COMPLETE
- [x] **Batch 7 — FINAL BATCH** — 35 files across 5 faculties (dx, ia, animasi, data-viz, design-systems)
- [x] **0 fixes needed** — all 5 faculties verified fully accurate
- [x] dx (7): Fundamentals, CLI, API, docs, SDK, errors, onboarding — all correct
- [x] ia (7): Fundamentals, navigation, search, taxonomies, content modeling, card sorting, AI+IA — all correct
- [x] animasi (7): Principles, easing, CSS, micro-interactions, page transitions, scroll, loading — all correct
- [x] data-viz (7): Encoding, chart selection, color, dashboards, interactive, storytelling, accessibility — all correct
- [x] design-systems (7): Foundations, tokens, components, Figma, governance, multi-brand, ROI — all correct
- [x] **🏁 199/199 courses audited. 28/28 faculties verified. 18 fixes total. CAMPUS COMPLETE!**
- [x] index.json: v23.0.0
- [x] All meta files synced: CHANGELOG, CONTEXT, package.json

### v22.6.0 — Content Audit Batch 6
- [x] **Batch 6 content audit** — 21 files (devops-infra, database-management, ai-integration) — 0 fixes

### v22.5.0 — Content Audit Batch 5
- [x] **Batch 5 content audit** — 22 files across 3 faculties (design-patterns, branding, improvement)
- [x] **1 research-backed fix**: branding/05 — corrected Lucidpress zombie stat ("23% faster content, 33% fewer revisions" → actual: "up to 33% revenue increase")
- [x] **Verified clean**: design-patterns (8), branding (6/7), improvement (7) — all accurate
- [x] index.json: v22.5.0
- [x] All meta files synced: CHANGELOG, CONTEXT, package.json

### v22.4.0 — Content Audit Batch 4
- [x] **Batch 4 content audit** — 35 files across 5 faculties (software-engineering, conversational-ui, ux-writing, agentic-engineering, ux-research)
- [x] **1 research-backed fix**: software-engineering/03 (API Design) — rate limiting headers updated to RFC 9421 `RateLimit-*` standard
- [x] **Verified clean**: conversational-ui (7), ux-writing (7), agentic-engineering (7), ux-research (7) — all accurate, zero errors
- [x] **5/5 faculties passed** with flying colors — especially agentic-engineering and ux-research, ICIL's newest faculties
- [x] index.json: v22.4.0
- [x] All meta files synced: CHANGELOG, CONTEXT, package.json

### v22.3.0 — ICE Auto-Router Fix + Batch 3 Content Audit
- [x] **ICE keyword fix**: Moved from improvement.high→low; word-boundary guard (\bice\b) — closes 23-point Claude→GPT routing gap
- [x] **7 meta-file fixes**: ARCHIVE.md updated (v19.1→v22.3), konsep.txt course count (6→5), CAMPUS-OVERVIEW version ref (v22.1→v22.3), AGENTS.md task paths (12→16), PROGRESS-REPORT task paths (12→16), CONTEXT.md Next Session updated, stale `nul` file deleted
- [x] **Batch 3 content audit** — 35 files across 5 faculties (layout, kognisi, service-design, strategic-design, testing-qa)
- [x] **6 research-backed fixes**: NCTs creator (Ravi Mehta), S-D Logic (11 FPs + 5 axioms), JTBD origin (Ulwick + Christensen), Cynefin (Confusion not Disorder), Forgetting Curve (approx. note), Loss aversion (2×→~2-2.25×)
- [x] **Verified clean**: layout (7 files), testing-qa (7 files) — all accurate
- [x] index.json: v22.3.0
- [x] All meta files synced: CHANGELOG, AGENTS, CONTEXT, CAMPUS-OVERVIEW, index.md, package.json, PROGRESS-REPORT, konsep.txt, mcp-server.js, ARCHIVE.md

### v22.2.0 — Content Audit Batch 2 (Research-Backed Corrections)
- [x] **mobile-ux/02**: Fixed WCAG SC 2.5.5→2.5.8 (AA 24px minimum touch target); added exceptions note (inline, equivalent, essential, spacing)
- [x] **kognisi/01**: Fixed "7±2 rule" → "4±1 (Cowan)" — aligns with ux-psikologi/03 correction
- [x] **mobile-ux/07**: Replaced deprecated @media(spanning) → Viewport Segments API (env(viewport-segment-width)); foldable market share 8%→3%; min design width 320px→360px
- [x] **layout/05**: Added container query units section (cqw, cqi, cqh, cqmin, cqmax) for component-relative fluid typography
- [x] **warna/06**: Fixed "WCAG 2.1" → "WCAG 2.2" contrast requirements; APCA section updated with draft status note
- [x] index.json: v22.2.0
- [x] All meta files synced: CHANGELOG, AGENTS, CONTEXT, CAMPUS-OVERVIEW, index.md, package.json, PROGRESS-REPORT, konsep.txt, mcp-server.js

### v22.1.0 — Content Audit Batch 1 (Research-Backed Corrections)
- [x] **security/01**: Added OWASP LLM Top 10 (v1.1) section with 10 items; added note that OWASP 2025 not finalized; added STRIDE complements (PASTA, MITRE ATT&CK, STRIDE-LM); updated cross-ref to agentic-engineering/06
- [x] **ux-psikologi/03**: Expanded from 8 to 11 UX laws (added Aesthetic-Usability, Postel's Law, Serial Position Effect); updated touch targets to WCAG 2.2 (24px min) + Apple HIG (44px); clarified Miller's Law as 4±1 (Cowan); added AI perceived performance note
- [x] **warna/05**: Added CSS Color Level 5 section (color-mix, relative colors, light-dark); added APCA/WCAG 3.0 note; added Oklab-based ΔE; added OKLab + ACES to color spaces
- [x] **tipografi/01**: Added Vox-ATypI de-adoption note (2021); added variable fonts section (1-1000 range); updated font picks (Geist, DM Sans, Mona Sans, JetBrains Mono); added IFT mention
- [x] **performance/01**: Renamed "Lighthouse Audit" → "Measuring Vitals — Lab vs Field"; added PageSpeed Insights + Google Search Console + web-vitals JS library
- [x] All corrections research-backed from: web.dev, OWASP Foundation, W3C WCAG 2.2/3.0, MDN, ATypI, Cowan (2010), APCA
- [x] index.json: v22.1.0, emoji fields fixed (24 missing → all 28 present), slug fields fixed (dx, ia)
- [x] Full E2E validation: 99/99 tests passed across 7 phases

---

## ✅ Session Checklist (Latest — July 15, 2026)

### v22.0.0 — UX Research & Discovery
- [x] **Built Faculty #28: UX Research & Discovery** (`ux-research/`) — 7 compact courses
  - 01: Research Fundamentals & Methods (types, method selection, triangulation, AI overview)
  - 02: Qualitative Interview Techniques (interview types, questions, listening, bias, contextual inquiry)
  - 03: Quantitative Methods, Surveys & Analytics (survey design, analytics, A/B testing, SUS/NPS)
  - 04: Research Synthesis & Sensemaking (affinity mapping, coding, journey maps, personas, insights)
  - 05: Research Operations & Repositories (ResearchOps, panels, repositories, democratization, continuous discovery)
  - 06: Usability Testing & Evaluation (moderated/unmoderated, task design, severity, heuristics)
  - 07: AI-Augmented Research & Frontier Methods (AI-moderated interviews, synthetic users, validation, ethics)
- [x] Research-backed: NN/g, Teresa Torres, Dovetail, Perspective AI, Maze, UserTesting
- [x] index.json: v22.0.0, 199 courses, 28 faculties, 28 TK groups, 36 routing examples
- [x] campus-core.js: added ux-research emoji (🔬)
- [x] All meta files synced: README, CONTEXT, CAMPUS-OVERVIEW, CHANGELOG, AGENTS, index.md, package.json, PROGRESS-REPORT, konsep.txt, mcp-server.js

### v21.0.0 — Agentic Engineering + AGENTS.md + Auto-Router Fix
- [x] **Fixed auto-router substring matching bug** — `campus-core.js` `matchKeywords()` used `includes()` causing false-positives ("service"→"ICE", "coverage"→"RAG"). Added `keywordMatch()` with word-boundary regex for alphanumeric keywords, substring fallback for special chars. Exported for testing.
- [x] **Added AGENTS.md** — 2026-standard ambient context file for agent-first projects. Single source of truth for repo layout, routing, conventions, testing.
- [x] **Built Faculty #27: Agentic Engineering & Orchestration** (`agentic-engineering/`) — 7 compact courses
  - 01: Agentic Runtimes & Control Planes (state machines, durable execution, HITL, checkpoints)
  - 02: Context Engineering: Compaction & Recall (attention budget, JIT, scratchpad, pruning)
  - 03: Multi-Agent Coordination Patterns (supervisor/worker, hierarchical, swarm, handoffs)
  - 04: Agent Observability & Evaluation (tracing, trajectory eval, CI gates, online drift)
  - 05: Cost-Aware Planning & Economic Engineering (model routing, caching, per-task budgets)
  - 06: Agent Safety, Sandboxing & Tool Guardrails (tool scoping, E2B, HITL, tool poisoning)
  - 07: Agent Productionization & Lifecycle (versioning, identity, canary deploy, regression)
- [x] Research-backed: Anthropic context engineering, LangGraph/CrewAI/AutoGen, LangSmith/Langfuse/Braintrust, E2B, OWASP AI Exchange
- [x] index.json: v21.0.0, 192 courses, 27 faculties, 27 trigger_keywords groups, 33 routing examples
- [x] campus-core.js: added agentic-engineering emoji (🤖), exported keywordMatch
- [x] All meta files synced: README, CONTEXT, CAMPUS-OVERVIEW, CHANGELOG, AGENTS, index.md, package.json, PROGRESS-REPORT

### v19.1.0 — Massive Compaction
- [x] **Compacted ALL 11 old faculties (79 courses)** — ~128K → ~33K words (**~74% reduction**)
  - warna (9), ux-psikologi (7), ux-writing (7), tipografi (7), layout (7), design-patterns (8), animasi (7), branding (7), aksesibilitas (7), improvement (6), kognisi (7)
  - Prose → dense tables, ASCII art removed, ⚡ Action Checklist added
  - Avg 422 words/course (was ~1,200)
- [x] **Campus-wide word count**: 99,477 words across 170 courses (old: 33K | new: 66K)
- [x] MCP server E2E tests: 25/25 passed (search_campus, load_course, list_faculties all verified)
- [x] index.json: v19.0.0, 171 courses, 24 faculties, all validated
- [x] index.md: 491 tokens, ultra-compact AI entry point
- [x] All meta files synced: README, CONTEXT, CHANGELOG, konsep, CAMPUS-OVERVIEW, package.json

### v19.0.0 — Quality & Security Layer
- [x] Fixed package.json version drift (11.0.0 → 19.0.0)
- [x] Added routing_rules examples for all 7 new technical faculties (28 total)
- [x] Added routing_rules example for service-design + Path 10 in CAMPUS-OVERVIEW
- [x] Added "human handoff" HIGH keyword to service-design trigger_keywords
- [x] Updated mcp-server.js description (108 courses/15 faculties → 171 courses/24 faculties)
- [x] Fixed CAMPUS-OVERVIEW.md stale version ref (v16.0.0 → v19.0.0)
- [x] Created `index.md` — ultra-compact AI agent entry point (491 tokens, 24 slugs, instant routing)
- [x] Full E2E validation: 50/50 tests passed across all 6 phases
- [x] Auto-router verified: all 24 faculties match correctly
- [x] All meta files consistent: README, CONTEXT, CHANGELOG, konsep, CAMPUS-OVERVIEW, package.json

## 🔜 Next Session — Router Precision Fix + Phase A3

> **🏁 v25.0.0 LIVE — CAMPUS MILESTONE.** Full content audit + Phase A (10/12 deepening) + Eval infra (P@3 60%, R@3 86%, MRR 0.81) + Router precision boost + Phase C Faculty #29 Design Ethics (7 courses). Total: 216 courses, 29 faculties, 10 MCP tools.

> **📊 Eval Baseline**: P@3=54.4%, R@3=77.9%, MRR=0.731. 14 no-match prompts (7%), 27 duplicate HIGH keywords — precision is THE bottleneck.

> **🗺️ ROADMAP v2**: Phase A1 ✅, Eval Infra ✅, Phase A3 next.

| Priority | Task | Detail |
|----------|------|--------|
| ✅ | **Phase A1** | AI Integration +3, Agentic Eng +2 — v24.0.0 |
| ✅ | **Eval Infrastructure** | 200-prompt eval set + runner + CI validator — v24.1.0 |
| 🔴 | **Fix Router Precision** | Triage 14 no-match + 27 duplicate HIGH keywords → target P@3 70%+ |
| ✅ | **Phase A3** | Security +2 (Zero Trust, Supply Chain) — v24.2.0 |
| ✅ | **Phase A4** | Software Engineering +2 (DDD, Event Sourcing) — v24.3.0 |
| ✅ | **Phase A5** | Conversational UI +1 (Conv AI Agents) — v24.4.0 |
| ✅ | **Phase B** | MCP Server v3 (5 new tools, 10 total) — v24.5.0 |
| ✅ | **Phase C** | Faculty #29 — Design Ethics (7 courses) — v25.0.0 |


## 📝 Notes for Next Session

- **📊 Eval files**: `eval-set.json` (200 prompts), `eval-runner.js` (P@3/R@3/MRR), `ci-validate.js` (schema+duplicates+cross-refs+eval gate)
- **npm scripts**: `npm run eval`, `npm run eval:ci`, `npm run ci:validate`, `npm run ci:gate`
- **Quick wins**: Fix 14 no-match prompts (missing keywords: "Fitts' Law", "CTA text", "date range picker", "localization"/"12 languages"). Then triage 27 duplicate HIGH keywords.
- **Phase A3 (NEXT)**: `security/08-09` (Zero Trust Architecture + Supply Chain Security) + `software-engineering/08-09` (DDD + Event Sourcing).
- **ROADMAP v2**: Full plan in `ROADMAP-v2.md` — Phase A (deepen, +12 courses), Phase B (MCP v3, +5 tools), Phase C (Faculty #29, +7 courses). Target: 218 courses, 29 faculties, 10 MCP tools.
- **Agentic-engineering emoji**: Changed from 🤖 → 🔀 (was duplicating ai-integration).
- **ai-integration**: Now has `level` and `description` fields (were missing, fixed v24.1.0).
- All courses use English filenames (kebab-case)
- `index.json` trigger_keywords are intentionally bilingual (EN + ID)
- Faculty slugs use English slugs for new faculties (v12+), mixed for legacy (v1-v11)
- Compact course format (v17+): ~1300 words, no "Next:" links, uses Action Checklist instead
- All courses now use **compact format** (v19.1.0 compaction complete — 74% token reduction)
- **ARCHIVE.md** — full v19.1.0 milestone snapshot (for historical reference)
- `index.md` is the FIRST file to load — ultra-compact entry point
- `campus-core.js` is the shared library (searchCampus, getCourseContent, listFacultiesData, getFacultyEmoji)
- `mcp-server.js` exposes 5 MCP tools (search_campus, load_course, list_faculties, search_across, compare_courses) — requires `@modelcontextprotocol/sdk` + `zod`
- `load-context.js` CLI supports: --json, --list, --print, --interactive, --help
- 36 routing_rules.examples in index.json — add new ones for any new faculty
- All code examples should be practical, copy-paste ready
- **🏁 CONTENT AUDIT**: COMPLETE — 199/199 courses, 28/28 faculties, 18 fixes across 7 batches.
- **Rate limit headers**: Use RFC 9421 `RateLimit-*` for new APIs; `X-RateLimit-*` is legacy.
- **Lucidpress stat**: Real finding = "up to 33% revenue increase" — NOT "23% faster content."
