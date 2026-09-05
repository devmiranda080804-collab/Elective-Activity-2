<script setup lang="ts">
import type { HeritageSite } from "~/data/heritage-sites";

/**
 * MOLECULE: Heritage Card
 * -------------------------------------------------------------------------
 * Usage context: used exclusively for displaying tourist site previews in
 * a responsive heritage-site grid (see organisms/HeritageGrid). Not used
 * standalone in body copy — for a single inline mention of a site, link
 * plain text instead.
 *
 * Responsive logic: the card itself has no internal breakpoint logic — it
 * is a single-column block (image on top, text below) at every size. All
 * responsiveness (1 → 2 → 3 columns) is owned by the parent HeritageGrid,
 * which is what keeps this component reusable in a grid, a carousel, or a
 * single-column "related sites" list without modification.
 */

defineProps<{
  site: HeritageSite;
  priority?: boolean;
}>();
</script>

<template>
  <NuxtLink
    :to="`/sites/${site.slug}`"
    class="group block rounded-xl outline-none transition-transform duration-300 will-change-transform hover:-translate-y-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sea"
  >
    <article
      class="flex flex-col gap-3 overflow-hidden rounded-xl bg-sand shadow-sm ring-1 ring-limestone transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-ink/10"
    >
      <div class="relative overflow-hidden [&_img]:transition-transform [&_img]:duration-500 [&_img]:ease-out group-hover:[&_img]:scale-110">
        <HeritageImage
          :src="`/images/${site.imageFile}`"
          :alt="site.imageAlt"
          :priority="priority"
        />
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <span
          class="absolute left-3 top-3 rounded-full bg-sand/90 px-3 py-1 font-body text-xs font-medium text-clay shadow-sm backdrop-blur"
        >
          {{ site.category }}
        </span>
      </div>
      <div class="flex flex-col gap-1 px-4 pb-4">
        <Typography variant="h3" as="h3" class="transition-colors group-hover:text-sea">
          {{ site.name }}
        </Typography>
        <p class="flex items-center gap-1 font-body text-sm text-rock">
          <Icon name="location" :size="16" />
          {{ site.municipality }}, Pangasinan
        </p>
        <Typography variant="body" class="line-clamp-2 text-sm text-rock">
          {{ site.blurb }}
        </Typography>
        <span
          class="mt-2 inline-flex items-center gap-1 font-body text-sm font-medium text-sea transition-transform duration-300 group-hover:translate-x-1"
        >
          Explore
          <Icon name="chevronRight" :size="16" />
        </span>
      </div>
    </article>
  </NuxtLink>
</template>
