<template>
  <section class="border-b border-border bg-white py-14 lg:py-16">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="grid gap-8 md:grid-cols-3 md:gap-10 lg:gap-14">
        <div
          v-for="(item, i) in items"
          :key="item.title"
          class="flex gap-4 sm:gap-5"
          data-animate="fade-up"
          :data-delay="String(i * 0.08)"
        >
          <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent sm:h-14 sm:w-14">
            <component :is="item.icon" :size="22" />
          </div>
          <div>
            <h3 class="font-playfair text-xl tracking-wide text-text sm:text-2xl">
              {{ item.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-text-muted">
              {{ item.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Award, ShieldCheck, Truck } from 'lucide-vue-next'

const items = [
  {
    title: 'High Quality',
    text: 'High quality refers to exceptional standards of performance, precision, and excellence, ensuring reliability, durability, and superior user satisfaction.',
    icon: Award,
  },
  {
    title: 'Fast Delivery',
    text: 'We ensure fast delivery with speed, reliability, and uncompromised quality.',
    icon: Truck,
  },
  {
    title: 'Best Warranty',
    text: 'We offer the best quality backed by the best warranty for your peace of mind.',
    icon: ShieldCheck,
  },
]
</script>
