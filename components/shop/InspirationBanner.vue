<template>
  <section
    id="inspiration"
    ref="sectionRef"
    class="relative min-h-[280px] overflow-hidden rounded-2xl sm:min-h-[360px] sm:rounded-luxury lg:min-h-[440px]"
  >
    <div
      class="absolute inset-[-20%] will-change-transform"
      :style="{ transform: `translate3d(0, ${parallaxY}px, 0) scale(1.18)` }"
    >
      <img
        src="/homepages/c3.jpg"
        alt="Interior inspiration with luxury lighting"
        class="h-full w-full object-cover"
        loading="lazy"
      >
    </div>
    <div class="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/55 to-secondary/20" />
    <div class="relative z-10 flex h-full min-h-[280px] items-center px-5 py-10 xs:px-6 sm:min-h-[360px] sm:px-12 sm:py-14 lg:min-h-[440px] lg:px-16">
      <div class="max-w-lg text-white">
        <p class="section-label !text-accent" data-animate="fade-up">Interior Stories</p>
        <h2
          class="mt-3 heading-section !text-white sm:mt-4"
          data-animate="fade-up"
          data-delay="0.1"
        >
          Interior Inspiration
        </h2>
        <p
          class="mt-3 text-sm leading-relaxed text-white/70 sm:mt-5 sm:text-base"
          data-animate="fade-up"
          data-delay="0.2"
        >
          See how designers compose light as architecture — from quiet bedroom glows to dramatic dining statements.
        </p>
        <NuxtLink
          to="/lighting/chandeliers"
          class="btn-primary mt-6 inline-flex sm:mt-8"
          data-animate="fade-up"
          data-delay="0.3"
        >
          View Lookbook
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const sectionRef = ref<HTMLElement | null>(null)
const parallaxY = ref(0)

onMounted(() => {
  const onScroll = () => {
    const el = sectionRef.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const viewH = window.innerHeight
    const center = rect.top + rect.height / 2
    const progress = (center - viewH / 2) / viewH
    parallaxY.value = Math.max(-80, Math.min(80, progress * -60))
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})
</script>
