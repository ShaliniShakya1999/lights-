<template>
  <section class="border-y border-border bg-white py-16 lg:py-20">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="text-center" data-animate="fade-up">
        <p class="section-label">Featured Brands</p>
        <h2 class="mt-3 heading-section-sm">Trusted Ateliers</h2>
      </div>
      <div class="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
        <NuxtLink
          v-for="(brand, i) in brands"
          :key="brand.name"
          to="/brands"
          class="group flex aspect-[5/3] items-center justify-center rounded-luxury border border-border bg-background px-4 transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-luxury"
          data-animate="fade-up"
          :data-delay="String(i * 0.05)"
        >
          <span class="font-playfair text-lg text-text/45 transition-colors duration-300 group-hover:text-accent sm:text-xl">
            {{ brand.name }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const brands = [
  { name: 'Lampe Atelier' },
  { name: 'Maison Lumière' },
  { name: 'Atelier Nord' },
  { name: 'Casa Brillante' },
  { name: 'Lumina Pro' },
]
</script>
