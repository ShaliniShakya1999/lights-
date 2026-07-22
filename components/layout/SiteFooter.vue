<template>
  <footer class="mt-auto bg-secondary text-white">
    <div class="border-b border-white/10">
      <div class="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div>
          <p class="section-label !text-accent">Stay in the light</p>
          <h3 class="mt-2 font-playfair text-2xl sm:text-3xl">Join the DINMANS newsletter</h3>
          <p class="mt-2 max-w-md text-sm text-white/55">New collections, design tips, and exclusive offers.</p>
        </div>
        <form class="flex w-full max-w-md flex-col gap-3 sm:flex-row" @submit.prevent="subscribed = true">
          <input
            v-model="email"
            type="email"
            required
            placeholder="Email address"
            class="input-luxury flex-1 !bg-white"
          >
          <button type="submit" class="btn-primary shrink-0">
            {{ subscribed ? 'Subscribed' : 'Subscribe' }}
          </button>
        </form>
      </div>
    </div>

    <div class="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12">
        <div class="lg:col-span-4" data-animate="fade-up">
          <NuxtLink to="/" class="inline-flex" aria-label="DINMANS home">
            <img src="/logo.png" alt="DINMANS" class="h-11 w-auto">
          </NuxtLink>
          <p class="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
            Luxury lighting for modern homes — chandeliers, designer lamps, and curated solutions that inspire all.
          </p>
          <div class="mt-6 flex gap-3">
            <a
              v-for="s in socials"
              :key="s.label"
              :href="s.href"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-xs text-white/70 transition-all duration-300 hover:scale-110 hover:border-accent hover:text-accent"
              :aria-label="s.label"
            >
              {{ s.short }}
            </a>
          </div>
          <div class="mt-8 space-y-2 text-sm text-white/55">
            <p>12 Design District, Mumbai</p>
            <p>concierge@dinmans.com</p>
            <p>+91 98765 43210</p>
          </div>
        </div>

        <div class="lg:col-span-2" data-animate="fade-up" data-delay="0.05">
          <h4 class="text-sm font-medium uppercase tracking-wide text-white/90">Categories</h4>
          <ul class="mt-5 space-y-3">
            <li v-for="item in categories" :key="item.label">
              <NuxtLink :to="item.to" class="text-sm text-white/55 transition-colors hover:text-accent">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="lg:col-span-2" data-animate="fade-up" data-delay="0.1">
          <h4 class="text-sm font-medium uppercase tracking-wide text-white/90">Support</h4>
          <ul class="mt-5 space-y-3">
            <li v-for="item in support" :key="item.label">
              <NuxtLink :to="item.to" class="text-sm text-white/55 transition-colors hover:text-accent">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="lg:col-span-2" data-animate="fade-up" data-delay="0.15">
          <h4 class="text-sm font-medium uppercase tracking-wide text-white/90">Company</h4>
          <ul class="mt-5 space-y-3">
            <li v-for="item in company" :key="item.label">
              <NuxtLink :to="item.to" class="text-sm text-white/55 transition-colors hover:text-accent">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="lg:col-span-2" data-animate="fade-up" data-delay="0.2">
          <h4 class="text-sm font-medium uppercase tracking-wide text-white/90">Contact</h4>
          <ul class="mt-5 space-y-3 text-sm text-white/55">
            <li>Mon–Sat · 10am–7pm</li>
            <li>
              <NuxtLink to="/contact" class="transition-colors hover:text-accent">Book a consult</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/projects" class="transition-colors hover:text-accent">Trade enquiries</NuxtLink>
            </li>
          </ul>
          <div class="mt-6">
            <p class="text-[10px] uppercase tracking-[0.2em] text-white/40">Certifications</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <span
                v-for="cert in certifications"
                :key="cert"
                class="rounded-md border border-white/15 px-2 py-1 text-[10px] uppercase tracking-wider text-white/50"
              >
                {{ cert }}
              </span>
            </div>
          </div>
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
const email = ref('')
const subscribed = ref(false)

const socials = [
  { label: 'Instagram', short: 'Ig', href: '#' },
  { label: 'Facebook', short: 'Fb', href: '#' },
  { label: 'Pinterest', short: 'Pin', href: '#' },
  { label: 'YouTube', short: 'Yt', href: '#' },
]
const payments = ['Visa', 'Mastercard', 'UPI', 'RuPay', 'COD']
const certifications = ['ISI', 'CE', 'RoHS', 'BIS']
const categories = [
  { label: 'Chandeliers', to: '/lighting/chandeliers' },
  { label: 'Lamps', to: '/lighting/lamps' },
  { label: 'General Interior', to: '/lighting/general-light-interior' },
  { label: 'COB / Track', to: '/lighting/cob-panel-track-lights' },
  { label: 'Pendant Lights', to: '/lighting/pendant-lights' },
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
  { label: 'Projects', to: '/projects' },
  { label: 'Blog', to: '/blog' },
  { label: 'Careers', to: '/about' },
]
</script>
