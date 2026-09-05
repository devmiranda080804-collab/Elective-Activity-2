<script setup lang="ts">
import { heritageSites } from "~/data/heritage-sites";

/**
 * ORGANISM: Site Footer
 * -------------------------------------------------------------------------
 * Usage context: one instance, rendered once in the root layout, present on
 * every page — the closing section of every route.
 *
 * Content is derived from the same `heritageSites` data source used by the
 * grid/detail pages (site list, municipality count) rather than hardcoded,
 * so it never drifts out of sync when a site is added or removed.
 */

const year = new Date().getFullYear();
const municipalityCount = new Set(heritageSites.map((s) => s.municipality)).size;
</script>

<template>
  <footer class="border-t border-limestone bg-ink text-sand">
    <div class="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <Typography variant="h3" as="p" class="!text-sand">Pangasinan Heritage</Typography>
        <Typography variant="body" class="mt-3 max-w-xs text-sm !text-sand/70">
          A Provincial Tourism Office initiative showcasing {{ heritageSites.length }} iconic
          sites across {{ municipalityCount }} municipalities — built fast, accessible, and
          mobile-first for travelers.
        </Typography>
      </div>

      <nav aria-label="Footer" class="text-sm">
        <Typography variant="eyebrow" class="!text-sea-light">Explore</Typography>
        <ul class="mt-3 flex flex-col gap-2">
          <li v-for="site in heritageSites" :key="site.slug">
            <NuxtLink
              :to="`/sites/${site.slug}`"
              class="inline-flex items-center gap-1 !text-sand/80 transition-colors hover:!text-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sea-light"
            >
              {{ site.name }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <nav aria-label="Site" class="text-sm">
        <Typography variant="eyebrow" class="!text-sea-light">Site</Typography>
        <ul class="mt-3 flex flex-col gap-2">
          <li>
            <NuxtLink to="/sites" class="!text-sand/80 transition-colors hover:!text-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sea-light">
              All Heritage Sites
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about" class="!text-sand/80 transition-colors hover:!text-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sea-light">
              About Pangasinan
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>

    <div class="border-t border-sand/10">
      <p class="mx-auto max-w-6xl px-4 py-5 font-body text-xs !text-sand/50 sm:px-6 lg:px-8">
        © {{ year }} Pangasinan Provincial Tourism Office. Built as an academic showcase.
      </p>
    </div>
  </footer>
</template>
