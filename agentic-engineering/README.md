# 🤖 Faculty of Agentic Engineering & Orchestration

> **9 Courses** | Beginner → Advanced | Domain: Production agent systems, orchestration, observability, safety, lifecycle, protocols, economics

The **operational layer** for autonomous AI agents. While `ai-integration/` teaches how to *build* single-agent systems (prompts, RAG, orchestration, eval, safety, MCP), this faculty teaches how to *run agents in production*: durable runtimes, context engineering at scale, multi-agent coordination, agent observability, cost engineering, action-safety sandboxing, and full lifecycle management.

**Distinction from `ai-integration/`:**
- `ai-integration/04` (LLM Orchestration) → single-agent loop patterns (chain, router, ReAct)
- `agentic-engineering/01` (Runtimes) → durable state machines, control planes, HITL gates
- `ai-integration/05` (LLM Eval) → single-call evaluation (accuracy, hallucination)
- `agentic-engineering/04` (Observability) → multi-step trajectory tracing, CI eval gates
- `ai-integration/06` (AI Safety) → output safety (toxicity, prompt injection defense)
- `agentic-engineering/06` (Agent Safety) → action safety (tool scoping, sandboxing, HITL)

---

## 📋 Course List

| ID | Course | Level | Prereq |
|----|--------|-------|--------|
| 01 | [Agentic Runtimes & Control Planes](./01-agentic-runtimes-control-planes.md) | 🟢 | — |
| 02 | [Context Engineering: Compaction & Recall](./02-context-engineering-compaction.md) | 🟡 | 01 |
| 03 | [Multi-Agent Coordination Patterns](./03-multi-agent-coordination.md) | 🟡 | 01 |
| 04 | [Agent Observability & Evaluation](./04-agent-observability-evaluation.md) | 🔴 | 01 |
| 05 | [Cost-Aware Planning & Economic Engineering](./05-cost-aware-planning.md) | 🔴 | 01, 04 |
| 06 | [Agent Safety, Sandboxing & Tool Guardrails](./06-agent-safety-sandboxing.md) | 🔴 | 01, 04 |
| 07 | [Agent Productionization & Lifecycle](./07-agent-productionization-lifecycle.md) | 🔴 | 01, 04, 06 |
| 08 | [Agent-to-Agent Protocols & Interoperability](./08-agent-to-agent-protocols.md) | 🔴 | 01, 03 |
| 09 | [Agent Economics & Marketplace Patterns](./09-agent-economics-marketplace.md) | 🔴 | 01, 05, 08 |

---

## 🎯 Learning Paths

| Path | Courses | For |
|------|---------|-----|
| **Agent Builder** | 01 → 02 → 03 | Building your first production agent system |
| **Platform Engineer** | 01 → 04 → 05 → 07 | Running agents at scale (observability, cost, lifecycle) |
| **Safety Engineer** | 01 → 06 → 07 | Agent safety, sandboxing, and production readiness |
| **Agent Product Manager** | 01 → 05 → 08 → 09 | Protocols, economics, marketplace strategy |
| **Full Lifecycle** | 01 → 02 → 03 → 04 → 05 → 06 → 07 → 08 → 09 | End-to-end agentic engineering |

---

## 🔗 Cross-Faculty Links

| Related Faculty | Why |
|-----------------|-----|
| `ai-integration/04` | LLM orchestration (single-agent patterns — foundation for this faculty) |
| `ai-integration/05` | LLM evaluation (single-call — this faculty extends to multi-step trajectories) |
| `ai-integration/06` | AI safety (output-side — this faculty covers action-side safety) |
| `ai-integration/07` | MCP tool integration (tool design — this faculty covers tool *scoping* and *guardrails*) |
| `service-design/05` | AI-human handoff (same handoff patterns apply agent-to-agent) |
| `software-engineering/02` | Software architecture (agent runtimes are a distributed systems problem) |
| `devops-infra/03` | CI/CD pipelines (agent regression testing) |
| `testing-qa/06` | CI/CD test automation (behavioral regression gates) |
| `security/02` | Auth & authorization (non-human agent identity) |
| `security/06` | AI security (prompt injection — this faculty extends to tool poisoning) |
| `performance/06` | Load testing & profiling (agent cost profiling) |

---

## 📊 Keywords

`agentic`, `agent runtime`, `control plane`, `state machine`, `durable execution`, `context engineering`, `context compaction`, `attention budget`, `just-in-time context`, `scratchpad`, `multi-agent`, `supervisor worker`, `agent handoff`, `agent observability`, `tracing`, `agent eval`, `trajectory evaluation`, `cost-aware planning`, `model routing`, `token budget`, `agent sandboxing`, `tool scoping`, `HITL`, `human in the loop`, `tool poisoning`, `agent identity`, `agent lifecycle`, `agent versioning`, `canary deployment`, `behavioral regression`, `A2A`, `agent-to-agent`, `agent protocol`, `agent discovery`, `agent card`, `Google A2A`, `agent marketplace`, `agent pricing`, `AaaS`, `agent SLA`, `agent reputation`, `LangGraph`, `LangSmith`, `Langfuse`, `E2B`, `CrewAI`, `AutoGen`
