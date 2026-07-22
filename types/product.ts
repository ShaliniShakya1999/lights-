export type ProductBadge = 'luxury' | 'bestseller' | 'new' | 'sale'

export type ProductColor = {
  name: string
  hex: string
}

export type ProductSize = {
  label: string
  value: string
}

export type ProductReview = {
  id: string
  author: string
  avatar: string
  rating: number
  date: string
  title: string
  content: string
  verified: boolean
  images?: string[]
}

export type ProductFAQ = {
  question: string
  answer: string
}

export type ProductSpec = {
  label: string
  value: string
}

export type Product = {
  id: string
  slug: string
  name: string
  brand: string
  sku: string
  category: string
  subcategory?: string
  price: number
  oldPrice?: number
  rating: number
  reviewCount: number
  images: string[]
  hoverImage?: string
  video?: string
  badges: ProductBadge[]
  colors: ProductColor[]
  sizes?: ProductSize[]
  material: string
  finish: string
  bulbType: string
  wattage: string
  lightColor: string
  room: string[]
  style: string[]
  inStock: boolean
  stockCount: number
  deliveryDays: string
  warranty: string
  returnPolicy: string
  installation: string
  description: string
  highlights: string[]
  specs: ProductSpec[]
  reviews: ProductReview[]
  faqs: ProductFAQ[]
  emiFrom: number
  featured?: boolean
  bestSelling?: boolean
  createdAt: string
}

export type CartItem = {
  productId: string
  qty: number
  color?: string
  size?: string
}

export type SortOption =
  | 'featured'
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'bestselling'
  | 'rating'

export type GridColumns = 2 | 3 | 4

export type FilterState = {
  categories: string[]
  priceRange: [number, number]
  brands: string[]
  materials: string[]
  finishes: string[]
  colors: string[]
  rooms: string[]
  styles: string[]
  bulbTypes: string[]
  availability: string[]
  search: string
}
