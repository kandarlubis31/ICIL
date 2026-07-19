#!/usr/bin/env node

/**
 * mcp-server.js — ICIL MCP Server
 *
 * Model Context Protocol server that exposes the ICIL campus
 * to AI agents (Claude Desktop, Cursor, Continue, etc).
 *
 * Tools exposed (10 total — v3):
 *   - search_campus:    Match a user prompt to relevant faculties/courses
 *   - load_course:      Load the full content of a specific course file
 *   - list_faculties:   List all available faculties with their courses
 *   - search_across:    Full-text search across ALL course content
 *   - compare_courses:  Compare two courses side-by-side
 *   - get_campus_stats:   Quick campus metadata & statistics 🆕
 *   - search_by_faculty:  Scoped search within one faculty 🆕
 *   - get_course_prerequisites: Trace prerequisite chains 🆕
 *   - export_course:       Export to JSON, Markdown, HTML, PDF 🆕
 *   - recommend_learning_path: AI-suggested course sequence 🆕
 *
 * Usage:
 *   node mcp-server.js
 *
 * Configure in Claude Desktop / Cursor:
 *   {
 *     "mcpServers": {
 *       "icil": {
 *         "command": "node",
 *         "args": ["path/to/icil/mcp-server.js"]
 *       }
 *     }
 *   }
 */

const path = require("path");
const { z } = require("zod");
const { McpServer } = require("@modelcontextprotocol/sdk/server/mcp.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const core = require("./campus-core");

// ── Format helper ────────────────────────────────────────────
function fmt(data) {
  return typeof data === "string" ? data : JSON.stringify(data, null, 2);
}

// ── Load index once at startup (cached for process lifetime) ─
const index = core.loadIndex();
const facultyCount = Object.keys(index.faculties).length;
const serverDescription =
  `ICIL — Intelligence Campus Interactive Library. ` +
  `${index.totalCourses} courses across ${facultyCount} faculties ` +
  `(v${index.version}). 10 MCP tools (v3): search_campus, load_course, ` +
  `list_faculties, search_across, compare_courses, get_campus_stats, ` +
  `search_by_faculty, get_course_prerequisites, export_course, ` +
  `recommend_learning_path. Covering design, engineering, research, ` +
  `DX, IA, agentic engineering, ethics, security, and quality.`;

// ── Create MCP Server ────────────────────────────────────────
const server = new McpServer({
  name: "icil",
  version: index.version,
  description: serverDescription,
});

// ── Tool: search_campus ──────────────────────────────────────
server.tool(
  "search_campus",
  "Search the ICIL campus for relevant design courses. Provide a prompt describing what you need help with (e.g., 'improve form accessibility', 'choose brand colors', 'understand cognitive load'). Returns matched faculties with recommended courses ranked by relevance.",
  {
    prompt: z.string().describe("A description of what you want to learn or build. Be specific — include keywords like 'accessibility', 'color palette', 'animation', 'typography', 'form design', 'brand identity', 'cognitive science', etc."),
  },
  async ({ prompt }) => {
    try {
      const result = core.searchCampus(prompt);

      if (result.results.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: fmt({
                message: "No matching faculties found for your prompt.",
                prompt,
                suggestion: result.suggestion,
                hint: "Try broader terms. Use list_faculties to see all available topics.",
              }),
            },
          ],
        };
      }

      // Format results for AI agent consumption
      const summary = result.results.map((r) => {
        return {
          faculty: `${r.emoji} ${r.facultyName} (${r.faculty})`,
          priority: r.priority.toUpperCase(),
          matchedBecause: r.matchedKeywords.join(", "),
          recommendedCourses: r.courses.map((c) => ({
            id: c.id,
            title: c.title,
            level: c.level,
            loadWith: `load_course(file="${c.file}")`,
          })),
        };
      });

      return {
        content: [
          {
            type: "text",
            text: fmt({
              query: prompt,
              matchedFaculties: result.matchedFaculties,
              totalCoursesFound: result.totalCourses,
              results: summary,
              nextStep: "Use load_course to load any specific course file for full expert context.",
            }),
          },
        ],
      };
    } catch (err) {
      return {
        content: [{ type: "text", text: fmt({ error: err.message }) }],
      };
    }
  }
);

