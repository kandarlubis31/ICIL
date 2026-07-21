/**
 * campus-core.js — ICIL Core Library
 *
 * Shared module used by both:
 *   - load-context.js (CLI tool)
 *   - mcp-server.js  (MCP server for AI agents)
 *
 * Exports the core functions: loadIndex, normalize, matchKeywords, getCourseContent
 */

const fs = require("fs");
const path = require("path");

const CAMPUS_ROOT = __dirname;
const INDEX_FILE = path.join(CAMPUS_ROOT, "index.json");

// ── Module-level caches (data is static; loaded once per process) ─
let _indexCache = null;
const _courseCache = new Map();

// ── Load Index ───────────────────────────────────────────────
function loadIndex() {
  if (_indexCache !== null) return _indexCache;
  const raw = fs.readFileSync(INDEX_FILE, "utf-8");
  _indexCache = JSON.parse(raw);
  return _indexCache;
}

// ── Normalize Text ───────────────────────────────────────────
function normalize(text) {
  return text.toLowerCase().trim();
}

// ── Word-Boundary Keyword Match ─────────────────────────────
/**
 * Matches a keyword against a prompt with word-boundary precision.
 *
 * Falls back to substring matching for keywords containing special
 * characters (e.g. "cmd+k", "404 page", "@keyframes").
 *
 * Fixes false-positive substring matching where "service" would match
 * "ICE" inside "service-design" or "coverage" would match "RAG".
 *
 * ICE keyword moved from HIGH→LOW in improvement faculty (v22.2.x).
 * Word-boundary regex (\bice\b) prevents false matches from
 * common words like "practice", "service", "experience", "choice", "notice".
 * Combined, these two fixes close the 23-point Claude→GPT routing gap.
 *
 * Note: ICE still triggers improvement at LOW priority when no HIGH/MEDIUM
 * keywords match first. For explicit "ICE scoring" queries, related keywords
 * like "prioritize", "RICE", or "impact effort" handle routing at higher tiers.
 */
function keywordMatch(normalizedPrompt, normalizedKeyword) {
  // Pure alphanumeric + spaces → use word boundaries for precision
  if (/^[a-z0-9\s]+$/.test(normalizedKeyword)) {
    const escaped = normalizedKeyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp("\\b" + escaped + "\\b").test(normalizedPrompt);
  }
  // Special characters present → substring match (fallback)
  return normalizedPrompt.includes(normalizedKeyword);
}

// ── Match Keywords ───────────────────────────────────────────
/**
 * Scans the prompt for trigger_keywords across all faculties.
 * Returns an array of matched results per faculty.
 *
 * @param {object} index - Parsed index.json
 * @param {string} prompt - User prompt to match against
 * @returns {Array} Matched faculty results with courses
 */
