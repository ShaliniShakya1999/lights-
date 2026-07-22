<template>
  <section class="bg-background py-20 lg:py-24">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" data-animate="fade-up">
        <div>
          <p class="section-label">RIF Gallery</p>
          <h2 class="mt-3 font-playfair text-4xl sm:text-5xl">Product Stories</h2>
          <p class="mt-3 max-w-lg text-sm text-text-muted sm:text-base">
            Handpicked DINMANS lighting designs — warm glow, foldable craft, and sculptural light.
          </p>
        </div>
        <NuxtLink to="/projects" class="btn-ghost w-fit">View Full Gallery</NuxtLink>
      </div>

      <div class="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5" data-stagger-grid>
        <NuxtLink
          v-for="(item, i) in items"
          :key="item.id"
          to="/projects"
          class="group relative overflow-hidden rounded-luxury border border-border bg-white card-reveal"
          :class="i === 0 || i === 5 ? 'lg:col-span-2 lg:row-span-2' : ''"
          :style="{ animationDelay: `${i * 0.06}s` }"
          data-animate-child
        >
          <div :class="i === 0 || i === 5 ? 'aspect-square lg:aspect-auto lg:min-h-[420px]' : 'aspect-[4/5]'">
            <img
              :src="item.src"
              :alt="item.title"
              class="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              loading="lazy"
            >
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90" />
          <div class="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <p class="text-[10px] uppercase tracking-[0.22em] text-accent">{{ item.tag }}</p>
            <h3 class="mt-1 font-playfair text-lg text-white sm:text-xl">{{ item.title }}</h3>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { rifGalleryFeatured } from '~/data/rif-gallery'

const items = rifGalleryFeatured
</script>
