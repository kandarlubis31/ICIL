# 🔍 ICIL Audit Plan — v26.0.0 Re-baseline

> **Goal**: Memastikan project matang untuk publik tanpa menganggap checklist lama sebagai bukti verifikasi baru.
> **Status**: Legacy v25 checklist retained; current v26 baseline is P@3=73.7%, R@3=96.0%, MRR=0.934, 226 courses, 30 faculties.
> **Cara pakai**: Centang `[x]` hanya setelah item diverifikasi pada v26; historical claims below are not current evidence.

> **Current verified gates**: `node ci-validate.js --with-eval`, `node ci-faculty.js --all`, and `npm run ci:faculty` pass. Manual content-quality and release-readiness items remain open.

---

## 🏁 Definition of Done

**Project dinyatakan "MATANG — SIAP PUBLIK" ketika:**
- ✅ Semua item 🔴 HIGH (Code Quality + Data Integrity) checked
- ✅ Semua item 🟡 MEDIUM (Docs + Infra) checked
- ✅ `node ci-validate.js --with-eval` → ALL CHECKS PASSED, exit 0
- ✅ `npm pack --dry-run` → no warnings, size reasonable

---

## 📋 Ringkasan Kategori

| # | Kategori | Item | Prioritas |
|---|----------|------|-----------|
| 1 | 🔧 Code Quality | 19 | 🔴 HIGH |
| 2 | 📊 Data Integrity | 12 | 🔴 HIGH |
| 3 | 📝 Documentation Sync | 17 | 🔴 HIGH |
| 4 | 📚 Course Content Audit | 11 | 🟡 MEDIUM |
| 5 | 🎯 Routing & Eval | 8 | 🟡 MEDIUM |
| 6 | 🏗️ Infrastructure | 11 | 🟡 MEDIUM |
| 7 | ✨ Visual Polish | 8 | 🟢 LOW |
| **Total** | | **86** | |

---

> **Scope note:** Sections 1–7 below preserve the original v25 audit checklist for traceability. Unless an item is explicitly re-verified and marked `[x]`, it is open manual work—not a current v26 failure claim. Historical release/version numbers inside checklist prompts are reference targets only.

## 1. 🔧 Code Quality — JS Files (16 items)

> **Files**: `campus-core.js` (17.8KB), `mcp-server.js` (36.8KB), `ci-validate.js` (13.9KB), `eval-runner.js` (11.6KB), `load-context.js` (9.2KB)

> **Pre-checked ✅** (verified in session): 0 TODO/FIXME/HACK/debugger markers in implementation logic, no hardcoded credentials; intentional `console.log` calls remain in CLI/reporting scripts.

### 1.1 Clean Code
- [ ] **`campus-core.js`**: Cek apakah semua function punya JSDoc / comment header
- [ ] **`mcp-server.js`**: Pastiin semua 10 tool handler konsisten signature-nya (params → return)
- [ ] **`ci-validate.js`**: 4-stage pipeline jelas — gak ada dead code tersisa
- [x] **`eval-runner.js`**: `runAll()` & `main()` — `require.main === module` guard verified
- [x] **`load-context.js`**: CLI handles `--json`, `--list`, `--interactive`, and `--help` paths

### 1.2 Error Handling
- [ ] **Semua JS**: `try/catch` di file I/O operations — gak boleh crash tanpa pesan
- [ ] **`mcp-server.js`**: Tool error responses — return error object, jangan throw mentah
- [x] **`campus-core.js`**: `getCourseContent()` returns `null` gracefully for missing files
- [x] **`ci-validate.js`**: Exit code logic verified: 0 = pass, 1 = failure

### 1.3 Redundancy & Dead Code
- [ ] **`mcp-server.js`**: Cek redundant `require()` — semua import dipakai?
- [ ] **`campus-core.js`**: Cek exports — semua 10 export beneran dipakai di consumer files?
- [ ] **`eval-runner.js`**: Cek duplikasi logic sama `ci-validate.js` (keduanya punya eval runner copy)

### 1.4 Security & Hardening
- [x] **`mcp-server.js`**: `load_course`, `compare_courses`, and export paths reject traversal/absolute paths
- [x] **`load-context.js`**: No `eval()` or dynamic code execution from user input
- [x] **Semua JS**: No hardcoded credentials/tokens detected by static scan

