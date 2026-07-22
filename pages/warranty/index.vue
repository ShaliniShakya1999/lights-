<template>
  <ContentSimplePage
    eyebrow="Support"
    title="Warranty"
    :paragraphs="paragraphs"
    :cta="cta"
  />
</template>

<script setup lang="ts">
definePageMeta({ layout: 'website' })

const paragraphs = [
    'Most DINMANS lighting pieces include a 2-year warranty covering manufacturing defects.',
    'LED drivers and electrical components are covered for the stated period on each product page.',
]

const cta = { label: 'Shop Now', to: '/lighting/chandeliers' }

useSeoMeta({
  title: 'Warranty | DINMANS',
  description: 'Most DINMANS lighting pieces include a 2-year warranty covering manufacturing defects.',
})
</script>