// ── Tool: load_course ────────────────────────────────────────
server.tool(
  "load_course",
  "Load the full expert content of a specific course from the ICIL campus. Use this after search_campus to get deep, comprehensive knowledge on a topic. Each course is 10-15 minutes of reading with theory, code examples, tables, and practical application.",
  {
    file: z.string().describe("The course file path (e.g., 'warna/06-color-accessibility.md', 'aksesibilitas/04-keyboard-navigation-focus-management.md', 'kognisi/01-cognitive-architecture-information-processing.md')"),
  },
  async ({ file }) => {
    try {
      // Basic path validation
      if (!file || typeof file !== "string") {
        return {
          content: [{ type: "text", text: fmt({ error: "file parameter is required" }) }],
        };
      }

      // Prevent directory traversal
      if (file.includes("..") || file.includes("~") || path.isAbsolute(file)) {
        return {
          content: [{ type: "text", text: fmt({ error: "Invalid file path" }) }],
        };
      }

      const content = core.getCourseContent(file);

      if (!content) {
        // Try to suggest similar files
        const allFiles = [];
        for (const [, faculty] of Object.entries(index.faculties)) {
          for (const course of faculty.courses) {
            allFiles.push(course.file);
          }
        }

        return {
          content: [
            {
              type: "text",
              text: fmt({
                error: `Course not found: '${file}'`,
                suggestion: "Check the exact file path. Use list_faculties to see all available courses.",
                availableCoursesCount: allFiles.length,
                exampleFiles: allFiles.slice(0, 10),
              }),
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: content,
          },
        ],
      };
    } catch (err) {
      return {
        content: [{ type: "text", text: fmt({ error: err.message }) }],
      };
    }
  }
);

// ── Tool: list_faculties ─────────────────────────────────────
server.tool(
  "list_faculties",
  `List all ${facultyCount} faculties available in the ICIL campus. Use this to discover what knowledge domains are available before searching. Returns faculty names, descriptions, course counts, and all course files.`,
  {},
  async () => {
    try {
      const faculties = core.listFacultiesData(index);

      const summary = faculties.map((f) => ({
        emoji: f.emoji,
        name: f.name,
        slug: f.slug,
        description: f.description,
        courseCount: f.courseCount,
        level: f.level,
        courses: f.courses.map((c) => ({
          id: c.id,
          title: c.title,
          level: c.level,
          file: c.file,
        })),
      }));

      return {
        content: [
          {
            type: "text",
            text: fmt({
              campus: index.campus,
              version: index.version,
              totalCourses: index.totalCourses,
              totalFaculties: summary.length,
              faculties: summary,
              usage: 'Use search_campus to find relevant courses, then load_course to read them.',
            }),
          },
        ],
      };
    } catch (err) {
      return {
        content: [{ type: "text", text: fmt({ error: err.message }) }],
      };
    }
  }
);

// ── Tool: search_across ──────────────────────────────────────
server.tool(
  "search_across",
  "Full-text search across ALL course content in the ICIL campus. Unlike search_campus (which matches keywords), this searches the actual course text for your query and returns ranked excerpts. Use this for deep research and cross-disciplinary discovery.",
  {
    query: z.string().describe("Text to search for across all course files. Can be a keyword, phrase, or code snippet."),
    maxResults: z.number().optional().default(10).describe("Maximum number of results to return (1-25, default 10)"),
  },
  async ({ query, maxResults = 10 }) => {
    try {
      const result = core.searchAcrossCampus(query, maxResults);

      if (result.error) {
        return {
          content: [{ type: "text", text: fmt({ error: result.error }) }],
        };
      }

      const top = result.results;

      return {
        content: [
          {
            type: "text",
            text: fmt({
              query: result.query,
              totalMatches: result.totalMatches,
              showing: top.length,
              results: top.map((r) => ({
                faculty: `${r.emoji} ${r.facultyName} (${r.faculty})`,
                course: `#${r.courseId} — ${r.courseTitle} [${r.level}]`,
                file: r.file,
                score: r.score,
                matchCount: r.matchCount,
                excerpts: r.excerpts,
                loadWith: `load_course(file="${r.file}")`,
              })),
              noResults: result.totalMatches === 0
                ? "No matches found. Try broader terms or check for typos."
                : undefined,
            }),
          },
        ],
      };
    } catch (err) {
      return {
        content: [{ type: "text", text: fmt({ error: err.message }) }],
      };
    }
  }
);

// ── Tool: compare_courses ────────────────────────────────────
server.tool(
  "compare_courses",
  "Compare two ICIL courses side-by-side. Shows shared keywords, structural differences, course lengths, and complementary topics. Use this when deciding between related courses or finding connections across faculties.",
  {
    courseA: z.string().describe("First course file path (e.g., 'dx/01-dx-fundamentals-strategy.md')"),
    courseB: z.string().describe("Second course file path (e.g., 'ia/01-ia-fundamentals-organization.md')"),
  },
  async ({ courseA, courseB }) => {
    try {
      const result = core.compareCourses(courseA, courseB);

      if (result.error) {
        return {
          content: [{ type: "text", text: fmt({ error: result.error }) }],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: fmt({
              comparison: {
                courseA: result.courseA,
                courseB: result.courseB,
                sharedKeywords: result.shared,
                sharedKeywordCount: result.sharedKeywordCount,
                sizeDifference: result.sizeDifference,
                recommendation: result.recommendation,
              },
            }),
          },
        ],
      };
    } catch (err) {
      return {
        content: [{ type: "text", text: fmt({ error: err.message }) }],
      };
    }
  }
);

