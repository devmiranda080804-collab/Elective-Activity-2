<script setup lang="ts">
import { heritageSites } from "~/data/heritage-sites";

const route = useRoute();
const site = heritageSites.find((s) => s.slug === route.params.slug);

if (!site) {
  throw createError({ statusCode: 404, statusMessage: "Site not found" });
}

useHead({ title: `${site.name} — Pangasinan Heritage` });

const otherSites = heritageSites.filter((s) => s.slug !== site.slug);
</script>

<template>
  <div>
    <nav aria-label="Breadcrumb" class="mx-auto max-w-3xl px-4 pt-6 sm:px-6 lg:px-8">
      <NuxtLink
        to="/sites"
        class="inline-flex items-center gap-1 font-body text-sm text-rock transition-colors hover:text-sea focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sea"
      >
        <Icon name="chevronRight" :size="14" class="rotate-180" />
        All heritage sites
      </NuxtLink>
    </nav>

    <article class="mx-auto max-w-3xl px-4 pb-12 pt-4 sm:px-6 lg:px-8">
      <div class="animate-scale-in overflow-hidden rounded-xl">
        <HeritageImage :src="useAssetUrl(`/images/${site.imageFile}`)" :alt="site.imageAlt" priority />
      </div>
      <div class="animate-fade-up" style="animation-delay: 100ms">
        <Typography variant="eyebrow" class="mt-6">{{ site.category }}</Typography>
        <Typography variant="h1" class="mt-1">{{ site.name }}</Typography>
        <p class="mt-2 flex items-center gap-1 font-body text-sm text-rock">
          <Icon name="location" :size="16" />
          {{ site.municipality }}, Pangasinan
        </p>
        <Typography variant="body" class="mt-6 max-w-prose">{{ site.blurb }}</Typography>
        <div class="mt-8">
          <Button as="a" href="/sites" variant="secondary">Browse other sites</Button>
        </div>
      </div>
    </article>

    <section aria-labelledby="related-heading" class="border-t border-limestone bg-limestone/30">
      <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <Typography id="related-heading" variant="h2">Other heritage sites</Typography>
        <ul class="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <li v-for="(other, i) in otherSites" :key="other.slug" v-reveal="{ delay: i * 100 }">
            <!-- Lighthouse traced this as the actual LCP element on mobile
                 (it sits right at the fold) despite the hero photo above it
                 being marked priority, so the first card needs the same
                 treatment here. -->
            <HeritageCard :site="other" :priority="i === 0" />
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
