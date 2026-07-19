/**
 * eval-runner.js — ICIL Auto-Router Evaluation
 *
 * Usage:
 *   node eval/eval-runner.js [--save] [--verbose] [--compare] [--json]
 *
 * Loads eval-prompts.json, runs each prompt through searchCampus(),
 * and calculates: top-1 accuracy, top-3 accuracy, MRR, precision/recall/F1,
 * per-faculty breakdown with per-source analysis.
 *
 * --compare  Diff against previous _eval-results.json (regression detection)
 * --save     Write results to eval/_eval-results.json (gitignored)
 * --json     Output JSON to stdout (for CI piping)
 * --verbose  Show per-prompt pass/fail
 *
 * Re-run after any router change for apples-to-apples comparison.
 */

const core = require("../campus-core");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { execSync } = require("child_process");

const EVAL_DIR = __dirname;
const PROMPTS_FILE = path.join(EVAL_DIR, "eval-prompts.json");
const RESULTS_FILE = path.join(EVAL_DIR, "_eval-results.json");

const args = process.argv.slice(2);
const SAVE = args.includes("--save") || args.includes("-s");
const VERBOSE = args.includes("--verbose") || args.includes("-v");
const JSON_OUT = args.includes("--json") || args.includes("-j");
const COMPARE = args.includes("--compare") || args.includes("-c");
// --compare implies --save (you want the new baseline)
const SHOULD_SAVE = SAVE || COMPARE;

// ── Reproducibility Context ─────────────────────────────────
let gitHash = "unknown";
try {
  gitHash = execSync("git rev-parse HEAD 2>nul", {
    cwd: path.join(EVAL_DIR, ".."),
    encoding: "utf-8",
  }).trim();
} catch {
  gitHash = "no-git-repo";
}

function checksumFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  return crypto.createHash("sha256").update(raw).digest("hex");
}

// ── Load ────────────────────────────────────────────────────
if (!fs.existsSync(PROMPTS_FILE)) {
  console.error(`ERROR: ${PROMPTS_FILE} not found.`);
  process.exit(1);
}
const promptsChecksum = checksumFile(PROMPTS_FILE);
const evalData = JSON.parse(fs.readFileSync(PROMPTS_FILE, "utf-8"));
const index = core.loadIndex();

// ── Load Previous Results (for --compare) ───────────────────
let prevResults = null;
if (COMPARE) {
  if (fs.existsSync(RESULTS_FILE)) {
    prevResults = JSON.parse(fs.readFileSync(RESULTS_FILE, "utf-8"));
  } else if (!JSON_OUT) {
    console.log("⚠️  --compare flag used but no _eval-results.json found. Treating current run as baseline.\n");
  }
}

// ── Header (no computed vars needed) ─────────────────────────
if (!JSON_OUT) {
  console.log("══════════════════════════════════════════════");
  console.log("  ICIL AUTO-ROUTER EVALUATION");
  console.log("══════════════════════════════════════════════");
  console.log(`Version:      ${evalData.version}`);
  console.log(`Generated:    ${evalData.generated}`);
  console.log(`Prompts:      ${evalData.prompts.length}`);
  console.log(`Faculties:    ${Object.keys(index.faculties).length}`);
  console.log(`Git commit:   ${gitHash.substring(0, 8)}`);
  console.log(`Checksum:     ${promptsChecksum.substring(0, 16)}...`);
  if (COMPARE && prevResults) {
    const prevHash = prevResults.git_commit || "?";
    const prevCS = (prevResults.prompts_checksum || "?").substring(0, 16);
    console.log(`Baseline git: ${prevHash.substring(0, 8)}`);
    console.log(`Baseline cs:  ${prevCS}...`);
    if (prevResults.prompts_checksum && prevResults.prompts_checksum !== promptsChecksum) {
      console.log("⚠️  WARNING: eval-prompts.json changed since baseline! Comparison may be invalid.");
    }
  }
  console.log("");
}

// ── Run All ─────────────────────────────────────────────────
const results = [];
let processed = 0;

