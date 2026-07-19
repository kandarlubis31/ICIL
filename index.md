# 🎓 ICIL v25.0 — AI Agent Entry Point

> 216 courses · 29 faculties · 10 MCP tools · 🏁 CAMPUS MILESTONE

## ⚡ Query

```bash
node load-context.js "prompt" --json   # auto-route → courses
node load-context.js --list            # all faculties
```
```js
const { searchCampus } = require('./campus-core');
```
**MCP v3:** `{ mcpServers: { icil: { command: "node", args: ["mcp-server.js"] } } }` — 10 tools: `search_campus` · `load_course` · `list_faculties` · `search_across` · `compare_courses` · `get_campus_stats` · `search_by_faculty` · `get_course_prerequisites` · `export_course` · `recommend_learning_path`

## 🏛️ 29 Faculties

| # | Slug | Topics | # | Slug | Topics |
|---|------|--------|---|------|--------|
| 1 | `warna` | Color, accessibility | 16 | `strategic-design` | JTBD, OKRs, Cynefin |
| 2 | `ux-psikologi` | Biases, UX laws | 17 | `service-design` | Blueprinting, journeys |
| 3 | `ux-writing` | Microcopy, localization | 18 | `software-engineering` | SOLID, DDD, CQRS |
| 4 | `tipografi` | Fonts, readability | 19 | `devops-infra` | Docker, CI/CD |
| 5 | `layout` | Grid, responsive | 20 | `database-management` | SQL, NoSQL |
| 6 | `design-patterns` | Modal, forms, nav | 21 | `ai-integration` | Prompts, RAG, agents |
| 7 | `animasi` | Easing, interactions | 22 | `security` | OWASP, zero trust |
| 8 | `branding` | Identity, voice | 23 | `performance` | Web Vitals, caching |
| 9 | `aksesibilitas` | WCAG, ARIA | 24 | `testing-qa` | Unit, E2E |
| 10 | `improvement` | Audit, heuristics | 25 | `dx` | CLI, API, docs |
| 11 | `kognisi` | Cognition, memory | 26 | `ia` | Taxonomy, search |
| 12 | `mobile-ux` | Touch, gestures | 27 | `agentic-engineering` | Runtimes, agents |
| 13 | `data-viz` | Charts, dashboards | 28 | `ux-research` | Interviews, synthesis |
| 14 | `conversational-ui` | Chatbots, voice UI, AI agents | 29 | `design-ethics` | Ethics, privacy, fairness |
| 15 | `design-systems` | Tokens, components |

## 🎯 Instant Route

```
visual    → warna tipografi layout    | data    → data-viz warna
usable    → ux-psikologi kognisi     | chatbot → conversational-ui ux-writing
content   → ux-writing branding      | deploy  → devops-infra software-engineering
build UI  → design-patterns design-systems | backend → software-engineering database-management
accessible→ aksesibilitas design-ethics | AI/LLM → ai-integration conversational-ui
improve   → improvement + domain    | secure  → security software-engineering
mobile    → mobile-ux layout         | fast    → performance testing-qa
strategy  → strategic-design improvement | test  → testing-qa software-engineering
devtools   → dx software-engineering      | nav/search → ia design-patterns
prod agent → agentic-engineering ai-integration  | context rot → agentic-engineering
user research → ux-research ux-psikologi     | usability → ux-research
ethics    → design-ethics ux-psikologi  | privacy  → design-ethics security
```

→ Auto-route any prompt: `node load-context.js "prompt" --json`

## 📂 Files

`AGENTS.md` (agent guide — load first) · `index.json` (catalog) · `campus-core.js` (lib) · `load-context.js` (CLI) · `mcp-server.js` (MCP v3, 10 tools) · `CAMPUS-OVERVIEW.md` (full overview + 16 task paths) · `CHANGELOG.md` (history) · `ROADMAP-v2.md` (evolution plan — COMPLETED 🏁)
