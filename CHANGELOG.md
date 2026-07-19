# 📋 Changelog — ICIL

> Intelligence Campus Interactive Library — from 1 faculty (9 courses) to 29 faculties (216 courses).

---

## v25.0.4 (July 19, 2026) — 🎯 Precision 71.2% + Dual Emoji Source Removed

### Eval Tuning (3 rounds)
- **Round 1**: 11 noise LOW "any" keywords removed (common English words) — P@3 59.3%→63.1%
- **Round 2**: 11 next-tier keywords demoted/removed — P@3 63.1%→64.9%
- **Round 3**: 30 recall keywords added across 15 faculties — P@3 64.9%→71.2%, R@3 84.5%→93.9%

### Removed — Dual Emoji Source
- Deleted 37-line `getFacultyEmoji()` from `campus-core.js` — emoji now from `index.json` exclusively

### Code Quality
- `mcp-server.js`: dynamic description from `loadIndex()`, 6 redundant `loadIndex()` calls removed
- `eval/eval-runner.js`: optional-chaining consistency fixed

### Eval: 59.3% → 71.2% (+11.9%)

---

## v25.0.3 (July 19, 2026) — 🐛 9 Bugs Fixed + DUPLICATE HIGH → 0

### 9 Bugs (all from ISSUES.md)
- HTML export tables, prerequisite format, dead code CROSS-FACULTY warning, redundant `require("path")`, caching, `compare_courses`/`search_across` dedup

### 15 DUPLICATE HIGH → 0
- 10 cross-faculty demotions (HIGH→MEDIUM), 2 same-faculty case duplicates removed, 3 same-faculty LOW duplicates removed

### 6 Cross-Faculty Keyword Cleanup
- "design tokens" MEDIUM→LOW in 3 faculties, "insight" HIGH→MEDIUM, "decision making" MEDIUM→LOW

### CI surface: 12 → 123 warnings surfaced

---

## v25.0.2 (July 19, 2026) — 🧹 Final Cleanup

- 9 clutter files → `/archive/`, meta files synced to v25.0.0 state

---

## v25.0.1 (July 19, 2026) — 🧹 Archive Organization

- Root cleanup, `archive/ICIL-v25-ARCHIVE.md` fresh snapshot

---

## v25.0.0 (July 17, 2026) — 🏁 Phase C: Design Ethics (Faculty #29)

### ⚖️ NEW: Design Ethics & Responsibility (7 courses)
Ethical frameworks, privacy-first design, inclusive design, AI ethics, dark patterns, sustainability, organizational ethics.

**216 courses, 29 faculties, 10 MCP tools** — ROADMAP v2 COMPLETE.

---

## v24.5.0 (July 17, 2026) — Phase B: MCP v3 (10 Tools)

### 5 New MCP Tools
`get_campus_stats`, `search_by_faculty`, `get_course_prerequisites`, `export_course`, `recommend_learning_path`

**MCP Server: 5→10 tools.**

---

## v24.4.0 (July 17, 2026) — Phase A5: Conversational UI +1

- `conversational-ui/08`: AI Agents & Autonomous Chat
- **208→209 courses**

---

## v24.3.0 (July 17, 2026) — Phase A4: Software Engineering +2

- `software-engineering/08`: Domain-Driven Design
- `software-engineering/09`: Event Sourcing & CQRS
- **206→208 courses**

---

## v24.2.0 (July 17, 2026) — Router Precision + Phase A3

### Router: 100 keyword fixes — P@3 54.4%→58.9%

### Security +2
- `security/08`: Zero Trust Architecture
- `security/09`: Supply Chain Security
- **204→206 courses**

---

## v24.1.0 (July 16, 2026) — 📊 Eval Infrastructure

### Added
- `eval-set.json`: 200 prompts across 28 faculties
- `eval-runner.js`: P@3, R@3, MRR metrics
- `ci-validate.js`: 4-stage CI (schema, dupes, cross-refs, eval gate)

### Eval baseline: P@3=54.4%, R@3=77.9%, MRR=0.731

---

## v24.0.0 (July 16, 2026) — 🚀 Phase A1: AI & Agentic Faculties (+5)

- `ai-integration/08-10`: AI Agents, Multi-Modal, Cost Optimization
- `agentic-engineering/08-09`: A2A Protocols, Agent Economics
- **199→204 courses, 28 faculties**

---

