<template>
  <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pb-20">
    <ShopBreadcrumb :items="breadcrumbs" />

    <div class="mt-2 mb-10" data-animate="fade-up">
      <p class="section-label">Your selection</p>
      <h1 class="mt-3 heading-section-sm lg:text-5xl">Shopping Cart</h1>
      <p class="mt-3 max-w-xl text-text-muted">
        Review your lighting pieces before checkout. White-glove delivery available on eligible orders.
      </p>
    </div>

    <div v-if="cart.lines.value.length" class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_400px] lg:gap-14">
      <div class="space-y-4" data-animate="fade-up">
        <article
          v-for="(line, index) in cart.lines.value"
          :key="`${line.productId}-${line.color}-${line.size}`"
          class="flex flex-col gap-4 rounded-3xl border border-border bg-white p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-5"
          :style="{ animationDelay: `${index * 60}ms` }"
        >
          <NuxtLink
            :to="`/product/${line.product.slug}`"
            class="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#F7F5F2] sm:h-28 sm:w-28 sm:shrink-0"
          >
            <img
              :src="line.product.images[0]"
              :alt="line.product.name"
              class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            >
          </NuxtLink>

          <div class="min-w-0 flex-1">
            <p class="text-xs uppercase tracking-[0.18em] text-text-muted">{{ line.product.brand }}</p>
            <NuxtLink
              :to="`/product/${line.product.slug}`"
              class="mt-1 block font-playfair text-xl leading-snug text-text transition-colors hover:text-accent"
            >
              {{ line.product.name }}
            </NuxtLink>
            <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-muted">
              <span v-if="line.color">Color: {{ line.color }}</span>
              <span v-if="line.size">Size: {{ line.size }}</span>
              <span>SKU: {{ line.product.sku }}</span>
            </div>
            <p class="mt-3 text-lg font-medium">{{ formatPrice(line.product.price) }}</p>
          </div>

          <div class="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
            <div class="flex items-center rounded-full border border-border bg-white">
              <button
                type="button"
                class="flex h-10 w-10 items-center justify-center text-text-muted transition-colors hover:text-accent disabled:opacity-40"
                :disabled="line.qty <= 1"
                aria-label="Decrease quantity"
                @click="cart.setQty(line.productId, line.qty - 1, { color: line.color, size: line.size })"
              >
                <Minus :size="15" />
              </button>
              <span class="min-w-8 text-center text-sm font-medium">{{ line.qty }}</span>
              <button
                type="button"
                class="flex h-10 w-10 items-center justify-center text-text-muted transition-colors hover:text-accent"
                aria-label="Increase quantity"
                @click="cart.setQty(line.productId, line.qty + 1, { color: line.color, size: line.size })"
              >
                <Plus :size="15" />
              </button>
            </div>

            <div class="text-right">
              <p class="text-sm font-medium">{{ formatPrice(line.lineTotal) }}</p>
              <button
                type="button"
                class="mt-2 inline-flex items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-[#9B2226]"
                @click="cart.remove(line.productId, { color: line.color, size: line.size })"
              >
                <Trash2 :size="13" />
                Remove
              </button>
            </div>
          </div>
        </article>
      </div>

      <aside class="h-fit rounded-3xl border border-border bg-white p-6 lg:sticky lg:top-28" data-animate="fade-left" data-delay="0.1">
        <h2 class="font-playfair text-2xl">Order Summary</h2>
        <dl class="mt-6 space-y-3 text-sm">
          <div class="flex justify-between gap-4">
            <dt class="text-text-muted">Subtotal ({{ cart.count.value }} items)</dt>
            <dd class="font-medium">{{ formatPrice(cart.subtotal.value) }}</dd>
          </div>
          <div class="flex justify-between gap-4">
            <dt class="text-text-muted">Shipping</dt>
            <dd class="font-medium">
              {{ cart.shipping.value === 0 ? 'Complimentary' : formatPrice(cart.shipping.value) }}
            </dd>
          </div>
          <p v-if="cart.shipping.value > 0" class="text-xs text-text-muted">
            Free white-glove shipping on orders above {{ formatPrice(50000) }}.
          </p>
          <div class="flex justify-between gap-4 border-t border-border pt-4 text-base">
            <dt class="font-medium">Total</dt>
            <dd class="font-medium">{{ formatPrice(cart.total.value) }}</dd>
          </div>
        </dl>

        <NuxtLink to="/checkout" class="btn-primary mt-8 w-full">
          Proceed to Checkout
        </NuxtLink>
        <NuxtLink to="/lighting/chandeliers" class="btn-ghost mt-3 w-full">
          Continue Shopping
        </NuxtLink>
      </aside>
    </div>

    <div v-else class="rounded-3xl border border-border bg-white px-6 py-20 text-center" data-animate="fade-up">
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent">
        <ShoppingBag :size="28" />
      </div>
      <h2 class="mt-6 font-playfair text-3xl">Your cart is empty</h2>
      <p class="mx-auto mt-3 max-w-md text-text-muted">
        Discover chandeliers, pendants, and statement lighting crafted for modern interiors.
      </p>
      <NuxtLink to="/lighting/chandeliers" class="btn-primary mt-8 inline-flex">
        Browse Collection
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-vue-next'
import { formatPrice } from '~/composables/useProducts'

definePageMeta({ layout: 'website' })

const cart = useCart()

const breadcrumbs = [
  { label: 'Home', to: '/' },
  { label: 'Cart' },
]

useSeoMeta({
  title: 'Shopping Cart | DINMANS',
  description: 'Review your selected luxury lighting pieces and proceed to checkout.',
})
</script>
