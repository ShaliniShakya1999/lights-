<template>
  <div class="flex flex-col items-center justify-center rounded-luxury border border-dashed border-border bg-white px-6 py-20 text-center">
    <div class="relative mb-8">
      <div class="h-32 w-32 rounded-full bg-accent-soft flex items-center justify-center">
        <svg viewBox="0 0 120 120" class="h-20 w-20 text-accent" fill="none" aria-hidden="true">
          <circle cx="60" cy="42" r="18" stroke="currentColor" stroke-width="3" opacity="0.4" />
          <path d="M42 72c0-10 8-18 18-18s18 8 18 18v6H42v-6z" stroke="currentColor" stroke-width="3" opacity="0.5" />
          <path d="M30 98h60M38 88h44" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.35" />
          <circle cx="84" cy="30" r="8" stroke="currentColor" stroke-width="2.5" />
          <path d="M90 36l12 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
        </svg>
      </div>
    </div>
    <h3 class="heading-section-sm text-text">No Products Found</h3>
    <p class="mt-3 max-w-md text-sm text-text-muted leading-relaxed">
      We couldn’t find lighting that matches your current filters. Try adjusting your selection or reset to explore the full collection.
    </p>
    <button type="button" class="btn-primary mt-8" @click="$emit('reset')">
      Reset Filters
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{ reset: [] }>()
</script>
