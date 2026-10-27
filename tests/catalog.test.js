const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const core = require("../campus-core");
const { validateExpectedCourses } = require("../eval-runner");

const index = core.loadIndex();
const packageJson = require("../package.json");
const evalSet = require("../eval-set.json");

test("index totals match the actual catalog", () => {
  const faculties = Object.entries(index.faculties);
  const courses = faculties.flatMap(([, faculty]) => faculty.courses);

  assert.equal(faculties.length, 32);
  assert.equal(courses.length, index.totalCourses);
  assert.equal(courses.length, 243);
  assert.equal(packageJson.version, index.version);
});

test("every faculty has a README and every course file exists under its faculty", () => {
  const missing = [];

  for (const [slug, faculty] of Object.entries(index.faculties)) {
    const readme = path.join(core.CAMPUS_ROOT, slug, "README.md");
    if (!fs.existsSync(readme)) missing.push(`${slug}/README.md`);

    const ids = new Set();
    for (const course of faculty.courses) {
      if (ids.has(course.id)) missing.push(`${slug}/${course.id}: duplicate id`);
      ids.add(course.id);

      if (!course.file.startsWith(`${slug}/`)) {
        missing.push(`${slug}/${course.id}: file is outside its faculty (${course.file})`);
      }
      if (!fs.existsSync(path.join(core.CAMPUS_ROOT, course.file))) {
        missing.push(course.file);
      }
    }
  }

  assert.deepEqual(missing, []);
});

test("package.json ships every faculty and the security policy", () => {
  const required = [
    "campus-core.js",
    "load-context.js",
    "mcp-server.js",
    "index.json",
    "SECURITY.md",
  ];
  for (const file of required) {
    assert.ok(packageJson.files.includes(file), `files[] is missing ${file}`);
  }
  for (const slug of Object.keys(index.faculties)) {
    assert.ok(packageJson.files.includes(`${slug}/`), `files[] is missing ${slug}/`);
  }
  assert.equal(packageJson.scripts.test, "node --test");
  assert.ok(packageJson.scripts["mcp:smoke"]);
});

test("flattenCourseResults deduplicates and ranks direct matches first", () => {
  const results = core.matchKeywords(index, "build an accessible landing page");
  assert.ok(results.length > 0, "expected at least one matching faculty");

  const flattened = core.flattenCourseResults(results);
  const keys = flattened.map((course) => `${course.faculty}/${course.id}`);
  assert.equal(new Set(keys).size, keys.length, "flattened list contains duplicates");

  const directCount = flattened.filter((course) => course.isDirect).length;
  assert.ok(directCount > 0, "expected at least one direct match");
  for (let i = 1; i < flattened.length; i++) {
    if (flattened[i - 1].isDirect === false) {
      assert.equal(flattened[i].isDirect, false, "a direct match appeared after a prerequisite");
    }
  }
});

test("matchKeywords stays within the per-faculty course cap", () => {
  const cap = index.auto_router.loading_strategy.max_courses_per_faculty || 5;
  for (const prompt of [
    "build an accessible landing page",
    "improve security against XSS",
    "design a mobile checkout flow",
  ]) {
    const results = core.matchKeywords(index, prompt);
    assert.ok(results.length > 0, `no results for: ${prompt}`);
    for (const result of results) {
      assert.ok(result.courses.length <= cap, `${result.faculty} exceeded cap`);
      assert.ok(result.courses.some((course) => course.isDirect));
    }
  }
});

test("toxic generic keywords never return as exact match keys", () => {
  const banned = new Set(["explain", "jakarta", "light", "check", "cek"]);
  const found = [];

  for (const [slug, group] of Object.entries(index.auto_router.trigger_keywords)) {
    for (const tier of ["high", "medium", "low"]) {
      for (const keyword of Object.keys(group.keywords?.[tier] || {})) {
        if (banned.has(keyword.toLowerCase())) found.push(`${slug}:${tier}:${keyword}`);
      }
    }
  }

  assert.deepEqual(found, []);
});

test("eval set references only real courses and clean abstention prompts", () => {
  assert.deepEqual(validateExpectedCourses(index, evalSet), []);
  assert.equal(evalSet.total_prompts, evalSet.prompts.length);
  assert.equal(evalSet.total_abstention_prompts, evalSet.abstention_prompts.length);

  for (const prompt of evalSet.abstention_prompts) {
    assert.equal(prompt.expect_no_match, true);
    assert.deepEqual(prompt.expected_faculties, []);
    assert.deepEqual(prompt.expected_courses, []);
  }
});

test("every faculty README course table matches index.json", () => {
  // Table rows follow the shared template: | NN | [Title](./file.md) | ... |
  const rowPattern = /\| *\d+ *\| *\[[^\]]+\]\(\.\/([^)]+\.md)\)/g;
  const problems = [];

  for (const [slug, faculty] of Object.entries(index.faculties)) {
    const readme = fs.readFileSync(path.join(core.CAMPUS_ROOT, slug, "README.md"), "utf8");
    const readmeFiles = new Set();
    let row;
    while ((row = rowPattern.exec(readme))) readmeFiles.add(row[1]);

    const indexedFiles = faculty.courses.map((c) => c.file.split("/")[1]);
    for (const file of indexedFiles) {
      if (!readmeFiles.has(file)) problems.push(`${slug}/README.md: missing course file ${file}`);
    }
    for (const file of readmeFiles) {
      if (!indexedFiles.includes(file)) {
        problems.push(`${slug}/README.md: lists ${file} which is not in index.json`);
      }
    }
  }

  assert.deepEqual(problems, []);
});

test("root docs advertise the current version, catalog size, and dependencies", () => {
  const docs = [
    "README.md",
    "AGENTS.md",
    "CONTEXT.md",
    "CAMPUS-OVERVIEW.md",
    "index.md",
    "PROGRESS-REPORT.md",
  ];
  const facultyCount = Object.keys(index.faculties).length;
  const dependencyCount = Object.keys(packageJson.dependencies || {}).length;

  for (const doc of docs) {
    const text = fs.readFileSync(path.join(core.CAMPUS_ROOT, doc), "utf8");

    assert.ok(
      text.includes(index.version),
      `${doc} does not mention the current version (${index.version})`
    );
    assert.ok(
      text.includes(String(index.totalCourses)),
      `${doc} does not mention the current course count (${index.totalCourses})`
    );
    assert.ok(
      text.includes(String(facultyCount)),
      `${doc} does not mention the current faculty count (${facultyCount})`
    );
    if (dependencyCount > 0) {
      assert.ok(
        !/zero dependencies/i.test(text),
        `${doc} claims zero dependencies, but package.json declares ${dependencyCount}`
      );
    }
  }
});
