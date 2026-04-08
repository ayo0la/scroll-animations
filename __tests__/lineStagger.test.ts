import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const mockFrom = vi.hoisted(() => vi.fn())
vi.mock('gsap', () => ({
  gsap: { registerPlugin: vi.fn(), from: mockFrom },
}))
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }))

import { lineStagger } from '../src/lineStagger'

describe('lineStagger', () => {
  beforeEach(() => {
    document.body.innerHTML = '<h2 class="target">Line one<br>Line two<br>Line three</h2>'
  })

  afterEach(() => mockFrom.mockClear())

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

  it('calls gsap.from with the split lines', () => {
    lineStagger('.target')
    expect(mockFrom).toHaveBeenCalledOnce()
    const [spans] = mockFrom.mock.calls[0]
    expect(Array.isArray(spans)).toBe(true)
    expect(spans.length).toBe(3) // 3 lines
  })
})
