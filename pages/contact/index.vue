<template>
  <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pb-20">
    <ShopBreadcrumb :items="breadcrumbs" />

    <div class="mt-2 mb-10 max-w-2xl" data-animate="fade-up">
      <p class="section-label">Get in touch</p>
      <h1 class="mt-3 font-playfair text-4xl sm:text-5xl lg:text-6xl">Contact</h1>
      <p class="mt-5 text-text-muted">
        Reach our concierge team for product advice, installation, or order support.
      </p>
    </div>

    <div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]" data-animate="fade-up" data-delay="0.08">
      <form class="rounded-3xl border border-border bg-white p-6 sm:p-8 space-y-5" @submit.prevent="onSubmit">
        <label class="block">
          <span class="mb-2 block text-sm font-medium">Name</span>
          <input v-model="form.name" type="text" required class="input-luxury" placeholder="Your name">
        </label>
        <label class="block">
          <span class="mb-2 block text-sm font-medium">Email</span>
          <input v-model="form.email" type="email" required class="input-luxury" placeholder="you@example.com">
        </label>
        <label class="block">
          <span class="mb-2 block text-sm font-medium">Phone</span>
          <input v-model="form.phone" type="tel" class="input-luxury" placeholder="Optional">
        </label>
        <label class="block">
          <span class="mb-2 block text-sm font-medium">Message</span>
          <textarea v-model="form.message" required rows="5" class="input-luxury resize-none" placeholder="How can we help?" />
        </label>
        <button type="submit" class="btn-primary" :disabled="sent">
          {{ sent ? 'Message sent' : 'Send Message' }}
        </button>
      </form>

      <aside class="h-fit rounded-3xl border border-border bg-white p-6 sm:p-8 space-y-6">
        <div>
          <h2 class="font-playfair text-2xl">Visit</h2>
          <p class="mt-3 text-sm leading-relaxed text-text-muted">
            DINMANS Atelier<br>
            12 Design District<br>
            Mumbai · Bangalore · Delhi
          </p>
        </div>
        <div>
          <h2 class="font-playfair text-2xl">Email</h2>
          <a href="mailto:concierge@dinmans.com" class="mt-3 block text-sm text-accent hover:underline">
            concierge@dinmans.com
          </a>
        </div>
        <div>
          <h2 class="font-playfair text-2xl">Phone</h2>
          <p class="mt-3 text-sm text-text-muted">+91 98765 43210</p>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'website' })

const breadcrumbs = [
  { label: 'Home', to: '/' },
  { label: 'Contact' },
]

const sent = ref(false)
const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: '',
})

function onSubmit() {
  sent.value = true
}

useSeoMeta({
  title: 'Contact | DINMANS',
  description: 'Contact DINMANS for lighting advice, installation, and order support.',
})
</script>
