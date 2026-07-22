<template>
  <section
    id="inspiration"
    class="relative min-h-[360px] overflow-hidden rounded-luxury lg:min-h-[420px]"
    data-animate="zoom-in"
  >
    <img
      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=900&fit=crop"
      alt="Interior inspiration with luxury lighting"
      class="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] ease-out hover:scale-105"
    >
    <div class="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/55 to-secondary/20" />
    <div class="relative z-10 flex h-full min-h-[360px] items-center px-8 py-14 sm:px-12 lg:min-h-[420px] lg:px-16">
      <div class="max-w-lg text-white">
        <p class="section-label !text-accent" data-animate="fade-up">Interior Stories</p>
        <h2
          class="mt-4 font-playfair text-4xl leading-tight text-balance text-white sm:text-5xl"
          data-animate="fade-up"
          data-delay="0.1"
        >
          Interior Inspiration
        </h2>
        <p
          class="mt-5 text-base leading-relaxed text-white/70"
          data-animate="fade-up"
          data-delay="0.2"
        >
          See how designers compose light as architecture — from quiet bedroom glows to dramatic dining statements.
        </p>
        <NuxtLink
          to="/lighting/chandeliers"
          class="btn-primary mt-8 inline-flex"
          data-animate="fade-up"
          data-delay="0.3"
        >
          View Lookbook
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
