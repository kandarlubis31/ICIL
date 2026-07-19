# ⚡ 05 — Network & Asset Optimization

> 🟡 Intermediate | Prereq: 01 | ~9 min

The network is the slowest part of any application. Compression, CDNs, lazy loading, and optimized assets can cut page load times in half without touching backend code.

---

## 5.1 Compression

```nginx
# gzip — enable for text-based responses
gzip on;
gzip_types text/css application/javascript image/svg+xml;
gzip_min_length 1000;
gzip_comp_level 6;

# Brotli — 20% better than gzip (modern browsers)
brotli on;
brotli_types text/css application/javascript;
```

## 5.2 Image Optimization

```
FORMAT CHOICE:
  Photos    → WebP (lossy, 25-35% smaller than JPEG) or AVIF (best)
  Icons     → SVG (infinitely scalable)
  Screenshots → PNG (lossless)
  Animations → WebP or AVIF (NOT GIF — 10x larger)

DELIVERY:
  <img 
    srcset="img-400.webp 400w, img-800.webp 800w, img-1200.webp 1200w"
    sizes="(max-width: 600px) 100vw, 50vw"
    loading="lazy"
    decoding="async"
  >

TOOLS:
  → sharp (Node.js) — programmatic optimization
  → squoosh.app — manual compression
  → Image CDN (Cloudinary, imgix) — auto-optimize on-the-fly
```

## 5.3 Lazy Loading

```html
<!-- Images: browser-native lazy loading -->
<img src="hero.jpg" loading="lazy" decoding="async">

<!-- Iframes: lazy load embedded content -->
<iframe src="https://youtube.com/embed/..." loading="lazy">

<!-- JS/CSS: dynamic imports -->
const HeavyChart = React.lazy(() => import('./HeavyChart'));
```

## 5.4 HTTP/2 & HTTP/3

```
HTTP/1.1: 6 parallel connections, head-of-line blocking
HTTP/2:   Multiplexing, server push, header compression
HTTP/3:   QUIC (UDP), 0-RTT resumption, no head-of-line

Enable: HTTP/2 = default on modern servers
        HTTP/3 = nginx 1.25+ with quic branch
```

## 5.5 CDN Strategy

```
STATIC ASSETS (hashed filenames):
  Cache-Control: public, max-age=31536000, immutable
  → Cache forever; new hash = new URL

HTML (dynamic pages):
  Cache-Control: public, max-age=0, must-revalidate
  → Always check for updates

API (JSON):
  Cache-Control: private, max-age=60
  → Short cache, user-specific
```

## 5.6 Anti-Patterns

- **Unoptimized images** — 4MB hero image on a mobile landing page = instant bounce
- **No CDN** — serving assets from origin server adds 200-500ms latency
- **Loading all JS upfront** — code-split by route; load only what's needed

## 5.7 ICIL Cross-Ref

Use with: `performance/01` (Core Web Vitals), `performance/02` (CDN caching)

## ⚡ Action Checklist
- [ ] All images: WebP/AVIF format, responsive srcset, lazy loaded
- [ ] CDN enabled for static assets with 1-year cache (hashed filenames)
- [ ] Brotli compression for text assets; gzip fallback
- [ ] JS code-split by route — no single bundle > 200KB
- [ ] Test page load on WebPageTest.org (mobile 3G, Moto G4)
