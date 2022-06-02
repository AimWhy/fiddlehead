"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const n=Object.prototype.hasOwnProperty,t=Array.prototype.slice;function u(n){return"string"==typeof n}function l(n){return"number"==typeof n}function i(n){return"function"==typeof n}function o(n){return null!==n&&"object"==typeof n}function e(n){return null==n}let r=null,f=null;function c(n,t){if(null===r)throw new Error("Cannot use hooks from outside of components");if(null===f)null===r.t?(f=n(r),r.t=f):f=r.t;else if(null===f.u){const t=f;f=n(r),t.u=f}else f=f.u;return t(f)}function s(n){this.l=new h(n),this.u=null}function h(n){this.current=n}function a(n,t,u){this.i=n,this.o=e(u)?null:""+u,this.h=null,void 0===t.ref||t.ref instanceof h||delete t.ref,this.p=t,this.t=null,this.v=null,this.m=null,this.g=null,this.M=null,this.j=null,this.A=null,this.O=null,this.T=null}function p(n){return n.children}function d(n,t){n.v=t,void 0!==n.p.ref&&(n.p.ref.current=t)}function w(n,u,l){null===u&&(u={});const o=u.key;delete u.key;const e=new a(n,u,o);if(arguments.length>2){const u=arguments.length>3;if(u&&(l=t.call(arguments,2)),i(n))e.p.children=l;else if("#"===n)if(u){let n="",t=0;for(;t<l.length;++t)n+=y(l[t]);e.p.children=n}else e.p.children=y(l);else m(e,u?l:[l])}return e}function v(n){if(n instanceof a)return n;if(u(n))return new a("#",{children:n});if(l(n))return new a("#",{children:""+n});if(n instanceof Array){const t=new a("[",{});return m(t,n),t}return null}function y(n){return u(n)?n:l(n)?""+n:""}function m(n,t){for(let u,l=null,i=0;i<t.length;++i)u=v(t[i]),null!==u&&(u.g=n,u.h=i,null!==l?l.j=u:n.M=u,l=u)}function x(n,t){n["%vnode"]=t}function b(n,t,u){T(n,t,u,g,M)}function g(n,t,i,e){if(""!==(t=j(t))){if("style"===t)return o(i)||(i={}),o(e)||(e={}),void A(n[t],i,e);if(u(i)||l(i))n.setAttribute(t,i);else if(t in n)try{n[t]=i}catch(n){0}}}function M(n,t,i){if(""!==(t=j(t))){if("style"===t)return o(i)||(i={}),A(n[t],{},i),void n.removeAttribute(t);if(u(i)||l(i))n.removeAttribute(t);else if(t in n)try{n[t]=null}catch(n){0}}}function j(n){return"class"===n?"":"className"===n?"class":/^on[A-Z]/.test(n)?n.toLowerCase():n}function A(n,t,u){T(n,t,u,E,O)}function E(n,t,u){n[t]=u}function O(n,t){n[t]=""}function T(n,t,u,l,i){let o;for(o in u)P(u,o)&&(P(t,o)||i(n,o,u[o]));for(o in t)P(t,o)&&l(n,o,t[o],u[o])}function P(t,u){return n.call(t,u)&&!e(t[u])}function _(n){if(n.m=k(n),C(n.i))return;const t=function(n){if("#"===n.i)return t=n.p.children,document.createTextNode(t);var t;return function(n,t,u){const l=1===n?document.createElementNS("http://www.w3.org/2000/svg",t):document.createElement(t);return b(l,u,{}),l}(n.m,n.i,n.p)}(n);d(n,t)}function k(n){return"svg"===n.i?1:1===n.g.m&&"foreignObject"===n.g.i?0:n.g.m}function C(n){return"["===n||i(n)}function G(n,t){if(function(n,t){var u,l;n.m=k(n),C(n.i)||(d(n,t.v),"#"===n.i?n.p.children!==t.p.children&&(u=n.v,l=n.p.children,u.textContent=l):b(n.v,n.p,t.p))}(n,t),null!==n.v){const t=N(n);null!==t&&(t.T=n.v)}}function N(n){let t=n.g;for(;;){if(null===t)return null;if(null!==t.v)return t;t=t.g}}function S(n,t,u){this.P=n,this._=t,this.k=q.bind(this),this.C=u,this.u=null}const V=new Map;let Z=null;function q(n){let t=V.get(this.P);void 0===t?(t=[[n,this]],V.set(this.P,t)):t.unshift([n,this]),null!==Z&&clearTimeout(Z),Z=setTimeout(z)}function z(){V.forEach((function(n,t){let u,l,o,e,r=!1;for(;n.length>0;){if(u=n.pop(),l=u[0],o=u[1],i(l))try{e=l(o._)}catch(n){D(n,o.P);continue}else e=l;(1!==o.C||B(e))&&(e!==o._&&(o._=e,r=!0))}r&&X(o.P)})),V.clear(),Z=null}function B(n){return null===n||n instanceof Error}function D(n,t){let u,l=t.g;for(;null!==l;){for(u=l.t;null!==u;){if(u instanceof S&&1===u.C)return void u.k((function(t){return t||n}));u=u.u}l=l.g}throw n}function F(n,t,u){this.G=n,this.N=t,this.C=u,this.S=null,this.V=null,this.u=null}function H(n){n.S=n.G(),void 0===n.S&&(n.S=null)}function I(n,t){null===n.V||t?null!==n.S&&n.S():n.V()}function J(n,t){return null===n?0:0===n.length?1:null===t||function(n,t){if(n.length!==t.length)return!1;for(let u=n.length-1;u>=0;--u)if(n[u]!==t[u])return!1;return!0}(n,t)?2:3}function K(n,t){i(n.i)?function(n,t){const u=t?n.M:null!==n.A?n.A.M:null;let l;i=n,r=i;var i;try{l=n.i(n.p)}catch(t){D(t,n),l=null}r=null,f=null;const o=v(l);null!==o&&(o.g=n,o.h=0);null!==u&&(null!==o&&o.i===u.i&&o.o===u.o?L(o,u):Q(n,u));n.M=o}(n,t):function(n){if(null===n.A)return;const t=R(n.A),u=R(n);let l;t.forEach((function(t,i){l=u.get(i),void 0!==l&&l.i===t.i?L(l,t):Q(n,t)}))}(n)}function L(n,t){if(n.A=t,i(n.i)){n.t=t.t;let u=n.t;for(;null!==u;)u instanceof S&&(u.P=n),u=u.u}}function Q(n,t){null===n.O?n.O=[t]:n.O.push(t)}function R(n){const t=new Map;let u=n.M;for(;null!==u;)null!==u.o?t.set(u.o,u):t.set(u.h,u),u=u.j;return t}function U(n,t,u,l,i){let o=u;for(;;)if(n(o,u,l,i),null===o.M){if(o===u)return;for(;null===o.j;){if(null===o.g||o.g===u)return;o=o.g,null!==t&&t(o)}o=o.j}else o=o.M}function W(n){"undefined"!=typeof Promise?Promise.resolve().then(n):setTimeout(n)}function X(n){const t=new Map,u=new Map;U(Y,$,n,t,u),W((function(){u.forEach((function(n,t){!function(n,t){let u=n.t;for(;null!==u;){if(u instanceof F&&(null!==u.V||null!==u.S)&&(t||0===u.C||3===u.C))try{I(u,t)}catch(t){D(t,n)}u=u.u}}(t,n)})),t.forEach((function(n,t){!function(n,t){let u=n.t;for(;null!==u;){if(u instanceof F&&(t||0===u.C||3===u.C))try{H(u)}catch(t){D(t,n)}u=u.u}}(t,n)}))}))}function Y(n,t,u,l){const i=n===t;if((K(n,i),n.i!==p)&&(i?null!==n.t&&(l.set(n,!1),u.set(n,!1)):null!==n.A?(G(n,n.A),null!==n.t&&(l.set(n.A,!1),u.set(n,!1)),n.A=null):(!function(n){if(_(n),null!==n.v){const t=N(n);if(null!==t){const u=null!==t.T?t.T.nextSibling:t.v.firstChild;t.v.insertBefore(n.v,u),t.T=n.v}}}(n),null!==n.t&&u.set(n,!0)),null!==n.O)){const t=n.O;n.O=null;for(let n=0;n<t.length;++n)(function(n,t){let u=n,l=n;for(;;){if(null!==l.v)t(l.v);else if(null!==l.M){l=l.M;continue}if(l===u)return;for(;null===l.j;){if(null===l.g||l.g===u)return;l=l.g}l=l.j}})(t[n],(function(n){null!==n.parentNode&&n.parentNode.removeChild(n)}));W((function(){for(let n=0;n<t.length;++n)U((function(n){null!==n.t&&l.set(n,!0)}),null,t[n])}))}}function $(n){null!==n.T&&(n.T=null)}function nn(n,t){let u;return(u=t["%vnode"])||(u=new a(p,{}),u.m="ownerSVGElement"in t?1:0,d(u,t),x(t,u)),u.p.children=n,u}exports.Fragment="[",exports.Ref=h,exports.TextNode="#",exports.createElement=w,exports.createPortal=nn,exports.jsx=w,exports.mount=function(n,t){X(nn(n,t))},exports.useEffect=function(n,t){return void 0===t&&(t=null),c((function(u){const l=J(t,null);return new F(n,t,l)}),(function(u){const l=J(t,u.N);if(1!==l){if(2!==l)return 0===l||3===l?(u.G=n,u.N=t,u.C=l,u.V=u.S,void(u.S=null)):void 0;u.C=l}}))},exports.useError=function(n){return c((function(t){return B(n)||(n=null),new S(t,n,1)}),(function(n){return[n._,n.k]}))},exports.useRef=function(n){return c((function(t){return new s(n)}),(function(n){return n.l}))},exports.useState=function(n){return c((function(t){return new S(t,n,0)}),(function(n){return[n._,n.k]}))};
