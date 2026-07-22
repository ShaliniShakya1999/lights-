<template>
  <section class="rounded-luxury border border-border bg-white overflow-hidden shadow-soft">
    <div class="flex overflow-x-auto border-b border-border scrollbar-thin">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        class="shrink-0 px-4 py-3.5 text-xs font-medium transition-all duration-luxury border-b-2 -mb-px min-h-11 sm:px-6 sm:py-4 sm:text-sm"
        :class="active === tab.id
          ? 'border-accent text-accent'
          : 'border-transparent text-text-muted hover:text-text'"
        @click="active = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="p-4 xs:p-6 sm:p-8 lg:p-10">
      <div v-if="active === 'description'" class="max-w-3xl space-y-6 animate-[fadeIn_0.35s_ease]">
        <p class="text-base leading-relaxed text-text-muted">{{ product.description }}</p>
        <ul class="space-y-3">
          <li
            v-for="item in product.highlights"
            :key="item"
            class="flex items-start gap-3 text-sm text-text"
          >
            <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {{ item }}
          </li>
        </ul>
      </div>

      <div v-else-if="active === 'specs'" class="animate-[fadeIn_0.35s_ease]">
        <div class="grid gap-0 sm:grid-cols-2">
          <div
            v-for="(spec, i) in product.specs"
            :key="spec.label"
            class="flex items-center justify-between gap-4 border-b border-border px-1 py-4"
            :class="i % 2 === 0 ? 'sm:pr-8' : 'sm:pl-8'"
          >
            <span class="text-sm text-text-muted">{{ spec.label }}</span>
            <span class="text-sm font-medium text-right">{{ spec.value }}</span>
          </div>
        </div>
      </div>

      <div v-else-if="active === 'installation'" class="max-w-3xl animate-[fadeIn_0.35s_ease] space-y-4">
        <p class="text-base leading-relaxed text-text-muted">{{ product.installation }}</p>
        <div class="rounded-2xl bg-accent-soft/60 border border-accent/15 p-5">
          <p class="text-sm font-medium text-text">Concierge Installation</p>
          <p class="mt-2 text-sm text-text-muted leading-relaxed">
            Book a certified electrician through DINMANS Concierge. Available in Mumbai, Bangalore, and Delhi NCR within 48 hours of delivery.
          </p>
        </div>
      </div>

      <div v-else class="max-w-3xl animate-[fadeIn_0.35s_ease] space-y-4">
        <div class="flex gap-4 rounded-2xl border border-border p-5">
          <Shield :size="22" class="shrink-0 text-accent" />
          <div>
            <p class="font-medium">{{ product.warranty }}</p>
            <p class="mt-1 text-sm text-text-muted">Covers manufacturing defects and electrical components. Register your product within 30 days of purchase.</p>
          </div>
        </div>
        <div class="flex gap-4 rounded-2xl border border-border p-5">
          <RefreshCw :size="22" class="shrink-0 text-accent" />
          <div>
            <p class="font-medium">{{ product.returnPolicy }}</p>
            <p class="mt-1 text-sm text-text-muted">Items must be unused and in original packaging. Custom finishes are final sale.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RefreshCw, Shield } from 'lucide-vue-next'
import type { Product } from '~/types/product'

defineProps<{
  product: Product
}>()

const tabs = [
  { id: 'description', label: 'Description' },
  { id: 'specs', label: 'Technical Specs' },
  { id: 'installation', label: 'Installation Guide' },
  { id: 'policy', label: 'Warranty & Returns' },
] as const

const active = ref<(typeof tabs)[number]['id']>('description')
</script>
