<template>
  <section class="space-y-8">
    <div data-animate="fade-up">
      <p class="section-label">Styled Spaces</p>
      <h2 class="mt-2 font-playfair text-3xl sm:text-4xl">Interior Inspiration</h2>
      <p class="mt-3 max-w-xl text-sm text-text-muted">
        Real homes and hospitality projects featuring DINMANS lighting compositions.
      </p>
    </div>

    <div class="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
      <div
        v-for="(img, i) in images"
        :key="img"
        class="group relative overflow-hidden rounded-luxury"
        :class="i === 0 || i === 3 ? 'aspect-[4/5] lg:row-span-2 lg:aspect-auto lg:min-h-full' : 'aspect-[4/3]'"
        data-animate="zoom-in"
        :data-delay="String(i * 0.07)"
      >
        <img
          :src="img"
          alt="Interior inspiration"
          class="img-zoom h-full w-full object-cover"
          loading="lazy"
        >
        <div class="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { inspirationImages } from '~/data/products'

const images = inspirationImages
</script>
