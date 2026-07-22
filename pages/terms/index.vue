<template>
  <ContentSimplePage
    eyebrow="Legal"
    title="Terms"
    :paragraphs="paragraphs"

  />
</template>

<script setup lang="ts">
definePageMeta({ layout: 'website' })

const paragraphs = [
    'By shopping with DINMANS you agree to our purchase, shipping, and return terms.',
    'Product imagery is representative; finishes may vary slightly due to materials and lighting.',
]



useSeoMeta({
  title: 'Terms | DINMANS',
  description: 'By shopping with DINMANS you agree to our purchase, shipping, and return terms.',
})
</script>
