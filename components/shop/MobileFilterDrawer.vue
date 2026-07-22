<template>
  <Teleport to="body">
    <Transition name="filter-drawer">
      <div v-if="open" class="fixed inset-0 z-[70] lg:hidden" @click.self="$emit('close')">
        <div class="absolute inset-0 bg-black/45 backdrop-blur-sm" />
        <div class="drawer-panel absolute inset-x-0 bottom-0 max-h-[88vh] overflow-hidden rounded-t-3xl bg-white shadow-luxury">
          <div class="sticky top-0 z-10 border-b border-border bg-white px-5 py-4">
            <div class="mx-auto mb-3 h-1 w-10 rounded-full bg-border" />
            <div class="flex items-center justify-between">
              <h2 class="font-playfair text-xl">Filters</h2>
              <button
                type="button"
                class="flex h-9 w-9 items-center justify-center rounded-full border border-border"
                aria-label="Close filters"
                @click="$emit('close')"
              >
                <X :size="16" />
              </button>
            </div>
          </div>
          <div class="max-h-[calc(88vh-5rem)] overflow-y-auto p-2 scrollbar-thin">
            <ShopFilterSidebar
              :model-value="modelValue"
              :active-count="activeCount"
              class="!static !max-h-none !border-0 !shadow-none !rounded-none"
              @update:model-value="$emit('update:modelValue', $event)"
              @clear="$emit('clear')"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
import type { FilterState } from '~/types/product'

defineProps<{
  open: boolean
  modelValue: FilterState
  activeCount: number
}>()

defineEmits<{
  close: []
  clear: []
  'update:modelValue': [value: FilterState]
}>()
</script>
