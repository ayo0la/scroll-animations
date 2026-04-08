import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockFrom = vi.hoisted(() => vi.fn())
vi.mock('gsap', () => ({
  gsap: { registerPlugin: vi.fn(), from: mockFrom },
}))
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }))

import { scrollFade } from '../src/scrollFade'

describe('scrollFade', () => {
  beforeEach(() => {
    document.body.innerHTML = '<p class="target">Hello</p>'
    mockFrom.mockClear()
  })

  it('returns early in SSR environment', () => {
    const win = (global as any).window
    delete (global as any).window
    expect(() => scrollFade('.target')).not.toThrow()
    ;(global as any).window = win
  })

  it('calls gsap.from with the element', () => {
    scrollFade('.target')
    expect(mockFrom).toHaveBeenCalledOnce()
    const [el] = mockFrom.mock.calls[0]
    expect(el).toBe(document.querySelector('.target'))
  })

  it('passes default y=30 and opacity=0', () => {
    scrollFade('.target')
    const [, vars] = mockFrom.mock.calls[0]
    expect(vars.y).toBe(30)
    expect(vars.opacity).toBe(0)
  })

  it('respects custom options', () => {
    scrollFade('.target', { y: 50, duration: 1, reverse: true })
    const [, vars] = mockFrom.mock.calls[0]
    expect(vars.y).toBe(50)
    expect(vars.duration).toBe(1)
    expect(vars.scrollTrigger.toggleActions).toBe('play none none reverse')
  })

  it('does nothing when selector is not found', () => {
    expect(() => scrollFade('.nonexistent')).not.toThrow()
    expect(mockFrom).not.toHaveBeenCalled()
  })
})
