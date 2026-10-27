# 🎓 ICIL v27.1.0 — AI Agent Entry Point

> 243 courses · 32 faculties · 10 MCP tools · 🚫 Anti-Slop

## ⚡ Query

```bash
node load-context.js "prompt" --json   # auto-route → courses
node load-context.js --list            # all faculties
```
```js
const { searchCampus, flattenCourseResults } = require('./campus-core');
```
**MCP v3:** `{ mcpServers: { icil: { command: "node", args: ["mcp-server.js"] } } }` — 10 tools: `search_campus` · `load_course` · `list_faculties` · `search_across` · `compare_courses` · `get_campus_stats` · `search_by_faculty` · `get_course_prerequisites` · `export_course` · `recommend_learning_path`
> `list_faculties`/`get_campus_stats` are compact by default — pass `includeCourses`/`includeFaculties` (or `faculty="security"`) for detail. Course reads are confined to `faculty/file.md`; see `SECURITY.md`.

## 🏛️ 32 Faculties

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
| 15 | `design-systems` | Tokens, components | 30 | `knowledge-context` | Context, retrieval, governance |
| 31 | `penulisan-gaul` | Jaksel, slang, wordplay | 32 | `anti-slop` | AI slop, cliché words, de-slop |

## 🎯 Instant Route

```
visual      → warna tipografi layout       | data       → data-viz warna
usable      → ux-psikologi kognisi         | chatbot    → conversational-ui ux-writing
content     → ux-writing branding          | deploy     → devops-infra software-engineering
build UI    → design-patterns design-systems | backend  → software-engineering database-management
accessible  → aksesibilitas design-ethics  | AI/LLM     → ai-integration conversational-ui
improve     → improvement + domain         | secure     → security software-engineering
mobile      → mobile-ux layout              | fast       → performance testing-qa
strategy    → strategic-design improvement  | test       → testing-qa software-engineering
devtools    → dx software-engineering       | nav/search → ia design-patterns
prod agent  → agentic-engineering ai-integration | context rot → agentic-engineering
knowledge   → knowledge-context             | retrieval  → knowledge-context ai-integration
context security → knowledge-context security ai-integration
user research → ux-research ux-psikologi    | usability  → ux-research
ethics      → design-ethics ux-psikologi     | privacy    → design-ethics security
casual ID   → penulisan-gaul ux-writing      | slang      → penulisan-gaul branding
AI slop     → anti-slop ux-writing           | generic output → anti-slop
```

→ Auto-route any prompt: `node load-context.js "prompt" --json`

**Routing notes:** keywords are bilingual EN+ID; direct keyword matches rank above auto-loaded prerequisites (`flattenCourseResults`); course cap is 5 per faculty.

## 📂 Files

`AGENTS.md` (agent guide — load first) · `SECURITY.md` (security model + reporting) · `index.json` (catalog) · `campus-core.js` (lib) · `load-context.js` (CLI) · `mcp-server.js` (MCP v3, 10 tools) · `CAMPUS-OVERVIEW.md` (full overview + task paths) · `CHANGELOG.md` (history) · `eval-set.json` (251 routing + 20 abstention prompts) · `knowledge-context/` (context engineering faculty) · `penulisan-gaul/` (casual & slang writing faculty) · `anti-slop/` (AI output quality faculty)