// ── Tool: get_campus_stats ───────────────────────────────────
server.tool(
  "get_campus_stats",
  "Get quick statistics and metadata about the ICIL campus. Returns version, total courses, faculties breakdown, and course distribution. Use this when you need a high-level overview before diving into specific topics.",
  {},
  async () => {
    try {
      const faculties = Object.entries(index.faculties).map(([slug, f]) => ({
        slug,
        name: f.name,
        emoji: index.faculties[slug].emoji || "📚",
        courseCount: f.courseCount,
        level: f.level,
      }));

      const byLevel = { beginner: 0, intermediate: 0, advanced: 0 };
      for (const [, f] of Object.entries(index.faculties)) {
        for (const c of f.courses) {
          byLevel[c.level] = (byLevel[c.level] || 0) + 1;
        }
      }

      return {
        content: [{
          type: "text",
          text: fmt({
            campus: index.campus,
            version: index.version,
            description: index.description,
            totalCourses: index.totalCourses,
            totalFaculties: faculties.length,
            courseBreakdown: {
              byLevel,
              beginner: byLevel.beginner,
              intermediate: byLevel.intermediate,
              advanced: byLevel.advanced,
            },
            faculties: faculties.sort((a, b) => b.courseCount - a.courseCount),
            mcpTools: 10,
            autoRouterKeywords: Object.keys(index.auto_router.trigger_keywords).length + " keyword groups",
          }),
        }],
      };
    } catch (err) {
      return { content: [{ type: "text", text: fmt({ error: err.message }) }] };
    }
  }
);

