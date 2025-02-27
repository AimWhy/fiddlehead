'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
}); // Do not support namespace MathML as almost browsers do not support as well

var NAMESPACE_HTML = 0;
var NAMESPACE_SVG = 1; // Special node types

var Fragment = '[';
var Text = '#';

var Portal = function Portal(props) {
  return props.children;
};
/**
 * 
 * @param {function|string} type
 * @param {{}|string|null} props
 * @constructor
 */


function VNode(type, props) {
  // Identification
  // ==============

  /**
   * @type {string|function}
   */
  this.type_ = type;
  /**
   * @type {string|null}
   */

  this.key_ = null;
  /**
   * @type {number|null}
   */

  this.slot_ = null; // Props and hooks
  // ===============

  /**
   * @type {{}|string|null}
   */

  this.props_ = props;
  /**
   * @type {RefHook|null}
   */

  this.refHook_ = null;
  /**
   * @type {StateHook|null}
   */

  this.stateHook_ = null;
  /**
   * @type {EffectHook|null}
   */

  this.effectHook_ = null; // Output native node and relates
  // ==============================

  /**
   * @type {Node}
   */

  this.nativeNode_ = null;
  /**
   * @type {string|null}
   */

  this.namespace_ = null;
  /**
   * @type {Ref|null}
   */

  this.ref_ = null; // Linked-list pointers
  // ====================

  /**
   * @type {VNode|null}
   */

  this.parent_ = null;
  /**
   * @type {VNode|null}
   */

  this.child_ = null;
  /**
   * @type {VNode|null}
   */

  this.sibling_ = null; // Temporary properties
  // ====================

  /**
   * The previous version of this node
   * 
   * @type {VNode|null}
   */

  this.alternate_ = null;
  /**
   * The children (and their subtrees, of course) are marked to be deleted
   * 
   * @type {VNode[]|null}
   */

  this.deletions_ = null;
  /**
   * Insertion flag.
   * To be used to optimize the painting process
   * 
   * @type {number|null}
   */

  this.insertion_ = null;
  /**
   * If this node is a mounting point, this property tracks the native child
   * that will be used as the reference node to insert the new child after it
   *
   * @type {Node|null}
   */

  this.mountingRef_ = null;
  /**
   * Timeout ID.
   * After updating states, we need to re-render the subtree to display the up-to-date UI.
   * But when we batching updates, we use this property to re-render only highest node
   * which also needs re-rendering
   * 
   * @type {number|null}
   */

  this.updateId_ = null;
}

var PROP_VNODE = '%vnode';
/**
 * 
 * @param {Node} nativeNode 
 * @param {VNode} vnode 
 */

var attachVNodeToNativeNode = function attachVNodeToNativeNode(nativeNode, vnode) {
  nativeNode[PROP_VNODE] = vnode;
};
/**
 * 
 * @param {Node} nativeNode 
 * @returns {VNode|undefined}
 */


var extractVNodeFromNativeNode = function extractVNodeFromNativeNode(nativeNode) {
  return nativeNode[PROP_VNODE];
};
/**
 * 
 * @param {VNode} vnode 
 * @param {Node} nativeNode
 */


var linkNativeNodeWithVNode = function linkNativeNodeWithVNode(vnode, nativeNode) {
  vnode.nativeNode_ = nativeNode;

  if (vnode.ref_ !== null) {
    vnode.ref_.current = nativeNode;
  }
};
/**
 * 
 * @param {any} content 
 * @param {Element} nativeNode
 * @constructor
 */


function PortalElement(content, nativeNode) {
  this.content_ = content;
  this.nativeNode_ = nativeNode;
}
/**
 * 
 * @param {any} content 
 * @param {Element} nativeNode 
 * @returns {PortalElement}
 */


var createPortal = function createPortal(content, nativeNode) {
  return new PortalElement(content, nativeNode);
};
/**
 * 
 * @param {PortalElement} element
 * @returns {VNode}
 */


var createVNodeFromPortalElement = function createVNodeFromPortalElement(element) {
  var vnode = new VNode(Portal, {
    children: element.content_
  }); // Determine the namespace (we only support SVG and HTML namespaces)

  vnode.namespace_ = 'ownerSVGElement' in element.nativeNode_ ? NAMESPACE_SVG : NAMESPACE_HTML;
  linkNativeNodeWithVNode(vnode, element.nativeNode_); // Do not attach the vnode to the native node,
  // Because many portals can share the same native node.

  return vnode;
};
/**
 * The mounting point is a virtual node which has a native node (not null)
 * It means that a mounting point can contains native children
 * 
 * @param {VNode} current 
 * @returns {VNode}
 */


var resolveMountingPoint = function resolveMountingPoint(current) {
  while (true) {
    if (current === null) {
      return null;
    }

    if (current.nativeNode_ !== null) {
      return current;
    }

    current = current.parent_;
  }
};
/**
 * Walk through native children of a parent
 * 
 * @param {function} callback 
 * @param {VNode} parent 
 * @param {VNode?} stopBefore
 * @returns {void}
 */


var walkNativeChildren = function walkNativeChildren(callback, parent, stopBefore) {
  var current = parent.child_;

  if (current !== null) {
    while (true) {
      if (current === stopBefore) {
        return;
      }

      if (current.nativeNode_ !== null) {
        callback(current.nativeNode_);
      } else if (current.child_ !== null) {
        current = current.child_;
        continue;
      }

      if (current === parent) {
        return;
      }

      while (current.sibling_ === null) {
        if (current.parent_ === null || current.parent_ === parent) {
          return;
        }

        current = current.parent_;
      }

      current = current.sibling_;
    }
  }
};

var scheduleTimeout = setTimeout;
var cancelTimeout = clearTimeout;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var slice = Array.prototype.slice;

var isString = function isString(value) {
  return typeof value === 'string';
};

var isNumber = function isNumber(value) {
  return typeof value === 'number';
};

