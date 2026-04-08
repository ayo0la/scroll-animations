import { _splitAnimate } from './_splitAnimate'
import type { LineStaggerOptions } from './types'

export function lineStagger(
  selector: string | Element,
  options: LineStaggerOptions = {}
): void {
  if (typeof window === 'undefined') return

  const { stagger = 0.12, y = 30, opacity = 0, ...base } = options
  const el = typeof selector === 'string'
    ? document.querySelector(selector)
    : selector
  if (!el) return

  _splitAnimate(el, 'line', { y, opacity }, { ...base, stagger })
}
