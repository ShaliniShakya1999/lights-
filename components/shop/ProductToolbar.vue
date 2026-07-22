<template>
  <div
    class="flex flex-col gap-4 rounded-luxury border border-border bg-white p-4 shadow-soft lg:flex-row lg:items-center lg:justify-between lg:px-6 lg:py-4"
  >
    <p class="text-sm text-text-muted">
      Showing
      <span class="font-medium text-text">{{ count }}</span>
      {{ count === 1 ? 'product' : 'products' }}
    </p>

    <div class="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center lg:justify-end lg:gap-4">
      <div class="relative flex-1 lg:max-w-xs">
        <Search :size="16" class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          :value="search"
          type="search"
          placeholder="Search lighting..."
          class="input-luxury !rounded-full !py-2.5 pl-10 pr-4"
          @input="$emit('update:search', ($event.target as HTMLInputElement).value)"
        >
      </div>

      <div class="flex items-center gap-3">
        <label class="hidden text-xs uppercase tracking-wider text-text-muted sm:block">Sort</label>
        <select
          :value="sort"
          class="input-luxury !w-auto !rounded-full !py-2.5 min-w-[180px] cursor-pointer"
          @change="$emit('update:sort', ($event.target as HTMLSelectElement).value as SortOption)"
        >
          <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>

        <div class="hidden md:flex items-center rounded-full border border-border bg-[#FAFAFA] p-1">
          <button
            v-for="col in [2, 3, 4] as const"
            :key="col"
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-luxury"
            :class="columns === col ? 'bg-secondary text-white shadow-soft' : 'text-text-muted hover:text-text'"
            :aria-label="`${col} columns`"
            @click="$emit('update:columns', col)"
          >
            <LayoutGrid v-if="col === 4" :size="15" />
            <Columns3 v-else-if="col === 3" :size="15" />
            <Columns2 v-else :size="15" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Columns2, Columns3, LayoutGrid, Search } from 'lucide-vue-next'
import type { SortOption } from '~/types/product'

defineProps<{
  count: number
  search: string
  sort: SortOption
  columns: 2 | 3 | 4
}>()

defineEmits<{
  'update:search': [value: string]
  'update:sort': [value: SortOption]
  'update:columns': [value: 2 | 3 | 4]
}>()

const sortOptions: Array<{ label: string; value: SortOption }> = [
  { label: 'Featured', value: 'featured' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Best Selling', value: 'bestselling' },
  { label: 'Highest Rated', value: 'rating' },
]
</script>
