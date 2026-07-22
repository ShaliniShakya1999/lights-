<template>
  <Teleport to="body">
    <Transition name="slide-fade">
      <div
        v-if="visible"
        class="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-white/95 backdrop-blur-xl shadow-[0_-12px_40px_rgba(17,17,17,0.08)]"
      >
        <div class="mx-auto flex max-w-[1440px] items-center gap-4 px-4 py-3 sm:px-6 lg:px-10">
          <img
            :src="product.images[0]"
            :alt="product.name"
            class="hidden h-14 w-14 rounded-2xl object-cover sm:block"
          >
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium text-text">{{ product.name }}</p>
            <p class="mt-0.5 text-sm text-accent font-medium">{{ formatPrice(product.price) }}</p>
          </div>
          <div class="flex items-center gap-2 sm:gap-3">
            <button type="button" class="btn-ghost !px-4 !py-2.5 hidden sm:inline-flex" @click="$emit('wishlist')">
              <Heart :size="16" />
            </button>
            <button type="button" class="btn-primary !px-5 !py-2.5 !text-xs sm:!text-sm" @click="$emit('addToCart')">
              Add to Cart
            </button>
            <button type="button" class="btn-secondary !px-5 !py-2.5 !text-xs sm:!text-sm hidden md:inline-flex" @click="$emit('buyNow')">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { Heart } from 'lucide-vue-next'
import type { Product } from '~/types/product'
import { formatPrice } from '~/composables/useProducts'

defineProps<{
  product: Product
  visible: boolean
}>()

defineEmits<{
  addToCart: []
  buyNow: []
  wishlist: []
}>()
</script>