var isFunction = function isFunction(value) {
  return typeof value === 'function';
};

var isArray = function isArray(value) {
  return value instanceof Array;
};
/**
 * Object.is equivalence.
 * https://github.com/facebook/fbjs/blob/main/packages/fbjs/src/core/shallowEqual.js#L22
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 * 
 * @param {any} x 
 * @param {any} y 
 * @returns {boolean}
 */


var theSame = function theSame(x, y) {
  // SameValue algorithm
  if (x === y) {
    // +0 != -0
    return x !== 0 || 1 / x === 1 / y;
  } else {
    // NaN == NaN
    return x !== x && y !== y;
  }
};
/**
 * 
 * @param {{}} A 
 * @param {{}} B 
 * @returns {boolean}
 */


var objectsShallowEqual = function objectsShallowEqual(A, B) {
  if (A === B) {
    return true;
  }

  var kA = Object.keys(A);
  var kB = Object.keys(B);

  if (kA.length !== kB.length) {
    return false;
  }

  for (var k, i = kA.length - 1; i >= 0; --i) {
    k = kA[i];

    if (!(hasOwnProperty.call(B, k) && theSame(A[k], B[k]))) {
      return false;
    }
  }

  return true;
};
/**
 * 
 * @param {[]} A
 * @param {[]} B 
 * @returns {boolean}
 */


var arraysShallowEqual = function arraysShallowEqual(A, B) {
  if (A === B) {
    return true;
  }

  if (A.length !== B.length) {
    return false;
  }

  for (var i = A.length - 1; i >= 0; --i) {
    if (!theSame(A[i], B[i])) {
      return false;
    }
  }

  return true;
};
/**
 * 
 * @param {Text} node 
 * @param {string} newText 
 * @param {string} oldText 
 */


var updateNativeTextContent = function updateNativeTextContent(node, newText, oldText) {
  if (newText !== oldText) {
    node.textContent = newText;
  }
};
/**
 * 
 * @param {number} namespace 
 * @param {Element} element 
 * @param {{}} newAttributes 
 * @param {{}} oldAttributes 
 */


var updateNativeElementAttributes = function updateNativeElementAttributes(namespace, element, newAttributes, oldAttributes) {
  _updateObjectByKVs(namespace, element, newAttributes, oldAttributes, _updateElementAttribute, _removeElementAttribute);
}; // #StartBlock ElementAttributes


var MANIPULATE_AS_STYLE = 1;
var MANIPULATE_AS_PROPERTY = 2;
var MANIPULATE_AS_ATTRIBUTE = 3;
var MANIPULATE_AS_PROPERTY_AND_ATTRIBUTE = 4;
/**
 * 
 * @param {number} namespace 
 * @param {Element} element 
 * @param {string} attrName 
 * @param {any} newAttrValue 
 * @param {any} oldAttrValue 
 */

var _updateElementAttribute = function _updateElementAttribute(namespace, element, attrName, newAttrValue, oldAttrValue) {
  attrName = _normalizeElementAttributeName(namespace, attrName);

  if (theSame(newAttrValue, oldAttrValue)) {
    return;
  }

  var manipulation = _selectElementAttributeManipulation(namespace, element, attrName, newAttrValue);

  if (manipulation === MANIPULATE_AS_STYLE) {
    _updateStyleProperties(element[attrName], newAttrValue, oldAttrValue);

    return;
  }

  if (manipulation === MANIPULATE_AS_PROPERTY || manipulation === MANIPULATE_AS_PROPERTY_AND_ATTRIBUTE) {
    try {
      element[attrName] = newAttrValue;
    } catch (x) {// Property may not writable
    }
  }

  if (manipulation === MANIPULATE_AS_ATTRIBUTE || manipulation === MANIPULATE_AS_PROPERTY_AND_ATTRIBUTE) {
    if (newAttrValue === false) {
      // To represent a boolean property as false, we need to remove the attribute
      // instead of setting it as "false" (string)
      element.removeAttribute(attrName);
    } else {
      element.setAttribute(attrName, newAttrValue);
    }
  }
};
/**
 * 
 * @param {number} namespace 
 * @param {Element} element 
 * @param {string} attrName 
 * @param {any} oldAttrValue 
 */


var _removeElementAttribute = function _removeElementAttribute(namespace, element, attrName, oldAttrValue) {
  attrName = _normalizeElementAttributeName(namespace, attrName);

  var manipulation = _selectElementAttributeManipulation(namespace, element, attrName, oldAttrValue);

  if (manipulation === MANIPULATE_AS_STYLE) {
    _updateStyleProperties(element[attrName], null, oldAttrValue); // Clean up HTML code


    element.removeAttribute(attrName);
    return;
  }

  if (manipulation === MANIPULATE_AS_PROPERTY || manipulation === MANIPULATE_AS_PROPERTY_AND_ATTRIBUTE) {
    try {
      element[attrName] = null;
    } catch (x) {// Property may not writable
    }
  }

  if (manipulation === MANIPULATE_AS_ATTRIBUTE || manipulation === MANIPULATE_AS_PROPERTY_AND_ATTRIBUTE) {
    element.removeAttribute(attrName);
  }
};
/**
 * This should not depend on attribute values as it may lead to different names
 * for the same attribute with the old and new values. It causes bugs when
 * updating or removing an attribute.
 * 
 * @param {number} namespace 
 * @param {string} attrName 
 * @returns {string}
 */


