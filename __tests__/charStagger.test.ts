import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const mockFrom = vi.hoisted(() => vi.fn())
vi.mock('gsap', () => ({
  gsap: { registerPlugin: vi.fn(), from: mockFrom },
}))
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }))

import { charStagger } from '../src/charStagger'

describe('charStagger', () => {
  beforeEach(() => {
    document.body.innerHTML = '<h1 class="target">Hi</h1>'
  })

  afterEach(() => mockFrom.mockClear())

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

  it('calls gsap.from with the split spans', () => {
    charStagger('.target')
    expect(mockFrom).toHaveBeenCalledOnce()
    const [spans] = mockFrom.mock.calls[0]
    expect(Array.isArray(spans)).toBe(true)
    expect(spans.length).toBe(2) // "Hi" has 2 chars
  })
})
