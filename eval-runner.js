#!/usr/bin/env node

/**
 * eval-runner.js — ICIL Auto-Router Evaluation Runner
 *
 * Runs all labeled prompts from eval-set.json through the auto-router
 * and computes precision/recall/MRR/faculty accuracy metrics.
 *
 * Usage:
 *   node eval-runner.js                          # Run all 200 prompts
 *   node eval-runner.js --faculty warna          # Run only warna prompts
 *   node eval-runner.js --difficulty hard        # Run only hard prompts
 *   node eval-runner.js --json                   # Output as JSON
 *   node eval-runner.js --ci                     # CI mode: exit 1 if below threshold
 */

const core = require("./campus-core");
const path = require("path");
const fs = require("fs");

const EVAL_FILE = path.join(__dirname, "eval-set.json");
const THRESHOLDS = {
  precision_at_k: 0.80,
  recall_at_k: 0.70,
  mrr: 0.65,
  faculty_accuracy: 0.75,
};

// ── Load eval set ──────────────────────────────────────────────
function loadEvalSet() {
  const raw = fs.readFileSync(EVAL_FILE, "utf-8");
  return JSON.parse(raw);
}

// ── Run single prompt ──────────────────────────────────────────
function runPrompt(index, evalPrompt) {
  const results = core.matchKeywords(index, evalPrompt.prompt);
  const returnedFaculties = results.map((r) => r.faculty);

  return {
    id: evalPrompt.id,
    prompt: evalPrompt.prompt,
    expected: evalPrompt.expected_faculties,
    returned: returnedFaculties,
    difficulty: evalPrompt.difficulty,
    category: evalPrompt.category,
  };
}

// ── Compute Precision@k ────────────────────────────────────────
function precisionAtK(expected, returned, k) {
  const topK = returned.slice(0, k);
  if (topK.length === 0) return expected.length === 0 ? 1 : 0;
  const hits = topK.filter((f) => expected.includes(f));
  return hits.length / topK.length;
}

// ── Compute Recall@k ───────────────────────────────────────────
function recallAtK(expected, returned, k) {
  if (expected.length === 0) return 1;
  const topK = returned.slice(0, k);
  const hits = topK.filter((f) => expected.includes(f));
  return hits.length / expected.length;
}

// ── Compute MRR (Mean Reciprocal Rank) ────────────────────────
function reciprocalRank(expected, returned) {
  for (let i = 0; i < returned.length; i++) {
    if (expected.includes(returned[i])) return 1 / (i + 1);
  }
  return 0;
}

