#!/usr/bin/env node

/**
 * Plan the next evidence-only content-audit batch.
 *
 * Usage:
 *   node audit/audit-runner.js
 *   node audit/audit-runner.js --date 2026-08-01 --batch-size 7
 *   node audit/audit-runner.js --status --json
 *
 * This command regenerates the structural manifest, selects the next
 * unreviewed priority batch, and writes audit/audit-checkpoint.json. It does
 * not create research findings, mark courses verified, or modify course files.
 */

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..");
const MANIFEST_FILE = path.join(__dirname, "audit-manifest.json");
const CHECKPOINT_FILE = path.join(__dirname, "audit-checkpoint.json");
const GENERATOR = path.join(__dirname, "generate-manifest.js");

const PRIORITY = [
  "knowledge-context",
  "security",
  "ai-integration",
  "agentic-engineering",
  "devops-infra",
  "database-management",
  "performance",
  "testing-qa",
  "software-engineering",
  "design-systems",
  "conversational-ui",
  "mobile-ux",
  "dx",
  "ia",
  "service-design",
  "strategic-design",
  "warna",
  "ux-psikologi",
  "ux-writing",
  "tipografi",
  "layout",
  "design-patterns",
  "animasi",
  "branding",
  "aksesibilitas",
  "kognisi",
  "ux-research",
  "design-ethics",
  "improvement",
  "data-viz",
];

function parseArgs(argv) {
  const args = { json: false, status: false, batchSize: null, date: null };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--json") args.json = true;
    else if (arg === "--status") args.status = true;
    else if (arg === "--date") {
      if (!argv[i + 1] || argv[i + 1].startsWith("--")) {
        throw new Error("--date requires YYYY-MM-DD");
      }
      args.date = argv[++i];
    } else if (arg === "--batch-size") {
      if (!argv[i + 1] || argv[i + 1].startsWith("--")) {
        throw new Error("--batch-size requires a positive integer");
      }
      args.batchSize = Number(argv[++i]);
    }
    else if (arg === "--help" || arg === "-h") args.help = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (args.batchSize !== null && (!Number.isInteger(args.batchSize) || args.batchSize < 1)) {
    throw new Error("--batch-size must be a positive integer");
  }
  return args;
}

