<template>
  <section class="relative overflow-hidden rounded-luxury bg-secondary text-white shadow-luxury">
    <div class="grid lg:grid-cols-2 min-h-[280px] lg:min-h-[380px]">
      <div class="relative z-10 flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-14 xl:px-16">
        <p class="section-label !text-accent" data-animate="fade-up" data-delay="0">
          Premium Collection
        </p>
        <h1
          class="mt-4 font-playfair text-4xl leading-[1.15] sm:text-5xl lg:text-[3.25rem] text-balance text-white"
          data-animate="fade-up"
          data-delay="0.1"
        >
          {{ title }}
        </h1>
        <p
          class="mt-5 max-w-md text-base leading-relaxed text-white/65"
          data-animate="fade-up"
          data-delay="0.2"
        >
          {{ subtitle }}
        </p>
        <div class="mt-8" data-animate="fade-up" data-delay="0.3">
          <a href="#products" class="btn-primary animate-pulse-glow" @click="onCta">
            Explore Collection
            <ArrowRight :size="16" class="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      <div
        class="relative hidden lg:block min-h-[380px] overflow-hidden"
        data-animate="zoom-in"
        data-delay="0.15"
      >
        <img
          :src="image"
          :alt="title"
          class="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out hover:scale-105"
        >
        <div class="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/40 to-transparent" />
        <div class="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent" />
      </div>
    </div>

    <div class="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl animate-float" />
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

withDefaults(defineProps<{
  title?: string
  subtitle?: string
  image?: string
}>(), {
  title: 'Luxury Chandeliers Collection',
  subtitle: 'Discover premium handcrafted lighting collections for modern interiors.',
  image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=1400&h=1000&fit=crop',
})

const { ripple } = useMotion()

function onCta(e: MouseEvent) {
  ripple(e)
}
</script>
