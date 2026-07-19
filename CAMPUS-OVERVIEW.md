# 🎓 ICIL — Intelligence Campus Interactive Library — Complete Overview

> **For AI Agents: Load this file FIRST to understand the entire campus, then use `load-context.js` or the auto-router to drill into specific faculties.**

**Version:** v25.0.4 | **Courses:** 216 | **Faculties:** 29 | **P@3:** 71.2% | **Last Updated:** 2026-07-20 | **Roadmap:** ROADMAP-v2.md — COMPLETE ✅

---

## 🗺️ What Is This Campus?

The ICIL (Intelligence Campus Interactive Library) is a **structured knowledge base for AI agents** — 216 deep courses across 29 design, engineering, research, agentic, ethics, and quality faculties. Each `*.md` file is a self-contained course that an AI agent can load as context injection to instantly gain expert-level knowledge in a specific domain.

```
HOW TO USE:
  1. Read `AGENTS.md` first (agent guide — repo layout, conventions, testing)
  2. Read THIS file (CAMPUS-OVERVIEW.md) to understand the landscape
  3. Use the decision tree below to identify which faculties you need
  4. Run `node load-context.js "your user prompt"` for auto-routing
  5. Load the recommended `.md` files as context
  6. Execute with expert-level quality
```

---

## 🏛️ The 29 Faculties — At a Glance

### 🎨 Foundation Layer — Visual & Perceptual Knowledge

| # | Faculty | Dir | Courses | Domain |
|---|---------|-----|---------|--------|
| 1 | 🎨 **Color** | `warna/` | 9 | Theory, harmony, psychology, culture, accessibility, palettes, design systems |
| 2 | 🔤 **Typography** | `tipografi/` | 7 | Anatomy, scale, pairing, readability, variable fonts, web typography |
| 3 | 📐 **Layout & Grid** | `layout/` | 7 | Grid systems, Flexbox, responsive, composition, golden ratio |

### 🧠 Science Layer — How Humans Think & Behave

| # | Faculty | Dir | Courses | Domain |
|---|---------|-----|---------|--------|
| 4 | 🧠 **UX Psychology** | `ux-psikologi/` | 7 | Cognitive biases, UX laws, Gestalt, persuasion, dark patterns, gamification |
| 5 | 🧠 **Human Cognition** | `kognisi/` | 7 | Information processing, dual process, perception, memory, decision making |

### ✍️ Communication Layer — Words & Meaning

| # | Faculty | Dir | Courses | Domain |
|---|---------|-----|---------|--------|
| 6 | ✍️ **UX Writing** | `ux-writing/` | 7 | Microcopy, voice & tone, error states, onboarding, localization |
| 7 | 🏷️ **Branding** | `branding/` | 7 | Strategy, identity, logo, voice, guidelines, touchpoints, evolution |

### 🧩 Construction Layer — Building Interfaces

| # | Faculty | Dir | Courses | Domain |
|---|---------|-----|---------|--------|
| 8 | 🧩 **Design Patterns** | `design-patterns/` | 8 | Modal, forms, navigation, search, data display, feedback, selection, complex |
| 9 | ✨ **Animation & Motion** | `animasi/` | 7 | Principles, easing, transitions, micro-interactions, page transitions, scroll |

### ♿ Quality Layer — Accessibility & Improvement

| # | Faculty | Dir | Courses | Domain |
|---|---------|-----|---------|--------|
| 10 | ♿ **Accessibility** | `aksesibilitas/` | 7 | WCAG, semantic HTML, ARIA, keyboard, forms, screen readers, inclusive design |
| 11 | 🔧 **Improvement** | `improvement/` | 7 | Methodology, audit, heuristics, prioritization, iterative refinement (META) |

### 📱 Platform Layer — Specialized Domains

| # | Faculty | Dir | Courses | Domain |
|---|---------|-----|---------|--------|
| 12 | 📱 **Mobile UX** | `mobile-ux/` | 7 | Mobile-first, touch/gestures, navigation, thumb zones, forms, haptics, adaptive |
| 13 | 📊 **Data Visualization** | `data-viz/` | 7 | Visual encoding, chart selection, color, dashboards, interactive, storytelling, a11y |
| 14 | 💬 **Conversational UI** | `conversational-ui/` | 8 | Chatbots, NLU/intents, voice UI, error recovery, personality, multi-modal, conv AI agents |
| 15 | 🛠️ **Design Systems** | `design-systems/` | 7 | Foundations, tokens, components, Figma, governance, multi-brand, ROI |
| 16 | 🧭 **Strategic Design** | `strategic-design/` | 7 | Design Thinking, JTBD, OKRs, roadmapping, first principles, Cynefin, execution |

