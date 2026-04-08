import { _splitAnimate } from './_splitAnimate'
import type { WordStaggerOptions } from './types'

export function wordStagger(
  selector: string | Element,
  options: WordStaggerOptions = {}
): void {
  if (typeof window === 'undefined') return

  const { stagger = 0.08, x = -40, y = 0, opacity = 0, ...base } = options
  const el = typeof selector === 'string'
    ? document.querySelector(selector)
    : selector
  if (!el) return

  _splitAnimate(el, 'word', { x, y, opacity }, { ...base, stagger })
}
