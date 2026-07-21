/**
 * eval-generator.js — ICIL Eval Prompt Generator
 *
 * Usage: node eval/eval-generator.js [--count=10] [--source=claude|gpt|mixed] [--output=file.json]
 *
 * Reads index.json trigger_keywords and generates synthetic prompts
 * for each faculty to expand the eval set. Ensures balanced distribution
 * (default 10 prompts per faculty).
 *
 * Output is a JSON array of prompt objects ready to merge into eval-prompts.json.
 */

const fs = require("fs");
const path = require("path");

const INDEX_FILE = path.join(__dirname, "..", "index.json");
const DEFAULT_COUNT = 10;

// ── CLI Args ──────────────────────────────────────────────────
const args = process.argv.slice(2);
const countArg = args.find((a) => a.startsWith("--count="));
const PROMPTS_PER_FACULTY = countArg ? parseInt(countArg.split("=")[1], 10) : DEFAULT_COUNT;
const sourceArg = args.find((a) => a.startsWith("--source="));
const SOURCE_MODE = sourceArg ? sourceArg.split("=")[1] : "mixed";
const outputArg = args.find((a) => a.startsWith("--output="));
const OUTPUT_FILE = outputArg ? outputArg.split("=")[1] : null;

// ── Prompt Templates ───────────────────────────────────────────

/**
 * Template library for generating diverse prompts.
 * Each template is a function(keyword, facultyContext) → prompt string.
 * Organized by "style": claude-style (verbose, thorough) vs gpt-style (terse, direct).
 */

const CLAUDE_TEMPLATES = [
  // Thorough, context-rich, often asks for methodology
  (kw, ctx) =>
    `I'm working on ${ctx.domain} and need a comprehensive guide on ${kw}. Can you walk me through best practices, common pitfalls, and the underlying principles?`,
  (kw, ctx) =>
    `Can you provide a detailed explanation of ${kw} in the context of ${ctx.domain}? I'd like to understand the theory before jumping into implementation.`,
  (kw, ctx) =>
    `I'm building ${ctx.project} and want to deeply understand ${kw}. What are the key frameworks, mental models, and evidence-based approaches I should know?`,
  (kw, ctx) =>
    `How should I think about ${kw} when designing ${ctx.artifact}? Walk me through your reasoning step by step.`,
  (kw, ctx) =>
    `What's the current best practice for ${kw}? I want both the theoretical foundation and practical implementation guidance.`,
];

const GPT_TEMPLATES = [
  // Direct, task-oriented, often asks for code/examples
  (kw, ctx) => `How to implement ${kw} for ${ctx.artifact}? Give me concrete examples.`,
  (kw, ctx) => `Best approach for ${kw} in ${ctx.domain}? Show me the code.`,
  (kw, ctx) => `Explain ${kw} with practical examples for ${ctx.project}.`,
  (kw, ctx) => `What's the optimal way to handle ${kw}? Be specific.`,
  (kw, ctx) => `Quick guide: ${kw} — what works and what doesn't?`,
];

// ── Faculty-specific context for richer prompts ─────────────────
const FACULTY_CONTEXT = {
  warna: {
    domain: "UI color systems and design",
    project: "a design system",
    artifact: "a color palette",
  },
  "ux-psikologi": {
    domain: "user psychology and behavior",
    project: "a high-conversion SaaS product",
    artifact: "a user flow",
  },
  "ux-writing": {
    domain: "UI content design",
    project: "a SaaS onboarding flow",
    artifact: "interface copy",
  },
  tipografi: {
    domain: "web typography and readability",
    project: "a content-heavy web app",
    artifact: "a type system",
  },
  layout: {
    domain: "responsive web layout",
    project: "a complex dashboard",
    artifact: "a page layout",
  },
  "design-patterns": {
    domain: "UI design patterns",
    project: "a component library",
    artifact: "a reusable component",
  },
  animasi: {
    domain: "UI animation and motion design",
    project: "a polished web app",
    artifact: "UI transitions",
  },
  branding: {
    domain: "brand identity design",
    project: "a startup rebrand",
    artifact: "a brand identity",
  },
  aksesibilitas: {
    domain: "web accessibility",
    project: "a public-facing government site",
    artifact: "an accessible interface",
  },
  improvement: {
    domain: "UI/UX improvement and auditing",
    project: "a legacy product redesign",
    artifact: "a UX audit report",
  },
  kognisi: {
    domain: "cognitive science applied to design",
    project: "a decision-heavy application",
    artifact: "a cognitive-friendly interface",
  },
  "mobile-ux": {
    domain: "mobile user experience",
    project: "a mobile-first app",
    artifact: "a mobile interface",
  },
  "data-viz": {
    domain: "data visualization",
    project: "an analytics dashboard",
    artifact: "a data visualization",
  },
  "conversational-ui": {
    domain: "conversational interfaces and chatbots",
    project: "a customer service chatbot",
    artifact: "a conversational flow",
  },
  "strategic-design": {
    domain: "product strategy and design thinking",
    project: "a new product initiative",
    artifact: "a product strategy",
  },
  "design-systems": {
    domain: "design system architecture",
    project: "an enterprise design system",
    artifact: "a design system",
  },
  "service-design": {
    domain: "service design and blueprinting",
    project: "a multi-channel service",
    artifact: "a service blueprint",
  },
  "software-engineering": {
    domain: "software engineering practices",
    project: "a production backend system",
    artifact: "a REST API",
  },
  "devops-infra": {
    domain: "DevOps and infrastructure",
    project: "a cloud-native platform",
    artifact: "a deployment pipeline",
  },
  "database-management": {
    domain: "database design and optimization",
    project: "a high-traffic application",
    artifact: "a database schema",
  },
  "ai-integration": {
    domain: "AI and LLM integration",
    project: "an AI-powered product",
    artifact: "an AI pipeline",
  },
  security: {
    domain: "application security",
    project: "a fintech application",
    artifact: "a secure API",
  },
  performance: {
    domain: "web application performance",
    project: "a performance-critical web app",
    artifact: "a web page",
  },
  "testing-qa": {
    domain: "software testing and quality",
    project: "a mission-critical application",
    artifact: "a test suite",
  },
  dx: {
    domain: "developer experience",
    project: "a developer tool",
    artifact: "a CLI tool",
  },
  ia: {
    domain: "information architecture",
    project: "a large-scale website",
    artifact: "an information architecture",
  },
};

