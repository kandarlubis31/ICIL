#!/usr/bin/env node

/**
 * load-context.js — ICIL Auto-Router CLI
 *
 * Usage:
 *   node load-context.js "your prompt here"
 *   node load-context.js "your prompt here" --print       # print file contents
 *   node load-context.js "your prompt here" --json        # output as JSON
 *   node load-context.js --interactive                     # interactive mode
 *   node load-context.js --list                            # list all faculties
 *
 * The script reads index.json, scans the user prompt for trigger_keywords
 * (HIGH → MEDIUM → LOW priority), checks negative_keywords, and outputs
 * the relevant course file paths to load as AI agent context.
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const core = require("./campus-core");

const CAMPUS_ROOT = __dirname;

// ── ANSI Colors ──────────────────────────────────────────────
const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
  bgBlue: "\x1b[44m",
  bgGreen: "\x1b[42m",
};

// ── Print Results ────────────────────────────────────────────
function printResults(results, prompt, options = {}) {
  if (results.length === 0) {
    console.log(`${c.yellow}⚠ No matching faculties found for:${c.reset} "${prompt}"`);
    console.log(`${c.dim}Try rephrasing or use --list to see all faculties.${c.reset}`);
    return;
  }

  // ── JSON output ──
  if (options.json) {
    const output = {
      prompt,
      matchedFaculties: results.length,
      totalCourses: results.reduce((sum, r) => sum + r.courses.length, 0),
      results: results.map((r) => ({
        faculty: r.faculty,
        facultyName: r.facultyName,
        priority: r.priority,
        matchedKeywords: r.matchedKeywords,
        courses: r.courses.map((c) => ({
          id: c.id,
          title: c.title,
          level: c.level,
          file: c.file,
        })),
      })),
    };
    console.log(JSON.stringify(output, null, 2));
    return;
  }

  // ── Human-readable output ──
  const totalCourses = results.reduce((sum, r) => sum + r.courses.length, 0);

  console.log(`\n${c.bgBlue}${c.bold} ICIL — Auto-Router ${c.reset}\n`);
  console.log(`${c.dim}Prompt:${c.reset} "${prompt}"`);
  console.log(`${c.dim}Matched:${c.reset} ${results.length} faculty / ${totalCourses} courses\n`);
  console.log(`${"─".repeat(60)}\n`);

  for (const result of results) {
    const priorityColor =
      result.priority === "high"
        ? c.green
        : result.priority === "medium"
        ? c.yellow
        : c.gray;

    console.log(`${c.bold}${result.facultyName}${c.reset} ${c.dim}(${result.faculty})${c.reset}`);
    console.log(`  Priority: ${priorityColor}${result.priority.toUpperCase()}${c.reset}`);

    const allKeywords = [
      ...result.matchedKeywords.high,
      ...result.matchedKeywords.medium,
      ...result.matchedKeywords.low,
    ];
    if (allKeywords.length > 0) {
      console.log(`  Keywords: ${c.cyan}${allKeywords.join(", ")}${c.reset}`);
    }

    console.log(`  Courses:`);
    for (const course of result.courses) {
      const levelIcon =
        course.level === "beginner" ? "🟢" : course.level === "intermediate" ? "🟡" : "🔴";
      console.log(`    ${levelIcon} ${course.id} — ${course.title}`);
      console.log(`       ${c.dim}${course.file}${c.reset}`);

      if (options.print) {
        try {
          const content = fs.readFileSync(course.filepath, "utf-8");
          console.log(`       ${c.dim}--- content ---${c.reset}`);
          content.split("\n").forEach((line) => {
            console.log(`       ${line}`);
          });
          console.log(`       ${c.dim}--- end content ---${c.reset}\n`);
        } catch (err) {
          console.log(`       ${c.red}✗ Could not read file: ${err.message}${c.reset}`);
        }
      }
    }
    console.log("");
  }

  if (!options.print) {
    console.log(`${"─".repeat(60)}`);
    console.log(`${c.bold}Load these files as context:${c.reset}\n`);
    for (const result of results) {
      for (const course of result.courses) {
        console.log(`  ${c.green}[load ${course.file}]${c.reset}`);
      }
    }
    console.log("");
  }
}

// ── List All Faculties ───────────────────────────────────────
function listFaculties(index) {
  console.log(`\n${c.bgBlue}${c.bold} ICIL — All Faculties ${c.reset}\n`);
  console.log(`${"─".repeat(60)}\n`);

  const facultiesData = core.listFacultiesData(index);

  for (const faculty of facultiesData) {
    console.log(`${faculty.emoji} ${c.bold}${faculty.name}${c.reset} ${c.dim}(${faculty.slug}/)${c.reset}`);
    console.log(`   ${faculty.courseCount} courses | ${faculty.level} | ${faculty.description}`);

    for (const course of faculty.courses) {
      const levelIcon =
        course.level === "beginner" ? "🟢" : course.level === "intermediate" ? "🟡" : "🔴";
      console.log(`   ${levelIcon} ${course.id}: ${course.title}`);
    }
    console.log("");
  }

  console.log(`${c.dim}Total: ${index.totalCourses} courses across ${Object.keys(index.faculties).length} faculties${c.reset}`);
  console.log(`${c.dim}Version: ${index.version}${c.reset}\n`);
}

// ── Interactive Mode ─────────────────────────────────────────
async function interactiveMode(index) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(`\n${c.bgBlue}${c.bold} ICIL — Interactive Mode ${c.reset}`);
  console.log(`${c.dim}Type a prompt to find relevant courses. Type 'exit' to quit.\n${c.reset}`);

  const ask = () => {
    rl.question(`${c.cyan}>${c.reset} `, (prompt) => {
      if (prompt.trim().toLowerCase() === "exit" || prompt.trim().toLowerCase() === "quit") {
        rl.close();
        console.log(`\n${c.dim}Goodbye! 🚀${c.reset}\n`);
        return;
      }

      if (prompt.trim() === "list") {
        listFaculties(index);
        ask();
        return;
      }

      if (prompt.trim().length < 3) {
        console.log(`${c.yellow}⚠ Prompt too short. Try something like "dark mode accessibility"${c.reset}\n`);
        ask();
        return;
      }

      const results = core.matchKeywords(index, prompt);
      printResults(results, prompt);
      console.log("");
      ask();
    });
  };

  ask();
}

// ── Print Help ───────────────────────────────────────────────
function printHelp(index) {
  console.log(`
${c.bold}ICIL — Auto-Router CLI${c.reset} ${c.dim}v${index.version}${c.reset}

${c.bold}Usage:${c.reset}
  ${c.cyan}node load-context.js${c.reset} "your prompt"           Match prompt & show courses
  ${c.cyan}node load-context.js${c.reset} "your prompt" ${c.dim}--print${c.reset}     Print file contents
  ${c.cyan}node load-context.js${c.reset} "your prompt" ${c.dim}--json${c.reset}      Output as JSON
  ${c.cyan}node load-context.js${c.reset} ${c.dim}--interactive${c.reset}              Interactive mode
  ${c.cyan}node load-context.js${c.reset} ${c.dim}--list${c.reset}                     List all faculties
  ${c.cyan}node load-context.js${c.reset} ${c.dim}--help${c.reset}                     Show this help

${c.bold}Examples:${c.reset}
  ${c.dim}node load-context.js "bikin landing page yang mewah dan elegan"${c.reset}
  ${c.dim}node load-context.js "make accessible forms for screen readers"${c.reset}
  ${c.dim}node load-context.js "brand identity for tech startup"${c.reset}
  ${c.dim}node load-context.js "dark mode yang bagus"${c.reset}

${c.dim}Campus: ${index.totalCourses} courses | ${Object.keys(index.faculties).length} faculties | v${index.version}${c.reset}
`);
}

// ── Main ─────────────────────────────────────────────────────
function main() {
  const index = core.loadIndex();
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    printHelp(index);
    return;
  }

  if (args.includes("--list")) {
    listFaculties(index);
    return;
  }

  if (args.includes("--interactive") || args.includes("-i")) {
    interactiveMode(index);
    return;
  }

  const flags = args.filter((a) => a.startsWith("--"));
  const promptArgs = args.filter((a) => !a.startsWith("--"));
  const prompt = promptArgs.join(" ");

  if (!prompt) {
    console.error(`${c.red}✗ No prompt provided. Use --help for usage.${c.reset}`);
    process.exit(1);
  }

  const options = {
    print: flags.includes("--print"),
    json: flags.includes("--json"),
  };

  const results = core.matchKeywords(index, prompt);
  printResults(results, prompt, options);
}

main();