var _normalizeElementAttributeName = function _normalizeElementAttributeName(namespace, attrName) {
  // Normalize className to class
  if (attrName === 'className') {
    return 'class';
  } // Support camelcase event listener bindings
  // This way runs faster than using RegExp


  if (attrName.length >= 4 && // at least 4 chars
  attrName.charCodeAt(0) === 111 && // 1st char is o
  attrName.charCodeAt(1) === 110 && // 2nd char is n
  attrName.charCodeAt(2) <= 90 && attrName.charCodeAt(2) >= 65 // 3rd char is [A-Z]
  ) {
    return attrName.toLowerCase();
  }

  if (true) {
    if (namespace === NAMESPACE_SVG) {
      if (attrName === 'xlink:href' || attrName === 'xlinkHref') {
        console.error('SVG 2 removed the need for the xlink namespace, ' + 'so instead of xlink:href you should use href.');
      }
    }
  }

  return attrName;
};
/**
 * 
 * @param {number} namespace 
 * @param {Element} element 
 * @param {string} attrName 
 * @param {any} attrValue 
 * @returns {number}
 */


var _selectElementAttributeManipulation = function _selectElementAttributeManipulation(namespace, element, attrName, attrValue) {
  if (attrName === 'style') {
    return MANIPULATE_AS_STYLE;
  }

  if (isFunction(attrValue)) {
    return MANIPULATE_AS_PROPERTY;
  }

  if (attrName === 'innerHTML' || attrName === 'innerText' || attrName === 'textContent') {
    return MANIPULATE_AS_PROPERTY;
  }

  if (namespace === NAMESPACE_HTML) {
    // Reference: https://github.com/preactjs/preact/blob/master/src/diff/props.js#L111
    if (attrName === 'href' || attrName === 'tabIndex' || attrName === 'download' || attrName === 'list' || attrName === 'form') {
      return MANIPULATE_AS_ATTRIBUTE;
    }

    if (attrName in element) {
      return MANIPULATE_AS_PROPERTY_AND_ATTRIBUTE;
    }
  }

  return MANIPULATE_AS_ATTRIBUTE;
}; // #EndBlock ElementAttributes
// #StartBlock StyleProperties

/**
 * 
 * @param {CSSStyleDeclaration} style 
 * @param {{}} newProperties 
 * @param {{}} oldProperties 
 */


var _updateStyleProperties = function _updateStyleProperties(style, newProperties, oldProperties) {
  _updateObjectByKVs(null, style, newProperties, oldProperties, _updateStyleProperty, _removeStyleProperty);
};

var _updateStyleProperty = function _updateStyleProperty(_, style, propName, newPropValue) {
  style[propName] = newPropValue;
};

var _removeStyleProperty = function _removeStyleProperty(_, style, propName) {
  style[propName] = '';
}; // #EndBlock StyleProperties

/**
 * 
 * @param {number} namespace 
 * @param {object} target 
 * @param {{}} newKVs 
 * @param {{}} oldKVs 
 * @param {(namespace: number, target: object, key: string, newValue: any, oldValue?: any) => void} updateFn 
 * @param {(namespace: number, target: object, key: string, oldValue: any) => void} removeFn 
 */


var _updateObjectByKVs = function _updateObjectByKVs(namespace, target, newKVs, oldKVs, updateFn, removeFn) {
  var oldEmpty = oldKVs == null; // is nullish

  var newEmpty = newKVs == null; // is nullish

  var key;

  if (oldEmpty) {
    if (newEmpty) ;else {
      for (key in newKVs) {
        if (_hasOwnNonEmpty(newKVs, key)) {
          updateFn(namespace, target, key, newKVs[key]);
        }
      }
    }
  } else if (newEmpty) {
    for (key in oldKVs) {
      if (_hasOwnNonEmpty(oldKVs, key)) {
        removeFn(namespace, target, key, oldKVs[key]);
      }
    }
  } else {
    for (key in oldKVs) {
      if (_hasOwnNonEmpty(oldKVs, key)) {
        if (_hasOwnNonEmpty(newKVs, key)) ;else {
          removeFn(namespace, target, key, oldKVs[key]);
        }
      }
    }

    for (key in newKVs) {
      if (_hasOwnNonEmpty(newKVs, key)) {
        updateFn(namespace, target, key, newKVs[key], oldKVs[key]);
      }
    }
  }
};
/**
 * 
 * @param {object} target 
 * @param {string} prop 
 * @returns {boolean}
 */


var _hasOwnNonEmpty = function _hasOwnNonEmpty(target, prop) {
  return hasOwnProperty.call(target, prop) && target[prop] != null // is not nulllish
  ;
};

var createNativeTextNode = function createNativeTextNode(text) {
  return document.createTextNode(text);
};

var createNativeElement = function createNativeElement(namespace, type, attributes) {
  var element = namespace === NAMESPACE_SVG ? document.createElementNS('http://www.w3.org/2000/svg', type) : document.createElement(type);
  updateNativeElementAttributes(namespace, element, attributes);
  return element;
};

var removeNativeNode = function removeNativeNode(nativeNode) {
  if (nativeNode.parentNode !== null) {
    nativeNode.parentNode.removeChild(nativeNode);
  }
};

var insertNativeNodeAfter = function insertNativeNodeAfter(parent, newChild, childBefore) {
  parent.insertBefore(newChild, childBefore !== null ? childBefore.nextSibling : parent.firstChild);
}; // Important!!!
// This module does not handle Portal nodes


var hydrateView = function hydrateView(vnode) {
  vnode.namespace_ = _determineNS(vnode); // Do nothing more with fragments

  if (_isDry(vnode.type_)) {
    return;
  }

  var nativeNode;

  if (vnode.type_ === Text) {
    nativeNode = createNativeTextNode(vnode.props_);
  } else {
    nativeNode = createNativeElement(vnode.namespace_, vnode.type_, vnode.props_);
  }

  linkNativeNodeWithVNode(vnode, nativeNode);

  if (true) {
    attachVNodeToNativeNode(nativeNode, vnode);
  }
};

