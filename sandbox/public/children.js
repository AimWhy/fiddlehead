/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../output/dist/index.min.js":
/*!***********************************!*\
  !*** ../output/dist/index.min.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nvar _excluded = [\"key\", \"ref\"],\n    _excluded2 = [\"key\", \"ref\"];\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }\n\nfunction _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }\n\nfunction n(n, t) {\n  return Object.prototype.hasOwnProperty.call(n, t);\n}\n\nfunction t(n) {\n  return \"string\" == typeof n || n instanceof String;\n}\n\nfunction o(n) {\n  return \"number\" == typeof n || n instanceof Number;\n}\n\nfunction l(n) {\n  return n instanceof Function;\n}\n\nfunction u(n) {\n  return n instanceof Array;\n}\n\nfunction e(n) {\n  return null == n;\n}\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: !0\n}));\nvar i = null,\n    r = -1;\n\nfunction c() {\n  if (null === i) throw new Error(\"Cannot call hooks from outside of the component\");\n  return [i, ++r];\n}\n\nfunction f(n) {\n  this.current = n;\n}\n\nfunction s(n, t, o, l) {\n  this.t = n, this.o = t, this.l = o, this.u = l, this.i = [], this.h = null, this.m = [], this.p = [], this.v = null, this.g = null, this.j = null, this.O = null;\n}\n\nfunction h(n, t) {\n  n.j = t, n.u instanceof f && (n.u.current = t);\n}\n\nfunction a(n) {\n  if (n instanceof s) return n;\n\n  if (t(n) || o(n)) {\n    var _t = new s(\"#txt\", {}, null, null);\n\n    return _t.g = n, _t;\n  }\n\n  if (u(n)) {\n    var _t2 = new s(\"#arr\", {}, null, null);\n\n    for (var _o = 0; _o < n.length; _o++) {\n      var _l = a(n[_o]);\n\n      null !== _l && (_l.h = _t2, _l.v = _o, _t2.m.push(_l));\n    }\n\n    return _t2;\n  }\n\n  return null;\n}\n\nfunction w(n, t) {\n  var _t$key = t.key,\n      l = _t$key === void 0 ? null : _t$key,\n      _t$ref = t.ref,\n      u = _t$ref === void 0 ? null : _t$ref,\n      e = _objectWithoutProperties(t, _excluded),\n      i = new s(n, e, l, u);\n\n  for (var _n = 0; _n < (arguments.length <= 2 ? 0 : arguments.length - 2); _n++) {\n    var _t3 = a(_n + 2 < 2 || arguments.length <= _n + 2 ? undefined : arguments[_n + 2]);\n\n    null !== _t3 && (_t3.h = i, _t3.v = _n, i.m.push(_t3));\n  }\n\n  return i;\n}\n\nfunction m(n) {\n  return n.join(\"/\");\n}\n\nvar p = 0;\nvar b = 0;\n\nfunction d(t) {\n  return n(t, \"hook_cid\") || (t.hook_cid = \"~\" + (++b).toString(36)), t.hook_cid;\n}\n\nfunction v(t) {\n  return n(t, \"hook_alias\") || (t.hook_alias = function (n) {\n    return n.name + \"]\" + (++p).toString(36);\n  }(t)), t.hook_alias;\n}\n\nfunction x(n, t) {\n  n.hook_vnode = t;\n}\n\nvar g = Object.create(null);\n\nfunction y(n) {\n  delete g[m(n)];\n}\n\nfunction j(n, t) {\n  n.textContent = t;\n}\n\nfunction O(t, o, l) {\n  for (var _u in l) {\n    n(l, _u) && e(o[_u]) && k(t, _u, l[_u]);\n  }\n\n  for (var _u2 in o) {\n    n(o, _u2) && _(t, _u2, o[_u2], l[_u2]);\n  }\n}\n\nfunction k(n, t, o) {\n  var _C = C(t, o),\n      _C2 = _slicedToArray(_C, 2),\n      l = _C2[0],\n      u = _C2[1];\n\n  e(u) || n.removeAttribute(l);\n}\n\nfunction _(l, u, i, r) {\n  var _C3 = C(u, i),\n      _C4 = _slicedToArray(_C3, 2),\n      c = _C4[0],\n      f = _C4[1];\n\n  if (!e(f)) if (\"style\" !== c) {\n    if ((t(f) || o(f)) && l.setAttribute(c, f), c in l) try {\n      l[c] = f;\n    } catch (n) {}\n  } else {\n    if (!e(r)) {\n      var _C5 = C(u, r),\n          _C6 = _slicedToArray(_C5, 2),\n          _t4 = _C6[1];\n\n      if (!e(_t4)) for (var _o2 in _t4) {\n        n(_t4, _o2) && !n(f, _o2) && (l.style[_o2] = \"\");\n      }\n    }\n\n    for (var _t5 in f) {\n      n(f, _t5) && (e(f[_t5]) || (l.style[_t5] = f[_t5]));\n    }\n  }\n}\n\nfunction C(n, o) {\n  return l(o) ? [n.toLowerCase(), o] : \"className\" === n ? u(o) ? [\"class\", o.filter(function (n) {\n    return t(n);\n  }).join(\" \")] : [\"class\", o] : \"class\" === n ? (console.error(\"className instead of class\"), [n]) : \"style\" !== n || e(o) || function (n) {\n    return !!n && n.constructor === Object;\n  }(o) ? [n, o] : (console.error(\"Style must be a plain object\", o), [n]);\n}\n\nfunction E(n) {\n  \"svg\" === n.t ? n.O = \"svg\" : null !== n.h ? n.O = n.h.O : n.O = \"html\";\n  var o = null;\n  if (\"#txt\" === n.t) l = n.g, o = document.createTextNode(l);else if (\"#frg\" === n.t || \"#arr\" === n.t) ;else if (t(n.t)) {\n    var _t6 = null;\n    \"svg\" === n.O && (_t6 = \"http://www.w3.org/2000/svg\"), o = function (n, t, o) {\n      var l = null !== n ? document.createElementNS(n, t) : document.createElement(t);\n      return O(l, o, {}), l;\n    }(_t6, n.t, n.o), x(o, n);\n  }\n  var l;\n  h(n, o);\n\n  for (var _t7 = 0; _t7 < n.m.length; _t7++) {\n    E(n.m[_t7]);\n  }\n}\n\nfunction N(t, o) {\n  !function (t, o) {\n    var l = \"\";\n\n    for (var _u3 in t) {\n      if (n(t, _u3) && !n(o, _u3) && !_u3.startsWith(l + \"/\")) {\n        var _n2 = t[_u3];\n        null !== _n2.j && (z(_n2), l = _u3);\n      }\n    }\n  }(t, o), function (t, o) {\n    var l = Object.keys(_objectSpread(_objectSpread({}, t), o));\n\n    for (var _u4 = 0; _u4 < l.length; _u4++) {\n      var _e2 = l[_u4];\n\n      if (n(t, _e2) && n(o, _e2)) {\n        var _n3 = o[_e2];\n\n        if (null !== _n3.j) {\n          var _o3 = t[_e2];\n          h(_n3, _o3.j), \"#txt\" === _n3.t ? _n3.g !== _o3.g && j(_n3.j, _n3.g) : O(_n3.j, _n3.o, _o3.o);\n        }\n      }\n    }\n  }(t, o), function (t, o) {\n    var l = [];\n\n    for (var _u5 in o) {\n      if (n(o, _u5)) if (n(t, _u5)) S(l, t[_u5]), l.length = 0;else {\n        var _n4 = o[_u5];\n        null !== _n4.j && l.push(_n4);\n      }\n    }\n\n    l.length > 0 && S(l, null);\n  }(t, o);\n}\n\nfunction S(n, t) {\n  var o = t && D(t)[0] || null;\n\n  for (var _t8 = 0; _t8 < n.length; _t8++) {\n    var _l2 = n[_t8];\n\n    if (null !== _l2.j) {\n      var _n5 = A(_l2);\n\n      null !== _n5 && (null !== o && _n5 === o.parentNode ? _n5.insertBefore(_l2.j, o) : _n5.appendChild(_l2.j));\n    }\n  }\n}\n\nfunction z(n) {\n  var t = D(n);\n\n  for (var _n6 = 0; _n6 < t.length; _n6++) {\n    var _o4 = t[_n6];\n    null !== _o4.parentNode && _o4.parentNode.removeChild(_o4);\n  }\n}\n\nfunction A(n) {\n  return null === n.h ? null : null === n.h.j ? A(n.h) : n.h.j;\n}\n\nfunction D(n) {\n  return null !== n.j ? [n.j] : n.m.reduce(function (n, t) {\n    return n.concat(D(t));\n  }, []);\n}\n\nfunction F(n, t, o) {\n  this.k = I, this._ = n, this.C = t, this.N = null, this.S = o;\n}\n\nvar I = 0;\n\nfunction M(n, t) {\n  for (var _l3 = 0; _l3 < n.i.length; _l3++) {\n    var _u6 = n.i[_l3];\n    _u6 instanceof F && (t || 1 === _u6.k || 4 === _u6.k) && ((o = _u6).N = o._());\n  }\n\n  var o;\n}\n\nfunction R(n, t) {\n  for (var _o5 = 0; _o5 < n.i.length; _o5++) {\n    var _l4 = n.i[_o5];\n    _l4 instanceof F && (null !== _l4.S || null !== _l4.N) && (t || 1 === _l4.k || 4 === _l4.k) && U(_l4, t);\n  }\n}\n\nfunction U(n) {\n  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;\n  null === n.S || t ? null !== n.N && n.N() : n.S();\n}\n\nfunction q(n) {\n  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;\n  return null === n ? 1 : 0 === n.length ? 2 : !1 === t || function (n, t) {\n    for (var _o6 = 0; _o6 < n.length; _o6++) {\n      if (n[_o6] !== t[_o6]) return !1;\n    }\n\n    return !0;\n  }(n, t) ? 3 : 4;\n}\n\nfunction B(t, o) {\n  var u = o ? {} : H(t);\n  G(t);\n  var e = H(t);\n  !function (t, o) {\n    for (var _u7 in t) {\n      if (n(t, _u7)) {\n        var _e3 = !n(o, _u7),\n            _i2 = t[_u7];\n\n        l(_i2.t) && (R(_i2, _e3), _e3 && y(_i2.p));\n      }\n    }\n  }(u, e), E(t), N(u, e), function (t, o) {\n    for (var _u8 in o) {\n      if (n(o, _u8)) {\n        var _e4 = !n(t, _u8),\n            _i3 = o[_u8];\n\n        l(_i3.t) && M(_i3, _e4);\n      }\n    }\n  }(u, e);\n}\n\nfunction G(n) {\n  if (\"#txt\" === n.t) return;\n\n  if (!l(n.t)) {\n    for (var _t9 = 0; _t9 < n.m.length; _t9++) {\n      G(n.m[_t9]);\n    }\n\n    return;\n  }\n\n  i = n, r = -1;\n  var t = a(n.t(n.o));\n  i = null, r = -1, null !== t && (t.h = n, t.v = 0, n.m[0] = t, L(n), G(t));\n}\n\nfunction H(n) {\n  var t = Object.create(null);\n  return J(n, t), t;\n}\n\nfunction J(n, t) {\n  t[m(n.p)] = n;\n\n  for (var _o7 = 0; _o7 < n.m.length; _o7++) {\n    J(n.m[_o7], t);\n  }\n}\n\nfunction K(n, t) {\n  var _this = this;\n\n  this.A = n, this.D = t, this.F = function (n) {\n    var t;\n    t = l(n) ? n(_this.D) : n, t !== _this.D && (_this.D = t, B(_this.A, !1));\n  };\n}\n\nfunction L(n) {\n  for (var _t10 = 0; _t10 < n.m.length; _t10++) {\n    P(n.m[_t10], n.p);\n  }\n}\n\nfunction P(t, o) {\n  var u = _toConsumableArray(o);\n\n  var e, i, r;\n\n  if (null !== t.l ? u.push((e = t.l, \"@\" + encodeURIComponent(e))) : u.push(t.v), l(t.t) ? u.push(v(t.t)) : u.push(t.t), t.p = u, l(t.t)) {\n    var _o8 = function (t) {\n      var o = m(t);\n      return n(g, o) ? g[o] : null;\n    }(t.p);\n\n    if (null !== _o8) {\n      t.i = _o8;\n\n      for (var _n7 = 0; _n7 < t.i.length; _n7++) {\n        var _o9 = t.i[_n7];\n        _o9 instanceof K && (_o9.A = t);\n      }\n    }\n\n    i = t.p, r = t.i, g[m(i)] = r;\n  }\n\n  for (var _n8 = 0; _n8 < t.m.length; _n8++) {\n    P(t.m[_n8], u);\n  }\n}\n\nexports.h = function (n, t) {\n  for (var _len = arguments.length, o = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    o[_key - 2] = arguments[_key];\n  }\n\n  return t = t || {}, null === n ? w.apply(void 0, [\"#frg\", t].concat(o)) : l(n) ? function (n, t) {\n    var _t$key2 = t.key,\n        l = _t$key2 === void 0 ? null : _t$key2,\n        _t$ref2 = t.ref,\n        u = _t$ref2 === void 0 ? null : _t$ref2,\n        e = _objectWithoutProperties(t, _excluded2);\n\n    for (var _len2 = arguments.length, o = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {\n      o[_key2 - 2] = arguments[_key2];\n    }\n\n    return e.children = o, new s(n, e, l, u);\n  }.apply(void 0, [n, t].concat(o)) : w.apply(void 0, [n, t].concat(o));\n}, exports.mount = function (n, t) {\n  if (t.firstChild) throw new Error(\"Container must be empty\");\n  var o = new s(t.nodeName.toLowerCase(), {}, null, null);\n  h(o, t), x(t, o), t.ownerSVGElement ? o.O = \"svg\" : o.O = \"html\", n.h = o, n.v = 0, o.m[0] = n, o.p = [d(t)], L(o), B(n, !0);\n}, exports.useEffect = function (n) {\n  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n\n  var _c = c(),\n      _c2 = _slicedToArray(_c, 2),\n      o = _c2[0],\n      l = _c2[1];\n\n  if (o.i.length > l) {\n    var _u9 = o.i[l];\n    if ((null !== t || null !== _u9.C) && t.length !== _u9.C.length) throw new Error(\"Deps must be size-fixed\");\n\n    var _e5 = q(t, _u9.C);\n\n    if (2 === _e5) return;\n    if (3 === _e5) return void (_u9.k = _e5);\n\n    if (1 === _e5 || 4 === _e5) {\n      var _i4 = new F(n, t, _u9.N);\n\n      return _i4.k = _e5, void (o.i[l] = _i4);\n    }\n\n    return;\n  }\n\n  var u = new F(n, t, null);\n  u.k = q(t), o.i.push(u);\n}, exports.useRef = function (n) {\n  var _c3 = c(),\n      _c4 = _slicedToArray(_c3, 2),\n      t = _c4[0],\n      o = _c4[1];\n\n  if (t.i.length > o) return t.i[o];\n  var l = new f(n);\n  return t.i.push(l), l;\n}, exports.useState = function (n) {\n  var _c5 = c(),\n      _c6 = _slicedToArray(_c5, 2),\n      t = _c6[0],\n      o = _c6[1];\n\n  if (t.i.length > o) {\n    var _n9 = t.i[o];\n    return [_n9.D, _n9.F];\n  }\n\n  var l = new K(t, n);\n  return t.i.push(l), [l.D, l.F];\n};\n\n//# sourceURL=webpack://sandbox/../output/dist/index.min.js?");

/***/ }),

