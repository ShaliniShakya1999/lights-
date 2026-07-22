<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-500"
    :class="headerClass"
  >
    <div class="mx-auto max-w-[1440px] px-3 xs:px-4 sm:px-6 lg:px-10">
      <div
        class="flex items-center justify-between gap-2 xs:gap-3 sm:gap-4 transition-[height] duration-500 ease-out"
        :class="navBarHeight"
      >
        <NuxtLink to="/" class="group flex items-center shrink-0" aria-label="DINMANS home">
          <img
            :src="overHero ? '/wite.png' : '/logo.png'"
            alt="DINMANS — Inspiring All"
            class="h-9 w-auto xs:h-10 sm:h-12 lg:h-14 transition-transform duration-luxury group-hover:scale-[1.03]"
            width="160"
            height="56"
          >
        </NuxtLink>

        <nav class="hidden xl:flex flex-1 items-center justify-center gap-1 min-w-0">
          <div
            class="relative"
            @mouseenter="megaOpen = true"
            @mouseleave="megaOpen = false"
          >
            <button
              type="button"
              class="nav-link-anim whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold tracking-[0.12em] uppercase transition-colors duration-300"
              :class="navTextClass"
              :aria-expanded="megaOpen"
              aria-haspopup="true"
            >
              Products
            </button>
            <Transition name="mega">
              <div
                v-if="megaOpen"
                class="absolute left-1/2 top-full z-50 w-[min(720px,calc(100vw-2rem))] -translate-x-1/2 pt-3"
              >
                <div class="rounded-3xl border border-border bg-white p-4 sm:p-6 shadow-luxury">
                  <div class="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                    <NuxtLink
                      v-for="cat in megaCategories"
                      :key="cat.title"
                      :to="cat.to"
                      class="group/item rounded-2xl p-3 transition-colors hover:bg-accent-soft"
                      @click="megaOpen = false"
                    >
                      <div class="aspect-[4/3] overflow-hidden rounded-xl bg-background">
                        <img
                          :src="cat.image"
                          :alt="cat.title"
                          class="h-full w-full object-cover transition-transform duration-500 group-hover/item:scale-105"
                          loading="lazy"
                        >
                      </div>
                      <p class="mt-3 text-sm font-medium text-text">{{ cat.title }}</p>
                      <p class="mt-0.5 text-[11px] text-text-muted line-clamp-1">{{ cat.subtitle }}</p>
                      <p class="mt-1 text-[11px] text-accent">{{ cat.count }}</p>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </Transition>
          </div>

          <NuxtLink
            v-for="link in navLinks"
            :key="link.label"
            :to="link.to"
            class="nav-link-anim whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold tracking-[0.12em] uppercase transition-colors duration-300"
            :class="[navTextClass, isActive(link) ? 'is-active !text-accent' : '']"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 shrink-0">
          <button
            type="button"
            class="flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-luxury"
            :class="iconBtnClass"
            aria-label="Search"
            @click="searchOpen = true"
          >
            <Search :size="18" />
          </button>
          <NuxtLink
            to="/wishlist"
            class="relative flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 hover:scale-110"
            :class="iconBtnClass"
            aria-label="Wishlist"
          >
            <Heart :size="18" />
            <span
              v-if="wishlist.ids.value.length"
              class="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-white"
            >
              {{ wishlist.ids.value.length }}
            </span>
          </NuxtLink>
          <button
            type="button"
            class="relative hidden sm:flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-luxury"
            :class="[iconBtnClass, compare.ids.value.length ? '!border-accent !text-accent' : '']"
            aria-label="Compare"
          >
            <GitCompareArrows :size="18" />
            <span
              v-if="compare.ids.value.length"
              class="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-white"
            >
              {{ compare.ids.value.length }}
            </span>
          </button>

          <div class="relative" @mouseenter="cartPreview = true" @mouseleave="cartPreview = false">
            <NuxtLink
              to="/cart"
              class="relative flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-luxury"
              :class="iconBtnClass"
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
            <Transition name="mega">
              <div
                v-if="cartPreview && cart.lines.value.length"
                class="absolute right-0 top-full z-50 w-[min(20rem,calc(100vw-1.5rem))] pt-3"
              >
                <div class="rounded-3xl border border-border bg-white p-4 shadow-luxury">
                  <p class="text-sm font-medium text-text">Cart ({{ cart.count.value }})</p>
                  <ul class="mt-3 max-h-56 space-y-3 overflow-y-auto scrollbar-thin">
                    <li v-for="line in cart.lines.value.slice(0, 4)" :key="`${line.productId}-${line.color}`" class="flex gap-3">
                      <img :src="line.product.images[0]" :alt="line.product.name" class="h-14 w-14 rounded-xl object-cover shrink-0">
                      <div class="min-w-0 flex-1">
                        <p class="truncate text-sm text-text">{{ line.product.name }}</p>
                        <p class="mt-0.5 text-xs text-text-muted">Qty {{ line.qty }} · {{ formatPrice(line.lineTotal) }}</p>
                      </div>
                    </li>
                  </ul>
                  <div class="mt-4 flex justify-between border-t border-border pt-3 text-sm">
                    <span class="text-text-muted">Subtotal</span>
                    <span class="font-medium">{{ formatPrice(cart.subtotal.value) }}</span>
                  </div>
                  <div class="mt-3 grid grid-cols-2 gap-2">
                    <NuxtLink to="/cart" class="btn-ghost !py-2.5 !text-xs">View Cart</NuxtLink>
                    <NuxtLink to="/checkout" class="btn-primary !py-2.5 !text-xs">Checkout</NuxtLink>
                  </div>
                </div>
              </div>
            </Transition>
          </div>

          <button
            type="button"
            class="xl:hidden flex h-11 w-11 items-center justify-center rounded-full border"
            :class="iconBtnClass"
            :aria-expanded="mobileOpen"
            aria-label="Menu"
            @click="mobileOpen = !mobileOpen"
          >
            <Menu v-if="!mobileOpen" :size="18" />
            <X v-else :size="18" />
          </button>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="mobile-drawer">
        <div
          v-if="mobileOpen"
          class="fixed inset-0 z-[80] xl:hidden"
        >
          <button
            type="button"
            class="absolute inset-0 bg-black/45 backdrop-blur-sm"
            aria-label="Close menu"
            @click="mobileOpen = false"
          />
          <div
            class="drawer-panel absolute inset-y-0 right-0 flex w-[min(22rem,100%)] flex-col bg-white shadow-luxury"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div class="flex items-center justify-between border-b border-border px-5 py-4">
              <img src="/logo.png" alt="DINMANS" class="h-9 w-auto">
              <button
                type="button"
                class="flex h-11 w-11 items-center justify-center rounded-full border border-border"
                aria-label="Close menu"
                @click="mobileOpen = false"
              >
                <X :size="18" />
              </button>
            </div>
            <nav class="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin">
              <p class="px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-text-muted">Products</p>
              <NuxtLink
                v-for="cat in megaCategories"
                :key="cat.title"
                :to="cat.to"
                class="flex min-h-11 items-center rounded-2xl px-3 py-3 text-sm text-text hover:bg-accent-soft hover:text-accent"
                @click="mobileOpen = false"
              >
                {{ cat.title }}
              </NuxtLink>
              <div class="my-3 border-t border-border" />
              <NuxtLink
                v-for="link in navLinks"
                :key="link.label"
                :to="link.to"
                class="flex min-h-11 items-center rounded-2xl px-3 py-3 text-sm uppercase tracking-wide text-text hover:bg-accent-soft hover:text-accent"
                @click="mobileOpen = false"
              >
                {{ link.label }}
              </NuxtLink>
              <button
                type="button"
                class="mt-2 flex min-h-11 w-full items-center gap-2 rounded-2xl px-3 py-3 text-left text-sm text-text hover:bg-accent-soft hover:text-accent"
                @click="openSearchFromMenu"
              >
                <Search :size="16" />
                Search
              </button>
            </nav>
          </div>
        </div>
      </Transition>
    </Teleport>

    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="searchOpen"
          class="fixed inset-0 z-[90] flex items-start justify-center bg-black/45 px-3 pt-[10vh] backdrop-blur-sm xs:px-4 sm:pt-[12vh]"
          @click.self="searchOpen = false"
        >
          <div class="modal-panel w-full max-w-xl rounded-2xl bg-white p-4 shadow-luxury sm:rounded-3xl sm:p-6">
            <div class="flex items-center gap-3 rounded-2xl border border-border px-4 py-3">
              <Search :size="18" class="shrink-0 text-text-muted" />
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="search"
                placeholder="Search lighting, brands, rooms…"
                class="w-full min-w-0 bg-transparent text-sm outline-none"
                @keydown.esc="searchOpen = false"
              >
            </div>
            <div v-if="searchResults.length" class="mt-4 max-h-[50vh] space-y-2 overflow-y-auto scrollbar-thin">
              <NuxtLink
                v-for="p in searchResults"
                :key="p.id"
                :to="`/product/${p.slug}`"
                class="flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-accent-soft"
                @click="searchOpen = false"
              >
                <img :src="p.images[0]" :alt="p.name" class="h-12 w-12 shrink-0 rounded-xl object-cover">
                <div class="min-w-0">
                  <p class="truncate text-sm font-medium">{{ p.name }}</p>
                  <p class="text-xs text-text-muted">{{ formatPrice(p.price) }}</p>
                </div>
              </NuxtLink>
            </div>
            <p v-else-if="searchQuery" class="mt-4 text-sm text-text-muted">No products found.</p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import { GitCompareArrows, Heart, Menu, Search, ShoppingBag, X } from 'lucide-vue-next'
