import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('gsap', () => ({
  gsap: { registerPlugin: vi.fn(), from: vi.fn() },
}))
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }))

import { _splitAnimate } from '../src/_splitAnimate'

describe('_splitAnimate — char splitting', () => {
  beforeEach(() => {
    document.body.innerHTML = '<h1 id="t">Hi</h1>'
  })

  it('wraps each character in .ac span', () => {
    const el = document.getElementById('t')!
    _splitAnimate(el, 'char', { opacity: 0, y: 20 }, { stagger: 0.02 })
    expect(document.querySelectorAll('.ac').length).toBe(2)
  })
})

describe('_splitAnimate — word splitting', () => {
  beforeEach(() => {
    document.body.innerHTML = '<h2 id="t">Hello world</h2>'
  })

  it('wraps each word in .aw span', () => {
    const el = document.getElementById('t')!
    _splitAnimate(el, 'word', { opacity: 0, x: -40 }, { stagger: 0.08 })
    expect(document.querySelectorAll('.aw').length).toBe(2)
  })
})

describe('_splitAnimate — line splitting', () => {
  beforeEach(() => {
    document.body.innerHTML = '<h2 id="t">Line one<br>Line two</h2>'
  })

  it('wraps each line in .al span', () => {
    const el = document.getElementById('t')!
    _splitAnimate(el, 'line', { opacity: 0, y: 30 }, { stagger: 0.12 })
    expect(document.querySelectorAll('.al').length).toBe(2)
  })
})
