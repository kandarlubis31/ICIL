/**
 * Quick merge script: combines existing eval-prompts.json with _generated-prompts.json
 * Dedupes by ID, keeps all existing prompts, adds new generated ones.
 */
const fs = require("fs");
const path = require("path");

const EVAL_DIR = __dirname;
const EXISTING = path.join(EVAL_DIR, "eval-prompts.json");
const GENERATED = path.join(EVAL_DIR, "_generated-prompts.json");

if (!fs.existsSync(GENERATED)) {
  console.error(`ERROR: ${GENERATED} not found. Run eval-generator.js first.`);
  process.exit(1);
}

const existing = JSON.parse(fs.readFileSync(EXISTING, "utf-8"));
const generated = JSON.parse(fs.readFileSync(GENERATED, "utf-8"));

const existingIds = new Set(existing.prompts.map((p) => p.id));

// Track how many per faculty already exist
const existingPerFaculty = {};
for (const p of existing.prompts) {
  const facs = p.type === "ambiguous" ? (p.acceptable_faculties || []) : [p.expected_faculty];
  for (const f of facs) {
    existingPerFaculty[f] = (existingPerFaculty[f] || 0) + 1;
  }
}

// Add only generated prompts with non-conflicting IDs
let added = 0;
let skipped = 0;
for (const p of generated) {
  if (existingIds.has(p.id)) {
    skipped++;
    continue;
  }
  existing.prompts.push(p);
  existingIds.add(p.id);
  added++;
}

// Update metadata
existing.total_prompts = existing.prompts.length;
existing.version = "2.0.0";
existing.description =
  "Expanded eval set — 50/50/50 human+Claude+GPT prompts for ICIL auto-router evaluation. " +
  "Target: 8-10 prompts/faculty for stable MRR. Run eval-runner.js --save to measure.";

// Re-count sources
const sourceCounts = {};
for (const p of existing.prompts) {
  sourceCounts[p.source] = (sourceCounts[p.source] || 0) + 1;
}

fs.writeFileSync(EXISTING, JSON.stringify(existing, null, 2));

console.log(`✅ Merge complete:`);
console.log(`   Existing: ${existing.prompts.length - added} prompts`);
console.log(`   Added:    ${added} new (${skipped} skipped by ID)`);
console.log(`   Total:    ${existing.prompts.length} prompts`);
console.log(`   Version:  ${existing.version}`);
console.log(`\n── Per-Source ──`);
for (const [src, count] of Object.entries(sourceCounts)) {
  console.log(`   ${src}: ${count} prompts`);
}

// Per-faculty final count
const perFaculty = {};
for (const p of existing.prompts) {
  const facs = p.type === "ambiguous" ? (p.acceptable_faculties || []) : [p.expected_faculty];
  for (const f of facs) {
    perFaculty[f] = (perFaculty[f] || 0) + 1;
  }
}
console.log(`\n── Per-Faculty Final ──`);
const counts = Object.values(perFaculty);
console.log(`   Min: ${Math.min(...counts)}  Max: ${Math.max(...counts)}  Avg: ${(counts.reduce((a,b)=>a+b,0)/counts.length).toFixed(1)}`);
const under8 = Object.entries(perFaculty).filter(([,c]) => c < 8).map(([f]) => f);
if (under8.length > 0) {
  console.log(`   ⚠️  Under 8: ${under8.join(", ")}`);
} else {
  console.log(`   ✅ All faculties ≥ 8 prompts`);
}
