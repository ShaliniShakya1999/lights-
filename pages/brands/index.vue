<template>
  <ContentSimplePage
    eyebrow="Featured Ateliers"
    title="Brands"
    :paragraphs="paragraphs"
    :cta="cta"
  />
</template>

<script setup lang="ts">
definePageMeta({ layout: 'website' })

const paragraphs = [
    'We partner with trusted ateliers including Lampe Atelier, Maison Lumière, Atelier Nord, Casa Brillante, and Lumina Pro.',
    'Every brand is curated for craftsmanship, finish quality, and lasting design.',
]

const cta = { label: 'Browse Products', to: '/lighting/chandeliers' }

useSeoMeta({
  title: 'Brands | DINMANS',
  description: 'We partner with trusted ateliers including Lampe Atelier, Maison Lumière, Atelier Nord, Casa Brillante, and Lumina Pro.',
})
</script>
