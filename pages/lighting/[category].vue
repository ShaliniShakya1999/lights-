<template>
  <div class="pb-28 lg:pb-16">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <ShopBreadcrumb :items="breadcrumbs" :count="filteredProducts.length" />

      <ShopCollectionBanner
        :title="bannerTitle"
        :subtitle="bannerSubtitle"
        :image="bannerImage"
      />

      <div id="products" class="mt-8 scroll-mt-28 lg:mt-10">
        <div
          class="sticky top-[72px] z-30 -mx-4 bg-background/90 px-4 py-3 backdrop-blur-xl sm:mx-0 sm:rounded-none sm:px-0 lg:top-[84px]"
          data-animate="fade-up"
        >
          <ShopProductToolbar
            :range="pageRange"
            :search="filters.search"
            :sort="sortBy"
            :columns="gridColumns"
            :view="viewMode"
            @update:search="filters.search = $event"
            @update:sort="sortBy = $event"
            @update:columns="gridColumns = $event"
            @update:view="viewMode = $event"
          />
        </div>

        <div class="mt-6 flex flex-col gap-8 lg:mt-8 lg:flex-row lg:items-start lg:gap-8 xl:gap-10">
          <div class="hidden w-[280px] shrink-0 lg:block xl:w-[300px]" data-animate="fade-right">
            <ShopFilterSidebar
              v-model="filters"
              :active-count="activeFilterCount"
              class="sticky top-40 max-h-[calc(100vh-11rem)] overflow-y-auto scrollbar-thin"
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
                :list="viewMode === 'list'"
                @quick-view="quickViewProduct = $event"
                @add-to-cart="onAddToCart"
                @quote="onQuote"
              />
              <ShopPagination
                v-model:page="currentPage"
                :total-pages="totalPages"
                :range="pageRange"
              />
            </template>
          </div>
        </div>
      </div>

      <div class="mt-16 space-y-16 lg:mt-20 lg:space-y-20">
        <ShopCategoryTrust />
        <ShopCategorySeo :category="categoryName" />
        <div data-animate="fade-up">
          <ShopRecentlyViewed :products="recentProducts" />
        </div>
        <ShopRelatedCategories />
      </div>
    </div>

    <!-- Mobile bottom sheet triggers -->
    <div class="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-border bg-white/95 p-3 backdrop-blur-xl lg:hidden">
      <button type="button" class="btn-secondary flex-1 !py-3" @click="filterOpen = true">
        <SlidersHorizontal :size="16" />
        Filter
        <span
          v-if="activeFilterCount"
          class="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] text-secondary"
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
        <option value="popularity">Popularity</option>
        <option value="bestselling">Best Selling</option>
        <option value="price-asc">Price ↑</option>
        <option value="price-desc">Price ↓</option>
        <option value="rating">Rating</option>
      </select>
      <button
        type="button"
        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-white"
        :aria-label="viewMode === 'grid' ? 'List view' : 'Grid view'"
        @click="viewMode = viewMode === 'grid' ? 'list' : 'grid'"
      >
        <List v-if="viewMode === 'grid'" :size="16" />
        <LayoutGrid v-else :size="16" />
      </button>
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
import { LayoutGrid, List, SlidersHorizontal } from 'lucide-vue-next'
import type { Product, SortOption } from '~/types/product'

definePageMeta({ layout: 'website' })

const route = useRoute()
const categorySlug = computed(() => String(route.params.category || 'chandeliers'))

const categoryMap: Record<string, string> = {
  'decorative-lighting': 'Decorative Lighting',
  chandeliers: 'Chandeliers',
  lamps: 'Lamps',
  'general-light-interior': 'General Light Interior',
  'cob-panel-track-lights': 'COB Panel Track Lights',
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
  viewMode,
  currentPage,
  pageRange,
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

const bannerTitle = computed(() => `Luxury ${categoryName.value}`)
const bannerSubtitle = computed(() =>
  `Elegant designer ${categoryName.value.toLowerCase()} crafted for modern interiors.`,
)
const bannerImage = computed(() => {
  const map: Record<string, string> = {
    'Decorative Lighting': '/homepages/slider_new1.jpg',
    Chandeliers: '/collection_1.jpg',
    Lamps: '/homepages/b2.jpg',
    'General Light Interior': '/homepages/a1.jpg',
    'COB Panel Track Lights': '/homepages/e5.jpg',
    'Ceiling Fans': '/homepages/c3.jpg',
    'Door-Bells-Wifi': '/homepages/d4.jpg',
    Gadgets: '/homepages/e5.jpg',
    'Pendant Lights': '/collection_2.jpg',
    'Floor Lamps': '/collection_3.jpg',
    'Wall Lights': '/homepages/a1.jpg',
    'Table Lamps': '/homepages/b2.jpg',
    'Ceiling Lights': '/homepages/f6.jpg',
    'Outdoor Lights': '/homepages/g7.jpg',
    'Track Lights': '/homepages/e5.jpg',
  }
  return map[categoryName.value] || '/hero_1.jpg'
})

function onAddToCart(product: Product) {
  cart.add(product.id, 1)
  toast.value = `${product.name} added to cart`
  setTimeout(() => { toast.value = '' }, 2500)
  quickViewProduct.value = null
}

function onQuote(product: Product) {
  toast.value = `Quote requested for ${product.name}`
  setTimeout(() => { toast.value = '' }, 2500)
}

useSeoMeta({
  title: () => `${categoryName.value} | DINMANS Luxury Lighting`,
  description: () => `Shop premium ${categoryName.value.toLowerCase()} — handcrafted luxury lighting for modern interiors.`,
  ogTitle: () => `Luxury ${categoryName.value} | DINMANS`,
  ogDescription: () => bannerSubtitle.value,
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
