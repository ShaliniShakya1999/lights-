<template>
  <section class="py-20 lg:py-24 bg-background">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div data-animate="fade-up">
          <p class="section-label">Just Arrived</p>
          <h2 class="mt-3 font-playfair text-4xl sm:text-5xl">New Arrivals</h2>
          <p class="mt-3 max-w-lg text-sm text-text-muted sm:text-base">
            Fresh silhouettes and finishes for the season’s most refined interiors.
          </p>
        </div>
        <NuxtLink to="/lighting/decorative-lighting" class="btn-ghost w-fit" data-animate="fade-up" data-delay="0.1">
          Shop New
        </NuxtLink>
      </div>

      <div class="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
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
  [...allProducts].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 4),
)

function onAdd(product: Product) {
  cart.add(product.id, 1)
  quickView.value = null
}
</script>
