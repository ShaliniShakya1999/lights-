<template>
  <section ref="sectionRef" class="relative overflow-hidden rounded-luxury min-h-[300px] lg:min-h-[420px] shadow-luxury">
    <div
      class="absolute inset-[-18%] will-change-transform"
      :style="{ transform: `translate3d(0, ${parallaxY}px, 0) scale(1.16)` }"
    >
      <img
        :src="image"
        :alt="title"
        class="h-full w-full object-cover"
      >
    </div>
    <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
    <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

    <div class="relative z-10 flex min-h-[300px] lg:min-h-[420px] flex-col justify-center px-8 py-14 sm:px-12 lg:px-16 xl:max-w-2xl">
      <p class="section-label !text-accent" data-animate="fade-up">Premium Collection</p>
      <h1
        class="mt-4 heading-section text-white"
        data-animate="fade-up"
        data-delay="0.1"
      >
        {{ title }}
      </h1>
      <p
        class="body-lead mt-5 max-w-md !text-white/70"
        data-animate="fade-up"
        data-delay="0.2"
      >
        {{ subtitle }}
      </p>
      <div class="mt-8" data-animate="fade-up" data-delay="0.3">
        <a href="#products" class="btn-primary inline-flex" @click="onCta">
          Explore Collection
          <ArrowRight :size="16" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

withDefaults(defineProps<{
  title?: string
  subtitle?: string
  image?: string
}>(), {
  title: 'Luxury Chandeliers',
  subtitle: 'Elegant crystal and designer chandeliers crafted for modern interiors.',
  image: '/homepages/d4.jpg',
})

const { ripple } = useMotion()
const sectionRef = ref<HTMLElement | null>(null)
const parallaxY = ref(0)

function onCta(e: MouseEvent) {
  ripple(e)
}

onMounted(() => {
  const onScroll = () => {
    const el = sectionRef.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const viewH = window.innerHeight
    const center = rect.top + rect.height / 2
    const progress = (center - viewH / 2) / viewH
    parallaxY.value = Math.max(-85, Math.min(85, progress * -65))
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})
</script>