### 1.5 MCP Tool Descriptions
- [x] **`mcp-server.js`**: 10 tool registrations and descriptions are present; campus metadata is generated dynamically from `loadIndex()`
- [x] **`mcp-server.js`**: Server description/version use current index metadata (`v26.0.0`, 226 courses, 30 faculties)

### 1.6 Duplicate Code Check
- [ ] **`eval/eval-runner.js`** (CI copy) vs root **`eval-runner.js`** — byte-for-byte identical? Atau perlu sync?

### 1.7 Node.js Best Practices
- [x] **`package.json`**: `engines.node` declares `>=18.0.0`

---

## 2. 📊 Data Integrity — index.json vs Realitas (12 items)

> **Sumber kebenaran**: `index.json` (313KB) → dibaca oleh auto-router, MCP server, dan CI validator.

### 2.1 Version Consistency
- [x] **`index.json`.version** === **`package.json`.version** — both are `26.0.0`
- [x] **`index.json`.totalCourses** === manual faculty course count — both are `226`
- [x] **Semua faculty `courseCount`** matches its `courses.length` where the field is present

### 2.2 File Existence
- [x] **226 course `.md` files** — all exist on disk with valid indexed paths
- [x] **30 faculty `README.md`** — all exist on disk
- [x] **Cross-reference check** — all prerequisite references resolve, including faculty-qualified refs

### 2.3 Course Metadata Accuracy
- [ ] **Level badges** di tiap course entry (`beginner`/`intermediate`/`advanced`) konsisten sama isi file?
- [x] **Prerequisite IDs** — all valid in same-faculty or `faculty/XX` format
- [x] **emoji field** — 30 non-empty, unique faculty emojis verified

### 2.4 Trigger Keywords Integrity
- [x] **Semua `course_ids` di HIGH/MEDIUM keywords** — all resolve to courses in their faculty
- [x] **Gak ada keyword yang sama persis** muncul di HIGH & LOW di faculty yang sama — 0 after removing the redundant `knowledge graph` LOW entry
- [ ] **134 CROSS-FACULTY warnings** — quick audit 10 random buat pastiin gak ada yang harusnya DUPLICATE HIGH

---

## 3. 📝 Documentation Sync — Meta Files (14 items)

> **Files**: `README.md`, `AGENTS.md`, `CONTEXT.md`, `CAMPUS-OVERVIEW.md`, `PROGRESS-REPORT.md`, `CHANGELOG.md`, `ISSUES.md`, `CONTRIBUTING.md`, `ROADMAP-v2.md`, `index.md`, `ARCHIVE.md`, `LICENSE`

### 3.1 Version Numbers
- [x] **`README.md` badges** — v26.0.0, 226 courses, 30 faculties, 10 tools, and P@3 73.7%
- [x] **`AGENTS.md` header** — v26.0.0 / 226 courses / 30 faculties
- [x] **`index.md`** — v26 entry point and counts consistent
- [x] **`CONTEXT.md` session header** — v26.0.0, 226 courses, 30 faculties, current metrics

### 3.2 README Tree — Historical v25 Checklist (re-verify only if the README changes)
- [x] **Historical README tree drift**: `conversational-ui` is now **8** courses
- [x] **Historical README tree drift**: `software-engineering` is now **9** courses
- [x] **Historical README tree drift**: `ai-integration` is now **10** courses
- [x] **Historical README tree drift**: `security` is now **9** courses
- [x] **Historical README tree drift**: `agentic-engineering` is now **9** courses

### 3.3 Faculty Description Accuracy
- [x] **`README.md` faculty descriptions** — current course counts match the v26 catalog (warna=9, design-patterns=8, conversational-ui=8, software-engineering=9, ai-integration=10, security=9, agentic-engineering=9, sisanya 7)
- [x] **Historical v25 description drift** — conversational-ui, software-engineering, ai-integration, security, and agentic-engineering now show their current course counts
- [ ] **`CAMPUS-OVERVIEW.md`** — automated links pass; human review of all 17 task paths remains
- [x] **`CHANGELOG.md`** — v26.0.0 entry exists and historical v25 entries are retained intentionally

