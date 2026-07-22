<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="product"
        class="fixed inset-0 z-[80] flex items-center justify-center p-4"
        @click.self="$emit('close')"
      >
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div class="modal-panel relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-luxury bg-white shadow-luxury">
          <button
            type="button"
            class="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white shadow-soft"
            aria-label="Close"
            @click="$emit('close')"
          >
            <X :size="16" />
          </button>

          <div class="grid md:grid-cols-2">
            <div class="bg-white p-4 sm:p-6">
              <div class="aspect-square overflow-hidden rounded-2xl bg-[#FAFAFA]">
                <img :src="activeImage" :alt="product.name" class="h-full w-full object-cover">
              </div>
              <div class="mt-3 flex gap-2 overflow-x-auto scrollbar-thin">
                <button
                  v-for="(img, i) in product.images.slice(0, 5)"
                  :key="img"
                  type="button"
                  class="h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-colors"
                  :class="activeIndex === i ? 'border-accent' : 'border-transparent'"
                  @click="activeIndex = i"
                >
                  <img :src="img" alt="" class="h-full w-full object-cover">
                </button>
              </div>
            </div>

            <div class="flex flex-col p-6 sm:p-8 lg:p-10">
              <p class="text-xs uppercase tracking-[0.2em] text-text-muted">{{ product.brand }}</p>
              <h3 class="mt-2 font-playfair text-3xl leading-snug">{{ product.name }}</h3>
              <div class="mt-3 flex items-center gap-2 text-sm">
                <span class="text-accent">★ {{ product.rating }}</span>
                <span class="text-text-muted">({{ product.reviewCount }} reviews)</span>
              </div>

              <div class="mt-4 flex flex-wrap items-baseline gap-3">
                <p class="text-2xl font-medium">{{ formatPrice(product.price) }}</p>
                <p v-if="product.oldPrice" class="text-text-muted line-through">{{ formatPrice(product.oldPrice) }}</p>
              </div>

              <p class="mt-4 text-sm leading-relaxed text-text-muted line-clamp-4">{{ product.description }}</p>

              <dl class="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div class="rounded-xl border border-border bg-background px-3 py-2.5">
                  <dt class="text-[10px] uppercase tracking-wider text-text-muted">Material</dt>
                  <dd class="mt-1 font-medium">{{ product.material }}</dd>
                </div>
                <div class="rounded-xl border border-border bg-background px-3 py-2.5">
                  <dt class="text-[10px] uppercase tracking-wider text-text-muted">Finish</dt>
                  <dd class="mt-1 font-medium">{{ product.finish }}</dd>
                </div>
                <div class="rounded-xl border border-border bg-background px-3 py-2.5">
                  <dt class="text-[10px] uppercase tracking-wider text-text-muted">Bulb</dt>
                  <dd class="mt-1 font-medium">{{ product.bulbType }}</dd>
                </div>
                <div class="rounded-xl border border-border bg-background px-3 py-2.5">
                  <dt class="text-[10px] uppercase tracking-wider text-text-muted">Warranty</dt>
                  <dd class="mt-1 font-medium line-clamp-1">{{ product.warranty }}</dd>
                </div>
              </dl>

              <div class="mt-8 flex flex-wrap gap-3">
                <button type="button" class="btn-primary flex-1 min-w-[140px]" @click="$emit('addToCart', product)">
                  Add to Cart
                </button>
                <button
                  type="button"
                  class="btn-ghost"
                  :class="{ '!border-accent !text-accent': wishlisted }"
                  @click="wishlist.toggle(product.id)"
                >
                  <Heart :size="16" :fill="wishlisted ? 'currentColor' : 'none'" />
                  Wishlist
                </button>
              </div>

              <NuxtLink
                :to="`/product/${product.slug}`"
                class="mt-4 text-center text-sm text-accent hover:underline"
                @click="$emit('close')"
              >
                View full details →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { Heart, X } from 'lucide-vue-next'
import type { Product } from '~/types/product'
import { formatPrice } from '~/composables/useProducts'

const props = defineProps<{
  product: Product | null
}>()

defineEmits<{
  close: []
  addToCart: [product: Product]
}>()

const wishlist = useWishlist()
const activeIndex = ref(0)

const activeImage = computed(() => props.product?.images[activeIndex.value] ?? props.product?.images[0] ?? '')
const wishlisted = computed(() => props.product ? wishlist.has(props.product.id) : false)

watch(() => props.product?.id, () => {
  activeIndex.value = 0
})
</script>