## v23.0.0 (July 16, 2026) — 🏁 Full Content Audit Complete

### 199 courses × 28 faculties audited — 18 corrections
7 audit batches across all faculties. Research-backed corrections from primary sources.

---

## v22.6.0 (July 16, 2026) — Audit Batch 6 (21 files, 0 fixes)

devops-infra, database-management, ai-integration — all verified clean.

---

## v22.5.0 (July 16, 2026) — Audit Batch 5 (22 files, 1 fix)

design-patterns, branding, improvement — Lucidpress zombie statistic corrected.

---

## v22.4.0 (July 16, 2026) — Audit Batch 4 (35 files, 1 fix)

software-engineering, conversational-ui, ux-writing, agentic-engineering, ux-research — RFC 9421 rate limit headers.

---

## v22.3.0 (July 15, 2026) — ICE Auto-Router Fix + Audit Batch 3 (35 files, 6 fixes)

### ICE Keyword Fix
Substring false-positive "ICE" → word-boundary guard. Closed 23-point Claude→GPT routing gap.

### Strategic + Service Design Fixes
NCTs attribution, S-D Logic axioms, JTBD origin, Cynefin 5th domain, Forgetting Curve, Loss aversion.

---

## v22.2.0 (July 15, 2026) — Audit Batch 2 (5 fixes)

WCAG SC 2.5.5→2.5.8, Cowan 4±1, Viewport Segments API, container query units, WCAG 2.1→2.2.

---

## v22.1.0 (July 15, 2026) — Audit Batch 1 (5 fixes)

OWASP LLM Top 10, UX laws expansion, CSS Color Level 5, Vox-ATypI de-adoption, Lighthouse lab vs field.

---

## v22.0.0 (July 15, 2026) — 🔬 UX Research & Discovery

### NEW: UX Research (7 courses)
Research methods, interviews, quantitative, synthesis, research ops, usability testing, AI-augmented research.

**192→199 courses, 28 faculties.**

---

## v21.0.0 (July 15, 2026) — 🤖 Agentic Engineering

### NEW: Agentic Engineering (7 courses)
Runtimes, context engineering, multi-agent coordination, observability, cost-aware planning, safety, productionization.

### Fixed: Auto-router substring matching bug — word-boundary regex

**185→192 courses, 27 faculties.**

---

## v20.0.0 (July 15, 2026) — 🖥️ DX + 🗂️ IA

### NEW: Developer Experience (7 courses)
DX strategy, CLI design, API for devs, documentation, SDK design, error messages, onboarding.

### NEW: Information Architecture (7 courses)
IA fundamentals, navigation, search systems, taxonomies, content modeling, card sorting, IA for AI.

### MCP Server v2: 3→5 tools (`search_across`, `compare_courses`)

**171→185 courses, 26 faculties.**

---

## v19.1.0 (July 15, 2026) — 🔥 Course Compaction

74% token reduction: 11 old faculties (79 courses) compacted to dense tables. ~128K→33K words.

---

## v19.0.0 (July 15, 2026) — 🔐 Security + ⚡ Performance + 🧪 Testing

