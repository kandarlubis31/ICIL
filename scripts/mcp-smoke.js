#!/usr/bin/env node

/**
 * mcp-smoke.js — End-to-end smoke test for the ICIL MCP server.
 *
 * Spawns mcp-server.js over stdio, performs the MCP initialize handshake,
 * lists the tools, and calls every one of the 10 tools with valid arguments.
 * Exits non-zero if any tool fails or the tool count changes.
 *
 * Usage: npm run mcp:smoke
 */

const { spawn } = require("child_process");
const path = require("path");
const readline = require("readline");

const ROOT = path.join(__dirname, "..");
const CALL_TIMEOUT_MS = 20000;

const cases = [
  ["search_campus", { prompt: "build an accessible landing page" }, "matchedFaculties"],
  ["load_course", { file: "aksesibilitas/04-keyboard-navigation-focus-management.md" }, "Keyboard Navigation"],
  ["list_faculties", {}, "\"includeCourses\": false"],
  [
    "list_faculties",
    { faculty: "security", includeCourses: true },
    "\"includeCourses\": true",
  ],
  ["search_across", { query: "zero trust", maxResults: 5 }, "totalMatches"],
  [
    "compare_courses",
    {
      courseA: "warna/06-color-accessibility.md",
      courseB: "aksesibilitas/01-wcag-foundations.md",
    },
    "comparison",
  ],
  ["get_campus_stats", {}, "totalCourses"],
  ["get_campus_stats", { includeFaculties: true }, "courseCount"],
  ["search_by_faculty", { faculty: "security", query: "XSS" }, "faculty"],
  ["get_course_prerequisites", { faculty: "security", courseId: "08" }, "course"],
  ["export_course", { files: ["warna/06-color-accessibility.md"], format: "markdown" }, "exportedCount"],
  ["recommend_learning_path", { goal: "build a web app from scratch", maxCourses: 5 }, "learningPath"],
];

const child = spawn(process.execPath, ["mcp-server.js"], {
  cwd: ROOT,
  stdio: ["pipe", "pipe", "pipe"],
});

const pending = new Map();
readline.createInterface({ input: child.stdout }).on("line", (line) => {
  if (!line.trim()) return;
  let message;
  try {
    message = JSON.parse(line);
  } catch {
    console.error("Unexpected non-JSON stdout:", line.slice(0, 200));
    return;
  }
  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message);
    pending.delete(message.id);
  }
});

child.stderr.on("data", (data) => {
  const text = data.toString().trim();
  if (text) console.error("MCP stderr:", text.slice(0, 300));
});

let nextId = 1;
function send(method, params) {
  const id = nextId++;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`Timeout waiting for ${method}`));
    }, CALL_TIMEOUT_MS);
    pending.set(id, (message) => {
      clearTimeout(timer);
      resolve(message);
    });
    child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id, method, params }) + "\n");
  });
}

(async () => {
  let failures = 0;

  try {
    const init = await send("initialize", {
      protocolVersion: "2024-11-05",
      capabilities: {},
      clientInfo: { name: "icil-smoke", version: "1.0.0" },
    });
    console.log(`initialize: ${init.result?.serverInfo?.name} (${init.result?.protocolVersion})`);
    child.stdin.write(
      JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }) + "\n"
    );

    const tools = await send("tools/list", {});
    const count = tools.result?.tools?.length || 0;
    console.log(`tools/list: ${count}`);
    if (count !== 10) {
      console.error(`FAIL expected 10 tools, got ${count}`);
      failures++;
    }

    for (const [name, args, expected] of cases) {
      const response = await send("tools/call", { name, arguments: args });
      const text = (response.result?.content || []).map((c) => c.text || "").join("");
      const isError = response.result?.isError === true;
      const ok = !response.error && !isError && text.includes(expected);
      if (!ok) failures++;
      console.log(
        `${ok ? "PASS" : "FAIL"} ${name} (${text.length} chars)`
      );
      if (!ok) console.error(text.slice(0, 300));
    }
  } catch (error) {
    console.error("SMOKE ERROR:", error.message);
    failures++;
  } finally {
    child.kill();
    console.log(failures === 0 ? "SMOKE PASSED (10/10 tools)" : `SMOKE FAILED (${failures})`);
    setTimeout(() => process.exit(failures === 0 ? 0 : 1), 300);
  }
})();
