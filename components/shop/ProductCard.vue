<template>
  <article
    class="group luxury-card overflow-hidden card-reveal"
    :class="list ? 'sm:flex sm:flex-row' : ''"
    data-animate-child
    :style="{ animationDelay: `${Math.min(index, 8) * 0.07}s` }"
  >
    <div
      class="relative overflow-hidden bg-white"
      :class="list ? 'aspect-square w-full sm:w-56 sm:shrink-0 lg:w-64' : 'aspect-[4/5]'"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      <NuxtLink :to="`/product/${product.slug}`" class="block h-full w-full">
        <img
          :src="product.images[0]"
          :alt="product.name"
          class="h-full w-full object-cover transition-all duration-700 ease-out"
          :class="hovered && product.hoverImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100 group-hover:scale-105'"
          loading="lazy"
        >
        <img
          v-if="product.hoverImage"
          :src="product.hoverImage"
          :alt="`${product.name} alternate`"
          class="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out"
          :class="hovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'"
          loading="lazy"
        >
      </NuxtLink>

      <div class="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
        <span
          v-for="(badge, bi) in visibleBadges"
          :key="badge"
          class="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider shadow-soft transition-transform duration-300"
          :class="badgeClass(badge)"
          :style="{ transitionDelay: `${bi * 40}ms` }"
        >
          {{ badgeLabel(badge) }}
        </span>
        <span
          v-if="discountPercent"
          class="rounded-full bg-[#9B2226] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-soft"
        >
          {{ discountPercent }}% Off
        </span>
      </div>

      <div class="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-100 sm:opacity-0 sm:translate-x-3 sm:group-hover:opacity-100 sm:group-hover:translate-x-0 transition-all duration-500 ease-out">
        <button type="button" class="icon-btn flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-soft text-text hover:text-accent" :class="{ 'animate-heart-pop !text-accent': wishlisted }" :aria-label="wishlisted ? 'Remove wishlist' : 'Wishlist'" @click.stop="onWishlist">
          <Heart :size="15" :fill="wishlisted ? 'currentColor' : 'none'" />
        </button>
        <button type="button" class="icon-btn flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-soft text-text hover:text-accent" :class="{ '!text-accent': compared }" aria-label="Compare" @click.stop="onCompare">
          <GitCompareArrows :size="15" />
        </button>
        <button type="button" class="icon-btn flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-soft text-text hover:text-accent" aria-label="Quick view" @click.stop="$emit('quickView', product)">
          <Eye :size="15" />
        </button>
      </div>

      <div class="absolute inset-x-3 bottom-3 z-10 flex gap-2 opacity-100 sm:opacity-0 sm:translate-y-4 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-500 ease-out">
        <button type="button" class="btn-primary flex-1 !py-2.5 !text-xs" @click.stop="onAdd($event)">
          Add Cart
        </button>
        <button type="button" class="btn-ghost flex-1 !py-2.5 !text-xs !bg-white/95" @click.stop="onQuote">
          Quote
        </button>
      </div>
    </div>

    <div class="flex flex-1 flex-col p-4 sm:p-5" :class="list ? 'justify-center' : ''">
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

      <p v-if="list" class="mt-3 line-clamp-2 text-sm text-text-muted">{{ product.description }}</p>

      <div class="mt-3.5 flex items-center gap-1.5">
        <span
          v-for="color in product.colors.slice(0, 4)"
          :key="color.name"
          class="h-4 w-4 rounded-full border border-border"
          :style="{ backgroundColor: color.hex }"
          :title="color.name"
        />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { Eye, GitCompareArrows, Heart, Star } from 'lucide-vue-next'
import type { Product, ProductBadge } from '~/types/product'
import { formatPrice, formatSavings } from '~/composables/useProducts'

const props = withDefaults(defineProps<{
  product: Product
  index?: number
  list?: boolean
}>(), {
  index: 0,
  list: false,
})

const emit = defineEmits<{
  quickView: [product: Product]
  addToCart: [product: Product]
  quote: [product: Product]
}>()

const wishlist = useWishlist()
const compare = useCompare()
const { ripple, pop } = useMotion()
const hovered = ref(false)

const wishlisted = computed(() => wishlist.has(props.product.id))
const compared = computed(() => compare.has(props.product.id))
const savings = computed(() => formatSavings(props.product.price, props.product.oldPrice))
const visibleBadges = computed(() => props.product.badges.slice(0, 2))
const discountPercent = computed(() => {
  if (!props.product.oldPrice || props.product.oldPrice <= props.product.price) return null
  return Math.round(((props.product.oldPrice - props.product.price) / props.product.oldPrice) * 100)
})

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

function onQuote() {
  emit('quote', props.product)
}

function badgeLabel(badge: ProductBadge) {
  const map: Record<ProductBadge, string> = {
    luxury: 'Exclusive',
    bestseller: 'Best Seller',
    new: 'New',
    sale: 'Sale',
    limited: 'Limited',
    trending: 'Trending',
    exclusive: 'Exclusive',
  }
  return map[badge]
}

function badgeClass(badge: ProductBadge) {
  const map: Record<ProductBadge, string> = {
    luxury: 'bg-secondary text-white',
    bestseller: 'bg-accent text-secondary',
    new: 'bg-[#2D6A4F] text-white',
    sale: 'bg-[#9B2226] text-white',
    limited: 'bg-[#7C3AED] text-white',
    trending: 'bg-[#0EA5E9] text-white',
    exclusive: 'bg-[#111111] text-accent',
  }
  return map[badge]
}
</script>
