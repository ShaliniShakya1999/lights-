<template>
  <ContentSimplePage
    eyebrow="Project Gallery"
    title="Projects"
    :paragraphs="paragraphs"
    :cta="cta"
  />
</template>

<script setup lang="ts">
definePageMeta({ layout: 'website' })

const paragraphs = [
    'Explore hotels, villas, living rooms, offices, restaurants, and bedrooms lit by DINMANS.',
    'Each project pairs warm lighting with architectural precision for unforgettable spaces.',
]

const cta = { label: 'Shop Collection', to: '/lighting/chandeliers' }

useSeoMeta({
  title: 'Projects | DINMANS',
  description: 'Explore hotels, villas, living rooms, offices, restaurants, and bedrooms lit by DINMANS.',
})
</script>
