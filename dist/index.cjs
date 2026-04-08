"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  charStagger: () => charStagger,
  lineStagger: () => lineStagger,
  scrollFade: () => scrollFade,
  staggerCards: () => staggerCards,
  wordStagger: () => wordStagger
});
module.exports = __toCommonJS(index_exports);

// src/_splitAnimate.ts
var import_gsap = require("gsap");
var import_ScrollTrigger = require("gsap/ScrollTrigger");
import_gsap.gsap.registerPlugin(import_ScrollTrigger.ScrollTrigger);
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
  import_gsap.gsap.from(spans, {
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
var import_gsap2 = require("gsap");
var import_ScrollTrigger2 = require("gsap/ScrollTrigger");
import_gsap2.gsap.registerPlugin(import_ScrollTrigger2.ScrollTrigger);
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
  import_gsap2.gsap.from(el, {
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
var import_gsap3 = require("gsap");
var import_ScrollTrigger3 = require("gsap/ScrollTrigger");
import_gsap3.gsap.registerPlugin(import_ScrollTrigger3.ScrollTrigger);
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
  import_gsap3.gsap.from(els, {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  charStagger,
  lineStagger,
  scrollFade,
  staggerCards,
  wordStagger
});
//# sourceMappingURL=index.cjs.map