### 🌐 Orchestration Layer — End-to-End Service Systems

| # | Faculty | Dir | Courses | Domain |
|---|---------|-----|---------|--------|
| 17 | 🌐 **Service Design** | `service-design/` | 7 | S-D logic, blueprinting, journey mapping, ecosystems, AI-human handoff, prototyping, metrics |

### ⚙️ Technical Layer — Software Engineering & Infrastructure

| # | Faculty | Dir | Courses | Domain |
|---|---------|-----|---------|--------|
| 18 | ⚙️ **Software Engineering** | `software-engineering/` | 9 | SOLID, architecture, APIs, design patterns, testing, refactoring, DDD, CQRS |
| 19 | 🐳 **DevOps & Infra** | `devops-infra/` | 7 | Linux, Docker, CI/CD, cloud, networking, monitoring, IaC |
| 20 | 🗄️ **Database Management** | `database-management/` | 7 | SQL, normalization, indexing, migrations, NoSQL, modeling, backup |
| 21 | 🤖 **AI Integration** | `ai-integration/` | 10 | Prompts, RAG, embeddings, orchestration, evaluation, safety, MCP, agents, multi-modal, cost |

### 🔐 Quality Layer — Security, Performance & Testing

| # | Faculty | Dir | Courses | Domain |
|---|---------|-----|---------|--------|
| 22 | 🔐 **Security & Defense** | `security/` | 9 | OWASP, threat modeling, auth, encryption, AI security, incident response, zero trust, supply chain |
| 23 | ⚡ **Performance** | `performance/` | 7 | Core Web Vitals, caching, backend/DB optimization, load testing, budgets |
| 24 | 🧪 **Testing & QA** | `testing-qa/` | 7 | Test pyramid, unit/integration/E2E, CI automation, quality metrics |
| 25 | 🖥️ **Developer Experience** | `dx/` | 7 | CLI design, API ergonomics, Diátaxis docs, SDK patterns, TTFC, DevEx surveys |
| 26 | 🗂️ **Information Architecture** | `ia/` | 7 | LATCH, navigation, faceted search, taxonomies, content modeling, card sorting |

### 🤖 Agentic Layer — Production Agent Systems

| # | Faculty | Dir | Courses | Domain |
|---|---------|-----|---------|--------|
| 27 | 🤖 **Agentic Engineering** | `agentic-engineering/` | 9 | Runtimes, context engineering, multi-agent coordination, observability, cost, safety, lifecycle, A2A protocols, agent economics |

### 🔬 Research Layer — Evidence Gathering

| # | Faculty | Dir | Courses | Domain |
|---|---------|-----|---------|--------|
| 28 | 🔬 **UX Research & Discovery** | `ux-research/` | 7 | Research methods, interviews, quantitative, synthesis, operations, usability testing, AI-augmented |

### ⚖️ Ethics Layer — Responsible Design

| # | Faculty | Dir | Courses | Domain |
|---|---------|-----|---------|--------|
| 29 | ⚖️ **Design Ethics** | `design-ethics/` | 7 | Ethical frameworks, privacy-first design, inclusive design, AI fairness, dark patterns, sustainability, org ethics |

---

## 🧭 Faculty Decision Tree — "What Should I Load?"