// ── Prompt Generation ──────────────────────────────────────────

function generatePrompts(facultySlug, triggerKeywords, targetCount, sourceMode) {
  const ctx = FACULTY_CONTEXT[facultySlug] || {
    domain: facultySlug,
    project: "a project",
    artifact: "a product",
  };

  const prompts = [];
  const seen = new Set();
  let idCounter = 0;
  let sourceToggle = false;

  // Collect all usable keywords (prefer high > medium > low)
  // triggerKeywords is the full faculty TK object: { keywords: { high: {...}, medium: {...}, low: {...} } }
  const keywords = triggerKeywords.keywords || {};
  const allKeywords = [];
  if (keywords.high) allKeywords.push(...Object.keys(keywords.high));
  if (keywords.medium) allKeywords.push(...Object.keys(keywords.medium));
  if (keywords.low) allKeywords.push(...Object.keys(keywords.low));

  // Guard: no keywords → can't generate meaningful prompts
  if (allKeywords.length === 0) {
    console.warn(`  ⚠️  ${facultySlug}: no keywords found, skipping`);
    return [];
  }

  // Shuffle to avoid bias
  shuffle(allKeywords);

  // Generate until target reached
  let attempts = 0;
  const maxAttempts = targetCount * 5;

  while (prompts.length < targetCount && attempts < maxAttempts) {
    attempts++;
    const kw = allKeywords[attempts % allKeywords.length];
    if (!kw || kw.length < 3) continue;

    const isClaude =
      sourceMode === "claude"
        ? true
        : sourceMode === "gpt"
          ? false
          : sourceToggle;
    sourceToggle = !sourceToggle;

    const templates = isClaude ? CLAUDE_TEMPLATES : GPT_TEMPLATES;
    const tmpl = templates[attempts % templates.length];
    const prompt = tmpl(kw, ctx);

    // Dedupe
    const dedupeKey = prompt.toLowerCase().trim();
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);

    const source = isClaude ? "claude" : "gpt";

    prompts.push({
      id: `${facultySlug}-gen-${String(prompts.length + 1).padStart(2, "0")}`,
      prompt,
      expected_faculty: facultySlug,
      type: "single",
      acceptable_faculties: null,
      tags: ["ai-generated", source],
      source,
    });

    idCounter++;
  }

  return prompts;
}

// ── Cross-faculty ambiguous/adversarial prompts ─────────────────

function generateAmbiguousPrompts(facultyPairs, count) {
  const prompts = [];
  const templates = [
    (facA, facB) =>
      `How should I approach designing ${facA} that also considers ${facB} best practices?`,
    (facA, facB) =>
      `I need a solution that combines ${facA} principles with ${facB} methodology. What's the best approach?`,
    (facA, facB) =>
      `What's the intersection between ${facA} and ${facB}? Give me an integrated framework.`,
  ];

  let idx = 0;
  for (const [facA, facB] of facultyPairs) {
    if (prompts.length >= count) break;
    const tmpl = templates[idx % templates.length];
    const nameA = FACULTY_CONTEXT[facA]?.domain || facA;
    const nameB = FACULTY_CONTEXT[facB]?.domain || facB;
    prompts.push({
      id: `amb-gen-${String(prompts.length + 1).padStart(2, "0")}`,
      prompt: tmpl(nameA, nameB),
      expected_faculty: null,
      type: "ambiguous",
      acceptable_faculties: [facA, facB],
      tags: ["ambiguous", "ai-generated"],
      source: idx % 2 === 0 ? "claude" : "gpt",
    });
    idx++;
  }
  return prompts;
}

