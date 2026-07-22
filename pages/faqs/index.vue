<template>
  <ContentSimplePage
    eyebrow="Help Center"
    title="FAQs"
    :paragraphs="paragraphs"
    :cta="cta"
  />
</template>

<script setup lang="ts">
definePageMeta({ layout: 'website' })

const paragraphs = [
    'Installation, warranty, shipping, and returns — answers to the questions we hear most.',
    'Need more help? Our concierge team is available at concierge@dinmans.com.',
]

const cta = { label: 'Contact Us', to: '/contact' }

useSeoMeta({
  title: 'FAQs | DINMANS',
  description: 'Installation, warranty, shipping, and returns — answers to the questions we hear most.',
})
</script>
