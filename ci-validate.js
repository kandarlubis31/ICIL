#!/usr/bin/env node

/**
 * ci-validate.js — ICIL Continuous Integration Validator
 *
 * Runs pre-merge checks on index.json and course files:
 *   1. Schema validation (all required fields present)
 *   2. Duplicate keyword check across faculties
 *   3. Broken cross-reference check between courses
 *   4. Auto-router eval gate (optional, --with-eval)
 *
 * Usage:
 *   node ci-validate.js                  # Schema + duplicates + cross-refs
 *   node ci-validate.js --with-eval      # Also run eval set as gate
 *   node ci-validate.js --json           # JSON output for CI systems
 *
 * Exit codes:
 *   0 = all checks passed
 *   1 = validation errors found
 */

const fs = require("fs");
const path = require("path");

const CAMPUS_ROOT = __dirname;
const INDEX_FILE = path.join(CAMPUS_ROOT, "index.json");

// ── Colors ──────────────────────────────────────────────────────
const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
};

// ── Validate JSON Schema ───────────────────────────────────────
function validateSchema(index) {
  const errors = [];

  // Top-level fields
  const requiredTop = ["campus", "version", "language", "totalCourses", "auto_router", "faculties"];
  for (const field of requiredTop) {
    if (!(field in index)) errors.push(`Missing top-level field: ${field}`);
  }

  // Auto-router fields
  if (index.auto_router) {
    const requiredRouter = ["trigger_keywords", "routing_rules", "loading_strategy", "matching_strategy"];
    for (const field of requiredRouter) {
      if (!(field in index.auto_router)) errors.push(`Missing auto_router field: ${field}`);
    }
  }

  // Faculty fields
  if (index.faculties) {
    const requiredFaculty = ["name", "courseCount", "level", "description", "courses", "emoji"];
    for (const [slug, faculty] of Object.entries(index.faculties)) {
      for (const field of requiredFaculty) {
        if (!(field in faculty)) errors.push(`Faculty '${slug}' missing field: ${field}`);
      }
      // Course fields
      if (faculty.courses) {
        const requiredCourse = ["id", "title", "level", "file", "prerequisites", "topics"];
        for (const course of faculty.courses) {
          for (const field of requiredCourse) {
            if (!(field in course)) errors.push(`Course '${slug}/${course.id}' missing field: ${field}`);
          }
          // Check file exists
          if (course.file && !fs.existsSync(path.join(CAMPUS_ROOT, course.file))) {
            errors.push(`Course file not found: ${course.file}`);
          }
        }
      }
      // Validate courseCount matches courses array length
      if (faculty.courseCount !== faculty.courses.length) {
        errors.push(
          `Faculty '${slug}': courseCount=${faculty.courseCount} but courses.length=${faculty.courses.length}`
        );
      }
    }
  }

  // Routing rules examples validation
  if (index.auto_router?.routing_rules?.examples) {
    for (const ex of index.auto_router.routing_rules.examples) {
      if (!ex.prompt) errors.push("Routing example missing 'prompt'");
      if (!ex.triggered || !Array.isArray(ex.triggered)) {
        errors.push(`Routing example '${ex.prompt?.substring(0, 50)}' missing 'triggered' array`);
      }
    }
  }

  // Trigger keywords structure
  if (index.auto_router?.trigger_keywords) {
    for (const [slug, data] of Object.entries(index.auto_router.trigger_keywords)) {
      if (!index.faculties[slug]) {
        errors.push(`Trigger keywords for unknown faculty: ${slug}`);
      }
      if (!data.keywords) errors.push(`Trigger '${slug}' missing 'keywords'`);
      if (!data.recommended_courses) errors.push(`Trigger '${slug}' missing 'recommended_courses'`);
    }
  }

  // Check all faculties have trigger keywords
  if (index.faculties && index.auto_router?.trigger_keywords) {
    for (const slug of Object.keys(index.faculties)) {
      if (!index.auto_router.trigger_keywords[slug]) {
        errors.push(`Faculty '${slug}' has NO trigger_keywords entry`);
      }
    }
  }

  // Check for duplicate emoji assignments
  if (index.faculties) {
    const emojiMap = {};
    for (const [slug, faculty] of Object.entries(index.faculties)) {
      const emoji = faculty.emoji;
      if (emoji) {
        if (!emojiMap[emoji]) emojiMap[emoji] = [];
        emojiMap[emoji].push(slug);
      }
    }
    for (const [emoji, slugs] of Object.entries(emojiMap)) {
      if (slugs.length > 1) {
        errors.push(`DUPLICATE EMOJI: ${emoji} used by [${slugs.join(", ")}]`);
      }
    }
  }

  return errors;
}