function matchKeywords(index, prompt) {
  const normalizedPrompt = normalize(prompt);
  const results = [];
  const triggerKeywords = index.auto_router.trigger_keywords;
  const faculties = index.faculties;

  for (const [facultySlug, facultyData] of Object.entries(triggerKeywords)) {
    const facultyInfo = faculties[facultySlug];
    if (!facultyInfo) continue;

    // ── Check negative_keywords first ──
    const negKeywords = facultyData.negative_keywords || [];
    const hasNegativeMatch = negKeywords.some((kw) =>
      keywordMatch(normalizedPrompt, normalize(kw))
    );
    if (hasNegativeMatch) continue;

    const matchedCourseIds = new Set();
    let highestPriority = null;
    const matchDetails = { high: [], medium: [], low: [] };

    const keywords = facultyData.keywords || {};

    // ── HIGH priority ──
    if (keywords.high) {
      for (const [keyword, courseIds] of Object.entries(keywords.high)) {
        if (keywordMatch(normalizedPrompt, normalize(keyword))) {
          if (Array.isArray(courseIds)) {
            courseIds.forEach((id) => matchedCourseIds.add(id));
          }
          matchDetails.high.push(keyword);
          highestPriority = "high";
        }
      }
    }

    // ── MEDIUM priority (only if no HIGH match) ──
    if (!highestPriority && keywords.medium) {
      for (const [keyword, courseIds] of Object.entries(keywords.medium)) {
        if (keywordMatch(normalizedPrompt, normalize(keyword))) {
          if (Array.isArray(courseIds)) {
            courseIds.forEach((id) => matchedCourseIds.add(id));
          }
          matchDetails.medium.push(keyword);
          highestPriority = highestPriority || "medium";
        }
      }
    }

    // ── LOW priority (only if no HIGH or MEDIUM match) ──
    if (!highestPriority && keywords.low) {
      for (const [keyword, courseIds] of Object.entries(keywords.low)) {
        if (keywordMatch(normalizedPrompt, normalize(keyword))) {
          if (courseIds === "any") {
            (facultyData.recommended_courses || []).forEach((id) =>
              matchedCourseIds.add(id)
            );
          } else if (Array.isArray(courseIds)) {
            courseIds.forEach((id) => matchedCourseIds.add(id));
          }
          matchDetails.low.push(keyword);
          highestPriority = highestPriority || "low";
        }
      }
    }

    if (matchedCourseIds.size > 0 || highestPriority) {
      if (matchedCourseIds.size === 0 && highestPriority) {
        (facultyData.recommended_courses || []).forEach((id) =>
          matchedCourseIds.add(id)
        );
      }

      // ── Auto-load prerequisites ──
      const coursesWithPrereqs = [];
      for (const courseId of matchedCourseIds) {
        const course = facultyInfo.courses.find((c) => c.id === courseId);
        if (course) {
          coursesWithPrereqs.push(course);
          resolvePrerequisites(course.prerequisites, facultySlug, index).forEach(
            (prereq) => {
              if (prereq.note) return; // skip unresolved (e.g., missing cross-faculty refs)
              const dedupKey = prereq.isCrossFaculty
                ? `${prereq.faculty}/${prereq.id}`
                : prereq.id;
              if (!matchedCourseIds.has(dedupKey)) {
                matchedCourseIds.add(dedupKey);
                coursesWithPrereqs.push(prereq);
              }
            }
          );
        }
      }

      // ── Sort by level: beginner → intermediate → advanced ──
      const levelOrder = { beginner: 0, intermediate: 1, advanced: 2 };
      coursesWithPrereqs.sort(
        (a, b) => (levelOrder[a.level] || 1) - (levelOrder[b.level] || 1)
      );

      // ── Cap at max_courses_per_faculty ──
      const maxCourses = index.auto_router.loading_strategy.max_courses_per_faculty || 5;
      const cappedCourses = coursesWithPrereqs.slice(0, maxCourses);

      results.push({
        faculty: facultySlug,
        facultyName: facultyInfo.name,
        priority: highestPriority,
        matchedKeywords: matchDetails,
        courses: cappedCourses.map((course) => ({
          id: course.id,
          title: course.title,
          level: course.level,
          file: course.file,
          filepath: path.join(CAMPUS_ROOT, course.file),
        })),
      });
    }
  }

  // ── Sort results by priority ──
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  results.sort(
    (a, b) => (priorityOrder[a.priority] ?? 3) - (priorityOrder[b.priority] ?? 3)
  );

  return results;
}

// ── Resolve Prerequisites ────────────────────────────────────
/**
 * Resolves prerequisite IDs to course objects.
 * Supports both same-faculty plain IDs ("01") and cross-faculty
 * format ("warna/06"). Returns an array of resolved course objects
 * with faculty context for cross-faculty references.
 *
 * @param {Array<string>} prerequisiteIds - Raw prerequisite IDs
 * @param {string} defaultFaculty - Faculty slug for plain IDs
 * @param {object} index - Parsed index.json
 * @returns {Array<object>} Resolved course objects
 */
