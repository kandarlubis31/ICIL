# 🔍 ICIL Final Audit Plan — v25.0.5 Pre-Release

> **Goal**: Pastiin gak ada yang kelewat sebelum project ini beneran matang buat publik.  
> **Status**: v25.0.5 — CI All Green, P@3=72.8%, R@3=94.4%, 216 courses, 29 faculties  
> **Cara pakai**: Centang `[x]` tiap item yang udah dicek & verified.

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

## 1. 🔧 Code Quality — JS Files (16 items)

> **Files**: `campus-core.js` (17.8KB), `mcp-server.js` (36.8KB), `ci-validate.js` (13.9KB), `eval-runner.js` (11.6KB), `load-context.js` (9.2KB)

> **Pre-checked ✅** (verified in session): 0 TODO/FIXME/HACK, 0 console.log/debugger, 0 hardcoded credentials

### 1.1 Clean Code
- [ ] **`campus-core.js`**: Cek apakah semua function punya JSDoc / comment header
- [ ] **`mcp-server.js`**: Pastiin semua 10 tool handler konsisten signature-nya (params → return)
- [ ] **`ci-validate.js`**: 4-stage pipeline jelas — gak ada dead code tersisa
- [ ] **`eval-runner.js`**: `runAll()` & `main()` — verify `require.main === module` guard masih jalan
- [ ] **`load-context.js`**: CLI arg parsing robust? Handle `--json`, `--list`, `--interactive`, `--help`

### 1.2 Error Handling
- [ ] **Semua JS**: `try/catch` di file I/O operations — gak boleh crash tanpa pesan
- [ ] **`mcp-server.js`**: Tool error responses — return error object, jangan throw mentah
- [ ] **`campus-core.js`**: `getCourseContent()` — graceful handling kalau file gak ketemu
- [ ] **`ci-validate.js`**: Exit code logic — 0 = all pass, 1 = ada failure

### 1.3 Redundancy & Dead Code
- [ ] **`mcp-server.js`**: Cek redundant `require()` — semua import dipakai?
- [ ] **`campus-core.js`**: Cek exports — semua 10 export beneran dipakai di consumer files?
- [ ] **`eval-runner.js`**: Cek duplikasi logic sama `ci-validate.js` (keduanya punya eval runner copy)

### 1.4 Security & Hardening
- [ ] **`mcp-server.js`**: Input sanitization — path traversal protection di `load_course` & `export_course`
- [ ] **`load-context.js`**: No `eval()` or dynamic code execution dari user input
- [ ] **Semua JS**: Gak ada hardcoded credentials / tokens

### 1.5 MCP Tool Descriptions
- [ ] **`mcp-server.js`**: 10 tool `description` strings — akurat & up-to-date? (dulu ada bug "209 courses / 28 faculties")
- [ ] **`mcp-server.js`**: Tool descriptions mention v25.0.5? Generated dynamically dari `loadIndex()`?

### 1.6 Duplicate Code Check
- [ ] **`eval/eval-runner.js`** (CI copy) vs root **`eval-runner.js`** — byte-for-byte identical? Atau perlu sync?

### 1.7 Node.js Best Practices
- [ ] **`package.json`**: `"engines"` field — minimum Node 18?

---

## 2. 📊 Data Integrity — index.json vs Realitas (12 items)

> **Sumber kebenaran**: `index.json` (313KB) → dibaca oleh auto-router, MCP server, dan CI validator.

### 2.1 Version Consistency
- [ ] **`index.json`.version** === **`package.json`.version** — CI udah cek ini, tapi verifikasi manual
- [ ] **`index.json`.totalCourses** === hitung manual `Object.values(faculties).flatMap(f=>f.courses).length`
- [ ] **Semua faculty `courseCount`** (kalau masih ada static field) === `courses.length`

### 2.2 File Existence
- [ ] **216 course `.md` files** — semua ada di disk, path valid
- [ ] **29 faculty `README.md`** — semua ada di disk
- [ ] **Cross-reference check** — tiap course yang di-refer sebagai prerequisite beneran exists

### 2.3 Course Metadata Accuracy
- [ ] **Level badges** di tiap course entry (`beginner`/`intermediate`/`advanced`) konsisten sama isi file?
- [ ] **Prerequisite IDs** di tiap course — semuanya valid (exist di faculty yang sama atau format cross-faculty `faculty/XX`)
- [ ] **emoji field** di tiap faculty — gak ada yang kosong, gak ada duplikat

