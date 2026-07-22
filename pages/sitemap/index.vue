<template>
  <ContentSimplePage
    eyebrow="Navigate"
    title="Sitemap"
    :paragraphs="paragraphs"
    :cta="cta"
  />
</template>

<script setup lang="ts">
definePageMeta({ layout: 'website' })

const paragraphs = [
    'Explore key areas of the DINMANS storefront: collections, about, contact, projects, blog, and support pages.',
    'Use the navigation or footer links to reach shipping, warranty, returns, privacy, and terms.',
]

const cta = { label: 'Go Home', to: '/' }

useSeoMeta({
  title: 'Sitemap | DINMANS',
  description: 'Explore key areas of the DINMANS storefront: collections, about, contact, projects, blog, and support pages.',
})
</script>
