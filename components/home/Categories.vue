<script setup lang="ts">
const categories = [
  {
    title: 'Chandeliers',
    image: '/collection_1.jpg',
    to: '/lighting/chandeliers',
  },
  {
    title: 'Pendants',
    image: '/collection_2.jpg',
    to: '/lighting/pendant-lights',
  },
  {
    title: 'Wall Lights',
    image: '/homepages/a1.jpg',
    to: '/lighting/wall-lights',
  },
  {
    title: 'Floor Lamps',
    image: '/collection_3.jpg',
    to: '/lighting/floor-lamps',
  },
]
</script>

<template>
  <section class="py-20 lg:py-28 bg-background">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="mx-auto max-w-2xl text-center">
        <p class="section-label" data-animate="fade-up">Curated Worlds</p>
        <h2 class="mt-3 font-playfair text-4xl sm:text-5xl" data-animate="fade-up" data-delay="0.08">
          Shop By Category
        </h2>
        <p class="mt-4 text-sm text-text-muted sm:text-base" data-animate="fade-up" data-delay="0.16">
          Explore lighting designed for every architectural moment.
        </p>
      </div>

      <div class="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6" data-stagger-grid>
        <NuxtLink
          v-for="(item, i) in categories"
          :key="item.title"
          :to="item.to"
          class="group relative aspect-[3/4] overflow-hidden rounded-luxury"
          data-animate="zoom-in"
          :data-delay="String(0.08 * i)"
          data-animate-child
        >
          <img
            :src="item.image"
            :alt="item.title"
            class="img-zoom h-full w-full object-cover"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent transition-opacity duration-500 group-hover:from-black/80" />
          <div class="absolute inset-x-0 bottom-0 p-5 sm:p-6 translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
            <h3 class="font-playfair text-xl text-white sm:text-2xl">{{ item.title }}</h3>
            <span class="mt-2 inline-flex items-center text-xs text-white/70 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent">
              Explore →
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
