<template>
  <header 
    class="fixed top-0 left-0 w-full z-50 transition-all duration-500"
    :class="[isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6']"
  >
    <div class="container mx-auto px-6 lg:px-12">
      <div class="flex items-center justify-between">
        
        <!-- Mobile Menu Toggle -->
        <button class="lg:hidden text-charcoal hover:text-gold transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Navigation (Desktop) -->
        <nav class="hidden lg:flex items-center space-x-8">
          <NuxtLink to="/" class="text-sm uppercase tracking-widest font-medium hover:text-gold transition-colors">Collections</NuxtLink>
          <div class="relative group">
            <button class="text-sm uppercase tracking-widest font-medium hover:text-gold transition-colors flex items-center">
              Lighting
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <!-- Mega Menu -->
            <div class="absolute top-full left-0 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 w-[600px]">
              <div class="bg-white shadow-luxury rounded-xl p-8 border border-gray-100 grid grid-cols-2 gap-8">
                <div>
                  <h4 class="font-playfair text-xl mb-4 border-b border-gray-100 pb-2">By Category</h4>
                  <ul class="space-y-3">
                    <li><NuxtLink to="#" class="text-gray-600 hover:text-gold transition-colors">Chandeliers</NuxtLink></li>
                    <li><NuxtLink to="#" class="text-gray-600 hover:text-gold transition-colors">Pendant Lights</NuxtLink></li>
                    <li><NuxtLink to="#" class="text-gray-600 hover:text-gold transition-colors">Wall Lights</NuxtLink></li>
                    <li><NuxtLink to="#" class="text-gray-600 hover:text-gold transition-colors">Floor Lamps</NuxtLink></li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-playfair text-xl mb-4 border-b border-gray-100 pb-2">By Room</h4>
                  <ul class="space-y-3">
                    <li><NuxtLink to="#" class="text-gray-600 hover:text-gold transition-colors">Living Room</NuxtLink></li>
                    <li><NuxtLink to="#" class="text-gray-600 hover:text-gold transition-colors">Dining Room</NuxtLink></li>
                    <li><NuxtLink to="#" class="text-gray-600 hover:text-gold transition-colors">Bedroom</NuxtLink></li>
                    <li><NuxtLink to="#" class="text-gray-600 hover:text-gold transition-colors">Bathroom</NuxtLink></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <NuxtLink to="#" class="text-sm uppercase tracking-widest font-medium hover:text-gold transition-colors">Decor</NuxtLink>
        </nav>

        <!-- Logo -->
        <NuxtLink to="/" class="absolute left-1/2 transform -translate-x-1/2">
          <h1 class="font-playfair text-3xl lg:text-4xl tracking-wide font-bold">LAMPE</h1>
        </NuxtLink>

        <!-- Icons -->
        <div class="flex items-center space-x-6">
          <button class="hover:text-gold transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button class="hidden md:block hover:text-gold transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button class="hidden md:block hover:text-gold transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          <button class="hover:text-gold transition-colors relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span class="absolute -top-1 -right-2 bg-gold text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">2</span>
          </button>
        </div>

      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
