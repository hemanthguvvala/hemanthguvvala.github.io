# hemanthguvvala.github.io

Personal site of **Hemanth Kumar Guvvala** — software engineer and independent product builder.
A brand page, a directory of shipped products, and an engineering portfolio in one.

**Live:** <https://hemanthguvvala.github.io/>

React 19 · Vite 7 · Tailwind 3 · react-router 7 · framer-motion 12, prerendered to static HTML and
served by GitHub Pages. No backend, no cookies, no contact form.

## Running it

```bash
cd portfolio-react       # the only directory the deploy workflow builds
npm install
npm run dev              # http://localhost:5173 — SPA only, no prerender
npm run build && npm run preview   # what actually ships
npm run lint
```

`npm run build` runs in order: `journey` (compile Markdown) → `build:client` → `build:ssr` →
`prerender` → `sitemap` → `rss`.

## Rules that matter

Each has its full reasoning in a comment at the top of the file named. Break one and the damage is
quiet, not loud.

- **Every route is prerendered to real HTML, twice** — `x.html` *and* `x/index.html`, because
  GitHub Pages resolves extensionless URLs either way. — `scripts/prerender.mjs`
- **`entry-server.jsx` resolves routes eagerly on purpose.** Reusing the browser's `React.lazy`
  tree makes the prerender emit a loading spinner as the page. — `src/entry-server.jsx`
- **Never invent product data** — no downloads, ratings or revenue without a citable source. `null`
  hides a field; a placeholder lies. — `src/data/products.js`
- **Journey entries are Markdown only.** The generated file is gitignored, and bad frontmatter
  fails the build deliberately. — `content/journey/README.md`
- **The legal documents must describe the site that actually exists.** Change the code first,
  `legal.js` second, in the same commit. — `src/data/legal.js`
- **The AI-use refusal lives in five files.** Change one, change all five: `LICENSE`,
  `src/pages/Terms.jsx`, `public/robots.txt`, `public/ai.txt`,
  `public/.well-known/tdmrep.json`. — `LICENSE`
- **No current employer is named** in any description, heading or piece of structured data.
  Employment history belongs on `/timeline`. — `src/data/profile.js`

## Adding things

**A page:** component in `src/pages/` → entry in `src/routes.js` → entry in `STATIC_ROUTES`
(`scripts/routes.mjs`) if it should be indexed → a `<SEO>` element, without which the prerender
fails the build.

**A product:** one entry in `src/data/products.js` (`name`, `slug`, `shortDescription`, `category`,
`platform`, `status` minimum) and a 192×192 icon at `public/assets/products/<slug>.png`. Set
`hasDetailPage: true` only with a real `longDescription` and `features`.

**A journey entry:** one Markdown file in `content/journey/`. No code changes — the index, filters,
search, homepage, sitemap, RSS feed and the named product's page all pick it up.

## Analytics

Cloudflare Web Analytics, cookieless and consent-free. Set the repository variable
`CF_BEACON_TOKEN` (Settings → Secrets and variables → Actions → Variables) to activate it; with no
token the beacon does not load and the build still passes. Its beacon counts route changes itself —
do not add page-view tracking on top.

Conversion events are instrumented in `src/utils/analytics.js` but go nowhere: the free beacon has
no custom-events API for a domain it cannot proxy. The call sites are correct, so registering a sink
(`setSink`) is all that is needed the day one exists.

## Files that must keep working

| File                                 | Why                                                                |
| ------------------------------------ | ------------------------------------------------------------------ |
| `public/app-ads.txt`                 | AdMob verification. Publisher ID must stay `pub-9460933302095977`. |
| `public/google3a15862b0f820187.html` | Google Search Console verification. Must return 200.               |
| `public/robots.txt`                  | Must keep `/assets/` crawlable for rendering-based indexing.       |
| `public/ai.txt`                      | The AI-use refusal. Mirrored at `public/.well-known/ai.txt`.       |
| `public/.well-known/tdmrep.json`     | TDM Reservation Protocol. Must stay valid JSON.                    |

## Licence

**Not open source.** Copyright © 2024–2026 Hemanth Kumar Guvvala, all rights reserved — see
[LICENSE](LICENSE). The repository is public so the work can be read; reading it grants no right to
use it. Use as AI training data is expressly refused. Security posture and reporting:
[SECURITY.md](SECURITY.md).

## Deployment

Push to `master`. `.github/workflows/deploy.yml` builds `portfolio-react/` and publishes its `dist`
via `actions/deploy-pages`. The `main` and `gh-pages` branches are old versions and are not
deployed.
