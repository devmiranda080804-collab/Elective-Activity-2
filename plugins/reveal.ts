/**
 * PLUGIN: v-reveal
 * -----------------------------------------------------------------------
 * Registers a `v-reveal` directive that fades + slides an element up when
 * it scrolls into view. Registered universally (server + client, not
 * `.client.ts`) so Vue's SSR renderer can resolve the directive while
 * prerendering — a directive referenced in a template but registered by a
 * client-only plugin crashes SSR with "Cannot read properties of undefined
 * (reading 'getSSRProps')". The actual IntersectionObserver behavior is
 * still entirely client-only, guarded below.
 *
 * Usage: `<div v-reveal>` or `<div v-reveal="{ delay: 120 }">` for a
 * staggered list (delay in ms). Marks the element with `data-reveal` so
 * assets/css/main.css can hide it *only* once `.js-reveal` is present on
 * <html> — content stays visible by default for no-JS/reduced-motion/print.
 */

let observer: IntersectionObserver | null = null;

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
  }
  return observer;
}

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    document.documentElement.classList.add("js-reveal");
  }

  const prefersReducedMotion =
    import.meta.client && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  nuxtApp.vueApp.directive("reveal", {
    mounted(el: HTMLElement, binding) {
      if (!import.meta.client || prefersReducedMotion) return;
      const delay = (binding.value?.delay as number | undefined) ?? 0;
      el.setAttribute("data-reveal", "");
      if (delay) el.style.animationDelay = `${delay}ms`;
      getObserver().observe(el);
    },
    unmounted(el: HTMLElement) {
      observer?.unobserve(el);
    },
  });
});
