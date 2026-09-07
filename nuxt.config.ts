export default defineNuxtConfig({
  compatibilityDate: "2026-01-01",
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss"],

  // Auto-import components by filename only (e.g. <HeritageCard />), not
  // prefixed with their atoms/molecules/organisms folder name — the folder
  // still encodes the Atomic Design level for humans reading the source.
  components: [{ path: "~/components", pathPrefix: false }],

  // Static/JAMstack deployment target — `nuxt generate` produces a fully
  // static site via Nitro, with no Node.js server required at runtime.
  // Dynamic routes are listed explicitly so prerendering doesn't depend on
  // Nitro's link-crawler discovering them.
  nitro: {
    preset: "static",
    prerender: {
      routes: [
        "/sites/hundred-islands",
        "/sites/bolinao-lighthouse",
        "/sites/balungao-hot-spring",
      ],
    },
  },

  app: {
    head: {
      title: "Pangasinan Heritage Digital Showcase",
      meta: [
        {
          name: "description",
          content:
            "Explore Alaminos' Hundred Islands, Bolinao's Lighthouse, and Balungao's Hot Spring — Pangasinan's iconic heritage sites.",
        },
      ],
      // Browsers request /favicon.ico directly regardless of the <link>
      // below (a legacy fallback) — without a file there, that request
      // 404s and Lighthouse's Best Practices audit dings the page for a
      // console error that has nothing to do with app code.
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
      ],
      htmlAttrs: { lang: "en" },
    },
  },

  css: ["~/assets/css/main.css"],

  typescript: {
    strict: true,
  },
});
