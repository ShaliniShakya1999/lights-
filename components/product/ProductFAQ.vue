<template>
  <section class="space-y-8">
    <div>
      <p class="section-label">Need Clarity</p>
      <h2 class="mt-2 heading-section-sm">Frequently Asked Questions</h2>
    </div>

    <div class="space-y-3">
      <div
        v-for="(faq, i) in faqs"
        :key="faq.question"
        class="luxury-card overflow-hidden"
      >
        <button
          type="button"
          class="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
          @click="open = open === i ? null : i"
        >
          <span class="font-medium text-text pr-4">{{ faq.question }}</span>
          <ChevronDown
            :size="18"
            class="shrink-0 text-text-muted transition-transform duration-luxury"
            :class="open === i ? 'rotate-180 text-accent' : ''"
          />
        </button>
        <div
          v-show="open === i"
          class="border-t border-border px-6 pb-5 pt-4"
        >
          <p class="text-sm leading-relaxed text-text-muted">{{ faq.answer }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
import type { ProductFAQ } from '~/types/product'

defineProps<{
  faqs: ProductFAQ[]
}>()

const open = ref<number | null>(0)
</script>