for (const p of evalData.prompts) {
  processed++;
  const result = core.searchCampus(p.prompt);
  const top5 = (result.results || []).slice(0, 5);

  const targets =
    p.type === "ambiguous"
      ? p.acceptable_faculties
      : [p.expected_faculty];

  const rankIdx = top5.findIndex((r) => targets.includes(r.faculty));
  const rank = rankIdx === -1 ? null : rankIdx + 1;

  results.push({
    id: p.id,
    prompt_short:
      p.prompt.length > 90
        ? p.prompt.substring(0, 87) + "..."
        : p.prompt,
    prompt_full: p.prompt,
    type: p.type,
    expected:
      p.type === "ambiguous"
        ? p.acceptable_faculties.join(" | ")
        : p.expected_faculty,
    expected_list: targets,
    actual_top1: top5[0]?.faculty || "NONE",
    actual_top3: top5.slice(0, 3).map((r) => r.faculty),
    actual_top5: top5.map((r) => r.faculty),
    rank,
    correct_top1: rank === 1,
    correct_top3: rank !== null && rank <= 3,
    correct_top5: rank !== null && rank <= 5,
    mr: rank === null ? 0 : 1 / rank,
    matched_faculties: result.matchedFaculties || 0,
    top1_priority: top5[0]?.priority || "none",
    top1_keywords: (top5[0]?.matchedKeywords || []).join(", "),
    source: p.source,
    tags: p.tags || [],
    adversarial_note: p.adversarial_note || null,
  });

  if (VERBOSE && !JSON_OUT) {
    const icon = results[results.length - 1].correct_top1 ? "✅" : "❌";
    console.log(
      `  ${icon} ${p.id}: "${p.prompt.substring(0, 70)}..." → ${results[results.length - 1].actual_top1}`
    );
  }
}

// ════════════════════════════════════════════════════════════
//  ALL COMPUTATION (no rendering) — must happen before any
//  rendering block that references these variables.
// ════════════════════════════════════════════════════════════

// ── Overall Metrics (compute only) ──────────────────────────
const total = results.length;
const top1Correct = results.filter((r) => r.correct_top1).length;
const top3Correct = results.filter((r) => r.correct_top3).length;
const top5Correct = results.filter((r) => r.correct_top5).length;
const mrr =
  Math.round(
    (results.reduce((sum, r) => sum + r.mr, 0) / total) * 10000
  ) / 10000;

const singles = results.filter((r) => r.type === "single");
const ambiguous = results.filter((r) => r.type === "ambiguous");
const adversarial = results.filter((r) => r.type === "adversarial");

function calcMRR(arr) {
  const sum = arr.reduce((s, r) => s + r.mr, 0);
  return arr.length > 0 ? Math.round((sum / arr.length) * 10000) / 10000 : 0;
}

// ── Per-Source Groups (compute only) ────────────────────────
const sourceGroups = {};
for (const r of results) {
  const src = r.source || "unknown";
  if (!sourceGroups[src]) sourceGroups[src] = [];
  sourceGroups[src].push(r);
}

// ── Per-Faculty Stats (compute only) ────────────────────────
const perFaculty = {};
for (const r of results) {
  const faculties = r.type === "ambiguous" ? r.expected_list : [r.expected];
  for (const f of faculties) {
    if (!perFaculty[f]) {
      perFaculty[f] = {
        total: 0,
        correct_top1: 0,
        correct_top3: 0,
        mr_sum: 0,
        from_ambiguous: 0,
        failures: [],
      };
    }
    if (r.type === "ambiguous") perFaculty[f].from_ambiguous++;
    perFaculty[f].total++;
    if (r.correct_top1) perFaculty[f].correct_top1++;
    if (r.correct_top3) perFaculty[f].correct_top3++;
    perFaculty[f].mr_sum += r.mr;
    if (!r.correct_top1) {
      perFaculty[f].failures.push({
        id: r.id,
        prompt: r.prompt_short,
        got: r.actual_top1,
        rank: r.rank,
      });
    }
  }
}

// ── Precision / Recall / F1 per Faculty ────────────────────
// Precision = TP/(TP+FP): of prompts routed TO faculty F, how many were correct?
// Recall    = TP/(TP+FN): of prompts that SHOULD route to F, how many did?
// F1        = harmonic mean of precision and recall
for (const [slug] of Object.entries(perFaculty)) {
  let tp = 0, fp = 0, fn = 0;
  for (const r of results) {
    const inExpected = r.expected_list.includes(slug);
    const routedTo = r.actual_top1 === slug;
    if (routedTo && inExpected) tp++;
    else if (routedTo && !inExpected) fp++;
    else if (!routedTo && inExpected) fn++;
  }
  perFaculty[slug].precision = tp + fp > 0 ? tp / (tp + fp) : 0;
  perFaculty[slug].recall = tp + fn > 0 ? tp / (tp + fn) : 0;
  perFaculty[slug].f1 =
    perFaculty[slug].precision + perFaculty[slug].recall > 0
      ? (2 * perFaculty[slug].precision * perFaculty[slug].recall) /
        (perFaculty[slug].precision + perFaculty[slug].recall)
      : 0;
  perFaculty[slug].tp = tp;
  perFaculty[slug].fp = fp;
  perFaculty[slug].fn = fn;
}

