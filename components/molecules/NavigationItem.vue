<script setup lang="ts">
/**
 * MOLECULE: Navigation Item
 * -------------------------------------------------------------------------
 * Usage context: one entry in the primary site navigation (see organisms/
 * HeaderNavigation). Composed of a NuxtLink + active-state logic —
 * classified as a molecule rather than an atom because it combines a link
 * primitive with "current page" state, one small unit of behavior, not
 * just raw markup.
 *
 * Responsive logic: identical markup at every breakpoint; the *arrangement*
 * of items (row vs. column, visible vs. inside a drawer) is entirely owned
 * by HeaderNavigation, so this component stays reusable in a desktop bar,
 * a mobile drawer, or a footer link list.
 */

const props = defineProps<{
  href: string;
  isActive?: boolean;
}>();

const emit = defineEmits<{ click: [] }>();
</script>

<template>
  <NuxtLink
    :to="href"
    :aria-current="isActive ? 'page' : undefined"
    class="group relative rounded py-2 font-body text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sea"
    :class="isActive ? 'text-sea' : 'text-ink hover:text-sea'"
    @click="emit('click')"
  >
    <slot />
    <span
      class="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-sea transition-transform duration-300 ease-out group-hover:scale-x-100"
      :class="isActive && 'scale-x-100'"
      aria-hidden="true"
    />
  </NuxtLink>
</template>
