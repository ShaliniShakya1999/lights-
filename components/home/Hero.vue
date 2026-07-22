<template>
  <section
    ref="sectionRef"
    class="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-secondary"
  >
    <div
      class="absolute inset-[-12%] will-change-transform"
      :style="{ transform: `translate3d(0, ${parallaxY}px, 0) scale(1.1)` }"
    >
      <div
        v-for="(slide, idx) in slides"
        :key="slide.image"
        class="absolute inset-0 transition-opacity duration-[1600ms] ease-out"
        :class="idx === activeIndex ? 'opacity-100' : 'opacity-0'"
      >
        <img
          :src="slide.image"
          :alt="slide.title"
          class="h-full w-full object-cover"
          :class="idx === activeIndex ? 'hero-kenburns' : ''"
        >
      </div>
    </div>

    <!-- Stronger premium overlay -->
    <div class="absolute inset-0 bg-black/40" />
    <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

    <div class="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center px-4 py-32 text-center sm:px-6 lg:px-10">
      <p
        class="section-label !text-accent tracking-[0.38em] hero-fade"
        style="animation-delay: 0.05s"
      >
        DINMANS Design Studio
      </p>
      <h1
        class="heading-hero mx-auto mt-7 max-w-5xl font-semibold text-white hero-fade"
        style="animation-delay: 0.15s"
      >
        Illuminate Every Corner with Luxury Lighting
      </h1>
      <p
        class="body-lead mx-auto mt-7 max-w-2xl !text-white/85 hero-fade"
        style="animation-delay: 0.28s"
      >
        Discover handcrafted chandeliers, pendant lights and designer lamps.
      </p>
      <div
        class="mt-11 flex flex-wrap items-center justify-center gap-4 hero-fade"
        style="animation-delay: 0.4s"
      >
        <NuxtLink
          to="/lighting/chandeliers"
          class="btn-primary hero-cta min-w-[190px] !px-11 !py-4 !text-base !font-bold"
          @click="ripple"
        >
          Shop Collection
        </NuxtLink>
        <NuxtLink
          to="/lighting/lamps"
          class="btn-secondary min-w-[180px] !border-2 !border-white/90 !px-10 !py-4 !text-base !text-white hover:!bg-white hover:!text-secondary"
          @click="ripple"
        >
          Explore Catalog
        </NuxtLink>
      </div>
    </div>

    <div class="absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-5 sm:bottom-10">
      <div class="flex gap-2">
        <button
          v-for="(_, idx) in slides"
          :key="idx"
          type="button"
          class="h-1.5 rounded-full transition-all duration-500"
          :class="idx === activeIndex ? 'w-8 bg-accent' : 'w-2.5 bg-white/40 hover:bg-white/70'"
          :aria-label="`Show image ${idx + 1}`"
          @click="goTo(idx)"
        />
      </div>
      <a
        href="#trust"
        class="group flex flex-col items-center gap-2 text-white/70 transition-colors hover:text-accent"
        aria-label="Scroll to content"
      >
        <span class="text-[10px] uppercase tracking-[0.28em]">Scroll</span>
        <span class="scroll-line h-8 w-px bg-gradient-to-b from-accent to-transparent" />
        <ChevronDown :size="16" class="animate-bounce" />
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'

const { ripple } = useMotion()

const slides = [
  {
    image: '/27.jpeg',
    title: 'Divine wall lighting',
  },
  {
    image: '/homepages/d4.jpg',
    title: 'Luxury living room lighting',
  },
]

const sectionRef = ref<HTMLElement | null>(null)
const activeIndex = ref(0)
const parallaxY = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function goTo(idx: number) {
  activeIndex.value = idx
  restartTimer()
}

function next() {
  activeIndex.value = (activeIndex.value + 1) % slides.length
}

function restartTimer() {
  if (timer) clearInterval(timer)
  timer = setInterval(next, 5500)
}

onMounted(() => {
  restartTimer()
  const onScroll = () => {
    const el = sectionRef.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const viewH = window.innerHeight
    const progress = (rect.top + rect.height / 2 - viewH / 2) / viewH
    parallaxY.value = Math.max(-60, Math.min(60, progress * -50))
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    if (timer) clearInterval(timer)
  })
})
</script>

<style scoped>
.hero-kenburns {
  animation: heroKenburns 7s ease-out forwards;
}

@keyframes heroKenburns {
  from { transform: scale(1.12); }
  to { transform: scale(1); }
}

.hero-fade {
  opacity: 0;
  animation: heroFadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes heroFadeUp {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-cta {
  animation: ctaPulse 2.8s ease-in-out infinite;
}

.hero-cta:hover {
  animation: none;
  transform: translateY(-2px) scale(1.05);
}

@keyframes ctaPulse {
  0%, 100% { box-shadow: 0 12px 28px rgba(232, 120, 42, 0.4); }
  50% { box-shadow: 0 16px 40px rgba(232, 120, 42, 0.65); }
}

.scroll-line {
  animation: scrollPulse 1.8s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.35; transform: scaleY(0.7); }
  50% { opacity: 1; transform: scaleY(1); }
}
</style>
