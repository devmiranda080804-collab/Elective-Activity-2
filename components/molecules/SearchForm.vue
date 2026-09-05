<script setup lang="ts">
/**
 * MOLECULE: Search Form
 * -------------------------------------------------------------------------
 * Usage context: header/hero site search ("find a heritage site by name or
 * municipality"). One instance per page — this is not a live-filter-as-you-
 * type widget, it submits a query, which keeps it usable with JavaScript
 * disabled/slow on mobile data (progressive enhancement).
 *
 * Responsive logic: input and button sit inline (flex-row) at every
 * breakpoint — there's little text content to wrap — but the whole form
 * goes full-width on mobile (inside its header container) and caps at a
 * fixed max-width on desktop so it doesn't stretch awkwardly on wide
 * screens.
 */

const props = withDefaults(
  defineProps<{
    placeholder?: string;
    /** Pre-fills the field, e.g. when a page mounts from a `?q=` in the URL
     * (a shared link or a redirect from the header search). Read once on
     * mount, not kept in sync afterwards — this stays an uncontrolled input
     * so typing doesn't require a round trip through the parent. */
    initialQuery?: string;
  }>(),
  { placeholder: "Search heritage sites or municipalities", initialQuery: "" }
);

const emit = defineEmits<{ search: [query: string] }>();

const query = ref(props.initialQuery);
const inputId = useId();

function handleSubmit() {
  emit("search", query.value.trim());
}
</script>

<template>
  <form role="search" class="flex w-full max-w-md items-center gap-2" @submit.prevent="handleSubmit">
    <label :for="inputId" class="sr-only">Search heritage sites</label>
    <div class="relative flex-1">
      <Icon
        name="search"
        :size="18"
        class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-rock"
      />
      <input
        :id="inputId"
        v-model="query"
        type="search"
        :placeholder="placeholder"
        class="w-full rounded-full border border-limestone bg-sand py-2.5 pl-10 pr-4 font-body text-sm text-ink placeholder:text-rock focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sea"
      />
    </div>
    <Button type="submit" size="sm">Search</Button>
  </form>
</template>
