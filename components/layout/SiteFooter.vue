<template>
  <footer class="mt-auto border-t border-border bg-secondary text-white">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-16 lg:py-20">
      <div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div class="lg:col-span-1" data-animate="fade-up">
          <NuxtLink to="/" class="inline-flex items-center gap-2.5 transition-transform duration-300 hover:scale-[1.02]">
            <span class="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white">
              <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M12 2L9 9H2l5.5 4.2L5 21l7-4.8L19 21l-2.5-7.8L22 9h-7L12 2z" />
              </svg>
            </span>
            <span class="font-playfair text-2xl">Lampe</span>
          </NuxtLink>
          <p class="mt-5 text-sm leading-relaxed text-white/60 max-w-xs">
            Curated luxury lighting for interiors that deserve more than ordinary light.
          </p>
        </div>

        <div data-animate="fade-up" data-delay="0.08">
          <h4 class="text-sm font-medium tracking-wide uppercase text-white/90">Collections</h4>
          <ul class="mt-5 space-y-3">
            <li v-for="item in collections" :key="item">
              <NuxtLink :to="`/lighting/${slugify(item)}`" class="text-sm text-white/55 transition-all duration-300 hover:text-accent hover:translate-x-1 inline-block">
                {{ item }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div data-animate="fade-up" data-delay="0.16">
          <h4 class="text-sm font-medium tracking-wide uppercase text-white/90">Support</h4>
          <ul class="mt-5 space-y-3">
            <li v-for="item in support" :key="item">
              <a href="#" class="text-sm text-white/55 transition-all duration-300 hover:text-accent hover:translate-x-1 inline-block">{{ item }}</a>
            </li>
          </ul>
        </div>

        <div data-animate="fade-up" data-delay="0.24">
          <h4 class="text-sm font-medium tracking-wide uppercase text-white/90">Visit</h4>
          <p class="mt-5 text-sm text-white/55 leading-relaxed">
            Lampe Atelier<br>
            12 Design District<br>
            Mumbai · Bangalore · Delhi
          </p>
          <p class="mt-4 text-sm text-white/55">concierge@lampe.studio</p>
        </div>
      </div>

      <div class="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-xs text-white/40">© {{ year }} Lampe. All rights reserved.</p>
        <div class="flex gap-6 text-xs text-white/40">
          <a href="#" class="hover:text-white/70">Privacy</a>
          <a href="#" class="hover:text-white/70">Terms</a>
          <a href="#" class="hover:text-white/70">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
const collections = ['Chandeliers', 'Pendant Lights', 'Floor Lamps', 'Wall Lights']
const support = ['Shipping & Delivery', 'Returns', 'Installation Guide', 'Warranty', 'Contact Concierge']

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-')
}
</script>
