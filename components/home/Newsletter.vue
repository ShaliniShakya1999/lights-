<template>
  <section class="py-20 lg:py-24 bg-secondary text-white">
    <div class="mx-auto max-w-[720px] px-4 text-center sm:px-6" data-animate="fade-up">
      <p class="section-label !text-accent">Newsletter</p>
      <h2 class="mt-3 font-playfair text-4xl sm:text-5xl">Stay Inspired</h2>
      <p class="mt-4 text-sm text-white/65 sm:text-base">
        New collections, design tips, and exclusive offers — delivered monthly.
      </p>
      <form class="mt-8 flex flex-col gap-3 sm:flex-row" @submit.prevent="subscribed = true">
        <input
          v-model="email"
          type="email"
          required
          placeholder="Enter your email"
          class="input-luxury flex-1 !bg-white/95"
        >
        <button type="submit" class="btn-primary shrink-0">
          {{ subscribed ? 'Subscribed' : 'Subscribe' }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
const email = ref('')
const subscribed = ref(false)
</script>
