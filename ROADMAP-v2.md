# 🗺️ ICIL v2 Roadmap — The Next Evolution

> **Status**: ✅ COMPLETE — v25.0.0 delivered. 216 courses, 29 faculties, 10 MCP tools. All 3 phases (A+B+C) shipped.
> **Strategy**: DEEPEN first (advanced courses in top faculties) → BUILD MCP v3 (new tools) → EXPAND (Faculty #29). ✅ ALL DONE

---

## 📍 Current State (v23.0.0)

| Attribute | Value |
|-----------|-------|
| **Faculties** | 28 |
| **Courses** | 199 |
| **Audit** | ✅ 100% complete — 18 research-backed corrections |
| **MCP Tools** | 5 (search_campus, load_course, list_faculties, search_across, compare_courses) |
| **Auto-router** | 28 trigger keyword groups, 36 routing examples, word-boundary matching |
| **Format** | Compact (~500-1300 words/course, dense tables, ⚡ Action Checklists) |

### Current Faculty Map
```
🎨 DESIGN FOUNDATIONS (1-11):  Color(9), UX Psychology, UX Writing, Typography,
    Layout, Design Patterns(8), Animation, Branding, Accessibility, Improvement, Cognition

📱 APPLIED DOMAINS (12-17):  Mobile UX, Data Viz, Design Systems, Conversational UI,
    Strategic Design, Service Design

⚙️ ENGINEERING (18-21):  Software Eng, DevOps, Database, AI Integration

🔒 QUALITY/SECURITY (22-24):  Security, Performance, Testing

🖥️ DEV & STRUCTURE (25-26):  Developer Experience, Information Architecture

🤖 AGENTIC (27):  Agentic Engineering & Orchestration

🔬 RESEARCH (28):  UX Research & Discovery
```

---

## 🎯 Phase A: DEEPEN — Advanced Courses for Top Faculties

> **Rationale**: Most faculties have 7 courses. Key faculties need 9-10 to cover advanced topics agents increasingly need. Total: **12 new courses across 5 faculties**.

### A1. 🤖 AI Integration (7 → 10) — +3 courses
*Priority: 🔴 CRITICAL — AI is the fastest-moving domain.*

| ID | Course | Level | Why |
|----|--------|-------|-----|
| 08 | **AI Agents & Autonomous Workflows** | 🔴 Advanced | Agents are the #1 AI pattern in 2026. Covers: agent architectures beyond ReAct, planning systems, goal decomposition, memory across sessions. |
| 09 | **Multi-Modal AI: Text, Image & Audio** | 🔴 Advanced | GPT-4o, Claude 3.5, Gemini — all multi-modal. Covers: image understanding, audio processing, vision+text combos, when to use which modality. |
| 10 | **AI Cost Optimization & Token Economics** | 🟡 Intermediate | $100K+ bills are the #1 production AI failure. Covers: token budgeting, prompt caching, model distillation, batch processing, cost monitoring. |

### A2. 🤖 Agentic Engineering (7 → 9) — +2 courses
*Priority: 🔴 CRITICAL — Agentic systems are scaling fast.*

| ID | Course | Level | Why |
|----|--------|-------|-----|
| 08 | **Agent-to-Agent Protocols & Interoperability** | 🔴 Advanced | Google A2A, Anthropic MCP interconnect, agent discovery. How agents from different frameworks talk to each other. |
| 09 | **Agent Economics & Marketplace Patterns** | 🔴 Advanced | Agent-as-a-Service, pricing models (per-task, subscription, outcome-based), agent marketplaces, quality-of-service guarantees. |

### A3. 🔐 Security (7 → 9) — +2 courses
*Priority: 🟡 HIGH — Security threats evolve with AI.*

| ID | Course | Level | Why |
|----|--------|-------|-----|
| 08 | **Zero Trust Architecture & Identity** | 🔴 Advanced | NIST SP 800-207. Beyond perimeter: microsegmentation, continuous verification, workload identity for AI agents. |
| 09 | **Supply Chain & Dependency Security** | 🔴 Advanced | SBOM, SLSA framework, supply-chain Levels, npm/pip/cargo attack vectors. SolarWinds → xz utils → every dependency is a risk. |

### A4. ⚙️ Software Engineering (7 → 9) — +2 courses
*Priority: 🟡 HIGH — DDD and event-driven are production standards.*

| ID | Course | Level | Why |
|----|--------|-------|-----|
| 08 | **Domain-Driven Design & Bounded Contexts** | 🔴 Advanced | Eric Evans DDD. Ubiquitous language, aggregates, domain events, bounded context mapping. The missing bridge between architecture and code. |
| 09 | **Event Sourcing, CQRS & Event-Driven Systems** | 🔴 Advanced | Append-only event log, read/write separation, projections, Kafka/Pulsar patterns. When event sourcing beats CRUD. |

### A5. 💬 Conversational UI (7 → 8) — +1 course
*Priority: 🟢 MEDIUM — Conversational AI agents are the new frontier.*

| ID | Course | Level | Why |
|----|--------|-------|-----|
| 08 | **Conversational AI Agents & Autonomous Chat** | 🔴 Advanced | LLM-powered conversational agents that plan, use tools, and maintain long-term memory. Differs from traditional chatbot UX — covers agentic conversation loops. |

### Phase A Summary

| Faculty | Current | New | Target |
|---------|---------|-----|--------|
| ai-integration | 7 | +3 | 10 |
| agentic-engineering | 7 | +2 | 9 |
| security | 7 | +2 | 9 |
| software-engineering | 7 | +2 | 9 |
| conversational-ui | 7 | +1 | 8 |
| **Total** | **35** | **+12** | **211 courses** |

---

## 🔧 Phase B: MCP SERVER v3 — 5 New Tools

> **Rationale**: Current 5 tools cover basic querying. v3 adds intelligence: recommendations, scoped search, prerequisites, exports, and analytics.

### Tool 1: `recommend_learning_path`
```
Description: AI-recommended custom learning path based on user goals.
Input: { goal: string, experience_level?: "beginner"|"intermediate"|"advanced", max_courses?: number }
Output: [{ faculty, course_id, title, reason }] — ordered recommended sequence
Why: Most valuable for new users. "I want to build a RAG chatbot" → returns 5-7 courses in order.
```

### Tool 2: `search_by_faculty`
```
Description: Scoped full-text search within ONE faculty.
Input: { faculty: string, query: string }
Output: [{ course_id, title, excerpt, relevance_score }]
Why: When the user already knows the domain but wants specific content.
```

### Tool 3: `get_course_prerequisites`
```
Description: Trace the prerequisite chain for any course.
Input: { faculty: string, course_id: string }
Output: { course, prerequisites: [{ faculty, course_id, title }], dependents: [{ faculty, course_id, title }] }
Why: Critical for learning path generation. "What do I need to know before agentic-engineering/06?"
```

### Tool 4: `export_course`
```
Description: Export course(s) to different formats.
Input: { faculty: string, course_ids: string[], format: "json"|"markdown"|"html"|"pdf_outline" }
Output: Formatted course content
Why: Enables integration with external tools, documentation systems, and LLM context injection.
```

### Tool 5: `get_campus_stats`
```
Description: Quick statistics and metadata about the campus.
Input: {} (no params needed)
Output: { total_courses, total_faculties, courses_per_faculty: {}, version, last_updated }
Why: Quick overview for AI agents before loading context. "How big is this campus?"
```

### Phase B Summary

| # | Tool | Priority | Complexity |
|---|------|----------|------------|
| 1 | `recommend_learning_path` | 🔴 Critical | High (LLM-powered) |
| 2 | `search_by_faculty` | 🟡 High | Low (scoped search) |
| 3 | `get_course_prerequisites` | 🟡 High | Low (graph traversal) |
| 4 | `export_course` | 🟢 Medium | Medium (format transforms) |
| 5 | `get_campus_stats` | 🟢 Medium | Low (simple aggregation) |
| **Total** | **5 new tools** (10 total) | | |

---

## 🏛️ Phase C: Faculty #29 — Design Ethics & Responsibility

> **Rationale**: The #1 most-requested missing faculty. Currently only `ux-psikologi/06` covers dark patterns. A dedicated ethics faculty is essential for AI agents building products in 2026.

### Faculty Structure

| ID | Course | Level | Description |
|----|--------|-------|-------------|
| 01 | **Ethical Frameworks for Designers** | 🟢 Beginner | Utilitarian, deontological, virtue ethics, care ethics — translated into design decisions. "Would I be proud to tell my mom about this feature?" |
| 02 | **Privacy-First Design & Data Minimization** | 🟡 Intermediate | GDPR, data minimization, privacy by design (Cavoukian's 7 principles), consent patterns, data retention policies. |
| 03 | **Inclusive Design Beyond Accessibility** | 🟡 Intermediate | Accessibility = baseline. Inclusivity = culture, language, socioeconomic, neurodiversity, gender, age. Beyond WCAG compliance. |
| 04 | **AI Ethics & Algorithmic Fairness** | 🔴 Advanced | Bias in training data, fairness metrics, explainability (XAI), AI auditing, EU AI Act compliance, model cards, red-teaming for fairness. |
| 05 | **Dark Patterns, Deception & Manipulation** | 🟡 Intermediate | Expand from ux-psikologi/06. Confirmshaming, forced continuity, disguised ads, privacy zuckering, roach motel, sneaking — with legal context (FTC, EU DSA). |
| 06 | **Sustainability in Digital Design** | 🟡 Intermediate | Carbon-aware design, green hosting, efficient assets, digital sobriety, sustainable UX patterns, measuring digital carbon footprint. |
| 07 | **Ethical Decision-Making & Organizational Ethics** | 🔴 Advanced | Ethics in practice: ethical roadmapping, stakeholder ethics review, whistleblowing, when to say no, building ethical culture. Capstone. |

### Phase C Summary

| Faculty | Emoji | Courses | Domain |
|---------|-------|---------|--------|
| design-ethics | ⚖️ | 7 | Ethics, privacy, AI fairness, sustainability |

**New campus total: 216 courses across 29 faculties.**

---

## 📅 Timeline & Priorities

| Phase | Deliverable | Effort | Timeline | Version |
|-------|------------|--------|----------|---------|
| A1 | AI Integration +3 courses | 3-4 days | Sprint 1 | v24.0.0 |
| A2 | Agentic Engineering +2 courses | 2-3 days | Sprint 1 | v24.0.0 |
| A3 | Security +2 courses | 2-3 days | Sprint 2 | v24.1.0 |
| A4 | Software Engineering +2 courses | 2-3 days | Sprint 2 | v24.1.0 |
| A5 | Conversational UI +1 course | 1-2 days | Sprint 3 | v24.2.0 |
| B1 | MCP v3 — recommend_learning_path | 2 days | Sprint 3 | v24.2.0 |
| B2 | MCP v3 — search_by_faculty, get_course_prerequisites | 1 day | Sprint 4 | v24.3.0 |
| B3 | MCP v3 — export_course, get_campus_stats | 1 day | Sprint 4 | v24.3.0 |
| C | Faculty #29 — Design Ethics (7 courses) | 5-7 days | Sprint 5-6 | v25.0.0 |
| | **TOTAL** | **~20-28 days** | **6 sprints** | **v25.0.0** |

---

## 🚀 Quick Start: Phase A1 First (Highest Impact)

The first deliverable should be **AI Integration deep courses (08-10)** because:
1. AI agents querying ICIL most frequently ask about agent patterns, multi-modal, and cost
2. These are the most time-sensitive — the AI field moves fastest
3. They unlock Phase B's `recommend_learning_path` tool with richer content

### First Sprint Deliverable:
```
v24.0.0:
  ai-integration/08 — AI Agents & Autonomous Workflows
  ai-integration/09 — Multi-Modal AI
  ai-integration/10 — AI Cost Optimization & Token Economics
  agentic-engineering/08 — Agent-to-Agent Protocols
  agentic-engineering/09 — Agent Economics & Marketplaces
  → 5 new courses, 204 total
  → index.json + meta files updated
```

---

## 📁 Key Files for Implementation

| File | Purpose |
|------|---------|
| `AGENTS.md` | Agent guide — conventions for adding courses/faculties |
| `CONTRIBUTING.md` | Course template + faculty creation checklist |
| `index.json` | Auto-router: add trigger_keywords + faculty entries for ALL new content |
| `campus-core.js` | Add emoji for new faculties + update function maps |
| `mcp-server.js` | Phase B: add 5 new tool handlers |
| `CAMPUS-OVERVIEW.md` | Update cross-faculty task paths with new courses |
| `package.json` | Update version + files array |

---

*ICIL v2 — from knowledge base to intelligent learning platform.* 🔥
