<template>
  <section class="bg-white py-20 lg:py-24">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="mx-auto max-w-2xl text-center" data-animate="fade-up">
        <p class="section-label">Customer Stories</p>
        <h2 class="mt-3 heading-section">Homes Lit by DINMANS</h2>
        <p class="body-lead mt-4">
          Real spaces, real light — stories from clients who chose craft over ordinary.
        </p>
      </div>

      <div class="mt-12 grid gap-6 md:grid-cols-3" data-stagger-grid>
        <article
          v-for="(story, i) in stories"
          :key="story.name"
          class="luxury-card overflow-hidden card-reveal"
          :style="{ animationDelay: `${i * 0.1}s` }"
          data-animate-child
        >
          <div class="aspect-[16/10] overflow-hidden">
            <img
              :src="story.image"
              :alt="story.space"
              class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            >
          </div>
          <div class="p-6">
            <p class="text-[11px] uppercase tracking-[0.2em] text-accent">{{ story.space }}</p>
            <h3 class="mt-2 font-playfair text-xl text-text">{{ story.name }}</h3>
            <p class="mt-3 text-sm leading-relaxed text-text-muted">{{ story.quote }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stories = [
  {
    name: 'Aarav & Meera',
    space: 'Villa · Pune',
    quote: 'Our double-height dining chandelier became the heart of every gathering.',
    image: '/homepages/d4.jpg',
  },
  {
    name: 'Studio North',
    space: 'Boutique Hotel · Goa',
    quote: 'Layered pendants and wall lights gave every suite a calm, golden mood.',
    image: '/homepages/c3.jpg',
  },
  {
    name: 'Priya Kapoor',
    space: 'Apartment · Mumbai',
    quote: 'The designer lamps feel sculptural by day and luminous by night.',
    image: '/homepages/slider_new1.jpg',
  },
]
</script>
