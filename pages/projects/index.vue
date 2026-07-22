<template>
  <div class="pb-20 lg:pb-28">
    <section class="relative overflow-hidden bg-secondary text-white">
      <div class="absolute inset-0">
        <img
          src="/25.jpeg"
          alt="RIF Gallery"
          class="h-full w-full object-cover opacity-40"
        >
        <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/40" />
      </div>
      <div class="relative mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <p class="section-label !text-accent">RIF Gallery</p>
        <h1 class="heading-hero mt-4 max-w-3xl text-white">
          Lighting designs that inspire every space
        </h1>
        <p class="body-lead mt-5 max-w-xl !text-white/70">
          A curated selection from our product library — foldable lamps, crystal glow, and sculptural ambient light.
        </p>
      </div>
    </section>

    <div class="mx-auto max-w-[1440px] px-4 pt-10 sm:px-6 lg:px-10">
      <div class="flex flex-wrap gap-2" data-animate="fade-up">
        <button
          type="button"
          class="rounded-full px-4 py-2 text-xs font-medium transition-all"
          :class="activeTag === 'All' ? 'bg-secondary text-white' : 'border border-border bg-white text-text-muted hover:border-accent hover:text-accent'"
          @click="activeTag = 'All'"
        >
          All
        </button>
        <button
          v-for="tag in tags"
          :key="tag"
          type="button"
          class="rounded-full px-4 py-2 text-xs font-medium transition-all"
          :class="activeTag === tag ? 'bg-secondary text-white' : 'border border-border bg-white text-text-muted hover:border-accent hover:text-accent'"
          @click="activeTag = tag"
        >
          {{ tag }}
        </button>
      </div>

      <div class="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3" data-stagger-grid>
        <button
          v-for="(item, i) in filtered"
          :key="item.id"
          type="button"
          class="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-luxury border border-border bg-white text-left shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-luxury card-reveal"
          :style="{ animationDelay: `${Math.min(i, 10) * 0.05}s` }"
          data-animate-child
          @click="openLightbox(i)"
        >
          <img
            :src="item.src"
            :alt="item.title"
            class="w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            loading="lazy"
          >
          <div class="border-t border-border px-4 py-4">
            <p class="text-[10px] uppercase tracking-[0.2em] text-accent">{{ item.tag }}</p>
            <h2 class="mt-1 font-playfair text-lg text-text">{{ item.title }}</h2>
          </div>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="lightboxIndex !== null"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          @click.self="lightboxIndex = null"
        >
          <button
            type="button"
            class="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white hover:border-accent hover:text-accent"
            aria-label="Close"
            @click="lightboxIndex = null"
          >
            <X :size="20" />
          </button>
          <button
            type="button"
            class="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white hover:border-accent hover:text-accent sm:left-6"
            aria-label="Previous"
            @click="prev"
          >
            <ChevronLeft :size="22" />
          </button>
          <button
            type="button"
            class="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white hover:border-accent hover:text-accent sm:right-6"
            aria-label="Next"
            @click="next"
          >
            <ChevronRight :size="22" />
          </button>
          <div class="max-h-[88vh] max-w-5xl overflow-auto rounded-2xl bg-white shadow-luxury">
            <img
              v-if="activeItem"
              :src="activeItem.src"
              :alt="activeItem.title"
              class="mx-auto max-h-[75vh] w-auto object-contain"
            >
            <div class="border-t border-border px-5 py-4 text-center">
              <p class="text-[10px] uppercase tracking-[0.2em] text-accent">{{ activeItem?.tag }}</p>
              <p class="mt-1 font-playfair text-xl">{{ activeItem?.title }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight, X } from 'lucide-vue-next'
import { rifGalleryItems } from '~/data/rif-gallery'

definePageMeta({ layout: 'website' })

useSeoMeta({
  title: 'RIF Gallery | DINMANS',
  description: 'Browse curated DINMANS lighting product stories — foldable lamps, crystal glow, and ambient designs.',
})

const activeTag = ref('All')
const lightboxIndex = ref<number | null>(null)

const tags = computed(() => [...new Set(rifGalleryItems.map(i => i.tag))])

const filtered = computed(() =>
  activeTag.value === 'All'
    ? [...rifGalleryItems]
    : rifGalleryItems.filter(i => i.tag === activeTag.value),
)

const activeItem = computed(() =>
  lightboxIndex.value === null ? null : filtered.value[lightboxIndex.value] ?? null,
)

function openLightbox(i: number) {
  lightboxIndex.value = i
}

function next() {
  if (lightboxIndex.value === null || !filtered.value.length) return
  lightboxIndex.value = (lightboxIndex.value + 1) % filtered.value.length
}

function prev() {
  if (lightboxIndex.value === null || !filtered.value.length) return
  lightboxIndex.value = (lightboxIndex.value - 1 + filtered.value.length) % filtered.value.length
}

onMounted(() => {
  const onKey = (e: KeyboardEvent) => {
    if (lightboxIndex.value === null) return
    if (e.key === 'Escape') lightboxIndex.value = null
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  }
  window.addEventListener('keydown', onKey)
  onUnmounted(() => window.removeEventListener('keydown', onKey))
})
</script>