### 3.4 Link Validity
- [ ] **Internal links** — static scan passes for production links, but four intentional template/path placeholders remain in `CONTRIBUTING.md` and `AUDIT-PLAN.md`; resolve or explicitly exclude them before final sign-off
- [ ] **External links** — no `your-username`/example-domain placeholders detected; live URL availability still requires remote verification
- [ ] **Image/badge URLs** — static badge syntax is present; render verification still requires GitHub/browser review

### 3.5 CONTRIBUTING.md Template Check
- [ ] **Course template** di `CONTRIBUTING.md` — match sama format real course files? Kalau contributor follow template, CI bakal pass?

### 3.6 Handoff Quality
- [x] **`AGENTS.md`** — current v26 entry point, commands, faculty list, and CI references verified
- [x] **`PROGRESS-REPORT.md`** — current metrics, Faculty CI, prerequisite dedup, and remaining work documented
- [ ] **`ARCHIVE.md`** — isinya clean, gak ada referensi ke file yang udah dihapus

---

## 4. 📚 Course Content Audit — 226 Files (10 items)

> **Sampling strategy**: 10% random (23 courses) + 5 known-high-value courses = 28 files

### 4.1 Format Consistency
- [ ] **Sample 10% course files** — cek format: ada `# Title`, `> Level | Prereq | ~N min` header?
- [ ] **Sample 10% course files** — ada `## Section` numbering yang bener? (`X.1`, `X.2`, ...)
- [ ] **Sample 10% course files** — ada `⚡ Action Checklist` di bagian akhir?
- [ ] **Sample 10% course files** — gak ada placeholder text kayak "TODO" atau "coming soon"

### 4.2 Content Quality
- [ ] **Sample 10% course files** — word count reasonable (~400-700 kata sesuai AGENTS.md convention)?
- [ ] **Sample 10% course files** — gak ada markdown syntax error (unclosed code blocks, broken tables)
- [ ] **Sample 10% course files** — cross-reference `ICIL Cross-Ref` section valid?

### 4.3 Language Consistency
- [ ] **Sample 10% course files** — English only? (AGENTS.md requirement)
- [ ] **Sample 10% course files** — gak ada mixed EN/ID yang bikin bingung

### 4.4 Gap Analysis (Automated)
> **Gunakan `node -e` one-liner script** buat scan 226 file — jangan manual.
- [x] **Auto-scan word count** — completed: 0 courses under 200 words; 22 courses over 1,200 words flagged for editorial review
- [x] **Auto-scan level balance** — completed: 41 beginner / 114 intermediate / 71 advanced across 226 courses

---

## 5. 🎯 Routing & Eval Tuning (8 items)

> **Current baseline**: P@3=73.7%, R@3=96.0%, MRR=0.934, 134 CROSS-FACULTY warnings, 0 no-match, 0 failed faculty prompts; 65 course-level misses remain informational

### 5.1 Eval Set Quality
- [x] **217 eval prompts** — semua punya faculty-qualified `expected_courses` yang valid (validated by `eval-runner.js` and Faculty CI)
- [x] **Distribusi difficulty** — measured at 172 easy / 33 medium / 11 hard / 1 advanced; proportionality judgment remains open
- [ ] **Design-ethics prompts (eval-201–207)** — cek naturalness, jangan keyword-stuffed

### 5.2 False Positive Analysis
- [ ] **Top 10 faculty yg paling sering muncul sebagai false positive** — audit keyword overlap-nya
- [x] **No-match cases** — current evaluator reports 0 no-match prompts; retain regression coverage for future changes

### 5.3 Threshold Realism
- [ ] **70% P@3 threshold** — masih appropriate? Atau naikin ke 75% buat v26?
- [ ] **Cross-faculty warnings** — 134 items masih dianggap "all legitimate, 0 actionable" — re-audit 20 random

### 5.4 Eval Expansion
- [x] **Per faculty eval coverage** — all 30 faculties have at least 5 prompts

---

## 6. 🏗️ Infrastructure & CI (10 items)

### 6.1 GitHub CI
- [ ] **`.github/workflows/ci.yml`** — beneran jalan di GitHub Actions? Cek syntax dulu
- [x] **CI steps** — workflow runs dependency install, base validation, and full eval gate sequentially
- [x] **Node version matrix** — workflow declares Node 18, 20, and 22