```
USER TASK → WHICH FACULTY?

  "Make it look good" ────────────▶ 🎨 Color + 🔤 Typography + 📐 Layout
  "Make it usable / human" ───────▶ 🧠 UX Psychology + 🧠 Human Cognition
  "Write the words / tone" ───────▶ ✍️ UX Writing + 🏷️ Branding
  "Build the UI components" ──────▶ 🧩 Design Patterns + 🛠️ Design Systems
  "Add motion / delight" ─────────▶ ✨ Animation & Motion
  "Make it accessible" ───────────▶ ♿ Accessibility
  "Design ethically / responsibly" ─▶ ⚖️ Design Ethics + ♿ Accessibility
  "Improve what exists" ──────────▶ 🔧 Improvement (load FIRST, then domain faculties)
  "Design for phones / tablets" ──▶ 📱 Mobile UX + 📐 Layout
  "Show data / charts" ───────────▶ 📊 Data Visualization + 🎨 Color
  "Build a chatbot / voice app" ──▶ 💬 Conversational UI + ✍️ UX Writing + 🏷️ Branding
  "Scale with a design system" ───▶ 🛠️ Design Systems + 🎨 Color + 🔤 Typography
  "Figure out what to build" ─────▶ 🧭 Strategic Design + 🔧 Improvement
  "Make a big strategic decision" ─▶ 🧭 Strategic Design + 🧠 Human Cognition
  "Design an AI-powered service" ──▶ 🌐 Service Design + 💬 Conversational UI + 🧭 Strategic Design
  "Orchestrate AI agents + humans" ─▶ 🌐 Service Design + 🔧 Improvement
  "Build a backend API" ────────────▶ ⚙️ Software Engineering + 🗄️ Database Management
  "Deploy my app to production" ────▶ 🐳 DevOps & Infra + ⚙️ Software Engineering
  "Build a RAG chatbot" ────────────▶ 🤖 AI Integration + 💬 Conversational UI
  "Design a database schema" ────────▶ 🗄️ Database Management + ⚙️ Software Engineering
  "Secure my API / auth system" ────▶ 🔐 Security + ⚙️ Software Engineering
  "Make the app faster" ────────────▶ ⚡ Performance + 🧪 Testing & QA
  "Build a CLI tool / SDK" ───────────▶ 🖥️ Developer Experience + ⚙️ Software Engineering
  "Design a search/nav system" ──────▶ 🗂️ Information Architecture + 🧩 Design Patterns
  "Improve test coverage" ──────────▶ 🧪 Testing & QA + ⚙️ Software Engineering
  "Run agents in production" ────────▶ 🤖 Agentic Engineering + 🤖 AI Integration
  "Fix context rot / runaway costs" ──▶ 🤖 Agentic Engineering (02, 05)
  "Multi-agent system" ─────────────▶ 🤖 Agentic Engineering (03) + 🤖 AI Integration
  "Agent observability / tracing" ──▶ 🤖 Agentic Engineering (04)
  "Agent sandboxing / tool safety" ─▶ 🤖 Agentic Engineering (06) + 🔐 Security
  "Deploy / version agents" ────────▶ 🤖 Agentic Engineering (07) + 🐳 DevOps
  "Understand user problems" ───────▶ 🔬 UX Research + 🧭 Strategic Design
  "Interview / survey users" ───────▶ 🔬 UX Research (02, 03)
  "Usability test / validate" ──────▶ 🔬 UX Research (06) + 🧩 Design Patterns
  "Synthesize research → insights" ─▶ 🔬 UX Research (04) + 📊 Data Viz
```

---

## 🔗 Cross-Faculty Task Paths

These are the most common multi-faculty combinations for AI agent tasks:

### Path 1: Build a Landing Page
```
🎨 Color (02,03,07) → 🔤 Typography (01,03) → 📐 Layout (06,07) → ✍️ UX Writing (01,03) → ✨ Animation (04)
→ Load 5 courses | ~60 min reading
```

### Path 2: Design a Complete Mobile App
```
📱 Mobile UX (01,02,03,04,05) → 🧩 Design Patterns (03,02) → ♿ Accessibility (05) → ✨ Animation (04,06)
→ Load 9 courses | ~100 min reading
```

### Path 3: Build a Data Dashboard
```
📊 Data Viz (01,02,04) → 🎨 Color (02,06) → 📐 Layout (01,05) → ♿ Accessibility (01)
→ Load 7 courses | ~80 min reading
```

### Path 4: Create a Chatbot
```
💬 Conversational UI (01,02,03,05) → ✍️ UX Writing (01,04) → 🏷️ Branding (04) → ♿ Accessibility (06)
→ Load 7 courses | ~80 min reading
```

### Path 5: Build a Design System
```
🛠️ Design Systems (01,02,03) → 🎨 Color (08) → 🔤 Typography (02,07) → 🧩 Design Patterns (01,02) → 🛠️ Design Systems (04,05)
→ Load 9 courses | ~100 min reading
```

