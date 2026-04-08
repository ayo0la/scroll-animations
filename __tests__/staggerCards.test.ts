import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockFrom = vi.hoisted(() => vi.fn())
vi.mock('gsap', () => ({
  gsap: { registerPlugin: vi.fn(), from: mockFrom },
}))
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }))

import { staggerCards } from '../src/staggerCards'

describe('staggerCards', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="card">A</div>
      <div class="card">B</div>
      <div class="card">C</div>
    `
    mockFrom.mockClear()
  })

  it('returns early in SSR environment', () => {
    const win = (global as any).window
    delete (global as any).window
    expect(() => staggerCards('.card')).not.toThrow()
    ;(global as any).window = win
  })

  it('calls gsap.from with all matching elements', () => {
    staggerCards('.card')
    expect(mockFrom).toHaveBeenCalledOnce()
    const [els] = mockFrom.mock.calls[0]
    expect(els.length).toBe(3)
  })

  it('passes default stagger=0.1 and y=40', () => {
    staggerCards('.card')
    const [, vars] = mockFrom.mock.calls[0]
    expect(vars.stagger).toBe(0.1)
    expect(vars.y).toBe(40)
  })

  it('does nothing when no elements match', () => {
    expect(() => staggerCards('.nonexistent')).not.toThrow()
    expect(mockFrom).not.toHaveBeenCalled()
  })

  it('accepts an Element directly', () => {
    const el = document.querySelector('.card')!
    staggerCards(el)
    expect(mockFrom).toHaveBeenCalledOnce()
  })
})
