<template>
  <div class="min-h-screen flex flex-col bg-background">
    <LayoutSiteHeader />
    <main class="flex-1" :class="isHome ? '' : 'pt-16 lg:pt-[76px]'">
      <slot />
    </main>
    <LayoutSiteFooter />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>
