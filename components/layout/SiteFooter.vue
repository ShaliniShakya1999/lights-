<template>
  <footer class="relative mt-auto overflow-hidden text-white">
    <div class="absolute inset-0">
      <img
        src="/homepages/d4.jpg"
        alt=""
        class="h-full w-full scale-105 object-cover"
        loading="lazy"
      >
      <div class="absolute inset-0 bg-[#3D2A1F]/55 backdrop-blur-[2px]" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#2A1A12]/70 via-[#3D2A1F]/40 to-[#3D2A1F]/45" />
    </div>

    <div class="relative mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12">
        <div class="lg:col-span-4" data-animate="fade-up">
          <NuxtLink to="/" class="inline-flex" aria-label="DINMANS home">
            <img src="/wite.png" alt="DINMANS" class="h-11 w-auto sm:h-12">
          </NuxtLink>

          <div class="mt-8 rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
            <h4 class="text-base font-semibold tracking-wide text-white">Need Help?</h4>
            <p class="mt-2 text-sm text-white/70">
              Questions about products, orders, or installation — we’re here.
            </p>
            <ul class="mt-4 space-y-2 text-sm text-white/85">
              <li>
                <a href="tel:+919992121006" class="transition-colors hover:text-accent">9992121006</a>
                ·
                <a href="tel:+917015638389" class="transition-colors hover:text-accent">7015638389</a>
              </li>
              <li>
                <a href="mailto:dinmanslightup@gmail.com" class="underline underline-offset-2 transition-colors hover:text-accent">
                  dinmanslightup@gmail.com
                </a>
              </li>
              <li class="leading-relaxed text-white/70">
                Southcity-1 Sector 30, Block-A, Gurugram – 122001
              </li>
            </ul>
            <NuxtLink to="/contact" class="btn-primary mt-5 !py-2.5 !text-sm inline-flex">
              Contact Us
            </NuxtLink>
          </div>
        </div>

        <div class="lg:col-span-2" data-animate="fade-up" data-delay="0.05">
          <h4 class="text-base font-semibold tracking-wide text-white">Useful Links</h4>
          <ul class="mt-5 space-y-3">
            <li v-for="item in usefulLinks" :key="item.label">
              <NuxtLink :to="item.to" class="text-base text-white/75 transition-colors hover:text-accent">
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="lg:col-span-2" data-animate="fade-up" data-delay="0.1">
          <h4 class="text-base font-semibold tracking-wide text-white">Support</h4>
          <ul class="mt-5 space-y-3">
            <li v-for="item in support" :key="item.label">
              <NuxtLink :to="item.to" class="text-base text-white/75 transition-colors hover:text-accent">
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="lg:col-span-4" data-animate="fade-up" data-delay="0.15">
          <h4 class="text-base font-semibold tracking-wide text-white">Newsletter</h4>
          <p class="mt-3 text-sm leading-relaxed text-white/70">
            Get design tips and early access to new collections.
          </p>
          <form class="mt-4 flex flex-col gap-3 sm:flex-row" @submit.prevent="subscribed = true">
            <input
              v-model="email"
              type="email"
              required
              placeholder="Your email"
              class="input-luxury flex-1 !bg-white/95"
            >
            <button type="submit" class="btn-primary shrink-0 !py-3 !text-sm">
              {{ subscribed ? 'Done' : 'Subscribe' }}
            </button>
          </form>

          <div class="mt-6">
            <p class="text-xs uppercase tracking-[0.2em] text-white/55">Follow Us</p>
            <div class="mt-3 flex gap-3">
              <a
                v-for="s in socials"
                :key="s.label"
                :href="s.href"
                class="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/5 text-xs text-white/85 transition-all duration-300 hover:scale-110 hover:border-accent hover:bg-accent hover:text-white"
                :aria-label="s.label"
              >
                {{ s.short }}
              </a>
            </div>
          </div>

          <p class="mt-5 text-sm text-white/65">GSTIN: 06BDOPS3565G1Z4</p>
        </div>
      </div>

      <div class="mt-14 flex flex-col gap-4 border-t border-white/20 pt-8 lg:flex-row lg:items-center lg:justify-between">
        <p class="text-sm text-white/65">
          Copyright © {{ year }} - Dinmans.com
        </p>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="pay in payments"
            :key="pay"
            class="rounded-md border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-wider text-white/70"
          >
            {{ pay }}
          </span>
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

const usefulLinks = [
  { label: 'Chandeliers', to: '/lighting/chandeliers' },
  { label: 'Ceiling light', to: '/lighting/ceiling-lights' },
  { label: 'Night lamps', to: '/lighting/lamps' },
  { label: 'Wall Lamps', to: '/lighting/wall-lights' },
  { label: 'General light interior', to: '/lighting/general-light-interior' },
]

const support = [
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Shipping Policy', to: '/shipping' },
  { label: 'Returns', to: '/returns' },
  { label: 'FAQs', to: '/faqs' },
]
</script>
