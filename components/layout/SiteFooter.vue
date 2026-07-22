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

    <div class="relative mx-auto max-w-[1440px] px-4 py-12 xs:px-5 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-12">
        <div class="lg:col-span-4" data-animate="fade-up">
          <NuxtLink to="/" class="inline-flex" aria-label="DINMANS home">
            <img src="/wite.png" alt="DINMANS" class="h-10 w-auto sm:h-12">
          </NuxtLink>

          <div class="mt-6 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm sm:mt-8 sm:p-5">
            <h4 class="text-base font-semibold tracking-wide text-white">Need Help?</h4>
            <p class="mt-2 text-sm text-white/70">
              Questions about products, orders, or installation — we’re here.
            </p>
            <ul class="mt-4 space-y-2 text-sm text-white/85">
              <li class="flex flex-wrap gap-x-1">
                <a href="tel:+919992121006" class="min-h-11 inline-flex items-center transition-colors hover:text-accent">9992121006</a>
                <span class="inline-flex items-center text-white/40">·</span>
                <a href="tel:+917015638389" class="min-h-11 inline-flex items-center transition-colors hover:text-accent">7015638389</a>
              </li>
              <li>
                <a
                  href="mailto:dinmanslightup@gmail.com"
                  class="break-all underline underline-offset-2 transition-colors hover:text-accent"
                >
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
          <ul class="mt-4 space-y-1 sm:mt-5 sm:space-y-3">
            <li v-for="item in usefulLinks" :key="item.label">
              <NuxtLink :to="item.to" class="inline-flex min-h-11 items-center text-sm text-white/75 transition-colors hover:text-accent sm:text-base">
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="lg:col-span-2" data-animate="fade-up" data-delay="0.1">
          <h4 class="text-base font-semibold tracking-wide text-white">Support</h4>
          <ul class="mt-4 space-y-1 sm:mt-5 sm:space-y-3">
            <li v-for="item in support" :key="item.label">
              <NuxtLink :to="item.to" class="inline-flex min-h-11 items-center text-sm text-white/75 transition-colors hover:text-accent sm:text-base">
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Follow Us — clean social UI -->
        <div class="sm:col-span-2 lg:col-span-4" data-animate="fade-up" data-delay="0.15">
          <h4 class="text-base font-semibold tracking-wide text-white">Follow Us</h4>
          <div class="mt-5 flex items-center gap-3">
            <a
              v-for="s in socials"
              :key="s.label"
              :href="s.href"
              class="group flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white/80 transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white hover:shadow-[0_8px_20px_rgba(232,120,42,0.35)]"
              :aria-label="s.label"
              target="_blank"
              rel="noopener noreferrer"
            >
              <component :is="s.icon" :size="17" stroke-width="1.75" />
            </a>
          </div>
          <p class="mt-6 text-sm tracking-wide text-white/60">
            GSTIN: <span class="text-white/80">06BDOPS3565G1Z4</span>
          </p>
        </div>
      </div>

      <div class="mt-10 flex flex-col items-center gap-4 border-t border-white/20 pt-8 text-center sm:mt-14 lg:flex-row lg:items-center lg:justify-between lg:text-left">
        <p class="text-sm text-white/65">
          Copyright © {{ year }} - Dinmans.com
        </p>
        <div class="flex flex-wrap items-center justify-center gap-2">
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
import { Facebook, Instagram, Youtube } from 'lucide-vue-next'
import { h } from 'vue'

/** Simple Pinterest mark (Lucide has no Pinterest icon) */
const PinterestIcon = (_props: { size?: number; strokeWidth?: number | string }) =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: _props.size ?? 17,
      height: _props.size ?? 17,
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      'aria-hidden': 'true',
    },
    [
      h('path', {
        d: 'M12 2C6.48 2 2 6.27 2 11.7c0 4.1 2.55 7.62 6.18 8.95-.09-.76-.16-1.93.03-2.76.17-.74 1.12-4.72 1.12-4.72s-.29-.57-.29-1.41c0-1.32.77-2.31 1.72-2.31.81 0 1.2.61 1.2 1.34 0 .82-.52 2.04-.79 3.17-.23.96.48 1.74 1.42 1.74 1.71 0 2.86-2.2 2.86-4.8 0-1.98-1.33-3.47-3.75-3.47-2.73 0-4.44 2.03-4.44 4.3 0 .78.23 1.33.6 1.76.07.08.08.15.06.23l-.22.9c-.04.14-.12.18-.27.11-1-.47-1.47-1.73-1.47-3.15 0-2.34 1.98-5.15 5.91-5.15 3.16 0 5.24 2.3 5.24 4.77 0 3.26-1.81 5.7-4.49 5.7-.9 0-1.74-.48-2.03-1.03l-.55 2.1c-.2.77-.59 1.54-.94 2.14A10.3 10.3 0 0 0 12 21.4c5.52 0 10-4.27 10-9.7C22 6.27 17.52 2 12 2z',
      }),
    ],
  )

const year = new Date().getFullYear()

const socials = [
  { label: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { label: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { label: 'Pinterest', icon: PinterestIcon, href: 'https://pinterest.com' },
  { label: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
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
