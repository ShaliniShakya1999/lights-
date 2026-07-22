<template>
  <div class="grid gap-5 sm:gap-6" :class="gridClass">
    <div
      v-for="n in count"
      :key="n"
      class="luxury-card overflow-hidden"
      :style="{ animationDelay: `${n * 80}ms` }"
    >
      <div class="skeleton aspect-[4/5] !rounded-none" />
      <div class="p-5 space-y-3">
        <div class="skeleton h-3 w-20" />
        <div class="skeleton h-5 w-4/5" />
        <div class="skeleton h-3 w-28" />
        <div class="skeleton h-6 w-32" />
        <div class="flex gap-2 pt-1">
          <div class="skeleton h-4 w-4 !rounded-full" />
          <div class="skeleton h-4 w-4 !rounded-full" />
          <div class="skeleton h-4 w-4 !rounded-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  count?: number
  columns?: 2 | 3 | 4
}>(), {
  count: 8,
  columns: 4,
})

const gridClass = computed(() => {
  const map = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4',
  }
  return map[props.columns]
})
</script>
