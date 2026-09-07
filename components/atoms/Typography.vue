<script setup lang="ts">
/**
 * ATOM: Typography
 * -------------------------------------------------------------------------
 * Usage context: every piece of text on the site should go through this
 * component instead of a raw <p>/<h1> with ad-hoc classes, so the type
 * scale in design-tokens/tokens.ts stays the single source of truth.
 *
 * Responsive logic: `variant="display"` and the heading variants each ship
 * a smaller mobile font-size and a larger `md:` size (e.g.
 * `text-4xl md:text-6xl` for display) — a headline sized for desktop wraps
 * awkwardly and pushes content below the fold on a phone. Body/caption/
 * eyebrow stay one fixed size at every breakpoint.
 */

type Variant = "display" | "h1" | "h2" | "h3" | "body" | "caption" | "eyebrow";

const props = defineProps<{
  variant: Variant;
  as?: string;
}>();

const variantStyles: Record<Variant, string> = {
  display: "font-display text-4xl md:text-6xl leading-[1.05] tracking-tight text-ink",
  h1: "font-display text-3xl md:text-4xl leading-tight text-ink",
  h2: "font-display text-2xl md:text-3xl leading-tight text-ink",
  h3: "font-display text-xl md:text-2xl leading-snug text-ink",
  body: "font-body text-base leading-relaxed text-ink",
  caption: "font-body text-sm leading-normal text-rock",
  // clay-dark, not clay: clay-on-sand is only 4.15:1, just under WCAG AA's
  // 4.5:1 minimum for normal-weight text this size (Lighthouse flags it).
  eyebrow: "font-body text-sm font-medium text-clay-dark",
};

// `as` lets a caller keep correct heading hierarchy (e.g. render an h2 with
// the visual style of "display") without ever skipping heading levels —
// a WCAG 2.1 AA requirement (1.3.1, 2.4.6) for screen-reader navigation.
const defaultElement: Record<Variant, string> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  body: "p",
  caption: "p",
  eyebrow: "p",
};

const tag = computed(() => props.as ?? defaultElement[props.variant]);
const classes = computed(() => variantStyles[props.variant]);
</script>

<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>
