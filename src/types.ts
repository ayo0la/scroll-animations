export interface BaseOptions {
  duration?: number
  delay?: number
  ease?: string
  reverse?: boolean
  triggerStart?: string
}

export interface CharStaggerOptions extends BaseOptions {
  stagger?: number
  y?: number
  opacity?: number
}

export interface WordStaggerOptions extends BaseOptions {
  stagger?: number
  x?: number
  y?: number
  opacity?: number
}

export interface LineStaggerOptions extends BaseOptions {
  stagger?: number
  y?: number
  opacity?: number
}

export interface ScrollFadeOptions extends BaseOptions {
  x?: number
  y?: number
  opacity?: number
  scale?: number
}

export interface StaggerCardsOptions extends BaseOptions {
  stagger?: number
  x?: number
  y?: number
  opacity?: number
}