/***/ "./src/children.js":
/*!*************************!*\
  !*** ./src/children.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _output_dist_index_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../output/dist/index.min.js */ \"../output/dist/index.min.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\nfunction YourAd(_ref) {\n  var count = _ref.count,\n      setCount = _ref.setCount;\n\n  var _useState = (0,_output_dist_index_min_js__WEBPACK_IMPORTED_MODULE_0__.useState)(\"cat\"),\n      _useState2 = _slicedToArray(_useState, 2),\n      layout = _useState2[0],\n      setLayout = _useState2[1];\n\n  return (0,_output_dist_index_min_js__WEBPACK_IMPORTED_MODULE_0__.h)(\"form\", {\n    className: \"YourAd\",\n    style: {\n      padding: \"16px\",\n      border: \"1px solid #ccc\"\n    }\n  }, (0,_output_dist_index_min_js__WEBPACK_IMPORTED_MODULE_0__.h)(\"input\", {\n    type: \"checkbox\",\n    checked: layout === \"cat\",\n    onChange: function onChange(ev) {\n      return setLayout(ev.target.checked ? \"cat\" : \"dog\");\n    }\n  }), (0,_output_dist_index_min_js__WEBPACK_IMPORTED_MODULE_0__.h)(\"main\", null, layout === \"cat\" && (0,_output_dist_index_min_js__WEBPACK_IMPORTED_MODULE_0__.h)(\"div-cat\", {\n    className: \"Cat\",\n    style: {\n      display: 'block'\n    }\n  }, \"spam Render Cat\"), layout === \"dog\" && (0,_output_dist_index_min_js__WEBPACK_IMPORTED_MODULE_0__.h)(\"div-dog\", {\n    className: \"Dog\",\n    style: {\n      display: 'block'\n    }\n  }, \"spam Render Dog\")), (0,_output_dist_index_min_js__WEBPACK_IMPORTED_MODULE_0__.h)(\"button\", {\n    type: \"button\",\n    onclick: function onclick() {\n      setCount(function (count) {\n        return count + 1;\n      });\n    }\n  }, \"Update count\"));\n}\n\nfunction MyAd() {\n  var _useState3 = (0,_output_dist_index_min_js__WEBPACK_IMPORTED_MODULE_0__.useState)(1),\n      _useState4 = _slicedToArray(_useState3, 2),\n      count = _useState4[0],\n      setCount = _useState4[1];\n\n  return (0,_output_dist_index_min_js__WEBPACK_IMPORTED_MODULE_0__.h)(\"article\", {\n    className: \"MyAd\"\n  }, 'Count ' + count, (0,_output_dist_index_min_js__WEBPACK_IMPORTED_MODULE_0__.h)(YourAd, {\n    count: count,\n    setCount: setCount\n  }));\n}\n\n(0,_output_dist_index_min_js__WEBPACK_IMPORTED_MODULE_0__.mount)((0,_output_dist_index_min_js__WEBPACK_IMPORTED_MODULE_0__.h)(MyAd, null), document.getElementById(\"sandbox-container\"));\n\n//# sourceURL=webpack://sandbox/./src/children.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/children.js");
/******/ 	
/******/ })()
;