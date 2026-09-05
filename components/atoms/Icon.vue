<script setup lang="ts">
/**
 * ATOM: Icon
 * -------------------------------------------------------------------------
 * Usage context: small inline glyphs paired with text (nav items, search
 * field, card metadata) — never used alone as the only way to convey
 * meaning, per WCAG 2.1 AA (1.1.1 Non-text Content).
 *
 * Responsive logic: fixed pixel sizes via the `size` prop rather than
 * viewport-relative units — icons at text-adjacent sizes should not scale
 * with the page, only with the text size they sit next to.
 */

const paths = {
  location: "M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  search: "M11 4a7 7 0 1 0 4.9 12l4.55 4.55 1.4-1.4L17.3 14.6A7 7 0 0 0 11 4Zm-5 7a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z",
  menu: "M3 6h18M3 12h18M3 18h18",
  close: "M6 6l12 12M18 6 6 18",
  chevronRight: "m9 6 6 6-6 6",
  play: "M8 5v14l11-7-11-7Z",
  pause: "M6 5h4v14H6V5Z M14 5h4v14h-4V5Z",
  arrowUp: "M12 19V5M12 5l-6 6M12 5l6 6",
} as const;

export type IconName = keyof typeof paths;

const props = withDefaults(
  defineProps<{
    name: IconName;
    size?: number;
    /** Icons are decorative by default (aria-hidden) since they're always
     * paired with visible text. Set `label` only when an icon is the
     * *sole* content of an interactive element (e.g. an icon-only close
     * button). */
    label?: string;
  }>(),
  { size: 20 }
);

const isStroke = computed(
  () =>
    props.name === "menu" ||
    props.name === "close" ||
    props.name === "chevronRight" ||
    props.name === "arrowUp"
);
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    :fill="isStroke ? 'none' : 'currentColor'"
    :stroke="isStroke ? 'currentColor' : 'none'"
    :stroke-width="isStroke ? 2 : 0"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="shrink-0"
    :role="label ? 'img' : undefined"
    :aria-hidden="label ? undefined : true"
    :aria-label="label"
  >
    <path :d="paths[name]" />
  </svg>
</template>
