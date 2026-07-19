# 🤝 Contributing to ICIL

> Thank you for your interest in contributing! This guide will help you write courses, improve existing content, or propose new faculties.

---

## 📜 Code of Conduct

Be respectful, inclusive, and constructive. We're building knowledge that serves AI agents and humans worldwide. Discrimination of any kind is not tolerated.

---

## 🚀 Quick Start

```
1. Fork the repository
2. Read CONTEXT.md to understand current state
3. Read index.json for the complete course catalog
4. Pick a task (see below)
5. Create your content following the templates
6. Submit a pull request
```

---

## 📝 How to Write a New Course

### Course File Template

```markdown
# [EMOJI] XX — Course Title

> **Level: 🟢/🟡/🔴** | Prerequisite: — or course IDs | Est. reading time: X min

Brief intro paragraph (2-3 sentences).

---

## X.1 Section Title

Content with code blocks, tables, ASCII diagrams.

---

## X.2 Section Title

More content...

---

## X.N Quick Summary

| Concept | Key Takeaway |
|---------|-------------|
| ... | ... |

---

> **Next:** [XX — Next Course](./xx-next-course.md) — Brief description of what's next.
```

### Level Markers

| Marker | Level | Meaning |
|--------|-------|---------|
| 🟢 | Beginner | No prior knowledge needed |
| 🟡 | Intermediate | Some prerequisites required |
| 🔴 | Advanced | Deep expertise needed |

### Content Guidelines

1. **Self-contained**: Each file must stand alone — an AI agent should understand it without loading other files
2. **Research-backed**: All content must be based on established research, not guesses
3. **Practical**: Include code examples, tables, and ASCII diagrams — not just theory
4. **Deep, not wide**: Go deep on each topic. Surface-level content already exists everywhere
5. **Agent-first**: Write in a format optimal for AI agent loading (clear headings, scannable tables, code blocks)
6. **English**: All content in English with technical terms preserved
7. **Cross-references**: Reference other courses using the format `faculty/XX-course-name.md`

---

## 🏛️ How to Create a New Faculty

### Step 1: Proposal

Open an issue with:
- Faculty name and emoji
- Directory name (English, kebab-case)
- List of proposed courses (7-9 recommended)
- Why this faculty is needed

### Step 2: Build

```
1. Create directory with English kebab-case name
2. Create README.md (see template below)
3. Create 7-9 course files (01-XX-kebab-case.md)
4. Update index.json:
   - Bump version (X.0.0 → X+1.0.0)
   - Increment totalCourses
   - Add trigger_keywords entry under auto_router
   - Add faculty entry under faculties with all courses
   - Add routing_rules.examples entry (optional but recommended)
5. Update root README.md:
   - Add directory to tree structure
   - Add entry to "Available Faculties" section
   - Move from Roadmap to active (if it was planned)
6. Update CONTEXT.md:
   - Add to Active Faculties table
   - Update file structure
   - Update session checklist
7. Update CHANGELOG.md with new version entry
```

### Faculty README Template

```markdown
# [EMOJI] Faculty of [Name] — Overview

> **N Courses** | Level: Beginner → Advanced | Domain: [description]

Brief description of what this faculty covers.

---

## 📋 Course List

| ID | Course | Level | Prerequisite |
|----|--------|-------|-------------|
| 01 | [Course Title](./01-course-file.md) | 🟢 Beginner | — |
| 02 | [Course Title](./02-course-file.md) | 🟢 Beginner | 01 |
| ... | ... | ... | ... |

---

## 🎯 Learning Paths

### Beginner Path
```
01 → 02 → 03
```
Description.

### Intermediate Path
```
01 → 02 → 03 → 04 → 05
```
Description.

### Advanced Path (Full)
```
01 → ... → 07
```
Description.

---

## 🔍 Keyword Index

`keyword1`, `keyword2`, `keyword3`, ...
```

---

## 🔧 How to Improve Existing Content

### Fixing Inaccuracies

1. Open an issue describing the inaccuracy
2. Cite the correct source
3. Submit a PR with the fix

### Adding Depth to Existing Courses

1. Read the existing course thoroughly
2. Identify gaps (missing examples, outdated info, thin sections)
3. Add content following the same format and style
4. Submit a PR with a clear description of what you added

### Adding Cross-References

When a course relates to content in another faculty, add a cross-reference:

```markdown
> **Deep dive**: For more on [topic], see `faculty/XX-course-name.md`.
```

---

## 🗂️ File Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Directory names | English, kebab-case | `branding/`, `aksesibilitas/` |
| Course files | `XX-kebab-case-title.md` | `01-wcag-foundations.md` |
| README files | `README.md` | One per faculty + root |
| Root meta files | UPPERCASE | `CONTEXT.md`, `CHANGELOG.md` |

---

## ✅ Pull Request Checklist

Before submitting a PR, verify:

```
□ Content follows the course template
□ Level marker is correct (🟢/🟡/🔴)
□ Prerequisites are accurate
□ "Next:" link points to an actual file
□ Cross-references use correct format (faculty/XX-file.md)
□ Code examples are copy-paste ready and tested
□ Tables are properly formatted
□ No untranslated Indonesian text (unless in bilingual keywords)
□ index.json is updated (if adding courses/faculty)
□ README.md is updated (if adding faculty)
□ CONTEXT.md is updated (if adding faculty)
□ CHANGELOG.md has a new entry
□ All claims are research-backed
```

---

## 🧪 Testing Your Changes

### Validate index.json

```bash
node -e "require('./index.json'); console.log('JSON valid ✓')"
```

### Test Auto-Router with CLI

```bash
node load-context.js "your test prompt here"
```

### Verify Cross-References

Check that all `faculty/XX-file.md` references point to files that actually exist.

---

## 📬 Questions?

- Open an issue for discussion
- Check `CONTEXT.md` for current project state
- Check `konsep.txt` for the original vision

---

> *"Deep knowledge makes agents truly powerful."* — Mas Aul 🔥
