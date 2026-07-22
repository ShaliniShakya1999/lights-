<template>
  <section class="py-20 lg:py-24 bg-background">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" data-animate="fade-up">
        <div>
          <p class="section-label">Project Gallery</p>
          <h2 class="mt-3 font-playfair text-4xl sm:text-5xl">Spaces We’ve Lit</h2>
          <p class="mt-3 max-w-lg text-sm text-text-muted sm:text-base">
            Hotels, villas, residences, and workplaces — crafted with warm lighting.
          </p>
        </div>
        <NuxtLink to="/projects" class="btn-ghost w-fit">View Projects</NuxtLink>
      </div>

      <div class="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-5">
        <NuxtLink
          v-for="(project, i) in projects"
          :key="project.title"
          to="/projects"
          class="group relative overflow-hidden rounded-luxury"
          :class="i === 0 ? 'lg:col-span-2 lg:row-span-2 aspect-square lg:aspect-auto lg:min-h-[420px]' : 'aspect-[4/3]'"
          data-animate="fade-up"
          :data-delay="String(i * 0.06)"
        >
          <img :src="project.image" :alt="project.title" class="img-zoom h-full w-full object-cover" loading="lazy">
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-90" />
          <div class="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <p class="text-[10px] uppercase tracking-[0.22em] text-accent">{{ project.type }}</p>
            <h3 class="mt-1 font-playfair text-xl text-white sm:text-2xl">{{ project.title }}</h3>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const projects = [
  { title: 'Grand Hotel Lobby', type: 'Hotels', image: '/hero_1.jpg' },
  { title: 'Coastal Villa', type: 'Villa', image: '/homepages/a1.jpg' },
  { title: 'Modern Living Room', type: 'Living Room', image: '/collection_1.jpg' },
  { title: 'Executive Office', type: 'Office', image: '/homepages/c3.jpg' },
  { title: 'Fine Dining', type: 'Restaurant', image: '/collection_2.jpg' },
]
</script>
