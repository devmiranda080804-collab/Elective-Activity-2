# Pangasinan Heritage Digital Showcase

**Student:** Rojie Michael Miranda
**Selected Framework:** Nuxt.js (Vue 3, `<script setup>`, TypeScript, Tailwind CSS)
**Live Website:** [GitHub Pages URL — add after Deliverable 2.2 deployment]

Built for Activity 1.1 (framework selection + Atomic Design component
library) and Activity 2 (Static Site Generation + GitHub Pages deployment).
See `report/Framework-Selection-Report.pdf` for the framework decision and
`documentation/Atomic-Design-System-Manual.pdf` for the component library.

## Run locally

```bash
npm install
npm run dev       # http://localhost:3000
```

If `npm install` fails with a peer-dependency error, retry with:

```bash
npm install --legacy-peer-deps
```

## Production / static export build

```bash
npm run generate       # outputs a fully static site to ./.output/public
npm run serve:static   # generate + serve it at http://localhost:3000
```

> **Testing with Lighthouse?** Audit `npm run serve:static`, **not**
> `npm run dev`. The dev server intentionally ships unminified, unbundled
> modules plus a hot-reload client — around 5 MB of JavaScript that never
> reaches production — so a Lighthouse run against it scores 20–30 points
> lower and none of that gap reflects the deployed site. Measured on the
> production build, every page scores 98–100 for Performance and 100 for
> Accessibility, Best Practices, and SEO.

`nuxt.config.ts` sets the Nitro `static` preset, so `npm run generate`
produces a fully static `.output/public` directory — plain HTML/CSS/JS with
no Node.js server required — deployable to any static host or CDN (Netlify,
Vercel static hosting, GitHub Pages, or an object-storage bucket behind a
CDN).

## Deploying to GitHub Pages

`.github/workflows/deploy.yml` builds and deploys the site automatically on
every push to `main`:

1. Push this repo to GitHub.
2. In the repo, go to **Settings → Pages → Build and deployment → Source**
   and select **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).
   The site publishes to `https://<your-username>.github.io/<repo-name>/`.

The workflow sets `NUXT_APP_BASE_URL` to `/<repo-name>/` at build time so
asset paths resolve correctly under a GitHub Pages project subpath — no
manual config needed regardless of what the repo is named.

## Project structure

```
pages/                    Routes: home, /sites, /sites/[slug], /about, /styleguide
components/atoms/         Button, Typography, Icon, HeritageImage
components/molecules/     HeritageCard, SearchForm, NavigationItem, BackToTop
components/organisms/     HeritageGrid, HeaderNavigation, HeroBanner, SiteFooter
plugins/reveal.ts         `v-reveal` scroll-in-view animation directive
composables/useAssetUrl.ts  Prefixes /public asset paths with the GitHub Pages base URL
design-tokens/            Canonical color & type tokens (mirrored in tailwind.config.ts)
data/                     Heritage site content (decoupled from components)
public/images/            Photography for the 3 heritage sites
.github/workflows/        GitHub Pages deployment (Actions)
```

Every component under `components/` and every Vue composable
(`useHead`, `useRoute`, `ref`, `computed`, etc.) is auto-imported by Nuxt —
no manual `import` statements are needed inside a page or component file.

`pages/styleguide.vue` is an internal, unlinked page that renders every atom
and molecule in isolation — it was used to produce the screenshots in the
Atomic Design System Manual and is a convenient way to sanity-check a
component change in one place.

## Swapping in a site photo

Each heritage site's photo is a plain filename referenced from
`data/heritage-sites.ts` (e.g. `imageFile: "hundred-islands.webp"`). To
replace one:

1. Drop the new photo (`.webp` preferred) into `public/images/`, no wider
   than ~1600px — these photos run full-bleed in the homepage hero, so an
   oversized source directly hurts Largest Contentful Paint on mobile.
2. **If it is wider than 800px, also save an 800px-wide copy next to it**,
   named `<same-name>-800.webp`. This is the mobile variant; without it the
   `srcset` points at a missing file.
3. Set that site's `imageFile` and `imageWidth` (the full-size photo's
   natural pixel width) in `data/heritage-sites.ts`.

No component code needs to change — every component (grid cards, the
detail page, the homepage hero) reads these from this one data source.

**Why the 800px copy:** a phone renders the hero at roughly 721 device
pixels and a card at roughly 665, so sending it a 1200–1280px file wastes
about 60% of the bytes. `composables/useHeritagePhoto.ts` builds a `srcset`
from the two files and lets the browser choose — phones take the small one,
desktop and high-DPI screens still get the full-resolution original. On the
heritage listing page this alone moved Performance from 96 to 100.

> **Note:** `hundred-islands.webp` and `balungao-hot-spring.webp` currently
> carry a third-party watermark/logo baked into the image itself (from the
> source they were pulled from) and should be replaced with your own or a
> properly licensed photo before this site is shared publicly.

## Requirements traceability

| Requirement | How it's met |
|---|---|
| Lightning fast on 3G/4G | Static export, lazy-loaded images below the fold, system-font stack (no webfont download) |
| Mobile-first | Every component is styled mobile-first with `sm:`/`lg:` overrides |
| Maintainable / decoupled | Atomic Design component library + a single content data source (`data/`) |
| Accessible (WCAG 2.1 AA) | Semantic landmarks, skip link, `aria-current`/`aria-expanded`, required `alt` text, visible focus rings, `prefers-reduced-motion` support |
| Deployable (JAMstack) | Nitro `static` preset verified via `npm run generate` |
