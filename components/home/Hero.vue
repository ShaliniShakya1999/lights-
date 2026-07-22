<template>
  <section class="relative h-[92vh] min-h-[620px] overflow-hidden bg-secondary">
    <ClientOnly>
      <Swiper
        :modules="modules"
        :slides-per-view="1"
        :loop="true"
        :effect="'fade'"
        :fade-effect="{ crossFade: true }"
        :speed="1200"
        :autoplay="{ delay: 5200, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        :navigation="{ prevEl: '.hero-prev', nextEl: '.hero-next' }"
        class="hero-swiper absolute inset-0 h-full w-full"
        @slide-change="onSlideChange"
      >
        <SwiperSlide v-for="(slide, idx) in slides" :key="slide.image">
          <div class="relative h-full w-full overflow-hidden">
            <img
              :src="slide.image"
              :alt="slide.title"
              class="hero-slide-img h-full w-full object-cover"
              :class="{ 'is-active': activeIndex === idx }"
            >
            <div class="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/70" />
            <div class="absolute inset-0 hero-vignette" />
          </div>
        </SwiperSlide>
      </Swiper>
    </ClientOnly>

    <div class="pointer-events-none relative z-10 mx-auto flex h-full max-w-[1440px] flex-col items-center justify-center px-4 pb-28 pt-28 text-center text-white lg:pt-32">
      <p class="section-label !text-accent tracking-[0.35em] hero-fade" style="animation-delay: 0.1s">
        DINMANS Design Studio
      </p>
      <h1
        :key="activeIndex + '-title'"
        class="mt-6 font-playfair text-5xl leading-[1.08] sm:text-6xl lg:text-7xl xl:text-[5.25rem] text-balance text-white hero-fade"
        style="animation-delay: 0.15s"
      >
        {{ slides[activeIndex]?.title }}
      </h1>
      <p
        :key="activeIndex + '-sub'"
        class="mt-7 max-w-2xl text-base sm:text-lg text-white/75 leading-relaxed hero-fade"
        style="animation-delay: 0.28s"
      >
        {{ slides[activeIndex]?.subtitle }}
      </p>
      <div class="pointer-events-auto mt-10 flex flex-wrap justify-center gap-4 hero-fade" style="animation-delay: 0.4s">
        <NuxtLink
          to="/lighting/chandeliers"
          class="btn-primary !bg-accent !text-secondary shadow-gold min-w-[160px]"
          @click="ripple"
        >
          Shop Collection
        </NuxtLink>
        <NuxtLink
          to="/lighting/lamps"
          class="btn-secondary !border-white/80 !text-white hover:!bg-white hover:!text-secondary min-w-[160px]"
          @click="ripple"
        >
          Explore Catalog
        </NuxtLink>
      </div>
    </div>

    <div class="pointer-events-auto absolute inset-x-0 top-1/2 z-20 hidden -translate-y-1/2 px-4 sm:flex sm:justify-between lg:px-8">
      <button type="button" class="hero-prev flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-md transition-all hover:border-accent hover:text-accent" aria-label="Previous">
        <ChevronLeft :size="20" />
      </button>
      <button type="button" class="hero-next flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-md transition-all hover:border-accent hover:text-accent" aria-label="Next">
        <ChevronRight :size="20" />
      </button>
    </div>

    <div class="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-black/35 backdrop-blur-md">
      <div class="mx-auto grid max-w-[1440px] grid-cols-2 gap-px">
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
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const { ripple } = useMotion()
const modules = [Autoplay, EffectFade, Navigation, Pagination]
const activeIndex = ref(0)

const slides = [
  {
    image: '/homepages/c3.jpg',
    title: 'Luxury Lighting for Modern Homes',
    subtitle: 'Crafted chandeliers, designer lamps and premium lighting solutions that transform every space.',
  },
  {
    image: '/homepages/d4.jpg',
    title: 'Warm Interiors, Statement Light',
    subtitle: 'Layered ambient lighting for living rooms, dining spaces, and designer residences.',
  },
  {
    image: '/27.jpeg',
    title: 'Decorative Glow for Every Wall',
    subtitle: 'From ethnic wall lamps to sculptural fixtures — light that inspires all.',
  },
]

const trustBadges = [
  { stat: '500+', label: 'Products' },
  { stat: 'Free', label: 'Shipping*' },
]

function onSlideChange(swiper: { realIndex: number }) {
  activeIndex.value = swiper.realIndex
}
</script>

<style scoped>
.hero-vignette {
  background: radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.35) 100%);
}

.hero-slide-img {
  transform: scale(1.08);
  transition: transform 6.5s ease-out;
}

.hero-slide-img.is-active {
  transform: scale(1);
}

.hero-fade {
  opacity: 0;
  animation: heroFadeUp 0.85s ease forwards;
}

@keyframes heroFadeUp {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:deep(.hero-swiper .swiper-pagination) {
  bottom: 6.5rem !important;
}

:deep(.hero-swiper .swiper-pagination-bullet) {
  background: #D4AF37;
  opacity: 0.4;
  width: 8px;
  height: 8px;
}

:deep(.hero-swiper .swiper-pagination-bullet-active) {
  opacity: 1;
  background: #D4AF37;
  width: 24px;
  border-radius: 999px;
}
</style>
