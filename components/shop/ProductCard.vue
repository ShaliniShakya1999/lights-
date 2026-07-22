<template>
  <article
    class="group flex h-full flex-col overflow-hidden rounded-luxury border border-border bg-card shadow-soft transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-luxury-hover card-reveal hover:scale-[1.01] md:hover:scale-100"
    :class="list ? 'sm:flex-row' : ''"
    data-animate-child
    :style="{ animationDelay: `${Math.min(index, 8) * 0.07}s` }"
  >
    <!-- Image -->
    <div
      class="relative overflow-hidden bg-[#F7F5F1] md:bg-white"
      :class="list ? 'aspect-square w-full shrink-0 sm:w-56 lg:w-64' : 'aspect-[4/5]'"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      <NuxtLink :to="`/product/${product.slug}`" class="block h-full w-full" tabindex="-1">
        <img
          :src="product.images[0]"
          :alt="product.name"
          class="h-full w-full object-cover object-center transition-transform duration-300 ease-out md:duration-700"
          :class="hovered && secondaryImage ? 'opacity-0 scale-[1.03]' : 'opacity-100 scale-100 group-hover:scale-[1.03]'"
          loading="lazy"
        >
        <img
          v-if="secondaryImage"
          :src="secondaryImage"
          :alt="`${product.name} alternate`"
          class="absolute inset-0 h-full w-full object-cover object-center transition-all duration-300 ease-out md:duration-700"
          :class="hovered ? 'opacity-100 scale-[1.03]' : 'opacity-0 scale-100'"
          loading="lazy"
        >
      </NuxtLink>

      <!-- Mobile badges: max 2 -->
      <div class="absolute left-3 top-3 z-10 flex flex-col gap-1.5 md:hidden">
        <span
          v-for="badge in mobileBadges"
          :key="`m-${badge}`"
          class="w-fit rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-soft"
          :class="badgeClass(badge)"
        >
          {{ badgeLabel(badge) }}
        </span>
      </div>

      <!-- Desktop/Tablet badges: original (badges + % off) -->
      <div class="absolute left-3 top-3 z-10 hidden max-w-[70%] flex-col gap-1.5 md:flex">
        <span
          v-for="badge in desktopBadges"
          :key="`d-${badge}`"
          class="w-fit rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider shadow-soft"
          :class="badgeClass(badge)"
        >
          {{ badgeLabel(badge) }}
        </span>
        <span
          v-if="discountPercent"
          class="w-fit rounded-full bg-[#9B2226] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-soft"
        >
          {{ discountPercent }}% Off
        </span>
      </div>

      <!-- Mobile: wishlist only -->
      <div class="absolute right-3 top-3 z-10 md:hidden">
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/70 text-text shadow-soft backdrop-blur-md transition-all hover:text-[#C45C6A]"
          :class="{ 'animate-heart-pop !text-[#C45C6A]': wishlisted }"
          :aria-label="wishlisted ? 'Remove wishlist' : 'Wishlist'"
          @click.stop="onWishlist"
        >
          <Heart :size="16" :fill="wishlisted ? 'currentColor' : 'none'" />
        </button>
      </div>

      <!-- Desktop/Tablet: wishlist + quick view + compare (hover fade) -->
      <div class="absolute right-3 top-3 z-10 hidden flex-col gap-2 opacity-0 translate-y-1 pointer-events-none transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 md:flex">
        <button
          type="button"
          class="icon-btn flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-luxury text-text hover:text-[#C45C6A]"
          :class="{ 'animate-heart-pop !text-[#C45C6A] !opacity-100': wishlisted }"
          :aria-label="wishlisted ? 'Remove wishlist' : 'Wishlist'"
          @click.stop="onWishlist"
        >
          <Heart :size="16" :fill="wishlisted ? 'currentColor' : 'none'" />
        </button>
        <button
          type="button"
          class="icon-btn flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-luxury text-text hover:text-accent"
          aria-label="Quick view"
          @click.stop="$emit('quickView', product)"
        >
          <Eye :size="16" />
        </button>
        <button
          type="button"
          class="icon-btn flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-luxury text-text hover:text-accent"
          :class="{ '!text-accent': compared }"
          aria-label="Compare"
          @click.stop="onCompare"
        >
          <GitCompareArrows :size="16" />
        </button>
      </div>

      <!-- Desktop/Tablet: Add to Cart + Quote on image (hover) -->
      <div class="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden bg-gradient-to-t from-black/45 via-black/15 to-transparent px-3 pb-3 pt-10 opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 md:block">
        <div class="flex gap-2">
          <button
            type="button"
            class="pointer-events-auto flex h-10 min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-full bg-accent px-3 text-xs font-semibold text-white shadow-gold transition-all hover:bg-accent-hover sm:text-sm"
            @click.stop="onAdd($event)"
          >
            Add to Cart
          </button>
          <button
            type="button"
            class="pointer-events-auto flex h-10 min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-full border border-border bg-white/95 px-3 text-xs font-medium text-text shadow-soft transition-all hover:border-accent hover:text-accent sm:text-sm"
            @click.stop="onBuy"
          >
            Buy
          </button>
        </div>
      </div>
    </div>

    <!-- Info -->
    <div
      class="flex flex-1 flex-col p-4 sm:p-5"
      :class="list ? 'justify-center' : ''"
    >
      <p class="text-[10px] font-medium uppercase tracking-[0.18em] text-text-muted md:tracking-[0.18em] md:text-[11px]">
        {{ product.brand }}
      </p>

      <NuxtLink :to="`/product/${product.slug}`" class="mt-1.5 block md:mt-1.5">
        <h3 class="font-playfair text-lg leading-snug text-text transition-colors line-clamp-2 hover:text-accent sm:text-xl">
          {{ product.name }}
        </h3>
      </NuxtLink>

      <div class="mt-2.5 flex items-center gap-2 whitespace-nowrap">
        <div class="flex shrink-0 items-center gap-0.5 text-accent" aria-hidden="true">
          <Star
            v-for="n in 5"
            :key="n"
            :size="12"
            :fill="n <= Math.round(product.rating) ? 'currentColor' : 'none'"
            :class="n <= Math.round(product.rating) ? '' : 'text-border'"
          />
        </div>
        <span class="text-xs text-text-muted sm:text-sm">
          {{ product.rating }}
          <span class="text-text-muted/80">({{ product.reviewCount }})</span>
        </span>
      </div>

      <!-- Mobile price + discount badge -->
      <div class="mt-3.5 flex flex-wrap items-center gap-2 md:hidden">
        <span class="text-lg font-semibold text-text">{{ formatPrice(product.price) }}</span>
        <span v-if="product.oldPrice" class="text-sm text-text-muted line-through">
          {{ formatPrice(product.oldPrice) }}
        </span>
        <span
          v-if="discountPercent"
          class="rounded-md bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent"
        >
          {{ discountPercent }}% OFF
        </span>
      </div>

      <!-- Desktop/Tablet price (original) -->
      <div class="mt-3 hidden flex-wrap items-baseline gap-2 md:flex">
        <span class="text-lg font-semibold text-text sm:text-xl">{{ formatPrice(product.price) }}</span>
        <span v-if="product.oldPrice" class="text-sm text-text-muted line-through">
          {{ formatPrice(product.oldPrice) }}
        </span>
      </div>
      <p v-if="savings" class="mt-1 hidden text-xs font-medium text-accent sm:text-sm md:block">
        {{ savings }}
      </p>

      <p v-if="list" class="mt-3 line-clamp-2 text-sm text-text-muted">
        {{ product.description }}
      </p>

      <div class="mt-3.5 flex items-center gap-1.5 md:mt-3.5">
        <span
          v-for="color in visibleColors"
          :key="color.name"
          class="h-4 w-4 rounded-full border border-border ring-offset-1 transition group-hover:ring-1 group-hover:ring-accent/40"
          :style="{ backgroundColor: color.hex }"
          :title="color.name"
        />
        <span
          v-if="extraColorCount > 0"
          class="text-[11px] font-medium text-text-muted md:hidden"
        >
          +{{ extraColorCount }}
        </span>
      </div>

      <!-- Mobile-only: actions below info -->
      <div class="mt-auto flex flex-col gap-2.5 pt-5 md:hidden">
        <button
          type="button"
          class="flex h-11 min-h-[44px] w-full items-center justify-center rounded-full bg-accent text-sm font-semibold text-white transition-all hover:bg-accent-hover"
          @click.stop="onAdd($event)"
        >
          Add to Cart
        </button>
        <button
          type="button"
          class="flex h-11 min-h-[44px] w-full items-center justify-center rounded-full border border-border bg-white text-sm font-medium text-text transition-all hover:border-accent hover:text-accent"
          @click.stop="onBuy"
        >
          Buy
        </button>
        <button
          type="button"
          class="flex h-11 min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-border bg-background text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
          @click.stop="$emit('quickView', product)"
        >
          <Eye :size="15" />
          Quick View
        </button>
      </div>

      <!-- Desktop spacing filler for equal height -->
      <div class="mt-auto hidden pt-1 md:block" />
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
  buy: [product: Product]
}>()

