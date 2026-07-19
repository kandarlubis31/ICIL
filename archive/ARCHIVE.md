# 📦 ARCHIVE — ICIL v22.3.0

> **Milestone**: Complete Campus + Content Audit Batch 1, 2, & 3 + ICE Auto-Router Fix
> **Date**: July 15, 2026
> **Status**: ✅ STABLE — All 28 faculties, 199 courses, production-ready with research-backed corrections

---

## 🎓 What is ICIL?

**Intelligence Campus Interactive Library** — an AI-agent-first knowledge base for design, engineering, research, and quality. AI agents query it via CLI (`load-context.js`), MCP server (`mcp-server.js`), or programmatic API (`campus-core.js`).

---

## 📊 v22.3.0 Stats

| Metric | Value |
|--------|-------|
| **Version** | 22.3.0 |
| **Faculties** | 28 |
| **Courses** | 199 |
| **Total words** | ~114,000 |
| **Avg words/course** | ~573 |
| **Trigger keywords** | 2,048 (891 high, 751 medium, 406 low) |
| **Routing examples** | 36 |
| **MCP tools** | 5 (search_campus, load_course, list_faculties, search_across, compare_courses) |

---

## 🏛️ Faculty Catalog

### 🎨 Design Foundations (Faculties 1-11)
| # | Faculty | Slug | Courses |
|---|---------|------|---------|
| 1 | Color | `warna` | 9 |
| 2 | UX Psychology | `ux-psikologi` | 7 |
| 3 | UX Writing | `ux-writing` | 7 |
| 4 | Typography | `tipografi` | 7 |
| 5 | Layout & Grid | `layout` | 7 |
| 6 | Design Patterns | `design-patterns` | 8 |
| 7 | Animation & Motion | `animasi` | 7 |
| 8 | Branding | `branding` | 7 |
| 9 | Accessibility | `aksesibilitas` | 7 |
| 10 | Improvement (META) | `improvement` | 7 |
| 11 | Human Cognition | `kognisi` | 7 |

### 📱 Applied Domains (Faculties 12-17)
| # | Faculty | Slug | Courses |
|---|---------|------|---------|
| 12 | Mobile UX & Touch | `mobile-ux` | 7 |
| 13 | Data Visualization | `data-viz` | 7 |
| 14 | Design Systems & Tools | `design-systems` | 7 |
| 15 | Conversational UI & Voice | `conversational-ui` | 7 |
| 16 | Strategic Design | `strategic-design` | 7 |
| 17 | Service Design | `service-design` | 7 |

### ⚙️ Engineering (Faculties 18-21)
| # | Faculty | Slug | Courses |
|---|---------|------|---------|
| 18 | Software Engineering | `software-engineering` | 7 |
| 19 | DevOps & Infrastructure | `devops-infra` | 7 |
| 20 | Database Management | `database-management` | 7 |
| 21 | AI Integration & LLM | `ai-integration` | 7 |

### 🔒 Quality & Security (Faculties 22-26)
| # | Faculty | Slug | Courses |
|---|---------|------|---------|
| 22 | Security & Defense | `security` | 7 |
| 23 | Performance Engineering | `performance` | 7 |
| 24 | Testing & QA | `testing-qa` | 7 |
| 25 | Developer Experience | `dx` | 7 |
| 26 | Information Architecture | `ia` | 7 |

### 🤖🔬 Frontier (Faculties 27-28)
| # | Faculty | Slug | Courses |
|---|---------|------|---------|
| 27 | Agentic Engineering | `agentic-engineering` | 7 |
| 28 | UX Research & Discovery | `ux-research` | 7 |

---

## 🔧 Architecture

```
icil/
├── AGENTS.md           # Agent guide — load FIRST
├── index.json          # Machine catalog + auto-router (v22.3.0)
├── campus-core.js      # Shared library (10 exports, word-boundary matching)
├── load-context.js     # CLI tool (--json, --list, --print, --interactive)
├── mcp-server.js       # MCP server (5 tools, JSON-RPC)
├── index.md            # Ultra-compact AI entry point (~491 tokens)
├── CAMPUS-OVERVIEW.md  # Full campus overview + 16 cross-faculty task paths
├── CHANGELOG.md        # Complete version history (v1.0 → v22.3.0)
├── CONTEXT.md          # Session save-state for AI agents
├── CONTRIBUTING.md     # Contribution guide + course template
├── PROGRESS-REPORT.md  # Detailed progress report (share with other AIs)
├── ARCHIVE.md          # This file — milestone archive
├── README.md           # Human-readable campus map
├── konsep.txt          # Original concept document (bilingual)
├── package.json        # npm metadata + dependencies
└── {28 faculty dirs}/  # Each with README.md + 7-9 course .md files
```

