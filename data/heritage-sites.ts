export interface HeritageSite {
  slug: string;
  name: string;
  municipality: string;
  category: "Natural Wonder" | "Historical Landmark" | "Natural Spring";
  blurb: string;
  imageAlt: string;
  /** Filename only, inside /public/images/. Swap in a different photo by
   * (1) dropping the file into public/images/ and (2) changing just this
   * string — no component code needs to change. */
  imageFile: string;
  /** Natural pixel width of `imageFile`. Drives the `srcset` width
   * descriptor so the browser can pick the right file — see
   * composables/useHeritagePhoto.ts. Any photo wider than 800px MUST also
   * ship an `<name>-800.webp` companion in public/images/, or the srcset
   * will point at a file that doesn't exist. */
  imageWidth: number;
}

export const heritageSites: HeritageSite[] = [
  {
    slug: "hundred-islands",
    name: "Hundred Islands National Park",
    municipality: "Alaminos",
    category: "Natural Wonder",
    blurb:
      "Over a hundred limestone islets scattered across Lingayen Gulf, shaped by centuries of tide and wind.",
    imageAlt:
      "Aerial view of the limestone islets of Hundred Islands National Park in Alaminos, Pangasinan",
    imageFile: "hundred-islands.webp",
    imageWidth: 1200,
  },
  {
    slug: "bolinao-lighthouse",
    name: "Cape Bolinao Lighthouse",
    municipality: "Bolinao",
    category: "Historical Landmark",
    blurb:
      "A Spanish-era lighthouse standing watch over Cape Bolinao since 1905, one of the tallest in the Philippines.",
    imageAlt: "Cape Bolinao Lighthouse on a coastal cliff in Bolinao, Pangasinan",
    imageFile: "bolinao-lighthouse.webp",
    imageWidth: 1280,
  },
  {
    slug: "balungao-hot-spring",
    name: "Balungao Hot Spring",
    municipality: "Balungao",
    category: "Natural Spring",
    blurb:
      "Mineral-rich spring water fed by Mount Balungao, tucked at the base of an extinct volcano.",
    imageAlt: "Pools at Balungao Hot Spring at the foot of Mount Balungao, Pangasinan",
    imageFile: "balungao-hot-spring.webp",
    imageWidth: 720,
  },
];
