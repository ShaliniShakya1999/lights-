<template>
  <section class="py-20 lg:py-24 bg-background">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="mx-auto max-w-2xl text-center" data-animate="fade-up">
        <p class="section-label">Instagram Gallery</p>
        <h2 class="mt-3 heading-section">@dinmans</h2>
        <p class="body-lead mt-4">Follow our latest installations and styling moments.</p>
      </div>
      <div class="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4" data-stagger-grid>
        <a
          v-for="(img, i) in images"
          :key="img"
          href="#"
          class="group relative aspect-square overflow-hidden rounded-2xl card-reveal"
          :style="{ animationDelay: `${i * 0.06}s` }"
          data-animate-child
        >
          <img :src="img" alt="Instagram lighting" class="img-zoom h-full w-full object-cover" loading="lazy">
          <div class="absolute inset-0 bg-secondary/0 transition-colors duration-300 group-hover:bg-secondary/30" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const images = [
  '/homepages/c3.jpg',
  '/homepages/d4.jpg',
  '/homepages/slider_new1.jpg',
  '/5.jpeg',
  '/9.jpeg',
  '/25.jpeg',
]
</script>
