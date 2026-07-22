<template>
  <div class="grid gap-4 lg:grid-cols-[88px_1fr]">
    <!-- Vertical thumbnails -->
    <div class="order-2 lg:order-1 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[640px] scrollbar-thin pb-1 lg:pb-0">
      <button
        v-for="(img, i) in product.images"
        :key="img"
        type="button"
        class="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-luxury"
        :class="activeIndex === i ? 'border-accent shadow-soft' : 'border-border hover:border-accent/40'"
        @click="setActive(i)"
      >
        <img :src="img" :alt="`${product.name} view ${i + 1}`" class="h-full w-full object-cover">
      </button>
      <button
        v-if="product.video"
        type="button"
        class="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-border bg-secondary text-white flex items-center justify-center hover:border-accent transition-all"
        :class="mode === 'video' ? '!border-accent' : ''"
        @click="mode = 'video'"
      >
        <Play :size="18" />
      </button>
      <button
        type="button"
        class="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-border bg-accent-soft text-accent flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium hover:border-accent transition-all"
        :class="mode === '360' ? '!border-accent' : ''"
        @click="mode = '360'"
      >
        <RotateCw :size="16" />
        360°
      </button>
    </div>

    <!-- Main stage -->
    <div class="order-1 lg:order-2 relative overflow-hidden rounded-luxury bg-[#F3F3F3] aspect-square lg:aspect-auto lg:min-h-[640px]">
      <!-- Zoom image -->
      <div
        v-if="mode === 'image'"
        class="relative h-full w-full cursor-crosshair overflow-hidden"
        @mousemove="onZoom"
        @mouseleave="zooming = false"
        @mouseenter="zooming = true"
      >
        <img
          :src="activeImage"
          :alt="product.name"
          class="h-full w-full object-cover transition-transform duration-300"
          :style="zoomStyle"
        >
        <div class="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-[11px] text-text-muted backdrop-blur shadow-soft">
          Hover to zoom
        </div>
      </div>

      <!-- Video -->
      <div v-else-if="mode === 'video'" class="absolute inset-0 bg-black">
        <iframe
          v-if="product.video"
          :src="product.video"
          class="h-full w-full"
          title="Product video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>

      <!-- 360 viewer simulation -->
      <div v-else class="relative h-full w-full select-none" @mousedown="startDrag" @touchstart.passive="startDrag">
        <img
          :src="product.images[spinIndex]"
          :alt="`${product.name} 360 view`"
          class="h-full w-full object-cover pointer-events-none"
          draggable="false"
        >
        <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-6 text-center">
          <p class="text-sm text-white/90">Drag to rotate · Frame {{ spinIndex + 1 }}/{{ product.images.length }}</p>
        </div>
        <div class="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-medium text-accent backdrop-blur">
          360° Viewer
        </div>
      </div>

      <!-- Badges -->
      <div class="absolute left-4 top-4 flex flex-col gap-1.5 z-10 pointer-events-none">
        <span
          v-for="badge in product.badges"
          :key="badge"
          class="rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white"
          :class="{
            'bg-secondary': badge === 'luxury',
            'bg-accent': badge === 'bestseller',
            'bg-[#2D6A4F]': badge === 'new',
            'bg-[#9B2226]': badge === 'sale',
          }"
        >
          {{ badge === 'new' ? 'New Arrival' : badge === 'bestseller' ? 'Best Seller' : badge === 'sale' ? 'Sale' : 'Luxury' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Play, RotateCw } from 'lucide-vue-next'
import type { Product } from '~/types/product'

const props = defineProps<{
  product: Product
}>()

const mode = ref<'image' | 'video' | '360'>('image')
const activeIndex = ref(0)
const zooming = ref(false)
const zoomPos = ref({ x: 50, y: 50 })
const spinIndex = ref(0)
const dragging = ref(false)
const lastX = ref(0)

const activeImage = computed(() => props.product.images[activeIndex.value])

const zoomStyle = computed(() => {
  if (!zooming.value) return { transform: 'scale(1)' }
  return {
    transform: 'scale(1.75)',
    transformOrigin: `${zoomPos.value.x}% ${zoomPos.value.y}%`,
  }
})

function setActive(i: number) {
  activeIndex.value = i
  mode.value = 'image'
}

function onZoom(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  zoomPos.value = {
    x: ((e.clientX - rect.left) / rect.width) * 100,
    y: ((e.clientY - rect.top) / rect.height) * 100,
  }
}

function startDrag(e: MouseEvent | TouchEvent) {
  dragging.value = true
  lastX.value = 'touches' in e ? e.touches[0].clientX : e.clientX

  const onMove = (ev: MouseEvent | TouchEvent) => {
    if (!dragging.value) return
    const x = 'touches' in ev ? ev.touches[0].clientX : ev.clientX
    const delta = x - lastX.value
    if (Math.abs(delta) > 24) {
      const len = props.product.images.length
      spinIndex.value = delta > 0
        ? (spinIndex.value + 1) % len
        : (spinIndex.value - 1 + len) % len
      lastX.value = x
    }
  }

  const onUp = () => {
    dragging.value = false
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
    window.removeEventListener('touchmove', onMove)
    window.removeEventListener('touchend', onUp)
  }

  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
  window.addEventListener('touchmove', onMove)
  window.addEventListener('touchend', onUp)
}
</script>
