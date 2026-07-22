<template>
  <section id="trust" class="border-b border-border bg-white py-5 sm:py-6 lg:py-7">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="grid grid-cols-2 gap-3 xs:gap-4 md:grid-cols-4 md:gap-6">
        <div
          v-for="(item, i) in items"
          :key="item.title"
          class="flex min-w-0 items-center justify-start gap-2 xs:gap-2.5 sm:justify-start sm:gap-3 card-reveal"
          :style="{ animationDelay: `${i * 0.06}s` }"
          data-animate="fade-up"
          :data-delay="String(i * 0.05)"
        >
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent transition-transform duration-300 hover:scale-110 xs:h-10 xs:w-10">
            <component :is="item.icon" :size="18" />
          </div>
          <p class="min-w-0 text-[11px] font-semibold leading-snug tracking-wide text-text xs:text-sm sm:text-[15px]">
            {{ item.title }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CreditCard, RotateCcw, ShieldCheck, Truck } from 'lucide-vue-next'

const items = [
  { title: 'Free Shipping', icon: Truck },
  { title: '2 Year Warranty', icon: ShieldCheck },
  { title: 'Easy Returns', icon: RotateCcw },
  { title: 'Secure Payment', icon: CreditCard },
]
</script>
