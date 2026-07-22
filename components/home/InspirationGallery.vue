<template>
  <section class="bg-background py-20 lg:py-24">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="mx-auto max-w-2xl text-center" data-animate="fade-up">
        <p class="section-label">Gallery</p>
        <h2 class="mt-3 heading-section">Product Stories</h2>
        <p class="body-lead mt-3">
          Handpicked DINMANS lighting designs — warm glow, foldable craft, and sculptural light.
        </p>
      </div>

      <div class="relative mt-12" data-animate="fade-up" data-delay="0.1">
        <ClientOnly>
          <Swiper
            :modules="modules"
            :slides-per-view="1.15"
            :space-between="16"
            :loop="true"
            :autoplay="{ delay: 4200, disableOnInteraction: false }"
            :pagination="{ clickable: true }"
            :navigation="{ prevEl: '.rif-prev', nextEl: '.rif-next' }"
            :breakpoints="{
              640: { slidesPerView: 2, spaceBetween: 18 },
              1024: { slidesPerView: 3, spaceBetween: 22 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }"
            class="rif-swiper !pb-12"
          >
            <SwiperSlide v-for="item in slides" :key="item.id">
              <NuxtLink
                to="/projects"
                class="group relative block overflow-hidden rounded-luxury border border-border bg-white shadow-soft"
              >
                <div class="aspect-[3/4] overflow-hidden">
                  <img
                    :src="item.src"
                    :alt="item.title"
                    class="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  >
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div class="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p class="text-[10px] uppercase tracking-[0.22em] text-accent">{{ item.tag }}</p>
                  <h3 class="mt-1 font-playfair text-lg text-white sm:text-xl">{{ item.title }}</h3>
                </div>
              </NuxtLink>
            </SwiperSlide>
          </Swiper>
        </ClientOnly>

        <button
          type="button"
          class="rif-prev absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/95 text-text shadow-soft transition-all hover:border-accent hover:text-accent lg:-left-3 lg:flex"
          aria-label="Previous"
        >
          <ChevronLeft :size="18" />
        </button>
        <button
          type="button"
          class="rif-next absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/95 text-text shadow-soft transition-all hover:border-accent hover:text-accent lg:-right-3 lg:flex"
          aria-label="Next"
        >
          <ChevronRight :size="18" />
        </button>
      </div>

      <div class="mt-8 flex justify-center" data-animate="fade-up" data-delay="0.15">
        <NuxtLink to="/projects" class="btn-ghost">
          View More
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { rifGalleryItems } from '~/data/rif-gallery'

const modules = [Autoplay, Navigation, Pagination]
const slides = rifGalleryItems.slice(0, 4)
</script>

<style scoped>
:deep(.rif-swiper .swiper-pagination-bullet) {
  background: #E8782A;
  opacity: 0.35;
}
:deep(.rif-swiper .swiper-pagination-bullet-active) {
  opacity: 1;
  width: 22px;
  border-radius: 999px;
}
</style>
