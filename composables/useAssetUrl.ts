/**
 * COMPOSABLE: useAssetUrl
 * -------------------------------------------------------------------------
 * Prefixes a `/public`-relative path (e.g. "/images/hundred-islands.webp")
 * with the app's runtime base URL.
 *
 * Why this exists: on GitHub Pages, a project site is served from
 * https://<user>.github.io/<repo>/, not the domain root, so every URL needs
 * a `/<repo>/` prefix — `.github/workflows/deploy.yml` sets that via
 * `NUXT_APP_BASE_URL` at build time. Nuxt applies it automatically to
 * `<NuxtLink>` and to build-time asset imports, but a plain interpolated
 * string like `:src="`/images/${file}`"` is neither — it ships as a literal
 * root-relative path and 404s under a subpath deploy. Route every
 * runtime-constructed `/public` path (image src, favicon links, etc.)
 * through this instead.
 */
export function useAssetUrl(path: string) {
  const { app } = useRuntimeConfig();
  return `${app.baseURL}${path.replace(/^\//, "")}`;
}
