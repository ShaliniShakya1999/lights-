<template>
  <section class="relative overflow-hidden py-20 lg:py-28">
    <img
      src="/hero_2.jpg"
      alt="Luxury lighting collection"
      class="absolute inset-0 h-full w-full object-cover"
      loading="lazy"
    >
    <div class="absolute inset-0 bg-secondary/75" />
    <div class="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="max-w-2xl text-white" data-animate="fade-up">
        <p class="section-label !text-accent">Luxury Collection</p>
        <h2 class="mt-4 font-playfair text-4xl sm:text-5xl lg:text-6xl text-balance">
          Statement pieces for extraordinary rooms
        </h2>
        <p class="mt-5 text-base leading-relaxed text-white/70">
          Crystal, brass, and sculptural silhouettes curated for villas, hotels, and modern homes.
        </p>
        <NuxtLink to="/lighting/chandeliers" class="btn-primary mt-8 inline-flex">
          Discover Luxury
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
