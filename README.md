# 🎓 ICIL — Intelligence Campus Interactive Library

[![Version](https://img.shields.io/badge/version-v25.0.4-blue)](https://github.com/mas-aul/icil/releases)
[![Courses](https://img.shields.io/badge/courses-216-green)](./index.json)
[![Faculties](https://img.shields.io/badge/faculties-29-orange)](./index.json)
[![MCP Tools](https://img.shields.io/badge/MCP%20tools-10-purple)](./mcp-server.js)
[![Eval P@3](https://img.shields.io/badge/P%403-71.2%25-yellow)](./eval-set.json)
[![License](https://img.shields.io/badge/license-MIT-lightgrey)](./LICENSE)

> **Sacred Dictionary for AI Agents** — A super comprehensive knowledge base reference for AI agents across various knowledge domains.
>
> **New to the repo? Load [`AGENTS.md`](./AGENTS.md) first** — it's the agent guide with repo layout, routing, conventions, and testing.

Welcome to **ICIL — Intelligence Campus Interactive Library**, an *intelligence layer* designed as a sacred reference for AI agents. Each directory is a **faculty of knowledge**, and each `.md` file is a **course** that can be loaded by AI agents as deep contextual knowledge.

---

## 🏛️ Campus Structure

```
inteligence_mas-aul/
├── README.md                   # 🗺️ Campus map (you are here!)
├── index.json                  # 🤖 Machine-readable index for AI agents
├── campus-core.js              # 🔧 Shared library
├── load-context.js             # 🔧 Auto-router CLI tool
├── mcp-server.js               # 🔌 MCP server (10 tools, v3)
├── CONTEXT.md                  # 💾 Session save state
├── CHANGELOG.md                # 📋 Version history
├── CONTRIBUTING.md             # 🤝 Contribution guide
├── LICENSE                     # ⚖️ MIT License
├── warna/                      # 🎨 Faculty of Color
│   ├── README.md
│   ├── 01-color-theory-basics.md
│   ├── 02-color-harmony.md
│   ├── 03-color-psychology.md
│   ├── 04-color-in-culture.md
│   ├── 05-digital-color-models.md
│   ├── 06-color-accessibility.md
│   ├── 07-palette-generation.md
│   ├── 08-color-design-systems.md
│   └── 09-advanced-color-composition.md
├── ux-psikologi/               # 🧠 Faculty of UX Psychology
│   └── (7 courses)
├── ux-writing/                 # ✍️ Faculty of UX Writing
│   └── (7 courses)
├── tipografi/                  # 🔤 Faculty of Typography
│   └── (7 courses)
├── layout/                     # 📐 Faculty of Layout & Grid
│   └── (7 courses)
├── design-patterns/            # 🧩 Faculty of Design Patterns
│   └── (8 courses)
├── animasi/                    # ✨ Faculty of Animation & Motion
│   └── (7 courses)
├── branding/                   # 🏷️ Faculty of Branding
│   └── (7 courses)
├── aksesibilitas/              # ♿ Faculty of Accessibility
│   └── (7 courses)
├── improvement/                # 🔧 Faculty of Improvement
│   └── (7 courses)
├── kognisi/                    # 🧠 Faculty of Human Cognition
│   └── (7 courses)
├── mobile-ux/                  # 📱 Faculty of Mobile UX & Touch Design
│   └── (7 courses)
├── data-viz/                   # 📊 Faculty of Data Visualization
│   └── (7 courses)
├── design-systems/             # 🛠️ Faculty of Design Systems & Tools
│   └── (7 courses)
├── conversational-ui/          # 💬 Faculty of Conversational UI & Voice
│   └── (7 courses)
├── strategic-design/           # 🧭 Faculty of Strategic Design & Product Thinking
│   └── (7 courses)
├── service-design/             # 🌐 Faculty of Service Design & Systems
│   └── (7 courses)
├── software-engineering/       # ⚙️ Faculty of Software Engineering
│   └── (7 courses)
├── devops-infra/               # 🐳 Faculty of DevOps & Infrastructure
│   └── (7 courses)
├── database-management/        # 🗄️ Faculty of Database Management
│   └── (7 courses)
├── ai-integration/             # 🤖 Faculty of AI Integration & LLM
│   └── (7 courses)
├── security/                   # 🔐 Faculty of Security & App Defense
│   └── (7 courses)
├── performance/                # ⚡ Faculty of Performance Engineering
│   └── (7 courses)
├── testing-qa/                 # 🧪 Faculty of Testing & Quality Assurance
│   └── (7 courses)
├── dx/                         # 🖥️ Faculty of Developer Experience
│   └── (7 courses)
├── ia/                         # 🗂️ Faculty of Information Architecture
│   └── (7 courses)
├── agentic-engineering/        # 🤖 Faculty of Agentic Engineering & Orchestration
│   └── (7 courses)
├── ux-research/                # 🔬 Faculty of UX Research & Discovery
│   └── (7 courses)
└── design-ethics/              # ⚖️ Faculty of Design Ethics
    └── (7 courses)
```

---

## 🎯 Philosophy

This campus is built on principles:

| Principle | Meaning |
|-----------|---------|
| **Self-contained** | Each file stands alone as AI agent context |
| **Deep, not wide** | Each course is deep, not surface-level |
| **Agent-first** | Written in an optimal format for AI agent loading |
| **Research-backed** | All content based on research, not guesswork |
| **Practical** | Theory + practical examples + code |

---

## 🚀 How to Use

### For AI Agents — Auto-Router CLI

Use the built-in CLI tool to automatically find relevant courses based on a user prompt:
```bash
node load-context.js "create a luxury landing page with elegant design"
node load-context.js "make accessible forms for screen readers" --json
node load-context.js --list
node load-context.js --interactive
```

Or load `.md` files manually as system prompt or context injection:
```
You are an AI designer. Use knowledge from the color faculty:
[load warna/01-color-theory-basics.md]
[load warna/02-color-harmony.md]
```

### For Humans
Just read the files in order per faculty. Each file lists its prerequisites at the top.

### For Contributors
Read [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the course template, naming conventions, and PR checklist.
See [`CHANGELOG.md`](./CHANGELOG.md) for version history.

---

## 📚 Available Faculties

### 🎨 Faculty of Color — `warna/`
Comprehensive color knowledge: from basic theory, harmony, psychology, cultural meanings, digital models, accessibility, to palette generation techniques and advanced composition.

**9 Courses** | **Level: Beginner → Advanced**

### 🧠 Faculty of UX Psychology — `ux-psikologi/`
Cognitive psychology behind UX: cognitive biases, UX laws (Fitts, Hick, Miller, Jakob), Gestalt principles, ethical persuasion, dark patterns, and gamification.

**7 Courses** | **Level: Intermediate → Advanced**

### ✍️ Faculty of UX Writing — `ux-writing/`
The art of writing words in interfaces: microcopy, voice & tone, error states, onboarding, language accessibility, localization, and content design systems.

**7 Courses** | **Level: Beginner → Advanced**

### 🔤 Faculty of Typography — `tipografi/`
Digital typography: typeface anatomy, type scale & hierarchy, font pairing, readability, spacing, variable fonts, and web typography performance.

**7 Courses** | **Level: Beginner → Advanced**

### 📐 Faculty of Layout & Grid — `layout/`
Digital layout: grid systems, CSS Grid (basics to subgrid), Flexbox, responsive breakpoints, visual composition, golden ratio, and spacing systems.

**7 Courses** | **Level: Beginner → Advanced**

### 🧩 Faculty of Design Patterns — `design-patterns/`
Complete UI patterns catalog: modal/drawer/popover, form design, navigation, search, data display, feedback states, selection inputs, and complex components.

**8 Courses** | **Level: Intermediate → Advanced**

### ✨ Faculty of Animation & Motion — `animasi/`
Full motion design spectrum: Disney's 12 principles applied to UI, easing curves & timing, CSS transitions & keyframes, micro-interactions, page transitions (View Transitions API), scroll animations, and loading & skeleton screens.

**7 Courses** | **Level: Beginner → Advanced**

### 🏷️ Faculty of Branding — `branding/`
Complete brand-building journey: from foundational strategy (purpose, vision, positioning) through visual identity (logos, color, typography, systems), verbal identity (voice, tone, naming), brand guidelines, touchpoint orchestration, to brand evolution and competitive positioning.

**7 Courses** | **Level: Beginner → Advanced**

### ♿ Faculty of Accessibility — `aksesibilitas/`
Complete accessibility spectrum: WCAG foundations (POUR, conformance levels, legal frameworks), semantic HTML, ARIA roles/states/properties, keyboard navigation & focus management, accessible forms & inputs, screen reader testing, and advanced inclusive design patterns for cognitive, visual, motor, and auditory disabilities.

**7 Courses** | **Level: Beginner → Advanced**

### 🔧 Faculty of Improvement — `improvement/`
The **meta-faculty** that ties the campus together. Teaches AI agents *how to improve* any project systematically: audit → analyze → prioritize → execute → verify. When a user says "improve this project," the agent loads this faculty first to learn the methodology, then loads relevant domain faculties for specific fixes. Includes the end-to-end **ICIL Improvement Protocol**.

**7 Courses** | **Level: Beginner → Advanced**

### 🧠 Faculty of Human Cognition — `kognisi/`
The **foundational science faculty** — how the human brain actually works. Covers cognitive architecture (information processing, brain regions, cognitive load), dual process theory (System 1 & System 2), perception & attention (selective attention, inattentional blindness, change blindness), memory systems (sensory, working, long-term, forgetting curve, false memories), decision making (bounded rationality, heuristics, prospect theory, nudge theory), problem solving & creativity (insight, divergent thinking, flow state, constraints), and language/emotion/metacognition (Sapir-Whorf, embodied cognition, Damasio, Flavell, neuroplasticity). This faculty provides the SCIENCE behind all other faculties.

**7 Courses** | **Level: Beginner → Advanced**

### 📱 Faculty of Mobile UX & Touch Design — `mobile-ux/`
Complete mobile UX spectrum: mobile-first principles & progressive enhancement, touch targets & gesture design (swipe, pinch, long-press, Fitts' Law on mobile), navigation patterns (bottom nav, tab bars, hamburger menu, FAB, bottom sheets), thumb zone ergonomics & one-handed design, mobile forms & input optimization (keyboard-aware layouts, autocomplete, floating labels), mobile animations & haptics (spring animations, pull-to-refresh, haptic feedback patterns), and responsive/adaptive mobile layouts (container queries, foldables, safe areas, content-driven breakpoints).

**7 Courses** | **Level: Beginner → Advanced**

### 📊 Faculty of Data Visualization — `data-viz/`
Complete data visualization spectrum: from the grammar of graphics and visual encoding theory (marks & channels, preattentive processing, data-ink ratio) through chart selection (decision trees, 15+ chart types with use cases and pitfalls), color science for data (ColorBrewer, perceptual uniformity, semantic color), dashboard design (operational/analytical/strategic patterns, KPI cards, drill-down), interactive dynamics (tooltips, brushing & linking, zoom/pan, real-time streaming), data storytelling & narrative (Martini glass, scrollytelling, annotation layers), to accessible data visualization (colorblind-safe palettes, screen reader patterns, alt text for charts, sonification, keyboard navigation).

**7 Courses** | **Level: Beginner → Advanced**

### 🛠️ Faculty of Design Systems & Tools — `design-systems/`
Complete design system lifecycle: from foundations (build vs buy, atomic design, maturity model) through tokens (W3C DTCG, Style Dictionary, multi-platform), component library, Figma workflows, governance, multi-brand theming, to ROI measurement.

**7 Courses** | **Level: Beginner → Advanced**

### 💬 Faculty of Conversational UI & Voice — `conversational-ui/`
Complete conversational design spectrum: from fundamentals (Grice's maxims, chat vs voice, cooperative flow) through NLU architecture (intents, entities, training data, confidence thresholds, slot filling), chatbot UX patterns (greetings, quick replies, typing indicators, rich messages, carousels, human handoff), voice UI design (wake words, confirmation strategies, earcons, SSML), error recovery (no-match ladder, misrecognition defense, graceful degradation), personality & tone (brand alignment, tone mapping, humor guidelines, cultural adaptation), to multi-modal interfaces (voice + screen + touch, device adaptation, conversation continuity).

**7 Courses** | **Level: Beginner → Advanced**

### 🧭 Faculty of Strategic Design & Product Thinking — `strategic-design/`
The **strategic thinking faculty** — teaches AI agents how to think like product leaders. Covers Design Thinking & the Double Diamond (divergent/convergent process), problem discovery & framing (Jobs-to-be-Done, How Might We, Amazon Working Backwards), product strategy & outcome thinking (vision, OKRs, NCTs, product-market fit), strategic roadmapping (Now-Next-Later, Opportunity Solution Trees, story mapping), first principles & systems thinking (decomposition, feedback loops, leverage points), strategic decision-making (Cynefin, pre-mortems, Red Teaming, decision matrices), and bridging strategy to execution (dual-track agile, strategic narratives, stakeholder alignment, North Star metrics).

**7 Courses** | **Level: Beginner → Advanced**

### 🌐 Faculty of Service Design & Systems — `service-design/`
The **orchestration faculty** — bridges individual touchpoints into coherent end-to-end services. Covers Service-Dominant Logic (goods vs service thinking, 5 axioms), service blueprinting (5-layer blueprint with AI actor lanes), journey & moment mapping (emotional arcs, moments of truth, pain point scoring), ecosystem & stakeholder architecture (actor maps, value exchange, dependency matrix), AI-human handoff design (confidence thresholds, warm transfer, escalation ladder), service prototyping (Wizard of Oz, desktop walkthrough, riskiest assumption), and service health metrics (SERVQUAL, CSAT, CES, AI service scorecards).

**7 Courses** | **Level: Beginner → Advanced**

### ⚙️ Faculty of Software Engineering — `software-engineering/`
The **engineering foundation** — clean code, SOLID principles, software architecture (monolith/microservices/event-driven), API design (REST/GraphQL/gRPC), GoF design patterns, testing strategies (unit/integration/E2E/TDD), refactoring & code review, and project structure with dependency injection.

**7 Courses** | **Level: Beginner → Advanced**

### 🐳 Faculty of DevOps & Infrastructure — `devops-infra/`
The **deployment layer** — Linux server fundamentals, Docker containerization, CI/CD pipelines (GitHub Actions), cloud deployment (AWS/GCP/Cloud Run), networking & proxies (DNS/nginx/TLS), monitoring & logging (Prometheus/Grafana), and infrastructure as code (Terraform).

**7 Courses** | **Level: Beginner → Advanced**

### 🗄️ Faculty of Database Management — `database-management/`
The **data layer** — relational design & normalization (1NF-3NF), SQL mastery (joins/window functions/CTEs), indexing & query optimization, database migrations, NoSQL (MongoDB/Redis/CAP theorem), data modeling patterns, and security & backup.

**7 Courses** | **Level: Beginner → Advanced**

### 🤖 Faculty of AI Integration & LLM Engineering — `ai-integration/`
The **AI engineering layer** — prompt engineering (few-shot/chain-of-thought/structured output), RAG architecture (retrieval/chunking/re-ranking), embeddings & vector search, LLM orchestration (function calling/agents/ReAct), evaluation & hallucination detection, AI safety & guardrails, and MCP tool integration.

**7 Courses** | **Level: Beginner → Advanced**

### 🔐 Faculty of Security & Application Defense — `security/`
The **security layer** — OWASP Top 10 & threat modeling (STRIDE), authentication & authorization (OAuth/JWT/bcrypt/RBAC), API & input security (validation/SQL injection/rate limiting/CORS), encryption & data protection (TLS/AES/secrets management), secure SDLC & dependency security (SAST/DAST/npm audit), AI-specific security (prompt injection/jailbreaking), and incident response & compliance (GDPR/SOC2/post-mortem).

**7 Courses** | **Level: Beginner → Advanced**

### ⚡ Faculty of Performance Engineering — `performance/`
The **optimization layer** — Core Web Vitals & frontend performance (LCP/INP/CLS/Lighthouse), caching strategies (Redis/CDN/cache invalidation), backend optimization (N+1/connection pooling/async processing), database performance (EXPLAIN/indexes/cursor pagination), network & asset optimization (WebP/lazy loading/Brotli/HTTP/2), load testing & profiling (k6/flamegraph/P95), and performance budgets & CI enforcement.

**7 Courses** | **Level: Beginner → Advanced**

### 🧪 Faculty of Testing & Quality Assurance — `testing-qa/`
The **quality layer** — testing fundamentals & pyramid (TDD/BDD/isolation), unit & component testing (Jest/Vitest/mocking), integration & API testing (Supertest/test databases), E2E & UI testing (Playwright/Cypress/visual regression), performance & load testing (k6/stress/soak), CI/CD test automation (flaky tests/parallelization), and quality metrics & strategy (coverage/mutation testing/bug escape rate).

**7 Courses** | **Level: Beginner → Advanced**

### 🖥️ Faculty of Developer Experience — `dx/`
The **developer-facing layer** — DX fundamentals & strategy (empathy for devs, friction logging, DevEx framework), CLI design patterns (--help, exit codes, subcommands, progress bars), API design for developers (REST/GraphQL/gRPC ergonomics, error codes, SDK generation), documentation architecture (Diátaxis framework, docs-as-code, OpenAPI, MDX), SDK & library design (naming conventions, tree-shaking, middleware patterns), error messages for developers (actionable errors, structured logging, debugging tooling), and developer onboarding & metrics (TTFC/Time to First Call, DevEx surveys, DORA metrics).

**7 Courses** | **Level: Beginner → Advanced**

### 🗂️ Faculty of Information Architecture — `ia/`
The **structure layer** — IA fundamentals & organization schemes (LATCH: Location/Alphabet/Time/Category/Hierarchy), navigation & wayfinding (breadcrumbs, sitemaps, progressive disclosure, contextual nav), search systems (faceted search, autocomplete, relevance ranking, federated search), taxonomies & ontologies (controlled vocabularies, polyhierarchies, SKOS, knowledge graphs), content modeling & metadata (schema.org, Dublin Core, headless CMS, structured content), card sorting & tree testing (open/closed card sort, treejack, IA validation), and IA for AI & personalization (dynamic IA, recommendation engines, semantic search).

**7 Courses** | **Level: Beginner → Advanced**

### 🤖 Faculty of Agentic Engineering & Orchestration — `agentic-engineering/`
The **operational layer** for autonomous AI agents — teaches how to *run agents in production*, beyond building single agents. Covers durable runtimes & control planes (state machines, checkpointing, HITL gates), context engineering (attention budget, compaction, JIT retrieval, scratchpads), multi-agent coordination (supervisor/worker, hierarchical, peer swarm, handoff protocols, delegation drift prevention), agent observability & evaluation (tracing, nested spans, trajectory eval, CI eval gates), cost-aware planning (model routing, confidence escalation, semantic caching, per-task budgets), agent safety & sandboxing (tool scoping, E2B microVMs, tool poisoning defense, audit trails), and agent productionization & lifecycle (versioning behavior bundles, non-human identity, canary/blue-green deployment, behavioral regression testing). Distinct from `ai-integration/` which covers *building* single agents (prompts, RAG, orchestration, eval, safety, MCP).

**7 Courses** | **Level: Beginner → Advanced**

### 🔬 Faculty of UX Research & Discovery — `ux-research/`
The **evidence layer** — teaches how to systematically gather, validate, and synthesize user evidence before designing. While other faculties teach *how to design* (Color, Typography, Layout) and *how to build* (Engineering, DevOps), this faculty teaches **how to research** — the foundation that precedes all design and product work. Covers research fundamentals & method selection (qualitative, quantitative, generative, evaluative, triangulation), qualitative interview techniques (semi-structured interviews, contextual inquiry, active listening, bias avoidance), quantitative methods (survey design, web analytics, A/B testing, usability metrics like SUS/NPS), research synthesis & sensemaking (affinity mapping, coding, journey mapping, persona development, insight statements), research operations (ResearchOps maturity, participant management, repositories, democratization, continuous discovery), usability testing & evaluation (moderated/unmoderated testing, task design, severity rating, heuristic evaluation), and AI-augmented research frontier (AI-moderated interviews, synthetic users, continuous discovery pipelines, AI insight validation, research ethics). Distinct from `ux-psikologi` (psychology of users) and `strategic-design` (problem framing) — this faculty teaches the *research methodology* itself.

**7 Courses** | **Level: Beginner → Advanced**

---

### ⚖️ Faculty of Design Ethics — `design-ethics/`
The **ethics layer** — teaches how to design responsibly. Covers ethical frameworks for designers (utilitarianism, deontology, virtue ethics, care ethics), privacy-first design (PbD principles, GDPR, data minimization, consent UX), inclusive design beyond accessibility (intersectionality, cognitive inclusion, economic and cultural inclusion), AI ethics & algorithmic fairness (bias types, fairness metrics, explainability, AI impact assessments), dark patterns & deceptive design (classification, detection, regulation, ethical persuasion alternatives), sustainability in digital design (carbon-aware UX, green hosting, lifecycle thinking, circular design), and ethical decision-making in organizations (ethics boards, red-teaming, ethical maturity models, whistleblowing).

**7 Courses** | **Level: Beginner → Advanced**

---

## 🔮 Roadmap

- [x] **ROADMAP v2 COMPLETE 🏁** — 216 courses, 29 faculties, 10 MCP tools
- [ ] **v3 planning** — Submit your ideas!

---

> *"Deep knowledge makes agents truly powerful."* — Mas Aul 🔥
