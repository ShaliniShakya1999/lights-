<template>
  <nav v-if="totalPages > 1" class="flex items-center justify-center gap-2" aria-label="Pagination">
    <button
      type="button"
      class="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-text transition-all duration-luxury hover:border-accent hover:text-accent disabled:opacity-40 disabled:hover:border-border disabled:hover:text-text"
      :disabled="page <= 1"
      aria-label="Previous page"
      @click="$emit('update:page', page - 1)"
    >
      <ChevronLeft :size="18" />
    </button>

    <button
      v-for="p in pages"
      :key="p"
      type="button"
      class="flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm transition-all duration-luxury"
      :class="p === page
        ? 'bg-secondary text-white'
        : 'border border-border bg-white text-text hover:border-accent hover:text-accent'"
      @click="$emit('update:page', p)"
    >
      {{ p }}
    </button>

    <button
      type="button"
      class="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-text transition-all duration-luxury hover:border-accent hover:text-accent disabled:opacity-40"
      :disabled="page >= totalPages"
      aria-label="Next page"
      @click="$emit('update:page', page + 1)"
    >
      <ChevronRight :size="18" />
    </button>
  </nav>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps<{
  page: number
  totalPages: number
}>()

defineEmits<{
  'update:page': [page: number]
}>()

const pages = computed(() => {
  const total = props.totalPages
  const current = props.page
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 3) return [1, 2, 3, 4, 5]
  if (current >= total - 2) return [total - 4, total - 3, total - 2, total - 1, total]
  return [current - 2, current - 1, current, current + 1, current + 2]
})
</script>
