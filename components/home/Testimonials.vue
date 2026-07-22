<template>
  <section class="py-20 lg:py-24 bg-white overflow-hidden">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" data-animate="fade-up">
        <div class="max-w-2xl">
          <p class="section-label">Testimonials</p>
          <h2 class="mt-3 font-playfair text-4xl sm:text-5xl">What Our Clients Say</h2>
          <p class="mt-4 text-sm text-text-muted sm:text-base">
            Real feedback from homes and projects lit with DINMANS.
          </p>
        </div>
        <div class="flex gap-2">
          <button
            type="button"
            class="testimonial-prev flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-text transition-all hover:border-accent hover:text-accent disabled:opacity-40"
            aria-label="Previous review"
          >
            <ChevronLeft :size="18" />
          </button>
          <button
            type="button"
            class="testimonial-next flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-text transition-all hover:border-accent hover:text-accent disabled:opacity-40"
            aria-label="Next review"
          >
            <ChevronRight :size="18" />
          </button>
        </div>
      </div>

      <div class="mt-12" data-animate="fade-up" data-delay="0.1">
        <ClientOnly>
          <Swiper
            :modules="modules"
            :slides-per-view="1"
            :space-between="20"
            :loop="true"
            :autoplay="{ delay: 4500, disableOnInteraction: false }"
            :pagination="{ clickable: true }"
            :navigation="{ prevEl: '.testimonial-prev', nextEl: '.testimonial-next' }"
            :breakpoints="{
              640: { slidesPerView: 1.2, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 28 },
            }"
            class="testimonials-swiper !pb-12"
          >
            <SwiperSlide v-for="review in reviews" :key="review.name">
              <article class="h-full rounded-luxury border border-border bg-background p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-luxury">
                <div class="flex gap-0.5 text-accent">
                  <Star v-for="n in 5" :key="n" :size="14" fill="currentColor" />
                </div>
                <p class="mt-5 min-h-[4.5rem] text-sm leading-relaxed text-text">“{{ review.quote }}”</p>
                <div class="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <img :src="review.photo" :alt="review.name" class="h-12 w-12 rounded-full object-cover" loading="lazy">
                  <div>
                    <p class="text-sm font-medium">{{ review.name }}</p>
                    <p class="text-xs text-text-muted">{{ review.city }}</p>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          </Swiper>
        </ClientOnly>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight, Star } from 'lucide-vue-next'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const modules = [Autoplay, Navigation, Pagination]

const reviews = [
  {
    name: 'Aanya Mehta',
    city: 'Mumbai',
    quote: 'Excellent quality. The chandelier transformed our living room overnight.',
    photo: '/1.jpeg',
  },
  {
    name: 'Rohan Kapoor',
    city: 'Bangalore',
    quote: 'Looks amazing — warm light, premium finish, and seamless delivery.',
    photo: '/2.jpeg',
  },
  {
    name: 'Priya Nair',
    city: 'Delhi',
    quote: 'Highly recommended. Design consultation made choosing so easy.',
    photo: '/3.jpeg',
  },
  {
    name: 'Ethan Lucas',
    city: 'Pune',
    quote: 'Nunc purus est, consequat condimentum — craftsmanship feels truly premium.',
    photo: '/4.jpeg',
  },
  {
    name: 'Francesca Oliver',
    city: 'Hyderabad',
    quote: 'White-glove delivery and installation support exceeded our expectations.',
    photo: '/5.jpeg',
  },
  {
    name: 'Ryan Lynch',
    city: 'Chennai',
    quote: 'Perfect scale for our dining room. Guests always ask where we bought it.',
    photo: '/6.jpeg',
  },
]
</script>

<style scoped>
:deep(.testimonials-swiper .swiper-pagination-bullet) {
  background: #D4AF37;
  opacity: 0.35;
}
:deep(.testimonials-swiper .swiper-pagination-bullet-active) {
  opacity: 1;
  background: #D4AF37;
}
</style>
