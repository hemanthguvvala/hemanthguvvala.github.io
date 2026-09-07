# Journey

Building in public: what shipping a product actually taught me, what an
experiment showed, why a product decision went the way it did.

**Deep technical reference material belongs on CodeDepth instead.** Publishing
that kind of content in both places splits search authority between two sites
competing for the same queries.

## Publishing an entry

1. Copy `_template.md` to `your-entry-name.md`.
2. Fill in the frontmatter (below).
3. Write the body in Markdown, starting headings at `##` — the title becomes the
   page's `<h1>`, so a `#` here would produce two.
4. Remove `draft: true`.
5. Commit and push.

That is the whole workflow. The deploy compiles, prerenders and lists the entry
automatically — in the index, its category filter, search, the homepage, the
sitemap, the RSS feed, and on the detail page of any product it names. **No
application code changes.**

The filename becomes the URL: `building-swapformat.md` → `/journey/building-swapformat`.

## Frontmatter

| Field         | Required | Notes                                                             |
| ------------- | -------- | ----------------------------------------------------------------- |
| `title`       | yes      | Becomes the `<h1>` and the SEO title                              |
| `description` | yes      | One sentence; used in search results and social cards             |
| `date`        | yes      | `YYYY-MM-DD`                                                      |
| `category`    | yes      | One of the categories below                                       |
| `updated`     | no       | `YYYY-MM-DD`; shown only when it differs from `date`              |
| `tags`        | no       | `[android, monetisation]`                                         |
| `products`    | no       | Product slugs from `src/data/products.js` — renders product cards |
| `keyTakeaway` | no       | One sentence, surfaced above the body                             |
| `slug`        | no       | Only to keep a URL stable after renaming the file                 |
| `draft`       | no       | `true` excludes it from the build entirely                        |
| `placeholder` | no       | `true` labels it visibly as an example rather than real work      |

**Categories:** `building`, `findings`, `experiments`, `engineering`,
`product`, `business`.

The build **fails loudly** on a missing required field, a malformed date, an
unknown category, a duplicate slug, or a `products` slug that does not exist.
That is deliberate — a broken build beats a live page with an empty `<title>`
or a product card pointing nowhere.

## Connecting entries to products

`products: [swapformat]` is what makes this an ecosystem rather than a blog. It
renders a real product card at the end of the entry, and it makes the entry
appear under **"The story behind it"** on that product's own page. The link runs
both ways from one line of frontmatter.

Only name products the entry is genuinely about. Listing every product on every
entry turns the section into advertising, and readers notice.

## Format

The template follows: context → problem → goal → hypothesis → what changed →
what happened → what I learned → what I would do differently → what's next.

The value is in reporting what actually happened, including what did not work.
An entry that reports only successes reads as marketing.

## Local preview

```bash
npm run dev       # recompiles entries first
npm run journey   # recompile only
```

Skipped by the build: files starting with `_`, this README, and anything marked
`draft: true`.