// ── Run all prompts ────────────────────────────────────────────
function runAll(index, evalSet, filters = {}) {
  let prompts = evalSet.prompts;

  if (filters.faculty) {
    prompts = prompts.filter((p) => p.expected_faculties.includes(filters.faculty));
  }
  if (filters.difficulty) {
    prompts = prompts.filter((p) => p.difficulty === filters.difficulty);
  }
  if (filters.category) {
    prompts = prompts.filter((p) => p.category === filters.category);
  }

  const results = prompts.map((p) => runPrompt(index, p));

  // Aggregate metrics
  let totalP1 = 0,
    totalR1 = 0,
    totalMRR = 0;
  let perfectHits = 0;
  let atLeastOne = 0;
  let noMatch = 0;

  // Per-faculty stats
  const facultyStats = {};
  // Per-difficulty stats
  const difficultyStats = { easy: { count: 0, p1: 0, r1: 0, mrr: 0 },
    medium: { count: 0, p1: 0, r1: 0, mrr: 0 },
    hard: { count: 0, p1: 0, r1: 0, mrr: 0 } };

  for (const r of results) {
    const p1 = precisionAtK(r.expected, r.returned, 3);
    const r1 = recallAtK(r.expected, r.returned, 3);
    const rr = reciprocalRank(r.expected, r.returned);

    totalP1 += p1;
    totalR1 += r1;
    totalMRR += rr;

    if (p1 === 1 && r1 === 1) perfectHits++;
    if (r1 > 0) atLeastOne++;
    if (r.returned.length === 0) noMatch++;

    // Per-faculty — binary: was this specific faculty found?
    for (const f of r.expected) {
      if (!facultyStats[f]) facultyStats[f] = { count: 0, p1: 0, r1: 0, mrr: 0 };
      facultyStats[f].count++;
      const found = r.returned.includes(f);
      facultyStats[f].p1 += found ? 1 : 0;
      facultyStats[f].r1 += found ? 1 : 0;
      // For MRR per-faculty: rank of this faculty in results
      const rank = r.returned.indexOf(f);
      facultyStats[f].mrr += found ? (1 / (rank + 1)) : 0;
    }

    // Per-difficulty
    const d = r.difficulty;
    if (difficultyStats[d]) {
      difficultyStats[d].count++;
      difficultyStats[d].p1 += p1;
      difficultyStats[d].r1 += r1;
      difficultyStats[d].mrr += rr;
    }
  }

  const n = results.length;
  const avgP1 = n > 0 ? totalP1 / n : 0;
  const avgR1 = n > 0 ? totalR1 / n : 0;
  const avgMRR = n > 0 ? totalMRR / n : 0;

  // Average per-faculty
  const facultyAccuracy = {};
  for (const [f, s] of Object.entries(facultyStats)) {
    facultyAccuracy[f] = {
      count: s.count,
      precision: s.p1 / s.count,
      recall: s.r1 / s.count,
      mrr: s.mrr / s.count,
    };
  }

  // Average per-difficulty
  const difficultyMetrics = {};
  for (const [d, s] of Object.entries(difficultyStats)) {
    if (s.count > 0) {
      difficultyMetrics[d] = {
        count: s.count,
        precision: s.p1 / s.count,
        recall: s.r1 / s.count,
        mrr: s.mrr / s.count,
      };
    }
  }

  return {
    totalPrompts: n,
    precisionAt3: avgP1,
    recallAt3: avgR1,
    mrr: avgMRR,
    perfectHits,
    perfectHitRate: n > 0 ? perfectHits / n : 0,
    atLeastOne,
    atLeastOneRate: n > 0 ? atLeastOne / n : 0,
    noMatch,
    noMatchRate: n > 0 ? noMatch / n : 0,
    facultyAccuracy,
    difficultyMetrics,
    thresholdCheck: {
      precision_at_k: avgP1 >= THRESHOLDS.precision_at_k,
      recall_at_k: avgR1 >= THRESHOLDS.recall_at_k,
      mrr: avgMRR >= THRESHOLDS.mrr,
      faculty_accuracy:
        Object.values(facultyAccuracy).filter((f) => f.recall > 0).length /
          Object.keys(facultyAccuracy).length >=
        THRESHOLDS.faculty_accuracy,
      allPassed:
        avgP1 >= THRESHOLDS.precision_at_k &&
        avgR1 >= THRESHOLDS.recall_at_k &&
        avgMRR >= THRESHOLDS.mrr,
    },
    failedPrompts: results
      .filter((r) => recallAtK(r.expected, r.returned, 3) === 0)
      .map((r) => ({
        id: r.id,
        prompt: r.prompt,
        expected: r.expected,
        returned: r.returned,
        difficulty: r.difficulty,
      })),
  };
}

