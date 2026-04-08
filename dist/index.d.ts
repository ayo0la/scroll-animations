interface BaseOptions {
    duration?: number;
    delay?: number;
    ease?: string;
    reverse?: boolean;
    triggerStart?: string;
}
interface CharStaggerOptions extends BaseOptions {
    stagger?: number;
    y?: number;
    opacity?: number;
}
interface WordStaggerOptions extends BaseOptions {
    stagger?: number;
    x?: number;
    y?: number;
    opacity?: number;
}
interface LineStaggerOptions extends BaseOptions {
    stagger?: number;
    y?: number;
    opacity?: number;
}
interface ScrollFadeOptions extends BaseOptions {
    x?: number;
    y?: number;
    opacity?: number;
    scale?: number;
}
interface StaggerCardsOptions extends BaseOptions {
    stagger?: number;
    x?: number;
    y?: number;
    opacity?: number;
}

declare function charStagger(selector: string | Element, options?: CharStaggerOptions): void;

declare function wordStagger(selector: string | Element, options?: WordStaggerOptions): void;

declare function lineStagger(selector: string | Element, options?: LineStaggerOptions): void;

declare function scrollFade(selector: string | Element, options?: ScrollFadeOptions): void;

declare function staggerCards(selector: string | Element, options?: StaggerCardsOptions): void;

export { type BaseOptions, type CharStaggerOptions, type LineStaggerOptions, type ScrollFadeOptions, type StaggerCardsOptions, type WordStaggerOptions, charStagger, lineStagger, scrollFade, staggerCards, wordStagger };
