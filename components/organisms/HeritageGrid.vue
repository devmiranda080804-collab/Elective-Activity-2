<script setup lang="ts">
import type { HeritageSite } from "~/data/heritage-sites";

/**
 * ORGANISM: Heritage Grid
 * -------------------------------------------------------------------------
 * Usage context: the main content section of the homepage and any
 * "browse all sites" / category listing page. Combines the HeritageCard
 * molecule with a data set to form a complete, page-level content section.
 *
 * Responsive logic:
 * - Mobile (< 640px): single column, cards stacked, full-width images.
 * - Tablet (>= 640px, Tailwind `sm:`): 2 columns.
 * - Desktop (>= 1024px, Tailwind `lg:`): 3 columns.
 * A fixed CSS Grid column count per breakpoint (rather than
 * `auto-fit`/`minmax`) since the exact number of sites is known and
 * controlled through the data source, not arbitrary.
 */

defineProps<{
  sites: HeritageSite[];
}>();
</script>

<template>
  <section aria-labelledby="heritage-grid-heading" class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
    <h2 id="heritage-grid-heading" class="sr-only">Heritage sites</h2>
    <ul class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="(site, i) in sites" :key="site.slug" v-reveal="{ delay: i * 100 }">
        <HeritageCard :site="site" :priority="i === 0" />
      </li>
    </ul>
  </section>
</template>
