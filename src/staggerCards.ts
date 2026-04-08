import { gsap } from './_gsap'
import type { StaggerCardsOptions } from './types'

export function staggerCards(
  selector: string | Element,
  options: StaggerCardsOptions = {}
): void {
  if (typeof window === 'undefined') return

  const {
    stagger = 0.1,
    x = 0,
    y = 40,
    opacity = 0,
    duration = 0.6,
    delay = 0,
    ease = 'power2.out',
    reverse = false,
    triggerStart = 'top 75%',
  } = options

  const els = typeof selector === 'string'
    ? Array.from(document.querySelectorAll(selector))
    : [selector]

  if (!els.length) return

  gsap.from(els, {
    x,
    y,
    opacity,
    stagger,
    duration,
    delay,
    ease,
    scrollTrigger: {
      trigger: els[0],
      start: triggerStart,
      toggleActions: reverse ? 'play none none reverse' : 'play none none none',
    },
  })
}