import { products } from '~/data/products'
import { productCategories } from '~/data/product-categories'
import { formatPrice } from '~/composables/useProducts'

const route = useRoute()
const wishlist = useWishlist()
const compare = useCompare()
const cart = useCart()

const scrolled = ref(false)
const mobileOpen = ref(false)
const megaOpen = ref(false)
const cartPreview = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)

const isHome = computed(() => route.path === '/')
const overHero = computed(() => isHome.value && !scrolled.value)

const headerClass = computed(() => {
  if (overHero.value) return 'bg-transparent border-b border-transparent'
  return 'bg-white/90 backdrop-blur-2xl border-b border-border/80 shadow-glass'
})

const navBarHeight = computed(() =>
  scrolled.value
    ? 'h-14 sm:h-16 lg:h-[72px]'
    : 'h-16 sm:h-[72px] lg:h-[84px]',
)

const navTextClass = computed(() =>
  overHero.value
    ? 'text-white font-semibold hover:text-accent drop-shadow-sm'
    : 'text-text font-semibold hover:text-accent',
)

const iconBtnClass = computed(() =>
  overHero.value
    ? 'border-white/30 bg-white/10 text-white hover:border-accent hover:text-accent'
    : 'border-border bg-white text-text hover:border-accent hover:text-accent',
)

