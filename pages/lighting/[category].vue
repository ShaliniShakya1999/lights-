<template>
  <div class="pb-24 lg:pb-16">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <ShopBreadcrumb :items="breadcrumbs" />
      <ShopCollectionBanner
        :title="bannerTitle"
        :subtitle="bannerSubtitle"
        :image="bannerImage"
      />

      <div id="products" class="mt-8 scroll-mt-28 lg:mt-10">
        <div
          class="sticky top-16 z-30 -mx-4 bg-background/95 px-4 py-3 backdrop-blur-md sm:mx-0 sm:px-0 lg:static lg:bg-transparent lg:py-0 lg:backdrop-blur-none"
          data-animate="fade-up"
        >
          <ShopProductToolbar
            :count="filteredProducts.length"
            :search="filters.search"
            :sort="sortBy"
            :columns="gridColumns"
            @update:search="filters.search = $event"
            @update:sort="sortBy = $event"
            @update:columns="gridColumns = $event"
          />
        </div>

        <div class="mt-6 flex flex-col gap-8 lg:mt-8 lg:flex-row lg:items-start lg:gap-8 xl:gap-10">
          <div class="hidden w-[280px] shrink-0 lg:block xl:w-[300px]" data-animate="fade-right">
            <ShopFilterSidebar
              v-model="filters"
              :active-count="activeFilterCount"
              class="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin"
              @clear="onClearFilters"
            />
          </div>

          <div class="min-w-0 flex-1 space-y-10" data-animate="fade-left">
            <ShopProductSkeleton v-if="isLoading" :columns="gridColumns" />

            <ShopEmptyState
              v-else-if="!paginatedProducts.length"
              @reset="onClearFilters"
            />

            <template v-else>
              <ShopProductGrid
                :products="paginatedProducts"
                :columns="gridColumns"
                @quick-view="quickViewProduct = $event"
                @add-to-cart="onAddToCart"
              />
              <ShopPagination
                v-model:page="currentPage"
                :total-pages="totalPages"
              />
            </template>
          </div>
        </div>
      </div>

      <div class="mt-20 space-y-20">
        <div data-animate="fade-up">
          <ShopRecentlyViewed :products="recentProducts" />
        </div>
        <ShopRelatedCategories />
        <ShopInspirationBanner />
      </div>
    </div>

    <!-- Mobile sticky filter / sort -->
    <div class="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-border bg-white/95 p-3 backdrop-blur-xl lg:hidden">
      <button type="button" class="btn-secondary flex-1 !py-3" @click="filterOpen = true">
        <SlidersHorizontal :size="16" />
        Filters
        <span
          v-if="activeFilterCount"
          class="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] text-white"
        >
          {{ activeFilterCount }}
        </span>
      </button>
      <select
        :value="sortBy"
        class="input-luxury flex-1 !rounded-full !py-3 cursor-pointer"
        @change="sortBy = ($event.target as HTMLSelectElement).value as SortOption"
      >
        <option value="featured">Featured</option>
        <option value="newest">Newest</option>
        <option value="price-asc">Price ↑</option>
        <option value="price-desc">Price ↓</option>
        <option value="bestselling">Best Selling</option>
        <option value="rating">Top Rated</option>
      </select>
    </div>

    <ShopMobileFilterDrawer
      :open="filterOpen"
      :model-value="filters"
      :active-count="activeFilterCount"
      @close="filterOpen = false"
      @clear="onClearFilters"
      @update:model-value="filters = $event"
    />

    <ShopQuickViewModal
      :product="quickViewProduct"
      @close="quickViewProduct = null"
      @add-to-cart="onAddToCart"
    />

    <Transition name="fade">
      <div
        v-if="toast"
        class="fixed bottom-24 left-1/2 z-[90] -translate-x-1/2 rounded-full bg-secondary px-5 py-3 text-sm text-white shadow-luxury lg:bottom-8"
      >
        {{ toast }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { SlidersHorizontal } from 'lucide-vue-next'
import type { Product, SortOption } from '~/types/product'

definePageMeta({ layout: 'website' })

const route = useRoute()
const categorySlug = computed(() => String(route.params.category || 'chandeliers'))

const categoryMap: Record<string, string> = {
  'decorative-lighting': 'Decorative Lighting',
  chandeliers: 'Chandeliers',
  'ceiling-fans': 'Ceiling Fans',
  'door-bells-wifi': 'Door-Bells-Wifi',
  gadgets: 'Gadgets',
  'pendant-lights': 'Pendant Lights',
  'table-lamps': 'Table Lamps',
  'floor-lamps': 'Floor Lamps',
  'wall-lights': 'Wall Lights',
  'ceiling-lights': 'Ceiling Lights',
  'track-lights': 'Track Lights',
  'cob-lights': 'COB Lights',
  'outdoor-lights': 'Outdoor Lights',
}

const categoryName = computed(() => categoryMap[categorySlug.value] || 'Chandeliers')

const {
  filters,
  sortBy,
  gridColumns,
  currentPage,
  isLoading,
  filteredProducts,
  paginatedProducts,
  totalPages,
  activeFilterCount,
  resetFilters,
} = useProductCatalog()

const { recentProducts } = useRecentlyViewed()
const cart = useCart()

const filterOpen = ref(false)
const quickViewProduct = ref<Product | null>(null)
const toast = ref('')

// Always start category pages with the full lighting catalog visible.
// Category context comes from the banner; sidebar filters are user-driven.
watch(categorySlug, () => {
  resetFilters(false)
}, { immediate: true })

watch(isLoading, (loading) => {
  if (!loading) {
    nextTick(() => {
      const { $animatePage } = useNuxtApp()
      // @ts-expect-error provided by animations plugin
      $animatePage?.()
    })
  }
})

function onClearFilters() {
  resetFilters(false)
}

const breadcrumbs = computed(() => [
  { label: 'Home', to: '/' },
  { label: 'Lighting', to: '/lighting/chandeliers' },
  { label: categoryName.value },
])

const bannerTitle = computed(() => `Luxury ${categoryName.value} Collection`)
const bannerSubtitle = 'Discover premium handcrafted lighting collections for modern interiors.'
const bannerImage = computed(() => {
  const map: Record<string, string> = {
    'Decorative Lighting': '/homepages/slider_new1.jpg',
    Chandeliers: '/collection_1.jpg',
    'Ceiling Fans': '/homepages/c3.jpg',
    'Door-Bells-Wifi': '/homepages/d4.jpg',
    Gadgets: '/homepages/e5.jpg',
    'Pendant Lights': '/collection_2.jpg',
    'Floor Lamps': '/collection_3.jpg',
    'Wall Lights': '/homepages/a1.jpg',
  }
  return map[categoryName.value] || '/hero_1.jpg'
})

function onAddToCart(product: Product) {
  cart.add(product.id, 1)
  toast.value = `${product.name} added to cart`
  setTimeout(() => { toast.value = '' }, 2500)
  quickViewProduct.value = null
}

useSeoMeta({
  title: () => `${categoryName.value} | DINMANS Luxury Lighting`,
  description: () => `Shop premium ${categoryName.value.toLowerCase()} — handcrafted luxury lighting for modern interiors.`,
  ogTitle: () => `Luxury ${categoryName.value} Collection | DINMANS`,
  ogDescription: () => bannerSubtitle,
  ogImage: () => bannerImage.value,
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 8px);
}
</style>
