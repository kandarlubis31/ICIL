# 🤖 03 — Multi-Agent Coordination Patterns

> 🟡 Intermediate | Prereq: 01 | ~9 min

When one agent can't handle a complex task, you compose multiple specialized agents. But multi-agent systems introduce new failure modes: **delegation drift**, **context desync**, and **runaway cost**. Pick the right topology for the job.

---

## 3.1 Coordination Topologies

| Pattern | Structure | Best For | Risk |
|---------|-----------|----------|------|
| **Supervisor/Worker** | 1 manager delegates to N workers | Parallelizable subtasks | Manager becomes bottleneck |
| **Hierarchical** | Tree of managers + workers | Large org-like decomposition | Delegation drift at depth > 3 |
| **Peer/Swarm** | Agents talk to each other directly | Debate, refinement, consensus | No termination logic → loops |
| **Pipeline** | A → B → C sequential | Stage-based processing | Bottleneck at slowest stage |
| **Router** | 1 classifier → dispatches to specialist | Multi-intent support | Misclassification cascades |

```
SUPERVISOR           HIERARCHICAL          PEER/SWARM
  ┌─────┐              ┌─────┐            ┌───┐ ┌───┐ ┌───┐
  │ MGR │              │ MGR │            │ A │◄┤ B │◄┤ C │
  └──┬──┘              └──┬──┘            └─┬─┘ └───┘ └─┬─┘
   ┌┴┐ ┌┴┐            ┌──┴──┐              └──────┴─────┘
   W₁ W₂ W₃          MGR   MGR            (all talk to all)
                     ┌┴┐   ┌┴┐
                     W₁ W₂ W₃ W₄
```

## 3.2 Supervisor/Worker Pattern

```ts
async function supervisor(task: string, workers: Record<string, Agent>) {
  const plan = await llm.complete(
    `Break this task into subtasks. Assign each to a worker.
     Available workers: ${Object.keys(workers).join(", ")}
     Task: ${task}
     Output JSON: [{ subtask: string, worker: string }]`
  );

  const subtasks = JSON.parse(plan);
  const results = await Promise.all(
    subtasks.map(({ subtask, worker }) =>
      workers[worker].run(subtask)  // isolated context per worker
    )
  );

  // Supervisor synthesizes — gets only summaries, not raw worker context
  return await llm.complete(
    `Synthesize these worker outputs into a final answer:\n${results.join("\n\n")}`
  );
}
```

> **Key:** Workers run with **isolated contexts**. The supervisor only receives their *summaries*, not their full message histories. This is sub-agent isolation — prevents context rot from propagating.

## 3.3 When to Go Multi-Agent (Decision Tree)

```
Is the task decomposable into independent subtasks?
├── NO → Single agent with tools (see course 01)
└── YES → Do subtasks need different expertise/tools?
    ├── NO → Single agent, parallel tool calls
    └── YES → Will total context exceed one window?
        ├── NO → Single agent, sequential sub-prompting
        └── YES → ✅ Multi-agent. Pick topology:
                   ├── Parallel subtasks → Supervisor/Worker
                   ├── Deep decomposition → Hierarchical
                   ├── Need debate/consensus → Peer/Swarm
                   └── Stage-based → Pipeline
```

## 3.4 Handoff Protocol

When agents pass control, they exchange a **structured handoff message** — not raw context:

```ts
interface Handoff {
  from: string;           // agent name
  to: string;             // agent name
  taskSummary: string;    // what was asked
  workDone: string;       // what's completed
  openQuestions: string[];// unresolved items
  artifacts: string[];    // file paths / URLs produced
  // NOTE: no raw message history — receiver starts fresh
}

// LangGraph handoff pattern
graph.addNode("researcher", researcherNode);
graph.addNode("writer", writerNode);
graph.addEdge("researcher", "writer");  // automatic handoff
// researcher's final state → writer's initial state (mapped, not copied)
```

## 3.5 Termination & Loop Prevention

| Risk | Fix |
|------|-----|
| **Infinite debate** (A↔B forever) | Set `maxRounds` + convergence check (delta < threshold) |
| **Delegation ping-pong** (A→B→A→B) | Track delegation history; reject re-delegation to same agent |
| **Worker never finishes** | Per-worker `maxSteps` + timeout |
| **No global budget** | Shared `totalCost` counter across all agents |

```ts
const state = {
  delegations: [],      // track who-delegated-to-whom
  totalCost: 0,         // shared budget
  maxTotalCost: 5.00,   // $5 hard cap
};

function canDelegate(from: string, to: string): boolean {
  // Prevent immediate re-delegation ping-pong
  const last = state.delegations.slice(-2);
  if (last.length === 2 && last[0].from === to && last[1].from === from) {
    return false; // A→B→A detected, block
  }
  return state.totalCost < state.maxTotalCost;
}
```

## 3.6 Anti-Patterns

- **Premature multi-agent** — using 5 agents when 1 agent + 5 tools works better and costs less
- **Shared context** — all agents reading/writing the same message history → chaos + rot
- **No handoff schema** — agents pass free-text → receiver misunderstands task state
- **Deep hierarchies** — manager→manager→manager→worker. Drift compounds at each level. Cap depth at 2-3.
- **No global budget** — 10 agents each with $1 budget = $10 surprise bill

## 3.7 ICIL Cross-Ref

Builds on: `01` (runtimes — multi-agent is a runtime topology)
Related: `ai-integration/04` (single-agent orchestration), `service-design/05` (AI-human handoff — same handoff principles apply agent-to-agent)

## ⚡ Action Checklist

- [ ] Use the decision tree — confirm you actually need multi-agent before building it
- [ ] Each worker gets **isolated context** — never share raw message histories
- [ ] Define a `Handoff` schema — structured task state, not free-text
- [ ] Set a **global budget** (cost or steps) shared across all agents
- [ ] Add delegation history tracking to prevent ping-pong loops
- [ ] Cap hierarchy depth at 2-3 levels to prevent delegation drift
