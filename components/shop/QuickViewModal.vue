<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="product"
        class="fixed inset-0 z-[80] flex items-center justify-center p-4"
        @click.self="$emit('close')"
      >
        <div class="absolute inset-0 bg-black/45 backdrop-blur-sm" />
        <div class="modal-panel relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-luxury bg-white shadow-luxury transition-all duration-250">
          <button
            type="button"
            class="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-border shadow-soft"
            aria-label="Close"
            @click="$emit('close')"
          >
            <X :size="16" />
          </button>

          <div class="grid md:grid-cols-2">
            <div class="aspect-square bg-[#F3F3F3]">
              <img :src="product.images[0]" :alt="product.name" class="h-full w-full object-cover">
            </div>
            <div class="flex flex-col justify-center p-8 lg:p-10">
              <p class="text-xs uppercase tracking-[0.2em] text-text-muted">{{ product.brand }}</p>
              <h3 class="mt-2 font-playfair text-3xl">{{ product.name }}</h3>
              <div class="mt-3 flex items-center gap-2 text-sm text-text-muted">
                <span class="text-accent">★ {{ product.rating }}</span>
                <span>({{ product.reviewCount }} reviews)</span>
              </div>
              <p class="mt-4 text-2xl font-medium">{{ formatPrice(product.price) }}</p>
              <p class="mt-4 text-sm leading-relaxed text-text-muted line-clamp-3">{{ product.description }}</p>
              <div class="mt-8 flex gap-3">
                <NuxtLink :to="`/product/${product.slug}`" class="btn-primary flex-1" @click="$emit('close')">
                  View Details
                </NuxtLink>
                <button type="button" class="btn-secondary flex-1" @click="$emit('addToCart', product)">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
import type { Product } from '~/types/product'
import { formatPrice } from '~/composables/useProducts'

defineProps<{
  product: Product | null
}>()

defineEmits<{
  close: []
  addToCart: [product: Product]
}>()
</script>
