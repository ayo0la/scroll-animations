import { gsap } from './_gsap'
import type { ScrollFadeOptions } from './types'

export function scrollFade(
  selector: string | Element,
  options: ScrollFadeOptions = {}
): void {
  if (typeof window === 'undefined') return

  const {
    x = 0,
    y = 30,
    opacity = 0,
    scale = 1,
    duration = 0.6,
    delay = 0,
    ease = 'power2.out',
    reverse = false,
    triggerStart = 'top 75%',
  } = options

  const el = typeof selector === 'string'
    ? document.querySelector(selector)
    : selector
  if (!el) return

  gsap.from(el, {
    x,
    y,
    opacity,
    scale,
    duration,
    delay,
    ease,
    scrollTrigger: {
      trigger: el,
      start: triggerStart,
      toggleActions: reverse ? 'play none none reverse' : 'play none none none',
    },
  })
}