function resolvePrerequisites(prerequisiteIds, defaultFaculty, index) {
  const faculties = index.faculties;
  return (prerequisiteIds || []).map((pid) => {
    const pidStr = String(pid);

    // Cross-faculty format: "faculty-slug/XX"
    if (pidStr.includes("/")) {
      const [facultySlug, courseId] = pidStr.split("/");
      const fd = faculties[facultySlug];
      if (!fd)
        return {
          id: pidStr,
          title: "Unknown",
          note: `Faculty '${facultySlug}' not found`,
        };
      const course = fd.courses.find((c) => c.id === courseId);
      if (!course)
        return {
          id: pidStr,
          title: "Unknown",
          note: `Course '${courseId}' not found in ${facultySlug}`,
        };
      return {
        id: course.id,
        title: course.title,
        level: course.level,
        file: course.file,
        faculty: facultySlug,
        facultyName: fd.name,
        isCrossFaculty: true,
      };
    }

    // Same-faculty plain ID
    const fd = faculties[defaultFaculty];
    if (!fd)
      return {
        id: pidStr,
        title: "Unknown",
        note: `Faculty '${defaultFaculty}' not found`,
      };
    const course = fd.courses.find((c) => c.id === pidStr);
    if (!course)
      return {
        id: pidStr,
        title: "Unknown",
        note: `Course not found in ${defaultFaculty}`,
      };
    return {
      id: course.id,
      title: course.title,
      level: course.level,
      file: course.file,
      faculty: defaultFaculty,
      facultyName: fd.name,
      isCrossFaculty: false,
    };
  });
}

// ── Get Course Content ──────────────────────────────────────
/**
 * Reads and returns the full content of a course file.
 *
 * @param {string} filePath - Relative path like "warna/01-color-theory-basics.md"
 * @returns {string|null} Course content or null if not found
 */
function getCourseContent(filePath) {
  if (_courseCache.has(filePath)) return _courseCache.get(filePath);
  const fullPath = path.join(CAMPUS_ROOT, filePath);
  try {
    const content = fs.readFileSync(fullPath, "utf-8");
    _courseCache.set(filePath, content);
    return content;
  } catch {
    return null;
  }
}

// ── Get Faculty Emoji ─────────────────────────────────────────
// Emoji is now read directly from index.faculties[slug].emoji —
// single source of truth, validated by ci-validate.js.
// (getFacultyEmoji() removed in v25.0.4 — see CHANGELOG)

// ── List All Faculties (data only) ──────────────────────────
function listFacultiesData(index) {
  return Object.entries(index.faculties).map(([slug, faculty]) => ({
    slug,
    name: faculty.name,
    emoji: index.faculties[slug].emoji || "📚",
    courseCount: faculty.courses.length,
    level: faculty.level,
    description: faculty.description,
    courses: faculty.courses.map((c) => ({
      id: c.id,
      title: c.title,
      level: c.level,
      file: c.file,
      prerequisites: c.prerequisites || [],
      topics: c.topics || [],
    })),
  }));
}

// ── Search Campus ────────────────────────────────────────────
/**
 * High-level function: matches a user prompt against the campus
 * and returns clean results suitable for AI agent consumption.
 */
function searchCampus(prompt) {
  const index = loadIndex();
  const matches = matchKeywords(index, prompt);

  if (matches.length === 0) {
    return {
      prompt,
      matchedFaculties: 0,
      totalCourses: 0,
      results: [],
      suggestion: "Try broader terms like 'color theory', 'accessibility', 'typography', 'form design', or 'cognitive science'.",
    };
  }

  return {
    prompt,
    matchedFaculties: matches.length,
    totalCourses: matches.reduce((sum, r) => sum + r.courses.length, 0),
    results: matches.map((r) => ({
      faculty: r.faculty,
      facultyName: r.facultyName,
      emoji: index.faculties[r.faculty].emoji || "📚",
      priority: r.priority,
      matchedKeywords: [
        ...r.matchedKeywords.high,
        ...r.matchedKeywords.medium,
        ...r.matchedKeywords.low,
      ],
      courses: r.courses.map((c) => ({
        id: c.id,
        title: c.title,
        level: c.level,
        file: c.file,
      })),
    })),
  };
}

// ── Search Across Campus (full-text) ────────────────────────
/**
 * Full-text search across ALL course content.
 * Returns ranked excerpts with scores.
 */