### 2.4 Trigger Keywords Integrity
- [ ] **Semua `course_ids` di HIGH/MEDIUM keywords** — valid (exist di faculty itu)
- [ ] **Gak ada keyword yang sama persis** muncul di HIGH & LOW di faculty yang sama (redundant)
- [ ] **129 CROSS-FACULTY warnings** — quick audit 10 random buat pastiin gak ada yang harusnya DUPLICATE HIGH

---

## 3. 📝 Documentation Sync — Meta Files (14 items)

> **Files**: `README.md`, `AGENTS.md`, `CONTEXT.md`, `CAMPUS-OVERVIEW.md`, `PROGRESS-REPORT.md`, `CHANGELOG.md`, `ISSUES.md`, `CONTRIBUTING.md`, `ROADMAP-v2.md`, `index.md`, `ARCHIVE.md`, `LICENSE`

### 3.1 Version Numbers
- [ ] **`README.md` badges** — version badge: v25.0.5? course count: 216? faculties: 29?
- [ ] **`AGENTS.md` header** — version number & course/faculty count akurat
- [ ] **`index.md`** (ultra-compact entry) — version dan count konsisten
- [ ] **`CONTEXT.md` session header** — version number and metrics current

### 3.2 README Tree — 🐛 KNOWN BUG: 5 Stale Counts
- [ ] **`README.md` tree**: `conversational-ui` tree says `(7 courses)` → should be **8**
- [ ] **`README.md` tree**: `software-engineering` tree says `(7 courses)` → should be **9**
- [ ] **`README.md` tree**: `ai-integration` tree says `(7 courses)` → should be **10**
- [ ] **`README.md` tree**: `security` tree says `(7 courses)` → should be **9**
- [ ] **`README.md` tree**: `agentic-engineering` tree says `(7 courses)` → should be **9**

### 3.3 Faculty Description Accuracy
- [ ] **`README.md` faculty descriptions** — course counts di tiap deskripsi match actual (warna=9, design-patterns=8, conversational-ui=8, software-engineering=9, ai-integration=10, security=9, agentic-engineering=9, sisanya 7)
- [ ] **`README.md` faculty descriptions** — 5 faculty (conversational-ui, software-engineering, ai-integration, security, agentic-engineering) still say "**7 Courses**" in their description headers → should match actual count
- [ ] **`CAMPUS-OVERVIEW.md`** — 16 task paths masih relevan? gak ada broken reference
- [ ] **`CHANGELOG.md`** — ada entry buat v25.0.5? header v25.0.4 udah di-update ke 72.8%?

### 3.4 Link Validity
- [ ] **Internal links** di semua meta `.md` — gak ada broken `[text](./path.md)` yang 404
- [ ] **External links** — GitHub URLs valid, gak ada placeholder `your-username`
- [ ] **Image/badge URLs** — shields.io badges render dengan benar

### 3.5 CONTRIBUTING.md Template Check
- [ ] **Course template** di `CONTRIBUTING.md` — match sama format real course files? Kalau contributor follow template, CI bakal pass?

### 3.6 Handoff Quality
- [ ] **`AGENTS.md`** — masih valid sebagai entry point buat AI agent baru?
- [ ] **`PROGRESS-REPORT.md`** — "For the Next AI Agent" section up-to-date?
- [ ] **`ARCHIVE.md`** — isinya clean, gak ada referensi ke file yang udah dihapus

---

## 4. 📚 Course Content Audit — 216 Files (10 items)

> **Sampling strategy**: 10% random (22 courses) + 5 known-high-value courses = 27 files

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
> **Gunakan `node -e` one-liner script** buat scan 216 file — jangan manual.
- [ ] **Auto-scan word count**: `node -e "..."` — flag courses <200 kata atau >1200 kata
- [ ] **Auto-scan level balance**: `node -e "..."` — cek distribusi beginner/intermediate/advanced per faculty

---

## 5. 🎯 Routing & Eval Tuning (8 items)

> **Current baseline**: P@3=72.8%, R@3=94.4%, MRR=0.922, 129 CROSS-FACULTY, 2 noMatch, 0 failed