### Path 6: Systematic Project Improvement (ICIL Protocol)
```
🔧 Improvement (01,02,07) → [Then load domain faculties based on audit findings]
  If color issues: 🎨 Color (06,07,08)
  If typography issues: 🔤 Typography (04,05)
  If layout issues: 📐 Layout (01,05)
  If accessibility issues: ♿ Accessibility (01,04,05)
  If UX issues: 🧠 UX Psychology (02,03)
  If content issues: ✍️ UX Writing (01,03,04)
  If motion issues: ✨ Animation (01,02,03)
```

### Path 7: Full-Stack Design Education (Complete)
```
🎨 Color → 🧠 UX Psychology → ✍️ UX Writing → 🔤 Typography → 📐 Layout → 🧩 Design Patterns → ✨ Animation → 🏷️ Branding → ♿ Accessibility → 🔧 Improvement → 🧠 Human Cognition → 📱 Mobile UX → 📊 Data Viz → 💬 Conversational UI → 🛠️ Design Systems → 🧭 Strategic Design → 🌐 Service Design → ⚙️ Software Engineering → 🐳 DevOps → 🗄️ Database → 🤖 AI Integration → 🔐 Security → ⚡ Performance → 🧪 Testing & QA → 🖥️ DX → 🗂️ IA → 🤖 Agentic Engineering → 🔬 UX Research
→ All 216 courses | ~45 hours reading
```

### Path 8: Define a Product Strategy from Scratch
```
🧭 Strategic Design (01,02,03,04) → 🏷️ Branding (01,04) → 🔧 Improvement (01,04) → 🧠 Human Cognition (05)
→ Load 9 courses | ~100 min reading
```

### Path 9: Make a Strategic Decision Under Uncertainty
```
🧭 Strategic Design (05,06,07) → 🧠 Human Cognition (05) → 🔧 Improvement (04) → 🧠 UX Psychology (02)
→ Load 6 courses | ~70 min reading
```

### Path 10: Design an AI-Human Hybrid Service
```
🌐 Service Design (01,02,05) → 💬 Conversational UI (01,03) → 🔧 Improvement (02,04) → ♿ Accessibility (07)
→ Load 8 courses | ~100 min reading
```

### Path 11: Build a Developer Tool (CLI + SDK)
```
🖥️ Developer Experience (01,02,05,06) → ⚙️ Software Engineering (01,03,04) → 🧪 Testing & QA (01,02)
→ Load 9 courses | ~100 min reading
```

### Path 12: Design a Complex Information System
```
🗂️ Information Architecture (01,02,03,04) → 🧩 Design Patterns (03,04) → 📊 Data Viz (01,02) → 🗂️ IA (05,06)
→ Load 10 courses | ~110 min reading
```

### Path 13: Build a Production Agent System
```
🤖 AI Integration (01,04,07) → 🤖 Agentic Engineering (01,02,04,06) → 🤖 Agentic Engineering (05,07)
→ Load 9 courses | ~100 min reading
```

### Path 14: Fix a Broken Agent System (context rot, runaway costs, no observability)
```
🤖 Agentic Engineering (02,05,04) → 🤖 Agentic Engineering (03,06) → 🤖 Agentic Engineering (07)
→ Load 7 courses | ~80 min reading
```

### Path 15: Conduct Discovery Research Before Designing
```
🔬 UX Research (01,02,04) → 🧭 Strategic Design (02) → 🔬 UX Research (06)
→ Load 5 courses | ~60 min reading
```

### Path 16: Build a Research Operations System
```
🔬 UX Research (01,05) → 🔬 UX Research (07) → 🔬 UX Research (04)
→ Load 4 courses | ~50 min reading
```

---

## 📊 Quick-Reference Table

