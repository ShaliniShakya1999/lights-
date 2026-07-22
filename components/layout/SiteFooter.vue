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
        <!-- Brand + Contact -->
        <div class="lg:col-span-4" data-animate="fade-up">
          <NuxtLink to="/" class="inline-flex" aria-label="DINMANS home">
            <img src="/logo.png" alt="DINMANS" class="h-11 w-auto brightness-110">
          </NuxtLink>
          <h4 class="mt-8 text-base font-semibold tracking-wide text-white">Contact us</h4>
          <ul class="mt-4 space-y-3 text-base text-white/80">
            <li>
              <span class="text-white/60">Phone: </span>
              <a href="tel:+919992121006" class="transition-colors hover:text-accent">9992121006</a>,
              <a href="tel:+917015638389" class="transition-colors hover:text-accent">7015638389</a>
            </li>
            <li>
              <p class="text-white/60">Need help or have a question?</p>
              <p class="mt-1">
                Contact us at:
                <a href="mailto:dinmanslightup@gmail.com" class="underline underline-offset-2 transition-colors hover:text-accent">
                  dinmanslightup@gmail.com
                </a>
              </p>
            </li>
            <li class="leading-relaxed">
              Southcity-1 Sector 30, Block-A<br>
              Near Six Element School, Opposite to<br>
              Signature Tower.<br>
              Gurugram – 122001
            </li>
          </ul>
        </div>

        <!-- Useful Links -->
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

        <!-- Support -->
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

        <!-- Newsletter -->
        <div class="lg:col-span-4" data-animate="fade-up" data-delay="0.15">
          <h4 class="text-base font-semibold tracking-wide text-white">Email Newsletter</h4>
          <p class="mt-4 text-base leading-relaxed text-white/75">
            Subscribe to our newsletter and get 10% off your first purchase
          </p>
          <form class="mt-5 flex flex-col gap-3 sm:flex-row" @submit.prevent="onSubscribe">
            <input
              v-model="email"
              type="email"
              required
              placeholder="Your email address"
              aria-label="Email"
              class="input-luxury flex-1 !bg-white/95"
            >
            <button type="submit" class="btn-primary shrink-0">
              {{ subscribed ? 'Subscribed' : 'Subscribe' }}
            </button>
          </form>
          <p class="mt-5 text-sm text-white/70">
            GSTIN: 06BDOPS3565G1Z4
          </p>
          <div class="mt-5 flex gap-3">
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
      </div>

      <div class="mt-14 flex flex-col gap-4 border-t border-white/20 pt-8 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
        <p class="text-sm text-white/65">
          Copyright © {{ year }} - Dinmans.com
        </p>
        <div class="flex flex-wrap justify-center gap-2 lg:justify-end">
          <span
            v-for="pay in payments"
            :key="pay"
            class="rounded-md border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-wider text-white/70"
          >
            {{ pay }}
          </span>
        </div>
        <div class="flex flex-wrap justify-center gap-3 text-xs text-white/60 lg:justify-end">
          <span>Secure Payment</span>
          <span>·</span>
          <span>Trusted Shipping</span>
          <span>·</span>
          <span>GSTIN Verified</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
const email = ref('')
const subscribed = ref(false)

function onSubscribe() {
  subscribed.value = true
}

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
