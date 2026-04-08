import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('gsap', () => ({
  gsap: { registerPlugin: vi.fn(), from: vi.fn() },
}))
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }))

import { charStagger } from '../src/charStagger'

describe('charStagger', () => {
  beforeEach(() => {
    document.body.innerHTML = '<h1 class="target">Hi</h1>'
  })

  it('returns early in SSR environment', () => {
    const win = (global as any).window
    delete (global as any).window
    expect(() => charStagger('.target')).not.toThrow()
    ;(global as any).window = win
  })

  it('wraps each character in .ac span', () => {
    charStagger('.target')
    expect(document.querySelectorAll('.ac').length).toBe(2)
  })

  it('does nothing when selector is not found', () => {
    expect(() => charStagger('.nonexistent')).not.toThrow()
  })

  it('accepts an Element directly', () => {
    const el = document.querySelector('.target')!
    charStagger(el)
    expect(document.querySelectorAll('.ac').length).toBe(2)
  })
})
