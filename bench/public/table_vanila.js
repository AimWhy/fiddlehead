!function(){"use strict";function t(t,e,n){for(var r=n.onFinish;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(t),r()}function e(t){return function(t){if(Array.isArray(t))return n(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function r(t){t.sort((function(t,e){return t-e}));var e=Math.floor(t.length/2);return t.length%2!=0?t[e]:(t[e-1]+t[e])/2}var o,i,a,c=document.getElementById("root");console.log("Rows: ",1e4),i=50,a=(o=[function(e){var n,r,o;t((n=Array(1e4).fill(1),r=document.createElement("table"),o=document.createElement("tbody"),n.forEach((function(t,e){var r=document.createElement("tr"),i=document.createElement("td"),a=document.createElement("td");i.textContent=e,a.textContent=n[e],r.appendChild(i),r.appendChild(a),o.appendChild(r)})),r.appendChild(o),r),c,{onFinish:e})},function(e){t(document.createTextNode("ABCD"),c,{onFinish:e})}]).map((function(){return[]})),function t(n){if(n<o.length){var c=performance.now();o[n]((function(){a[n].push(performance.now()-c),setTimeout((function(){t(n+1)}))}))}else--i>0?setTimeout((function(){t(0)})):function(t){var n=[];t.forEach((function(t){var o;n.push({Repeats:t.length,"Avg Time":(o=t,o.reduce((function(t,e){return t+e}),0)/o.length),"Med Time":r(t),"Min Time":Math.min.apply(Math,e(t)),"Max Time":Math.max.apply(Math,e(t))})})),console.table(n),console.log(t)}(a)}(0)}();