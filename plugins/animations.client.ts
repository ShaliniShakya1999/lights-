import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin((nuxtApp) => {
  if (!import.meta.client) return

  gsap.registerPlugin(ScrollTrigger)

  // Prefer-reduced-motion: skip heavy motion
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let lenis: Lenis | null = null
  let rafId = 0

  if (!reduced) {
    lenis = new Lenis({
      duration: 1.15,
      easing: t => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis?.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    document.documentElement.classList.add('lenis', 'lenis-smooth')
  }

  const animated = new WeakSet<Element>()

  function animateEl(el: Element, delay = 0) {
    if (animated.has(el) || reduced) {
      ;(el as HTMLElement).style.opacity = '1'
      ;(el as HTMLElement).style.transform = 'none'
      return
    }
    animated.add(el)

    const type = el.getAttribute('data-animate') || 'fade-up'
    const attrDelay = el.getAttribute('data-delay')
    const customDelay = attrDelay != null && attrDelay !== '' ? Number(attrDelay) : delay
    const duration = Number(el.getAttribute('data-duration') || 0.85)

    const fromMap: Record<string, gsap.TweenVars> = {
      'fade-up': { opacity: 0, y: 48 },
      'fade-down': { opacity: 0, y: -36 },
      'fade-left': { opacity: 0, x: 48 },
      'fade-right': { opacity: 0, x: -48 },
      'zoom-in': { opacity: 0, scale: 0.88 },
      'zoom-out': { opacity: 0, scale: 1.12 },
      fade: { opacity: 0 },
      blur: { opacity: 0, filter: 'blur(12px)', y: 24 },
    }

    const from = fromMap[type] || fromMap['fade-up']

    gsap.fromTo(el, from, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration,
      delay: customDelay,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }

  function observe(root: ParentNode = document) {
    const els = root.querySelectorAll<HTMLElement>('[data-animate]')
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const siblings = el.parentElement
            ? [...el.parentElement.querySelectorAll<HTMLElement>(':scope > [data-animate]')]
            : []
          const index = Math.max(0, siblings.indexOf(el))
          const stagger = Number(el.getAttribute('data-stagger') || 0.08)
          animateEl(el, index * stagger)
          io.unobserve(el)
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -4% 0px' },
    )

    els.forEach((el) => {
      if (animated.has(el)) return
      el.style.opacity = '0'
      el.style.willChange = 'transform, opacity'
      io.observe(el)

      // Fallback: if already on screen, animate after a tick
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0
        if (inView && !animated.has(el)) {
          const siblings = el.parentElement
            ? [...el.parentElement.querySelectorAll<HTMLElement>(':scope > [data-animate]')]
            : []
          const index = Math.max(0, siblings.indexOf(el))
          const stagger = Number(el.getAttribute('data-stagger') || 0.08)
          animateEl(el, index * stagger)
          io.unobserve(el)
        }
      })
    })
  }

  function staggerChildren(selector: string, childSelector = '[data-animate-child]', opts: gsap.TweenVars = {}) {
    const containers = document.querySelectorAll(selector)
    containers.forEach((container) => {
      const children = container.querySelectorAll(childSelector)
      if (!children.length || reduced) return
      gsap.fromTo(
        children,
        { opacity: 0, y: 36, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            once: true,
          },
          ...opts,
        },
      )
    })
  }

  // Run after each page render
  const run = () => {
    nextTick(() => {
      setTimeout(() => {
        ScrollTrigger.refresh()
        observe(document)
        staggerChildren('[data-stagger-grid]', '[data-animate-child]')
      }, 40)
    })
  }

  nuxtApp.hook('page:finish', run)
  nuxtApp.hook('app:mounted', run)

  // v-reveal directive
  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding) {
      const type = (binding.arg || binding.value || 'fade-up') as string
      el.setAttribute('data-animate', String(type))
      if (binding.value && typeof binding.value === 'object') {
        if (binding.value.delay != null) el.setAttribute('data-delay', String(binding.value.delay))
        if (binding.value.duration != null) el.setAttribute('data-duration', String(binding.value.duration))
      }
      observe(el.parentElement || document)
    },
  })

  nuxtApp.provide('gsap', gsap)
  nuxtApp.provide('ScrollTrigger', ScrollTrigger)
  nuxtApp.provide('lenis', lenis)
  nuxtApp.provide('animatePage', run)

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      cancelAnimationFrame(rafId)
      lenis?.destroy()
      ScrollTrigger.getAll().forEach(t => t.kill())
    })
  }
})