var rehydrateView = function rehydrateView(newVNode, oldVNode) {
  newVNode.namespace_ = _determineNS(newVNode); // Do nothing more with fragments

  if (_isDry(newVNode.type_)) {
    return;
  } // Reuse the existing native node


  linkNativeNodeWithVNode(newVNode, oldVNode.nativeNode_);

  if (true) {
    attachVNodeToNativeNode(oldVNode.nativeNode_, newVNode);
  }

  if (newVNode.type_ === Text) {
    updateNativeTextContent(newVNode.nativeNode_, newVNode.props_, oldVNode.props_);
  } else {
    updateNativeElementAttributes(newVNode.namespace_, newVNode.nativeNode_, newVNode.props_, oldVNode.props_);
  }
}; // We only support HTML and SVG namespaces
// as the most of browsers support


var _determineNS = function _determineNS(vnode) {
  // Intrinsic namespace
  if (vnode.type_ === 'svg') {
    return NAMESPACE_SVG;
  } // As we never hydrate the container node,
  // the parent_ never empty here


  if (vnode.parent_.namespace_ === NAMESPACE_SVG && vnode.parent_.type_ === 'foreignObject') {
    return NAMESPACE_HTML;
  } // By default, pass namespace below.


  return vnode.parent_.namespace_;
}; // Check if a node type cannot be hydrated


var _isDry = function _isDry(type) {
  return type === Fragment || isFunction(type);
}; // Important!!!
// This module does not handle Portal nodes


var insertView = function insertView(vnode) {
  if (vnode.nativeNode_ !== null) {
    var mpt = resolveMountingPoint(vnode.parent_);

    if (mpt !== null) {
      insertNativeNodeAfter(mpt.nativeNode_, vnode.nativeNode_, mpt.mountingRef_);
      mpt.mountingRef_ = vnode.nativeNode_;
    }
  }
};

var updateView = function updateView(newVNode, oldVNode) {
  rehydrateView(newVNode, oldVNode);
  touchView(newVNode);
};

var touchView = function touchView(vnode) {
  if (vnode.nativeNode_ !== null) {
    var mpt = resolveMountingPoint(vnode.parent_);

    if (mpt !== null) {
      mpt.mountingRef_ = vnode.nativeNode_;
    }
  }
};

var deleteView = function deleteView(vnode) {
  if (vnode.nativeNode_ !== null) {
    removeNativeNode(vnode.nativeNode_);
  } else {
    walkNativeChildren(removeNativeNode, vnode);
  }
};

var currentVNode = null;
var currentRefHook = null;
var currentStateHook = null;
var currentEffectHook = null;

var prepareCurrentlyProcessing = function prepareCurrentlyProcessing(functionalVNode) {
  currentVNode = functionalVNode;
};

var flushCurrentlyProcessing = function flushCurrentlyProcessing() {
  currentVNode = null;
  currentRefHook = null;
  currentStateHook = null;
  currentEffectHook = null;
};

var resolveRootVNode = function resolveRootVNode() {
  _throwIfCallInvalid();

  var vnode = currentVNode;

  while (vnode.parent_ !== null) {
    vnode = vnode.parent_;
  }

  return vnode;
};

var resolveCurrentRefHook = function resolveCurrentRefHook(createHookFn, processFn) {
  _throwIfCallInvalid();

  currentRefHook = _resolveCurrentHookImpl(createHookFn, currentRefHook, currentVNode.refHook_);

  if (currentVNode.refHook_ === null) {
    currentVNode.refHook_ = currentRefHook;
  }

  return processFn(currentRefHook);
};

var resolveCurrentStateHook = function resolveCurrentStateHook(createHookFn, processFn) {
  _throwIfCallInvalid();

  currentStateHook = _resolveCurrentHookImpl(createHookFn, currentStateHook, currentVNode.stateHook_);

  if (currentVNode.stateHook_ === null) {
    currentVNode.stateHook_ = currentStateHook;
  }

  return processFn(currentStateHook);
};

var resolveCurrentEffectHook = function resolveCurrentEffectHook(createHookFn, processFn) {
  _throwIfCallInvalid();

  currentEffectHook = _resolveCurrentHookImpl(createHookFn, currentEffectHook, currentVNode.effectHook_);

  if (currentVNode.effectHook_ === null) {
    currentVNode.effectHook_ = currentEffectHook;
  }

  return processFn(currentEffectHook);
};

var _resolveCurrentHookImpl = function _resolveCurrentHookImpl(createHookFn, currentHook, firstHookOfNode) {
  if (currentHook === null) {
    if (firstHookOfNode === null) {
      return createHookFn(currentVNode);
    } else {
      return firstHookOfNode;
    }
  } else {
    if (currentHook.next_ === null) {
      var nextHook = createHookFn(currentVNode);
      currentHook.next_ = nextHook;
      return nextHook;
    } else {
      return currentHook.next_;
    }
  }
};

var _throwIfCallInvalid = function _throwIfCallInvalid() {
  if (currentVNode === null) {
    throw new ReferenceError('Hooks can only be called inside a component.');
  }
};

var STATE_NORMAL = 0;
var STATE_ERROR = 1;
/**
 *
 * @param {number} tag
 * @param {VNode} context
 * @param {any} initialValue
 * @constructor
 */

function StateHook(tag, context, initialValue) {
  var _this = this;

  this.tag_ = tag;
  this.context_ = context;
  this.value_ = isFunction(initialValue) ? initialValue() : initialValue;
  this.setValue_ = _setState.bind(this);

  if (tag === STATE_ERROR) {
    this.resetValue_ = function () {
      return _setState.call(_this, initialValue);
    };
  }

  this.next_ = null;
}

var useState = function useState(initialValue) {
  return resolveCurrentStateHook(function (currentVNode) {
    return new StateHook(STATE_NORMAL, currentVNode, initialValue);
  }, function (currentHook) {
    return [currentHook.value_, currentHook.setValue_];
  });
};