### 3 NEW Technical Faculties (21 courses)
- **security/**: OWASP, auth, API security, encryption, SDLC, AI security, incident response
- **performance/**: Web Vitals, caching, backend opt, DB perf, network, load testing, CI budgets
- **testing-qa/**: Test pyramid, unit/component, integration/API, E2E, load testing, CI/CD, quality metrics

**150→171 courses, 24 faculties.**

---

## v18.0.0 (July 15, 2026) — ⚙️ Software Engineering + 🐳 DevOps + 🗄️ Databases + 🤖 AI

### 4 NEW Technical Faculties (28 courses)
- **software-engineering/**: SOLID, architecture, API design, GoF patterns, testing, refactoring, DI
- **devops-infra/**: Linux, Docker, CI/CD, cloud, networking, monitoring, IaC
- **database-management/**: Normalization, SQL, indexing, migrations, NoSQL, data modeling, security
- **ai-integration/**: Prompts, RAG, embeddings, orchestration, evaluation, safety, MCP

**122→150 courses, 21 faculties.** — Design + Engineering convergence.

---

## v17.0.0 (July 15, 2026) — 🌐 Service Design

### NEW: Service Design & Systems (7 courses)
S-D Logic, blueprinting, journey mapping, ecosystem architecture, AI-human handoff, prototyping, metrics.

**115→122 courses, 17 faculties.**

---

## v16.0.0 (July 15, 2026) — 🧭 Strategic Design

### NEW: Strategic Design & Product Thinking (7 courses)
Double Diamond, JTBD, product strategy, roadmapping, first principles, decision-making, strategy-to-execution.

**108→115 courses, 16 faculties.**

---

## v15.0.0 (July 15, 2026) — 💬 Conversational UI

### NEW: Conversational UI & Voice (7 courses)
Conversational design, NLU, chatbot UX, VUI, error recovery, personality, multi-modal.

**101→108 courses, 15 faculties.**

---

## v14.0.0 (July 15, 2026) — 🛠️ Design Systems

### NEW: Design Systems & Tools (7 courses)
Foundations, design tokens, component library, Figma workflows, governance, multi-brand, ROI.

**94→101 courses, 14 faculties.**

---

## v13.0.0 (July 15, 2026) — 📊 Data Visualization

### NEW: Data Visualization (7 courses)
Visual encoding, chart selection, color in data, dashboards, interactive charts, data storytelling, accessibility.

**87→94 courses, 13 faculties.**

---

## v12.0.0 (July 14, 2026) — 📱 Mobile UX

### NEW: Mobile UX (7 courses)
Mobile principles, touch targets, navigation patterns, thumb zone, forms, animations/haptics, responsive.

**80→87 courses, 12 faculties.**

---

## v11.0.0 (July 14, 2026) — 🧠 Cognitive Science

### NEW: Cognitive Science (7 courses)
Architecture, dual process, perception/attention, memory, decision-making, problem-solving, metacognition.

**73→80 courses, 11 faculties.**

---

## v10.0.0 (July 14, 2026) — ♿ Accessibility

### NEW: Accessibility & Inclusive Design (7 courses)
WCAG, semantic HTML, ARIA, keyboard nav, forms, screen readers, inclusive design.

**66→73 courses, 10 faculties.**

---

## v9.0.0 (July 14, 2026) — 🏷️ Branding

### NEW: Branding & Identity (8 courses)
Strategy, visual identity, logo design, brand voice, guidelines, touchpoints, evolution.

**58→66 courses, 9 faculties.** — MCP Server v1 (3 tools).

---

## v8.0.0 — ✨ Animation

### NEW: Animation & Motion Design (7 courses — later expanded to 8)
Motion principles, easing, CSS transitions, micro-interactions, page transitions, scroll animations, skeleton loading.

---

## v7.0.0 (July 13, 2026) — 🔧 Improvement

### NEW: Improvement & Refinement (7 courses)
Methodology, UI audit, heuristic evaluation, prioritization, design system extraction, iterative refinement.

### Added: `index.json` auto-router with trigger_keywords system

---

## v6.0.0 (July 12, 2026) — 🧩 Design Patterns

### NEW: Design Patterns (8 courses)
Modal/drawer, forms, navigation, search, data display, feedback states, selection inputs, complex components.

---

## v5.0.0 (July 11, 2026) — ✍️ UX Writing

### NEW: UX Writing (7 courses)
Fundamentals, voice & tone, microcopy, error states, onboarding, accessibility, localization.

---

## v4.0.0 (July 10, 2026) — 🔤 Typography

### NEW: Typography (7 courses)
Type anatomy, scale & hierarchy, font pairing, readability, line-height, variable fonts, web typography.

---

## v3.0.0 (July 9, 2026) — 📐 Layout

### NEW: Layout & Grid Systems (7 courses)
CSS Grid, Flexbox, responsive breakpoints, grid vs flexbox, composition, golden ratio spacing.

---

## v2.0.0 (July 8, 2026) — 🎭 UX Psychology

### NEW: UX Psychology (7 courses)
Foundations, cognitive biases, UX laws, Gestalt principles, persuasion, dark patterns, gamification.

**9→16 courses.**

---

## v1.0.0 (July 7, 2026) — 🎉 Initial Release

### 🎨 Faculty of Color (warna/) — 9 courses
Color theory, harmony, psychology, culture, digital models, accessibility, palette generation, design systems, advanced composition.

- `index.json` — machine-readable index with auto-router
- `README.md`, `konsep.txt` — project foundation

**9 courses, 1 faculty.**

---

*ICIL v25.0.4 — 216 courses, 29 faculties, 10 MCP tools. Built by Mas Aul 🔥*
