<template>
  <ContentSimplePage
    eyebrow="Support"
    title="Shipping Policy"
    :paragraphs="paragraphs"
    :cta="cta"
  />
</template>

<script setup lang="ts">
definePageMeta({ layout: 'website' })

const paragraphs = [
    'We offer white-glove delivery on eligible orders across major Indian cities.',
    'Free shipping applies on orders above ₹50,000. Delivery timelines are listed on each product.',
]

const cta = { label: 'Start Shopping', to: '/lighting/decorative-lighting' }

useSeoMeta({
  title: 'Shipping Policy | DINMANS',
  description: 'We offer white-glove delivery on eligible orders across major Indian cities.',
})
</script>