| Faculty | Slug | Courses | Level Range | Key Tools/Topics |
|---------|------|---------|-------------|------------------|
| 🎨 Color | `warna` | 9 | Beginner→Advanced | RGB/HSL/OKLCH, color harmony, accessibility, palettes, design tokens |
| 🧠 UX Psychology | `ux-psikologi` | 7 | Intermediate→Advanced | Biases, Fitts/Hick/Miller, Gestalt, Cialdini, Ethical design |
| ✍️ UX Writing | `ux-writing` | 7 | Beginner→Advanced | Microcopy, voice & tone, error states, onboarding, l10n/i18n |
| 🔤 Typography | `tipografi` | 7 | Beginner→Advanced | Type anatomy, scale, pairing, readability, variable fonts |
| 📐 Layout | `layout` | 7 | Beginner→Advanced | CSS Grid, Flexbox, responsive, composition, golden ratio |
| 🧩 Design Patterns | `design-patterns` | 8 | Intermediate→Advanced | Modal, forms, navigation, search, data display, complex components |
| ✨ Animation | `animasi` | 7 | Beginner→Advanced | Easing, keyframes, micro-interactions, page transitions, scroll |
| 🏷️ Branding | `branding` | 7 | Beginner→Advanced | Strategy, visual identity, logo, voice, guidelines, touchpoints |
| ♿ Accessibility | `aksesibilitas` | 7 | Beginner→Advanced | WCAG, semantic HTML, ARIA, keyboard nav, screen readers |
| 🔧 Improvement | `improvement` | 7 | Beginner→Advanced | Audit, heuristics, prioritization, design system extraction (META) |
| 🧠 Human Cognition | `kognisi` | 7 | Beginner→Advanced | Dual process, perception, memory, decision making, metacognition |
| 📱 Mobile UX | `mobile-ux` | 7 | Beginner→Advanced | Touch targets, gestures, thumb zone, mobile forms, haptics |
| 📊 Data Viz | `data-viz` | 7 | Beginner→Advanced | Visual encoding, chart selection, dashboards, storytelling, a11y |
| 💬 Conversational UI | `conversational-ui` | 8 | Beginner→Advanced | Chatbots, NLU/intents, VUI, error recovery, multi-modal, conv AI agents |
| 🛠️ Design Systems | `design-systems` | 7 | Beginner→Advanced | Tokens, components, Figma, governance, multi-brand, ROI |
| 🧭 Strategic Design | `strategic-design` | 7 | Beginner→Advanced | Double Diamond, JTBD, OKRs, Cynefin, first principles, execution |
| 🌐 Service Design | `service-design` | 7 | Beginner→Advanced | S-D logic, blueprinting, journey mapping, ecosystems, AI-human orchestration, metrics |
| ⚙️ Software Engineering | `software-engineering` | 9 | Beginner→Advanced | SOLID, architecture, APIs, GoF patterns, testing, refactoring, DDD, CQRS |
| 🐳 DevOps & Infra | `devops-infra` | 7 | Beginner→Advanced | Linux, Docker, CI/CD, cloud, networking, monitoring, IaC |
| 🗄️ Database Management | `database-management` | 7 | Beginner→Advanced | SQL, normalization, indexing, migrations, NoSQL, modeling, backup |
| 🤖 AI Integration | `ai-integration` | 10 | Beginner→Advanced | Prompts, RAG, embeddings, orchestration, eval, safety, MCP, agents, multi-modal, cost |
| 🔐 Security | `security` | 9 | Beginner→Advanced | OWASP Top 10 + LLM Top 10, auth, encryption, AI security, zero trust, supply chain |
| ⚡ Performance | `performance` | 7 | Beginner→Advanced | Core Web Vitals (lab + field), caching, backend/DB optimization, load testing |
| 🧪 Testing & QA | `testing-qa` | 7 | Beginner→Advanced | Test pyramid, unit/integration/E2E, CI automation, quality metrics |
| 🖥️ Developer Experience | `dx` | 7 | Beginner→Advanced | CLI design, API ergonomics, Diátaxis docs, SDK patterns, TTFC, DevEx |
| 🗂️ Information Architecture | `ia` | 7 | Beginner→Advanced | LATCH, navigation, faceted search, taxonomies, content modeling, card sorting |
| 🔀 Agentic Engineering | `agentic-engineering` | 9 | Beginner→Advanced | Runtimes, context eng, multi-agent, observability, cost, safety, lifecycle, A2A, economics |
| 🔬 UX Research | `ux-research` | 7 | Beginner→Advanced | Research methods, interviews, quantitative, synthesis, ops, usability, AI-augmented |

---

## 🤖 Using the Auto-Router

The auto-router (`load-context.js`) automatically matches user prompts to relevant faculties:

```bash
# Simple query — auto-matches to faculties
node load-context.js "create a mobile app with touch gestures"

# JSON output for programmatic use
node load-context.js "design a chatbot with personality" --json

# List all faculties
node load-context.js --list

# Interactive mode
node load-context.js --interactive

# Print actual course content
node load-context.js "accessible dashboard with data viz" --print
```

### For MCP Server (Claude Desktop / Cursor):

> Run `npm install` first to install dependencies (`@modelcontextprotocol/sdk`, `zod`).

