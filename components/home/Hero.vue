<template>
  <section class="relative h-[88vh] min-h-[560px] overflow-hidden">
    <img
      src="/hero_1.jpg"
      alt="Luxury interior lighting"
      class="absolute inset-0 h-full w-full object-cover scale-105 animate-[heroZoom_18s_ease-in-out_infinite_alternate]"
    >
    <div class="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/65" />

    <div class="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col items-center justify-center px-4 text-center text-white">
      <p
        class="section-label !text-accent tracking-[0.35em]"
        data-animate="fade-down"
        data-delay="0.05"
      >
        Luxury Interior Lighting
      </p>
      <h1
        class="mt-6 font-playfair text-5xl leading-[1.1] sm:text-6xl lg:text-7xl text-balance text-white"
        data-animate="fade-up"
        data-delay="0.15"
      >
        Illuminate Every<br>Corner
      </h1>
      <p
        class="mt-7 max-w-xl text-base sm:text-lg text-white/70 leading-relaxed"
        data-animate="fade-up"
        data-delay="0.28"
      >
        Premium chandeliers, designer lights &amp; luxury home decor — crafted for spaces that demand presence.
      </p>
      <div
        class="mt-10 flex flex-wrap justify-center gap-4"
        data-animate="zoom-in"
        data-delay="0.4"
      >
        <NuxtLink to="/lighting/chandeliers" class="btn-primary animate-pulse-glow" @click="ripple">
          Explore Collection
        </NuxtLink>
        <a
          href="#inspiration"
          class="btn-secondary !border-white !text-white hover:!bg-white hover:!text-secondary"
          @click="ripple"
        >
          Watch Lookbook
        </a>
      </div>
    </div>

    <div
      class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      data-animate="fade-up"
      data-delay="0.7"
    >
      <span class="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
      <span class="h-8 w-px bg-gradient-to-b from-white/60 to-transparent animate-float" />
    </div>
  </section>
</template>

<script setup lang="ts">
const { ripple } = useMotion()
</script>

<style scoped>
@keyframes heroZoom {
  from { transform: scale(1); }
  to { transform: scale(1.08); }
}
</style>
