<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { productCategories } from '~/data/product-categories'

const categories = productCategories
</script>

<template>
  <section class="bg-background py-20 lg:py-28">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="mx-auto max-w-2xl text-center">
        <p class="section-label" data-animate="fade-up">Featured Categories</p>
        <h2 class="mt-3 heading-section" data-animate="fade-up" data-delay="0.08">
          Shop By Category
        </h2>
        <p class="body-lead mt-4" data-animate="fade-up" data-delay="0.16">
          Explore lighting designed for every architectural moment.
        </p>
      </div>

      <div class="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6" data-stagger-grid>
        <NuxtLink
          v-for="(item, i) in categories"
          :key="item.title"
          :to="item.to"
          class="group relative aspect-[3/4] overflow-hidden rounded-luxury shadow-soft card-reveal"
          :style="{ animationDelay: `${i * 0.08}s` }"
          data-animate-child
        >
          <img
            :src="item.image"
            :alt="item.title"
            class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/90 group-hover:via-black/40" />
          <div class="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <h3 class="font-playfair text-xl text-white sm:text-2xl">{{ item.title }}</h3>
            <p class="mt-1.5 text-xs tracking-wide text-white/60">
              {{ item.count }} Products
            </p>
            <span class="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-white/75 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-accent">
              Explore
              <ArrowRight :size="14" class="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
