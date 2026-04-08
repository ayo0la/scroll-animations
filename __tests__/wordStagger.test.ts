import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('gsap', () => ({
  gsap: { registerPlugin: vi.fn(), from: vi.fn() },
}))
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }))

import { wordStagger } from '../src/wordStagger'

describe('wordStagger', () => {
  beforeEach(() => {
    document.body.innerHTML = '<h2 class="target">Hello world</h2>'
  })

  it('returns early in SSR environment', () => {
    const win = (global as any).window
    delete (global as any).window
    expect(() => wordStagger('.target')).not.toThrow()
    ;(global as any).window = win
  })

  it('wraps each word in .aw span', () => {
    wordStagger('.target')
    expect(document.querySelectorAll('.aw').length).toBe(2)
  })

  it('does nothing when selector is not found', () => {
    expect(() => wordStagger('.nonexistent')).not.toThrow()
  })

  it('accepts an Element directly', () => {
    const el = document.querySelector('.target')!
    wordStagger(el)
    expect(document.querySelectorAll('.aw').length).toBe(2)
  })
})