function searchAcrossCampus(query, maxResults = 10) {
  if (!query || !query.trim()) {
    return { error: "query cannot be empty" };
  }

  const index = loadIndex();
  const results = [];
  const normalizedQuery = query.toLowerCase();
  const limit = Math.min(Math.max(maxResults || 10, 1), 25);

  for (const [facultySlug, facultyData] of Object.entries(index.faculties)) {
    for (const course of facultyData.courses) {
      const content = getCourseContent(course.file);
      if (!content) continue;

      const lowerContent = content.toLowerCase();
      const matches = [];
      let idx = lowerContent.indexOf(normalizedQuery);
      let count = 0;

      while (idx !== -1 && count < 5) {
        const start = Math.max(0, idx - 50);
        const end = Math.min(content.length, idx + normalizedQuery.length + 100);
        let excerpt = content.slice(start, end).replace(/\n/g, " ").trim();
        if (start > 0) excerpt = "..." + excerpt;
        if (end < content.length) excerpt = excerpt + "...";
        matches.push(excerpt);
        idx = lowerContent.indexOf(normalizedQuery, idx + 1);
        count++;
      }

      if (matches.length > 0) {
        results.push({
          faculty: facultySlug,
          facultyName: facultyData.name,
          emoji: index.faculties[facultySlug].emoji || "📚",
          courseId: course.id,
          courseTitle: course.title,
          file: course.file,
          level: course.level,
          matchCount: matches.length,
          excerpts: matches.slice(0, 3),
        });
      }
    }
  }

  results.forEach((r) => {
    r.score = r.matchCount * 10 + (r.courseTitle.toLowerCase().includes(normalizedQuery) ? 30 : 0);
  });
  results.sort((a, b) => b.score - a.score);

  return {
    query,
    totalMatches: results.length,
    results: results.slice(0, limit),
  };
}

// ── Compare Courses ─────────────────────────────────────────
/**
 * Compare two courses side-by-side: keywords, structure, length.
 */
function compareCourses(filePathA, filePathB) {
  // Guard against path traversal
  for (const p of [filePathA, filePathB]) {
    if (!p || p.includes("..") || p.includes("~") || path.isAbsolute(p)) {
      return { error: "Invalid file path: " + p };
    }
  }

  const contentA = getCourseContent(filePathA);
  const contentB = getCourseContent(filePathB);

  if (!contentA) return { error: `Course not found: '${filePathA}'` };
  if (!contentB) return { error: `Course not found: '${filePathB}'` };

  const wordsA = contentA.split(/\s+/).length;
  const wordsB = contentB.split(/\s+/).length;

  const extractHeaders = (content) => {
    return [...content.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim());
  };
  const headersA = extractHeaders(contentA);
  const headersB = extractHeaders(contentB);

  const getKeywords = (text) => {
    const words = text.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
    const stopWords = new Set(["this", "that", "with", "from", "your", "when", "what", "them", "then", "than", "have", "been", "were", "they", "will", "also", "each", "more", "some", "into", "over", "only", "most", "very", "just", "about"]);
    const freq = {};
    words.filter((w) => !stopWords.has(w)).forEach((w) => {
      freq[w] = (freq[w] || 0) + 1;
    });
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([w]) => w);
  };
  const keywordsA = getKeywords(contentA);
  const keywordsB = getKeywords(contentB);
  const shared = keywordsA.filter((k) => keywordsB.includes(k));

  const getLevel = (content) => {
    const m = content.match(/Level:\s*(.+?)\s*\|/);
    return m ? m[1].trim() : "unknown";
  };

  return {
    courseA: {
      file: filePathA,
      level: getLevel(contentA),
      wordCount: wordsA,
      sections: headersA.length,
      sectionTitles: headersA,
      topKeywords: keywordsA.slice(0, 8),
    },
    courseB: {
      file: filePathB,
      level: getLevel(contentB),
      wordCount: wordsB,
      sections: headersB.length,
      sectionTitles: headersB,
      topKeywords: keywordsB.slice(0, 8),
    },
    shared,
    sharedKeywordCount: shared.length,
    sizeDifference: `${Math.abs(wordsA - wordsB)} words (${Math.abs(Math.round(((wordsA - wordsB) / Math.max(wordsA, wordsB)) * 100))}%)`,
    recommendation:
      wordsA < wordsB
        ? `${path.basename(filePathA, ".md")} is shorter — start here for quick context, then deep-dive into ${path.basename(filePathB, ".md")}`
        : `${path.basename(filePathB, ".md")} is shorter — start here for quick context, then deep-dive into ${path.basename(filePathA, ".md")}`,
  };
}

module.exports = {
  loadIndex,
  normalize,
  keywordMatch,
  resolvePrerequisites,
  matchKeywords,
  getCourseContent,
  listFacultiesData,
  searchCampus,
  searchAcrossCampus,
  compareCourses,
  CAMPUS_ROOT,
};
