<template>
  <section class="py-20 lg:py-24 bg-white">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" data-animate="fade-up">
        <div>
          <p class="section-label">From The Journal</p>
          <h2 class="mt-3 font-playfair text-4xl sm:text-5xl">Blog</h2>
        </div>
        <NuxtLink to="/blog" class="btn-ghost w-fit">All Articles</NuxtLink>
      </div>
      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <NuxtLink
          v-for="(post, i) in posts"
          :key="post.title"
          to="/blog"
          class="group overflow-hidden rounded-luxury border border-border bg-background transition-all duration-500 hover:-translate-y-1 hover:shadow-luxury"
          data-animate="fade-up"
          :data-delay="String(i * 0.08)"
        >
          <div class="aspect-[16/10] overflow-hidden">
            <img :src="post.image" :alt="post.title" class="img-zoom h-full w-full object-cover" loading="lazy">
          </div>
          <div class="p-6">
            <p class="text-[10px] uppercase tracking-[0.2em] text-accent">{{ post.tag }}</p>
            <h3 class="mt-2 font-playfair text-xl leading-snug transition-colors group-hover:text-accent">{{ post.title }}</h3>
            <p class="mt-2 text-sm text-text-muted line-clamp-2">{{ post.excerpt }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const posts = [
  {
    title: 'How to Layer Light in a Modern Living Room',
    tag: 'Design Tips',
    excerpt: 'Ambient, task, and accent lighting working together for depth and warmth.',
    image: '/homepages/slider_new1.jpg',
  },
  {
    title: 'Choosing the Right Chandelier Scale',
    tag: 'Guides',
    excerpt: 'Simple rules for dining rooms, lobbies, and double-height spaces.',
    image: '/collection_1.jpg',
  },
  {
    title: 'Warm Metals for 2026 Interiors',
    tag: 'Trends',
    excerpt: 'Brass, bronze, and soft gold finishes that elevate every fixture.',
    image: '/homepages/g7.jpg',
  },
]
</script>