// ── Utilities ───────────────────────────────────────────────────

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function getFacultySlugPrefix(slug) {
  const map = {
    warna: "w",
    "ux-psikologi": "up",
    "ux-writing": "uw",
    tipografi: "tp",
    layout: "lo",
    "design-patterns": "dp",
    animasi: "an",
    branding: "br",
    aksesibilitas: "ak",
    improvement: "im",
    kognisi: "ko",
    "mobile-ux": "mu",
    "data-viz": "dv",
    "conversational-ui": "cu",
    "strategic-design": "sd",
    "design-systems": "ds",
    "service-design": "sv",
    "software-engineering": "se",
    "devops-infra": "de",
    "database-management": "db",
    "ai-integration": "ai",
    security: "sc",
    performance: "pf",
    "testing-qa": "tq",
    dx: "dx",
    ia: "ia",
  };
  return map[slug] || slug.substring(0, 3);
}

// ── Main ────────────────────────────────────────────────────────

console.log("══════════════════════════════════════════════");
console.log("  ICIL EVAL PROMPT GENERATOR");
console.log("══════════════════════════════════════════════");
console.log(`Target:       ${PROMPTS_PER_FACULTY} prompts/faculty`);
console.log(`Source mode:  ${SOURCE_MODE}`);
console.log("");

if (!fs.existsSync(INDEX_FILE)) {
  console.error(`ERROR: ${INDEX_FILE} not found.`);
  process.exit(1);
}

const index = JSON.parse(fs.readFileSync(INDEX_FILE, "utf-8"));
const triggerKeywords = index.auto_router?.trigger_keywords || {};
const facultySlugs = Object.keys(triggerKeywords);

if (facultySlugs.length === 0) {
  console.error("ERROR: No trigger_keywords found in index.json.");
  process.exit(1);
}

console.log(`Faculties found: ${facultySlugs.length}`);
console.log("");

let totalGenerated = 0;
const allGenerated = [];

for (const slug of facultySlugs) {
  const tk = triggerKeywords[slug];
  const generated = generatePrompts(slug, tk, PROMPTS_PER_FACULTY, SOURCE_MODE);

  // Re-assign clean IDs
  const prefix = getFacultySlugPrefix(slug);
  generated.forEach((p, i) => {
    p.id = `${prefix}-gen${String(i + 1).padStart(2, "0")}`;
  });

  allGenerated.push(...generated);
  totalGenerated += generated.length;
  console.log(`  ${slug.padEnd(26)} → ${generated.length} prompts`);
}

// Generate some cross-faculty ambiguous prompts
const ambiguousPairs = [
  ["warna", "aksesibilitas"],
  ["layout", "mobile-ux"],
  ["design-patterns", "ia"],
  ["ux-writing", "conversational-ui"],
  ["data-viz", "warna"],
  ["software-engineering", "security"],
  ["testing-qa", "devops-infra"],
  ["performance", "database-management"],
  ["strategic-design", "service-design"],
  ["ai-integration", "security"],
  ["dx", "software-engineering"],
  ["kognisi", "ux-psikologi"],
  ["design-systems", "branding"],
  ["animasi", "mobile-ux"],
  ["tipografi", "aksesibilitas"],
];
const ambiguousPrompts = generateAmbiguousPrompts(ambiguousPairs, 15);
allGenerated.push(...ambiguousPrompts);

console.log(`\n  ambiguous                 → ${ambiguousPrompts.length} prompts`);
console.log(`\n  TOTAL GENERATED: ${allGenerated.length} prompts`);

// ── Balance Report ────────────────────────────────────────────
const perFacultyCount = {};
for (const p of allGenerated) {
  if (p.type === "ambiguous") {
    for (const f of p.acceptable_faculties || []) {
      perFacultyCount[f] = (perFacultyCount[f] || 0) + 1;
    }
  } else {
    perFacultyCount[p.expected_faculty] =
      (perFacultyCount[p.expected_faculty] || 0) + 1;
  }
}

console.log("\n── Per-Faculty Balance ──");
const minCount = Math.min(...Object.values(perFacultyCount));
const maxCount = Math.max(...Object.values(perFacultyCount));
console.log(`  Range: ${minCount}–${maxCount} prompts/faculty`);
if (maxCount - minCount > 2) {
  console.log("  ⚠️  Imbalance detected — consider adjusting templates.");
}

// ── Output ────────────────────────────────────────────────────
if (OUTPUT_FILE) {
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allGenerated, null, 2));
  console.log(`\n✅ Generated prompts saved to ${OUTPUT_FILE}`);
} else {
  // Default: print to stdout
  console.log(JSON.stringify(allGenerated, null, 2));
}

console.log("\n💡 Tip: Merge into eval-prompts.json, dedupe against existing IDs, then re-run eval-runner.js");