// ── Print Report ───────────────────────────────────────────────
function printReport(report, jsonMode) {
  if (jsonMode) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  const c = {
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    dim: "\x1b[2m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    cyan: "\x1b[36m",
  };

  console.log(`\n${c.bold}═══ ICIL Auto-Router Evaluation Report ═══${c.reset}\n`);

  // Overall metrics
  console.log(`${c.bold}Overall Metrics (${report.totalPrompts} prompts):${c.reset}`);
  const pOk = report.precisionAt3 >= THRESHOLDS.precision_at_k;
  const rOk = report.recallAt3 >= THRESHOLDS.recall_at_k;
  const mOk = report.mrr >= THRESHOLDS.mrr;

  console.log(
    `  Precision@3:  ${(pOk ? c.green : c.red) + (report.precisionAt3 * 100).toFixed(1)}%${c.reset} (threshold: ${(THRESHOLDS.precision_at_k * 100).toFixed(0)}%)`
  );
  console.log(
    `  Recall@3:     ${(rOk ? c.green : c.red) + (report.recallAt3 * 100).toFixed(1)}%${c.reset} (threshold: ${(THRESHOLDS.recall_at_k * 100).toFixed(0)}%)`
  );
  console.log(
    `  MRR:          ${(mOk ? c.green : c.red) + report.mrr.toFixed(3)}${c.reset} (threshold: ${THRESHOLDS.mrr.toFixed(2)})`
  );
  console.log(
    `  Perfect hits: ${report.perfectHits}/${report.totalPrompts} (${(report.perfectHitRate * 100).toFixed(1)}%)`
  );
  console.log(
    `  At least one: ${report.atLeastOne}/${report.totalPrompts} (${(report.atLeastOneRate * 100).toFixed(1)}%)`
  );
  console.log(
    `  No match:     ${report.noMatch}/${report.totalPrompts} (${(report.noMatchRate * 100).toFixed(1)}%)`
  );

  // Difficulty breakdown
  console.log(`\n${c.bold}By Difficulty:${c.reset}`);
  for (const [d, m] of Object.entries(report.difficultyMetrics)) {
    const label = d === "easy" ? "🟢 Easy" : d === "medium" ? "🟡 Medium" : "🔴 Hard";
    console.log(
      `  ${label}: P@3=${(m.precision * 100).toFixed(1)}% R@3=${(m.recall * 100).toFixed(1)}% MRR=${m.mrr.toFixed(3)} (${m.count} prompts)`
    );
  }

  // Faculty breakdown
  console.log(`\n${c.bold}By Faculty (top 10 by count):${c.reset}`);
  const sorted = Object.entries(report.facultyAccuracy)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10);
  for (const [f, s] of sorted) {
    const rOk2 = s.recall >= THRESHOLDS.faculty_accuracy;
    console.log(
      `  ${f}: P@3=${(s.precision * 100).toFixed(1)}% R@3=${(rOk2 ? c.green : c.red) + (s.recall * 100).toFixed(1)}%${c.reset} (${s.count} prompts)`
    );
  }

  // Failed prompts
  if (report.failedPrompts.length > 0) {
    console.log(`\n${c.yellow}${c.bold}⚠ Failed Prompts (${report.failedPrompts.length}):${c.reset}`);
    for (const fp of report.failedPrompts.slice(0, 15)) {
      console.log(
        `  ${fp.id}: "${fp.prompt.substring(0, 70)}..." → expected [${fp.expected.join(", ")}], got [${fp.returned.join(", ") || "NONE"}]`
      );
    }
    if (report.failedPrompts.length > 15) {
      console.log(`  ... and ${report.failedPrompts.length - 15} more`);
    }
  }

  // Threshold summary
  console.log(`\n${c.bold}Threshold Check:${c.reset}`);
  const allPassed = report.thresholdCheck.allPassed;
  console.log(
    `  ${allPassed ? c.green + "✓ ALL PASSED" : c.red + "✗ SOME FAILED"}${c.reset}`
  );

  console.log("");
}

// ── Main ────────────────────────────────────────────────────────
function main() {
  const args = process.argv.slice(2);
  const jsonMode = args.includes("--json");
  const ciMode = args.includes("--ci");

  // Parse filters
  const filters = {};
  const facultyIdx = args.indexOf("--faculty");
  if (facultyIdx !== -1 && args[facultyIdx + 1]) filters.faculty = args[facultyIdx + 1];
  const diffIdx = args.indexOf("--difficulty");
  if (diffIdx !== -1 && args[diffIdx + 1]) filters.difficulty = args[diffIdx + 1];
  const catIdx = args.indexOf("--category");
  if (catIdx !== -1 && args[catIdx + 1]) filters.category = args[catIdx + 1];

  const index = core.loadIndex();
  const evalSet = loadEvalSet();

  if (!ciMode && !jsonMode) {
    console.log(`ICIL Eval Runner v${evalSet.version} — ${evalSet.total_prompts} prompts, ${evalSet.faculties_covered} faculties`);
    if (Object.keys(filters).length > 0) {
      console.log(`Filters: ${JSON.stringify(filters)}`);
    }
  }

  const report = runAll(index, evalSet, filters);
  printReport(report, jsonMode);

  if (ciMode && !report.thresholdCheck.allPassed) {
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

// ── Exports (for CI integration) ─────────────────────────────
module.exports = { runAll, precisionAtK, recallAtK, reciprocalRank, THRESHOLDS };
