<script setup lang="ts">
/**
 * ATOM: Image (HeritageImage)
 * -------------------------------------------------------------------------
 * Usage context: any photograph of a heritage site — hero banners, Heritage
 * Card thumbnails, gallery grids. `alt` is a required prop (no default),
 * so a missing description can never slip through unnoticed (WCAG 1.1.1).
 *
 * Responsive logic: a fixed aspect-ratio box reserves the image's space
 * before it loads, preventing layout shift on a slow connection (a mobile-
 * data performance requirement of this project). `loading="lazy"` defers
 * off-screen images; `priority` overrides that for the first, above-the-
 * fold image so it starts downloading immediately instead of waiting on
 * the lazy-load intersection check.
 */

type Aspect = "video" | "square" | "portrait";

const props = withDefaults(
  defineProps<{
    src: string;
    alt: string;
    aspect?: Aspect;
    priority?: boolean;
  }>(),
  { aspect: "video" }
);

const aspectClass: Record<Aspect, string> = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
};
</script>

<template>
  <div class="relative overflow-hidden bg-limestone" :class="aspectClass[props.aspect]">
    <img
      :src="src"
      :alt="alt"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : 'auto'"
      class="absolute inset-0 h-full w-full object-cover"
    />
  </div>
</template>
