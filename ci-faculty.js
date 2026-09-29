#!/usr/bin/env node

/**
 * ci-faculty.js — ICIL New Faculty CI Validator
 *
 * Validates the complete contract for adding a faculty. In pull-request mode
 * it compares index.json with a base commit and only enforces the context-doc
 * checklist when a genuinely new faculty is detected.
 *
 * Usage:
 *   node ci-faculty.js --base <commit>  # PR/push mode; detect added faculties
 *   node ci-faculty.js --faculty <slug> # Validate one faculty locally
 *   node ci-faculty.js --all            # Validate every faculty locally
 */

const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const ROOT = __dirname;
const core = require("./campus-core");
const { validateExpectedCourses } = require("./eval-runner");

const REQUIRED_CONTEXT_DOCS = [
  "AGENTS.md",
  "README.md",
  "CAMPUS-OVERVIEW.md",
  "CONTEXT.md",
  "PROGRESS-REPORT.md",
  "CHANGELOG.md",
  "index.md",
  "package.json",
];

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, file), "utf8"));
}

function git(command, args) {
  try {
    return cp.execFileSync(command, args, {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch (error) {
    throw new Error(`git ${args.join(" ")} failed: ${error.stderr?.trim() || error.message}`);
  }
}

function exists(relativePath) {
  return fs.existsSync(path.join(ROOT, relativePath));
}

function addError(errors, message) {
  errors.push(message);
}

function buildCourseRefs(index) {
  const refs = new Set();
  for (const [slug, faculty] of Object.entries(index.faculties || {})) {
    for (const course of faculty.courses || []) refs.add(`${slug}/${course.id}`);
  }
  return refs;
}

function validateFacultyFiles(index, slug, errors) {
  const faculty = index.faculties?.[slug];
  if (!faculty) return;

  const facultyDir = slug;
  if (!exists(facultyDir)) {
    addError(errors, `${slug}: faculty directory is missing`);
    return;
  }
  if (!exists(`${slug}/README.md`)) addError(errors, `${slug}: README.md is missing`);
  if (!Array.isArray(faculty.courses) || faculty.courses.length === 0) {
    addError(errors, `${slug}: courses must be a non-empty array`);
    return;
  }

  const ids = new Set();
  for (const course of faculty.courses) {
    if (!course || typeof course !== "object") {
      addError(errors, `${slug}: every course entry must be an object`);
      continue;
    }
    const label = `${slug}/${course.id || "?"}`;
    if (ids.has(course.id)) addError(errors, `${label}: duplicate course ID`);
    ids.add(course.id);

    if (!/^[0-9]{2}$/.test(String(course.id))) {
      addError(errors, `${label}: course ID must use two digits`);
    }
    for (const field of ["id", "title", "level", "file", "prerequisites", "topics"]) {
      if (!(field in course)) addError(errors, `${label}: missing metadata field ${field}`);
    }
    const normalizedCourseFile = typeof course.file === "string"
      ? path.posix.normalize(course.file.replace(/\\/g, "/"))
      : "";
    if (
      !normalizedCourseFile.startsWith(`${slug}/`) ||
      normalizedCourseFile.split("/").includes("..")
    ) {
      addError(errors, `${label}: file must be inside ${slug}/`);
    } else if (!exists(normalizedCourseFile)) {
      addError(errors, `${label}: course file is missing (${course.file})`);
    } else {
      const content = fs.readFileSync(path.join(ROOT, course.file), "utf8");
      if (!content.trim().startsWith("#")) addError(errors, `${label}: course file has no Markdown heading`);
      validateMarkdownLinks(course.file, content, errors);
      validateQualifiedRefs(course.file, content, buildCourseRefs(index), errors);
    }
  }

  const readme = `${slug}/README.md`;
  if (exists(readme)) {
    const content = fs.readFileSync(path.join(ROOT, readme), "utf8");
    validateMarkdownLinks(readme, content, errors);
    validateQualifiedRefs(readme, content, buildCourseRefs(index), errors);
    for (const course of faculty.courses) {
      const expectedLink = `./${path.basename(course.file)}`;
      if (!content.includes(expectedLink)) {
        addError(errors, `${readme}: missing course link ${expectedLink}`);
      }
    }
  }
}

function validateMarkdownLinks(sourceFile, content, errors) {
  const sourceDir = path.dirname(sourceFile);
  const linkPattern = /!?\[[^\]]*\]\(([^)]+)\)/g;
  let match;
  while ((match = linkPattern.exec(content)) !== null) {
    let target = match[1].trim().split(/[?#]/, 1)[0];
    if (!target || /^(https?:|mailto:|#|data:)/i.test(target)) continue;
    target = target.replace(/^<|>$/g, "");
    const resolved = path.normalize(path.join(sourceDir, target)).replace(/\\/g, "/");
    if (resolved.startsWith("../") || !exists(resolved)) {
      addError(errors, `${sourceFile}: broken Markdown link ${target}`);
    }
  }
}

function validateQualifiedRefs(sourceFile, content, validRefs, errors) {
  const facultyPattern = [...new Set([...validRefs].map((ref) => ref.split("/")[0]))]
    .sort((a, b) => b.length - a.length)
    .map((slug) => slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  if (!facultyPattern) return;
  const refPattern = new RegExp(`\\b(${facultyPattern})/(\\d{2})\\b`, "g");
  let match;
  while ((match = refPattern.exec(content)) !== null) {
    const ref = `${match[1]}/${match[2]}`;
    if (!validRefs.has(ref)) addError(errors, `${sourceFile}: broken course reference ${ref}`);
  }
}

function validateMetadata(index, evalSet, slug, errors) {
  const faculty = index.faculties?.[slug];
  if (!faculty) {
    addError(errors, `index.json: missing faculty entry for ${slug}`);
    return;
  }

  for (const field of ["name", "courseCount", "level", "description", "courses", "emoji"]) {
    if (!(field in faculty)) addError(errors, `index.json: ${slug} missing field ${field}`);
  }
  if (!Array.isArray(faculty.courses)) {
    addError(errors, `index.json: ${slug}.courses must be an array`);
    return;
  }
  if (faculty.courseCount !== faculty.courses.length) {
    addError(errors, `index.json: ${slug}.courseCount does not equal courses.length`);
  }

  const trigger = index.auto_router?.trigger_keywords?.[slug];
  if (!trigger) {
    addError(errors, `index.json: missing auto_router.trigger_keywords.${slug}`);
  } else {
    if (!Array.isArray(trigger.recommended_courses) || trigger.recommended_courses.length === 0) {
      addError(errors, `index.json: ${slug} needs recommended_courses`);
    }
    const ids = new Set(faculty.courses.map((course) => course.id));
    for (const id of trigger.recommended_courses || []) {
      if (!ids.has(id)) addError(errors, `index.json: ${slug} recommends unknown course ${id}`);
    }
    const keywords = trigger.keywords || {};
    if (!Object.values(keywords).some((tier) => tier && Object.keys(tier).length > 0)) {
      addError(errors, `index.json: ${slug} needs at least one trigger keyword`);
    }
    for (const [tier, entries] of Object.entries(keywords)) {
      for (const [keyword, courseIds] of Object.entries(entries || {})) {
        if (!Array.isArray(courseIds) && courseIds !== "any") {
          addError(errors, `index.json: ${slug} keyword '${keyword}' has invalid ${tier} course IDs`);
        }
        for (const id of Array.isArray(courseIds) ? courseIds : []) {
          if (!ids.has(id)) addError(errors, `index.json: ${slug} keyword '${keyword}' maps to unknown course ${id}`);
        }
      }
    }
  }

  const totalCourses = Object.values(index.faculties).reduce(
    (total, item) => total + (item?.courses?.length || 0),
    0
  );
  if (index.totalCourses !== totalCourses) {
    addError(errors, `index.json: totalCourses=${index.totalCourses}, actual=${totalCourses}`);
  }
  const pkg = readJson("package.json");
  if (pkg.version !== index.version) {
    addError(errors, `package.json: version ${pkg.version} does not match index.json ${index.version}`);
  }
  const facultyCount = Object.keys(index.faculties || {}).length;
  if (!String(pkg.description).includes(`${totalCourses} courses`) || !String(pkg.description).includes(`${facultyCount} faculties`)) {
    addError(errors, "package.json: description does not contain current course/faculty counts");
  }
  if (evalSet.faculties_covered !== Object.keys(index.faculties).length) {
    addError(errors, `eval-set.json: faculties_covered is stale`);
  }
  if (evalSet.total_prompts !== evalSet.prompts.length) {
    addError(errors, `eval-set.json: total_prompts is stale`);
  }
}

function validateGlobalKeywords(index, errors) {
  const high = new Map();
  for (const [slug, data] of Object.entries(index.auto_router?.trigger_keywords || {})) {
    for (const keyword of Object.keys(data.keywords?.high || {})) {
      const normalized = keyword.toLowerCase().trim();
      if (!high.has(normalized)) high.set(normalized, []);
      high.get(normalized).push(slug);
    }
  }
  for (const [keyword, slugs] of high.entries()) {
    if (slugs.length > 1) addError(errors, `duplicate HIGH keyword '${keyword}' across ${slugs.join(", ")}`);
  }
}

function validateEval(index, evalSet, slug, errors, options = {}) {
  const strictCoverage = options.strictCoverage === true;
  const strictCourseCoverage = options.strictCourseCoverage === true;
  const facultyByFile = new Map();
  for (const [facultySlug, faculty] of Object.entries(index.faculties || {})) {
    for (const course of faculty.courses || []) facultyByFile.set(course.file, facultySlug);
  }
  if (evalSet.course_ref_format !== "faculty-slug/XX") {
    addError(errors, `eval-set.json: course_ref_format must be faculty-slug/XX`);
  }
  const validRefs = buildCourseRefs(index);
  let facultyPromptCount = 0;
  let routedFacultyPrompts = 0;
  let routedCoursePrompts = 0;
  for (const prompt of evalSet.prompts || []) {
    if (!Array.isArray(prompt.expected_faculties) || !Array.isArray(prompt.expected_courses)) {
      addError(errors, `${prompt.id}: expected_faculties and expected_courses must be arrays`);
      continue;
    }
    for (const ref of prompt.expected_courses) {
      if (!validRefs.has(ref)) addError(errors, `${prompt.id}: invalid expected course ${ref}`);
      const refFaculty = String(ref).split("/")[0];
      if (!prompt.expected_faculties.includes(refFaculty)) {
        addError(errors, `${prompt.id}: ${ref} is not in expected_faculties`);
      }
    }
    if (prompt.expected_faculties.includes(slug)) {
      facultyPromptCount++;
      if (!strictCoverage) continue;

      const expectedCourses = prompt.expected_courses.filter((ref) => ref.startsWith(`${slug}/`));
      const routerResults = core.matchKeywords(index, prompt.prompt);
      const returnedFaculties = new Set(routerResults.map((result) => result.faculty));
      const returnedCourses = new Set(
        routerResults.flatMap((result) =>
          result.courses.map((course) => {
            const facultySlug =
              course.faculty || facultyByFile.get(course.file) || result.faculty;
            return `${facultySlug}/${course.id}`;
          })
        )
      );
      if (!returnedFaculties.has(slug)) {
        addError(errors, `${prompt.id}: router does not return expected faculty ${slug}`);
      } else {
        routedFacultyPrompts++;
      }
      if (strictCourseCoverage) {
        for (const ref of expectedCourses) {
          if (!returnedCourses.has(ref)) {
            addError(errors, `${prompt.id}: router does not return expected course ${ref}`);
          }
        }
      }
      // Course-level misses are informational for existing faculties because
      // prerequisite loading and recommendation caps can legitimately alter
      // the returned set. New-faculty PRs opt into strict coverage below.
      if (expectedCourses.some((ref) => returnedCourses.has(ref))) {
        routedCoursePrompts++;
      }
    }
  }
  if (strictCoverage && facultyPromptCount === 0) {
    addError(errors, `eval-set.json: no prompt covers new faculty ${slug}`);
  }
  if (strictCoverage && facultyPromptCount > 0 && routedFacultyPrompts === 0) {
    addError(errors, `eval-set.json: router does not return new faculty ${slug} for any labeled prompt`);
  }
  if (strictCoverage && facultyPromptCount > 0 && routedCoursePrompts === 0) {
    addError(errors, `eval-set.json: router returns no complete expected-course set for new faculty ${slug}`);
  }
}

function validateContextDocs(slug, currentIndex, changedFiles, errors, options = {}) {
  const requireMentions = options.requireMentions === true;
  for (const file of REQUIRED_CONTEXT_DOCS) {
    if (!exists(file)) {
      addError(errors, `context: required document is missing (${file})`);
      continue;
    }
    if (changedFiles && !changedFiles.has(file)) {
      addError(errors, `context: ${file} must be updated when adding ${slug}`);
    }
    if (requireMentions && file !== "package.json") {
      const content = fs.readFileSync(path.join(ROOT, file), "utf8");
      if (!content.includes(slug)) addError(errors, `context: ${file} does not mention ${slug}`);
    }
  }

  const pkg = readJson("package.json");
  if (!pkg.files?.includes(`${slug}/`)) {
    addError(errors, `package.json: files must include ${slug}/`);
  }
  validateMarkdownLinks("README.md", fs.readFileSync(path.join(ROOT, "README.md"), "utf8"), errors);
  validateMarkdownLinks("CONTEXT.md", fs.readFileSync(path.join(ROOT, "CONTEXT.md"), "utf8"), errors);
  validateMarkdownLinks("CAMPUS-OVERVIEW.md", fs.readFileSync(path.join(ROOT, "CAMPUS-OVERVIEW.md"), "utf8"), errors);
  validateQualifiedRefs("README.md", fs.readFileSync(path.join(ROOT, "README.md"), "utf8"), buildCourseRefs(currentIndex), errors);
}

function loadBaseIndex(base) {
  if (!base) return null;
  try {
    return JSON.parse(git("git", ["show", `${base}:index.json`]));
  } catch (error) {
    throw new Error(`cannot load base index.json for ${base}: ${error.message}`);
  }
}

function changedFiles(base) {
  if (!base) return null;
  const output = git("git", ["diff", "--name-only", `${base}...HEAD`]);
  return new Set(output ? output.split(/\r?\n/).filter(Boolean) : []);
}

function detectAddedFaculties(index, baseIndex, files) {
  if (baseIndex) {
    return Object.keys(index.faculties).filter((slug) => !baseIndex.faculties?.[slug]);
  }
  if (files) {
    return [...new Set(
      [...files]
        .map((file) => file.split(/[\\/]/)[0])
        .filter((slug) => index.faculties?.[slug])
    )];
  }
  return [];
}

function main() {
  const args = process.argv.slice(2);
  const valueAfter = (flag) => {
    const index = args.indexOf(flag);
    return index >= 0 ? args[index + 1] : null;
  };
  const baseArgIndex = args.indexOf("--base");
  const base = baseArgIndex >= 0 ? args[baseArgIndex + 1] : null;
  if (baseArgIndex >= 0 && !base) {
    console.error("Faculty CI: --base requires a commit or branch ref");
    process.exitCode = 1;
    return;
  }
  const baseIndex = loadBaseIndex(base);
  const files = changedFiles(base);
  const index = readJson("index.json");
  const evalSet = readJson("eval-set.json");
  const evalSchemaErrors = validateExpectedCourses(index, evalSet);
  const explicitFaculty = valueAfter("--faculty");
  const explicitMode = args.includes("--faculty");
  if (explicitMode && !explicitFaculty) {
    console.error("Faculty CI: --faculty requires a faculty slug");
    process.exitCode = 1;
    return;
  }
  const changedFacultyDirs = files
    ? [...files]
        .filter((file) => /^[^/]+\/(README\.md|[0-9]{2}-[^/]+\.md)$/.test(file))
        .map((file) => file.split(/[\\/]/)[0])
        .filter((slug) => ![".github", "archive", "node_modules"].includes(slug))
        .filter((slug, index, all) => slug && all.indexOf(slug) === index)
    : [];
  const unindexedChangedDirs = changedFacultyDirs.filter((slug) => !index.faculties?.[slug]);
  const targets = explicitFaculty
    ? [explicitFaculty]
    : args.includes("--all")
      ? Object.keys(index.faculties)
      : detectAddedFaculties(index, baseIndex, files);

  if (targets.length === 0 && unindexedChangedDirs.length === 0) {
    console.log("Faculty CI: no new faculty detected; dedicated checks skipped.");
    return;
  }

  const errors = [
    ...evalSchemaErrors.map((error) => `eval-set.json: ${error}`),
    ...unindexedChangedDirs.map(
      (slug) => `changed faculty directory ${slug} is not registered in index.json`
    ),
  ];
  validateGlobalKeywords(index, errors);
  const currentFiles = files || new Set();
  for (const slug of targets) {
    if (!index.faculties[slug]) {
      addError(errors, `target faculty ${slug} is not present in index.json`);
      continue;
    }
    const isAddedFaculty = !baseIndex || !baseIndex.faculties?.[slug];
    validateFacultyFiles(index, slug, errors);
    validateMetadata(index, evalSet, slug, errors);
    validateEval(index, evalSet, slug, errors, {
      strictCoverage: explicitMode || (isAddedFaculty && Boolean(baseIndex)),
      // Explicit mode validates an existing faculty's structure/routing; only
      // a PR-detected addition makes course-level routing a hard requirement.
      strictCourseCoverage: isAddedFaculty && Boolean(baseIndex),
    });
    validateContextDocs(
      slug,
      index,
      baseIndex && isAddedFaculty && !args.includes("--all") ? currentFiles : null,
      errors,
      { requireMentions: (explicitMode || (isAddedFaculty && Boolean(baseIndex))) && !args.includes("--all") }
    );
  }

  if (errors.length > 0) {
    console.error(`Faculty CI: FAILED (${errors.length} issue${errors.length === 1 ? "" : "s"})`);
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
    return;
  }
  console.log(`Faculty CI: PASSED (${targets.join(", ")})`);
}

if (require.main === module) main();

module.exports = {
  detectAddedFaculties,
  validateFacultyFiles,
  validateMetadata,
  validateEval,
  validateContextDocs,
};
