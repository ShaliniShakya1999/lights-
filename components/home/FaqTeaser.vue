<template>
  <section class="border-y border-border bg-background py-20 lg:py-24">
    <div class="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-10">
      <div class="text-center" data-animate="fade-up">
        <p class="section-label">FAQ</p>
        <h2 class="mt-3 font-playfair text-4xl sm:text-5xl">Questions, Answered</h2>
        <p class="mt-4 text-sm text-text-muted sm:text-base">
          Quick answers before you shop — or explore our full FAQ.
        </p>
      </div>

      <div class="mt-10 space-y-3" data-animate="fade-up" data-delay="0.1">
        <details
          v-for="item in faqs"
          :key="item.q"
          class="group rounded-2xl border border-border bg-white px-5 py-4 transition-colors open:border-accent/40"
        >
          <summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-text">
            <span class="text-sm sm:text-base">{{ item.q }}</span>
            <span class="text-accent transition-transform duration-300 group-open:rotate-45 text-xl leading-none">+</span>
          </summary>
          <p class="mt-3 text-sm leading-relaxed text-text-muted">{{ item.a }}</p>
        </details>
      </div>

      <div class="mt-8 text-center" data-animate="fade-up" data-delay="0.15">
        <NuxtLink to="/faqs" class="btn-ghost">View All FAQs</NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const faqs = [
  {
    q: 'Do you offer free shipping?',
    a: 'Yes — complimentary shipping applies on qualifying orders across major cities. Installation packages can be added at checkout.',
  },
  {
    q: 'Can I return a lighting fixture?',
    a: 'Unused products in original packaging can be returned within our returns window. Custom and made-to-order pieces are non-returnable.',
  },
  {
    q: 'Do you help with installation?',
    a: 'Most fixtures include an installation guide. For chandeliers and complex installs, our concierge can arrange certified electricians.',
  },
  {
    q: 'What warranty do products carry?',
    a: 'Every DINMANS piece includes manufacturer-backed warranty coverage. Details are listed on each product page.',
  },
]
</script>
