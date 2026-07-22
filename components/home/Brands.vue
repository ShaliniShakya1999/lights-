<template>
  <section class="py-16 lg:py-20 bg-white border-y border-border">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="text-center" data-animate="fade-up">
        <p class="section-label">Featured Brands</p>
        <h2 class="mt-3 font-playfair text-3xl sm:text-4xl">Trusted Ateliers</h2>
      </div>
      <div class="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
        <span
          v-for="(brand, i) in brands"
          :key="brand"
          class="font-playfair text-lg sm:text-xl text-text/40 transition-colors duration-300 hover:text-accent"
          data-animate="fade-up"
          :data-delay="String(i * 0.05)"
        >
          {{ brand }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const brands = ['Lampe Atelier', 'Maison Lumière', 'Atelier Nord', 'Casa Brillante', 'Lumina Pro']
</script>
