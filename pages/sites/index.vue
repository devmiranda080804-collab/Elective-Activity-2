<script setup lang="ts">
import { heritageSites } from "~/data/heritage-sites";

useHead({ title: "Heritage Sites — Pangasinan Heritage Digital Showcase" });

const route = useRoute();

// Read from the URL (not a local ref) so the header's search — which
// navigates here with `?q=` — and a direct/shared link both land on the
// same filtered view.
const searchQuery = computed(() => (typeof route.query.q === "string" ? route.query.q : ""));

const filteredSites = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return heritageSites;
  return heritageSites.filter((site) =>
    [site.name, site.municipality, site.category, site.blurb].some((field) =>
      field.toLowerCase().includes(q)
    )
  );
});

function handleSearch(query: string) {
  navigateTo({ path: "/sites", query: query ? { q: query } : {} });
}
</script>

<template>
  <div>
    <section class="animate-fade-up mx-auto max-w-6xl px-4 pt-12 sm:px-6 lg:px-8">
      <Typography variant="h1">All Heritage Sites</Typography>
      <Typography variant="body" class="mt-2 text-rock">
        Every landmark in the showcase, in one place.
      </Typography>
      <div class="mt-6 max-w-md">
        <!-- `:key` forces a remount when the query changes via the header search
             (same route, so Vue would otherwise reuse this instance and its
             uncontrolled input would keep showing the previous search term). -->
        <SearchForm :key="searchQuery" :initial-query="searchQuery" @search="handleSearch" />
      </div>
      <p v-if="searchQuery" class="mt-4 font-body text-sm text-rock" role="status">
        Showing results for <span class="font-medium text-ink">"{{ searchQuery }}"</span> —
        <NuxtLink to="/sites" class="text-sea hover:underline">clear search</NuxtLink>
      </p>
    </section>

    <HeritageGrid v-if="filteredSites.length" :sites="filteredSites" />
    <section v-else class="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:px-8" role="status">
      <Typography variant="h3" as="p">No heritage sites match "{{ searchQuery }}"</Typography>
      <Typography variant="body" class="mt-2 text-rock">
        Try a different name, municipality, or category — or
        <NuxtLink to="/sites" class="text-sea hover:underline">browse all sites</NuxtLink>.
      </Typography>
    </section>
  </div>
</template>
