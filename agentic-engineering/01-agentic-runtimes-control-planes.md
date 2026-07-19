# 🤖 01 — Agentic Runtimes & Control Planes

> 🟢 Beginner | Prereq: — | ~9 min

An **agentic runtime** is the control plane that governs how an autonomous AI agent executes: state management, tool dispatch, loop control, human-in-the-loop gates, and termination. Without a runtime, an "agent" is just a prompt in a `while` loop — which breaks in production.

---

## 1.1 From Prompt Loop to Runtime

```
NAIVE (breaks in prod):          RUNTIME (production-grade):
┌──────────────┐                 ┌──────────────────────────┐
│ while true:  │                 │  ┌─────────────────────┐ │
│   call LLM   │                 │  │  STATE MACHINE       │ │
│   if done:   │                 │  │  (durable, resumed)  │ │
│     break    │                 │  └──────────┬──────────┘ │
└──────────────┘                 │  ┌──────────▼──────────┐ │
                                 │  │  TOOL DISPATCHER     │ │
                                 │  │  (scoped, sandboxed) │ │
                                 │  └──────────┬──────────┘ │
                                 │  ┌──────────▼──────────┐ │
                                 │  │  HITL / BUDGET GATE  │ │
                                 │  └─────────────────────┘ │
                                 └──────────────────────────┘
```

## 1.2 Core Runtime Primitives

| Primitive | Purpose | Example |
|-----------|---------|---------|
| **State graph** | Define nodes (steps) + edges (transitions) | LangGraph `StateGraph` |
| **Durable execution** | Survive crashes; resume from checkpoint | Temporal, Restate, DB checkpoint |
| **Tool dispatcher** | Route LLM tool-calls to scoped handlers | MCP server, function registry |
| **Budget gate** | Cap tokens / cost / steps before runaway | `maxSteps`, `maxTokens`, `costCap` |
| **HITL interrupt** | Pause for human approval on risky actions | `interrupt_before: ["deploy"]` |
| **Checkpoint store** | Persist state between steps | Postgres, Redis, SQLite |

## 1.3 State Machine Pattern (LangGraph-style)

```ts
import { StateGraph, END } from "@langchain/langgraph";

const graph = new StateGraph({
  // Define the state schema
  channels: {
    messages: { reducer: (a, b) => [...a, ...b], default: () => [] },
    toolResults: { reducer: (a, b) => [...a, ...b], default: () => [] },
    stepCount: { default: () => 0 },
  },
});

graph.addNode("plan",   planNode);      // LLM plans the approach
graph.addNode("execute", executeNode);   // Call tools
graph.addNode("review",  reviewNode);    // Check results / safety

graph.addEdge("plan", "execute");
graph.addConditionalEdges("execute", (state) =>
  state.stepCount >= 10 ? "review" : "execute"  // budget gate
);
graph.addEdge("review", END);

// Compile with checkpointing for durability
const app = graph.compile({
  checkpointSaver: postgresSaver,   // resume after crash
  interruptBefore: ["execute"],     // HITL gate
});
```

## 1.4 Durable vs Ephemeral Execution

| | Ephemeral | Durable |
|---|-----------|---------|
| **Survives crash?** | ❌ Restarts from zero | ✅ Resumes from last checkpoint |
| **Cost** | Low overhead | Checkpoint write per step |
| **Best for** | Sub-second tasks, chat | Multi-minute workflows, batch agents |
| **Tools** | In-memory state | Temporal, Restate, LangGraph+DB |

> **Rule of thumb:** If a task takes > 30 seconds or calls > 5 tools → use durable execution. Crashes mid-run otherwise waste real money.

## 1.5 Anti-Patterns

- **No budget cap** — agent loops forever burning tokens. Always set `maxSteps` + `costCap`.
- **Stateful in prompt** — storing progress inside the LLM message history instead of structured state. Fragile, lossy, expensive.
- **No checkpoint** — 10-minute agent crashes at minute 8 → restart from zero.
- **God-node** — one node does everything (plan + execute + review). Split for observability.

## 1.6 ICIL Cross-Ref

Builds on: `ai-integration/04` (LLM orchestration — single-agent patterns)
Next: `02` (context engineering), `03` (multi-agent coordination)

## ⚡ Action Checklist

- [ ] Define your agent as a state graph, not a `while` loop
- [ ] Set hard budget: `maxSteps`, `maxTokens`, or `costCap` — pick at least one
- [ ] Add checkpoint persistence if any step takes > 30s
- [ ] Add HITL `interrupt_before` on any node that calls irreversible tools (deploy, send email, delete)
- [ ] Separate plan → execute → review nodes for observability
