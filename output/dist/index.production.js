Object.defineProperty(exports,"__esModule",{value:1});let n=null,t=null,u=null,l=null;function i(t,l){return r(),u=o(t,u,n.t),null===n.t&&(n.t=u),l(u)}function o(t,u,l){if(null===u)return null===l?t(n):l;if(null===u.u){const l=t(n);return u.u=l,l}return u.u}function r(){if(null===n)throw new Error("Cannot use hooks from outside of components")}function e(n){this.current=n}function f(n){this.l=new e(n),this.u=null}const c=Object.prototype.hasOwnProperty,s=Array.prototype.slice;function h(n){return"string"==typeof n}function a(n){return"number"==typeof n}function d(n){return"function"==typeof n}function p(n){return null!==n&&"object"==typeof n}function v(n){return n.children}function w(n,t,u){this.i=n,this.o=u,this.h=null,this.p=t,this.v=null,this.t=null,this.m=null,this.g=null,this.M=null,this.j=null,this.A=null,this.O=null,this.T=null,this.P=null,this._=null}function y(n,t){n.g=t,void 0!==n.p.ref&&(n.p.ref.current=t)}function m(n,t,u){null===t&&(t={});let l=null;void 0!==t.key&&null!==t.key&&(l=""+l),delete t.key,void 0===t.ref||t.ref instanceof e||delete t.ref;const i=new w(n,t,l);if(arguments.length>2){const t=arguments.length>3;if(t&&(u=s.call(arguments,2)),d(n))i.p.children=u;else if("#"===n)if(t){let n="",t=0;for(;t<u.length;++t)n+=b(u[t]);i.p.children=n}else i.p.children=b(u);else g(i,t?u:[u])}return i}function x(n){if(n instanceof w)return n;if(h(n))return new w("#",{children:n},null);if(a(n))return new w("#",{children:""+n},null);if(n instanceof Array){const t=new w("[",{},null);return g(t,n),t}return null}function b(n){return h(n)?n:a(n)?""+n:""}function g(n,t){let u,l=null,i=0;for(;i<t.length;++i)u=x(t[i]),null!==u&&(u.j=n,u.h=i,null!==l?l.O=u:n.A=u,l=u)}function M(n,t){n["%vnode"]=t}function j(n,t,u){k(n,t,u,A,E)}function A(n,t,u,l){if(""!==(t=O(t))){if("style"===t)return p(u)||(u={}),p(l)||(l={}),void T(n[t],u,l);if(h(u)||a(u))n.setAttribute(t,u);else if(t in n)try{n[t]=u}catch(n){0}}}function E(n,t,u){if(""!==(t=O(t))){if("style"===t)return p(u)||(u={}),T(n[t],{},u),void n.removeAttribute(t);if(h(u)||a(u))n.removeAttribute(t);else if(t in n)try{n[t]=null}catch(n){0}}}function O(n){return"class"===n?"":"className"===n?"class":/^on[A-Z]/.test(n)?n.toLowerCase():n}function T(n,t,u){k(n,t,u,P,_)}function P(n,t,u){n[t]=u}function _(n,t){n[t]=""}function k(n,t,u,l,i){let o;for(o in u)C(u,o)&&(C(t,o)||i(n,o,u[o]));for(o in t)C(t,o)&&l(n,o,t[o],u[o])}function C(n,t){return c.call(n,t)&&void 0!==n[t]&&null!==n[t]}function G(n){if(n.M=N(n),S(n.i))return;const t=function(n){if("#"===n.i)return t=n.p.children,document.createTextNode(t);var t;return function(n,t,u){const l=1===n?document.createElementNS("http://www.w3.org/2000/svg",t):document.createElement(t);return j(l,u,{}),l}(n.M,n.i,n.p)}(n);y(n,t)}function N(n){return"svg"===n.i?1:1===n.j.M&&"foreignObject"===n.j.i?0:n.j.M}function S(n){return"["===n||d(n)}function V(n,t){if(function(n,t){var u,l;n.M=N(n),S(n.i)||(y(n,t.g),"#"===n.i?n.p.children!==t.p.children&&(u=n.g,l=n.p.children,u.textContent=l):j(n.g,n.p,t.p))}(n,t),null!==n.g){const t=Z(n);null!==t&&(t._=n.g)}}function Z(n){let t=n.j;for(;;){if(null===t)return null;if(null!==t.g)return t;t=t.j}}function q(n,t,u){this.k=n,this.C=t,this.G=D.bind(this),this.N=u,this.u=null}const z=new Map;let B=null;function D(n){let t=z.get(this.k);void 0===t?(t=[[n,this]],z.set(this.k,t)):t.unshift([n,this]),null!==B&&clearTimeout(B),B=setTimeout(F)}function F(){z.forEach((function(n){let t,u,l,i,o=0;for(;n.length>0;){if(t=n.pop(),u=t[0],l=t[1],d(u))try{i=u(l.C)}catch(n){I(n,l.k);continue}else i=u;(1!==l.N||H(i))&&(i!==l.C&&(l.C=i,o=1))}o&&un(l.k)})),z.clear(),B=null}function H(n){return null===n||n instanceof Error?1:0}function I(n,t){let u,l=t.j;for(;null!==l;){for(u=l.t;null!==u;){if(1===u.N)return void u.G((function(t){return t||n}));u=u.u}l=l.j}throw n}function J(n,t,u,l){this.S=n,this.V=t,this.N=u,this.Z=l,this.q=null,this.B=null,this.u=null}function K(t,u,i){return void 0===u&&(u=null),e=function(){const n=W(u,null);return new J(t,u,i,n)},f=function(n){const l=W(u,n.V);if(1!==l){if(2!==l)return 0===l||3===l?(n.S=t,n.V=u,n.Z=l,n.B=n.q,void(n.q=null)):void 0;n.Z=l}},r(),l=o(e,l,n.m),null===n.m&&(n.m=l),f(l);var e,f}function L(n,t,u){let l=t.m;for(;null!==l;){if(l.N===n&&(u||0===l.Z||3===l.Z))try{R(l)}catch(n){I(n,t)}l=l.u}}function Q(n,t,u){let l=t.m;for(;null!==l;){if(l.N===n&&(null!==l.B||null!==l.q)&&(u||0===l.Z||3===l.Z))try{U(l,u)}catch(n){I(n,t)}l=l.u}}function R(n){n.q=n.S(),void 0===n.q&&(n.q=null)}function U(n,t){null===n.B||t?null!==n.q&&n.q():n.B()}function W(n,t){return null===n?0:0===n.length?1:null===t||function(n,t){if(n.length!==t.length)return 0;for(let u=n.length-1;u>=0;--u)if(n[u]!==t[u])return 0;return 1}(n,t)?2:3}function X(i,o){d(i.i)?function(i,o){const r=o?i.A:null!==i.T?i.T.A:null;let e;f=i,n=f;var f;try{e=i.i(i.p)}catch(n){I(n,i),e=null}n=null,t=null,u=null,l=null;const c=x(e);null!==c&&(c.j=i);null!==r&&(null!==c&&c.i===r.i&&c.o===r.o?Y(c,r):$(i,r));i.A=c}(i,o):null!==i.T&&function(n,t){const u=nn(t),l=nn(n);let i;u.forEach((function(t,u){i=l.get(u),void 0!==i&&i.i===t.i?Y(i,t):$(n,t)}))}(i,i.T)}function Y(n,t){if(n.T=t,d(n.i)){n.v=t.v,n.t=t.t,n.m=t.m;let u=n.t;for(;null!==u;)u.k=n,u=u.u}}function $(n,t){null===n.P?n.P=[t]:n.P.push(t)}function nn(n){const t=new Map;let u=n.A;for(;null!==u;)null!==u.o?t.set(u.o,u):t.set(u.h,u),u=u.O;return t}function tn(n,t,u,l,i){let o=u;for(;;)if(n(o,u,l,i),null===o.A){if(o===u)return;for(;null===o.O;){if(null===o.j||o.j===u)return;o=o.j,null!==t&&t(o)}o=o.O}else o=o.A}function un(n){const t=new Map,u=new Map;var l;tn(ln,on,n,t,u),u.forEach((function(n,t){Q(1,t,n)})),t.forEach((function(n,t){L(1,t,n)})),l=function(){u.forEach((function(n,t){Q(0,t,n)})),t.forEach((function(n,t){L(0,t,n)}))},"undefined"!=typeof Promise?Promise.resolve().then(l):setTimeout(l)}function ln(n,t,u,l){const i=n===t;if(X(n,i),n.i!==v&&(i?null!==n.m&&(l.set(n,0),u.set(n,0)):null!==n.T?(V(n,n.T),null!==n.m&&(l.set(n.T,0),u.set(n,0)),n.T=null):(!function(n){if(G(n),null!==n.g){const t=Z(n);if(null!==t){const u=null!==t._?t._.nextSibling:t.g.firstChild;t.g.insertBefore(n.g,u),t._=n.g}}}(n),null!==n.m&&u.set(n,1))),null!==n.P){for(let t=0;t<n.P.length;++t)(function(n,t){let u=n,l=n;for(;;){if(null!==l.g)t(l.g);else if(null!==l.A){l=l.A;continue}if(l===u)return;for(;null===l.O;){if(null===l.j||l.j===u)return;l=l.j}l=l.O}})(n.P[t],(function(n){null!==n.parentNode&&n.parentNode.removeChild(n)})),tn((function(n){null!==n.m&&l.set(n,1)}),null,n.P[t]);n.P=null}}function on(n){null!==n._&&(n._=null)}function rn(n,t){let u;return(u=t["%vnode"])||(u=new w(v,{},null),u.M="ownerSVGElement"in t?1:0,y(u,t),M(t,u)),u.p.children=n,u}exports.Fragment="[",exports.Ref=e,exports.TextNode="#",exports.createElement=m,exports.createPortal=rn,exports.jsx=m,exports.mount=function(n,t){un(rn(n,t))},exports.useEffect=function(n,t){return K(n,t,0)},exports.useError=function(n){return i((function(t){return H(n)||(n=null),new q(t,n,1)}),(function(n){return[n.C,n.G]}))},exports.useLayoutEffect=function(n,t){return K(n,t,1)},exports.useRef=function(u){return l=function(){return new f(u)},i=function(n){return n.l},r(),t=o(l,t,n.v),null===n.v&&(n.v=t),i(t);var l,i},exports.useState=function(n){return i((function(t){return new q(t,n,0)}),(function(n){return[n.C,n.G]}))};