var useCatch = function useCatch() {
  return resolveCurrentStateHook(function (currentVNode) {
    // Make sure we have only one error hook in a component
    if (true) {
      var hook = currentVNode.stateHook_;

      while (hook !== null) {
        if (hook.tag_ === STATE_ERROR) {
          console.error('A component accepts only one useCatch hook.');
        }

        hook = hook.next_;
      }
    }

    return new StateHook(STATE_ERROR, currentVNode, null);
  }, function (currentHook) {
    return [currentHook.value_, currentHook.resetValue_];
  });
};

var _setState = function _setState(value) {
  var newValue;

  if (isFunction(value)) {
    try {
      newValue = value(this.value_);
    } catch (error) {
      catchError(error, this.context_);
      return;
    }
  } else {
    newValue = value;
  }

  if (!theSame(this.value_, newValue)) {
    // Set value synchronously
    this.value_ = newValue; // Schedule a work to update the UI

    this.context_.updateId_ = scheduleTimeout(_flushUpdates, 0, this);
  }
};

var _flushUpdates = function _flushUpdates(hook) {
  // Find the highest node also has pending updates
  var highestContext = null;
  var current = hook.context_;

  while (current !== null) {
    if (current.updateId_ !== null) {
      highestContext = current;
    }

    current = current.parent_;
  } // Re-render tree from the highest node


  if (highestContext !== null) {
    renderTree(highestContext);
  }
};

var catchError = function catchError(error, vnode) {
  var parent = vnode.parent_;
  var hook;

  while (parent !== null) {
    hook = parent.stateHook_;

    while (hook !== null) {
      if (hook.tag_ === STATE_ERROR) {
        // Throw the error asynchorously
        // to avoid blocking effect callbacks
        scheduleTimeout(function () {
          hook.setValue_(function (prevError) {
            if (prevError != null) {
              return prevError;
            }

            if (error != null) {
              return error;
            } // If a nullish (null or undefined) is catched,
            // null will be returned


            return null;
          });
        }); // It is done here

        return;
      }

      hook = hook.next_;
    }

    parent = parent.parent_;
  }

  if (true) {
    console.info('Let\'s try to implement an error boundary with useCatch hook to provide a better user experience.');
  }

  throw error;
};
/**
 * 
 * @param {[]|undefined} deps 
 * @param {[]|undefined} prevDeps 
 * @returns {boolean}
 */


var depsMismatch = function depsMismatch(deps, prevDeps) {
  // Always
  if (deps === undefined) {
    return true;
  } // First time


  if (prevDeps === undefined) {
    return true;
  } // Lazy


  if (deps.length === 0) {
    return false;
  } // Two arrays are equal


  if (arraysShallowEqual(deps, prevDeps)) {
    return false;
  } // Deps changed


  {
    return true;
  }
};
/**
 * 
 * @param {[]|undefined} deps 
 * @param {[]|undefined} prevDeps 
 * @returns {boolean}
 */


var warnIfDepsSizeChangedOnDEV = function warnIfDepsSizeChangedOnDEV(deps, prevDeps) {
  if (true) {
    if (!(deps === undefined && prevDeps === undefined || deps !== undefined && prevDeps === undefined || deps !== undefined && prevDeps !== undefined && deps.length === prevDeps.length)) {
      console.error('The number of dependencies must be the same between renders.');
    } // On the production, we accept the deps change its length
    // and consider it is changed

  }
};

var EFFECT_NORMAL = 0;
var EFFECT_LAYOUT = 1;
/**
 *
 * @param {number} tag
 * @constructor
 */

function EffectHook(tag) {
  this.tag_ = tag;
  this.mount_ = undefined;
  this.deps_ = undefined;
  this.destroy_ = undefined;
  this.prevDeps_ = undefined;
  this.next_ = null;
}

var useEffect = function useEffect(mount, deps) {
  return _useEffectImpl(EFFECT_NORMAL, mount, deps);
};

var useLayoutEffect = function useLayoutEffect(mount, deps) {
  return _useEffectImpl(EFFECT_LAYOUT, mount, deps);
};

var _useEffectImpl = function _useEffectImpl(tag, mount, deps) {
  return resolveCurrentEffectHook(function (currentVNode) {
    return new EffectHook(tag);
  }, function (currentHook) {
    warnIfDepsSizeChangedOnDEV(deps, currentHook.deps_);
    currentHook.mount_ = mount;
    currentHook.deps_ = deps;
  });
};
/**
 *
 * @param {number} effectTag
 * @param {VNode} vnode
 * @param {boolean} isNewlyMounted
 */


var mountEffects = function mountEffects(effectTag, vnode, isNewlyMounted) {
  var hook = vnode.effectHook_;

  while (hook !== null) {
    if (hook.tag_ === effectTag && // The mount callback can be undefined here if there is an action
    // in the rendering stack leads to an synchronous update request.
    // That update will be performed before the callback of the useEffect,
    // then schedule another call for the same callback
    hook.mount_ !== undefined && ( // Should it mounts at this render?
    isNewlyMounted || depsMismatch(hook.deps_, hook.prevDeps_))) {
      // Update the previous deps
      hook.prevDeps_ = hook.deps_; // Run the effect mount callback

      try {
        hook.destroy_ = hook.mount_();
      } catch (error) {
        catchError(error, vnode);
      } // Do NOT clear hook.mount_ and hook.deps_ (to avoid duplicated calls, for instance).
      // There is a case, the effect mount/destroy can be called without
      // a component re-rendering which re-initializes the hooks.
      // TODO: Add tests for this case

    }

    hook = hook.next_;
  }
};
/**
 * @param {number} effectTag
 * @param {VNode} vnode
 * @param {boolean} isUnmounted
 */


