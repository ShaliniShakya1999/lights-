<template>
  <div class="pb-20">
    <!-- Hero -->
    <section class="relative overflow-hidden border-b border-border">
      <div class="absolute inset-0">
        <img
          src="/hero_1.jpg"
          alt="DINMANS Design Studio"
          class="h-full w-full object-cover"
        >
        <div class="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/35" />
      </div>

      <div class="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-20 lg:py-28">
        <ShopBreadcrumb
          :items="breadcrumbs"
          class="[&_a]:!text-white/70 [&_a:hover]:!text-accent [&_span]:!text-white [&_svg]:!text-white/50"
        />

        <div class="mt-6 max-w-3xl text-white" data-animate="fade-up">
          <p class="section-label !text-accent">About Us</p>
          <h1 class="heading-hero mt-4 text-white">
            Illuminate Life’s Moments with<br>
            <span class="text-accent">Dinmans Light Up!</span>
          </h1>
          <p class="mt-5 text-sm uppercase tracking-[0.28em] text-white/70">Design Studio</p>
        </div>
      </div>
    </section>

    <!-- Intro copy -->
    <section class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-16 lg:py-20">
      <div class="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-text-muted sm:text-lg" data-animate="fade-up">
        <p>
          Fusce at nisi eget dolor rhoncus facilisis. Mauris ante nisl, consectetur et luctus et, porta ut dolor.
          Curabitur ultricies ultrices nulla. Morbi blandit nec est vitae dictum. Etiam vel consectetur diam.
          Maecenas vitae egestas dolor. Fusce tempor magna at tortor aliquet finibus. Sed eu nunc sit amet elit
          euismod faucibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Duis gravida eget neque vel vulputate.
        </p>
        <p>
          Cras eu elit congue, placerat dui ut, tincidunt nisl. Nulla leo elit, pharetra bibendum justo quis,
          cursus consectetur erat. Sed nec posuere turpis. Maecenas nec bibendum purus. Nulla fringilla, lorem
          iaculis iaculis fermentum, ligula nibh mollis ipsum, et scelerisque risus ante eu sem. Phasellus ac
          sagittis nisi. Suspendisse potenti. Nunc volutpat dui ipsum. Suspendisse potenti. In feugiat malesuada
          nisi quis laoreet.
        </p>
      </div>
    </section>

    <!-- Our Story + Promo -->
    <section class="bg-[#F4F4F4]">
      <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
        <div class="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div data-animate="fade-right">
            <p class="section-label">Our Story</p>
            <h2 class="mt-3 heading-section-sm lg:text-[2.75rem] leading-tight text-balance">
              Placerat quam lectus Curabitur dictum velit
            </h2>
            <p class="mt-6 text-base leading-relaxed text-text-muted">
              Etiam elementum euismod commodo. Proin eleifend eget quam ut efficitur. Mauris a accumsan mauris.
            </p>
            <NuxtLink to="/contact" class="btn-secondary mt-8 inline-flex">
              Contact Us
            </NuxtLink>
          </div>

          <div
            class="relative overflow-hidden rounded-luxury min-h-[320px] lg:min-h-[420px]"
            data-animate="fade-left"
            data-delay="0.12"
          >
            <img
              src="/collection_1.jpg"
              alt="New lighting collection"
              class="absolute inset-0 h-full w-full object-cover"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            <div class="relative flex h-full min-h-[320px] lg:min-h-[420px] flex-col justify-end p-8 sm:p-10 text-white">
              <p class="text-xs font-medium uppercase tracking-[0.28em] text-accent">Save up to 70%</p>
              <h3 class="mt-3 heading-section-sm">New Collection</h3>
              <p class="mt-4 max-w-md text-sm leading-relaxed text-white/70">
                In consequat, quam id sodales hendrerit, eros mi leo, nec lacinia risus neque tristique augue.
                Proin tempus urna vel congue elementum.
              </p>
              <NuxtLink to="/lighting/decorative-lighting" class="btn-primary mt-8 w-fit">
                Explore Now
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
      <div class="mx-auto max-w-2xl text-center" data-animate="fade-up">
        <p class="section-label">Testimonials</p>
        <h2 class="mt-3 heading-section-sm lg:text-5xl">Some feedback from our clients</h2>
        <p class="mt-5 text-sm leading-relaxed text-text-muted sm:text-base">
          Aenean sed nibh a magna posuere tempor faucibus pellentesque in aliquet congue tempor conguenim.
        </p>
      </div>

      <div class="mt-14 grid gap-6 md:grid-cols-3" data-stagger-grid>
        <article
          v-for="(item, i) in testimonials"
          :key="item.name"
          class="rounded-luxury border border-border bg-white p-7 sm:p-8"
          data-animate="fade-up"
          :data-delay="String(i * 0.08)"
          data-animate-child
        >
          <p class="text-sm leading-relaxed text-text-muted">“{{ item.quote }}”</p>
          <div class="mt-8 flex items-center gap-3 border-t border-border pt-6">
            <div
              class="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-sm font-medium text-accent"
            >
              {{ item.initials }}
            </div>
            <div>
              <p class="text-sm font-medium text-text">{{ item.name }}</p>
              <p class="text-xs text-text-muted">Client</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'website' })

const breadcrumbs = [
  { label: 'Home', to: '/' },
  { label: 'About Us' },
]

const testimonials = [
  {
    name: 'Ethan Lucas',
    initials: 'EL',
    quote: 'Nunc purus est, consequat condimentum faucibus sed, iaculis sit amet massa fusce ac condimentum.',
  },
  {
    name: 'Ryan Lynch',
    initials: 'RL',
    quote: 'Aenean sed nibh a magna posuere tempor faucibus pellentesque in aliquet congue tempor conguenim.',
  },
  {
    name: 'Francesca Oliver',
    initials: 'FO',
    quote: 'Aenean sed nibh a magna posuere tempor faucibus pellentesque in aliquet congue tempor conguenim.',
  },
]

useSeoMeta({
  title: 'About Us | DINMANS',
  description: 'Illuminate Life’s Moments with Dinmans Light Up! Design Studio — Inspiring All.',
})
</script>
