import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin((nuxtApp) => {
  if (!import.meta.client) return

  gsap.registerPlugin(ScrollTrigger)

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let lenis: Lenis | null = null

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
  let io: IntersectionObserver | null = null

  function animateEl(el: HTMLElement, delay = 0) {
    if (animated.has(el)) return
    animated.add(el)
    el.dataset.revealed = '1'

    if (reduced) {
      el.style.opacity = '1'
      el.style.transform = 'none'
      return
    }

    const type = el.getAttribute('data-animate') || 'fade-up'
    const attrDelay = el.getAttribute('data-delay')
    const customDelay = attrDelay != null && attrDelay !== '' ? Number(attrDelay) : delay
    const duration = Number(el.getAttribute('data-duration') || 0.7)

    const fromMap: Record<string, gsap.TweenVars> = {
      'fade-up': { opacity: 0, y: 40 },
      'fade-down': { opacity: 0, y: -28 },
      'fade-left': { opacity: 0, x: 36 },
      'fade-right': { opacity: 0, x: -36 },
      'zoom-in': { opacity: 0, scale: 0.92 },
      'zoom-out': { opacity: 0, scale: 1.06 },
      fade: { opacity: 0 },
      blur: { opacity: 0, filter: 'blur(8px)', y: 18 },
    }

    gsap.fromTo(el, fromMap[type] || fromMap['fade-up'], {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration,
      delay: customDelay,
      ease: 'power3.out',
      overwrite: 'auto',
      clearProps: 'filter',
    })
  }

  function getIO() {
    if (io) return io
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const siblings = el.parentElement
            ? [...el.parentElement.querySelectorAll<HTMLElement>(':scope > [data-animate]:not([data-animate-child])')]
            : []
          const index = Math.max(0, siblings.indexOf(el))
          animateEl(el, index * Number(el.getAttribute('data-stagger') || 0.07))
          io?.unobserve(el)
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' },
    )
    return io
  }

  function observe(root: ParentNode = document) {
    const els = root.querySelectorAll<HTMLElement>('[data-animate]:not([data-animate-child]):not([data-revealed="1"])')
    const observer = getIO()

    els.forEach((el) => {
      if (animated.has(el)) return
      el.style.opacity = '0'
      el.style.willChange = 'transform, opacity'
      observer.observe(el)

      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.95 && rect.bottom > 20 && !animated.has(el)) {
          const siblings = el.parentElement
            ? [...el.parentElement.querySelectorAll<HTMLElement>(':scope > [data-animate]:not([data-animate-child])')]
            : []
          animateEl(el, Math.max(0, siblings.indexOf(el)) * 0.07)
          observer.unobserve(el)
        }
      })
    })
  }

  function staggerGrids() {
    document.querySelectorAll<HTMLElement>('[data-stagger-grid]').forEach((container) => {
      const children = [...container.querySelectorAll<HTMLElement>('[data-animate-child]')]
        .filter(c => !animated.has(c) && c.dataset.revealed !== '1')
      if (!children.length) return

      children.forEach((c) => {
        c.style.opacity = '0'
      })

      if (reduced) {
        children.forEach((c) => {
          c.style.opacity = '1'
          animated.add(c)
          c.dataset.revealed = '1'
        })
        return
      }

      gsap.fromTo(
        children,
        { opacity: 0, y: 36, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 90%',
            once: true,
          },
          onStart: () => {
            children.forEach((c) => {
              animated.add(c)
              c.dataset.revealed = '1'
            })
          },
        },
      )
    })
  }

  function run() {
    nextTick(() => {
      setTimeout(() => {
        ScrollTrigger.refresh()
        observe(document)
        staggerGrids()
      }, 40)
    })
  }

  let moTimer = 0
  const mo = new MutationObserver(() => {
    window.clearTimeout(moTimer)
    moTimer = window.setTimeout(() => {
      observe(document)
      staggerGrids()
    }, 80)
  })

  nuxtApp.hook('app:mounted', () => {
    mo.observe(document.body, { childList: true, subtree: true })
    run()
  })
  nuxtApp.hook('page:finish', run)

  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding) {
      el.setAttribute('data-animate', String(binding.arg || binding.value || 'fade-up'))
      observe(el.parentElement || document)
    },
  })

  nuxtApp.provide('gsap', gsap)
  nuxtApp.provide('ScrollTrigger', ScrollTrigger)
  nuxtApp.provide('lenis', lenis)
  nuxtApp.provide('animatePage', run)

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      mo.disconnect()
      lenis?.destroy()
      ScrollTrigger.getAll().forEach(t => t.kill())
      io?.disconnect()
    })
  }
})