var destroyEffects = function destroyEffects(effectTag, vnode, isUnmounted) {
  var hook = vnode.effectHook_;

  while (hook !== null) {
    if (hook.tag_ === effectTag && // Check if the effect has a destroy callback
    hook.destroy_ !== undefined && ( // Should it destroys at this render?
    isUnmounted || depsMismatch(hook.deps_, hook.prevDeps_))) {
      // Run the effect destroy callback
      try {
        hook.destroy_();
      } catch (error) {
        catchError(error, vnode);
      } // Clear the destroy callback to avoid duplicated calls,
      // even if the call throws an error.
      // Whenever the mount is called, the destroy will be re-initialized.
      // TODO: Add tests for this case


      hook.destroy_ = undefined;
    }

    hook = hook.next_;
  }
};
/**
 *
 * @param {any} current
 * @constructor
 */


function Ref(current) {
  this.current = current;
}
/**
 *
 * @param {any} current
 * @constructor
 */


function RefHook(current) {
  this.ref_ = new Ref(current);
  this.next_ = null;
}
/**
 *
 * @param {any} initialValue
 */


var createRef = function createRef(initialValue) {
  return new Ref(initialValue);
};
/**
 *
 * @param {any} initialValue
 */


var useRef = function useRef(initialValue) {
  return resolveCurrentRefHook(function (currentVNode) {
    return new RefHook(initialValue);
  }, function (currentHook) {
    return currentHook.ref_;
  });
};
/**
 * 
 * @param {VNode} current
 * @param {any[]} content
 */


var setChildrenFromContent = function setChildrenFromContent(current, content) {
  var child,
      prevChild = null,
      i = 0;

  for (; i < content.length; ++i) {
    child = createVNodeFromContent(content[i]);

    if (child !== null) {
      child.parent_ = current;
      child.slot_ = i;

      if (prevChild !== null) {
        prevChild.sibling_ = child;
      } else {
        current.child_ = child;
      }

      prevChild = child;
    }
  }
};
/**
 * 
 * @param {VNode} current 
 * @param {any} content
 */


var setOnlyChildFromContent = function setOnlyChildFromContent(current, content) {
  var child = createVNodeFromContent(content);

  if (child !== null) {
    current.child_ = child;
    child.parent_ = current; // Don't need to set the slot property
    // as this node have only one child
  }
}; // Use the same empty object to save memory.
// Do NOT mutate it


var emptyProps = {};
Object.freeze(emptyProps);
/**
 *
 * @param {string|function} type
 * @param {{}|null} props
 * @param {any} content
 * @constructor
 */

function JSXElement(type, props, content) {
  this.type_ = type;
  this.props_ = props;
  this.content_ = content;
}
/**
 * 
 * @param {string|function} type
 * @param {{}|null} props
 * @param {any} content
 * @returns {JSXElement}
 */


var createElement = function createElement(type, props, content) {
  if (arguments.length > 3) {
    content = slice.call(arguments, 2);
  }

  return new JSXElement(type, props, content);
};
/**
 * 
 * @param {JSXElement} element 
 * @returns {VNode}
 */


var createVNodeFromJSXElement = function createVNodeFromJSXElement(element) {
  // Type and content
  var type = element.type_;
  var content = element.content_;
  var isFunctionalType = isFunction(type);
  var hasContent = content !== undefined; // Resolve props

  var props = element.props_;
  var key = null;
  var ref = null;

  if (props === null) {
    // Functional types always need the props to be an object
    if (isFunctionalType) {
      if (hasContent) {
        props = {
          children: content
        };
        Object.freeze(props);
      } else {
        props = emptyProps;
      }
    }
  } else {
    // Normalize key
    // Accept any data type, except number (convert to string) and undefined
    if (props.key !== undefined) {
      if (isNumber(props.key)) {
        key = '' + props.key;
      } else {
        key = props.key;
      }

      delete props.key;
    } // Set children for functional types
    // and set ref for static types.
    // Allow functional types to access ref normally


    if (isFunctionalType) {
      if (hasContent) {
        props = Object.assign({}, props);
        props.children = content;
      }

      Object.freeze(props);
    } else {
      if (props.ref !== undefined) {
        if (props.ref instanceof Ref) {
          ref = props.ref;
        } else {
          if (true) {
            console.error('The value of the ref property is invalid:', props.ref);
          }
        }

        delete props.ref;
      }
    }
  } // Initialize the node


  var vnode = new VNode(type, props); // Set key and ref

  vnode.key_ = key;
  vnode.ref_ = ref; // Set children

  if (hasContent) {
    if (isFunctionalType) ;else if (type === Text) {
      // Text nodes accept only one string as the child.
      // Everything else will be converted to string
      if (isString(content)) {
        vnode.props_ = content;
      } else {
        vnode.props_ = '' + content;
      }
    } else {
      // For fragments and HTML elements
      if (isArray(content)) {
        // Multiple children.
        // If the only child is an array, treat its elements as the children of the node
        setChildrenFromContent(vnode, content);
      } else {
        setOnlyChildFromContent(vnode, content);
      }
    }
  }

  return vnode;
};
/**
 *
 * @param {any} content
 * @return {VNode|null}
 */


var createVNodeFromContent = function createVNodeFromContent(content) {
  if (content instanceof JSXElement) {
    return createVNodeFromJSXElement(content);
  }

  if (isString(content)) {
    return new VNode(Text, content);
  }

  if (isNumber(content)) {
    return new VNode(Text, '' + content);
  }

  if (isArray(content)) {
    var fragment = new VNode(Fragment, null);
    setChildrenFromContent(fragment, content);
    return fragment;
  }

  if (content instanceof PortalElement) {
    return createVNodeFromPortalElement(content);
  }

  return null;
};

var reconcileChildren = function reconcileChildren(current, isRenderRoot) {
  if (isFunction(current.type_)) {
    _reconcileOnlyChildOfDynamicNode(current, current.alternate_, isRenderRoot);
  } else if (current.alternate_ !== null) {
    _reconcileChildrenOfStaticNode(current, current.alternate_);
  }
};