const wishlist = useWishlist()
const compare = useCompare()
const cart = useCart()
const router = useRouter()
const { ripple, pop } = useMotion()
const hovered = ref(false)

const wishlisted = computed(() => wishlist.has(props.product.id))
const compared = computed(() => compare.has(props.product.id))
const savings = computed(() => formatSavings(props.product.price, props.product.oldPrice))
const secondaryImage = computed(() => props.product.hoverImage || props.product.images[1] || null)

const discountPercent = computed(() => {
  if (!props.product.oldPrice || props.product.oldPrice <= props.product.price) return null
  return Math.round(((props.product.oldPrice - props.product.price) / props.product.oldPrice) * 100)
})

const badgePriority: ProductBadge[] = [
  'sale',
  'new',
  'bestseller',
  'exclusive',
  'luxury',
  'limited',
  'trending',
]

/** Mobile: max 2 badges */
const mobileBadges = computed(() => {
  const set = new Set(props.product.badges)
  return badgePriority.filter(b => set.has(b)).slice(0, 2)
})

/** Desktop: original — up to 2 badges (+ % off separately) */
const desktopBadges = computed(() => props.product.badges.slice(0, 2))

const visibleColors = computed(() => props.product.colors.slice(0, 4))
const extraColorCount = computed(() => Math.max(0, props.product.colors.length - 4))

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

function onBuy() {
  cart.add(props.product.id, 1)
  emit('buy', props.product)
  router.push('/checkout')
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
