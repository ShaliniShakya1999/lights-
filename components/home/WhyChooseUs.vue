<template>
  <section class="bg-background py-20 lg:py-24">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="mx-auto max-w-2xl text-center" data-animate="fade-up">
        <p class="section-label">Why Choose Us</p>
        <h2 class="mt-3 font-playfair text-4xl sm:text-5xl">The DINMANS Promise</h2>
        <p class="mt-4 text-sm text-text-muted sm:text-base">
          Premium quality, thoughtful service, and lighting that lasts.
        </p>
      </div>

      <div
        ref="statsRef"
        class="mt-12 grid grid-cols-2 gap-6 rounded-luxury border border-border bg-white px-6 py-10 sm:grid-cols-4 lg:px-12"
        data-animate="fade-up"
      >
        <div v-for="stat in stats" :key="stat.label" class="text-center">
          <p class="font-playfair text-3xl text-accent sm:text-4xl">
            {{ stat.prefix }}{{ animated[stat.key] }}{{ stat.suffix }}
          </p>
          <p class="mt-2 text-[11px] uppercase tracking-[0.2em] text-text-muted">{{ stat.label }}</p>
        </div>
      </div>

      <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6" data-stagger-grid>
        <div
          v-for="(item, i) in items"
          :key="item.title"
          class="rounded-luxury border border-border bg-white p-6 text-center transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-luxury card-reveal"
          :style="{ animationDelay: `${i * 0.07}s` }"
          data-animate-child
        >
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent transition-transform duration-300 hover:scale-110">
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

const stats = [
  { key: 'products', label: 'Products', target: 500, prefix: '', suffix: '+' },
  { key: 'homes', label: 'Homes Lit', target: 12000, prefix: '', suffix: '+' },
  { key: 'years', label: 'Years', target: 15, prefix: '', suffix: '+' },
  { key: 'cities', label: 'Cities', target: 40, prefix: '', suffix: '+' },
] as const

const animated = reactive({
  products: 0,
  homes: 0,
  years: 0,
  cities: 0,
})

const statsRef = ref<HTMLElement | null>(null)
let started = false

function animateCount(key: keyof typeof animated, target: number) {
  const duration = 1400
  const start = performance.now()
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration)
    const eased = 1 - (1 - t) ** 3
    animated[key] = Math.round(target * eased)
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  const el = statsRef.value
  if (!el) return
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries[0]?.isIntersecting || started) return
      started = true
      for (const s of stats) animateCount(s.key, s.target)
      io.disconnect()
    },
    { threshold: 0.35 },
  )
  io.observe(el)
  onUnmounted(() => io.disconnect())
})
</script>
