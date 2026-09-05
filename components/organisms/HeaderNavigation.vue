<script setup lang="ts">
/**
 * ORGANISM: Header Navigation
 * -------------------------------------------------------------------------
 * Usage context: one instance, rendered once in the root layout, present on
 * every page. Combines the NavigationItem molecule, the SearchForm
 * molecule, and the site logo/wordmark into the persistent top-level
 * navigation.
 *
 * Responsive logic:
 * - Mobile (< 1024px, below Tailwind `lg:`): nav links and search are
 *   hidden behind a hamburger toggle to keep the header short and preserve
 *   vertical space for content on small screens; toggling renders them in
 *   a full-width drawer below the header bar.
 * - Desktop (>= 1024px): links + search render inline in the header bar;
 *   the hamburger button is hidden (`lg:hidden`).
 * Accessibility: the toggle button exposes `aria-expanded` and
 * `aria-controls` so screen readers announce the drawer's open/closed
 * state (WCAG 4.1.2).
 */

const open = ref(false);
const route = useRoute();
const scrolled = ref(false);

function handleScroll() {
  scrolled.value = window.scrollY > 8;
}

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
});
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

const links = [
  { href: "/", label: "Home" },
  { href: "/sites", label: "Heritage Sites" },
  { href: "/about", label: "About Pangasinan" },
];

// Search has no results page of its own — it hands the query to /sites,
// which does the actual filtering (see pages/sites/index.vue), so the
// result set stays a normal, shareable/bookmarkable URL.
function handleSearch(query: string) {
  open.value = false;
  navigateTo({ path: "/sites", query: query ? { q: query } : {} });
}
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b bg-sand/90 backdrop-blur transition-shadow duration-300"
    :class="scrolled ? 'border-limestone shadow-sm shadow-ink/5' : 'border-transparent'"
  >
    <div
      class="mx-auto flex max-w-6xl items-center justify-between px-4 transition-[padding] duration-300 sm:px-6 lg:px-8"
      :class="scrolled ? 'py-2.5' : 'py-4'"
    >
      <NuxtLink to="/" class="group flex items-center gap-2">
        <svg viewBox="0 0 24 24" width="26" height="26" class="text-sea transition-transform duration-300 group-hover:rotate-12" aria-hidden="true">
          <path
            fill="currentColor"
            d="M4 17c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 4-2.5v3s-2 2.5-4 2.5-4-2.5-6-2.5-4 2.5-6 2.5-4-2.5-4-2.5v-3s0 0 4 2.5Z"
          />
          <circle cx="12" cy="8" r="4" fill="currentColor" opacity=".35" />
        </svg>
        <Typography variant="h3" as="span" class="text-sea">Pangasinan Heritage</Typography>
      </NuxtLink>

      <nav aria-label="Primary" class="hidden items-center gap-6 lg:flex">
        <NavigationItem
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          :is-active="route.path === link.href"
        >
          {{ link.label }}
        </NavigationItem>
      </nav>

      <div class="hidden lg:block">
        <SearchForm @search="handleSearch" />
      </div>

      <button
        type="button"
        class="rounded p-2 text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sea lg:hidden"
        :aria-expanded="open"
        aria-controls="mobile-nav-drawer"
        :aria-label="open ? 'Close menu' : 'Open menu'"
        @click="open = !open"
      >
        <Icon :name="open ? 'close' : 'menu'" :size="24" />
      </button>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="open" id="mobile-nav-drawer" class="border-t border-limestone bg-sand px-4 pb-6 pt-2 lg:hidden">
        <nav aria-label="Primary" class="flex flex-col gap-1 pb-4">
          <NavigationItem
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            :is-active="route.path === link.href"
            @click="open = false"
          >
            {{ link.label }}
          </NavigationItem>
        </nav>
        <SearchForm @search="handleSearch" />
      </div>
    </Transition>
  </header>
</template>