// ── Tool: search_by_faculty ──────────────────────────────────
server.tool(
  "search_by_faculty",
  "Search within a specific faculty for relevant courses. When you already know which domain you need (e.g., 'security', 'warna', 'ai-integration'), use this to find the most relevant courses within that faculty. Returns scored results with excerpts.",
  {
    faculty: z.string().describe("Faculty slug to search within (e.g., 'security', 'warna', 'software-engineering', 'ai-integration'). Use list_faculties to see valid slugs."),
    query: z.string().describe("Search query to match against course titles and content within the faculty."),
  },
  async ({ faculty, query }) => {
    try {
      if (!query || !query.trim()) {
        return { content: [{ type: "text", text: fmt({ error: "query cannot be empty" }) }] };
      }

      const facultyData = index.faculties[faculty];

      if (!facultyData) {
        const validSlugs = Object.keys(index.faculties);
        return {
          content: [{
            type: "text",
            text: fmt({
              error: `Faculty '${faculty}' not found.`,
              validFaculties: validSlugs,
              hint: "Use list_faculties to see all available faculty slugs and names.",
            }),
          }],
        };
      }

      const normalizedQuery = query.toLowerCase();
      const results = [];

      for (const course of facultyData.courses) {
        const content = core.getCourseContent(course.file);
        if (!content) continue;

        const lowerContent = content.toLowerCase();
        const titleScore = course.title.toLowerCase().includes(normalizedQuery) ? 50 : 0;
        const topicScore = (course.topics || []).some(t => t.toLowerCase().includes(normalizedQuery)) ? 30 : 0;

        // Find excerpts
        const matches = [];
        let idx = lowerContent.indexOf(normalizedQuery);
        let count = 0;
        while (idx !== -1 && count < 3) {
          const start = Math.max(0, idx - 40);
          const end = Math.min(content.length, idx + normalizedQuery.length + 80);
          let excerpt = content.slice(start, end).replace(/\n/g, " ").trim();
          if (start > 0) excerpt = "..." + excerpt;
          if (end < content.length) excerpt = excerpt + "...";
          matches.push(excerpt);
          idx = lowerContent.indexOf(normalizedQuery, idx + 1);
          count++;
        }

        results.push({
          courseId: course.id,
          title: course.title,
          level: course.level,
          file: course.file,
          score: matches.length * 10 + titleScore + topicScore,
          matchCount: matches.length,
          hasTitleMatch: titleScore > 0,
          hasTopicMatch: topicScore > 0,
          excerpts: matches.slice(0, 2),
        });
      }

      results.sort((a, b) => b.score - a.score);
      const top = results.filter(r => r.score > 0).slice(0, 8);

      return {
        content: [{
          type: "text",
          text: fmt({
            faculty: `${index.faculties[faculty].emoji || "📚"} ${facultyData.name} (${faculty})`,
            query,
            totalCourses: facultyData.courseCount,
            matchedCourses: top.length,
            results: top.map(r => ({
              course: `#${r.courseId} — ${r.title} [${r.level}]`,
              score: r.score,
              matchCount: r.matchCount,
              titleMatch: r.hasTitleMatch,
              excerpts: r.excerpts,
              loadWith: `load_course(file="${r.file}")`,
            })),
            noResults: top.length === 0 ? `No matches for "${query}" in ${facultyData.name}. Try broader terms or a different faculty.` : undefined,
          }),
        }],
      };
    } catch (err) {
      return { content: [{ type: "text", text: fmt({ error: err.message }) }] };
    }
  }
);

