# 📐 05 — Content Modeling & Metadata

> 🟡 Intermediate | Prereq: 01 | ~7 min

Content without structure = chaos. Content modeling defines what content you have, what it's made of, and how pieces connect. Metadata makes it findable.

---

## 5.1 Content Model Definition

```
CONTENT TYPE: Blog Post
├── title (text, required)
├── author (reference → Author)
├── publishDate (datetime)
├── body (rich text)
├── excerpt (text, max 200 chars)
├── featuredImage (image)
├── tags (array → Tag[])
├── category (reference → Category)
└── relatedPosts (array → BlogPost[])
```

---

## 5.2 Content Modeling Process

| Step | Action | Output |
|------|--------|--------|
| 1. **Inventory** | List every content piece | Content inventory spreadsheet |
| 2. **Group** | Cluster similar items | Content types (5-15 max) |
| 3. **Define** | Attributes per type | Content model schema |
| 4. **Relate** | Connect types | Reference diagram |
| 5. **Validate** | Real content test | Adjust model |

---

## 5.3 Metadata Types

| Type | Purpose | Example |
|------|---------|---------|
| **Descriptive** | What is it about? | Title, description, keywords, category |
| **Administrative** | Who manages it? | Author, publish date, status, version |
| **Structural** | How is it connected? | Parent page, sort order, template |
| **Technical** | System properties | File type, size, encoding, checksum |
| **Rights** | Who can use it? | Copyright, license, access level |

---

## 5.4 Schema.org & Structured Data

```html
<!-- JSON-LD structured data for search engines -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "IA Fundamentals",
  "author": { "@type": "Person", "name": "Mas Aul" },
  "datePublished": "2026-07-15",
  "keywords": ["information architecture", "taxonomy", "IA"]
}
</script>
```

| Schema Type | Use For |
|-------------|---------|
| `Article` | Blog posts, news |
| `Product` | E-commerce items |
| `Course` | Educational content (ICIL!) |
| `FAQPage` | FAQ sections |
| `BreadcrumbList` | Breadcrumb navigation |

---

## 5.5 Content Inventory Template

| ID | Title | Type | URL | Owner | Last Updated | Status |
|----|-------|------|-----|-------|-------------|--------|
| 001 | Homepage | Page | / | Marketing | 2026-07-01 | Live |
| 002 | API Docs | Doc | /docs | Eng | 2026-07-14 | Draft |
| 003 | Blog: IA 101 | Post | /blog/ia-101 | Content | 2026-07-10 | Live |

---

## ⚡ Action Checklist

- [ ] Content inventory: list every piece of content (spreadsheet)
- [ ] Define 5-15 content types — no more
- [ ] Audit metadata: do you have descriptive + admin + structural?
- [ ] Add JSON-LD structured data to key pages
- [ ] Every content type has: owner, review cycle, status workflow
