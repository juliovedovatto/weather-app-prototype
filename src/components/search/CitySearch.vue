<script setup lang="ts">
import { useDebounce } from '@vueuse/core';
import { ref, computed } from 'vue';

import { useCitySearchQuery } from '@/queries/search.query';

const emit = defineEmits<{ 'city-added': [name: string] }>();

const search = ref('');
const debouncedSearch = useDebounce(search, 1000);
const isTouched = ref(false);
const minChars = 2;

const isEnabled = computed(() => debouncedSearch.value.trim().length >= minChars);

const filters = computed(() => ({ term: debouncedSearch.value }));
const resultsQuery = useCitySearchQuery({ filters, enabled: isEnabled });

const canShowResults = computed(() => isEnabled.value && !resultsQuery.isLoading.value && !resultsQuery.isError.value);

function onInput(e: Event) {
  isTouched.value = true;
  search.value = (e.target as HTMLInputElement).value;
}

function onCityAdded(name: string) {
  if (!name.trim()) {
    return;
  }

  emit('city-added', name);
  search.value = '';
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <label class="text-sm font-medium" for="city-search">Add city</label>
    <input
      id="city-search"
      type="search"
      :value="search"
      autocomplete="off"
      placeholder="Search city..."
      class="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
      @input="onInput"
    />
    <p v-if="isTouched && search.trim().length < minChars" class="text-xs text-slate-500">
      Enter at least {{ minChars }} characters
    </p>

    <ul
      v-if="canShowResults"
      class="mt-1 max-h-48 overflow-y-auto rounded-md border border-slate-200 bg-white text-sm shadow"
    >
      <li
        v-for="loc in resultsQuery.data.value || []"
        :key="loc.url"
        class="flex cursor-pointer items-center justify-between px-3 py-2 hover:bg-slate-50"
      >
        <button
          type="button"
          class="flex w-full items-center justify-between gap-4 text-left"
          @click="onCityAdded(loc.name)"
        >
          <span class="truncate">{{ loc.name }}, {{ loc.country }}</span>
          <span class="text-xs text-slate-500">{{ loc.region }}</span>
        </button>
      </li>
      <li v-if="(resultsQuery.data.value || []).length === 0" class="px-3 py-2 text-slate-500">No results</li>
    </ul>
    <div v-else-if="resultsQuery.isFetching.value" class="text-xs text-slate-500">Searching...</div>
    <div v-else-if="resultsQuery.isError.value" class="text-xs text-red-600">Search failed</div>
  </div>
</template>
