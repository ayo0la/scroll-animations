import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('gsap', () => ({
  gsap: { registerPlugin: vi.fn(), from: vi.fn() },
}))
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }))

import { lineStagger } from '../src/lineStagger'

describe('lineStagger', () => {
  beforeEach(() => {
    document.body.innerHTML = '<h2 class="target">Line one<br>Line two<br>Line three</h2>'
  })

  it('returns early in SSR environment', () => {
    const win = (global as any).window
    delete (global as any).window
    expect(() => lineStagger('.target')).not.toThrow()
    ;(global as any).window = win
  })

  it('wraps each line in .al span', () => {
    lineStagger('.target')
    expect(document.querySelectorAll('.al').length).toBe(3)
  })

  it('does nothing when selector is not found', () => {
    expect(() => lineStagger('.nonexistent')).not.toThrow()
  })

  it('accepts an Element directly', () => {
    const el = document.querySelector('.target')!
    lineStagger(el)
    expect(document.querySelectorAll('.al').length).toBe(3)
  })
})
