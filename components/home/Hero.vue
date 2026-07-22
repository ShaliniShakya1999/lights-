<template>
  <section
    ref="sectionRef"
    class="relative flex min-h-[100svh] items-center overflow-hidden bg-secondary"
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

    <!-- ~35% dark overlay -->
    <div class="absolute inset-0 bg-black/35" />
    <div class="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/55" />

    <div class="relative z-10 mx-auto w-full max-w-[1440px] px-4 pb-28 pt-32 text-center sm:px-6 lg:px-10 lg:pb-32 lg:pt-36">
      <p
        class="section-label !text-accent tracking-[0.35em] hero-fade"
        style="animation-delay: 0.05s"
      >
        DINMANS Design Studio
      </p>
      <h1
        class="mx-auto mt-6 max-w-5xl font-playfair text-[2.35rem] leading-[1.12] text-white text-balance sm:text-5xl md:text-6xl lg:text-7xl hero-fade"
        style="animation-delay: 0.15s"
      >
        Illuminate Every Corner with Luxury Lighting
      </h1>
      <p
        class="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base md:text-lg hero-fade"
        style="animation-delay: 0.28s"
      >
        Discover handcrafted chandeliers, pendant lights and designer lamps.
      </p>
      <div
        class="mt-10 flex flex-wrap items-center justify-center gap-4 hero-fade"
        style="animation-delay: 0.4s"
      >
        <NuxtLink
          to="/lighting/chandeliers"
          class="btn-primary !bg-accent !text-secondary shadow-gold min-w-[160px]"
          @click="ripple"
        >
          Shop Collection
        </NuxtLink>
        <NuxtLink
          to="/lighting/lamps"
          class="btn-secondary !border-white/85 !text-white hover:!bg-white hover:!text-secondary min-w-[160px]"
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
    image: '/homepages/d4.jpg',
    title: 'Luxury living room lighting',
  },
  {
    image: '/homepages/c3.jpg',
    title: 'Modern interior ambient light',
  },
  {
    image: '/homepages/slider_new1.jpg',
    title: 'Designer chandelier interior',
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
  from { transform: scale(1.1); }
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

.scroll-line {
  animation: scrollPulse 1.8s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.35; transform: scaleY(0.7); }
  50% { opacity: 1; transform: scaleY(1); }
}
</style>
