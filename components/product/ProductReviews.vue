<template>
  <section id="reviews" class="space-y-8">
    <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="section-label">Customer Voices</p>
        <h2 class="mt-2 font-playfair text-3xl sm:text-4xl">Customer Reviews</h2>
      </div>
      <div class="flex items-center gap-4 rounded-luxury border border-border bg-white px-6 py-4 shadow-soft">
        <span class="font-playfair text-4xl text-text">{{ product.rating }}</span>
        <div>
          <div class="flex text-accent">
            <Star
              v-for="n in 5"
              :key="n"
              :size="14"
              :fill="n <= Math.round(product.rating) ? 'currentColor' : 'none'"
            />
          </div>
          <p class="mt-1 text-xs text-text-muted">Based on {{ product.reviewCount }} reviews</p>
        </div>
      </div>
    </div>

    <div class="space-y-5">
      <article
        v-for="review in product.reviews"
        :key="review.id"
        class="luxury-card p-6 sm:p-7"
      >
        <div class="flex items-start gap-4">
          <img
            :src="review.avatar"
            :alt="review.author"
            class="h-12 w-12 rounded-full object-cover"
          >
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-2">
              <h3 class="font-medium text-text">{{ review.author }}</h3>
              <span
                v-if="review.verified"
                class="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-medium text-accent"
              >
                Verified
              </span>
            </div>
            <div class="mt-1 flex items-center gap-2">
              <div class="flex text-accent">
                <Star
                  v-for="n in 5"
                  :key="n"
                  :size="12"
                  :fill="n <= review.rating ? 'currentColor' : 'none'"
                  :class="n <= review.rating ? '' : 'text-border'"
                />
              </div>
              <span class="text-xs text-text-muted">{{ formatDate(review.date) }}</span>
            </div>
            <h4 class="mt-3 font-playfair text-lg">{{ review.title }}</h4>
            <p class="mt-2 text-sm leading-relaxed text-text-muted">{{ review.content }}</p>
            <div v-if="review.images?.length" class="mt-4 flex gap-2">
              <img
                v-for="img in review.images"
                :key="img"
                :src="img"
                alt="Review photo"
                class="h-20 w-20 rounded-2xl object-cover"
              >
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Star } from 'lucide-vue-next'
import type { Product } from '~/types/product'

defineProps<{
  product: Product
}>()

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}
</script>
