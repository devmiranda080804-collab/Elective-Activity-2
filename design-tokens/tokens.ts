/**
 * ATOM: Color & Type Tokens
 * -------------------------------------------------------------------------
 * Single source of truth for the visual language of the Pangasinan Heritage
 * Digital Showcase. `tailwind.config.ts` mirrors these values so that both
 * code (class="bg-sea") and design docs stay in sync — change a value once,
 * here, and update the Tailwind config to match.
 *
 * Usage context: imported anywhere a raw token value is needed outside of a
 * Tailwind class (e.g. inline SVG fills, meta theme-color, chart colors).
 */

export const color = {
  sea: "#1F6F78", // primary — Hundred Islands water; links, primary buttons
  seaDark: "#154D54", // hover/active state for primary actions
  seaLight: "#5FA7AC", // subtle accents, tags, focus rings on dark surfaces
  clay: "#C1592B", // secondary accent — Bolinao lighthouse brick; highlights, CTAs
  clayDark: "#93401D",
  limestone: "#E8DFC8", // section backgrounds, card surfaces
  sand: "#FAF7F0", // page background
  ink: "#1A2421", // body text (near-black, not pure #000)
  rock: "#6B5B45", // muted text, captions, borders
} as const;

export const type = {
  display: "var(--font-fraunces)",
  body: "var(--font-work-sans)",
  scale: {
    xs: 13,
    sm: 15,
    base: 16,
    lg: 20,
    xl: 25,
    "2xl": 31,
    "3xl": 39,
    "4xl": 49,
  },
} as const;

export const breakpoint = {
  mobile: 0,
  tablet: 640,
  desktop: 1024,
} as const;
