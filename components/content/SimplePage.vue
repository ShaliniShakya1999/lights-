<template>
  <div class="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
    <p class="section-label">{{ eyebrow }}</p>
    <h1 class="mt-3 heading-page">{{ title }}</h1>
    <div class="mt-8 space-y-4 body-lead">
      <p v-for="(p, i) in paragraphs" :key="i">{{ p }}</p>
    </div>
    <NuxtLink v-if="cta" :to="cta.to" class="btn-primary mt-10 inline-flex">{{ cta.label }}</NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  paragraphs: string[]
  cta?: { label: string; to: string }
}>()
</script>