```json
{
  "mcpServers": {
    "icil": {
      "command": "node",
      "args": ["path/to/icil/mcp-server.js"]
    }
  }
}
```

The MCP server exposes ten tools: `search_campus`, `load_course`, `list_faculties`, `search_across`, `compare_courses`, `get_campus_stats`, `search_by_faculty`, `get_course_prerequisites`, `export_course`, `recommend_learning_path`.

---

## 📐 Campus Architecture

```
inteligence_mas-aul/
├── CAMPUS-OVERVIEW.md       ← 🗺️ YOU ARE HERE — start here
├── README.md                ← Campus map for humans
├── index.json               ← Machine-readable catalog (v25.0.4) + auto-router
├── load-context.js          ← CLI auto-router
├── mcp-server.js            ← MCP server for AI agents (10 tools, v3)
├── campus-core.js           ← Shared library
├── CONTEXT.md               ← Session save state
├── CHANGELOG.md             ← Version history
├── ROADMAP-v2.md             ← 🗺️ v2 roadmap (Phase A-C) — COMPLETED ✅
│
├── warna/                   ← 🎨 Faculty 1: Color (9)
├── ux-psikologi/            ← 🧠 Faculty 2: UX Psychology (7)
├── ux-writing/              ← ✍️ Faculty 3: UX Writing (7)
├── tipografi/               ← 🔤 Faculty 4: Typography (7)
├── layout/                  ← 📐 Faculty 5: Layout & Grid (7)
├── design-patterns/         ← 🧩 Faculty 6: Design Patterns (8)
├── animasi/                 ← ✨ Faculty 7: Animation (7)
├── branding/                ← 🏷️ Faculty 8: Branding (7)
├── aksesibilitas/           ← ♿ Faculty 9: Accessibility (7)
├── improvement/             ← 🔧 Faculty 10: Improvement (7)
├── kognisi/                 ← 🧠 Faculty 11: Human Cognition (7)
├── mobile-ux/               ← 📱 Faculty 12: Mobile UX (7)
├── data-viz/                ← 📊 Faculty 13: Data Viz (7)
├── conversational-ui/       ← 💬 Faculty 14: Conversational UI (8)
├── design-systems/          ← 🛠️ Faculty 15: Design Systems (7)
├── strategic-design/        ← 🧭 Faculty 16: Strategic Design (7)
├── service-design/          ← 🌐 Faculty 17: Service Design (7)
├── software-engineering/    ← ⚙️ Faculty 18: Software Engineering (9)
├── devops-infra/            ← 🐳 Faculty 19: DevOps & Infra (7)
├── database-management/     ← 🗄️ Faculty 20: Database Management (7)
├── ai-integration/          ← 🤖 Faculty 21: AI Integration (10)
├── security/                ← 🔐 Faculty 22: Security & Defense (9)
├── performance/             ← ⚡ Faculty 23: Performance Engineering (7)
├── testing-qa/              ← 🧪 Faculty 24: Testing & QA (7)
├── dx/                      ← 🖥️ Faculty 25: Developer Experience (7)
├── ia/                      ← 🗂️ Faculty 26: Information Architecture (7)
├── agentic-engineering/     ← 🔀 Faculty 27: Agentic Engineering (9)
├── ux-research/             ← 🔬 Faculty 28: UX Research (7)
└── design-ethics/           ← ⚖️ Faculty 29: Design Ethics (7)
```

---

## 🎯 Philosophy

| Principle | Meaning |
|-----------|---------|
| **Self-contained** | Each file stands alone as AI agent context |
| **Deep, not wide** | Each course is deep (~12 min reading), not surface-level |
| **Agent-first** | Written in optimal format for AI agent loading |
| **Research-backed** | All content from research, not guesswork |
| **Practical** | Theory + code examples + cheat sheets |
| **Bilingual** | Auto-router supports English + Indonesian prompts |
| **Cross-referenced** | Courses link to related courses in other faculties |

---

> *"Deep knowledge makes agents truly powerful. This campus gives AI agents the expertise of 29 university departments in 216 files."* — Mas Aul 🔥
>
> **v25.0.4**: CI ALL GREEN — 0 DUPLICATE HIGH, P@3=71.2%, R@3=93.9%, MRR=0.919. 216 courses, 29 faculties, 10 MCP tools.
>
> **🗺️ Next**: v3 planning — community proposals welcome.