// Compute macro-averaged P/R/F1
const allStats = Object.values(perFaculty);
const macroPrecision = allStats.length > 0
  ? allStats.reduce((s, m) => s + m.precision, 0) / allStats.length
  : 0;
const macroRecall = allStats.length > 0
  ? allStats.reduce((s, m) => s + m.recall, 0) / allStats.length
  : 0;
const macroF1 = macroPrecision + macroRecall > 0
  ? (2 * macroPrecision * macroRecall) / (macroPrecision + macroRecall)
  : 0;

// ── Failures List ───────────────────────────────────────────
const allFailures = results.filter((r) => !r.correct_top1);

// ════════════════════════════════════════════════════════════
//  ALL RENDERING — after all computation is done
// ════════════════════════════════════════════════════════════

if (!JSON_OUT) {
  console.log("╔══════════════════════════════════════════════╗");
  console.log("║  🎯 TOP-1 ACCURACY (Headline Metric)         ║");
  console.log(`║     ${String(top1Correct).padStart(3)}/${String(total).padStart(3)}  →  ${(top1Correct / total * 100).toFixed(1).padStart(5)}%${' '.repeat(22)}║`);
  console.log("╚══════════════════════════════════════════════╝");
  console.log("");

  console.log("── Overall Metrics ──");
  console.log(`  Top-3 Accuracy:    ${top3Correct}/${total}  (${(top3Correct / total * 100).toFixed(1)}%)`);
  console.log(`  Top-5 Accuracy:    ${top5Correct}/${total}  (${(top5Correct / total * 100).toFixed(1)}%)`);
  console.log(`  MRR:               ${mrr}`);
  console.log(`  Macro Precision:   ${(macroPrecision * 100).toFixed(1)}%`);
  console.log(`  Macro Recall:      ${(macroRecall * 100).toFixed(1)}%`);
  console.log(`  Macro F1:          ${(macroF1 * 100).toFixed(1)}%`);
  console.log("");

  console.log("── By Prompt Type ──");
  console.log(
    `  Single (${singles.length}):       top-1 ${(singles.filter(r=>r.correct_top1).length/singles.length*100).toFixed(1)}%  MRR ${calcMRR(singles)}`
  );
  console.log(
    `  Ambiguous (${ambiguous.length}):    top-3 ${(ambiguous.filter(r=>r.correct_top3).length/ambiguous.length*100).toFixed(1)}%  MRR ${calcMRR(ambiguous)}`
  );
  console.log(
    `  Adversarial (${adversarial.length}):  top-1 ${(adversarial.filter(r=>r.correct_top1).length/adversarial.length*100).toFixed(1)}%  MRR ${calcMRR(adversarial)}`
  );
  console.log("");

  // ── Per-Source Breakdown ───────────────────────────────────
  if (Object.keys(sourceGroups).length > 1) {
    console.log("── By Source ──");
    const sourceOrder = ["human", "claude", "gpt"];
    for (const src of sourceOrder) {
      const group = sourceGroups[src];
      if (!group || group.length === 0) continue;
      const sTop1 = group.filter((r) => r.correct_top1).length;
      const sMRR = calcMRR(group);
      console.log(
        `  ${src.padEnd(12)} ${String(group.length).padStart(3)} prompts  top-1 ${(sTop1/group.length*100).toFixed(1)}%  MRR ${sMRR}`
      );
    }
    for (const [src, group] of Object.entries(sourceGroups)) {
      if (sourceOrder.includes(src)) continue;
      const sTop1 = group.filter((r) => r.correct_top1).length;
      const sMRR = calcMRR(group);
      console.log(
        `  ${src.padEnd(12)} ${String(group.length).padStart(3)} prompts  top-1 ${(sTop1/group.length*100).toFixed(1)}%  MRR ${sMRR}`
      );
    }
    console.log("");
  }

  // ── Per-Faculty Breakdown ───────────────────────────────────
  console.log("── Per-Faculty Breakdown ──");
  console.log(
    "Faculty".padEnd(32) +
      "N".padEnd(8) +
      "Top-1%".padEnd(7) +
      "P%".padEnd(6) +
      "R%".padEnd(6) +
      "F1%".padEnd(6) +
      "MRR".padEnd(8) +
      "Status"
  );
  console.log("─".repeat(80));

  const sortedFaculties = Object.entries(perFaculty).sort((a, b) => {
    const aPct = a[1].correct_top1 / a[1].total;
    const bPct = b[1].correct_top1 / b[1].total;
    return aPct - bPct;
  });

  for (const [faculty, stats] of sortedFaculties) {
    const emoji = index.faculties[faculty].emoji || "📚";
    const pct = (stats.correct_top1 / stats.total * 100).toFixed(0);
    const fmrr = (stats.mr_sum / stats.total).toFixed(3);
    const status = stats.correct_top1 === stats.total ? "✅" : pct === "0" ? "🔴" : "⚠️";
    const ambNote = stats.from_ambiguous > 0 ? ` (+${stats.from_ambiguous}a)` : "";
    const name = (evalData.faculty_map && evalData.faculty_map[faculty])
      ? `${emoji} ${evalData.faculty_map[faculty]}`
      : `${emoji} ${faculty}`;
    const precPct = ((stats.precision || 0) * 100).toFixed(0);
    const recPct = ((stats.recall || 0) * 100).toFixed(0);
    const f1Pct = ((stats.f1 || 0) * 100).toFixed(0);
    console.log(
      name.padEnd(32) +
        `${stats.total}${ambNote}`.padEnd(8) +
        `${pct}%`.padEnd(7) +
        `${precPct}%`.padEnd(6) +
        `${recPct}%`.padEnd(6) +
        `${f1Pct}%`.padEnd(6) +
        fmrr.padEnd(8) +
        status
    );
  }

  // ── Failures Detail ─────────────────────────────────────────
  if (allFailures.length > 0) {
    console.log(`\n── Failures (${allFailures.length}) ──`);
    for (const f of allFailures) {
      const note = f.adversarial_note ? ` [${f.adversarial_note}]` : "";
      console.log(
        `  ${f.id}: "${f.prompt_short}" → got "${f.actual_top1}", expected "${f.expected}" (rank: ${f.rank ?? "N/A"})${note}`
      );
    }
  } else {
    console.log(`\n── No Failures! All ${total} prompts routed correctly. `);
  }
}

