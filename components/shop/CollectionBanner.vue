<template>
  <section class="relative overflow-hidden rounded-luxury min-h-[300px] lg:min-h-[420px] shadow-luxury">
    <img
      :src="image"
      :alt="title"
      class="absolute inset-0 h-full w-full object-cover scale-105 transition-transform duration-[8s] ease-out hover:scale-110"
    >
    <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
    <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

    <div class="relative z-10 flex min-h-[300px] lg:min-h-[420px] flex-col justify-center px-8 py-14 sm:px-12 lg:px-16 xl:max-w-2xl">
      <p class="section-label !text-accent" data-animate="fade-up">Premium Collection</p>
      <h1
        class="mt-4 font-playfair text-4xl leading-[1.12] text-white sm:text-5xl lg:text-[3.4rem] text-balance"
        data-animate="fade-up"
        data-delay="0.1"
      >
        {{ title }}
      </h1>
      <p
        class="mt-5 max-w-md text-base leading-relaxed text-white/70"
        data-animate="fade-up"
        data-delay="0.2"
      >
        {{ subtitle }}
      </p>
      <div class="mt-8" data-animate="fade-up" data-delay="0.3">
        <a href="#products" class="btn-primary inline-flex" @click="onCta">
          Explore Collection
          <ArrowRight :size="16" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

withDefaults(defineProps<{
  title?: string
  subtitle?: string
  image?: string
}>(), {
  title: 'Luxury Chandeliers',
  subtitle: 'Elegant crystal and designer chandeliers crafted for modern interiors.',
  image: '/collection_1.jpg',
})

const { ripple } = useMotion()

function onCta(e: MouseEvent) {
  ripple(e)
}
</script>
