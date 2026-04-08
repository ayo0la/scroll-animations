import { gsap } from './_gsap'
import type { BaseOptions } from './types'

type SplitBy = 'char' | 'word' | 'line'

function splitElement(el: Element, by: SplitBy): HTMLSpanElement[] {
  if (by === 'line') {
    const parts = el.innerHTML.split(/<br\s*\/?>/i)
    el.innerHTML = parts.map(p => `<span class="al">${p}</span>`).join('')
    return Array.from(el.querySelectorAll('.al'))
  }

  if (by === 'word') {
    // Tokenise on whitespace; preserve HTML tags intact
    const tokens = el.innerHTML.split(/(<[^>]+>)|(\s+)/).filter(Boolean)
    el.innerHTML = tokens.map(t => {
      if (t.startsWith('<') || /^\s+$/.test(t)) return t
      return `<span class="aw">${t}</span>`
    }).join('')
    return Array.from(el.querySelectorAll('.aw'))
  }

  // char: split char-by-char, preserve inline HTML tags
  el.innerHTML = el.innerHTML.replace(/(<[^>]+>)|(.)/g, (_, tag, ch) =>
    tag ? tag : `<span class="ac">${ch}</span>`
  )
  return Array.from(el.querySelectorAll('.ac'))
}

export function _splitAnimate(
  el: Element,
  splitBy: SplitBy,
  fromVars: Record<string, unknown>,
  options: BaseOptions & { stagger: number }
): void {
  if (typeof window === 'undefined') return
  const {
    duration = 0.6,
    delay = 0,
    ease = 'power2.out',
    reverse = false,
    triggerStart = 'top 75%',
    stagger,
  } = options

  const spans = splitElement(el, splitBy)

  gsap.from(spans, {
    ...fromVars,
    duration,
    delay,
    ease,
    stagger,
    scrollTrigger: {
      trigger: el,
      start: triggerStart,
      toggleActions: reverse ? 'play none none reverse' : 'play none none none',
    },
  })
}
