Object.defineProperty(exports,"__esModule",{value:1});const n={};let t=null,u=null,l=null,i=null;function o(n,u){return e(),l=r(n,l,t.t),null===t.t&&(t.t=l),u(l)}function r(n,u,l){if(null===u)return null===l?n(t):l;if(null===u.u){const l=n(t);return u.u=l,l}return u.u}function e(){if(null===t)throw new Error("Cannot use hooks from outside of components")}function f(n){this.current=n}function c(n){this.l=new f(n),this.u=null}const s=Object.prototype.hasOwnProperty,h=Array.prototype.slice;function a(n){return"string"==typeof n}function p(n){return"number"==typeof n}function d(n){return"function"==typeof n}function w(n){return null!==n&&"object"==typeof n}function v(n){return n.children}function x(n,t,u){this.i=n,this.o=u,this.h=null,this.p=t,this.v=null,this.t=null,this.m=null,this.M=null,this.g=null,this.T=null,this.j=null,this.A=null,this.O=null,this.C=null,this._=null}function y(n,t){n.M=t,void 0!==n.p.ref&&(n.p.ref.current=t)}function m(t,u,l){let i=null;null===u?u=n:(void 0!==u.key&&(i=p(u.key)?""+u.key:u.key,delete u.key),void 0===u.ref||u.ref instanceof f||delete u.ref);const o=new x(t,u,i);if(arguments.length>2){const u=arguments.length>3;u&&(l=h.call(arguments,2)),d(t)?(o.p===n&&(o.p={}),o.p.children=l):"#"===t?(o.p===n&&(o.p={}),o.p.children=""+l):u?b(o,l):g(o,l)}return o}function M(t){if(t instanceof x)return t;if(a(t))return new x("#",{children:t},null);if(p(t))return new x("#",{children:""+t},null);if(t instanceof Array){const u=new x("[",n,null);return b(u,t),u}return null}function b(n,t){let u,l=null,i=0;for(;i<t.length;++i)u=M(t[i]),null!==u&&(u.T=n,u.h=i,null!==l?l.A=u:n.j=u,l=u)}function g(n,t){const u=M(t);null!==u&&(n.j=u,u.T=n)}function T(n,t){n["%vnode"]=t}function j(n){for(;;){if(null===n)return null;if(null!==n.M)return n;n=n.T}}function A(n,t,u){H(n,t,u,E,O)}function E(t,u,l,i){if(""!==(u=C(u))){if("style"===u)return w(l)||(l=n),w(i)||(i=n),void _(t[u],l,i);if(N(u,l)&&t.setAttribute(u,l),u in t)try{return void(t[u]=l)}catch(n){}}}function O(t,u,l){if(""!==(u=C(u))){if("style"===u)return w(l)&&_(t[u],n,l),void t.removeAttribute(u);if(N(u,l)&&t.removeAttribute(u),u in t)try{t[u]=null}catch(n){}}}function C(n){return"className"===n?"class":/^on[A-Z]/.test(n)?n.toLowerCase():n}function _(n,t,u){H(n,t,u,k,G)}function k(n,t,u){n[t]=u}function G(n,t){n[t]=""}function H(n,t,u,l,i){let o;for(o in u)L(u,o)&&(L(t,o)||i(n,o,u[o]));for(o in t)L(t,o)&&l(n,o,t[o],u[o])}function L(n,t){return s.call(n,t)&&void 0!==n[t]&&null!==n[t]}function N(n,t){return"innerHTML"===n||"innerText"===n||"textContent"===n?0:a(t)||p(t)?1:0}function S(t){if(t.g=V(t),Z(t.i))return;const u=function(t){if("#"===t.i)return u=t.p.children,document.createTextNode(u);var u;return function(t,u,l){const i=1===t?document.createElementNS("http://www.w3.org/2000/svg",u):document.createElement(u);return A(i,l,n),i}(t.g,t.i,t.p)}(t);y(t,u)}function V(n){return"svg"===n.i?1:1===n.T.g&&"foreignObject"===n.T.i?0:n.T.g}function Z(n){return"["===n||d(n)}function q(n,t){if(function(n,t){var u,l;n.g=V(n),Z(n.i)||(y(n,t.M),"#"===n.i?n.p.children!==t.p.children&&(u=n.M,l=n.p.children,u.textContent=l):A(n.M,n.p,t.p))}(n,t),null!==n.M){const t=j(n.T);null!==t&&(t._=n.M)}}function z(n,t,u){this.k=n,this.G=t,this.H=F.bind(this),this.L=u,this.u=null}const B=new Map;let D=null;function F(n){let t;if(d(n))try{t=n(this.G)}catch(n){return void K(n,this.L)}else t=n;(1!==this.k||J(t))&&this.G!==t&&(this.G=t,B.set(this.L,this),null!==D&&clearTimeout(D),D=setTimeout(I))}function I(){B.forEach((function(n){on(n.L)})),B.clear(),D=null}function J(n){return null===n||n instanceof Error?1:0}function K(n,t){let u,l=t.T;for(;null!==l;){for(u=l.t;null!==u;){if(1===u.k)return void u.H((function(t){return t||n}));u=u.u}l=l.T}throw n}function P(n,t,u){this.k=n,this.N=t,this.S=u,this.V=null,this.Z=null,this.q=null,this.u=null}function Q(n,u,l){return void 0===l&&(l=null),o=function(){return new P(n,u,l)},f=function(n){n.N=u,n.S=l},e(),i=r(o,i,t.m),null===t.m&&(t.m=i),f(i);var o,f}function R(n,t,u){let l=t.m;for(;null!==l;){if(l.k===n&&(u||Y(l.S,l.Z)))try{W(l)}catch(n){K(n,t)}l=l.u}}function U(n,t,u){let l=t.m;for(;null!==l;){if(l.k===n&&(null!==l.q||null!==l.V)&&(u||Y(l.S,l.Z)))try{X(l,u)}catch(n){K(n,t)}l=l.u}}function W(n){n.Z=n.S,n.q=n.V,n.V=n.N(),void 0===n.V&&(n.V=null)}function X(n,t){null===n.q||t?null!==n.V&&n.V():n.q()}function Y(n,t){return null===n?1:0===n.length||null===t||function(n,t){if(n.length!==t.length)return 0;for(let u=n.length-1;u>=0;--u)if(n[u]!==t[u])return 0;return 1}(n,t)?0:1}function $(n,o){d(n.i)?function(n,o,r){if(null!==o){n.v=o.v,n.t=o.t,n.m=o.m;let t=n.t;for(;null!==t;)t.L=n,t=t.u}let e;f=n,t=f;var f;try{e=n.i(n.p)}catch(t){K(t,n),e=null}t=null,u=null,l=null,i=null;const c=M(e);null!==c&&(c.T=n);const s=r?n.j:null!==o?o.j:null;null!==s&&(null!==c&&c.i===s.i&&c.o===s.o?nn(c,s):tn(n,s));n.j=c}(n,n.O,o):null!==n.O&&function(n,t){const u=un(t),l=un(n);let i;u.forEach((function(t,u){i=l.get(u),void 0!==i&&i.i===t.i?nn(i,t):tn(n,t)}))}(n,n.O)}function nn(n,t){n.O=t}function tn(n,t){null===n.C?n.C=[t]:n.C.push(t)}function un(n){const t=new Map;let u=n.j;for(;null!==u;)null!==u.o?t.set(u.o,u):t.set(u.h,u),u=u.A;return t}const ln=document.createDocumentFragment();function on(n){const t=new Map,u=new Map,l=j(n),i=l.M;l.M=ln,fn(rn,en,n,t,u),i.appendChild(ln),l.M=i,u.forEach((function(n,t){U(1,t,n)})),t.forEach((function(n,t){R(1,t,n)})),setTimeout((function(){u.forEach((function(n,t){U(0,t,n)})),t.forEach((function(n,t){R(0,t,n)}))}))}function rn(n,t,u,l){const i=n===t;if($(n,i),n.i!==v&&(i?null!==n.m&&(l.set(n,0),u.set(n,0)):null!==n.O?(q(n,n.O),null!==n.m&&(l.set(n.O,0),u.set(n,0)),n.O=null):(!function(n){if(S(n),null!==n.M){const t=j(n.T);if(null!==t){const u=null!==t._?t._.nextSibling:t.M.firstChild;t.M.insertBefore(n.M,u),t._=n.M}}}(n),null!==n.m&&u.set(n,1))),null!==n.C){for(let t=0;t<n.C.length;++t)(function(n,t){const u=n;for(;;){if(null!==n.M)t(n.M);else if(null!==n.j){n=n.j;continue}if(n===u)return;for(;null===n.A;){if(null===n.T||n.T===u)return;n=n.T}n=n.A}})(n.C[t],(function(n){null!==n.parentNode&&n.parentNode.removeChild(n)})),fn((function(n){null!==n.m&&l.set(n,1)}),null,n.C[t]);n.C=null}}function en(n){null!==n._&&(n._=null)}function fn(n,t,u,l,i){let o=u;for(;;)if(n(o,u,l,i),null===o.j){if(o===u)return;for(;null===o.A;){if(null===o.T||o.T===u)return;o=o.T,null!==t&&t(o)}o=o.A}else o=o.j}function cn(n,t){let u;return(u=t["%vnode"])||(u=new x(v,{},null),u.g="ownerSVGElement"in t?1:0,y(u,t),T(t,u)),u.p.children=n,u}exports.Fragment="[",exports.Ref=f,exports.TextNode="#",exports.createElement=m,exports.createPortal=cn,exports.jsx=m,exports.render=function(n,t){on(cn(n,t))},exports.useEffect=function(n,t){return Q(0,n,t)},exports.useError=function(n){return o((function(t){return J(n)||(n=null),new z(1,n,t)}),(function(n){return[n.G,n.H]}))},exports.useLayoutEffect=function(n,t){return Q(1,n,t)},exports.useRef=function(n){return l=function(){return new c(n)},i=function(n){return n.l},e(),u=r(l,u,t.v),null===t.v&&(t.v=u),i(u);var l,i},exports.useState=function(n){return o((function(t){return new z(0,n,t)}),(function(n){return[n.G,n.H]}))};
