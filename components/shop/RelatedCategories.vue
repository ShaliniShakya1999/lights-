<template>
  <section class="space-y-8">
    <div data-animate="fade-up">
      <p class="section-label">Discover More</p>
      <h2 class="mt-2 heading-section-sm">Related Categories</h2>
    </div>
    <div class="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6" data-stagger-grid>
      <NuxtLink
        v-for="(cat, i) in categories"
        :key="cat.slug"
        :to="`/lighting/${cat.slug}`"
        class="group relative aspect-[4/5] overflow-hidden rounded-luxury sm:aspect-[5/4]"
        data-animate="fade-up"
        :data-delay="String(i * 0.08)"
        data-animate-child
      >
        <img
          :src="cat.image"
          :alt="cat.name"
          class="img-zoom h-full w-full object-cover"
          loading="lazy"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div class="absolute inset-x-0 bottom-0 p-5 transition-transform duration-500 group-hover:translate-y-[-4px]">
          <h3 class="font-playfair text-xl text-white">{{ cat.name }}</h3>
          <p class="mt-1 text-xs text-white/60">{{ cat.count }} pieces</p>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { relatedCategories } from '~/data/products'

const categories = relatedCategories
</script>
