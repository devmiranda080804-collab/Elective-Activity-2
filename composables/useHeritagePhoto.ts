import type { HeritageSite } from "~/data/heritage-sites";

/**
 * COMPOSABLE: useHeritagePhoto
 * -------------------------------------------------------------------------
 * Returns the `src` + `srcset` pair for a heritage site's photo, already
 * base-URL-prefixed (see useAssetUrl).
 *
 * Why: on a phone, a full-bleed hero needs about 721 device pixels (412 CSS
 * px at DPR 1.75) and a full-width card about 665. Shipping the full
 * 1200-1280px original to that phone wastes roughly 60% of the bytes, which
 * it decodes and then throws away. Every photo wider than 800px therefore
 * ships an `<name>-800.webp` companion, and the `srcset` below lets the
 * browser pick: phones take the small file, desktop and high-DPI screens
 * still get the full-resolution one so the full-bleed hero stays sharp.
 *
 * 800px specifically because it is the smallest round width that clears
 * both mobile cases above — a 720px variant is one pixel short of the hero's
 * requirement, so browsers correctly skip it and fetch the full-size file
 * instead, which defeats the point.
 *
 * Photos already 800px or narrower get no `srcset` — there is no smaller
 * variant to offer, and upscaling to invent one would only add bytes.
 */
const SMALL_WIDTH = 800;

export function useHeritagePhoto(site: HeritageSite) {
  const src = useAssetUrl(`/images/${site.imageFile}`);

  if (site.imageWidth <= SMALL_WIDTH) {
    return { src, srcset: undefined };
  }

  const small = useAssetUrl(
    `/images/${site.imageFile.replace(/\.webp$/, `-${SMALL_WIDTH}.webp`)}`
  );
  return { src, srcset: `${small} ${SMALL_WIDTH}w, ${src} ${site.imageWidth}w` };
}
