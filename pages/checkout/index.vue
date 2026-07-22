<template>
  <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pb-20">
    <ShopBreadcrumb :items="breadcrumbs" />

    <div class="mt-2 mb-10" data-animate="fade-up">
      <p class="section-label">Almost there</p>
      <h1 class="mt-3 heading-section-sm lg:text-5xl">Checkout</h1>
      <p class="mt-3 max-w-xl text-text-muted">
        Enter delivery details to complete your luxury lighting order.
      </p>
    </div>

    <div v-if="placed" class="rounded-3xl border border-border bg-white px-6 py-20 text-center" data-animate="fade-up">
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent">
        <Check :size="28" />
      </div>
      <h2 class="mt-6 font-playfair text-3xl">Order placed</h2>
      <p class="mx-auto mt-3 max-w-md text-text-muted">
        Thank you. Our concierge team will confirm delivery within 24 hours.
      </p>
      <p class="mt-4 text-sm font-medium text-text">Order ID: {{ orderId }}</p>
      <NuxtLink to="/lighting/chandeliers" class="btn-primary mt-8 inline-flex">
        Continue Shopping
      </NuxtLink>
    </div>

    <div
      v-else-if="cart.lines.value.length"
      class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1.1fr)_400px] lg:gap-14"
    >
      <form class="space-y-8" data-animate="fade-up" @submit.prevent="placeOrder">
        <section class="rounded-3xl border border-border bg-white p-6 sm:p-8">
          <h2 class="font-playfair text-2xl">Contact</h2>
          <div class="mt-6 grid gap-4 sm:grid-cols-2">
            <label class="block sm:col-span-2">
              <span class="mb-2 block text-sm font-medium">Full name</span>
              <input v-model="form.name" type="text" required class="input-luxury" placeholder="Your name">
            </label>
            <label class="block">
              <span class="mb-2 block text-sm font-medium">Phone</span>
              <input v-model="form.phone" type="tel" required class="input-luxury" placeholder="10-digit mobile">
            </label>
            <label class="block">
              <span class="mb-2 block text-sm font-medium">Email</span>
              <input v-model="form.email" type="email" required class="input-luxury" placeholder="you@example.com">
            </label>
          </div>
        </section>

        <section class="rounded-3xl border border-border bg-white p-6 sm:p-8">
          <h2 class="font-playfair text-2xl">Delivery address</h2>
          <div class="mt-6 grid gap-4 sm:grid-cols-2">
            <label class="block sm:col-span-2">
              <span class="mb-2 block text-sm font-medium">Address</span>
              <textarea
                v-model="form.address"
                required
                rows="3"
                class="input-luxury resize-none"
                placeholder="House / flat, street, landmark"
              />
            </label>
            <label class="block">
              <span class="mb-2 block text-sm font-medium">City</span>
              <input v-model="form.city" type="text" required class="input-luxury" placeholder="City">
            </label>
            <label class="block">
              <span class="mb-2 block text-sm font-medium">Pincode</span>
              <input v-model="form.pincode" type="text" required class="input-luxury" placeholder="6-digit pincode">
            </label>
            <label class="block sm:col-span-2">
              <span class="mb-2 block text-sm font-medium">State</span>
              <input v-model="form.state" type="text" required class="input-luxury" placeholder="State">
            </label>
          </div>
        </section>

        <section class="rounded-3xl border border-border bg-white p-6 sm:p-8">
          <h2 class="font-playfair text-2xl">Payment</h2>
          <p class="mt-2 text-sm text-text-muted">Demo checkout — no real payment is processed.</p>
          <div class="mt-6 space-y-3">
            <label
              v-for="method in paymentMethods"
              :key="method.value"
              class="flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition-colors"
              :class="form.payment === method.value ? 'border-accent bg-accent-soft/40' : 'border-border hover:border-accent/40'"
            >
              <input v-model="form.payment" type="radio" :value="method.value" class="accent-[#E4823B]">
              <span class="text-sm font-medium">{{ method.label }}</span>
            </label>
          </div>
        </section>

        <button type="submit" class="btn-primary w-full sm:w-auto" :disabled="submitting">
          {{ submitting ? 'Placing order…' : `Place Order · ${formatPrice(cart.total.value)}` }}
        </button>
      </form>

      <aside class="h-fit rounded-3xl border border-border bg-white p-6 lg:sticky lg:top-28" data-animate="fade-left" data-delay="0.1">
        <h2 class="font-playfair text-2xl">Your order</h2>
        <ul class="mt-6 space-y-4">
          <li
            v-for="line in cart.lines.value"
            :key="`${line.productId}-${line.color}-${line.size}`"
            class="flex gap-3"
          >
            <img
              :src="line.product.images[0]"
              :alt="line.product.name"
              class="h-16 w-16 rounded-xl object-cover"
            >
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium">{{ line.product.name }}</p>
              <p class="mt-0.5 text-xs text-text-muted">Qty {{ line.qty }}</p>
              <p class="mt-1 text-sm">{{ formatPrice(line.lineTotal) }}</p>
            </div>
          </li>
        </ul>

        <dl class="mt-6 space-y-3 border-t border-border pt-5 text-sm">
          <div class="flex justify-between gap-4">
            <dt class="text-text-muted">Subtotal</dt>
            <dd class="font-medium">{{ formatPrice(cart.subtotal.value) }}</dd>
          </div>
          <div class="flex justify-between gap-4">
            <dt class="text-text-muted">Shipping</dt>
            <dd class="font-medium">
              {{ cart.shipping.value === 0 ? 'Complimentary' : formatPrice(cart.shipping.value) }}
            </dd>
          </div>
          <div class="flex justify-between gap-4 border-t border-border pt-4 text-base">
            <dt class="font-medium">Total</dt>
            <dd class="font-medium">{{ formatPrice(cart.total.value) }}</dd>
          </div>
        </dl>

        <NuxtLink to="/cart" class="btn-ghost mt-6 w-full">
          Back to Cart
        </NuxtLink>
      </aside>
    </div>

    <div v-else class="rounded-3xl border border-border bg-white px-6 py-20 text-center" data-animate="fade-up">
      <h2 class="font-playfair text-3xl">Nothing to checkout</h2>
      <p class="mx-auto mt-3 max-w-md text-text-muted">
        Add a lighting piece to your cart before placing an order.
      </p>
      <NuxtLink to="/lighting/chandeliers" class="btn-primary mt-8 inline-flex">
        Browse Collection
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import { formatPrice } from '~/composables/useProducts'

definePageMeta({ layout: 'website' })

const cart = useCart()

const placed = ref(false)
const submitting = ref(false)
const orderId = ref('')

const form = reactive({
  name: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  pincode: '',
  state: '',
  payment: 'cod',
})

const paymentMethods = [
  { value: 'cod', label: 'Cash on Delivery' },
  { value: 'upi', label: 'UPI' },
  { value: 'card', label: 'Credit / Debit Card' },
]

const breadcrumbs = [
  { label: 'Home', to: '/' },
  { label: 'Cart', to: '/cart' },
  { label: 'Checkout' },
]

async function placeOrder() {
  if (!cart.lines.value.length || submitting.value) return
  submitting.value = true
  await new Promise(resolve => setTimeout(resolve, 700))
  orderId.value = `LP-${Date.now().toString().slice(-8)}`
  cart.clear()
  placed.value = true
  submitting.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

useSeoMeta({
  title: 'Checkout | DINMANS',
  description: 'Complete your DINMANS luxury lighting order with secure demo checkout.',
})
</script>
