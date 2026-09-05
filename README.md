# hemanthguvvala.github.io

Personal site of **Hemanth Kumar Guvvala** — Lead Product Engineer at IBS Software and independent
product builder. It serves three jobs at once: a personal brand page, a directory of the products
I've launched, and an engineering portfolio.

**Live:** <https://hemanthguvvala.github.io/>

---

## Repository layout

The application lives in **`portfolio-react/`**. That is the only directory the deployment
workflow builds — nothing at the repository root is compiled or served.

```
.
├── .github/workflows/deploy.yml   # build + deploy to GitHub Pages on push to master
├── portfolio-react/               # ← the application
│   ├── public/                    # copied verbatim into dist/
│   ├── scripts/                   # build-time prerender + sitemap generation
│   └── src/
│       ├── components/            # reusable UI
│       ├── data/                  # single source of truth (products, profile, career)
│       ├── pages/                 # one file per route
│       ├── seo/                   # head model + JSON-LD builders
│       ├── utils/                 # analytics scaffold
│       ├── App.jsx                # layout + client routes
│       ├── entry-server.jsx       # build-time render entry (prerender only)
│       ├── main.jsx               # browser entry
│       └── routes.js              # the shared route table
└── README.md
```

## Stack

| Concern    | Choice                                                       |
| ---------- | ------------------------------------------------------------ |
| Framework  | React 19                                                     |
| Build      | Vite 7                                                       |
| Styling    | Tailwind CSS 3 (tokens in `tailwind.config.js`)              |
| Routing    | react-router-dom 7                                           |
| Motion     | framer-motion 12                                             |
| Fonts      | Space Grotesk / Inter / JetBrains Mono + Material Symbols     |
| Hosting    | GitHub Pages                                                 |

There is no analytics provider, no contact-form backend, and no tracking. The only third-party
runtime script is particles.js, loaded from a CDN on the homepage only.

## Local development

```bash
cd portfolio-react
npm install
npm run dev        # http://localhost:5173
```

Note that `npm run dev` serves the SPA **without** prerendering. Deep links work in dev because
Vite's dev server rewrites unknown paths to `index.html`. To exercise what actually ships, build
and preview:

```bash
npm run build
npm run preview
```

## Build pipeline

`npm run build` runs four steps in order:

| Step             | What it does                                                          |
| ---------------- | --------------------------------------------------------------------- |
| `build:client`   | Vite client build → `dist/`                                           |
| `build:ssr`      | Vite SSR build of `entry-server.jsx` → `dist-ssr/` (temporary)         |
| `prerender`      | Renders every route to static HTML, then deletes `dist-ssr/`           |
| `sitemap`        | Writes `dist/sitemap.xml` from the same route list                     |

Also available: `npm run lint`.

## ⚠️ GitHub Pages routing — read this before changing routing

GitHub Pages has **no server-side routing**. It serves static files and nothing else.

This site previously shipped one `index.html` plus a `404.html` that bounced deep links back to
`/?p=<path>` using JavaScript. Browsers coped, but **every deep route answered crawlers with HTTP
404** — including six of the seven URLs listed in `sitemap.xml`.

The current approach removes the need for server routing entirely: **`scripts/prerender.mjs`
renders every known route to a real HTML file at build time.** `/products` is a genuine file that
returns HTTP 200 with its content already in the markup, before any JavaScript runs.

Two details that are easy to break:

1. **Each route is written twice** — `dist/products.html` *and* `dist/products/index.html`.
   GitHub Pages resolves extensionless URLs differently depending on whether a matching file or
   directory exists; writing both guarantees a 200 either way. Both copies carry the same
   canonical URL, so there is no duplicate-content risk.

2. **`entry-server.jsx` resolves routes eagerly, on purpose.** The browser build wraps pages in
   `React.lazy`. If the prerenderer reused that tree, every route would suspend and React would
   emit the loading spinner as the visible markup, appending the real content after the footer
   inside a hidden element for client script to swap in — which defeats the point. Do not
   "simplify" it back to the lazy tree without re-checking the output.

`404.html` is still generated and is still the correct response for genuinely unknown URLs, but it
now renders the branded 404 page and carries `noindex`.

## Product data architecture

**`src/data/products.js` is the single source of truth.** Nothing about a product is hardcoded in
JSX. One entry drives the homepage, the directory, the detail page, the sitemap and the JSON-LD.

Rules enforced by convention in that file:

- **Never invent data.** No downloads, ratings, review counts, revenue or user numbers unless
  they come from a real, citable source. Use `null` for anything unknown — the UI hides null
  fields rather than rendering placeholders.
- **`playStoreUrl` must be a real, individual listing.** Every URL in the file was verified to
  return HTTP 200. An unpublished app gets `null` and its CTA renders disabled; it must never be
  pointed at the generic developer page to look live.
- **`hasDetailPage: true` requires real content** — a `longDescription` and `features`. Thin pages
  hurt SEO more than they help.

### Adding a product

1. Add an entry to `src/data/products.js` with at minimum `name`, `slug`, `shortDescription`,
   `category`, `platform`, `status`.
2. Drop a 192×192 icon at `public/assets/products/<slug>.png` and set `icon`. Without one, the
   card falls back to a tinted monogram — which is fine.
3. If you have a real `longDescription` and `features`, set `hasDetailPage: true`. The route,
   sitemap entry and prerendered page appear automatically.
4. Add curated `related` slugs for cross-product discovery.

Statuses are `live`, `in-development`, `coming-soon` and `archived`. Archived products stay
visible — history is not hidden — but never look downloadable.

### Adding a route

1. Add the page component to `src/pages/`.
2. Add an entry to **`src/routes.js`** (shared by the browser and the prerenderer).
3. If it should be indexed, add it to `STATIC_ROUTES` in **`scripts/routes.mjs`**.
4. Add a `<SEO>` element to the page. The prerender **fails the build** if a route renders
   without SEO metadata, which is deliberate.

## SEO

Per-route metadata comes from one `<SEO>` component (`src/components/SEO.jsx`). The browser path
and the prerender path consume the same `buildHead()` output, so the static HTML and the SPA
cannot disagree.

Every indexable route has a unique `<title>`, description, canonical URL, Open Graph and Twitter
tags, exactly one `<h1>`, and appropriate JSON-LD (`Person`, `WebSite`, `WebPage`, `ItemList`,
`SoftwareApplication`, `BreadcrumbList`).

`src/seo/jsonld.js` never emits `aggregateRating`, `ratingValue`, `reviewCount` or `offers.price`.
`SoftwareApplication` is only emitted for products that are actually live.

## Files that must keep working

| File                            | Why                                            |
| ------------------------------- | ---------------------------------------------- |
| `public/app-ads.txt`            | AdMob verification. Publisher ID must stay `pub-9460933302095977`. |
| `public/google3a15862b0f820187.html` | Google Search Console verification. Must return 200. |
| `public/robots.txt`             | Must keep `/assets/` crawlable for rendering-based indexing. |

## Deployment

Push to `master`. `.github/workflows/deploy.yml` runs `npm ci` and `npm run build` inside
`portfolio-react/`, then publishes `portfolio-react/dist` via `actions/deploy-pages`.

The `main` and `gh-pages` branches hold older versions of the site and are not used by the current
deployment.