function usage() {
  return [
    "Usage: node audit/audit-runner.js [options]",
    "",
    "Options:",
    "  --status              Read the current checkpoint without regenerating",
    "  --date YYYY-MM-DD    Audit date passed to the manifest generator",
    "  --batch-size N       Maximum courses in the next batch (default: faculty size)",
    "  --json               Emit machine-readable output",
    "  --help               Show this help",
  ].join("\n");
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(file, value) {
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function runManifestGenerator(date) {
  const args = [GENERATOR];
  if (date) args.push("--date", date);
  const result = spawnSync(process.execPath, args, { cwd: ROOT, encoding: "utf8" });
  if (result.status !== 0) {
    throw new Error(`Manifest generation failed${result.stderr ? `: ${result.stderr.trim()}` : ""}`);
  }
}

function groupCourses(manifest) {
  const groups = new Map();
  for (const course of manifest.courses || []) {
    if (!groups.has(course.faculty)) groups.set(course.faculty, []);
    groups.get(course.faculty).push(course);
  }
  return groups;
}

function buildPlan(manifest, batchSize) {
  const groups = groupCourses(manifest);
  const order = [...PRIORITY, ...groups.keys()].filter((faculty, index, all) => all.indexOf(faculty) === index);
  const selectedFaculty = order.find((faculty) =>
    (groups.get(faculty) || []).some((course) => course.researchStatus === "unreviewed")
  );

  if (!selectedFaculty) {
    return {
      status: "complete",
      message: "All indexed courses have a documented research status.",
      faculty: null,
      courses: [],
      remainingUnreviewed: 0,
    };
  }

  const unreviewed = (groups.get(selectedFaculty) || []).filter(
    (course) => course.researchStatus === "unreviewed"
  );
  const courses = batchSize ? unreviewed.slice(0, batchSize) : unreviewed;
  const remainingUnreviewed = (manifest.courses || []).filter(
    (course) => course.researchStatus === "unreviewed"
  ).length;

  return {
    status: "awaiting_research",
    message: "Research this batch and record findings in audit/faculty-reports before running the runner again.",
    faculty: selectedFaculty,
    courses: courses.map((course) => ({
      course: course.course,
      title: course.title,
      file: course.file,
      structuralStatus: course.structuralStatus,
      structuralIssues: course.structuralIssues,
    })),
    remainingUnreviewed,
    researchGate: [
      "Use primary or otherwise appropriate sources and record canonical URLs.",
      "Write factual findings and exact actions; do not infer verification from structural_pass.",
      "Do not edit course content as part of this planning step.",
      "Regenerate the manifest and run CI/eval after the report is complete.",
    ],
  };
}

function getManifestSnapshot(manifest) {
  const rows = manifest.courses || [];
  const digest = crypto
    .createHash("sha256")
    .update(JSON.stringify(rows))
    .digest("hex");
  return {
    catalogVersion: manifest.catalogVersion,
    totalCourses: manifest.totalCourses,
    researchUnreviewed: manifest.summary?.researchUnreviewed ?? null,
    structuralReview: manifest.summary?.structuralReview ?? null,
    courseRowsSha256: digest,
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage());
    return;
  }

  if (args.status) {
    if (!fs.existsSync(CHECKPOINT_FILE)) {
      const result = { status: "no_checkpoint", message: "No audit checkpoint exists yet." };
      console.log(args.json ? JSON.stringify(result, null, 2) : result.message);
      return;
    }
    let checkpoint;
    try {
      checkpoint = readJson(CHECKPOINT_FILE);
    } catch (error) {
      throw new Error(`Invalid audit checkpoint; rerun npm run audit:loop to regenerate it (${error.message})`);
    }
    if (
      checkpoint.schemaVersion !== "1.0.0" ||
      !["awaiting_research", "complete"].includes(checkpoint.status) ||
      !Array.isArray(checkpoint.courses) ||
      !checkpoint.manifestSnapshot ||
      !/^[a-f0-9]{64}$/.test(checkpoint.manifestSnapshot.courseRowsSha256 || "") ||
      !Number.isInteger(checkpoint.remainingUnreviewed) ||
      checkpoint.remainingUnreviewed < 0
    ) {
      throw new Error("Invalid audit checkpoint shape; rerun npm run audit:loop to regenerate it");
    }
    if (!fs.existsSync(MANIFEST_FILE)) {
      throw new Error("Audit manifest is missing; run npm run audit:loop to regenerate it");
    }
    const manifest = readJson(MANIFEST_FILE);
    const currentSnapshot = getManifestSnapshot(manifest);
    const stale = JSON.stringify(currentSnapshot) !== JSON.stringify(checkpoint.manifestSnapshot);
    const output = {
      ...checkpoint,
      checkpointStatus: stale ? "stale" : "current",
      currentManifestSnapshot: currentSnapshot,
    };
    console.log(args.json ? JSON.stringify(output, null, 2) : formatHuman(output));
    return;
  }

  runManifestGenerator(args.date);
  const manifest = readJson(MANIFEST_FILE);
  const plan = buildPlan(manifest, args.batchSize);
  const checkpoint = {
    schemaVersion: "1.0.0",
    generatedAt: manifest.generatedAt,
    catalogVersion: manifest.catalogVersion,
    manifestSnapshot: getManifestSnapshot(manifest),
    policy: {
      evidenceOnly: true,
      courseContentWasModified: false,
      automatedPassIsNotEditorialApproval: true,
    },
    ...plan,
  };
  writeJson(CHECKPOINT_FILE, checkpoint);
  console.log(args.json ? JSON.stringify(checkpoint, null, 2) : formatHuman(checkpoint));
}

function formatHuman(checkpoint) {
  if (checkpoint.status === "complete") return `✅ Audit queue complete: ${checkpoint.message}`;
  if (checkpoint.status === "no_checkpoint") return checkpoint.message;
  if (checkpoint.checkpointStatus === "stale") {
    return `⚠️ Audit checkpoint is stale; run npm run audit:loop to refresh it.`;
  }
  const courses = checkpoint.courses.map((course) => `- ${course.course}: ${course.title}`).join("\n");
  return [
    `⏸️ Audit paused at research gate: ${checkpoint.faculty}`,
    `Courses (${checkpoint.courses.length}):`,
    courses,
    `Unreviewed remaining: ${checkpoint.remainingUnreviewed}`,
    "Next: complete the faculty report, then run `npm run audit:loop` again.",
    "No course content was modified.",
  ].join("\n");
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(`Audit runner failed: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { PRIORITY, buildPlan, getManifestSnapshot, parseArgs };
