<script setup lang="ts">
definePageMeta({ layout: 'website' })

import Hero from '~/components/home/Hero.vue'
import Categories from '~/components/home/Categories.vue'
</script>

<template>
  <div>
    <Hero />
    <Categories />
    <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-20 space-y-20">
      <ShopInspirationBanner />
    </div>
  </div>
</template>
