<template>
  <div v-if="product" class="pb-28 lg:pb-16">
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <ShopBreadcrumb :items="breadcrumbs" />

      <div class="grid gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
        <div data-animate="fade-right">
          <ProductGallery :product="product" />
        </div>
        <div data-animate="fade-left" data-delay="0.12">
          <ProductInfo
            v-model:qty="qty"
            :product="product"
            @add-to-cart="onAddToCart"
            @buy-now="onBuyNow"
          />
        </div>
      </div>

      <div class="mt-12 space-y-16 sm:mt-16 sm:space-y-20">
        <div data-animate="fade-up">
          <ProductTabs :product="product" />
        </div>
        <div data-animate="fade-up">
          <ProductReviews :product="product" />
        </div>
        <div data-animate="fade-up">
          <ProductFAQ :faqs="product.faqs" />
        </div>
        <div data-animate="fade-up">
          <ProductRelatedProducts :products="related" />
        </div>
        <div data-animate="fade-up">
          <ShopRecentlyViewed :products="otherRecent" />
        </div>
        <ProductInteriorInspiration />
      </div>
    </div>

    <ProductStickyCartBar
      :product="product"
      :visible="showStickyBar"
      @add-to-cart="onAddToCart"
      @buy-now="onBuyNow"
      @wishlist="wishlist.toggle(product.id)"
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

  <div v-else class="mx-auto max-w-[1440px] px-4 py-32 text-center">
    <h1 class="heading-page">Product Not Found</h1>
    <p class="mt-4 text-text-muted">This lighting piece may have been moved or retired.</p>
    <NuxtLink to="/lighting/chandeliers" class="btn-primary mt-8 inline-flex">
      Browse Collection
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'website' })

const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { product, related } = useProduct(slug)
const { recentProducts, track } = useRecentlyViewed()
const wishlist = useWishlist()
const cart = useCart()
const router = useRouter()

const qty = ref(1)
const toast = ref('')
const showStickyBar = ref(false)

const otherRecent = computed(() =>
  recentProducts.value.filter(p => p.id !== product.value?.id),
)

const breadcrumbs = computed(() => {
  if (!product.value) return [{ label: 'Home', to: '/' }]
  const catSlug = product.value.category.toLowerCase().replace(/\s+/g, '-')
  return [
    { label: 'Home', to: '/' },
    { label: 'Lighting', to: '/lighting/chandeliers' },
    { label: product.value.category, to: `/lighting/${catSlug}` },
    { label: product.value.name },
  ]
})

watch(product, (p) => {
  if (p) track(p.id)
}, { immediate: true })

onMounted(() => {
  const onScroll = () => {
    showStickyBar.value = window.scrollY > 700
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})

function onAddToCart(options?: { color?: string; size?: string }) {
  if (!product.value) return
  cart.add(product.value.id, qty.value, options)
  toast.value = `${product.value.name} × ${qty.value} added to cart`
  setTimeout(() => { toast.value = '' }, 2500)
}

function onBuyNow(options?: { color?: string; size?: string }) {
  if (!product.value) return
  cart.add(product.value.id, qty.value, options)
  router.push('/checkout')
}

useSeoMeta({
  title: () => product.value
    ? `${product.value.name} | ${product.value.brand} | DINMANS`
    : 'Product | DINMANS',
  description: () => product.value?.description ?? '',
  ogTitle: () => product.value?.name,
  ogDescription: () => product.value?.description,
  ogImage: () => product.value?.images[0],
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
