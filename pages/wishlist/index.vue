<script setup lang="ts">
import type { Product } from '~/types/product'
import { products as allProducts } from '~/data/products'

definePageMeta({ layout: 'website' })

useSeoMeta({
  title: 'Wishlist | DINMANS',
  description: 'Your saved DINMANS lighting favourites.',
})

const wishlist = useWishlist()
const cart = useCart()
const quickView = ref<Product | null>(null)

const items = computed(() => allProducts.filter(p => wishlist.ids.value.includes(p.id)))

function onAdd(product: Product) {
  cart.add(product.id, 1)
  quickView.value = null
}
</script>

<template>
  <div class="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
    <div class="max-w-2xl">
      <p class="section-label">Saved Pieces</p>
      <h1 class="mt-3 heading-page">Your Wishlist</h1>
      <p class="body-lead mt-3">
        {{ items.length ? `${items.length} saved lighting piece${items.length === 1 ? '' : 's'}.` : 'You have not saved any pieces yet.' }}
      </p>
    </div>

    <div v-if="items.length" class="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4" data-stagger-grid>
      <ShopProductCard
        v-for="(product, index) in items"
        :key="product.id"
        :product="product"
        :index="index"
        @add-to-cart="onAdd"
        @quick-view="quickView = $event"
      />
    </div>

    <div v-else class="mt-16 rounded-luxury border border-border bg-white px-6 py-16 text-center">
      <p class="font-playfair text-2xl text-text">Your wishlist is empty</p>
      <p class="mt-3 text-sm text-text-muted">Explore the catalog and tap the heart on pieces you love.</p>
      <NuxtLink to="/lighting/chandeliers" class="btn-primary mt-8 inline-flex">
        Shop Collection
      </NuxtLink>
    </div>

    <ShopQuickViewModal
      :product="quickView"
      @close="quickView = null"
      @add-to-cart="onAdd"
    />
  </div>
</template>
