<template>
  <footer class="mt-auto bg-secondary text-white">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-16 lg:py-20">
      <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-6">
        <div class="lg:col-span-2" data-animate="fade-up">
          <NuxtLink to="/" class="inline-flex" aria-label="DINMANS home">
            <img src="/logo.png" alt="DINMANS" class="h-11 w-auto">
          </NuxtLink>
          <p class="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
            Luxury lighting for modern homes — chandeliers, designer lamps, and curated solutions that inspire all.
          </p>
          <div class="mt-6 flex gap-3">
            <a v-for="s in socials" :key="s" href="#" class="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-xs text-white/70 transition-colors hover:border-accent hover:text-accent">
              {{ s }}
            </a>
          </div>
          <div class="mt-8 space-y-2 text-sm text-white/55">
            <p>12 Design District, Mumbai</p>
            <p>concierge@dinmans.com</p>
            <p>+91 98765 43210</p>
          </div>
        </div>

        <div data-animate="fade-up" data-delay="0.05">
          <h4 class="text-sm font-medium tracking-wide uppercase text-white/90">Quick Links</h4>
          <ul class="mt-5 space-y-3">
            <li v-for="item in quickLinks" :key="item.label">
              <NuxtLink :to="item.to" class="text-sm text-white/55 transition-colors hover:text-accent">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div data-animate="fade-up" data-delay="0.1">
          <h4 class="text-sm font-medium tracking-wide uppercase text-white/90">Categories</h4>
          <ul class="mt-5 space-y-3">
            <li v-for="item in categories" :key="item">
              <NuxtLink :to="`/lighting/${slugify(item)}`" class="text-sm text-white/55 transition-colors hover:text-accent">{{ item }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div data-animate="fade-up" data-delay="0.15">
          <h4 class="text-sm font-medium tracking-wide uppercase text-white/90">Support</h4>
          <ul class="mt-5 space-y-3">
            <li v-for="item in support" :key="item.label">
              <NuxtLink :to="item.to" class="text-sm text-white/55 transition-colors hover:text-accent">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div data-animate="fade-up" data-delay="0.2">
          <h4 class="text-sm font-medium tracking-wide uppercase text-white/90">Company</h4>
          <ul class="mt-5 space-y-3">
            <li v-for="item in company" :key="item.label">
              <NuxtLink :to="item.to" class="text-sm text-white/55 transition-colors hover:text-accent">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
        <p class="text-xs text-white/40">© {{ year }} DINMANS. All rights reserved.</p>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="pay in payments"
            :key="pay"
            class="rounded-md border border-white/15 px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/50"
          >
            {{ pay }}
          </span>
        </div>
        <div class="flex gap-5 text-xs text-white/40">
          <NuxtLink to="/privacy" class="hover:text-white/70">Privacy</NuxtLink>
          <NuxtLink to="/terms" class="hover:text-white/70">Terms</NuxtLink>
          <NuxtLink to="/sitemap" class="hover:text-white/70">Sitemap</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
const socials = ['Ig', 'Fb', 'Pin', 'Yt']
const payments = ['Visa', 'Mastercard', 'UPI', 'RuPay', 'COD']
const categories = ['Chandeliers', 'Pendant Lights', 'Wall Lights', 'Floor Lamps', 'Outdoor Lights']
const quickLinks = [
  { label: 'Shop Collection', to: '/lighting/chandeliers' },
  { label: 'New Arrivals', to: '/lighting/decorative-lighting' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blog', to: '/blog' },
]
const support = [
  { label: 'Shipping Policy', to: '/shipping' },
  { label: 'Returns', to: '/returns' },
  { label: 'Warranty', to: '/warranty' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Contact', to: '/contact' },
]
const company = [
  { label: 'About Us', to: '/about' },
  { label: 'Brands', to: '/brands' },
  { label: 'Careers', to: '/about' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
]

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-')
}
</script>