var _reconcileOnlyChildOfDynamicNode = function _reconcileOnlyChildOfDynamicNode(current, alternate, isRenderRoot) {
  // If the current has an alternate
  // Important note: The alternate of the render root always is null
  if (alternate !== null) {
    // Copy hooks
    current.refHook_ = alternate.refHook_;
    current.stateHook_ = alternate.stateHook_;
    current.effectHook_ = alternate.effectHook_; // Update contexts of state hooks

    var stateHook = current.stateHook_;

    while (stateHook !== null) {
      stateHook.context_ = current;
      stateHook = stateHook.next_;
    } // Transfer the update ID


    current.updateId_ = alternate.updateId_; // We must reset alternate's update ID to null.
    // There is a case, a node in the deleted subtree later updates its state
    // then the update batching logic looks at higher-order nodes, if there is any
    // one of them also wants to update, by checking if its update ID is not null.
    // The update will be triggered from the highest one found

    alternate.updateId_ = null; // Pure components:
    // If props did not change, and this reconciliation is caused by
    // the current itself updating or being marked to be updated (with updateId_),
    // but by an updating from a higher-level node, so it should NOT re-render

    if ( // A render root never appears here because its alternate always is null
    // so don't need to check if the current is not a render root
    // Do not skip re-render if there is an update scheduled
    current.updateId_ === null && // Compare current props vs previous props
    // Here, props always is an object with a functional component
    objectsShallowEqual(current.props_, alternate.props_)) {
      // Reuse the child if needed
      if (current.child_ === null) {
        if (alternate.child_ === null) ;else {
          // Reuse the previous child
          current.child_ = alternate.child_;
          current.child_.parent_ = current; // This is unnecessary but added to keep
          // the data structure always being correct

          alternate.child_ = null;
        }
      } // Make itself the alternate to denote that it did not change,
      // so the next process will skip walking deeper in its children


      current.alternate_ = current; // Finish this reconciliation

      return;
    }
  }

  var newContent;
  prepareCurrentlyProcessing(current);

  try {
    newContent = current.type_(current.props_);
    flushCurrentlyProcessing();
  } catch (error) {
    newContent = null; // Must flush currently processing info before catchError(),
    // because catchError() may cause re-render at a higher level component

    flushCurrentlyProcessing();
    catchError(error, current);
  }

  var newChild = createVNodeFromContent(newContent);

  if (newChild !== null) {
    newChild.parent_ = current; // Don't need to set the slot property
    // as a dynamic node can have only one child
  }

  var oldChild = isRenderRoot ? current.child_ : alternate !== null ? alternate.child_ : null;

  if (oldChild !== null) {
    if (newChild !== null && newChild.type_ === oldChild.type_ && newChild.key_ === oldChild.key_) {
      newChild.alternate_ = oldChild;
    } else {
      _addDeletion(current, oldChild);
    }
  }

  current.child_ = newChild;
};

var _reconcileChildrenOfStaticNode = function _reconcileChildrenOfStaticNode(current, alternate) {
  var oldChildren = _mapChildren(alternate);

  var newChildren = _mapChildren(current);

  var newChild;
  oldChildren.forEach(function (oldChild, mapKey) {
    newChild = newChildren.get(mapKey);

    if (newChild !== undefined && newChild.type_ === oldChild.type_) {
      newChild.alternate_ = oldChild;
    } else {
      _addDeletion(current, oldChild);
    }
  });
};

var _addDeletion = function _addDeletion(current, childToDelete) {
  if (current.deletions_ === null) {
    current.deletions_ = [childToDelete];
  } else {
    current.deletions_.push(childToDelete);
  }
};

var _mapChildren = function _mapChildren(node) {
  var map = new Map();
  var child = node.child_;

  while (child !== null) {
    if (child.key_ !== null) {
      map.set(child.key_, child);
    } else {
      map.set(child.slot_, child);
    }

    child = child.sibling_;
  }

  return map;
};
/**
 * 
 * @param {VNode} current
 */


var renderTree = function renderTree(current) {
  // Initialize an effect queue
  var effectQueue = []; // The mounting point of the current

  var mpt = resolveMountingPoint(current); // In the tree, the mounting point lies at a higher level
  // than the current, so we need to initialize/cleanup
  // its temporary properties from outside of the work loop

  walkNativeChildren(function (nativeChild) {
    mpt.mountingRef_ = nativeChild;
  }, mpt, current); // Main work

  _workLoop(current, _performUnitOfWork, _onSkip, _onReturn, effectQueue); // Cleanup


  mpt.mountingRef_ = null; // Run useLayoutEffect callbacks

  runEffectQueue(EFFECT_LAYOUT, effectQueue); // Schedule to run useEffect callbacks

  scheduleTimeout(runEffectQueue, 0, EFFECT_NORMAL, effectQueue);
}; // Effect flags


var MOUNT_PLACEMENT = 0;
var MOUNT_UPDATE = 1;
var DESTROY_PLACEMENT = 2;
var DESTROY_UPDATE = 3;

var runEffectQueue = function runEffectQueue(effectType, effectQueue) {
  for (var i = 0, flag; i < effectQueue.length; i += 2) {
    flag = effectQueue[i + 1];

    if (flag === MOUNT_PLACEMENT || flag === MOUNT_UPDATE) {
      mountEffects(effectType, effectQueue[i], flag === MOUNT_PLACEMENT);
    } else {
      destroyEffects(effectType, effectQueue[i], flag === DESTROY_PLACEMENT);
    }
  }
}; // Optimize the insertion to reduce the number of reflows


var INSERT_ON_RETURN = 0;
var INSERT_OFFSCREEN = 1;
/**
 * 
 * @param {VNode} current 
 * @param {VNode} root 
 * @param {Array<VNode|number>} effectQueue 
 * @returns {VNode|null} skipFrom
 */