// ── Tool: get_course_prerequisites ───────────────────────────
server.tool(
  "get_course_prerequisites",
  "Trace the prerequisite chain for any course. Shows what you need to know BEFORE taking a course (prerequisites) and what courses build ON TOP of it (dependents). Use this to plan your learning path.",
  {
    faculty: z.string().describe("Faculty slug (e.g., 'software-engineering', 'security')"),
    courseId: z.string().describe("Course ID within that faculty (e.g., '08', '03', '09')"),
  },
  async ({ faculty, courseId }) => {
    try {
      const facultyData = index.faculties[faculty];

      if (!facultyData) {
        return { content: [{ type: "text", text: fmt({ error: `Faculty '${faculty}' not found. Use list_faculties.` }) }] };
      }

      const course = facultyData.courses.find(c => c.id === courseId);
      if (!course) {
        const validIds = facultyData.courses.map(c => c.id);
        return { content: [{ type: "text", text: fmt({ error: `Course '${courseId}' not found in ${faculty}. Valid IDs: ${validIds.join(", ")}` }) }] };
      }

      // Get prerequisites (handles both same-faculty "01" and cross-faculty "warna/06")
      const prereqs = core.resolvePrerequisites(course.prerequisites, faculty, index).map(
        (p) => ({
          id: p.id,
          title: p.title,
          level: p.level,
          file: p.file,
          ...(p.isCrossFaculty
            ? { crossFaculty: p.faculty, facultyName: p.facultyName }
            : p.note
              ? { note: p.note }
              : {}),
        })
      );

      // Find dependents (courses that list THIS course as prerequisite)
      const dependents = facultyData.courses
        .filter(c => (c.prerequisites || []).includes(courseId))
        .map(c => ({ id: c.id, title: c.title, level: c.level, file: c.file }));

      // Find cross-faculty dependents
      const crossDependents = [];
      for (const [slug, fd] of Object.entries(index.faculties)) {
        if (slug === faculty) continue;
        for (const c of fd.courses) {
          if ((c.prerequisites || []).some(p => {
            // Check if prereq references this course via faculty-slug/XX format
            if (typeof p === 'string' && p.includes('/')) {
              const [pf, pcid] = p.split('/');
              return pf === faculty && pcid === courseId;
            }
            return false;
          })) {
            crossDependents.push({ faculty: slug, facultyName: fd.name, courseId: c.id, title: c.title, level: c.level, file: c.file });
          }
        }
      }

      return {
        content: [{
          type: "text",
          text: fmt({
            course: {
              id: course.id,
              title: course.title,
              level: course.level,
              file: course.file,
              faculty: `${index.faculties[faculty].emoji || "📚"} ${facultyData.name}`,
            },
            prerequisites: {
              count: prereqs.length,
              courses: prereqs,
              loadOrder: prereqs.map(p => `load_course(file="${p.file || faculty + '/' + p.id}")`),
            },
            dependents: {
              sameFaculty: dependents,
              crossFaculty: crossDependents,
              totalDependents: dependents.length + crossDependents.length,
            },
            learningPath: prereqs.length === 0
              ? `No prerequisites — start here! Then explore ${dependents.length} follow-up course(s).`
              : `Complete ${prereqs.length} prerequisite(s) first, then this course, then ${dependents.length + crossDependents.length} follow-up(s).`,
          }),
        }],
      };
    } catch (err) {
      return { content: [{ type: "text", text: fmt({ error: err.message }) }] };
    }
  }
);

