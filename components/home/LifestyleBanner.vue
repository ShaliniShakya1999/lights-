<template>
  <section ref="sectionRef" class="relative overflow-hidden py-24 lg:py-32">
    <div
      class="absolute inset-[-18%] will-change-transform"
      :style="{ transform: `translate3d(0, ${parallaxY}px, 0) scale(1.15)` }"
    >
      <img
        :src="image"
        alt="Luxury lighting collection"
        class="h-full w-full object-cover"
        loading="lazy"
      >
    </div>
    <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/35" />
    <div class="absolute inset-0 bg-secondary/40" />

    <div class="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="max-w-2xl text-white" data-animate="fade-up">
        <p class="section-label !text-accent">Luxury Collection</p>
        <h2 class="mt-4 heading-section lg:text-6xl !text-white text-balance">
          Statement pieces for extraordinary rooms
        </h2>
        <p class="body-lead mt-5 !text-white/70">
          Crystal, brass, and sculptural silhouettes curated for villas, hotels, and modern homes.
        </p>
        <NuxtLink to="/lighting/chandeliers" class="btn-primary mt-8 inline-flex">
          Discover Luxury
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  image?: string
}>(), {
  image: '/catalog/p7.jpg',
})

const sectionRef = ref<HTMLElement | null>(null)
const parallaxY = ref(0)

onMounted(() => {
  const onScroll = () => {
    const el = sectionRef.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const viewH = window.innerHeight
    // Progress while section is in view: -1 .. 1
    const center = rect.top + rect.height / 2
    const progress = (center - viewH / 2) / viewH
    parallaxY.value = Math.max(-90, Math.min(90, progress * -70))
  }

  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})
</script>
