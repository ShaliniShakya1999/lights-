<template>
  <div class="flex flex-col gap-3 rounded-2xl border border-border bg-white/95 p-3 shadow-soft backdrop-blur-md xs:gap-4 xs:rounded-luxury xs:p-4 lg:flex-row lg:items-center lg:justify-between lg:px-6 lg:py-4">
    <p class="text-xs text-text-muted xs:text-sm">
      Showing
      <span class="font-medium text-text">{{ range.from }}–{{ range.to }}</span>
      of
      <span class="font-medium text-text">{{ range.total }}</span>
      products
    </p>

    <div class="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center lg:justify-end lg:gap-4">
      <div class="relative min-w-0 flex-1 lg:max-w-xs">
        <Search :size="16" class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          :value="search"
          type="search"
          placeholder="Search lighting..."
          class="input-luxury !rounded-full !py-2.5 pl-10 pr-4"
          @input="$emit('update:search', ($event.target as HTMLInputElement).value)"
        >
      </div>

      <div class="flex min-w-0 flex-wrap items-center gap-2 xs:gap-3">
        <label class="hidden text-xs uppercase tracking-wider text-text-muted sm:block">Sort</label>
        <select
          :value="sort"
          class="input-luxury min-w-0 flex-1 !rounded-full !py-2.5 cursor-pointer sm:flex-none sm:min-w-[190px]"
          @change="$emit('update:sort', ($event.target as HTMLSelectElement).value as SortOption)"
        >
          <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>

        <div class="hidden md:flex items-center rounded-full border border-border bg-background p-1">
          <button
            type="button"
            class="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-luxury"
            :class="view === 'grid' ? 'bg-secondary text-white shadow-soft' : 'text-text-muted hover:text-text'"
            aria-label="Grid view"
            @click="$emit('update:view', 'grid')"
          >
            <LayoutGrid :size="15" />
          </button>
          <button
            type="button"
            class="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-luxury"
            :class="view === 'list' ? 'bg-secondary text-white shadow-soft' : 'text-text-muted hover:text-text'"
            aria-label="List view"
            @click="$emit('update:view', 'list')"
          >
            <List :size="15" />
          </button>
        </div>

        <div v-if="view === 'grid'" class="hidden lg:flex items-center rounded-full border border-border bg-background p-1">
          <button
            v-for="col in [2, 3, 4] as const"
            :key="col"
            type="button"
            class="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-luxury text-[11px] font-medium"
            :class="columns === col ? 'bg-secondary text-white shadow-soft' : 'text-text-muted hover:text-text'"
            :aria-label="`${col} columns`"
            @click="$emit('update:columns', col)"
          >
            {{ col }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LayoutGrid, List, Search } from 'lucide-vue-next'
import type { SortOption, ViewMode } from '~/types/product'

defineProps<{
  range: { from: number; to: number; total: number }
  search: string
  sort: SortOption
  columns: 2 | 3 | 4
  view: ViewMode
}>()

defineEmits<{
  'update:search': [value: string]
  'update:sort': [value: SortOption]
  'update:columns': [value: 2 | 3 | 4]
  'update:view': [value: ViewMode]
}>()

const sortOptions: Array<{ label: string; value: SortOption }> = [
  { label: 'Featured', value: 'featured' },
  { label: 'Newest', value: 'newest' },
  { label: 'Popularity', value: 'popularity' },
  { label: 'Best Selling', value: 'bestselling' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Customer Rating', value: 'rating' },
]
</script>
