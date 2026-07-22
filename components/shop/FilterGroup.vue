<template>
  <div class="border-b border-border pb-5 last:border-0 last:pb-0">
    <button
      type="button"
      class="flex w-full items-center justify-between py-1 text-left"
      @click="open = !open"
    >
      <span class="text-sm font-medium tracking-wide text-text">{{ title }}</span>
      <ChevronDown
        :size="16"
        class="text-text-muted transition-transform duration-luxury"
        :class="open ? 'rotate-180' : ''"
      />
    </button>
    <div v-show="open" class="mt-3">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  title: string
  defaultOpen?: boolean
}>(), {
  defaultOpen: false,
})

const open = ref(props.defaultOpen)
</script>
