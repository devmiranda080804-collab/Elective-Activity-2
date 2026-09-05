<script setup lang="ts">
/**
 * MOLECULE: Back to Top
 * -------------------------------------------------------------------------
 * Usage context: one instance, rendered once in the root layout, present on
 * every page. Purely a scroll-position affordance — composes the Icon atom
 * with visibility/scroll behavior, which is why it's a molecule rather than
 * an atom.
 *
 * Accessibility: stays in the DOM at all times (not v-if'd) so it never
 * disappears out from under focus; `inert` when hidden removes it from the
 * tab order and hides it from assistive tech instead of just visually
 * fading it, and respects `prefers-reduced-motion` by skipping the smooth
 * scroll behavior (handled globally in main.css via `scroll-behavior`).
 */

const visible = ref(false);

function handleScroll() {
  visible.value = window.scrollY > 480;
}

onMounted(() => window.addEventListener("scroll", handleScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
  <button
    type="button"
    :inert="!visible"
    :tabindex="visible ? 0 : -1"
    class="fixed bottom-6 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-sea text-sand shadow-lg shadow-ink/20 transition-all duration-300 hover:bg-sea-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sea sm:right-6 lg:right-8"
    :class="visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'"
    aria-label="Back to top"
    @click="scrollToTop"
  >
    <Icon name="arrowUp" :size="20" />
  </button>
</template>