// ════════════════════════════════════════════════════════════
//  OUTPUT JSON
// ════════════════════════════════════════════════════════════

const output = {
  timestamp: new Date().toISOString(),
  version: evalData.version,
  index_version: index.version,
  total_faculties: Object.keys(index.faculties).length,
  total_prompts: total,
  summary: {
    top1_accuracy: top1Correct / total,
    top1_correct: top1Correct,
    top1_total: total,
    top3_accuracy: top3Correct / total,
    top5_accuracy: top5Correct / total,
    mrr,
    macro_precision: +macroPrecision.toFixed(4),
    macro_recall: +macroRecall.toFixed(4),
    macro_f1: +macroF1.toFixed(4),
    by_type: {
      single: {
        count: singles.length,
        top1: singles.filter((r) => r.correct_top1).length,
        mrr: calcMRR(singles),
      },
      ambiguous: {
        count: ambiguous.length,
        top3: ambiguous.filter((r) => r.correct_top3).length,
        mrr: calcMRR(ambiguous),
      },
      adversarial: {
        count: adversarial.length,
        top1: adversarial.filter((r) => r.correct_top1).length,
        mrr: calcMRR(adversarial),
      },
    },
  },
  per_faculty: Object.fromEntries(
    Object.entries(perFaculty).map(([k, v]) => [
      k,
      {
        total: v.total,
        correct_top1: v.correct_top1,
        accuracy: +(v.correct_top1 / v.total).toFixed(4),
        precision: +(v.precision || 0).toFixed(4),
        recall: +(v.recall || 0).toFixed(4),
        f1: +(v.f1 || 0).toFixed(4),
        tp: v.tp || 0,
        fp: v.fp || 0,
        fn: v.fn || 0,
        mrr: +(v.mr_sum / v.total).toFixed(4),
        failure_count: v.failures.length,
      },
    ])
  ),
  failures: allFailures.map((f) => ({
    id: f.id,
    prompt: f.prompt_full,
    type: f.type,
    expected: f.expected,
    got: f.actual_top1,
    rank: f.rank,
    adversarial_note: f.adversarial_note,
  })),
  results: results.map((r) => ({
    id: r.id,
    prompt: r.prompt_short,
    type: r.type,
    expected: r.expected,
    actual_top1: r.actual_top1,
    actual_top3: r.actual_top3,
    rank: r.rank,
    correct_top1: r.correct_top1,
    correct_top3: r.correct_top3,
    mr: r.mr,
    top1_keywords: r.top1_keywords,
  })),
};

