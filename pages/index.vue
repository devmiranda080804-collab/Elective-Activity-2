<script setup lang="ts">
import { heritageSites } from "~/data/heritage-sites";

useHead({ title: "Pangasinan Heritage Digital Showcase" });

const municipalityCount = new Set(heritageSites.map((s) => s.municipality)).size;
const categoryCount = new Set(heritageSites.map((s) => s.category)).size;

const stats = [
  { label: "Heritage sites", value: heritageSites.length },
  { label: "Municipalities", value: municipalityCount },
  { label: "Site categories", value: categoryCount },
];
</script>

<template>
  <div>
    <HeroBanner :sites="heritageSites" />

    <section class="border-b border-limestone bg-limestone/40">
      <div class="mx-auto grid max-w-6xl grid-cols-3 gap-4 px-4 py-8 sm:px-6 lg:px-8">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          v-reveal="{ delay: i * 100 }"
          class="text-center"
        >
          <Typography variant="h1" as="p" class="!text-sea">{{ stat.value }}</Typography>
          <Typography variant="caption" class="mt-1">{{ stat.label }}</Typography>
        </div>
      </div>
    </section>

    <HeritageGrid :sites="heritageSites" />
  </div>
</template>
