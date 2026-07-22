<template>
  <section id="trust" class="border-b border-border bg-white py-10 lg:py-12">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
        <div
          v-for="(item, i) in items"
          :key="item.title"
          class="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-start sm:text-left card-reveal"
          :style="{ animationDelay: `${i * 0.08}s` }"
          data-animate="fade-up"
          :data-delay="String(i * 0.06)"
        >
          <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent transition-transform duration-300 hover:scale-110">
            <component :is="item.icon" :size="20" />
          </div>
          <div>
            <h3 class="font-playfair text-base tracking-wide text-text sm:text-lg">
              {{ item.title }}
            </h3>
            <p class="mt-1 text-xs leading-relaxed text-text-muted sm:text-[13px]">
              {{ item.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Award, CreditCard, RotateCcw, ShieldCheck, Truck } from 'lucide-vue-next'

const items = [
  {
    title: 'Free Shipping',
    text: 'Complimentary delivery on qualifying orders.',
    icon: Truck,
  },
  {
    title: 'Secure Payment',
    text: 'Encrypted checkout with trusted gateways.',
    icon: CreditCard,
  },
  {
    title: 'Easy Returns',
    text: 'Hassle-free returns within the policy window.',
    icon: RotateCcw,
  },
  {
    title: 'Warranty',
    text: 'Manufacturer-backed warranty on every piece.',
    icon: ShieldCheck,
  },
  {
    title: 'Premium Quality',
    text: 'Hand-finished materials and lasting craft.',
    icon: Award,
  },
]
</script>
