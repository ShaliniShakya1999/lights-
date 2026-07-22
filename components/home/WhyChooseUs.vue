<template>
  <section class="py-20 lg:py-24 bg-background">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="mx-auto max-w-2xl text-center" data-animate="fade-up">
        <p class="section-label">Why Choose Us</p>
        <h2 class="mt-3 font-playfair text-4xl sm:text-5xl">The DINMANS Promise</h2>
        <p class="mt-4 text-sm text-text-muted sm:text-base">
          Premium quality, thoughtful service, and lighting that lasts.
        </p>
      </div>

      <div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6" data-stagger-grid>
        <div
          v-for="(item, i) in items"
          :key="item.title"
          class="rounded-luxury border border-border bg-white p-6 text-center transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxury hover:border-accent/30 card-reveal"
          :style="{ animationDelay: `${i * 0.07}s` }"
          data-animate-child
        >
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
            <component :is="item.icon" :size="22" />
          </div>
          <h3 class="mt-4 font-playfair text-lg">{{ item.title }}</h3>
          <p class="mt-2 text-xs leading-relaxed text-text-muted">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  Award,
  Headset,
  Lock,
  RefreshCw,
  ShieldCheck,
  Truck,
} from 'lucide-vue-next'

const items = [
  { title: 'Premium Quality', text: 'Hand-finished materials and lasting craft.', icon: Award },
  { title: 'Free Shipping', text: 'Complimentary delivery on eligible orders.', icon: Truck },
  { title: '2 Year Warranty', text: 'Coverage on manufacturing defects.', icon: ShieldCheck },
  { title: 'Easy Returns', text: 'Hassle-free returns within policy window.', icon: RefreshCw },
  { title: 'Secure Payments', text: 'Encrypted checkout you can trust.', icon: Lock },
  { title: 'Expert Support', text: 'Concierge help for design & install.', icon: Headset },
]
</script>
