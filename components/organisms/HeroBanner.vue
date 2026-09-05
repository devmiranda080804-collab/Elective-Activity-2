<script setup lang="ts">
import type { HeritageSite } from "~/data/heritage-sites";

/**
 * ORGANISM: Hero Banner
 * -------------------------------------------------------------------------
 * Usage context: homepage only — a full-bleed, auto-advancing photo
 * backdrop introducing the three heritage sites, with the page's primary
 * headline and call to action layered on top.
 *
 * Performance: a single `<img>` per slide (not decorative CSS
 * background-images) so the first slide is discoverable by the browser's
 * preload scanner and can be marked `fetchpriority="high"`/eager via
 * HeritageImage's existing `priority` prop — no extra network waterfall.
 * The crossfade itself is pure CSS (`animation-delay` offsets on an
 * `opacity` keyframe), so there's no JS timer driving it and nothing here
 * blocks Time to Interactive.
 *
 * Accessibility: the slides are decorative (the real, described photos live
 * on the card grid and detail pages below), so each carries `alt=""`. The
 * crossfade auto-updates and runs longer than 5s, so WCAG 2.2.2 (Pause,
 * Stop, Hide) requires a visible way to stop it — the play/pause button
 * toggles `animation-play-state` on every slide.
 */

const props = defineProps<{
  sites: HeritageSite[];
}>();

const SLIDE_SECONDS = 6;
const cycleSeconds = computed(() => props.sites.length * SLIDE_SECONDS);

const playing = ref(true);
</script>

<template>
  <section
    class="relative isolate flex min-h-[85svh] items-end overflow-hidden bg-ink lg:min-h-[92svh]"
    aria-label="Featured Pangasinan heritage sites"
  >
    <div class="absolute inset-0">
      <div
        v-for="(site, i) in sites"
        :key="site.slug"
        class="hero-slide absolute inset-0"
        :style="{
          animationDuration: `${cycleSeconds}s`,
          animationDelay: `${-(i * SLIDE_SECONDS)}s`,
          animationPlayState: playing ? 'running' : 'paused',
        }"
      >
        <img
          :src="`/images/${site.imageFile}`"
          alt=""
          :loading="i === 0 ? 'eager' : 'lazy'"
          :fetchpriority="i === 0 ? 'high' : 'auto'"
          class="h-full w-full object-cover"
        />
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
      <div class="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
    </div>

    <div class="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-24">
      <div class="max-w-2xl animate-fade-up">
        <Typography variant="eyebrow" class="!text-sea-light">
          Pangasinan Provincial Tourism Office
        </Typography>
        <Typography variant="display" as="h1" class="mt-3 !text-sand">
          Islands, light, and spring water — Pangasinan's heritage, up close.
        </Typography>
        <Typography variant="body" class="mt-5 max-w-prose !text-sand/85">
          A digital guide to the province's most iconic sites, built to load fast on any
          connection and to work as well on a phone in Alaminos as it does on a desktop.
        </Typography>
        <div class="mt-8 flex flex-wrap items-center gap-3">
          <Button as="a" href="#heritage-grid-heading">Browse heritage sites</Button>
          <Button as="a" href="/about" variant="secondary" class="!border-sand/70 !text-sand hover:!bg-sand hover:!text-ink">
            About the province
          </Button>
        </div>
      </div>
    </div>

    <button
      type="button"
      class="absolute bottom-6 right-4 z-10 inline-flex items-center gap-2 rounded-full border border-sand/40 bg-ink/40 px-3 py-2 text-xs font-medium text-sand backdrop-blur transition-colors hover:bg-ink/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand sm:right-6 lg:right-8"
      :aria-pressed="!playing"
      @click="playing = !playing"
    >
      <Icon :name="playing ? 'pause' : 'play'" :size="14" />
      {{ playing ? "Pause slideshow" : "Play slideshow" }}
    </button>

    <div
      class="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 animate-bob text-sand/80 sm:block"
      aria-hidden="true"
    >
      <Icon name="chevronRight" :size="22" class="rotate-90" />
    </div>
  </section>
</template>

<style scoped>
.hero-slide {
  opacity: 0;
  animation-name: hero-crossfade;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
.hero-slide:first-child {
  opacity: 1;
}

@keyframes hero-crossfade {
  0% {
    opacity: 0;
  }
  4% {
    opacity: 1;
  }
  29% {
    opacity: 1;
  }
  37% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-slide {
    animation: none;
    opacity: 0;
  }
  .hero-slide:first-child {
    opacity: 1;
  }
}
</style>
