<template>
  <div class="flex bg-[#F6F7FB] min-h-screen">

    <Sidebar />

    <div class="flex-1">

      <Navbar />

      <main class="p-6">

        <slot />

      </main>

    </div>

  </div>
</template>

<script setup>
import Sidebar from '~/components/layout/Sidebar.vue'
import Navbar from '~/components/layout/Navbar.vue'
</script>