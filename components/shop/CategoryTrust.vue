<template>
  <section class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" data-animate="fade-up">
    <div
      v-for="(item, i) in items"
      :key="item.title"
      class="flex items-start gap-3 rounded-2xl border border-border bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
      :data-delay="String(i * 0.05)"
    >
      <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
        <component :is="item.icon" :size="18" />
      </div>
      <div>
        <p class="text-sm font-medium text-text">{{ item.title }}</p>
        <p class="mt-1 text-xs leading-relaxed text-text-muted">{{ item.text }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Lock, RefreshCw, ShieldCheck, Truck, Wrench } from 'lucide-vue-next'

const items = [
  { title: 'Free Shipping', text: 'On eligible orders above ₹50,000', icon: Truck },
  { title: 'Easy Returns', text: 'Hassle-free returns within policy', icon: RefreshCw },
  { title: '2 Year Warranty', text: 'Manufacturing defect coverage', icon: ShieldCheck },
  { title: 'Secure Payment', text: 'Encrypted checkout experience', icon: Lock },
  { title: 'Expert Installation', text: 'Concierge fitting in major cities', icon: Wrench },
]
</script>
