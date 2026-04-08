// src/_splitAnimate.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
function splitElement(el, by) {
  if (by === "line") {
    const parts = el.innerHTML.split(/<br\s*\/?>/i);
    el.innerHTML = parts.map((p) => `<span class="al">${p}</span>`).join("");
    return Array.from(el.querySelectorAll(".al"));
  }
  if (by === "word") {
    const tokens = el.innerHTML.split(/(<[^>]+>)|(\s+)/).filter(Boolean);
    el.innerHTML = tokens.map((t) => {
      if (t.startsWith("<") || /^\s+$/.test(t)) return t;
      return `<span class="aw">${t}</span>`;
    }).join("");
    return Array.from(el.querySelectorAll(".aw"));
  }
  el.innerHTML = el.innerHTML.replace(
    /(<[^>]+>)|(.)/g,
    (_, tag, ch) => tag ? tag : `<span class="ac">${ch}</span>`
  );
  return Array.from(el.querySelectorAll(".ac"));
}
function _splitAnimate(el, splitBy, fromVars, options) {
  const {
    duration = 0.6,
    delay = 0,
    ease = "power2.out",
    reverse = false,
    triggerStart = "top 75%",
    stagger
  } = options;
  const spans = splitElement(el, splitBy);
  gsap.from(spans, {
    ...fromVars,
    duration,
    delay,
    ease,
    stagger,
    scrollTrigger: {
      trigger: el,
      start: triggerStart,
      toggleActions: reverse ? "play none none reverse" : "play none none none"
    }
  });
}

// src/charStagger.ts
function charStagger(selector, options = {}) {
  if (typeof window === "undefined") return;
  const { stagger = 0.02, y = 20, opacity = 0, ...base } = options;
  const el = typeof selector === "string" ? document.querySelector(selector) : selector;
  if (!el) return;
  _splitAnimate(el, "char", { y, opacity }, { ...base, stagger });
}

// src/wordStagger.ts
function wordStagger(selector, options = {}) {
  if (typeof window === "undefined") return;
  const { stagger = 0.08, x = -40, y = 0, opacity = 0, ...base } = options;
  const el = typeof selector === "string" ? document.querySelector(selector) : selector;
  if (!el) return;
  _splitAnimate(el, "word", { x, y, opacity }, { ...base, stagger });
}

// src/lineStagger.ts
function lineStagger(selector, options = {}) {
  if (typeof window === "undefined") return;
  const { stagger = 0.12, y = 30, opacity = 0, ...base } = options;
  const el = typeof selector === "string" ? document.querySelector(selector) : selector;
  if (!el) return;
  _splitAnimate(el, "line", { y, opacity }, { ...base, stagger });
}

// src/scrollFade.ts
import { gsap as gsap2 } from "gsap";
import { ScrollTrigger as ScrollTrigger2 } from "gsap/ScrollTrigger";
gsap2.registerPlugin(ScrollTrigger2);
function scrollFade(selector, options = {}) {
  if (typeof window === "undefined") return;
  const {
    x = 0,
    y = 30,
    opacity = 0,
    scale = 1,
    duration = 0.6,
    delay = 0,
    ease = "power2.out",
    reverse = false,
    triggerStart = "top 75%"
  } = options;
  const el = typeof selector === "string" ? document.querySelector(selector) : selector;
  if (!el) return;
  gsap2.from(el, {
    x,
    y,
    opacity,
    scale,
    duration,
    delay,
    ease,
    scrollTrigger: {
      trigger: el,
      start: triggerStart,
      toggleActions: reverse ? "play none none reverse" : "play none none none"
    }
  });
}

// src/staggerCards.ts
import { gsap as gsap3 } from "gsap";
import { ScrollTrigger as ScrollTrigger3 } from "gsap/ScrollTrigger";
gsap3.registerPlugin(ScrollTrigger3);
function staggerCards(selector, options = {}) {
  if (typeof window === "undefined") return;
  const {
    stagger = 0.1,
    x = 0,
    y = 40,
    opacity = 0,
    duration = 0.6,
    delay = 0,
    ease = "power2.out",
    reverse = false,
    triggerStart = "top 75%"
  } = options;
  const els = typeof selector === "string" ? Array.from(document.querySelectorAll(selector)) : [selector];
  if (!els.length) return;
  gsap3.from(els, {
    x,
    y,
    opacity,
    stagger,
    duration,
    delay,
    ease,
    scrollTrigger: {
      trigger: els[0],
      start: triggerStart,
      toggleActions: reverse ? "play none none reverse" : "play none none none"
    }
  });
}
export {
  charStagger,
  lineStagger,
  scrollFade,
  staggerCards,
  wordStagger
};
//# sourceMappingURL=index.js.map