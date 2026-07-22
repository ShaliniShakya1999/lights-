import type { FilterState, Product, SortOption } from '~/types/product'
import { products } from '~/data/products'

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatSavings(price: number, oldPrice?: number): string | null {
  if (!oldPrice || oldPrice <= price) return null
  const savings = oldPrice - price
  const percent = Math.round((savings / oldPrice) * 100)
  return `Save ${formatPrice(savings)} (${percent}% off)`
}

export function createDefaultFilters(category?: string): FilterState {
  return {
    categories: category ? [category] : [],
    priceRange: [0, 250000],
    brands: [],
    materials: [],
    finishes: [],
    colors: [],
    rooms: [],
    styles: [],
    bulbTypes: [],
    availability: [],
    search: '',
  }
}

function matchesFilters(product: Product, filters: FilterState): boolean {
  if (filters.search) {
    const q = filters.search.toLowerCase()
    const haystack = `${product.name} ${product.brand} ${product.category} ${product.material}`.toLowerCase()
    if (!haystack.includes(q)) return false
  }

  if (filters.categories.length && !filters.categories.includes(product.category)) return false
  if (filters.brands.length && !filters.brands.includes(product.brand)) return false
  if (filters.materials.length && !filters.materials.includes(product.material)) return false
  if (filters.finishes.length && !filters.finishes.includes(product.finish)) return false
  if (filters.bulbTypes.length && !filters.bulbTypes.includes(product.bulbType)) return false

  if (filters.colors.length) {
    const names = product.colors.map(c => c.name)
    if (!filters.colors.some(c => names.includes(c))) return false
  }

  if (filters.rooms.length && !filters.rooms.some(r => product.room.includes(r))) return false
  if (filters.styles.length && !filters.styles.some(s => product.style.includes(s))) return false

  if (filters.availability.length) {
    const wantsIn = filters.availability.includes('In Stock')
    const wantsOut = filters.availability.includes('Out of Stock')
    if (wantsIn && !wantsOut && !product.inStock) return false
    if (wantsOut && !wantsIn && product.inStock) return false
  }

  if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false

  return true
}

function sortProducts(list: Product[], sort: SortOption): Product[] {
  const sorted = [...list]
  switch (sort) {
    case 'newest':
      return sorted.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'bestselling':
      return sorted.sort((a, b) => Number(b.bestSelling) - Number(a.bestSelling) || b.reviewCount - a.reviewCount)
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    case 'featured':
    default:
      return sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating)
  }
}

export function useProductCatalog(options?: { defaultCategory?: string }) {
  const filters = useState<FilterState>('shop-filters', () => createDefaultFilters())
  const sortBy = useState<SortOption>('shop-sort', () => 'featured')
  const gridColumns = useState<2 | 3 | 4>('shop-grid', () => 3)
  const currentPage = useState('shop-page', () => 1)
  const pageSize = 9
  const isLoading = useState('shop-loading', () => false)

  if (options?.defaultCategory) {
    // Applied by page watch — avoid sticky stale category from previous visit
  }

  const filteredProducts = computed(() => {
    const matched = products.filter(p => matchesFilters(p, filters.value))
    return sortProducts(matched, sortBy.value)
  })

  const totalPages = computed(() => Math.max(1, Math.ceil(filteredProducts.value.length / pageSize)))

  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return filteredProducts.value.slice(start, start + pageSize)
  })

  const activeFilterCount = computed(() => {
    const f = filters.value
    let count = 0
    count += f.categories.length
    count += f.brands.length
    count += f.materials.length
    count += f.finishes.length
    count += f.colors.length
    count += f.rooms.length
    count += f.styles.length
    count += f.bulbTypes.length
    count += f.availability.length
    if (f.priceRange[0] > 0 || f.priceRange[1] < 250000) count += 1
    if (f.search) count += 1
    return count
  })

  function resetFilters(keepCategory = true) {
    const category = keepCategory && filters.value.categories[0] ? filters.value.categories[0] : undefined
    filters.value = createDefaultFilters(category)
    currentPage.value = 1
  }

  function setCategory(category?: string) {
    filters.value = {
      ...createDefaultFilters(category),
      search: filters.value.search,
    }
    currentPage.value = 1
  }

  function simulateLoading(ms = 350) {
    isLoading.value = true
    setTimeout(() => {
      isLoading.value = false
    }, ms)
  }

  watch([filters, sortBy], () => {
    currentPage.value = 1
    simulateLoading()
  }, { deep: true })

  return {
    filters,
    sortBy,
    gridColumns,
    currentPage,
    pageSize,
    isLoading,
    filteredProducts,
    paginatedProducts,
    totalPages,
    activeFilterCount,
    resetFilters,
    setCategory,
    simulateLoading,
    allProducts: products,
  }
}

export function useProduct(slug: MaybeRefOrGetter<string>) {
  const product = computed(() => {
    const s = toValue(slug)
    return products.find(p => p.slug === s) ?? null
  })

  const related = computed(() => {
    if (!product.value) return []
    return products
      .filter(p => p.id !== product.value!.id && (
        p.category === product.value!.category
        || p.style.some(s => product.value!.style.includes(s))
      ))
      .slice(0, 4)
  })

  return { product, related, allProducts: products }
}

export function useRecentlyViewed() {
  const recentIds = useState<string[]>('recently-viewed', () => [])

  function track(id: string) {
    recentIds.value = [id, ...recentIds.value.filter(x => x !== id)].slice(0, 8)
  }

  const recentProducts = computed(() =>
    recentIds.value
      .map(id => products.find(p => p.id === id))
      .filter((p): p is Product => Boolean(p)),
  )

  return { recentIds, recentProducts, track }
}

export function useWishlist() {
  const ids = useState<string[]>('wishlist-ids', () => [])

  function toggle(id: string) {
    if (ids.value.includes(id)) {
      ids.value = ids.value.filter(x => x !== id)
    }
    else {
      ids.value = [...ids.value, id]
    }
  }

  function has(id: string) {
    return ids.value.includes(id)
  }

  return { ids, toggle, has }
}

export function useCompare() {
  const ids = useState<string[]>('compare-ids', () => [])

  function toggle(id: string) {
    if (ids.value.includes(id)) {
      ids.value = ids.value.filter(x => x !== id)
    }
    else if (ids.value.length < 4) {
      ids.value = [...ids.value, id]
    }
  }

  function has(id: string) {
    return ids.value.includes(id)
  }

  return { ids, toggle, has }
}