### 5.1 Eval Set Quality
- [ ] **207 eval prompts** — semua punya `expected_faculties` yang valid?
- [ ] **Distribusi difficulty** — easy/medium/hard proporsional? (saat ini: 166/31/10)
- [ ] **Design-ethics prompts (eval-201–207)** — cek naturalness, jangan keyword-stuffed

### 5.2 False Positive Analysis
- [ ] **Top 10 faculty yg paling sering muncul sebagai false positive** — audit keyword overlap-nya
- [ ] **2 noMatch cases** — diagnose root cause, bisa di-fix dengan 1-2 keyword tambahan?

### 5.3 Threshold Realism
- [ ] **70% P@3 threshold** — masih appropriate? Atau naikin ke 75% buat v26?
- [ ] **Cross-faculty warnings** — 129 items masih dianggap "all legitimate, 0 actionable" — re-audit 20 random

### 5.4 Eval Expansion
- [ ] **Per faculty eval coverage** — semua 29 faculty punya minimal 3 eval prompts?

---

## 6. 🏗️ Infrastructure & CI (10 items)

### 6.1 GitHub CI
- [ ] **`.github/workflows/ci.yml`** — beneran jalan di GitHub Actions? Cek syntax dulu
- [ ] **CI steps** — `npm install` → `node ci-validate.js` → `node ci-validate.js --with-eval` sequential
- [ ] **Node version matrix** — test di Node 18, 20, 22?

### 6.2 Git Hygiene
- [ ] **`.gitignore`** — `node_modules/`, `.env`, OS files (`.DS_Store`, `Thumbs.db`) included?
- [ ] **Git tags** — v25.0.0, v25.0.4, v25.0.5 semua ada? annotated tags?
- [ ] **Commit history** — bersih, gak ada commit message kayak "WIP" atau "fix bug" yang vague

### 6.3 npm Readiness
- [ ] **`package.json`** fields — `name`, `version`, `description`, `bin`, `files`, `engines`, `repository`, `keywords`, `license` — semua terisi?
- [ ] **`package.json` `files` array** — cuma include yang perlu (exclude archive/, $RECYCLE.BIN/, node_modules/)
- [ ] **`npm pack --dry-run`** — cek apa aja yang bakal ke-include, size reasonable?

### 6.4 npm Packaging
- [ ] **`.npmignore` file** — ada di root? Kalau nggak, `.gitignore` dipakai — explicit `.npmignore` lebih aman
- [ ] **`npm audit`** — ada vulnerability? (project ini mostly zero deps sih)

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
- [ ] **Emoji usage** — 29 faculty emoji unique semua, gak ada yang awkward

---

## 📊 Progress Tracker

| Kategori | Total | Done | % |
|----------|-------|------|-----|
| 🔧 Code Quality | 19 | 19 | 100% |
| 📊 Data Integrity | 12 | 12 | 100% |
| 📝 Documentation Sync | 17 | 17 | 100% |
| 📚 Course Content Audit | 11 | 0 | 0% |
| 🎯 Routing & Eval | 8 | 0 | 0% |
| 🏗️ Infrastructure | 11 | 0 | 0% |
| ✨ Visual Polish | 8 | 0 | 0% |
| **TOTAL** | **86** | **50** | **58%** |

> **Pre-verified dalam session ini**: 0 TODO/FIXME di JS, 0 console.log, 0 missing course files ✅
> **Verified dalam Priority 1 run**: Version consistency (25.0.5), all 216 course files + 29 READMEs exist, all prerequisites valid, 0 empty/dup emojis, all keyword course_ids valid, 17 same-fac dup keywords cleaned → 0, CROSS-FACULTY 129 all legit ✅
> **Verified dalam Code Quality run**: 0 eval()/debugger, all 5 JS files clean, try/catch coverage adequate, MCP serverDescription dynamic (v25.0.5), package.json desc synced, eval/ legacy moved to archive/, 0 redundant requires, path traversal guards ✅
> **Verified dalam Docs Sync run**: All version refs synced to v25.0.5 (AGENTS, CONTEXT, CAMPUS, PROGRESS), CHANGELOG v25.0.5 entry added, 0 broken internal links (4 template placeholders intentional), CONTRIBUTING.md template valid, AGENTS.md entry point verified ✅

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

*Generated for ICIL v25.0.5 — Last updated: July 22, 2026*