const navLinks = [
  { label: 'About Us', to: '/about', match: '/about' },
  { label: 'Contact', to: '/contact', match: '/contact' },
  { label: 'Gallery', to: '/projects', match: '/projects' },
]

const megaCategories = productCategories.map(cat => ({
  title: cat.title,
  to: cat.to,
  image: cat.image,
  count: `${cat.count} Products`,
  subtitle: cat.subtitle,
}))

const searchResults = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return []
  return products.filter(p =>
    `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q),
  ).slice(0, 6)
})

function isActive(link: (typeof navLinks)[number]) {
  return route.path === link.match || route.path.startsWith(`${link.match}/`)
}

function openSearchFromMenu() {
  mobileOpen.value = false
  searchOpen.value = true
}

watch(() => route.fullPath, () => {
  mobileOpen.value = false
  megaOpen.value = false
  searchOpen.value = false
})

watch(mobileOpen, (open) => {
  if (import.meta.client) {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})

watch(searchOpen, async (open) => {
  if (open) {
    await nextTick()
    searchInput.value?.focus()
  }
  else {
    searchQuery.value = ''
  }
})

onMounted(() => {
  const onScroll = () => {
    scrolled.value = window.scrollY > 24
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    document.body.style.overflow = ''
  })
})
</script>

<style scoped>
.mega-enter-active,
.mega-leave-active {
  transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.mega-enter-from,
.mega-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.mobile-drawer-enter-active,
.mobile-drawer-leave-active {
  transition: opacity 0.3s ease;
}
.mobile-drawer-enter-active .drawer-panel,
.mobile-drawer-leave-active .drawer-panel {
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.mobile-drawer-enter-from,
.mobile-drawer-leave-to {
  opacity: 0;
}
.mobile-drawer-enter-from .drawer-panel,
.mobile-drawer-leave-to .drawer-panel {
  transform: translateX(100%);
}
</style>
