<template>
  <footer class="bg-charcoal text-beige py-16 lg:py-24 border-t border-gold/20">
    <div class="container mx-auto px-6 lg:px-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        
        <!-- Brand -->
        <div class="space-y-6">
          <h2 class="font-playfair text-3xl text-white">LAMPE</h2>
          <p class="text-sm text-gray-400 leading-relaxed">
            Illuminate every corner with timeless luxury. Curated collections of premium lighting and decor for the modern home.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gold hover:border-gold transition-colors">
              <span class="sr-only">Instagram</span>
              <!-- SVG icon -->
              IG
            </a>
            <a href="#" class="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gold hover:border-gold transition-colors">
              <span class="sr-only">Pinterest</span>
              PI
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-playfair text-xl text-white mb-6">Quick Links</h3>
          <ul class="space-y-4 text-sm text-gray-400">
            <li><NuxtLink to="#" class="hover:text-gold transition-colors">About Us</NuxtLink></li>
            <li><NuxtLink to="#" class="hover:text-gold transition-colors">Store Locator</NuxtLink></li>
            <li><NuxtLink to="#" class="hover:text-gold transition-colors">Book Consultation</NuxtLink></li>
            <li><NuxtLink to="#" class="hover:text-gold transition-colors">Trade Program</NuxtLink></li>
          </ul>
        </div>

        <!-- Customer Care -->
        <div>
          <h3 class="font-playfair text-xl text-white mb-6">Customer Care</h3>
          <ul class="space-y-4 text-sm text-gray-400">
            <li><NuxtLink to="#" class="hover:text-gold transition-colors">Contact Us</NuxtLink></li>
            <li><NuxtLink to="#" class="hover:text-gold transition-colors">Shipping & Returns</NuxtLink></li>
            <li><NuxtLink to="#" class="hover:text-gold transition-colors">Track Order</NuxtLink></li>
            <li><NuxtLink to="#" class="hover:text-gold transition-colors">FAQs</NuxtLink></li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="font-playfair text-xl text-white mb-6">The List</h3>
          <p class="text-sm text-gray-400 mb-4">Sign up for exclusive access to new arrivals, private sales, and design inspiration.</p>
          <form class="relative">
            <input type="email" placeholder="Email Address" class="w-full bg-transparent border-b border-gray-600 py-3 text-sm focus:outline-none focus:border-gold text-white transition-colors" />
            <button type="submit" class="absolute right-0 top-1/2 -translate-y-1/2 text-gold hover:text-white transition-colors uppercase text-xs tracking-widest font-medium">Subscribe</button>
          </form>
        </div>

      </div>

      <div class="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>&copy; 2026 LAMPE. All Rights Reserved.</p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <NuxtLink to="#" class="hover:text-gold">Privacy Policy</NuxtLink>
          <NuxtLink to="#" class="hover:text-gold">Terms of Service</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
