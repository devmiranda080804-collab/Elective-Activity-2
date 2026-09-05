<script setup lang="ts">
import { heritageSites } from "~/data/heritage-sites";

useHead({ title: "Heritage Sites — Pangasinan Heritage Digital Showcase" });
</script>

<template>
  <div>
    <section class="animate-fade-up mx-auto max-w-6xl px-4 pt-12 sm:px-6 lg:px-8">
      <Typography variant="h1">All Heritage Sites</Typography>
      <Typography variant="body" class="mt-2 text-rock">
        Every landmark in the showcase, in one place.
      </Typography>
    </section>
    <HeritageGrid :sites="heritageSites" />
  </div>
</template>
