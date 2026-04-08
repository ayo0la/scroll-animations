import { _splitAnimate } from './_splitAnimate'
import type { CharStaggerOptions } from './types'

export function charStagger(
  selector: string | Element,
  options: CharStaggerOptions = {}
): void {
  if (typeof window === 'undefined') return

  const { stagger = 0.02, y = 20, opacity = 0, ...base } = options
  const el = typeof selector === 'string'
    ? document.querySelector(selector)
    : selector
  if (!el) return

  _splitAnimate(el, 'char', { y, opacity }, { ...base, stagger })
}
