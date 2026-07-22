<template>
  <header
    class="sticky top-0 z-50 transition-all duration-luxury"
    :class="scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-border shadow-soft' : 'bg-background/95 backdrop-blur-md border-b border-transparent'"
  >
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="flex h-16 lg:h-[72px] items-center justify-between gap-4">
        <NuxtLink to="/" class="group flex items-center shrink-0" aria-label="DINMANS home">
          <img
            src="/logo.png"
            alt="DINMANS — Inspiring All"
            class="h-10 w-auto sm:h-11 transition-transform duration-luxury group-hover:scale-[1.03]"
          >
        </NuxtLink>

        <nav class="hidden xl:flex flex-1 items-center justify-center gap-0.5 min-w-0">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.label"
            :to="link.to"
            custom
            v-slot="{ href, navigate }"
          >
            <a
              :href="href"
              class="nav-link-anim whitespace-nowrap rounded-full px-2.5 py-2 text-[11px] tracking-wide uppercase transition-colors duration-300 hover:text-accent"
              :class="isActive(link) ? 'is-active text-accent font-medium' : 'text-text-muted'"
              @click="navigate"
            >
              {{ link.label }}
            </a>
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            type="button"
            class="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-text transition-all duration-luxury hover:border-accent hover:text-accent"
            aria-label="Search"
          >
            <Search :size="18" />
          </button>
          <button
            type="button"
            class="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-text transition-all duration-luxury hover:border-accent hover:text-accent"
            aria-label="Wishlist"
          >
            <Heart :size="18" />
            <span
              v-if="wishlist.ids.value.length"
              class="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-white"
            >
              {{ wishlist.ids.value.length }}
            </span>
          </button>
          <NuxtLink
            to="/cart"
            class="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-text transition-all duration-luxury hover:border-accent hover:text-accent"
            aria-label="Cart"
          >
            <ShoppingBag :size="18" />
            <span
              v-if="cart.count.value"
              class="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-white"
            >
              {{ cart.count.value }}
            </span>
          </NuxtLink>
          <button
            type="button"
            class="xl:hidden flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white"
            aria-label="Menu"
            @click="mobileOpen = !mobileOpen"
          >
            <Menu v-if="!mobileOpen" :size="18" />
            <X v-else :size="18" />
          </button>
        </div>
      </div>
    </div>

    <Transition name="slide-fade">
      <div v-if="mobileOpen" class="xl:hidden border-t border-border bg-white">
        <nav class="mx-auto max-w-[1440px] px-4 py-4 flex flex-col gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.label"
            :to="link.to"
            class="rounded-2xl px-4 py-3 text-sm uppercase tracking-wide text-text hover:bg-accent-soft hover:text-accent"
            @click="mobileOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-vue-next'

const route = useRoute()
const wishlist = useWishlist()
const cart = useCart()
const scrolled = ref(false)
const mobileOpen = ref(false)

const navLinks = [
  { label: 'Decorative Lighting', to: '/lighting/decorative-lighting', match: '/lighting/decorative-lighting' },
  { label: 'Chandeliers', to: '/lighting/chandeliers', match: '/lighting/chandeliers' },
  { label: 'Ceiling Fans', to: '/lighting/ceiling-fans', match: '/lighting/ceiling-fans' },
  { label: 'Door-Bells-Wifi', to: '/lighting/door-bells-wifi', match: '/lighting/door-bells-wifi' },
  { label: 'Gadgets', to: '/lighting/gadgets', match: '/lighting/gadgets' },
  { label: 'About Us', to: '/about', match: '/about' },
  { label: 'Contact', to: '/contact', match: '/contact' },
  { label: 'Checkout', to: '/checkout', match: '/checkout' },
]

function isActive(link: (typeof navLinks)[number]) {
  return route.path === link.match || route.path.startsWith(`${link.match}/`)
}

onMounted(() => {
  const onScroll = () => {
    scrolled.value = window.scrollY > 12
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})
</script>
