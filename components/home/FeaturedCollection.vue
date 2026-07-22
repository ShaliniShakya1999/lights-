<template>
  <section class="bg-white py-20 lg:py-28">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div class="relative overflow-hidden rounded-luxury shadow-luxury" data-animate="fade-up">
          <img
            src="/homepages/d4.jpg"
            alt="Featured luxury lighting collection"
            class="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
            loading="lazy"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <span class="absolute left-5 top-5 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-secondary">
            Featured
          </span>
        </div>

        <div data-animate="fade-up" data-delay="0.12">
          <p class="section-label">Featured Collection</p>
          <h2 class="mt-3 font-playfair text-4xl leading-tight text-balance sm:text-5xl">
            Crystal & Brass Statement Pieces
          </h2>
          <p class="mt-5 text-sm leading-relaxed text-text-muted sm:text-base">
            A curated edit of chandeliers and pendants designed for villas, hotels, and modern homes —
            warm metallics, sculptural glass, and quiet luxury in every detail.
          </p>
          <ul class="mt-8 space-y-3 text-sm text-text">
            <li class="flex items-center gap-3">
              <span class="h-1.5 w-1.5 rounded-full bg-accent" />
              Hand-finished brass and crystal elements
            </li>
            <li class="flex items-center gap-3">
              <span class="h-1.5 w-1.5 rounded-full bg-accent" />
              Designer silhouettes for double-height spaces
            </li>
            <li class="flex items-center gap-3">
              <span class="h-1.5 w-1.5 rounded-full bg-accent" />
              Complimentary design consultation available
            </li>
          </ul>
          <div class="mt-10 flex flex-wrap gap-3">
            <NuxtLink to="/lighting/chandeliers" class="btn-primary" @click="ripple">
              Shop Featured
            </NuxtLink>
            <NuxtLink to="/projects" class="btn-ghost">
              View Projects
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { ripple } = useMotion()
</script>