### Query Methods
```bash
# CLI
node load-context.js "design a color system"        # auto-route to relevant courses
node load-context.js --list                          # list all faculties
node load-context.js "prompt" --json                 # programmatic JSON output
node load-context.js --interactive                   # interactive chat mode

# Programmatic
const { searchCampus, getCourseContent } = require('./campus-core');
const result = searchCampus("prompt injection defense");

# MCP (Claude Desktop / Cursor)
{ mcpServers: { icil: { command: "node", args: ["mcp-server.js"] } } }
# Tools: search_campus · load_course · list_faculties · search_across · compare_courses
```

---

## 📝 Content Audit Summary

### v22.2.0 — Batch 2 (5 course files)
- **mobile-ux/02**: WCAG SC 2.5.5→2.5.8 (AA 24px touch target) + exceptions
- **kognisi/01**: 7±2→4±1 (Cowan) — cross-faculty consistency
- **mobile-ux/07**: Deprecated @media(spanning)→Viewport Segments API; foldable 8%→3%; 320px→360px
- **layout/05**: Container query units (cqw, cqi, cqh, cqmin, cqmax)
- **warna/06**: WCAG 2.1→2.2; APCA draft status note

### v22.2.x — Auto-Router Fix
- **ICE keyword**: Moved from improvement.high→low (65% of Claude false-positives)
- **Word-boundary guard**: `\bice\b` regex prevents "practice", "service", "experience" false-matches
- Combined fixes close the 23-point Claude→GPT routing gap
- **7 meta-file corrections**: ARCHIVE.md updated, course counts fixed, version refs, task path counts

### v22.3.0 — Batch 3 (6 course files across 5 faculties)
- **strategic-design/03**: NCTs creator — Ravi Mehta (not ex-Google OKR team)
- **service-design/01**: S-D Logic — 11 FPs + 5 Axioms (not just "Five Axioms")
- **strategic-design/02**: JTBD — Tony Ulwick (1990) originator + Christensen (2003) popularizer
- **strategic-design/06**: Cynefin — "Confusion" (not "Disorder")
- **kognisi/04**: Forgetting Curve — added approximate note
- **kognisi/05**: Loss aversion — "~2-2.25×" (not "2×")
- **35 files verified** across layout, kognisi, service-design, strategic-design, testing-qa

### v22.1.0 — Batch 1 (5 course files)
- **security/01**: OWASP LLM Top 10 (v1.1) + STRIDE complements
- **ux-psikologi/03**: 8→11 UX laws + WCAG 2.2 touch targets
- **warna/05**: CSS Color Level 5 + APCA/WCAG 3.0 + Oklab ΔE
- **tipografi/01**: Vox-ATypI de-adoption + variable fonts
- **performance/01**: Lab vs Field (PageSpeed Insights + web-vitals JS)

---

## 🔥 Key Achievements

| Milestone | Impact |
|-----------|--------|
| **28 faculties, 199 courses** | Full-stack: design → engineering → research → quality → agentic |
| **Word-boundary auto-router** | Eliminated substring false-positives (ICE, RAG, etc.) |
| **v19.1 compaction** | ~74% token reduction (128K→33K words for 79 old courses) |
| **5 MCP tools** | search_campus, load_course, list_faculties, search_across, compare_courses |
| **Content audit v22.1+22.2** | 10 course files corrected with 2026 research |
| **Bilingual auto-router** | EN + ID keywords, 2,048 trigger keywords across 3 priority tiers |
| **AGENTS.md** | Agent-first entry point (2026 standard) |

---

## 📝 Version History Summary

| Version | Milestone |
|---------|-----------|
| v1.0 | Initial: Faculty of Color (9 courses) |
| v2-v11 | Expanded: Psychology, Writing, Type, Layout, Patterns, Animation, Branding, A11y, Improvement, Cognition (73 courses) |
| v12-v16 | Applied domains: Mobile UX, Data Viz, Design Systems, Conversational UI, Strategic Design (115 courses) |
| v17 | Service Design + compact format introduced (122 courses) |
| v18 | Technical layer: Software Eng, DevOps, DB, AI Integration (150 courses) |
| v19.0 | Quality layer: Security, Performance, Testing (171 courses) |
| v19.1 | 🔥 Massive compaction — 74% token reduction |
| v20.0 | DX + IA faculties + MCP v2 (185 courses) |
| v21.0 | Agentic Engineering + AGENTS.md + auto-router bugfix (192 courses) |
| v22.0 | UX Research & Discovery (199 courses) |
| v22.1 | Content Audit Batch 1 — 5 courses corrected |
| v22.2 | Content Audit Batch 2 — 5 courses corrected + ICE auto-router fix |
| **v22.3** | **ICE fix + 7 meta fixes + Content Audit Batch 3 — 6 more course corrections** |

---

*Archived July 15, 2026. ICIL v22.3.0 — stable, complete, research-backed, production-ready. 3 audit batches, 16 course corrections, 199 courses across 28 faculties.*
