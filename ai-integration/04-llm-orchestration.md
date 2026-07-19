# 🤖 04 — LLM Orchestration

> 🟡 Intermediate | Prereq: 01 | ~9 min

LLM orchestration = chaining multiple LLM calls, tool invocations, and decisions into coherent workflows. The difference between a single prompt and an autonomous agent.

---

## 4.1 Orchestration Patterns

| Pattern | What | When |
|---------|------|------|
| **Chain** | Sequential calls, output→input | Step-by-step processing |
| **Router** | Classify intent → delegate | Multi-purpose agents |
| **Agent + Tools** | LLM decides which tool to call | Database queries, API calls |
| **ReAct** | Reason → Act → Observe → Repeat | Complex problem-solving |
| **Parallel** | Multiple independent calls | Speed, multi-perspective |

## 4.2 Function Calling (Tool Use)

```ts
const tools = [{
  name: 'search_database',
  description: 'Search the product database by name or category',
  parameters: {
    type: 'object',
    properties: {
      query: { type: 'string', description: 'Search term' },
      category: { type: 'string', enum: ['electronics', 'books', 'clothing'] }
    },
    required: ['query']
  }
}];

async function agentWithTools(userQuery: string) {
  const response = await llm.complete({
    messages: [{ role: 'user', content: userQuery }],
    tools,
    tool_choice: 'auto'  // LLM decides if tool needed
  });

  if (response.tool_calls) {
    for (const call of response.tool_calls) {
      const result = await executeTool(call.name, call.arguments);
      // Feed result back to LLM for final answer
      return await llm.complete({
        messages: [
          { role: 'user', content: userQuery },
          { role: 'assistant', tool_calls: response.tool_calls },
          { role: 'tool', content: JSON.stringify(result), tool_call_id: call.id }
        ]
      });
    }
  }
  
  return response.content;
}
```

## 4.3 ReAct Loop

```ts
async function reactLoop(task: string, tools: Tool[], maxSteps = 5) {
  let context = task;
  for (let step = 0; step < maxSteps; step++) {
    const thought = await llm.complete(
      `Task: ${task}\nContext: ${context}\nThink step by step.`
    );
    
    if (thought.action === 'FINISH') return thought.finalAnswer;
    
    const observation = await executeTool(thought.action, thought.input);
    context += `\nAction: ${thought.action}\nResult: ${observation}`;
  }
  throw new Error('Max steps exceeded — agent stuck in loop');
}
```

## 4.4 Anti-Patterns

- **Infinite loops** — always set maxSteps; LLM can get stuck
- **Over-tooling** — 50 tools confuses the LLM; 5-10 well-designed tools > 50 mediocre
- **No fallback** — what happens when the tool call fails? Handle gracefully

## 4.5 ICIL Cross-Ref

Use with: `ai-integration/02` (RAG), `conversational-ui/02` (NLU)

## ⚡ Action Checklist
- [ ] Start with chain pattern; add tool use only when needed
- [ ] Every tool has a clear description + typed parameters
- [ ] Set maxSteps limit in agent loops (default 5)
- [ ] Handle tool call failures gracefully — give LLM error feedback
- [ ] Log every tool call for debugging (input, output, latency)
