<template>
  <div class="rounded-xl bg-white p-8 shadow-sm">
    <h1 class="font-playfair text-2xl">{{ title }}</h1>
    <p class="mt-2 text-sm text-gray-500">Admin module placeholder — coming soon.</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const title = computed(() => {
  const segment = route.path.split('/').filter(Boolean)[0] || 'Dashboard'
  return segment.charAt(0).toUpperCase() + segment.slice(1)
})
</script>
