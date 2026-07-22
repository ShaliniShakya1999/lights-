<template>
  <nav aria-label="Breadcrumb" class="py-5" data-animate="fade-right">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <ol class="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] tracking-wide">
        <li
          v-for="(item, index) in items"
          :key="item.label"
          class="flex items-center gap-x-2.5"
        >
          <NuxtLink
            v-if="item.to && index < items.length - 1"
            :to="item.to"
            class="text-text-muted transition-colors duration-luxury hover:text-accent"
          >
            {{ item.label }}
          </NuxtLink>
          <span
            v-else
            class="font-medium text-text"
            aria-current="page"
          >
            {{ item.label }}
          </span>
          <span
            v-if="index < items.length - 1"
            class="select-none text-text-muted/50"
            aria-hidden="true"
          >›</span>
        </li>
      </ol>
      <p v-if="count != null" class="text-sm text-text-muted">
        <span class="font-medium text-text">{{ count }}</span>
        {{ count === 1 ? 'Product' : 'Products' }}
      </p>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  items: Array<{ label: string; to?: string }>
  count?: number
}>()
</script>