// ── Tool: export_course ──────────────────────────────────────
server.tool(
  "export_course",
  "Export one or more courses to different formats. Supports JSON (structured data), Markdown (original), HTML (browser-ready), and PDF outline (section headers only). Use this to integrate course content into external tools or documentation.",
  {
    files: z.array(z.string()).describe("Array of course file paths to export (e.g., ['warna/01-color-theory-basics.md', 'security/08-zero-trust-architecture.md']). Max 10 files."),
    format: z.enum(["json", "markdown", "html", "pdf_outline"]).describe("Export format: 'json' for structured data, 'markdown' for original .md, 'html' for browser rendering, 'pdf_outline' for section headers only."),
  },
  async ({ files, format }) => {
    try {
      if (!files || files.length === 0) {
        return { content: [{ type: "text", text: fmt({ error: "files array cannot be empty" }) }] };
      }
      if (files.length > 10) {
        return { content: [{ type: "text", text: fmt({ error: "Maximum 10 files per export. Split into multiple calls." }) }] };
      }

      const exported = [];
      const errors = [];

      for (const file of files.slice(0, 10)) {
        if (!file || file.includes("..") || file.includes("~")) {
          errors.push({ file, error: "Invalid path" });
          continue;
        }

        const content = core.getCourseContent(file);
        if (!content) {
          errors.push({ file, error: "File not found" });
          continue;
        }

        let output;
        switch (format) {
          case "json": {
            // Extract structured data
            const titleMatch = content.match(/#\s+.+?—\s+(.+)/);
            const levelMatch = content.match(/Level:\s*(.+?)\s*\|/);
            const sections = [...content.matchAll(/^##\s+(.+)$/gm)].map(m => m[1].trim());
            const checklists = [...content.matchAll(/^- \[([ x])\] (.+)$/gm)].map(m => ({ checked: m[1] === 'x', item: m[2].trim() }));
            output = {
              title: titleMatch ? titleMatch[1].trim() : file,
              level: levelMatch ? levelMatch[1].trim() : "unknown",
              file,
              wordCount: content.split(/\s+/).length,
              sections: sections.map((s, i) => ({ index: i + 1, title: s })),
              actionChecklist: checklists,
            };
            break;
          }
          case "markdown":
            output = { file, content };
            break;
          case "html": {
            let html = content
              .replace(/^# (.+)$/gm, '<h1>$1</h1>')
              .replace(/^## (.+)$/gm, '<h2>$1</h2>')
              .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
              .replace(/`([^`]+)`/g, '<code>$1</code>')
              .replace(/^- (.+)$/gm, '<li>$1</li>')
              .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

            // Convert markdown tables → HTML tables (before \n\n → </p><p>)
            // Handles \r\n (Windows) and \n (Unix) line endings
            // Matches: header row, separator row (|---|), and data rows
            html = html.replace(/^\|.+\|[\r\n]+\|[-:| ]+\|[\r\n]+(?:\|.+\|[\r\n]*)+/gm, (match) => {
              const lines = match.split(/[\r\n]+/).filter(l => l.trim() && !l.match(/^\|[-:| ]+\|$/));
              const rows = lines.map((line, i) => {
                const tag = i === 0 ? 'th' : 'td';
                // slice(1, -1) preserves empty cells (unlike filter)
                const cells = line.split('|').slice(1, -1).map(c => `<${tag}>${c.trim()}</${tag}>`);
                return `<tr>${cells.join('')}</tr>`;
              });
              return `<table>\n${rows.join('\n')}\n</table>`;
            });

            // Convert checkboxes in list items
            html = html
              .replace(/<li>\[x\] (.+?)<\/li>/g, '<li><input type="checkbox" checked disabled> $1</li>')
              .replace(/<li>\[ \] (.+?)<\/li>/g, '<li><input type="checkbox" disabled> $1</li>');

            html = html.replace(/\n\n/g, '</p><p>');

            // Wrap consecutive list items in <ul>
            html = html.replace(/((?:<li>.*<\/li>[\r\n]*)+)/g, '<ul>$1</ul>');
            html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${file}</title><style>body{font-family:system-ui;max-width:800px;margin:2rem auto;padding:0 1rem;line-height:1.6}code{background:#f0f0f0;padding:2px 6px;border-radius:4px}pre{background:#1a1a2e;color:#e0e0e0;padding:1rem;border-radius:8px;overflow-x:auto}h2{border-bottom:2px solid #eee;padding-bottom:.5rem;margin-top:2rem}table{border-collapse:collapse;width:100%;margin:1rem 0}td,th{border:1px solid #ddd;padding:8px;text-align:left}li{margin:.3rem 0}</style></head><body>${html}</body></html>`;
            output = { file, html };
            break;
          }
          case "pdf_outline": {
            const headings = [...content.matchAll(/^#{1,2}\s+(.+)$/gm)].map(m => ({
              level: m[0].startsWith('# ') ? 1 : 2,
              title: m[1].trim(),
            }));
            output = { file, title: headings.find(h => h.level === 1)?.title || file, outline: headings };
            break;
          }
        }
        exported.push(output);
      }

      return {
        content: [{
          type: "text",
          text: fmt({
            format,
            exportedCount: exported.length,
            errorCount: errors.length,
            errors: errors.length > 0 ? errors : undefined,
            data: exported,
          }),
        }],
      };
    } catch (err) {
      return { content: [{ type: "text", text: fmt({ error: err.message }) }] };
    }
  }
);

// ── Tool: recommend_learning_path ────────────────────────────
server.tool(
  "recommend_learning_path",
  "Get a recommended course sequence based on your learning goal. Rules-based (no AI — predictable, debuggable, free). Maps common goals like 'build a SaaS', 'design a chatbot', 'improve accessibility' to ordered course sequences with prerequisites respected.",
  {
    goal: z.string().describe("What you want to learn or build (e.g., 'build a web app from scratch', 'design accessible forms', 'create a RAG chatbot', 'improve my project's UX')."),
    experienceLevel: z.enum(["beginner", "intermediate", "advanced"]).optional().default("intermediate").describe("Your current experience level. Affects which courses are recommended."),
    maxCourses: z.number().optional().default(8).describe("Maximum number of courses in the path (default 8, max 15)."),
  },
  async ({ goal, experienceLevel = "intermediate", maxCourses = 8 }) => {
    try {
      const limit = Math.min(Math.max(maxCourses || 8, 3), 15);

      // ── Rules-based path templates ──────────────────────
      const templates = {
        accessibility: [
          { faculty: "aksesibilitas", ids: ["01", "02", "03", "04", "05", "06"] },
          { faculty: "warna", ids: ["06"] },
          { faculty: "ux-writing", ids: ["06"] },
        ],
        "color design": [
          { faculty: "warna", ids: ["01", "02", "03", "05", "06", "07", "08"] },
        ],
        "design system": [
          { faculty: "design-systems", ids: ["01", "02", "03", "04", "05"] },
          { faculty: "warna", ids: ["08"] },
          { faculty: "tipografi", ids: ["02", "07"] },
        ],
        "form design": [
          { faculty: "design-patterns", ids: ["02", "06", "07"] },
          { faculty: "ux-writing", ids: ["03", "04"] },
          { faculty: "aksesibilitas", ids: ["05"] },
        ],
        chatbot: [
          { faculty: "conversational-ui", ids: ["01", "02", "03", "05"] },
          { faculty: "ux-writing", ids: ["01", "04"] },
        ],
        "rag chatbot": [
          { faculty: "ai-integration", ids: ["01", "02", "03", "05", "06"] },
          { faculty: "conversational-ui", ids: ["01", "03", "05"] },
        ],
        "ai agent": [
          { faculty: "ai-integration", ids: ["01", "04", "07", "08", "09", "10"] },
          { faculty: "agentic-engineering", ids: ["01", "03", "06", "07"] },
        ],
        security: [
          { faculty: "security", ids: ["01", "02", "03", "05", "08", "09"] },
          { faculty: "devops-infra", ids: ["03"] },
        ],
        performance: [
          { faculty: "performance", ids: ["01", "02", "03", "05", "06", "07"] },
          { faculty: "database-management", ids: ["03", "04"] },
        ],
        testing: [
          { faculty: "testing-qa", ids: ["01", "02", "03", "04", "06"] },
          { faculty: "software-engineering", ids: ["05"] },
        ],
        "ux research": [
          { faculty: "ux-research", ids: ["01", "02", "04", "06", "03"] },
        ],
        "mobile app": [
          { faculty: "mobile-ux", ids: ["01", "02", "03", "04", "05"] },
          { faculty: "layout", ids: ["05"] },
          { faculty: "design-patterns", ids: ["03"] },
        ],
        "brand identity": [
          { faculty: "branding", ids: ["01", "02", "03", "04", "05"] },
          { faculty: "warna", ids: ["03", "07"] },
          { faculty: "tipografi", ids: ["03"] },
        ],
        "ux writing": [
          { faculty: "ux-writing", ids: ["01", "02", "03", "04"] },
        ],
        animation: [
          { faculty: "animasi", ids: ["01", "02", "03", "04", "05", "06"] },
        ],
        dashboard: [
          { faculty: "data-viz", ids: ["01", "02", "03", "04", "05"] },
          { faculty: "layout", ids: ["01", "05"] },
          { faculty: "warna", ids: ["06"] },
        ],
        "project improvement": [
          { faculty: "improvement", ids: ["01", "02", "03", "04", "06"] },
          { faculty: "aksesibilitas", ids: ["01"] },
        ],
      };

      // ── Match goal to template ──────────────────────────
      const normalizedGoal = goal.toLowerCase();
      let matchedTemplate = null;
      let matchedTemplateKey = null;
      let matchScore = 0;

      for (const [key, template] of Object.entries(templates)) {
        let score = 0;
        const keyWords = key.split(" ");
        for (const kw of keyWords) {
          if (normalizedGoal.includes(kw)) score += 2;
        }
        if (normalizedGoal === key) score += 5;
        if (score > matchScore) {
          matchScore = score;
          matchedTemplate = template;
          matchedTemplateKey = key;
        }
      }

      // Fallback: use auto-router search_campus
      if (!matchedTemplate || matchScore < 2) {
        const searchResult = core.searchCampus(goal);
        const fallback = searchResult.results.slice(0, 3).map(r => ({
          faculty: r.faculty,
          ids: r.courses.slice(0, 3).map(c => c.id),
          reason: `Matched by keyword: ${r.matchedKeywords.slice(0, 3).join(", ")}`,
        }));

        if (fallback.length === 0) {
          return {
            content: [{
              type: "text",
              text: fmt({
                goal,
                error: "No matching learning path found.",
                suggestion: "Try a more specific goal: 'build a web app', 'design accessible forms', 'create a RAG chatbot', 'improve my project's UX', 'set up a design system', 'secure my API', 'improve performance'.",
                hint: "Use search_campus or list_faculties to explore available topics.",
              }),
            }],
          };
        }

        matchedTemplate = fallback;
      }

      // ── Build course sequence ───────────────────────────
      const path = [];
      const seen = new Set();

      for (const step of matchedTemplate) {
        const fd = index.faculties[step.faculty];
        if (!fd) continue;

        for (const cid of step.ids) {
          if (path.length >= limit) break;
          const key = `${step.faculty}/${cid}`;
          if (seen.has(key)) continue;

          const course = fd.courses.find(c => c.id === cid);
          if (!course) continue;

          // Filter by experience level
          if (experienceLevel === "beginner" && course.level === "advanced") continue;
          if (experienceLevel === "intermediate" && course.level === "advanced" && path.filter(p => p.level === "advanced").length >= 2) continue;

          // Include prerequisites first (respect maxCourses limit)
          // Uses resolvePrerequisites to handle both plain IDs and cross-faculty format
          core.resolvePrerequisites(course.prerequisites, step.faculty, index).forEach(
            (prereq) => {
              if (path.length >= limit) return;
              if (prereq.note) return; // skip unresolved (e.g., missing cross-faculty refs)
              const pk = `${prereq.faculty}/${prereq.id}`;
              if (!seen.has(pk)) {
                seen.add(pk);
                path.push({
                  step: path.length + 1,
                  faculty: prereq.faculty,
                  facultyName: prereq.facultyName,
                  emoji: index.faculties[prereq.faculty].emoji || "📚",
                  courseId: prereq.id,
                  title: prereq.title,
                  level: prereq.level,
                  file: prereq.file,
                  isPrerequisite: true,
                });
              }
            }
          );

          if (path.length >= limit) break;
          seen.add(key);
          path.push({
            step: path.length + 1,
            faculty: step.faculty,
            facultyName: fd.name,
            emoji: index.faculties[step.faculty].emoji || "📚",
            courseId: course.id,
            title: course.title,
            level: course.level,
            file: course.file,
            reason: step.reason || (matchedTemplateKey ? `Part of ${matchedTemplateKey} learning path` : 'Custom learning path'),
          });
        }
      }

      return {
        content: [{
          type: "text",
          text: fmt({
            goal,
            experienceLevel,
            totalSteps: path.length,
            estimatedTime: `${path.length * 10}-${path.length * 15} minutes total`,
            learningPath: path.map(p => ({
              step: p.step,
              course: `${p.emoji} ${p.courseId} — ${p.title}`,
              faculty: p.facultyName,
              level: p.level,
              loadWith: `load_course(file="${p.file}")`,
              reason: p.reason || (p.isPrerequisite ? "Prerequisite for next course" : "Core course for your goal"),
            })),
            nextSteps: "Use load_course to load each course in order. Start with Step 1 and work through sequentially.",
          }),
        }],
      };
    } catch (err) {
      return { content: [{ type: "text", text: fmt({ error: err.message }) }] };
    }
  }
);

// ── Start Server ─────────────────────────────────────────────
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("MCP Server fatal error:", err.message);
  process.exit(1);
});
