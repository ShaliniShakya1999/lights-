<template>
  <ContentSimplePage
    eyebrow="Legal"
    title="Privacy Policy"
    :paragraphs="paragraphs"

  />
</template>

<script setup lang="ts">
definePageMeta({ layout: 'website' })

const paragraphs = [
    'We respect your privacy and only use your information to fulfill orders and improve your experience.',
    'We never sell personal data. Contact concierge@dinmans.com for privacy requests.',
]



useSeoMeta({
  title: 'Privacy Policy | DINMANS',
  description: 'We respect your privacy and only use your information to fulfill orders and improve your experience.',
})
</script>
