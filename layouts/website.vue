<template>
  <div class="min-h-screen flex flex-col bg-background overflow-x-clip">
    <LayoutSiteHeader />
    <main class="flex-1 min-w-0" :class="isHome ? '' : 'pt-16 sm:pt-[72px] lg:pt-[84px]'">
      <slot />
    </main>
    <LayoutSiteFooter />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>
