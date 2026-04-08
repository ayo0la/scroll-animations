# @ayo0la/scroll-animations

Scroll-triggered text and element animations built on GSAP. Named exports: `charStagger`, `wordStagger`, `lineStagger`, `scrollFade`, `staggerCards`.

## Install

```bash
npm i @ayo0la/scroll-animations gsap
```

> **Requires gsap 3+** — install it separately. GSAP is a peer dependency.

## Scope

**Static HTML only.** These functions mutate the DOM at runtime (wrapping characters and words in `<span>` tags). Use them with plain HTML, Astro, Eleventy, or Next.js static export.

Do not target elements inside a React, Vue, or Svelte component tree — the framework will overwrite the injected spans on next render. React/Vue/Svelte users should use GSAP with refs directly.

**SSR safe:** All functions return early when `typeof window === 'undefined'`. Safe to import in Next.js, Nuxt, or SvelteKit builds without guards.

## Usage

```js
import { charStagger, wordStagger, lineStagger, scrollFade, staggerCards } from '@ayo0la/scroll-animations'

// Register ScrollTrigger once in your app entry point
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// Animate each character of a heading
charStagger('.hero h1', { stagger: 0.02, delay: 0.3 })

// Animate each word sliding in from left
wordStagger('.about h2', { stagger: 0.08, x: -40 })

// Animate line by line (element must use <br> for line breaks)
lineStagger('.mdfld h2', { stagger: 0.12, y: 30 })

// Fade + slide an element into view
scrollFade('.about p', { y: 30, triggerStart: 'top 80%' })

// Stagger a grid of cards
staggerCards('.project-card', { stagger: 0.1, reverse: true })
```

## Shared options (all functions)

| Option | Type | Default | Notes |
|---|---|---|---|
| `duration` | `number` | `0.6` | Tween duration in seconds |
| `delay` | `number` | `0` | Tween delay in seconds |
| `ease` | `string` | `'power2.out'` | Any GSAP ease string |
| `reverse` | `boolean` | `false` | `true` = replay animation on scroll-up |
| `triggerStart` | `string` | `'top 75%'` | When the animation fires. `'top 80%'` fires later, `'top 60%'` fires earlier. |

## `charStagger(selector, options?)`

Wraps each character in a `<span>`. Preserves inline HTML tags.

| Option | Type | Default |
|---|---|---|
| `stagger` | `number` | `0.02` |
| `y` | `number` | `20` |
| `opacity` | `number` | `0` |

## `wordStagger(selector, options?)`

Wraps each word in a `<span>`.

| Option | Type | Default |
|---|---|---|
| `stagger` | `number` | `0.08` |
| `x` | `number` | `-40` |
| `y` | `number` | `0` |
| `opacity` | `number` | `0` |

## `lineStagger(selector, options?)`

Splits on `<br>` elements and wraps each line in a `<span>`.

| Option | Type | Default |
|---|---|---|
| `stagger` | `number` | `0.12` |
| `y` | `number` | `30` |
| `opacity` | `number` | `0` |

## `scrollFade(selector, options?)`

Fades and slides the element itself — no DOM splitting.

| Option | Type | Default |
|---|---|---|
| `x` | `number` | `0` |
| `y` | `number` | `30` |
| `opacity` | `number` | `0` |
| `scale` | `number` | `1` |

## `staggerCards(selector, options?)`

Staggers all matching elements as a group.

| Option | Type | Default |
|---|---|---|
| `stagger` | `number` | `0.1` |
| `x` | `number` | `0` |
| `y` | `number` | `40` |
| `opacity` | `number` | `0` |

## License

MIT
