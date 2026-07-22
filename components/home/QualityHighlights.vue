<template>
  <section id="trust" class="border-b border-border bg-white py-8 lg:py-10">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-4">
        <div
          v-for="(item, i) in items"
          :key="item.title"
          class="flex items-center gap-3 sm:gap-4 card-reveal"
          :style="{ animationDelay: `${i * 0.08}s` }"
          data-animate="fade-up"
          :data-delay="String(i * 0.06)"
        >
          <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent transition-transform duration-300 hover:scale-110 sm:h-14 sm:w-14">
            <component :is="item.icon" :size="22" />
          </div>
          <div>
            <h3 class="font-playfair text-lg tracking-wide text-text sm:text-xl">
              {{ item.title }}
            </h3>
            <p class="mt-0.5 text-xs leading-relaxed text-text-muted sm:text-sm">
              {{ item.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CreditCard, RotateCcw, ShieldCheck, Truck } from 'lucide-vue-next'

const items = [
  {
    title: 'Free Shipping',
    text: 'On qualifying orders',
    icon: Truck,
  },
  {
    title: 'Secure Payment',
    text: 'Encrypted checkout',
    icon: CreditCard,
  },
  {
    title: 'Warranty',
    text: 'Manufacturer backed',
    icon: ShieldCheck,
  },
  {
    title: 'Easy Returns',
    text: 'Hassle-free policy',
    icon: RotateCcw,
  },
]
</script>
