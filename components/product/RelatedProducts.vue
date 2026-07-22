<template>
  <section v-if="products.length" class="space-y-8">
    <div>
      <p class="section-label">You May Also Like</p>
      <h2 class="mt-2 font-playfair text-3xl sm:text-4xl">Related Products</h2>
    </div>
    <div class="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
      <ShopProductCard
        v-for="(product, index) in products"
        :key="product.id"
        :product="product"
        :index="index"
        :animate="false"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'

defineProps<{
  products: Product[]
}>()
</script>
