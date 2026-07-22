<template>
  <div v-if="totalPages > 1 || total > 0" class="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
    <p class="text-sm text-text-muted order-2 sm:order-1">
      Showing
      <span class="font-medium text-text">{{ range.from }}–{{ range.to }}</span>
      of
      <span class="font-medium text-text">{{ range.total }}</span>
    </p>

    <nav v-if="totalPages > 1" class="flex items-center justify-center gap-2 order-1 sm:order-2" aria-label="Pagination">
      <button
        type="button"
        class="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-text transition-all duration-luxury hover:border-accent hover:text-accent disabled:opacity-40"
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
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps<{
  page: number
  totalPages: number
  range: { from: number; to: number; total: number }
}>()

defineEmits<{
  'update:page': [page: number]
}>()

const total = computed(() => props.range.total)

const pages = computed(() => {
  const totalP = props.totalPages
  const current = props.page
  if (totalP <= 5) return Array.from({ length: totalP }, (_, i) => i + 1)
  if (current <= 3) return [1, 2, 3, 4, 5]
  if (current >= totalP - 2) return [totalP - 4, totalP - 3, totalP - 2, totalP - 1, totalP]
  return [current - 2, current - 1, current, current + 1, current + 2]
})
</script>
