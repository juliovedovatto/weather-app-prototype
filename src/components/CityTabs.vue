<script setup lang="ts">
// TODO: make dynamic with props & emit selection changes.
</script>

<template>
  <nav
    aria-label="Select city"
    role="tablist"
    class="-mx-4 flex gap-2 overflow-x-auto px-4 py-2 whitespace-nowrap sm:mx-0 sm:overflow-visible sm:px-0"
  >
    <button
      role="tab"
      aria-selected="true"
      class="cursor-pointer rounded-tab bg-white px-6 py-2 text-[18px] leading-tight font-semibold text-wx-navy-900 ring-1 ring-black/5 transition-colors hover:bg-wx-sky-100 focus:ring-2 focus:ring-wx-sky-50 focus:outline-none aria-selected:bg-wx-sky-100"
    >
      Denver 🏔
    </button>
    <button
      role="tab"
      aria-selected="false"
      class="cursor-pointer rounded-tab bg-white px-6 py-2 text-[18px] leading-tight font-semibold text-wx-navy-900 transition-colors hover:bg-wx-sky-100 focus:ring-2 focus:ring-wx-sky-50 focus:outline-none aria-selected:bg-wx-sky-100"
    >
      Rio de Janeiro ⛱
    </button>
    <button
      role="tab"
      aria-selected="false"
      class="cursor-pointer rounded-tab bg-white px-6 py-2 text-[18px] leading-tight font-semibold text-wx-navy-900 transition-colors hover:bg-wx-sky-100 focus:ring-2 focus:ring-wx-sky-50 focus:outline-none aria-selected:bg-wx-sky-100"
    >
      Madrid 💃
    </button>
    <button
      role="tab"
      aria-selected="false"
      class="cursor-pointer rounded-tab bg-white px-6 py-2 text-[18px] leading-tight font-semibold text-wx-navy-900 transition-colors hover:bg-wx-sky-100 focus:ring-2 focus:ring-wx-sky-50 focus:outline-none aria-selected:bg-wx-sky-100"
    >
      Japan 🍣
    </button>
    <button
      role="tab"
      aria-selected="false"
      class="cursor-pointer rounded-tab bg-white px-6 py-2 text-[18px] leading-tight font-semibold text-wx-navy-900 transition-colors hover:bg-wx-sky-100 focus:ring-2 focus:ring-wx-sky-50 focus:outline-none aria-selected:bg-wx-sky-100"
    >
      Australia 🐨
    </button>
  </nav>
</template>
