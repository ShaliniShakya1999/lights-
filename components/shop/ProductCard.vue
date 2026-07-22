<template>
  <article
    class="group luxury-card flex h-full flex-col overflow-hidden card-reveal"
    :class="list ? 'sm:flex-row' : ''"
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
          class="h-full w-full object-cover transition-transform duration-700 ease-out"
          :class="hovered && secondaryImage ? 'opacity-0 scale-[1.03]' : 'opacity-100 scale-100 group-hover:scale-[1.03]'"
          loading="lazy"
        >
        <img
          v-if="secondaryImage"
          :src="secondaryImage"
          :alt="`${product.name} alternate`"
          class="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out"
          :class="hovered ? 'opacity-100 scale-[1.03]' : 'opacity-0 scale-100'"
          loading="lazy"
        >
      </NuxtLink>

      <div class="absolute left-2 top-2 z-10 flex max-w-[70%] flex-col gap-1 xs:left-3 xs:top-3 xs:gap-1.5">
        <span
          v-for="(badge, bi) in visibleBadges"
          :key="badge"
          class="w-fit rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider shadow-soft xs:px-2.5 xs:py-1 xs:text-[10px]"
          :class="badgeClass(badge)"
          :style="{ transitionDelay: `${bi * 40}ms` }"
        >
          {{ badgeLabel(badge) }}
        </span>
        <span
          v-if="discountPercent"
          class="w-fit rounded-full bg-[#9B2226] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white shadow-soft xs:px-2.5 xs:py-1 xs:text-[10px]"
        >
          {{ discountPercent }}% Off
        </span>
      </div>

      <div class="absolute right-2 top-2 z-10 flex flex-col gap-1.5 opacity-100 xs:right-3 xs:top-3 xs:gap-2 max-sm:pointer-events-auto sm:opacity-0 sm:translate-y-1 sm:pointer-events-none sm:group-hover:pointer-events-auto sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-300 ease-out">
        <button
          type="button"
          class="icon-btn flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-luxury text-text hover:text-[#C45C6A] sm:h-10 sm:w-10"
          :class="{ 'animate-heart-pop !text-[#C45C6A] !opacity-100': wishlisted }"
          :aria-label="wishlisted ? 'Remove wishlist' : 'Wishlist'"
          @click.stop="onWishlist"
        >
          <Heart :size="16" :fill="wishlisted ? 'currentColor' : 'none'" />
        </button>
        <button
          type="button"
          class="icon-btn hidden h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-luxury text-text hover:text-accent xs:flex"
          aria-label="Quick view"
          @click.stop="$emit('quickView', product)"
        >
          <Eye :size="16" />
        </button>
        <button
          type="button"
          class="icon-btn hidden h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-luxury text-text hover:text-accent sm:flex"
          :class="{ '!text-accent': compared }"
          aria-label="Compare"
          @click.stop="onCompare"
        >
          <GitCompareArrows :size="16" />
        </button>
      </div>

      <div class="absolute inset-x-2 bottom-2 z-10 flex gap-1.5 opacity-100 xs:inset-x-3 xs:bottom-3 xs:gap-2 max-sm:pointer-events-auto sm:opacity-0 sm:translate-y-2 sm:pointer-events-none sm:group-hover:pointer-events-auto sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-300 ease-out">
        <button type="button" class="btn-primary min-w-0 flex-1 !px-2 !py-2 !text-[11px] xs:!py-2.5 xs:!text-xs sm:!text-sm" @click.stop="onAdd($event)">
          Add to Cart
        </button>
        <button type="button" class="btn-ghost min-w-0 flex-1 !bg-white/95 !px-2 !py-2 !text-[11px] xs:!py-2.5 xs:!text-xs sm:!text-sm" @click.stop="onQuote">
          Quote
        </button>
      </div>
    </div>

    <div class="flex flex-1 flex-col p-3 xs:p-4 sm:p-5" :class="list ? 'justify-center' : ''">
      <p class="text-[10px] uppercase tracking-[0.18em] text-text-muted xs:text-[11px]">{{ product.brand }}</p>
      <NuxtLink :to="`/product/${product.slug}`" class="mt-1.5">
        <h3 class="font-playfair text-base leading-snug text-text transition-colors hover:text-accent line-clamp-2 xs:text-lg sm:text-xl">
          {{ product.name }}
        </h3>
      </NuxtLink>

      <div class="mt-2 flex items-center gap-1.5 xs:mt-2.5 xs:gap-2">
        <div class="flex shrink-0 items-center gap-0.5 text-accent">
          <Star
            v-for="n in 5"
            :key="n"
            :size="12"
            :fill="n <= Math.round(product.rating) ? 'currentColor' : 'none'"
            :class="n <= Math.round(product.rating) ? '' : 'text-border'"
          />
        </div>
        <span class="truncate text-[11px] text-text-muted xs:text-xs sm:text-sm">
          {{ product.rating }}
          <span class="hidden text-text-muted/80 xs:inline">({{ product.reviewCount }})</span>
        </span>
      </div>

      <div class="mt-auto pt-3">
        <div class="flex flex-wrap items-baseline gap-2">
          <span class="text-base font-semibold text-text xs:text-lg sm:text-xl">{{ formatPrice(product.price) }}</span>
          <span v-if="product.oldPrice" class="text-xs text-text-muted line-through xs:text-sm">
            {{ formatPrice(product.oldPrice) }}
          </span>
        </div>
        <p v-if="savings" class="mt-1 text-[11px] font-medium text-accent xs:text-xs sm:text-sm">{{ savings }}</p>

        <p v-if="list" class="mt-3 line-clamp-2 text-sm text-text-muted">{{ product.description }}</p>

        <div class="mt-3 flex items-center gap-1.5 xs:mt-3.5">
          <span
            v-for="color in product.colors.slice(0, 4)"
            :key="color.name"
            class="h-3.5 w-3.5 rounded-full border border-border ring-offset-1 transition group-hover:ring-1 group-hover:ring-accent/40 xs:h-4 xs:w-4"
            :style="{ backgroundColor: color.hex }"
            :title="color.name"
          />
        </div>
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
const secondaryImage = computed(() => props.product.hoverImage || props.product.images[1] || null)
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
    bestseller: 'bg-accent text-white',
    new: 'bg-[#2D6A4F] text-white',
    sale: 'bg-[#9B2226] text-white',
    limited: 'bg-[#7C3AED] text-white',
    trending: 'bg-[#0EA5E9] text-white',
    exclusive: 'bg-[#111111] text-accent',
  }
  return map[badge]
}
</script>
