<template>
  <section class="py-20 lg:py-24 bg-white">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="mx-auto max-w-2xl text-center" data-animate="fade-up">
        <p class="section-label">Customer Reviews</p>
        <h2 class="mt-3 font-playfair text-4xl sm:text-5xl">What Our Clients Say</h2>
        <p class="mt-4 text-sm text-text-muted sm:text-base">
          Real feedback from homes and projects lit with DINMANS.
        </p>
      </div>

      <div class="mt-14 grid gap-6 md:grid-cols-3">
        <article
          v-for="(review, i) in reviews"
          :key="review.name"
          class="rounded-luxury border border-border bg-background p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-luxury"
          data-animate="fade-up"
          :data-delay="String(i * 0.08)"
        >
          <div class="flex gap-0.5 text-accent">
            <Star v-for="n in 5" :key="n" :size="14" fill="currentColor" />
          </div>
          <p class="mt-5 text-sm leading-relaxed text-text">“{{ review.quote }}”</p>
          <div class="mt-6 flex items-center gap-3 border-t border-border pt-5">
            <img :src="review.photo" :alt="review.name" class="h-12 w-12 rounded-full object-cover" loading="lazy">
            <div>
              <p class="text-sm font-medium">{{ review.name }}</p>
              <p class="text-xs text-text-muted">{{ review.city }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Star } from 'lucide-vue-next'

const reviews = [
  {
    name: 'Aanya Mehta',
    city: 'Mumbai',
    quote: 'Excellent quality. The chandelier transformed our living room overnight.',
    photo: '/1.jpeg',
  },
  {
    name: 'Rohan Kapoor',
    city: 'Bangalore',
    quote: 'Looks amazing — warm light, premium finish, and seamless delivery.',
    photo: '/2.jpeg',
  },
  {
    name: 'Priya Nair',
    city: 'Delhi',
    quote: 'Highly recommended. Design consultation made choosing so easy.',
    photo: '/3.jpeg',
  },
]
</script>
