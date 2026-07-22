<template>
  <section class="bg-white py-20 lg:py-24">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="mx-auto max-w-2xl text-center" data-animate="fade-up">
        <p class="section-label">Shop by Room</p>
        <h2 class="mt-3 font-playfair text-4xl sm:text-5xl">Light Every Space</h2>
        <p class="mt-4 text-sm text-text-muted sm:text-base">
          Find the perfect fixture for every room in your home.
        </p>
      </div>

      <div class="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6" data-stagger-grid>
        <NuxtLink
          v-for="(room, i) in rooms"
          :key="room.name"
          :to="room.to"
          class="group relative aspect-[5/4] overflow-hidden rounded-luxury card-reveal"
          :style="{ animationDelay: `${i * 0.07}s` }"
          data-animate-child
        >
          <img
            :src="room.image"
            :alt="room.name"
            class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
          <div class="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <h3 class="font-playfair text-xl text-white sm:text-2xl">{{ room.name }}</h3>
            <span class="mt-2 inline-flex items-center gap-1 text-xs text-white/70 transition-all group-hover:translate-x-1 group-hover:text-accent">
              Shop room →
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { catalogImages } from '~/data/catalog-images'

const rooms = [
  { name: 'Living Room', image: '/homepages/d4.jpg', to: '/lighting/chandeliers' },
  { name: 'Bedroom', image: '/homepages/c3.jpg', to: '/lighting/lamps' },
  { name: 'Dining', image: '/homepages/slider_new1.jpg', to: '/lighting/chandeliers' },
  { name: 'Kitchen', image: catalogImages[10] || '/catalog/p11.jpg', to: '/lighting/cob-panel-track-lights' },
  { name: 'Office', image: catalogImages[5] || '/catalog/p6.jpg', to: '/lighting/general-light-interior' },
  { name: 'Outdoor', image: catalogImages[15] || '/catalog/p16.jpg', to: '/lighting/lamps' },
]
</script>
