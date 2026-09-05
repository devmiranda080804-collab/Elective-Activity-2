<script setup lang="ts">
import { heritageSites } from "~/data/heritage-sites";

useHead({ title: "About — Pangasinan Heritage Digital Showcase" });

const municipalities = [...new Set(heritageSites.map((s) => s.municipality))];
</script>

<template>
  <div>
    <section class="animate-fade-up mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Typography variant="eyebrow">Our mission</Typography>
      <Typography variant="h1" class="mt-1">About this showcase</Typography>
      <Typography variant="body" class="mt-4 max-w-prose text-rock">
        The Pangasinan Heritage Digital Showcase is a Provincial Tourism Office initiative to
        promote the province's most iconic heritage sites to visitors browsing on mobile data
        across the Philippines and abroad.
      </Typography>
    </section>

    <section aria-labelledby="municipalities-heading" class="border-t border-limestone bg-limestone/30">
      <div class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Typography id="municipalities-heading" variant="h2">Municipalities featured</Typography>
        <ul class="mt-6 flex flex-wrap gap-3">
          <li
            v-for="(m, i) in municipalities"
            :key="m"
            v-reveal="{ delay: i * 80 }"
            class="flex items-center gap-2 rounded-full bg-sand px-4 py-2 shadow-sm ring-1 ring-limestone"
          >
            <Icon name="location" :size="16" class="text-sea" />
            <span class="font-body text-sm font-medium text-ink">{{ m }}</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