// ── Coverage Warning (min-8 threshold) ──────────────────────
const MIN_PROMPTS_PER_FACULTY = 8;
const underSampled = Object.entries(perFaculty)
  .filter(([, stats]) => stats.total < MIN_PROMPTS_PER_FACULTY)
  .map(([f]) => f);
if (underSampled.length > 0 && !JSON_OUT) {
  const pctUnder = (underSampled.length / Object.keys(perFaculty).length * 100).toFixed(0);
  console.log(`\n⚠️  ${underSampled.length}/${Object.keys(perFaculty).length} faculties have <${MIN_PROMPTS_PER_FACULTY} prompts (low statistical confidence):`);
  console.log(`   ${underSampled.join(", ")}`);
  console.log(`   Expand to ${MIN_PROMPTS_PER_FACULTY}-10 prompts/faculty. Current: ${total} total prompts.`);
}

// ── Reproducibility metadata ────────────────────────────────
output.git_commit = gitHash;
output.prompts_checksum = promptsChecksum;
output.per_source = {};
for (const [src, group] of Object.entries(sourceGroups)) {
  output.per_source[src] = {
    count: group.length,
    top1_correct: group.filter((r) => r.correct_top1).length,
    top1_accuracy: +(group.filter((r) => r.correct_top1).length / group.length).toFixed(4),
    mrr: calcMRR(group),
  };
}
output.min_prompts_threshold = MIN_PROMPTS_PER_FACULTY;
output.under_sampled_faculties = underSampled;

// ── Compare / Delta (if --compare and prev exists) ──────────
if (COMPARE && prevResults && prevResults.summary) {
  const prev = prevResults.summary;
  const deltaTop1 = +(output.summary.top1_accuracy - prev.top1_accuracy).toFixed(4);
  const deltaMRR = +(output.summary.mrr - prev.mrr).toFixed(4);
  output.delta = {
    baseline_timestamp: prevResults.timestamp,
    baseline_git: prevResults.git_commit || "unknown",
    delta_top1_accuracy: deltaTop1,
    delta_mrr: deltaMRR,
    per_faculty_delta: {},
  };

  if (prevResults.per_faculty) {
    for (const [faculty, stats] of Object.entries(output.per_faculty)) {
      const prevStats = prevResults.per_faculty[faculty];
      if (prevStats) {
        output.delta.per_faculty_delta[faculty] = {
          delta_top1: +(stats.accuracy - prevStats.accuracy).toFixed(4),
          delta_mrr: +(stats.mrr - prevStats.mrr).toFixed(4),
        };
      }
    }
  }

  if (!JSON_OUT) {
    console.log("── Delta vs Baseline ──");
    const top1Color = deltaTop1 >= 0 ? "\x1b[32m" : "\x1b[31m";
    const mrrColor = deltaMRR >= 0 ? "\x1b[32m" : "\x1b[31m";
    const top1Sign = deltaTop1 >= 0 ? "+" : "";
    const mrrSign = deltaMRR >= 0 ? "+" : "";
    console.log(`  Top-1 Accuracy: ${(output.summary.top1_accuracy*100).toFixed(1)}% (${top1Color}${top1Sign}${(deltaTop1*100).toFixed(1)}%\x1b[0m)`);
    console.log(`  MRR:            ${output.summary.mrr} (${mrrColor}${mrrSign}${deltaMRR}\x1b[0m)`);

    const regressions = [];
    for (const [faculty, delta] of Object.entries(output.delta.per_faculty_delta)) {
      if (delta.delta_top1 < -0.01) {
        regressions.push(`${faculty} (${(delta.delta_top1*100).toFixed(0)}%)`);
      }
    }
    if (regressions.length > 0) {
      console.log(`\n  ⚠️  Faculty regressions (>1% top-1 drop):`);
      console.log(`     ${regressions.join(", ")}`);
    }
    console.log("");
  }
}

// ── Output ──────────────────────────────────────────────────
if (SHOULD_SAVE) {
  fs.writeFileSync(RESULTS_FILE, JSON.stringify(output, null, 2));
  if (!JSON_OUT) {
    const note = COMPARE ? " (new baseline for --compare)" : "";
    console.log(`\n✅ Results saved to eval/_eval-results.json${note}`);
  }
} else if (JSON_OUT) {
  console.log(JSON.stringify(output, null, 2));
} else if (!JSON_OUT) {
  console.log(`\n💡 Run with --save to write eval/_eval-results.json  |  --json for stdout pipe  |  --compare for regression detection`);
}