### 6.2 Git Hygiene
- [x] **`.gitignore`** — protects `node_modules/`, `.env`/`.env.*` with `.env.example` exception, and OS files
- [ ] **Git tags** — v25.0.0, v25.0.4, v25.0.5 semua ada? annotated tags?
- [ ] **Commit history** — bersih, gak ada commit message kayak "WIP" atau "fix bug" yang vague

### 6.3 npm Readiness
- [x] **`package.json`** fields — all required release fields are present
- [x] **`package.json` `files` array** — package scope excludes archive/development files and includes all 30 faculty directories
- [x] **`npm pack --dry-run`** — passed: 263 files, 479.1 kB compressed, 1.5 MB unpacked

### 6.4 npm Packaging
- [x] **`.npmignore` file** — explicit root `.npmignore` exists and excludes development/archive files
- [ ] **`npm audit`** — 3 transitive vulnerabilities remain (2 moderate, 1 high); fix or accept risk before npm publish

---

## 7. ✨ Visual & Professional Polish (8 items)

### 7.1 README
- [ ] **Badges bar** — version, courses, faculties, MCP tools, P@3, license — lengkap & render
- [ ] **Diagrams** — P@3/R@3/MRR progress chart via Mermaid (GitHub native rendering)
- [ ] **"Quick Start" section** — user baru bisa langsung paham cara pakai dalam 30 detik?
- [ ] **Contribution section** — jelas link ke CONTRIBUTING.md + cara submit course baru

### 7.2 Repository
- [ ] **GitHub About** — description, website, topics (icil, ai-agent, knowledge-base, mcp-server, context-injection)
- [ ] **GitHub Releases** — bikin release notes buat v25.0.5 dengan summary changes

### 7.3 Consistency
- [ ] **Tone of voice** — semua README/AGENTS/CONTRIBUTING konsisten tone-nya (profesional + approachable)
- [x] **Emoji usage** — 30 faculty emojis are unique and non-empty; subjective appropriateness remains open

---

## 📊 Progress Tracker

| Kategori | Total | Done | % |
|----------|-------|------|-----|
| 🔧 Code Quality | 19 | evidence partially verified | — |
| 📊 Data Integrity | 12 | evidence mostly verified; 1 level-review open | — |
| 📝 Documentation Sync | 17 | evidence partially verified; links/template review open | — |
| 📚 Course Content Audit | 11 | automated scan complete; editorial review open | — |
| 🎯 Routing & Eval | 8 | evidence partially verified; naturalness/threshold review open | — |
| 🏗️ Infrastructure | 11 | local checks verified; GitHub/tag/audit items open | — |
| ✨ Visual Polish | 8 | static presence verified; visual/GitHub review open | — |
| **TOTAL** | **86** | **48 checklist markers verified / 41 open** | **54% marker completion** |

> The current marker count is **89 checklist markers: 48 verified and 41 open** (48/89 = 53.9%, rounded to 54%). This is marker-level progress, not a claim that all manual audit categories are complete.


> **Pre-verified dalam session ini**: 0 TODO/FIXME di JS, 0 console.log, 0 missing course files ✅
> **Legacy v25 verification notes**: The historical Priority 1, Code Quality, Docs Sync, Infrastructure, and Visual Polish notes below are retained for traceability only; their v25 counts and claims are not current v26 evidence. Checklist items explicitly marked `[x]` above were re-verified against the v26 catalog; remaining `[ ]` items are still open.
> **Current v26 evidence**: `node ci-validate.js --with-eval`, `node ci-faculty.js --all`, and `npm run ci:faculty` pass; current catalog is 226 courses across 30 faculties with 134 informational CROSS-FACULTY warnings and 0 DUPLICATE HIGH keywords.

---

## 🚀 Rekomendasi Urutan Pengerjaan

```
Priority 1 (sebelum public announcement):
  ✅ 2. Data Integrity (12) — DONE → 🐛 README tree fixed (5 items) → 3. Documentation Sync (17) → 1. Code Quality (19)
  
Priority 2 (sebelum v1.0.0 declaration):
  6. Infrastructure (11) → 7. Visual Polish (8)
  
Priority 3 (continuous improvement):
  4. Course Content (11) → 5. Routing & Eval (8)
```

---

*Originally generated for ICIL v25.0.5; re-baselined for v26.0.0 on August 1, 2026. Manual checklist verification remains open.*
