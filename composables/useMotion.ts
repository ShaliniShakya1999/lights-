import gsap from 'gsap'

/**
 * Luxury micro-interactions for buttons, wishlist, and cards.
 */
export function useMotion() {
  function ripple(e: MouseEvent) {
    const target = e.currentTarget as HTMLElement
    if (!target) return

    const rect = target.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 1.2
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    const circle = document.createElement('span')
    circle.className = 'motion-ripple'
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.left = `${x}px`
    circle.style.top = `${y}px`
    target.appendChild(circle)

    setTimeout(() => circle.remove(), 650)
  }

  function pop(el: Element | null) {
    if (!el) return
    gsap.fromTo(
      el,
      { scale: 1 },
      { scale: 1.28, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' },
    )
  }

  function floatIn(el: Element | Element[] | null, delay = 0) {
    if (!el) return
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, delay, ease: 'power3.out', stagger: 0.07 },
    )
  }

  return { ripple, pop, floatIn, gsap }
}
