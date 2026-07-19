# 🤖 07 — MCP & Tool Integration

> 🔴 Advanced | Prereq: 04 | ~9 min

MCP (Model Context Protocol) standardizes how LLMs interact with external tools and data sources. Instead of custom integrations per model, MCP provides a universal interface — the USB-C of AI tool integration.

---

## 7.1 MCP Architecture

```
┌──────────┐     MCP Protocol     ┌──────────────┐
│   LLM    │◄────────────────────►│  MCP SERVER  │
│ (Claude) │    JSON-RPC 2.0      │              │
└──────────┘                      ├─ Tool: search │
                                  ├─ Tool: deploy │
                                  ├─ Resource: DB │
                                  └─ Resource: FS │
```

## 7.2 MCP Tool Definition

```ts
// mcp-server.js — exposing tools to AI agents
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: 'search_campus',
    description: 'Search ICIL campus for relevant design/engineering courses',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query for campus courses' }
      },
      required: ['query']
    }
  }, {
    name: 'load_course',
    description: 'Load full content of a specific course file',
    inputSchema: {
      type: 'object',
      properties: {
        faculty: { type: 'string', description: 'Faculty slug (e.g., warna, layout)' },
        courseId: { type: 'string', description: 'Course ID (e.g., 01, 02)' }
      },
      required: ['faculty', 'courseId']
    }
  }]
}));

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  switch (name) {
    case 'search_campus':
      const results = searchCampus(args.query);
      return { content: [{ type: 'text', text: JSON.stringify(results) }] };
    
    case 'load_course':
      const course = getCourseContent(`${args.faculty}/${args.courseId}`);
      return { content: [{ type: 'text', text: course }] };
  }
});
```

## 7.3 Building Custom MCP Tools

```ts
// Pattern: every tool follows this structure
const toolTemplate = {
  name: 'descriptive_name',          // snake_case, verb_noun
  description: 'What and when to use', // LLM uses this to decide
  inputSchema: {                      // JSON Schema for validation
    type: 'object',
    properties: { /* typed params */ },
    required: ['essential_params']
  },
  handler: async (args) => {          // Actual implementation
    // 1. Validate input
    // 2. Execute business logic
    // 3. Return structured result
  }
};
```

## 7.4 When to Use MCP vs Direct API

```
MCP:                              Direct API:
  → Multi-model support              → Single model only
  → Standardized tool interface      → Custom integration needed
  → AI agent discovers tools         → Pre-defined workflow
  → Human-in-the-loop possible       → Fully automated
```

## 7.5 Anti-Patterns

- **Too many tools** — > 20 tools confuses LLMs; group related functionality
- **Vague descriptions** — LLM decides based on description; be precise
- **No error handling** — tool failures should return structured errors, not crash

## 7.6 ICIL Cross-Ref

Use with: `ai-integration/04` (orchestration), `service-design/05` (handoff patterns)

## ⚡ Action Checklist
- [ ] Every tool: clear name + description + typed input schema
- [ ] Tool count: 5-15 max (group related functionality)
- [ ] Return structured errors: `{ error: string, suggestion: string }`
- [ ] Test tool with 10+ varied inputs before exposing to LLM
- [ ] Log every tool call: timestamp, input, output, duration
