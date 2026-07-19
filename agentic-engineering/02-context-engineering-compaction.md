# 🤖 02 — Context Engineering: Compaction & Recall

> 🟡 Intermediate | Prereq: 01 | ~9 min

**Context engineering** = treating the context window as a *finite attention budget*, not an infinite dump. The #1 cause of agent failure in 2026 isn't bad prompts — it's context rot: too much stale, redundant, or irrelevant information degrading the model's reasoning.

---

## 2.1 The Attention Budget Model

```
CONTEXT WINDOW (e.g., 200K tokens)
┌────────────────────────────────────────────────┐
│ System prompt + tools        │  ~5K   FIXED     │
│ Ambient rules (AGENTS.md)    │  ~2K   FIXED     │
│ Task instructions            │  ~1K   FIXED     │
├────────────────────────────────────────────────┤
│ Retrieved knowledge (RAG)    │  ~10K  DYNAMIC   │
│ Tool results (growing!)      │  ~50K+ DYNAMIC   │  ← the rot zone
│ Conversation history         │  ~20K  GROWING   │
├────────────────────────────────────────────────┤
│ FREE SPACE FOR REASONING     │  ~112K           │  ← model needs room to think
└────────────────────────────────────────────────┘
```

> **Anthropic's principle:** Fill the context with *just the right information for the next step* — not everything that might be relevant.

## 2.2 Four Compaction Strategies

| Strategy | What | When | Lossy? |
|-----------|------|------|--------|
| **Pruning** | Drop old/processed tool results | After extracting key facts | No (if facts saved) |
| **Summarization** | Compress N messages → 1 summary | Long conversations | Yes (lossy) |
| **External memory** | Write state to file/DB, drop from context | Persistent facts, scratchpad | No |
| **Sub-agent isolation** | Delegate subtask to agent with own context | Deep research, heavy tool use | No (parent gets summary) |

## 2.3 Just-in-Time (JIT) Context Loading

Instead of loading all knowledge upfront, agents should **hold references** (file paths, DB IDs, URLs) and fetch on demand — like humans don't memorize an encyclopedia, they know *where to look*.

```ts
// ❌ BAD: Load everything into context at start
const allDocs = loadAllDocs(); // 50K tokens upfront
const answer = await llm.complete(`${allDocs}\n\nQuestion: ${q}`);

// ✅ GOOD: JIT — agent fetches only what it needs
const tools = [{
  name: "read_doc",
  description: "Read a specific doc by path. Call only when you need its content.",
  parameters: { path: { type: "string" } }
}, {
  name: "search_docs",
  description: "Search doc titles/summaries. Returns paths + 1-line summaries only.",
  parameters: { query: { type: "string" } }
}];
// Agent calls search_docs → gets paths → calls read_doc on the 1-2 relevant ones
```

## 2.4 Structured Scratchpad Pattern

Keep agent working state **outside** the message history — in a structured file the agent reads/writes:

```ts
// scratchpad.md — agent maintains this across steps
`
## Current Task
Fix the flaky login test in auth.test.ts

## Findings So Far
- Test fails intermittently on CI but passes locally
- Root cause: race condition — DB connection not awaited (line 42)
- Fix attempted: added await to getConnection()

## TODO
- [x] Identify root cause
- [x] Apply fix
- [ ] Run test 10x to verify
- [ ] Check for similar patterns in other tests
```

> **Why?** The scratchpad is stable, cheap to reload, and survives context compaction. The conversation history can be pruned aggressively without losing progress.

## 2.5 Compaction Trigger Heuristics

```ts
function shouldCompact(messages: Message[], tokenCount: number): boolean {
  return (
    tokenCount > MAX_CONTEXT * 0.7 ||           // approaching limit
    messages.length > 50 ||                      // too many turns
    hasProcessedToolResultsOlderThan(messages, 10) // stale tool data
  );
}

async function compact(messages: Message[]): Promise<Message[]> {
  // 1. Extract hard facts → write to scratchpad
  const facts = await extractFacts(messages);
  await fs.writeFile("scratchpad.md", facts);

  // 2. Summarize old conversation
  const summary = await llm.complete(
    `Summarize key decisions and unresolved issues:\n${oldMessages}`
  );

  // 3. Return: [system, summary, recent messages]
  return [systemPrompt, { role: "system", content: summary }, ...recentMessages];
}
```

## 2.6 Anti-Patterns

- **Kitchen-sink context** — dumping entire codebase + all docs into context "just in case"
- **Never pruning** — tool results from step 2 still in context at step 20
- **State in chat history** — "remember that the user said X" → lost on compaction. Use external memory.
- **Over-summarizing** — aggressive compaction that drops the critical detail the agent needed

## 2.7 ICIL Cross-Ref

Builds on: `01` (runtimes — compaction is a runtime concern)
Related: `ai-integration/01` (prompt engineering — system prompt is the fixed budget), `ia/07` (semantic search for JIT retrieval)

## ⚡ Action Checklist

- [ ] Audit your agent's context: what % is fixed vs growing? Is tool-result bloat > 50%?
- [ ] Add a scratchpad file for multi-step task state — don't store progress in chat history
- [ ] Implement JIT loading: give agent search/read tools instead of pre-loading knowledge
- [ ] Set a compaction trigger at 70% context capacity — prune processed tool results
- [ ] Test: run a 20-step task, then inspect final context — is there rot?
