<script setup lang="ts">
/**
 * ATOM: Button
 * -------------------------------------------------------------------------
 * Usage context: any single, clickable action — form submission, navigating
 * to a site detail page, opening a filter. Not for navigation between the
 * site's main sections (use NavigationItem for that).
 *
 * Responsive logic: Button does not change layout across breakpoints on its
 * own — it is sized by its container. `fullWidth` is used to make it span
 * its parent on mobile (e.g. stacked in a mobile menu) while staying
 * intrinsic-width on tablet/desktop; the *parent* decides when to pass it.
 */

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const props = withDefaults(
  defineProps<{
    variant?: Variant;
    size?: Size;
    fullWidth?: boolean;
    as?: "button" | "a";
    href?: string;
    type?: "button" | "submit";
    disabled?: boolean;
  }>(),
  { variant: "primary", size: "md", as: "button", type: "button" }
);

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-body font-medium " +
  "transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 " +
  "active:scale-95 focus-visible:outline focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-sea disabled:opacity-50 " +
  "disabled:pointer-events-none disabled:hover:translate-y-0 motion-reduce:hover:translate-y-0 " +
  "motion-reduce:active:scale-100";

const variants: Record<Variant, string> = {
  primary: "bg-sea text-sand shadow-sm hover:bg-sea-dark hover:shadow-md hover:shadow-sea/30",
  secondary: "bg-transparent text-sea border border-sea hover:bg-sea hover:text-sand",
  ghost: "bg-transparent text-ink hover:bg-limestone",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-base px-6 py-3",
};

const classes = computed(() => [
  base,
  variants[props.variant],
  sizes[props.size],
  props.fullWidth && "w-full",
]);
</script>

<template>
  <NuxtLink v-if="as === 'a'" :to="href!" :class="classes">
    <slot />
  </NuxtLink>
  <button v-else :type="type" :disabled="disabled" :class="classes">
    <slot />
  </button>
</template>
