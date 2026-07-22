<template>
  <section class="py-20 lg:py-24 bg-white">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="mx-auto max-w-2xl text-center" data-animate="fade-up">
        <p class="section-label">Room Based Shopping</p>
        <h2 class="mt-3 font-playfair text-4xl sm:text-5xl">Light Every Space</h2>
        <p class="mt-4 text-sm text-text-muted sm:text-base">
          Find the perfect fixture for every room in your home.
        </p>
      </div>

      <div class="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
        <NuxtLink
          v-for="(room, i) in rooms"
          :key="room.name"
          :to="room.to"
          class="group relative aspect-[5/4] overflow-hidden rounded-luxury"
          data-animate="fade-up"
          :data-delay="String(i * 0.07)"
        >
          <img :src="room.image" :alt="room.name" class="img-zoom h-full w-full object-cover" loading="lazy">
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          <div class="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <h3 class="font-playfair text-xl text-white sm:text-2xl">{{ room.name }}</h3>
            <span class="mt-2 inline-block text-xs text-white/70 transition-colors group-hover:text-accent">Shop room →</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const rooms = [
  { name: 'Living Room', image: '/homepages/a1.jpg', to: '/lighting/chandeliers' },
  { name: 'Bedroom', image: '/homepages/b2.jpg', to: '/lighting/pendant-lights' },
  { name: 'Dining', image: '/collection_1.jpg', to: '/lighting/chandeliers' },
  { name: 'Kitchen', image: '/homepages/c3.jpg', to: '/lighting/track-lights' },
  { name: 'Office', image: '/homepages/d4.jpg', to: '/lighting/ceiling-lights' },
  { name: 'Outdoor', image: '/homepages/e5.jpg', to: '/lighting/outdoor-lights' },
]
</script>
