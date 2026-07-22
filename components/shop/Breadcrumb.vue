<template>
  <nav aria-label="Breadcrumb" class="py-4" data-animate="fade-right">
    <ol class="flex flex-wrap items-center gap-2 text-sm">
      <li
        v-for="(item, index) in items"
        :key="item.label"
        class="flex items-center gap-2"
        :style="{ animationDelay: `${index * 60}ms` }"
      >
        <NuxtLink
          v-if="item.to && index < items.length - 1"
          :to="item.to"
          class="text-text-muted transition-colors duration-luxury hover:text-accent"
        >
          {{ item.label }}
        </NuxtLink>
        <span v-else class="font-medium text-text" aria-current="page">{{ item.label }}</span>
        <ChevronRight
          v-if="index < items.length - 1"
          :size="14"
          class="text-text-muted/60"
          aria-hidden="true"
        />
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'

defineProps<{
  items: Array<{ label: string; to?: string }>
}>()
</script>
