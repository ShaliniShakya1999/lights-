<template>
  <ContentSimplePage
    eyebrow="Support"
    title="Returns"
    :paragraphs="paragraphs"
    :cta="cta"
  />
</template>

<script setup lang="ts">
definePageMeta({ layout: 'website' })

const paragraphs = [
    'Unused products in original packaging can be returned within 15 days of delivery.',
    'Custom finishes and made-to-order pieces may have different return terms.',
]

const cta = { label: 'Contact Support', to: '/contact' }

useSeoMeta({
  title: 'Returns | DINMANS',
  description: 'Unused products in original packaging can be returned within 15 days of delivery.',
})
</script>
