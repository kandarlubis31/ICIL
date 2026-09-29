#!/usr/bin/env node

/**
 * Generate the structural baseline for the ICIL content audit.
 *
 * Usage:
 *   node audit/generate-manifest.js
 *   node audit/generate-manifest.js --date 2026-08-01
 *
 * The output is intentionally separate from index.json and course content.
 * Existing research fields are preserved by faculty-qualified course ID.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUTPUT_FILE = path.join(__dirname, "audit-manifest.json");

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function isValidDate(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(`${date}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
}

function getAuditDate() {
  const dateFlag = process.argv.indexOf("--date");
  if (dateFlag >= 0 && !process.argv[dateFlag + 1]) {
    throw new Error("Audit date flag requires YYYY-MM-DD");
  }
  const requestedDate = dateFlag >= 0 ? process.argv[dateFlag + 1] : process.env.AUDIT_DATE;
  const date = requestedDate || new Date().toISOString().slice(0, 10);
  if (!isValidDate(date)) {
    throw new Error(`Audit date must use a real YYYY-MM-DD date (received: ${date})`);
  }
  return date;
}

function countWords(content) {
  return content.trim().split(/\s+/).filter(Boolean).length;
}

function loadPreviousRows() {
  if (!fs.existsSync(OUTPUT_FILE)) return new Map();
  try {
    const previous = JSON.parse(fs.readFileSync(OUTPUT_FILE, "utf8"));
    return new Map((previous.courses || []).map((course) => [course.course, course]));
  } catch (error) {
    throw new Error(`Cannot preserve previous manifest: ${error.message}`);
  }
}

const RESEARCH_STATUSES = new Set([
  "unreviewed",
  "verified",
  "verified_with_notes",
  "needs_sources",
  "needs_update",
  "structural_fix",
  "major_rewrite",
  "deprecated",
]);
const SOURCE_TIERS = new Set(["primary", "expert_secondary", "community"]);
const ROUTING_IMPACTS = new Set(["none", "inspect", "regression-required"]);

function validateResearchCourse(reportFile, report, course, seen, globalSeen, validCourseRefs) {
  if (!course || typeof course !== "object") {
    throw new Error(`${reportFile}: every courses entry must be an object`);
  }
  if (!/^[a-z0-9-]+\/[0-9]{2}$/.test(course.course || "") || !validCourseRefs.has(course.course)) {
    throw new Error(`${reportFile}: unknown or invalid course key '${course.course}'`);
  }
  const courseFaculty = course.course.split("/")[0];
  if (report.faculty !== courseFaculty) {
    throw new Error(`${reportFile}: ${course.course} does not belong to report faculty '${report.faculty}'`);
  }
  if (seen.has(course.course)) {
    throw new Error(`${reportFile}: duplicate course key '${course.course}'`);
  }
  if (globalSeen.has(course.course)) {
    throw new Error(`${reportFile}: course key '${course.course}' is duplicated across audit reports`);
  }
  seen.add(course.course);
  globalSeen.add(course.course);

  if (!RESEARCH_STATUSES.has(course.status || "unreviewed")) {
    throw new Error(`${reportFile}: invalid status for ${course.course}`);
  }
  if (!Array.isArray(course.sourceTier) || course.sourceTier.some((tier) => !SOURCE_TIERS.has(tier))) {
    throw new Error(`${reportFile}: invalid sourceTier for ${course.course}`);
  }
  if (!Array.isArray(course.sources)) {
    throw new Error(`${reportFile}: sources must be an array for ${course.course}`);
  }
  for (const source of course.sources) {
    let validUrl = false;
    if (source && typeof source.name === "string" && typeof source.url === "string") {
      try {
        const parsed = new URL(source.url);
        validUrl = parsed.protocol === "http:" || parsed.protocol === "https:";
      } catch {
        validUrl = false;
      }
    }
    if (!validUrl) {
      throw new Error(`${reportFile}: every source for ${course.course} needs a valid http(s) URL`);
    }
  }
  if (!ROUTING_IMPACTS.has(course.routingImpact || "inspect")) {
    throw new Error(`${reportFile}: invalid routingImpact for ${course.course}`);
  }
}

function loadResearchReviews(index) {
  const validCourseRefs = new Set(
    Object.entries(index.faculties || {}).flatMap(([faculty, data]) =>
      (data.courses || []).map((course) => `${faculty}/${course.id}`)
    )
  );
  const reviewsDir = path.join(__dirname, "faculty-reports");
  const reviews = new Map();
  if (!fs.existsSync(reviewsDir)) return reviews;

  const globalSeen = new Set();
  for (const file of fs.readdirSync(reviewsDir).filter((name) => name.endsWith(".json"))) {
    const reportFile = path.join("audit", "faculty-reports", file);
    const report = JSON.parse(fs.readFileSync(path.join(reviewsDir, file), "utf8"));
    const reportFaculty = file.slice(0, -5);
    if (report.faculty !== reportFaculty) {
      throw new Error(`${reportFile}: faculty '${report.faculty}' does not match filename`);
    }
    for (const dateField of ["reviewedAt", "researchCutoff"]) {
      if (!isValidDate(report[dateField])) {
        throw new Error(`${reportFile}: ${dateField} must use a real YYYY-MM-DD date`);
      }
    }
    const seen = new Set();
    for (const course of report.courses || []) {
      validateResearchCourse(reportFile, report, course, seen, globalSeen, validCourseRefs);
      reviews.set(course.course, {
        researchStatus: course.status || "unreviewed",
        reviewedAt: report.reviewedAt || null,
        researchCutoff: report.researchCutoff || null,
        sourceTier: course.sourceTier || [],
        sources: course.sources || [],
        findings: course.findings || [],
        actions: course.actions || [],
        routingImpact: course.routingImpact || "inspect",
      });
    }
  }
  return reviews;
}

function researchFields(previous, review) {
  const fields = review || previous || {};
  return {
    researchStatus: fields.researchStatus || fields.status || "unreviewed",
    reviewedAt: fields.reviewedAt || null,
    researchCutoff: fields.researchCutoff || null,
    sourceTier: fields.sourceTier || [],
    sources: fields.sources || [],
    findings: fields.findings || [],
    actions: fields.actions || [],
    routingImpact: fields.routingImpact || "inspect",
  };
}

function buildMissingRow(faculty, course, previous, review) {
  return {
    course: `${faculty}/${course.id}`,
    faculty,
    id: course.id,
    title: course.title,
    file: course.file,
    level: course.level,
    prerequisites: course.prerequisites || [],
    topics: course.topics || [],
    wordCount: 0,
    signals: {
      source: false,
      checklist: false,
      crossReference: false,
      fencesBalanced: true,
      placeholder: false,
    },
    structuralStatus: "missing_file",
    structuralIssues: ["missing_file"],
    ...researchFields(previous, review),
  };
}

function buildRow(faculty, course, previous, review) {
  const absoluteFile = path.join(ROOT, course.file);
  if (!fs.existsSync(absoluteFile)) return buildMissingRow(faculty, course, previous, review);

  const content = fs.readFileSync(absoluteFile, "utf8");
  const fences = (content.match(/^```/gm) || []).length;
  const issues = [];
  const sourceSignal = /\*\*Sources?:|\*\*References?:|Further Reading|Bibliography/i.test(content);
  const checklistSignal = /Action Checklist|Actionable Checklist/i.test(content);
  const crossReferenceSignal = /ICIL Cross-Ref/i.test(content);
  const placeholderSignal = /\b(?:TODO|TBD|FIXME|coming soon|lorem ipsum)\b/i.test(content);
  const wordCount = countWords(content);

  if (!/^# /m.test(content)) issues.push("missing_heading");
  if (!/^>.*(?:Level|Prereq|Prerequisite)/mi.test(content)) issues.push("missing_metadata");
  if (fences % 2 !== 0) issues.push("unbalanced_fences");
  if (placeholderSignal) issues.push("placeholder");
  if (wordCount < 200) issues.push("too_short");
  if (wordCount > 1200) issues.push("too_long");
  if (!checklistSignal) issues.push("missing_checklist");

  return {
    course: `${faculty}/${course.id}`,
    faculty,
    id: course.id,
    title: course.title,
    file: course.file,
    level: course.level,
    prerequisites: course.prerequisites || [],
    topics: course.topics || [],
    wordCount,
    signals: {
      source: sourceSignal,
      checklist: checklistSignal,
      crossReference: crossReferenceSignal,
      fencesBalanced: fences % 2 === 0,
      placeholder: placeholderSignal,
    },
    structuralStatus: issues.length === 0 ? "structural_pass" : "structural_review",
    structuralIssues: issues,
    ...researchFields(previous, review),
  };
}

function main() {
  const auditDate = getAuditDate();
  const index = JSON.parse(read("index.json"));
  const previousRows = loadPreviousRows();
  const researchReviews = loadResearchReviews(index);
  const courses = [];

  for (const [faculty, data] of Object.entries(index.faculties || {})) {
    for (const course of data.courses || []) {
      const key = `${faculty}/${course.id}`;
      courses.push(buildRow(faculty, course, previousRows.get(key), researchReviews.get(key)));
    }
  }

  const manifest = {
    schemaVersion: "1.0.0",
    generatedAt: auditDate,
    catalogVersion: index.version,
    totalFaculties: Object.keys(index.faculties || {}).length,
    totalCourses: courses.length,
    sourceOfTruth: "index.json",
    policy: {
      automatedPassIsNotEditorialApproval: true,
      courseContentWasModified: false,
      researchStatusMustBeDocumentedBeforeVerification: true,
      regenerationPreservesResearchFields: true,
    },
    summary: {
      structuralPass: courses.filter((course) => course.structuralStatus === "structural_pass").length,
      structuralReview: courses.filter((course) => course.structuralStatus === "structural_review").length,
      missingFile: courses.filter((course) => course.structuralStatus === "missing_file").length,
      researchUnreviewed: courses.filter((course) => course.researchStatus === "unreviewed").length,
      sourceSignalPresent: courses.filter((course) => course.signals.source).length,
      checklistSignalPresent: courses.filter((course) => course.signals.checklist).length,
      crossReferenceSignalPresent: courses.filter((course) => course.signals.crossReference).length,
    },
    courses,
  };

  fs.writeFileSync(OUTPUT_FILE, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Wrote ${path.relative(ROOT, OUTPUT_FILE)} (${courses.length} courses)`);
  console.log(JSON.stringify(manifest.summary, null, 2));
}

if (require.main === module) main();

module.exports = { buildRow, countWords, getAuditDate, isValidDate, loadResearchReviews };
