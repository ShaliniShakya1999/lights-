<script setup lang="ts">
const categories = [
  {
    title: 'Lamps',
    image: '/homepages/b2.jpg',
    to: '/lighting/lamps',
    count: 'Table & floor lamps',
  },
  {
    title: 'General Light Interior',
    image: '/homepages/a1.jpg',
    to: '/lighting/general-light-interior',
    count: 'Everyday interiors',
  },
  {
    title: 'Chandeliers',
    image: '/collection_1.jpg',
    to: '/lighting/chandeliers',
    count: 'Statement pieces',
  },
  {
    title: 'COB Panel Track Lights',
    image: '/homepages/e5.jpg',
    to: '/lighting/cob-panel-track-lights',
    count: 'Commercial & home',
  },
]
</script>

<template>
  <section class="py-20 lg:py-28 bg-background">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="mx-auto max-w-2xl text-center">
        <p class="section-label" data-animate="fade-up">Featured Categories</p>
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
          class="group relative aspect-[3/4] overflow-hidden rounded-luxury shadow-soft"
          data-animate="zoom-in"
          :data-delay="String(0.06 * i)"
          data-animate-child
        >
          <img
            :src="item.image"
            :alt="item.title"
            class="img-zoom h-full w-full object-cover"
            loading="lazy"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-500 group-hover:from-black/90" />
          <div class="absolute inset-x-0 bottom-0 p-5 sm:p-6 translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
            <h3 class="font-playfair text-xl text-white sm:text-2xl">{{ item.title }}</h3>
            <p class="mt-1 text-xs text-white/55">{{ item.count }}</p>
            <span class="mt-3 inline-flex items-center text-xs text-white/70 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent">
              Explore →
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
