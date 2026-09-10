<script setup lang="ts">
import { color } from "~/design-tokens/tokens";
import { heritageSites } from "~/data/heritage-sites";
import type { IconName } from "~/components/atoms/Icon.vue";

useHead({ title: "Style Guide — internal reference" });

const swatches: { name: string; hex: string }[] = [
  { name: "sea", hex: color.sea },
  { name: "sea-dark", hex: color.seaDark },
  { name: "sea-light", hex: color.seaLight },
  { name: "clay", hex: color.clay },
  { name: "clay-dark", hex: color.clayDark },
  { name: "limestone", hex: color.limestone },
  { name: "sand", hex: color.sand },
  { name: "ink", hex: color.ink },
  { name: "rock", hex: color.rock },
];

const icons: IconName[] = [
  "location",
  "search",
  "menu",
  "close",
  "chevronRight",
  "play",
  "pause",
  "arrowUp",
];
</script>

<template>
  <div class="bg-sand">
    <section class="mx-auto max-w-5xl border-b border-limestone px-6 py-10">
      <Typography variant="h2" class="mb-6">Atom — Color Tokens</Typography>
      <div class="grid grid-cols-3 gap-4 sm:grid-cols-5">
        <div v-for="s in swatches" :key="s.name">
          <div class="h-16 w-full rounded-md border border-limestone" :style="{ backgroundColor: s.hex }" />
          <p class="mt-1 font-body text-xs text-rock">{{ s.name }}</p>
          <p class="font-body text-xs text-rock">{{ s.hex }}</p>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-5xl border-b border-limestone px-6 py-10">
      <Typography variant="h2" class="mb-6">Atom — Typography</Typography>
      <div class="flex flex-col gap-3">
        <Typography variant="display">Display — Islands, light, and spring</Typography>
        <Typography variant="h1">Heading 1 — Hundred Islands National Park</Typography>
        <Typography variant="h2">Heading 2 — All Heritage Sites</Typography>
        <Typography variant="h3">Heading 3 — Cape Bolinao Lighthouse</Typography>
        <Typography variant="body">
          Body — Over a hundred limestone islets scattered across Lingayen Gulf.
        </Typography>
        <Typography variant="caption">Caption — Alaminos, Pangasinan</Typography>
        <Typography variant="eyebrow">Eyebrow — Natural Wonder</Typography>
      </div>
    </section>

    <section class="mx-auto max-w-5xl border-b border-limestone px-6 py-10">
      <Typography variant="h2" class="mb-6">Atom — Icon</Typography>
      <div class="flex flex-wrap gap-8">
        <div v-for="name in icons" :key="name" class="flex flex-col items-center gap-2">
          <Icon :name="name" :size="28" :label="name" />
          <p class="font-body text-xs text-rock">{{ name }}</p>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-5xl border-b border-limestone px-6 py-10">
      <Typography variant="h2" class="mb-6">Atom — Button</Typography>
      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-5xl border-b border-limestone px-6 py-10">
      <Typography variant="h2" class="mb-6">Atom — Image</Typography>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <HeritageImage v-bind="useHeritagePhoto(heritageSites[0])" :alt="heritageSites[0].imageAlt" aspect="video" sizes="(min-width: 640px) 33vw, 100vw" />
        <HeritageImage v-bind="useHeritagePhoto(heritageSites[1])" :alt="heritageSites[1].imageAlt" aspect="square" sizes="(min-width: 640px) 33vw, 100vw" />
        <HeritageImage v-bind="useHeritagePhoto(heritageSites[2])" :alt="heritageSites[2].imageAlt" aspect="portrait" sizes="(min-width: 640px) 33vw, 100vw" />
      </div>
    </section>

    <section class="mx-auto max-w-5xl border-b border-limestone px-6 py-10">
      <Typography variant="h2" class="mb-6">Molecule — Search Form</Typography>
      <SearchForm />
    </section>
  </div>
</template>
