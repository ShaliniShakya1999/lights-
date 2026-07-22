<template>
  <header
    class="sticky top-0 z-50 transition-all duration-luxury"
    :class="scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-border shadow-soft' : 'bg-background/95 backdrop-blur-md border-b border-transparent'"
  >
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="flex h-16 lg:h-[72px] items-center justify-between gap-6">
        <NuxtLink to="/" class="group flex items-center gap-2.5 shrink-0">
          <span class="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-white transition-transform duration-luxury group-hover:scale-105">
            <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M12 2L9 9H2l5.5 4.2L5 21l7-4.8L19 21l-2.5-7.8L22 9h-7L12 2z" />
            </svg>
          </span>
          <span class="font-playfair text-2xl tracking-tight text-text">Lampe</span>
        </NuxtLink>

        <nav class="hidden lg:flex items-center gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.label"
            :to="link.to"
            custom
            v-slot="{ href, navigate }"
          >
            <a
              :href="href"
              class="nav-link-anim rounded-full px-4 py-2 text-sm transition-colors duration-300 hover:text-accent"
              :class="isActive(link) ? 'is-active text-accent font-medium' : 'text-text-muted'"
              @click="navigate"
            >
              {{ link.label }}
            </a>
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-2 sm:gap-2.5">
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
          <button
            type="button"
            class="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-text transition-all duration-luxury hover:border-accent hover:text-accent"
            aria-label="Cart"
          >
            <ShoppingBag :size="18" />
          </button>
          <button
            type="button"
            class="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white"
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
      <div v-if="mobileOpen" class="lg:hidden border-t border-border bg-white">
        <nav class="mx-auto max-w-[1440px] px-4 py-4 flex flex-col gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.label"
            :to="link.to"
            class="rounded-2xl px-4 py-3 text-sm text-text hover:bg-accent-soft hover:text-accent"
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
const scrolled = ref(false)
const mobileOpen = ref(false)

const navLinks = [
  { label: 'Collections', to: '/lighting/chandeliers', match: '/lighting' },
  { label: 'Chandeliers', to: '/lighting/chandeliers', match: '/lighting/chandeliers' },
  { label: 'Pendants', to: '/lighting/pendant-lights', match: '/lighting/pendant-lights' },
  { label: 'Inspiration', to: '/lighting/chandeliers#inspiration', match: '#inspiration' },
  { label: 'About', to: '/', match: 'about' },
]

function isActive(link: (typeof navLinks)[number]) {
  if (link.label === 'Collections') {
    return route.path.startsWith('/lighting') && route.path !== '/lighting/chandeliers' && route.path !== '/lighting/pendant-lights'
  }
  if (link.label === 'Chandeliers') return route.path === '/lighting/chandeliers'
  if (link.label === 'Pendants') return route.path === '/lighting/pendant-lights'
  if (link.label === 'Inspiration') return false
  if (link.label === 'About') return route.path === '/'
  return false
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
