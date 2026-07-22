<template>
  <ContentSimplePage
    eyebrow="Journal"
    title="Blog"
    :paragraphs="paragraphs"
    :cta="cta"
  />
</template>

<script setup lang="ts">
definePageMeta({ layout: 'website' })

const paragraphs = [
    'Design tips, lighting guides, and trends from the DINMANS studio.',
    'Discover how to layer light, choose chandelier scale, and style warm metals.',
]

const cta = { label: 'Shop Lighting', to: '/lighting/decorative-lighting' }

useSeoMeta({
  title: 'Blog | DINMANS',
  description: 'Design tips, lighting guides, and trends from the DINMANS studio.',
})
</script>
