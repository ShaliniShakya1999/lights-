<template>
  <section class="rounded-luxury border border-border bg-white p-8 sm:p-10 lg:p-12" data-animate="fade-up">
    <p class="section-label">Buying Guide</p>
    <h2 class="mt-3 font-playfair text-3xl sm:text-4xl">About {{ category }}</h2>
    <div class="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-text-muted sm:text-base">
      <p>{{ intro }}</p>
      <p>{{ guide }}</p>
    </div>

    <div class="mt-10 grid gap-8 lg:grid-cols-2">
      <div>
        <h3 class="font-playfair text-2xl">Installation Tips</h3>
        <ul class="mt-4 space-y-3 text-sm text-text-muted">
          <li v-for="tip in tips" :key="tip" class="flex gap-3">
            <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {{ tip }}
          </li>
        </ul>
      </div>
      <div>
        <h3 class="font-playfair text-2xl">FAQs</h3>
        <div class="mt-4 space-y-4">
          <details
            v-for="faq in faqs"
            :key="faq.q"
            class="group rounded-2xl border border-border px-4 py-3"
          >
            <summary class="cursor-pointer list-none text-sm font-medium text-text marker:content-none flex items-center justify-between gap-3">
              {{ faq.q }}
              <span class="text-accent transition-transform group-open:rotate-45">+</span>
            </summary>
            <p class="mt-3 text-sm leading-relaxed text-text-muted">{{ faq.a }}</p>
          </details>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  category: string
}>()

const intro = computed(() =>
  `Discover our curated ${props.category.toLowerCase()} collection — designed for modern homes, hotels, and refined interiors that deserve exceptional light.`,
)

const guide = computed(() =>
  `When choosing ${props.category.toLowerCase()}, consider ceiling height, room proportion, finish harmony, and bulb temperature. Warm white (2700–3000K) creates inviting living spaces; cooler tones suit kitchens and work areas.`,
)

const tips = [
  'Always switch off power before installation and use a certified electrician for ceiling fixtures.',
  'Confirm canopy size and junction-box load capacity before hanging heavier pieces.',
  'Use dimmable drivers/bulbs for layered ambiance in living and dining rooms.',
  'Allow clearance from fans, beams, and walkways — especially over dining tables.',
]

const faqs = [
  {
    q: `Are ${props.category.toLowerCase()} hardwired?`,
    a: 'Most ceiling and chandelier fixtures are hardwired. Product pages list installation requirements and whether professional fitting is recommended.',
  },
  {
    q: 'What warranty is included?',
    a: 'DINMANS pieces typically include multi-year manufacturing warranty. LED drivers and electrical components follow the coverage noted on each product.',
  },
  {
    q: 'Can I return if the size feels wrong?',
    a: 'Unused products in original packaging can be returned within policy windows. Custom finishes may have different terms — check the product page.',
  },
]
</script>
