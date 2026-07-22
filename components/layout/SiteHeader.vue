<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-500"
    :class="headerClass"
  >
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div class="flex h-16 lg:h-[76px] items-center justify-between gap-4">
        <NuxtLink to="/" class="group flex items-center shrink-0" aria-label="DINMANS home">
          <img
            src="/logo.png"
            alt="DINMANS — Inspiring All"
            class="h-10 w-auto sm:h-11 transition-transform duration-luxury group-hover:scale-[1.03]"
            :class="overHero ? 'brightness-110' : ''"
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
              class="nav-link-anim whitespace-nowrap rounded-full px-3 py-2 text-[11px] tracking-wide uppercase transition-colors duration-300"
              :class="navTextClass"
            >
              Products
            </button>
            <Transition name="mega">
              <div
                v-if="megaOpen"
                class="absolute left-1/2 top-full z-50 w-[720px] -translate-x-1/2 pt-3"
              >
                <div class="rounded-3xl border border-border bg-white p-6 shadow-luxury">
                  <div class="grid grid-cols-4 gap-4">
                    <NuxtLink
                      v-for="cat in megaCategories"
                      :key="cat.title"
                      :to="cat.to"
                      class="group/item rounded-2xl p-3 transition-colors hover:bg-accent-soft"
                      @click="megaOpen = false"
                    >
                      <div class="aspect-[4/3] overflow-hidden rounded-xl bg-background">
                        <img :src="cat.image" :alt="cat.title" class="h-full w-full object-cover transition-transform duration-500 group-hover/item:scale-105">
                      </div>
                      <p class="mt-3 text-sm font-medium text-text">{{ cat.title }}</p>
                      <p class="mt-0.5 text-[11px] text-text-muted">{{ cat.count }}</p>
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
            class="nav-link-anim whitespace-nowrap rounded-full px-2.5 py-2 text-[11px] tracking-wide uppercase transition-colors duration-300"
            :class="[navTextClass, isActive(link) ? 'is-active !text-accent font-medium' : '']"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            type="button"
            class="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-luxury"
            :class="iconBtnClass"
            aria-label="Search"
            @click="searchOpen = true"
          >
            <Search :size="18" />
          </button>
          <button
            type="button"
            class="relative flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-luxury"
            :class="iconBtnClass"
            aria-label="Wishlist"
          >
            <Heart :size="18" />
            <span
              v-if="wishlist.ids.value.length"
              class="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-secondary"
            >
              {{ wishlist.ids.value.length }}
            </span>
          </button>
          <button
            type="button"
            class="relative hidden sm:flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-luxury"
            :class="[iconBtnClass, compare.ids.value.length ? '!border-accent !text-accent' : '']"
            aria-label="Compare"
          >
            <GitCompareArrows :size="18" />
            <span
              v-if="compare.ids.value.length"
              class="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-secondary"
            >
              {{ compare.ids.value.length }}
            </span>
          </button>

          <div class="relative" @mouseenter="cartPreview = true" @mouseleave="cartPreview = false">
            <NuxtLink
              to="/cart"
              class="relative flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-luxury"
              :class="iconBtnClass"
              aria-label="Cart"
            >
              <ShoppingBag :size="18" />
              <span
                v-if="cart.count.value"
                class="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-secondary"
              >
                {{ cart.count.value }}
              </span>
            </NuxtLink>
            <Transition name="mega">
              <div
                v-if="cartPreview && cart.lines.value.length"
                class="absolute right-0 top-full z-50 w-80 pt-3"
              >
                <div class="rounded-3xl border border-border bg-white p-4 shadow-luxury">
                  <p class="text-sm font-medium text-text">Cart ({{ cart.count.value }})</p>
                  <ul class="mt-3 max-h-56 space-y-3 overflow-y-auto scrollbar-thin">
                    <li v-for="line in cart.lines.value.slice(0, 4)" :key="`${line.productId}-${line.color}`" class="flex gap-3">
                      <img :src="line.product.images[0]" :alt="line.product.name" class="h-14 w-14 rounded-xl object-cover">
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
            class="xl:hidden flex h-10 w-10 items-center justify-center rounded-full border"
            :class="iconBtnClass"
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
          <p class="px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-text-muted">Products</p>
          <NuxtLink
            v-for="cat in megaCategories"
            :key="cat.title"
            :to="cat.to"
            class="rounded-2xl px-4 py-3 text-sm text-text hover:bg-accent-soft hover:text-accent"
            @click="mobileOpen = false"
          >
            {{ cat.title }}
          </NuxtLink>
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

    <!-- Search popup -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="searchOpen"
          class="fixed inset-0 z-[90] flex items-start justify-center bg-black/45 px-4 pt-[12vh] backdrop-blur-sm"
          @click.self="searchOpen = false"
        >
          <div class="modal-panel w-full max-w-xl rounded-3xl bg-white p-6 shadow-luxury">
            <div class="flex items-center gap-3 rounded-2xl border border-border px-4 py-3">
              <Search :size="18" class="text-text-muted" />
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="search"
                placeholder="Search lighting, brands, rooms…"
                class="w-full bg-transparent text-sm outline-none"
                @keydown.esc="searchOpen = false"
              >
            </div>
            <div v-if="searchResults.length" class="mt-4 space-y-2">
              <NuxtLink
                v-for="p in searchResults"
                :key="p.id"
                :to="`/product/${p.slug}`"
                class="flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-accent-soft"
                @click="searchOpen = false"
              >
                <img :src="p.images[0]" :alt="p.name" class="h-12 w-12 rounded-xl object-cover">
                <div>
                  <p class="text-sm font-medium">{{ p.name }}</p>
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
  return 'bg-white/85 backdrop-blur-xl border-b border-border shadow-soft'
})

const navTextClass = computed(() =>
  overHero.value ? 'text-white/80 hover:text-accent' : 'text-text-muted hover:text-accent',
)

const iconBtnClass = computed(() =>
  overHero.value
    ? 'border-white/30 bg-white/10 text-white hover:border-accent hover:text-accent'
    : 'border-border bg-white text-text hover:border-accent hover:text-accent',
)

const navLinks = [
  { label: 'Chandeliers', to: '/lighting/chandeliers', match: '/lighting/chandeliers' },
  { label: 'About Us', to: '/about', match: '/about' },
  { label: 'Contact', to: '/contact', match: '/contact' },
  { label: 'Projects', to: '/projects', match: '/projects' },
]

const megaCategories = [
  { title: 'Chandeliers', to: '/lighting/chandeliers', image: '/collection_1.jpg', count: '48 pieces' },
  { title: 'Pendants', to: '/lighting/pendant-lights', image: '/collection_2.jpg', count: '62 pieces' },
  { title: 'Wall Lights', to: '/lighting/wall-lights', image: '/homepages/a1.jpg', count: '41 pieces' },
  { title: 'Floor Lamps', to: '/lighting/floor-lamps', image: '/collection_3.jpg', count: '35 pieces' },
]

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
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
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
</style>