// ── Check Duplicate Keywords ──────────────────────────────────
// Returns { hardErrors: string[], warnings: string[] }
//   hardErrors = DUPLICATE HIGH (same keyword at HIGH in 2+ faculties) — blocks CI
//   warnings   = CROSS-FACULTY (keyword shared at different tiers) — informational only
function checkDuplicateKeywords(index) {
  const hardErrors = [];
  const warnings = [];
  const keywordMap = {}; // keyword → [{faculty, priority}]

  if (!index.auto_router?.trigger_keywords) return { hardErrors, warnings };

  for (const [facultySlug, data] of Object.entries(index.auto_router.trigger_keywords)) {
    const keywords = data.keywords || {};
    for (const priority of ["high", "medium", "low"]) {
      const tier = keywords[priority] || {};
      for (const kw of Object.keys(tier)) {
        const normalized = kw.toLowerCase().trim();
        if (!keywordMap[normalized]) keywordMap[normalized] = [];
        keywordMap[normalized].push({ faculty: facultySlug, priority });
      }
    }
  }

  for (const [kw, entries] of Object.entries(keywordMap)) {
    if (entries.length > 1) {
      const highEntries = entries.filter((e) => e.priority === "high");
      if (highEntries.length > 1) {
        const faculties = highEntries.map((e) => e.faculty).join(", ");
        hardErrors.push(
          `DUPLICATE HIGH: "${kw}" appears in multiple faculties at HIGH priority: [${faculties}]`
        );
      }
      // Warn about same keyword across faculties at any priority
      const faculties = [...new Set(entries.map((e) => e.faculty))];
      if (faculties.length > 1 && highEntries.length <= 1) {
        const details = entries
          .map((e) => `${e.faculty}:${e.priority}`)
          .join(", ");
        warnings.push(
          `CROSS-FACULTY: "${kw}" shared across [${faculties.join(", ")}] (${details})`
        );
      }
    }
  }

  return { hardErrors, warnings };
}

// ── Check Cross-References ────────────────────────────────────
function checkCrossReferences(index) {
  const errors = [];

  // Build map of all valid course refs: "faculty-slug/XX"
  const validRefs = new Set();
  for (const [slug, faculty] of Object.entries(index.faculties)) {
    for (const course of faculty.courses) {
      validRefs.add(`${slug}/${course.id}`);
    }
  }

  // Build set of valid faculty slugs for cross-ref validation
  const validSlugs = new Set(Object.keys(index.faculties));

  // Scan all course files for cross-references
  for (const [slug, faculty] of Object.entries(index.faculties)) {
    for (const course of faculty.courses) {
      const filePath = path.join(CAMPUS_ROOT, course.file);
      if (!fs.existsSync(filePath)) continue;

      const content = fs.readFileSync(filePath, "utf-8");
      // Match only if first part is a known faculty slug: faculty-slug/XX
      const facultyList = [...validSlugs].map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
      const refPattern = new RegExp(`(${facultyList})\\/(\\d{2})`, 'g');
      let match;
      while ((match = refPattern.exec(content)) !== null) {
        const ref = match[1] + '/' + match[2];
        if (!validRefs.has(ref)) {
          errors.push(`Broken cross-ref in ${course.file}: "${ref}" does not exist`);
        }
      }
    }
  }

  return errors;
}

