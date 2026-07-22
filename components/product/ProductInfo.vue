<template>
  <div class="flex flex-col">
    <p class="text-xs uppercase tracking-[0.22em] text-text-muted">{{ product.brand }}</p>
    <h1 class="mt-3 font-playfair text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight text-balance">
      {{ product.name }}
    </h1>

    <div class="mt-4 flex flex-wrap items-center gap-3">
      <div class="flex items-center gap-1 text-accent">
        <Star
          v-for="n in 5"
          :key="n"
          :size="14"
          :fill="n <= Math.round(product.rating) ? 'currentColor' : 'none'"
          :class="n <= Math.round(product.rating) ? '' : 'text-border'"
        />
      </div>
      <span class="text-sm text-text">{{ product.rating }}</span>
      <a href="#reviews" class="text-sm text-text-muted underline-offset-2 hover:text-accent hover:underline">
        {{ product.reviewCount }} Reviews
      </a>
      <span class="text-border">|</span>
      <span class="text-sm text-text-muted">SKU: {{ product.sku }}</span>
    </div>

    <div class="mt-6 flex flex-wrap items-baseline gap-3">
      <span class="text-3xl font-medium text-text">{{ formatPrice(product.price) }}</span>
      <span v-if="product.oldPrice" class="text-lg text-text-muted line-through">
        {{ formatPrice(product.oldPrice) }}
      </span>
      <span v-if="discount" class="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
        {{ discount }}% OFF
      </span>
    </div>
    <p v-if="savings" class="mt-2 text-sm text-accent font-medium">{{ savings }}</p>
    <p class="mt-2 text-sm text-text-muted">
      EMI from <span class="text-text font-medium">{{ formatPrice(product.emiFrom) }}/mo</span>
      · No-cost EMI available
    </p>

    <div class="mt-8 space-y-6 border-t border-border pt-8">
      <!-- Colors -->
      <div>
        <p class="text-sm font-medium text-text">
          Color: <span class="font-normal text-text-muted">{{ selectedColor }}</span>
        </p>
        <div class="mt-3 flex flex-wrap gap-3">
          <button
            v-for="color in product.colors"
            :key="color.name"
            type="button"
            class="h-9 w-9 rounded-full border-2 transition-all duration-luxury"
            :class="selectedColor === color.name ? 'border-accent scale-110' : 'border-border hover:border-accent/40'"
            :style="{ backgroundColor: color.hex }"
            :title="color.name"
            @click="selectedColor = color.name"
          />
        </div>
      </div>

      <!-- Sizes -->
      <div v-if="product.sizes?.length">
        <p class="text-sm font-medium text-text">Size</p>
        <div class="mt-3 flex flex-wrap gap-2">
          <button
            v-for="size in product.sizes"
            :key="size.value"
            type="button"
            class="rounded-full border px-4 py-2 text-sm transition-all duration-luxury"
            :class="selectedSize === size.value
              ? 'border-secondary bg-secondary text-white'
              : 'border-border text-text-muted hover:border-accent hover:text-accent'"
            @click="selectedSize = size.value"
          >
            {{ size.label }}
          </button>
        </div>
      </div>

      <!-- Specs chips -->
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div class="rounded-2xl border border-border bg-[#FAFAFA] px-4 py-3">
          <p class="text-[10px] uppercase tracking-wider text-text-muted">Material</p>
          <p class="mt-1 text-sm font-medium">{{ product.material }}</p>
        </div>
        <div class="rounded-2xl border border-border bg-[#FAFAFA] px-4 py-3">
          <p class="text-[10px] uppercase tracking-wider text-text-muted">Finish</p>
          <p class="mt-1 text-sm font-medium">{{ product.finish }}</p>
        </div>
        <div class="rounded-2xl border border-border bg-[#FAFAFA] px-4 py-3">
          <p class="text-[10px] uppercase tracking-wider text-text-muted">Bulb</p>
          <p class="mt-1 text-sm font-medium">{{ product.bulbType }}</p>
        </div>
        <div class="rounded-2xl border border-border bg-[#FAFAFA] px-4 py-3">
          <p class="text-[10px] uppercase tracking-wider text-text-muted">Wattage</p>
          <p class="mt-1 text-sm font-medium">{{ product.wattage }}</p>
        </div>
        <div class="rounded-2xl border border-border bg-[#FAFAFA] px-4 py-3 sm:col-span-2">
          <p class="text-[10px] uppercase tracking-wider text-text-muted">Light Color</p>
          <p class="mt-1 text-sm font-medium">{{ product.lightColor }}</p>
        </div>
      </div>

      <!-- Qty + actions -->
      <div class="flex flex-wrap items-center gap-4">
        <div class="flex items-center rounded-full border border-border bg-white">
          <button
            type="button"
            class="flex h-12 w-12 items-center justify-center text-text-muted transition-colors hover:text-accent disabled:opacity-40"
            :disabled="qty <= 1"
            aria-label="Decrease quantity"
            @click="qty--"
          >
            <Minus :size="16" />
          </button>
          <span class="min-w-10 text-center text-sm font-medium">{{ qty }}</span>
          <button
            type="button"
            class="flex h-12 w-12 items-center justify-center text-text-muted transition-colors hover:text-accent"
            aria-label="Increase quantity"
            @click="qty++"
          >
            <Plus :size="16" />
          </button>
        </div>

        <button type="button" class="btn-primary flex-1 min-w-[140px]" :disabled="!product.inStock" @click="$emit('addToCart')">
          <ShoppingBag :size="16" />
          Add to Cart
        </button>
        <button type="button" class="btn-secondary flex-1 min-w-[140px]" :disabled="!product.inStock" @click="$emit('buyNow')">
          Buy Now
        </button>
      </div>

      <div class="flex gap-3">
        <button
          type="button"
          class="btn-ghost flex-1"
          :class="{ '!border-accent !text-accent animate-heart-pop': wishlisted }"
          @click="wishlist.toggle(product.id)"
        >
          <Heart :size="16" :fill="wishlisted ? 'currentColor' : 'none'" />
          Wishlist
        </button>
        <button
          type="button"
          class="btn-ghost flex-1"
          :class="{ '!border-accent !text-accent': compared }"
          @click="compare.toggle(product.id)"
        >
          <GitCompareArrows :size="16" />
          Compare
        </button>
      </div>

      <p
        class="text-sm font-medium"
        :class="product.inStock ? 'text-[#2D6A4F]' : 'text-[#9B2226]'"
      >
        {{ product.inStock ? `In Stock · ${product.stockCount} available` : 'Currently Out of Stock' }}
      </p>
    </div>

    <!-- Trust / delivery -->
    <div class="mt-8 grid gap-3 sm:grid-cols-2">
      <div class="flex gap-3 rounded-2xl border border-border p-4">
        <Truck :size="20" class="shrink-0 text-accent mt-0.5" />
        <div>
          <p class="text-sm font-medium">Delivery</p>
          <p class="mt-1 text-xs text-text-muted leading-relaxed">White-glove delivery in {{ product.deliveryDays }}</p>
        </div>
      </div>
      <div class="flex gap-3 rounded-2xl border border-border p-4">
        <RefreshCw :size="20" class="shrink-0 text-accent mt-0.5" />
        <div>
          <p class="text-sm font-medium">Returns</p>
          <p class="mt-1 text-xs text-text-muted leading-relaxed">{{ product.returnPolicy }}</p>
        </div>
      </div>
      <div class="flex gap-3 rounded-2xl border border-border p-4">
        <Shield :size="20" class="shrink-0 text-accent mt-0.5" />
        <div>
          <p class="text-sm font-medium">Warranty</p>
          <p class="mt-1 text-xs text-text-muted leading-relaxed">{{ product.warranty }}</p>
        </div>
      </div>
      <div class="flex gap-3 rounded-2xl border border-border p-4">
        <Wrench :size="20" class="shrink-0 text-accent mt-0.5" />
        <div>
          <p class="text-sm font-medium">Installation</p>
          <p class="mt-1 text-xs text-text-muted leading-relaxed">{{ product.installation }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  GitCompareArrows,
  Heart,
  Minus,
  Plus,
  RefreshCw,
  Shield,
  ShoppingBag,
  Star,
  Truck,
  Wrench,
} from 'lucide-vue-next'
import type { Product } from '~/types/product'
import { formatPrice, formatSavings } from '~/composables/useProducts'

const props = defineProps<{
  product: Product
}>()

defineEmits<{
  addToCart: []
  buyNow: []
}>()

const wishlist = useWishlist()
const compare = useCompare()

const qty = defineModel<number>('qty', { default: 1 })
const selectedColor = ref(props.product.colors[0]?.name ?? '')
const selectedSize = ref(props.product.sizes?.[0]?.value ?? '')

const wishlisted = computed(() => wishlist.has(props.product.id))
const compared = computed(() => compare.has(props.product.id))
const savings = computed(() => formatSavings(props.product.price, props.product.oldPrice))
const discount = computed(() => {
  if (!props.product.oldPrice) return null
  return Math.round(((props.product.oldPrice - props.product.price) / props.product.oldPrice) * 100)
})
</script>
