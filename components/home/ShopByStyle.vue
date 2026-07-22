<template>
  <section class="bg-background py-20 lg:py-24">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="mx-auto max-w-2xl text-center" data-animate="fade-up">
        <p class="section-label">Curated Looks</p>
        <h2 class="mt-3 heading-section">Shop by Style</h2>
        <p class="body-lead mt-4">
          Find the lighting language that matches your interior story.
        </p>
      </div>

      <div class="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-5" data-stagger-grid>
        <NuxtLink
          v-for="(style, i) in styles"
          :key="style.title"
          :to="style.to"
          class="group relative aspect-[3/4] overflow-hidden rounded-luxury shadow-soft transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-luxury card-reveal"
          :style="{ animationDelay: `${i * 0.06}s` }"
          data-animate-child
        >
          <img
            :src="style.image"
            :alt="style.title"
            class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
          <div class="absolute inset-x-0 bottom-0 p-4 text-center">
            <h3 class="font-playfair text-lg text-white">{{ style.title }}</h3>
            <span class="mt-1 inline-block text-[10px] uppercase tracking-[0.2em] text-white/60 transition-colors group-hover:text-accent">
              Explore
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { catalogImages } from '~/data/catalog-images'

const styles = [
  { title: 'Modern', image: '/homepages/c3.jpg', to: '/lighting/chandeliers' },
  { title: 'Classic', image: '/homepages/d4.jpg', to: '/lighting/chandeliers' },
  { title: 'Minimal', image: catalogImages[4] || '/catalog/p5.jpg', to: '/lighting/lamps' },
  { title: 'Art Deco', image: catalogImages[8] || '/catalog/p9.jpg', to: '/lighting/chandeliers' },
  { title: 'Industrial', image: catalogImages[12] || '/catalog/p13.jpg', to: '/lighting/cob-panel-track-lights' },
  { title: 'Ethnic', image: '/27.jpeg', to: '/lighting/lamps' },
]
</script>
