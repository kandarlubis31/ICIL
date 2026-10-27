const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const core = require("../campus-core");

test("getCourseContent loads an indexed course", () => {
  const content = core.getCourseContent("warna/01-color-theory-basics.md");
  assert.ok(content, "expected course content");
  assert.match(content, /Color/);
});

test("every indexed course file is readable through getCourseContent", () => {
  const index = core.loadIndex();
  const missing = [];
  for (const [slug, faculty] of Object.entries(index.faculties)) {
    for (const course of faculty.courses) {
      if (!core.getCourseContent(course.file)) missing.push(`${slug}/${course.id}`);
    }
  }
  assert.deepEqual(missing, []);
});

test("getCourseContent rejects traversal outside the campus root", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "icil-outside-"));
  const outside = path.join(dir, "outside.md");
  fs.writeFileSync(outside, "secret", "utf8");
  try {
    const relative = path.relative(core.CAMPUS_ROOT, outside);
    assert.equal(core.getCourseContent(relative), null);
    assert.equal(core.getCourseContent(outside), null);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("getCourseContent rejects non-course files", () => {
  assert.equal(core.getCourseContent("package.json"), null);
  assert.equal(core.getCourseContent("index.json"), null);
  assert.equal(core.getCourseContent("README.md"), null);
  assert.equal(core.getCourseContent(""), null);
  assert.equal(core.getCourseContent(null), null);
});

test("getCourseLevel parses both header formats", () => {
  assert.equal(
    core.getCourseLevel("# T\n\n> 🟡 Intermediate | Prereq: 02 | ~5 min\n"),
    "intermediate"
  );
  assert.equal(
    core.getCourseLevel("# T\n\n> **Level: 🔴 Advanced** | Prerequisite: security/01 | ~10 min\n"),
    "advanced"
  );
  assert.equal(
    core.getCourseLevel("# T\n\n> 🟢 Beginner | Prereq: — | ~4 min\n"),
    "beginner"
  );
  assert.equal(core.getCourseLevel("# T\n\nNo header here\n"), "unknown");
});

test("compareCourses rejects traversal and absolute paths", () => {
  const result = core.compareCourses("../../package.json", "warna/01-color-theory-basics.md");
  assert.match(result.error, /Invalid file path/);
});