var _performUnitOfWork = function _performUnitOfWork(current, root, effectQueue) {
  var isRenderRoot = current === root;
  var isPortal = current.type_ === Portal; // Cleanup the update scheduled on the current node.
  // Do this before reconciliation because the current node can
  // be scheduled for another update while the reconciliation

  if (current.updateId_ !== null) {
    cancelTimeout(current.updateId_);
    current.updateId_ = null;
  } // Reconcile current's direct children


  reconcileChildren(current, isRenderRoot); // Indicate whether the work loop should skip the subtree under the current

  var skipFrom = null; // Portal nodes never change the view itself

  if (!isPortal) {
    if (isRenderRoot) {
      if (current.effectHook_ !== null) {
        effectQueue.push(current, DESTROY_UPDATE, current, MOUNT_UPDATE);
      }
    } else {
      if (current.alternate_ !== null) {
        if (current.alternate_ === current) {
          // This node does not changed,
          // so skip reconciliation for its subtree
          skipFrom = current;
        } else {
          updateView(current, current.alternate_);

          if (current.effectHook_ !== null) {
            effectQueue.push(current.alternate_, DESTROY_UPDATE);
            effectQueue.push(current, MOUNT_UPDATE);
          }
        }

        current.alternate_ = null;
      } else {
        hydrateView(current);

        if (current.child_ !== null) {
          // We always have parent here, because
          // this area is under the render root
          if (current.parent_.insertion_ !== null) {
            current.insertion_ = INSERT_OFFSCREEN;
            insertView(current);
          } else {
            // Insert-on-return nodes must have a native node!
            if (current.nativeNode_ !== null) {
              current.insertion_ = INSERT_ON_RETURN;
            }
          }
        } else {
          insertView(current);
        }

        if (current.effectHook_ !== null) {
          effectQueue.push(current, MOUNT_PLACEMENT);
        }
      }
    }
  } // Delete subtrees that no longer exist


  if (current.deletions_ !== null) {
    for (var i = 0; i < current.deletions_.length; ++i) {
      deleteView(current.deletions_[i]);

      _workLoop(current.deletions_[i], function (deleted) {
        if (deleted.effectHook_ !== null) {
          effectQueue.push(deleted, DESTROY_PLACEMENT);
        } // Important!!!
        // Cancel the update schedule on the deleted nodes


        if (deleted.updateId_ !== null) {
          cancelTimeout(deleted.updateId_);
          deleted.updateId_ = null;
        } // Never skip any node when handling deletions


        return null;
      });
    }

    current.deletions_ = null;
  }

  return skipFrom;
};

var _onSkip = function _onSkip(current, root) {
  var isRenderRoot = current === root;
  var isPortal = current.type_ === Portal;
  if (isRenderRoot || isPortal) ;else {
    // Though the current is skipped for reconciliation
    // but we need to update the mounting ref
    // so insertions after can work correctly
    touchView(current);
  }
}; // Callback called after walking through a node and all of its ascendants


var _onReturn = function _onReturn(current) {
  // Process the insert-on-return node before walk out of its subtree
  if (current.insertion_ === INSERT_ON_RETURN) {
    insertView(current);
  } // This is when we cleanup the remaining temporary properties


  current.mountingRef_ = null;
  current.insertion_ = null;
}; // Reference: https://github.com/facebook/react/issues/7942


var _workLoop = function _workLoop(root, performUnit, onSkip, onReturn, reference) {
  var current = root;
  var skipFrom = null;

  while (true) {
    if (skipFrom === null) {
      skipFrom = performUnit(current, root, reference);
    } else {
      if (onSkip != null) {
        onSkip(current, root);
      }
    }

    if (current.child_ !== null) {
      current = current.child_;
      continue;
    }

    if (current === root) {
      return;
    }

    while (current.sibling_ === null) {
      if (current.parent_ === null || current.parent_ === root) {
        return;
      }

      current = current.parent_;

      if (skipFrom === current) {
        skipFrom = null;
      }

      if (onReturn != null) {
        onReturn(current);
      }
    }

    current = current.sibling_;
  }
};
/**
 * 
 * @param {any} children 
 * @param {Element} targetNativeNode
 */


var render = function render(children, targetNativeNode) {
  var root = extractVNodeFromNativeNode(targetNativeNode);

  if (root) {
    // Update the children
    root.props_.children = children;
  } else {
    // Create a new root
    if (true) {
      if (targetNativeNode.firstChild) {
        console.error('The target node is not empty:', targetNativeNode);
      }
    }

    var portalElement = createPortal(children, targetNativeNode);
    root = createVNodeFromPortalElement(portalElement);
    attachVNodeToNativeNode(targetNativeNode, root);
  }

  renderTree(root);
};

function Memo() {
  this.value_ = undefined;
  this.prevDeps_ = undefined;
}

var useMemo = function useMemo(create, deps) {
  var memo = useRef(new Memo()).current;
  warnIfDepsSizeChangedOnDEV(deps, memo.prevDeps_);

  if (depsMismatch(deps, memo.prevDeps_)) {
    memo.value_ = create();
    memo.prevDeps_ = deps;
  }

  return memo.value_;
};

var useCallback = function useCallback(callback, deps) {
  var memo = useRef(new Memo()).current;
  warnIfDepsSizeChangedOnDEV(deps, memo.prevDeps_);

  if (depsMismatch(deps, memo.prevDeps_)) {
    memo.value_ = callback;
    memo.prevDeps_ = deps;
  }

  return memo.value_;
};

exports.Fragment = Fragment;
exports.Text = Text;
exports.createElement = createElement;
exports.createPortal = createPortal;
exports.createRef = createRef;
exports.jsx = createElement;
exports.render = render;
exports.useCallback = useCallback;
exports.useCatch = useCatch;
exports.useEffect = useEffect;
exports.useLayoutEffect = useLayoutEffect;
exports.useMemo = useMemo;
exports.useRef = useRef;
exports.useState = useState;
exports.useTreeId = resolveRootVNode;
