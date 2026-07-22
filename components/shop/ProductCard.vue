<template>
  <article
    class="group luxury-card overflow-hidden"
    data-animate="fade-up"
    :data-delay="String(index * 0.06)"
  >
    <div class="relative aspect-[4/5] overflow-hidden bg-[#F3F3F3]">
      <NuxtLink :to="`/product/${product.slug}`" class="block h-full w-full">
        <img
          :src="product.images[0]"
          :alt="product.name"
          class="img-zoom h-full w-full object-cover"
          :class="hovered && product.hoverImage ? 'opacity-0' : 'opacity-100'"
          loading="lazy"
          @mouseenter="hovered = true"
          @mouseleave="hovered = false"
        >
        <img
          v-if="product.hoverImage"
          :src="product.hoverImage"
          :alt="`${product.name} alternate view`"
          class="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out"
          :class="hovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'"
          loading="lazy"
          @mouseenter="hovered = true"
          @mouseleave="hovered = false"
        >
      </NuxtLink>

      <div class="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
        <span
          v-for="(badge, bi) in visibleBadges"
          :key="badge"
          class="rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white transition-transform duration-300"
          :class="badgeClass(badge)"
          :style="{ transitionDelay: `${bi * 40}ms` }"
        >
          {{ badgeLabel(badge) }}
        </span>
      </div>

      <div class="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-100 sm:opacity-0 sm:translate-x-3 sm:group-hover:opacity-100 sm:group-hover:translate-x-0 transition-all duration-500 ease-out">
        <button
          type="button"
          class="icon-btn flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-soft text-text hover:text-accent"
          :class="{ 'animate-heart-pop !text-accent': wishlisted }"
          :aria-label="wishlisted ? 'Remove from wishlist' : 'Add to wishlist'"
          @click.stop="onWishlist"
        >
          <Heart :size="15" :fill="wishlisted ? 'currentColor' : 'none'" />
        </button>
        <button
          type="button"
          class="icon-btn flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-soft text-text hover:text-accent"
          :class="{ '!text-accent': compared }"
          aria-label="Compare"
          @click.stop="onCompare"
        >
          <GitCompareArrows :size="15" />
        </button>
        <button
          type="button"
          class="icon-btn flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-soft text-text hover:text-accent"
          aria-label="Quick view"
          @click.stop="$emit('quickView', product)"
        >
          <Eye :size="15" />
        </button>
      </div>

      <div class="absolute inset-x-3 bottom-3 z-10 flex gap-2 opacity-100 sm:opacity-0 sm:translate-y-4 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-500 ease-out">
        <button type="button" class="btn-primary flex-1 !py-2.5 !text-xs" @click.stop="onAdd($event)">
          Add to Cart
        </button>
        <NuxtLink
          :to="`/product/${product.slug}`"
          class="btn-secondary flex-1 !py-2.5 !text-xs !border-white !text-white hover:!bg-white hover:!text-secondary"
          @click.stop
        >
          Buy Now
        </NuxtLink>
      </div>
    </div>

    <div class="p-4 sm:p-5">
      <p class="text-[11px] uppercase tracking-[0.18em] text-text-muted">{{ product.brand }}</p>
      <NuxtLink :to="`/product/${product.slug}`">
        <h3 class="mt-1.5 font-playfair text-lg leading-snug text-text transition-colors hover:text-accent line-clamp-2">
          {{ product.name }}
        </h3>
      </NuxtLink>

      <div class="mt-2.5 flex items-center gap-2">
        <div class="flex items-center gap-0.5 text-accent">
          <Star
            v-for="n in 5"
            :key="n"
            :size="12"
            :fill="n <= Math.round(product.rating) ? 'currentColor' : 'none'"
            :class="n <= Math.round(product.rating) ? '' : 'text-border'"
          />
        </div>
        <span class="text-xs text-text-muted">{{ product.rating }} ({{ product.reviewCount }})</span>
      </div>

      <div class="mt-3 flex flex-wrap items-baseline gap-2">
        <span class="text-lg font-medium text-text">{{ formatPrice(product.price) }}</span>
        <span v-if="product.oldPrice" class="text-sm text-text-muted line-through">
          {{ formatPrice(product.oldPrice) }}
        </span>
      </div>
      <p v-if="savings" class="mt-1 text-xs font-medium text-accent">{{ savings }}</p>

      <div class="mt-3.5 flex items-center gap-1.5">
        <span
          v-for="color in product.colors.slice(0, 4)"
          :key="color.name"
          class="h-4 w-4 rounded-full border border-border"
          :style="{ backgroundColor: color.hex }"
          :title="color.name"
        />
        <span v-if="product.colors.length > 4" class="text-[10px] text-text-muted ml-1">
          +{{ product.colors.length - 4 }}
        </span>
      </div>

      <div class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-text-muted">
        <span>{{ product.material }}</span>
        <span class="h-1 w-1 rounded-full bg-border" />
        <span class="inline-flex items-center gap-1">
          <Truck :size="11" />
          {{ product.deliveryDays }}
        </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { Eye, GitCompareArrows, Heart, Star, Truck } from 'lucide-vue-next'
import type { Product, ProductBadge } from '~/types/product'
import { formatPrice, formatSavings } from '~/composables/useProducts'

const props = withDefaults(defineProps<{
  product: Product
  index?: number
}>(), {
  index: 0,
})

const emit = defineEmits<{
  quickView: [product: Product]
  addToCart: [product: Product]
}>()

const wishlist = useWishlist()
const compare = useCompare()
const { ripple, pop } = useMotion()
const hovered = ref(false)

const wishlisted = computed(() => wishlist.has(props.product.id))
const compared = computed(() => compare.has(props.product.id))
const savings = computed(() => formatSavings(props.product.price, props.product.oldPrice))
const visibleBadges = computed(() => props.product.badges.slice(0, 3))

function onWishlist(e: MouseEvent) {
  wishlist.toggle(props.product.id)
  pop(e.currentTarget as Element)
}

function onCompare() {
  compare.toggle(props.product.id)
}

function onAdd(e: MouseEvent) {
  ripple(e)
  emit('addToCart', props.product)
}

function badgeLabel(badge: ProductBadge) {
  const map: Record<ProductBadge, string> = {
    luxury: 'Luxury',
    bestseller: 'Best Seller',
    new: 'New Arrival',
    sale: 'Sale',
  }
  return map[badge]
}

function badgeClass(badge: ProductBadge) {
  const map: Record<ProductBadge, string> = {
    luxury: 'bg-secondary',
    bestseller: 'bg-accent',
    new: 'bg-[#2D6A4F]',
    sale: 'bg-[#9B2226]',
  }
  return map[badge]
}
</script>