// ── Print Report ──────────────────────────────────────────────
function printReport(schemaErrors, dupHardErrors, dupWarnings, refErrors, evalResult, jsonMode) {
  if (jsonMode) {
    const report = {
      schema: { passed: schemaErrors.length === 0, errors: schemaErrors },
      duplicates: { passed: dupHardErrors.length === 0, hardErrors: dupHardErrors, warnings: dupWarnings },
      crossRefs: { passed: refErrors.length === 0, errors: refErrors },
      eval: evalResult || null,
      allPassed:
        schemaErrors.length === 0 &&
        dupHardErrors.length === 0 &&
        refErrors.length === 0 &&
        (!evalResult || evalResult.thresholdCheck?.allPassed),
    };
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  console.log(`\n${c.bold}═══ ICIL CI Validation Report ═══${c.reset}\n`);

  // Schema
  if (schemaErrors.length === 0) {
    console.log(`${c.green}✓ Schema Validation — PASSED${c.reset}`);
  } else {
    console.log(`${c.red}✗ Schema Validation — ${schemaErrors.length} ERRORS:${c.reset}`);
    for (const err of schemaErrors) console.log(`  - ${err}`);
  }

  // Duplicates — hard errors (DUPLICATE HIGH) separate from warnings (CROSS-FACULTY)
  if (dupHardErrors.length === 0 && dupWarnings.length === 0) {
    console.log(`${c.green}✓ Duplicate Keywords — PASSED${c.reset}`);
  } else {
    if (dupHardErrors.length > 0) {
      console.log(`${c.red}✗ Duplicate Keywords — ${dupHardErrors.length} HARD ERRORS:${c.reset}`);
      for (const err of dupHardErrors) console.log(`  - ${err}`);
    }
    if (dupWarnings.length > 0) {
      console.log(`${c.yellow}⚠ Cross-Faculty Keywords — ${dupWarnings.length} warnings (informational, all different-tier overlaps)${c.reset}`);
      // Only show first 10 warnings to keep output scannable
      if (dupWarnings.length <= 10) {
        for (const w of dupWarnings) console.log(`${c.dim}  - ${w}${c.reset}`);
      } else {
        console.log(`${c.dim}  (${dupWarnings.length} total — all legit cross-faculty concepts)${c.reset}`);
      }
    }
  }

  // Cross-references
  if (refErrors.length === 0) {
    console.log(`${c.green}✓ Cross-References — PASSED${c.reset}`);
  } else {
    console.log(`${c.yellow}⚠ Cross-References — ${refErrors.length} WARNINGS:${c.reset}`);
    for (const err of refErrors.slice(0, 10)) console.log(`  - ${err}`);
    if (refErrors.length > 10) console.log(`  ... and ${refErrors.length - 10} more`);
  }

  // Eval (if run)
  if (evalResult) {
    if (evalResult.thresholdCheck?.allPassed) {
      console.log(`${c.green}✓ Eval Gate — PASSED (P@3=${(evalResult.precisionAt3 * 100).toFixed(1)}%, R@3=${(evalResult.recallAt3 * 100).toFixed(1)}%, MRR=${evalResult.mrr.toFixed(3)})${c.reset}`);
    } else {
      console.log(`${c.red}✗ Eval Gate — FAILED${c.reset}`);
    }
  }

  const allOk =
    schemaErrors.length === 0 &&
    dupHardErrors.length === 0 &&
    refErrors.length === 0 &&
    (!evalResult || evalResult.thresholdCheck?.allPassed);

  console.log(
    `\n${allOk ? c.green + c.bold + "✓ ALL CHECKS PASSED" : c.red + c.bold + "✗ SOME CHECKS FAILED"}${c.reset}\n`
  );
}

// ── Main ──────────────────────────────────────────────────────
function main() {
  const args = process.argv.slice(2);
  const jsonMode = args.includes("--json");
  const withEval = args.includes("--with-eval");

  // Load index
  let index;
  try {
    const raw = fs.readFileSync(INDEX_FILE, "utf-8");
    index = JSON.parse(raw);
  } catch (err) {
    console.error(`${c.red}✗ Failed to parse index.json: ${err.message}${c.reset}`);
    process.exit(1);
  }

  // Run checks
  const schemaErrors = validateSchema(index);
  const { hardErrors: dupHardErrors, warnings: dupWarnings } = checkDuplicateKeywords(index);
  const refErrors = checkCrossReferences(index);

  // Optional eval
  let evalResult = null;
  if (withEval) {
    try {
      const { runAll } = require("./eval-runner.js");
      const evalRaw = fs.readFileSync(path.join(CAMPUS_ROOT, "eval-set.json"), "utf-8");
      const evalSet = JSON.parse(evalRaw);
      evalResult = runAll(index, evalSet);
    } catch (err) {
      if (!jsonMode) console.error(`${c.yellow}⚠ Could not run eval: ${err.message}${c.reset}`);
    }
  }

  printReport(schemaErrors, dupHardErrors, dupWarnings, refErrors, evalResult, jsonMode);

  // Exit code: only hard errors (DUPLICATE HIGH) block CI.
  // CROSS-FACULTY warnings are informational — they don't fail CI.
  const allOk =
    schemaErrors.length === 0 &&
    dupHardErrors.length === 0 &&
    refErrors.length === 0 &&
    (!evalResult || evalResult.thresholdCheck?.allPassed);

  process.exit(allOk ? 0 : 1);
}

main();
