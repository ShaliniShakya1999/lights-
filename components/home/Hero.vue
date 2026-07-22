<template>
  <section ref="heroRef" class="relative h-[92vh] min-h-[620px] overflow-hidden">
    <div
      class="absolute inset-0 will-change-transform hero-parallax"
      :style="{ transform: parallaxTransform }"
    >
      <img
        src="/hero_1.jpg"
        alt="Luxury interior with warm designer lighting"
        class="h-full w-full object-cover"
      >
    </div>
    <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/70" />
    <div class="absolute inset-0 hero-vignette" />

    <div class="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col items-center justify-center px-4 pb-28 pt-28 text-center text-white lg:pt-32">
      <p class="section-label !text-accent tracking-[0.35em] hero-fade" style="animation-delay: 0.1s">
        DINMANS Design Studio
      </p>
      <h1
        class="mt-6 font-playfair text-5xl leading-[1.08] sm:text-6xl lg:text-7xl xl:text-[5.25rem] text-balance text-white hero-fade"
        style="animation-delay: 0.22s"
      >
        Luxury Lighting for<br class="hidden sm:block"> Modern Homes
      </h1>
      <p
        class="mt-7 max-w-2xl text-base sm:text-lg text-white/75 leading-relaxed hero-fade"
        style="animation-delay: 0.38s"
      >
        Crafted chandeliers, designer lamps and premium lighting solutions
        that transform every space.
      </p>
      <div class="mt-10 flex flex-wrap justify-center gap-4 hero-fade" style="animation-delay: 0.52s">
        <NuxtLink
          to="/lighting/chandeliers"
          class="btn-primary !bg-accent !text-secondary shadow-gold min-w-[160px]"
          @click="ripple"
        >
          Shop Collection
        </NuxtLink>
        <NuxtLink
          to="/lighting/decorative-lighting"
          class="btn-secondary !border-white/80 !text-white hover:!bg-white hover:!text-secondary min-w-[160px]"
          @click="ripple"
        >
          Explore Catalog
        </NuxtLink>
      </div>
    </div>

    <div class="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-black/35 backdrop-blur-md">
      <div class="mx-auto grid max-w-[1440px] grid-cols-2 gap-px sm:grid-cols-4">
        <div
          v-for="badge in trustBadges"
          :key="badge.label"
          class="flex flex-col items-center justify-center gap-1 px-4 py-5 text-center sm:py-6"
        >
          <p class="font-playfair text-xl text-accent sm:text-2xl">{{ badge.stat }}</p>
          <p class="text-[10px] uppercase tracking-[0.2em] text-white/65 sm:text-[11px]">{{ badge.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { ripple } = useMotion()
const heroRef = ref<HTMLElement | null>(null)
const parallaxY = ref(0)

const parallaxTransform = computed(() => `translate3d(0, ${parallaxY.value}px, 0) scale(1.08)`)

const trustBadges = [
  { stat: '10,000+', label: 'Happy Customers' },
  { stat: '500+', label: 'Products' },
  { stat: '15 Years', label: 'Experience' },
  { stat: 'Free', label: 'Shipping*' },
]

onMounted(() => {
  const onScroll = () => {
    if (!heroRef.value) return
    const rect = heroRef.value.getBoundingClientRect()
    if (rect.bottom < 0) return
    parallaxY.value = Math.min(80, Math.max(0, -rect.top * 0.25))
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})
</script>

<style scoped>
.hero-vignette {
  background: radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.35) 100%);
}

.hero-fade {
  opacity: 0;
  animation: heroFadeUp 0.9s ease forwards;
}

@keyframes heroFadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
