<template>
  <div
    class="grid gap-5 sm:gap-6"
    :class="gridClass"
  >
    <ShopProductCard
      v-for="(product, index) in products"
      :key="product.id"
      :product="product"
      :index="index"
      @quick-view="$emit('quickView', $event)"
      @add-to-cart="$emit('addToCart', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'

const props = defineProps<{
  products: Product[]
  columns: 2 | 3 | 4
}>()

defineEmits<{
  quickView: [product: Product]
  addToCart: [product: Product]
}>()

const gridClass = computed(() => {
  const map = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4',
  }
  return map[props.columns]
})
</script>
