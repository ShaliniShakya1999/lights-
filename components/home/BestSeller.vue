<template>
  <section class="section-band bg-white py-20 lg:py-24">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div data-animate="fade-up">
          <p class="section-label">Most Loved</p>
          <h2 class="mt-3 heading-section">Best Sellers</h2>
          <p class="body-lead mt-3 max-w-lg">
            Our most requested lighting pieces — chosen by homeowners and designers alike.
          </p>
        </div>
        <NuxtLink to="/lighting/chandeliers" class="btn-ghost w-fit" data-animate="fade-up" data-delay="0.1">
          View All
        </NuxtLink>
      </div>

      <div class="mt-10 grid grid-cols-2 gap-3 xs:gap-5 md:grid-cols-3 xl:grid-cols-4 sm:mt-12 sm:gap-6" data-stagger-grid>
        <ShopProductCard
          v-for="(product, index) in products"
          :key="product.id"
          :product="product"
          :index="index"
          @add-to-cart="onAdd"
          @quick-view="quickView = $event"
        />
      </div>
    </div>

    <ShopQuickViewModal
      :product="quickView"
      @close="quickView = null"
      @add-to-cart="onAdd"
    />
  </section>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'
import { products as allProducts } from '~/data/products'

const cart = useCart()
const quickView = ref<Product | null>(null)
const products = computed(() =>
  [...allProducts].sort((a, b) => Number(b.bestSelling) - Number(a.bestSelling) || b.reviewCount - a.reviewCount).slice(0, 4),
)

function onAdd(product: Product) {
  cart.add(product.id, 1)
  quickView.value = null
}
</script>
