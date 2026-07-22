<template>
  <aside class="luxury-card self-start p-6">
    <div class="flex items-center justify-between gap-3 mb-6">
      <h2 class="font-playfair text-xl">Filters</h2>
      <button
        v-if="activeCount > 0"
        type="button"
        class="text-xs font-medium text-accent hover:text-accent-hover transition-colors"
        @click="$emit('clear')"
      >
        Clear all
      </button>
    </div>

    <div class="space-y-7">
      <ShopFilterGroup title="Category" :default-open="true">
        <label
          v-for="cat in options.categories"
          :key="cat"
          class="flex cursor-pointer items-center gap-3 py-1.5 text-sm text-text-muted transition-colors hover:text-text"
        >
          <input
            type="checkbox"
            class="peer sr-only"
            :checked="model.categories.includes(cat)"
            @change="toggle('categories', cat)"
          >
          <span class="flex h-4 w-4 items-center justify-center rounded border border-border peer-checked:border-accent peer-checked:bg-accent transition-colors">
            <Check v-if="model.categories.includes(cat)" :size="11" class="text-white" />
          </span>
          {{ cat }}
        </label>
      </ShopFilterGroup>

      <ShopFilterGroup title="Price" :default-open="true">
        <div class="pt-1">
          <input
            type="range"
            min="0"
            max="250000"
            step="5000"
            :value="model.priceRange[1]"
            class="w-full accent-accent"
            @input="updatePrice(($event.target as HTMLInputElement).valueAsNumber)"
          >
          <div class="mt-3 flex items-center justify-between text-xs text-text-muted">
            <span>{{ formatPrice(model.priceRange[0]) }}</span>
            <span>{{ formatPrice(model.priceRange[1]) }}</span>
          </div>
        </div>
      </ShopFilterGroup>

      <ShopFilterGroup title="Brand">
        <label
          v-for="brand in options.brands"
          :key="brand"
          class="flex cursor-pointer items-center gap-3 py-1.5 text-sm text-text-muted hover:text-text"
        >
          <input
            type="checkbox"
            class="peer sr-only"
            :checked="model.brands.includes(brand)"
            @change="toggle('brands', brand)"
          >
          <span class="flex h-4 w-4 items-center justify-center rounded border border-border peer-checked:border-accent peer-checked:bg-accent">
            <Check v-if="model.brands.includes(brand)" :size="11" class="text-white" />
          </span>
          {{ brand }}
        </label>
      </ShopFilterGroup>

      <ShopFilterGroup title="Material">
        <label
          v-for="mat in options.materials"
          :key="mat"
          class="flex cursor-pointer items-center gap-3 py-1.5 text-sm text-text-muted hover:text-text"
        >
          <input
            type="checkbox"
            class="peer sr-only"
            :checked="model.materials.includes(mat)"
            @change="toggle('materials', mat)"
          >
          <span class="flex h-4 w-4 items-center justify-center rounded border border-border peer-checked:border-accent peer-checked:bg-accent">
            <Check v-if="model.materials.includes(mat)" :size="11" class="text-white" />
          </span>
          {{ mat }}
        </label>
      </ShopFilterGroup>

      <ShopFilterGroup title="Finish">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="finish in options.finishes"
            :key="finish"
            type="button"
            class="rounded-full border px-3.5 py-1.5 text-xs transition-all duration-luxury"
            :class="model.finishes.includes(finish)
              ? 'border-accent bg-accent-soft text-accent'
              : 'border-border text-text-muted hover:border-accent/40'"
            @click="toggle('finishes', finish)"
          >
            {{ finish }}
          </button>
        </div>
      </ShopFilterGroup>

      <ShopFilterGroup title="Color">
        <div class="flex flex-wrap gap-3">
          <button
            v-for="color in options.colors"
            :key="color.name"
            type="button"
            class="group relative flex flex-col items-center gap-1.5"
            :title="color.name"
            @click="toggle('colors', color.name)"
          >
            <span
              class="h-8 w-8 rounded-full border-2 transition-all duration-luxury"
              :class="model.colors.includes(color.name) ? 'border-accent scale-110' : 'border-border'"
              :style="{ backgroundColor: color.hex }"
            />
            <span class="text-[10px] text-text-muted">{{ color.name }}</span>
          </button>
        </div>
      </ShopFilterGroup>

      <ShopFilterGroup title="Room">
        <label
          v-for="room in options.rooms"
          :key="room"
          class="flex cursor-pointer items-center gap-3 py-1.5 text-sm text-text-muted hover:text-text"
        >
          <input
            type="checkbox"
            class="peer sr-only"
            :checked="model.rooms.includes(room)"
            @change="toggle('rooms', room)"
          >
          <span class="flex h-4 w-4 items-center justify-center rounded border border-border peer-checked:border-accent peer-checked:bg-accent">
            <Check v-if="model.rooms.includes(room)" :size="11" class="text-white" />
          </span>
          {{ room }}
        </label>
      </ShopFilterGroup>

      <ShopFilterGroup title="Style">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="style in options.styles"
            :key="style"
            type="button"
            class="rounded-full border px-3.5 py-1.5 text-xs transition-all duration-luxury"
            :class="model.styles.includes(style)
              ? 'border-accent bg-accent-soft text-accent'
              : 'border-border text-text-muted hover:border-accent/40'"
            @click="toggle('styles', style)"
          >
            {{ style }}
          </button>
        </div>
      </ShopFilterGroup>

      <ShopFilterGroup title="Bulb Type">
        <label
          v-for="bulb in options.bulbTypes"
          :key="bulb"
          class="flex cursor-pointer items-center gap-3 py-1.5 text-sm text-text-muted hover:text-text"
        >
          <input
            type="checkbox"
            class="peer sr-only"
            :checked="model.bulbTypes.includes(bulb)"
            @change="toggle('bulbTypes', bulb)"
          >
          <span class="flex h-4 w-4 items-center justify-center rounded border border-border peer-checked:border-accent peer-checked:bg-accent">
            <Check v-if="model.bulbTypes.includes(bulb)" :size="11" class="text-white" />
          </span>
          {{ bulb }}
        </label>
      </ShopFilterGroup>

      <ShopFilterGroup title="Availability">
        <label
          v-for="avail in options.availability"
          :key="avail"
          class="flex cursor-pointer items-center gap-3 py-1.5 text-sm text-text-muted hover:text-text"
        >
          <input
            type="checkbox"
            class="peer sr-only"
            :checked="model.availability.includes(avail)"
            @change="toggle('availability', avail)"
          >
          <span class="flex h-4 w-4 items-center justify-center rounded border border-border peer-checked:border-accent peer-checked:bg-accent">
            <Check v-if="model.availability.includes(avail)" :size="11" class="text-white" />
          </span>
          {{ avail }}
        </label>
      </ShopFilterGroup>
    </div>

    <button type="button" class="btn-ghost mt-8 w-full" @click="$emit('clear')">
      Clear Filters
    </button>
  </aside>
</template>

<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import { filterOptions } from '~/data/products'
import type { FilterState } from '~/types/product'
import { formatPrice } from '~/composables/useProducts'

const props = defineProps<{
  modelValue: FilterState
  activeCount: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: FilterState]
  clear: []
}>()

const options = filterOptions

const model = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})

function toggle(key: keyof FilterState, value: string) {
  const current = model.value[key]
  if (!Array.isArray(current) || typeof current[0] === 'number') return
  const list = current as string[]
  const next = list.includes(value)
    ? list.filter(v => v !== value)
    : [...list, value]
  model.value = { ...model.value, [key]: next }
}

function updatePrice(max: number) {
  model.value = { ...model.value, priceRange: [0, max] }
}
</script>
