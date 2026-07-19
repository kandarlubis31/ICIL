# 🤖 08 — AI Agents & Autonomous Workflows

> 🔴 Advanced | Prereq: 04, 07 | ~9 min

AI agents are the #1 pattern in 2026 — autonomous systems that plan, use tools, maintain memory, and execute multi-step workflows without human hand-holding. This course covers architectures beyond ReAct, planning strategies, memory management, and framework selection.

---

## 8.1 Agent Architecture Evolution

| Architecture | How It Works | Best For | Weakness |
|-------------|-------------|----------|----------|
| **ReAct** (2022) | Reason → Act → Observe → Repeat | Simple tool use, QA | Gets stuck in loops; no planning |
| **Plan-and-Execute** (2023) | Plan first → Execute each step → Replan if needed | Multi-step tasks, code gen | Plan may be wrong; replanning costs tokens |
| **Tree-of-Thought** (2023) | Explore multiple reasoning branches → pick best | Math, puzzles, optimization | Expensive; many parallel LLM calls |
| **Reflexion** (2023) | Act → Evaluate → Reflect → Retry with lessons | Bug fixing, self-improvement | Reflection quality depends on eval quality |
| **LLMCompiler** (2023) | Build DAG of parallelizable function calls → execute | Data pipelines, batch processing | Only works when subtasks are independent |
| **SWE-Agent** (2024) | Agent navigates codebase → edits files → runs tests | Autonomous coding, PR generation | File system context can overflow |

## 8.2 Agent Loop Anatomy

```ts
// Modern agent loop — Plan + Tool Use + Memory + Budget
interface AgentLoop {
  plan: (goal: string) => Promise<Task[]>;       // Decompose goal into tasks
  execute: (task: Task) => Promise<Result>;       // Run with tools, capture output
  evaluate: (result: Result) => number;            // Score 0-1; low → replan
  reflect: (results: Result[]) => Promise<string>; // Learn from mistakes
  remember: (key: string, value: any) => void;    // Store in long-term memory
}

async function autonomousAgent(goal: string, maxIterations = 10) {
  const memory = new AgentMemory();
  let tasks = await plan(goal);

  for (let i = 0; i < maxIterations; i++) {
    for (const task of tasks) {
      const result = await execute(task);
      const score = evaluate(result);

      if (score < 0.7) {
        // Low quality → reflect and retry with lessons learned
        const lesson = await reflect([result]);
        memory.store(`lesson:${task.id}`, lesson);
        tasks.unshift({ ...task, context: lesson }); // retry with reflection
      } else {
        memory.store(`result:${task.id}`, result);
      }
    }

    if (tasks.every(t => t.completed)) return memory.synthesize();
    tasks = await replan(goal, memory.getAll()); // adapt plan based on what's done
  }

  throw new Error('Agent exceeded max iterations — goal too complex or stuck');
}
```

## 8.3 Memory Architecture

| Memory Type | Stores | Lifetime | Example |
|-------------|--------|----------|---------|
| **Working** | Current conversation, active context | Single session | "The user asked for a React component" |
| **Short-term** | Recent interactions, tool outputs | 1-3 sessions | "Fixed the login bug yesterday using approach X" |
| **Long-term** | Facts, preferences, learned patterns | Indefinite | "This codebase uses PostgreSQL with Prisma ORM" |
| **Episodic** | Past experiences + outcomes | Indefinite | "When I tried direct DB migration it broke auth — use migration tool instead" |

```ts
// Agent memory with tiered retrieval
class AgentMemory {
  working = new Map<string, any>();     // session-scoped
  shortTerm = new LRUCache(100);        // last 100 items, session-persistent
  longTerm = new VectorStore();         // embedded, semantic retrieval
  episodic = new EpisodicStore();       // timestamped experience log

  async recall(query: string): Promise<MemoryEntry[]> {
    return [
      ...this.shortTerm.search(query),           // fast, recent
      ...await this.longTerm.similaritySearch(query, { topK: 5 }),
      ...await this.episodic.findSimilar(query),  // "what happened last time?"
    ];
  }
}
```

## 8.4 When to Use Agents vs Simple LLM Calls

```
Is the task a single question/command?
├── YES → Simple LLM call (cheaper, faster, less error-prone)
└── NO → Does it require multiple steps with dependencies?
    ├── NO → Chain pattern (sequential LLM calls)
    └── YES → Does each step need different tools or external data?
        ├── NO → Single agent with tools (ReAct loop)
        └── YES → Full agent with planning, memory, and tool orchestration
```

## 8.5 Framework Comparison (2026)

| Framework | Paradigm | Best For | Learning Curve | Ecosystem |
|-----------|----------|----------|---------------|-----------|
| **LangGraph** | State machine + graph | Complex multi-agent, production | 🔴 Steep | LangSmith, LangServe |
| **CrewAI** | Role-based agents | Quick multi-agent prototypes | 🟢 Easy | Limited observability |
| **AutoGen** | Conversational agents | Research, experimentation | 🟡 Medium | Microsoft ecosystem |
| **OpenAI Agents SDK** | Lightweight loop | Simple agents, OpenAI-only | 🟢 Easy | OpenAI platform |
| **Anthropic Tool Use** | Native function calling | Claude-based agents | 🟢 Easy | Claude ecosystem |
| **Dify** | No-code visual builder | Business workflows, RAG apps | 🟢 Easy | Self-hosted, visual |

## 8.6 Anti-Patterns

- **Agent for everything** — using an agent loop when a single LLM call or SQL query would work. Costs 10-100x more.
- **No max iterations** — agent loops forever on ambiguous tasks. Always set `maxSteps`.
- **Flat memory** — one giant context window with everything stuffed in. Use tiered memory with retrieval.
- **No tool timeout** — agent calls an API that hangs. Whole workflow freezes. Every tool needs a timeout.

## 8.7 ICIL Cross-Ref

Builds on: `ai-integration/04` (orchestration), `ai-integration/07` (MCP tools)
Related: `agentic-engineering/01` (runtimes), `agentic-engineering/02` (context engineering), `agentic-engineering/03` (multi-agent)
Distinction: This course = single-agent autonomy. `agentic-engineering/` = running agents in production at scale.

## ⚡ Action Checklist

- [ ] Start with ReAct; graduate to Plan-and-Execute only when tasks need explicit planning
- [ ] Implement tiered memory: working → short-term → long-term → episodic
- [ ] Always set `maxSteps` + per-tool timeout — agents MUST have termination guarantees
- [ ] Before building an agent, ask: "Can a single LLM call + a database query solve this?"
- [ ] Choose framework based on complexity: simple → OpenAI SDK, multi-agent → LangGraph, prototype → CrewAI
- [ ] Log every agent decision (plan, tool call, evaluation score) for debugging
