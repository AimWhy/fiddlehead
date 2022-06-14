'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

let currentNode = null;
let currentRefHook = null;
let currentStateHook = null;
let currentEffectHook = null;

function prepareCurrentlyProcessing(functionalVirtualNode) {
    currentNode = functionalVirtualNode;
}

function flushCurrentlyProcessing() {
    currentNode = null;
    currentRefHook = null;
    currentStateHook = null;
    currentEffectHook = null;
}

function resolveCurrentRefHook(createHookFn, processFn) {
    _throwIfCallInvalid();
    currentRefHook = _resolveCurrentHookImpl(createHookFn, currentRefHook, currentNode.refHook_);
    if (currentNode.refHook_ === null) {
        currentNode.refHook_ = currentRefHook;
    }
    return processFn(currentRefHook);
}

function resolveCurrentStateHook(createHookFn, processFn) {
    _throwIfCallInvalid();
    currentStateHook = _resolveCurrentHookImpl(createHookFn, currentStateHook, currentNode.stateHook_);
    if (currentNode.stateHook_ === null) {
        currentNode.stateHook_ = currentStateHook;
    }
    return processFn(currentStateHook);
}

function resolveCurrentEffectHook(createHookFn, processFn) {
    _throwIfCallInvalid();
    currentEffectHook = _resolveCurrentHookImpl(createHookFn, currentEffectHook, currentNode.effectHook_);
    if (currentNode.effectHook_ === null) {
        currentNode.effectHook_ = currentEffectHook;
    }
    return processFn(currentEffectHook);
}

function _resolveCurrentHookImpl(createHookFn, currentHook, firstHookOfNode) {
    if (currentHook === null) {
        if (firstHookOfNode === null) {
            return createHookFn(currentNode);
        } else {
            return firstHookOfNode;
        }
    } else {
        if (currentHook.next_ === null) {
            const nextHook = createHookFn(currentNode);
            currentHook.next_ = nextHook;
            return nextHook;
        } else {
            return currentHook.next_;
        }
    }
}

function _throwIfCallInvalid() {
    if (currentNode === null) {
        throw new Error('Cannot use hooks from outside of components');
    }
}

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
function useRef(initialValue) {
    return resolveCurrentRefHook(
        function (currentNode) {
            return new RefHook(initialValue);
        },
        function (currentHook) {
            return currentHook.ref_;
        }
    );
}

/**
 *
 * @param {any} initialValue
 */
function createRef(initialValue) {
    return new Ref(initialValue);
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

const slice = Array.prototype.slice;

function isString(value) {
    return typeof value === 'string'/* || value instanceof String*/;
}

function isNumber(value) {
    return typeof value === 'number'/* || value instanceof Number*/;
}

function isFunction(value) {
    return typeof value === 'function';
}

function isArray(value) {
    return value instanceof Array;
}

function isNullish(value) {
    return value === null || value === undefined;
}

/**
 * 
 * @param {Array} a 
 * @param {Array} b 
 * @returns {boolean}
 */
function compareArrays(a, b) {
    if (a.length !== b.length) {
        return false;
    }

    for (let i = a.length - 1; i >= 0; --i) {
        if (a[i] !== b[i]) {
            return false;
        }
    }

    return true;
}

// Do not support namespace MathML as almost browsers do not support as well
const NAMESPACE_HTML = 0;
const NAMESPACE_SVG = 1;

// Special node types
const TextNode = '#';
const Fragment = '[';
function Portal(props) {
    return props.children;
}

/**
 * 
 * @param {function|string} type
 * @param {{}|string|null} props
 */
function VirtualNode(type, props) {
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
    this.slot_ = null;

    // Props and hooks
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
    this.effectHook_ = null;
    
    // Output native node and relates
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
    this.ref_ = null;

    // Linked-list pointers
    // ====================

    /**
     * @type {VirtualNode|null}
     */
    this.parent_ = null;
    
    /**
     * @type {VirtualNode|null}
     */
    this.child_ = null;

    /**
     * @type {VirtualNode|null}
     */
    this.sibling_ = null;

    // Temporary properties
    // ====================
    
    // The previous version of this node
    /**
     * @type {VirtualNode|null}
     */
    this.alternate_ = null;

    // The children (and their subtrees, of course) are marked to be deleted
    /**
     * @type {VirtualNode[]}
     */
    this.deletions_ = null;

    // Insertion flag
    // To be used to optimize the painting process
    /**
     * @type {number|null}
     */
    this.insertion_ = null;
 
    // If this node is a mounting point, this property tracks the native child
    // that will be used as the reference node to insert the new child after it
    /**
     * @type {Node|null}
     */
    this.mountingRef_ = null;
}

/**
 * 
 * @param {VirtualNode} virtualNode 
 * @param {Node} nativeNode
 */
function linkNativeNode(virtualNode, nativeNode) {
    virtualNode.nativeNode_ = nativeNode;

    if (virtualNode.ref_ !== null) {
        virtualNode.ref_.current = nativeNode;
    }
}

// Use the same empty object to save memory
// Do not mutate it
const emptyProps = {};

/**
 *
 * @param {string|function} type
 * @param {{}|null} props
 * @param {any} content
 * @return {VirtualNode}
 */
function createElement(type, props, content) {
    let key = null;
    let ref = null;

    const isTypeFunctional = isFunction(type);

    if (props === null) {
        // Functional type always need the props is an object
        if (isTypeFunctional) {
            props = emptyProps;
        }
    } else {
        // Normalize key
        // Accept any data type, except number and undefined
        if (props.key !== undefined) {
            if (isNumber(props.key)) {
                key = '' + props.key;
            } else {
                key = props.key;
            }

            // Delete key from props, but for performance,
            // we don't try to delete undefined property
            delete props.key;
        }
    
        // Normalize ref
        if (props.ref !== undefined) {
            if (props.ref instanceof Ref) {
                if (isTypeFunctional) ; else {
                    ref = props.ref;
                    delete props.ref;
                }
            } else {
                if (true) {
                    console.error('The ref value must be created by the useRef hook');
                }
                delete props.ref;
            }
        }
    }
    
    // Create the node
    const virtualNode = new VirtualNode(type, props);

    // Set key and ref
    virtualNode.key_ = key;
    virtualNode.ref_ = ref;

    // Initialize children
    if (arguments.length > 2) {
        const isContentMultiple = arguments.length > 3;

        if (isContentMultiple) {
            content = slice.call(arguments, 2);
        }

        if (isTypeFunctional) {
            // JSX children
            if (virtualNode.props_ === emptyProps) {
                virtualNode.props_ = {children: content};
            } else {
                virtualNode.props_.children = content;
            }
        } else if (type === TextNode) {
            // Accept only one child
            // Or convert the children to the text content directly
            virtualNode.props_ = '' + content;
        } else {
            // Static node
            // Set children directly with static nodes
            if (isContentMultiple) {
                _initializeChildrenFromContent(virtualNode, content);
            } else {
                _initializeChildFromContent(virtualNode, content);
            }
        }
    }

    return virtualNode;
}

/**
 *
 * @param {any} content
 * @return {null|VirtualNode}
 */
function createVirtualNodeFromContent(content) {
    if (content instanceof VirtualNode) {
        return content;
    }
        
    if (isString(content)) {
        return new VirtualNode(TextNode, content);
    }

    if (isNumber(content)) {
        return new VirtualNode(TextNode, '' + content);
    }

    if (isArray(content)) {
        const fragment = new VirtualNode(Fragment, null);
        _initializeChildrenFromContent(fragment, content);
        return fragment;
    }

    return null;
}

/**
 * 
 * @param {VirtualNode} current 
 * @param {any[]} content
 */
function _initializeChildrenFromContent(current, content) {
    let child, prevChild = null, i = 0;
    for (; i < content.length; ++i) {
        child = createVirtualNodeFromContent(content[i]);
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
}

/**
 * 
 * @param {VirtualNode} current 
 * @param {any} content
 */
function _initializeChildFromContent(current, content) {
    const child = createVirtualNodeFromContent(content);
    if (child !== null) {
        current.child_ = child;
        child.parent_ = current;

        // Don't need to set the slot property
        // as this node have only one child
    }
}

const PROP_VNODE = '%vnode';

/**
 * 
 * @param {Node} nativeNode 
 * @param {VirtualNode} virtualNode 
 */
function attachVirtualNode(nativeNode, virtualNode) {
    nativeNode[PROP_VNODE] = virtualNode;
}

/**
 * 
 * @param {Node} nativeNode 
 * @returns {VirtualNode|undefined}
 */
function extractVirtualNode(nativeNode) {
    return nativeNode[PROP_VNODE];
}

// The mounting point is a virtual node which has a native node (not null)
// It means that a mounting point can contains native children
/**
 * 
 * @param {VirtualNode} current 
 * @returns {Node}
 */
function resolveMountingPoint(current) {
    while (true) {
        if (current === null) {
            return null;
        }
        if (current.nativeNode_ !== null) {
            return current;
        }
        current = current.parent_;
    }
}

// Walk through native children of a parent
/**
 * 
 * @param {function} callback 
 * @param {VirtualNode} parent 
 * @param {VirtualNode} stopBefore 
 * @returns {void}
 */
function walkNativeChildren(callback, parent, stopBefore) {
    let current = parent.child_;
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
            continue;
        }
    }
}

function updateNativeTextContent(node, text) {
    if (node.textContent !== text) {
        node.textContent = text;
    }
}

function updateNativeElementAttributes(element, newAttributes, oldAttributes) {
    _updateKeyValues(
        element, newAttributes, oldAttributes,
        _updateElementAttribute, _removeElementAttribute
    );
}

function _updateElementAttribute(element, attrName, newAttrValue, oldAttrValue) {
    attrName = _normalizeElementAttributeName(attrName);

    if (attrName === '') {
        return;
    }

    if (attrName === 'style') {
        _updateStyleProperties(element[attrName], newAttrValue, oldAttrValue);
        return;
    }

    if (_canBeAttribute(attrName, newAttrValue)) {
        element.setAttribute(attrName, newAttrValue);
        // Continue handle as properties
    }
    if (attrName in element) {
        try {
            element[attrName] = newAttrValue;
            return;
        } catch (x) {
            // Property may not writable
        }
    }
}

function _removeElementAttribute(element, attrName, oldAttrValue) {
    attrName = _normalizeElementAttributeName(attrName);
    
    if (attrName === '') {
        return;
    }

    if (attrName === 'style') {
        _updateStyleProperties(element[attrName], null, oldAttrValue);

        // Clean up HTML code
        element.removeAttribute(attrName);
        return;
    }

    if (_canBeAttribute(attrName, oldAttrValue)) {
        element.removeAttribute(attrName);
        // Continue handle as properties
    }
    if (attrName in element) {
        try {
            element[attrName] = null;
        } catch (x) {
            // Property may not writable
        }
    }
}

const onEventRegex = /^on[A-Z]/;

function _normalizeElementAttributeName(attrName) {
    // Support React className
    if (attrName === 'className') {
        return 'class';
    }

    // Support camelcase event listener bindings
    if (onEventRegex.test(attrName)) {
        return attrName.toLowerCase();
    }

    return attrName;
}

function _canBeAttribute(name, value) {
    if (name === 'innerHTML' || name === 'innerText' || name === 'textContent') {
        return false;
    }

    if (!(isString(value) || isNumber(value))) {
        return false;
    }

    return true;
}

function _updateStyleProperties(style, newProperties, oldProperties) {
    _updateKeyValues(
        style, newProperties, oldProperties,
        _updateStyleProperty, _removeStyleProperty
    );
}

function _updateStyleProperty(style, propName, newPropValue) {
    style[propName] = newPropValue;
}

function _removeStyleProperty(style, propName) {
    style[propName] = '';
}

function _updateKeyValues(target, newKeyValues, oldKeyValues, updateFn, removeFn) {
    const oldEmpty = isNullish(oldKeyValues);
    const newEmpty = isNullish(newKeyValues);

    let key;

    if (oldEmpty) {
        if (newEmpty) ; else {
            for (key in newKeyValues) {
                if (_hasOwnNonEmpty(newKeyValues, key)) {
                    updateFn(target, key, newKeyValues[key]);
                }
            }
        }
    } else if (newEmpty) {
        for (key in oldKeyValues) {
            if (_hasOwnNonEmpty(oldKeyValues, key)) {
                removeFn(target, key, oldKeyValues[key]);
            }
        }
    } else {
        for (key in oldKeyValues) {
            if (_hasOwnNonEmpty(oldKeyValues, key)) {
                if (_hasOwnNonEmpty(newKeyValues, key)) ; else {
                    removeFn(target, key, oldKeyValues[key]);
                }
            }
        }
        for (key in newKeyValues) {
            if (_hasOwnNonEmpty(newKeyValues, key)) {
                updateFn(target, key, newKeyValues[key], oldKeyValues[key]);
            }
        }
    }
}

function _hasOwnNonEmpty(target, prop) {
    return (
        hasOwnProperty.call(target, prop)
        && !isNullish(target[prop])
    );
}

function createNativeTextNode(text) {
    return document.createTextNode(text);
}

function createNativeElementWithNS(ns, type, attributes) {
    const element = (ns === NAMESPACE_SVG
        ? document.createElementNS('http://www.w3.org/2000/svg', type)
        : document.createElement(type)
    );

    updateNativeElementAttributes(element, attributes);
    
    return element;
}

function removeNativeNode(nativeNode) {
    if (nativeNode.parentNode !== null) {
        nativeNode.parentNode.removeChild(nativeNode);
    }
}

function insertNativeNodeAfter(parent, newChild, childBefore) {
    parent.insertBefore(newChild, (
        childBefore !== null ? childBefore.nextSibling : parent.firstChild
    ));
}

// Important!!!
// This module does not handle Portal nodes

function hydrateView(virtualNode) {
    virtualNode.namespace_ = _determineNS(virtualNode);

    // Do nothing more with fragments
    if (_isDry(virtualNode.type_)) {
        return;
    }

    let nativeNode;
    if (virtualNode.type_ === TextNode) {
        nativeNode = createNativeTextNode(virtualNode.props_);
        
        if (true) ; else {
            // Remove text content from the virtual text node to save memory.
            // Later, we will compare the new text with the text content of the native node,
            // though it is not a perfect way to compare
            virtualNode.props_ = null;
        }
    } else {
        nativeNode = createNativeElementWithNS(
            virtualNode.namespace_,
            virtualNode.type_,
            virtualNode.props_
        );
    }

    linkNativeNode(virtualNode, nativeNode);
    if (true) {
        attachVirtualNode(nativeNode, virtualNode);
    }
}

function rehydrateView(newVirtualNode, oldVirtualNode) {
    newVirtualNode.namespace_ = _determineNS(newVirtualNode);

    // Do nothing more with fragments
    if (_isDry(newVirtualNode.type_)) {
        return;
    }

    // Reuse the existing native node
    linkNativeNode(newVirtualNode, oldVirtualNode.nativeNode_);
    if (true) {
        attachVirtualNode(oldVirtualNode.nativeNode_, newVirtualNode);
    }

    if (newVirtualNode.type_ === TextNode) {
        updateNativeTextContent(
            newVirtualNode.nativeNode_,
            newVirtualNode.props_
        );
        
        if (true) ; else {
            // Remove text content from the virtual text node to save memory
            newVirtualNode.props_ = null;
        }
    } else {
        updateNativeElementAttributes(
            newVirtualNode.nativeNode_,
            newVirtualNode.props_,
            oldVirtualNode.props_
        );
    }
}

// We only support HTML and SVG namespaces
// as the most of browsers support
function _determineNS(virtualNode) {
    // Intrinsic namespace
    if (virtualNode.type_ === 'svg') {
        return NAMESPACE_SVG;
    }

    // As we never hydrate the container node,
    // the parent_ never empty here
    if (virtualNode.parent_.namespace_ === NAMESPACE_SVG &&
        virtualNode.parent_.type_ === 'foreignObject'
    ) {
        return NAMESPACE_HTML;
    }

    // By default, pass namespace below.
    return virtualNode.parent_.namespace_;
}

// Check if a node type cannot be hydrated
function _isDry(type) {
    return type === Fragment || isFunction(type);
}

// Important!!!
// This module does not handle Portal nodes

function updateView(newVirtualNode, oldVirtualNode) {
    rehydrateView(newVirtualNode, oldVirtualNode);

    if (newVirtualNode.nativeNode_ !== null) {
        const mpt = resolveMountingPoint(newVirtualNode.parent_);
        if (mpt !== null) {
            mpt.mountingRef_ = newVirtualNode.nativeNode_;
        }
    }
}

function insertView(virtualNode) {
    if (virtualNode.nativeNode_ !== null) {
        const mpt = resolveMountingPoint(virtualNode.parent_);
        if (mpt !== null) {
            insertNativeNodeAfter(mpt.nativeNode_, virtualNode.nativeNode_, mpt.mountingRef_);
            mpt.mountingRef_ = virtualNode.nativeNode_;
        }
    }
}

function deleteView(virtualNode) {
    if (virtualNode.nativeNode_ !== null) {
        removeNativeNode(virtualNode.nativeNode_);
    } else {
        walkNativeChildren(removeNativeNode, virtualNode);
    }
}

const STATE_NORMAL = 0;
const STATE_ERROR = 1;

/**
 *
 * @param {number} tag
 * @param {any} initialValue
 * @param {VirtualNode} context
 * @constructor
 */
function StateHook(tag, initialValue, context) {
    this.tag_ = tag;
    this.value_ = initialValue;
    this.setValue_ = _setState.bind(this);
    this.context_ = context;
    this.next_ = null;
}

function useState(initialValue) {
    return resolveCurrentStateHook(
        function (currentNode) {
            return new StateHook(STATE_NORMAL, initialValue, currentNode);
        },
        function (currentHook) {
            return [currentHook.value_, currentHook.setValue_];
        }
    );
}

function useError() {
    return resolveCurrentStateHook(
        function (currentNode) {
            // Make sure we have only one error hook in a component
            if (true) {
                let hook = currentNode.stateHook_;
                while (hook !== null) {
                    if (hook.tag_ === STATE_ERROR) {
                        console.error('A component accepts only one useError hook');
                    }
                    hook = hook.next_;
                }
            }
            return new StateHook(STATE_ERROR, null, currentNode);
        },
        function (currentHook) {
            return [currentHook.value_, function () {
                currentHook.setValue_(null);
            }];
        }
    );
}

const pendingUpdates = new Map();
let currentTimeoutId = null;

function _setState(value) {
    let newValue;

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

    if (this.value_ !== newValue) {
        // Set value synchronously
        this.value_ = newValue;

        // Enqueue update
        // We store the hook itself with the purpose of referring to
        // the up-to-date context when flushing updates.
        // So, we don't need to store all pending hooks inside a context.
        pendingUpdates.set(this.context_, this);

        // Reset timer
        if (currentTimeoutId !== null) {
            clearTimeout(currentTimeoutId);
        }
        currentTimeoutId = setTimeout(_flushUpdates);
    }
}

function _flushUpdates() {
    // Clear timeout ID to prepare for new state settings
    // happened in the renderTree (inside setLayoutEffect)
    currentTimeoutId = null;

    // Copy the contexts and clear pending updates
    // to prepare for new state settings
    const contexts = [];
    pendingUpdates.forEach(function (hook, contextAsKey) {
        // Important!!!
        // Use hook.context_ instead of contextAsKey
        // as it may be outdated due to the reconciliation process
        contexts.push(hook.context_);
    });
    pendingUpdates.clear();
    
    // Re-render trees
    for (let i = 0; i < contexts.length; ++i) {
        renderTree(contexts[i]);
    }
}

function catchError(error, virtualNode) {
    let parent = virtualNode.parent_;
    let hook;

    while (parent !== null) {
        hook = parent.stateHook_;
        while (hook !== null) {
            if (hook.tag_ === STATE_ERROR) {
                hook.setValue_(function (prevError) {
                    return prevError || error;
                });
                return;
            }
            hook = hook.next_;
        }
        parent = parent.parent_;
    }

    if (true) {
        console.info('You can catch the following error by implementing an error boundary with the useError hook');
    }

    throw error;
}

const EFFECT_NORMAL = 0;
const EFFECT_LAYOUT = 1;

/**
 *
 * @param {number} tag
 * @param {function} callback
 * @param {[]|null} deps
 * @return {EffectHook}
 * @constructor
 */
function EffectHook(tag, callback, deps) {
    this.tag_ = tag;
    this.callback_ = callback;
    this.deps_ = deps;
    this.destroy_ = null;
    this.lastDeps_ = null;
    this.lastDestroy_ = null;
    this.next_ = null;
}

function useEffect(callback, deps) {
    return _useEffectImpl(EFFECT_NORMAL, callback, deps);
}

function useLayoutEffect(callback, deps) {
    return _useEffectImpl(EFFECT_LAYOUT, callback, deps);
}

function _useEffectImpl(tag, callback, deps) {
    if (deps === undefined) {
        deps = null;
    }

    return resolveCurrentEffectHook(
        function (currentNode) {
            return new EffectHook(tag, callback, deps);
        },
        function (currentHook) {
            if (true) {
                if (!(
                    deps === null && currentHook.deps_ === null ||
                    deps.length === currentHook.deps_.length
                )) {
                    throw new Error('Deps must be size-fixed');
                }
                // On the production, we accept the deps change its length
                // and consider it is changed
            }

            currentHook.callback_ = callback;
            currentHook.deps_ = deps;
        }
    );
}

/**
 *
 * @param {number} effectTag
 * @param {VirtualNode} virtualNode
 * @param {boolean} isNewlyMounted
 */
function mountEffects(effectTag, virtualNode, isNewlyMounted) {
    let hook = virtualNode.effectHook_;
    while (hook !== null) {
        if (hook.tag_ === effectTag) {
            if (isNewlyMounted || _mismatchDeps(hook.deps_, hook.lastDeps_)) {
                try {
                    _mountEffect(hook);
                } catch (error) {
                    catchError(error, virtualNode);
                }
            }
        }
        hook = hook.next_;
    }
}

/**
 * @param {number} effectTag
 * @param {VirtualNode} virtualNode
 * @param {boolean} isUnmounted
 */
function destroyEffects(effectTag, virtualNode, isUnmounted) {
    let hook = virtualNode.effectHook_;
    while (hook !== null) {
        if (hook.tag_ === effectTag) {
            if (hook.lastDestroy_ !== null || hook.destroy_ !== null) {
                if (isUnmounted || _mismatchDeps(hook.deps_, hook.lastDeps_)) {
                    try {
                        _destroyEffect(hook, isUnmounted);
                    } catch (error) {
                        catchError(error, virtualNode);
                    }
                }
            }
        }
        hook = hook.next_;
    }
}

/**
 *
 * @param {EffectHook} hook
 */
function _mountEffect(hook) {
    // Save the last ones for the next time
    hook.lastDeps_ = hook.deps_;
    hook.lastDestroy_ = hook.destroy_;
    
    // Run effect callback
    hook.destroy_ = hook.callback_();
    if (hook.destroy_ === undefined) {
        hook.destroy_ = null;
    }
}

/**
 *
 * @param {EffectHook} hook
 * @param {boolean} isUnmounted
 */
function _destroyEffect(hook, isUnmounted) {
    if (hook.lastDestroy_ !== null && !isUnmounted) {
        hook.lastDestroy_();
        return;
    }

    if (hook.destroy_ !== null) {
        hook.destroy_();
    }
}

/**
 * 
 * @param {[]|null} deps 
 * @param {[]|null} lastDeps 
 * @returns {boolean}
 */
function _mismatchDeps(deps, lastDeps) {
    // Always
    if (deps === null) {
        return true;
    }

    // Lazy
    if (deps.length === 0) {
        return false;
    }

    // Deps
    // 1. When init effect
    if (lastDeps === null) {
        return false;
    }
    // 2. Two arrays are equal
    if (compareArrays(deps, lastDeps)) {
        return false;
    }

    // DepsChanged
    {
        return true;
    }
}

function reconcileChildren(current, isRenderRoot) {
    if (isFunction(current.type_)) {
        _reconcileChildOfDynamicNode(current, current.alternate_, isRenderRoot);
    } else if (current.alternate_ !== null) {
        _reconcileChildrenOfStaticNode(current, current.alternate_);
    }
}

function _reconcileChildOfDynamicNode(current, alternate, isRenderRoot) {
    if (alternate !== null) {
        // Copy hooks
        current.refHook_ = alternate.refHook_;
        current.stateHook_ = alternate.stateHook_;
        current.effectHook_ = alternate.effectHook_;

        // Update contexts of state hooks
        let stateHook = current.stateHook_;
        while (stateHook !== null) {
            stateHook.context_ = current;
            stateHook = stateHook.next_;
        }
    }

    let newContent;
    prepareCurrentlyProcessing(current);
    try {
        newContent = current.type_(current.props_);
    } catch (error) {
        catchError(error, current);
        newContent = null;
    }
    flushCurrentlyProcessing();

    const newChild = createVirtualNodeFromContent(newContent);
    
    if (newChild !== null) {
        newChild.parent_ = current;
        
        // Don't need to set the slot property
        // as a dynamic node can have only one child
    }

    const oldChild = isRenderRoot ? current.child_ : (
        alternate !== null ? alternate.child_ : null
    );
    
    if (oldChild !== null) {
        if (newChild !== null && newChild.type_ === oldChild.type_ && newChild.key_ === oldChild.key_) {
            _markAlternate(newChild, oldChild);
        } else {
            _addDeletion(current, oldChild);
        }
    }
    
    current.child_ = newChild;
}

function _reconcileChildrenOfStaticNode(current, alternate) {
    const oldChildren = _mapChildren(alternate);
    const newChildren = _mapChildren(current);

    let newChild;
    oldChildren.forEach(function (oldChild, mapKey) {
        newChild = newChildren.get(mapKey);
        if (newChild !== undefined && newChild.type_ === oldChild.type_) {
            _markAlternate(newChild, oldChild);
        } else {
            _addDeletion(current, oldChild);
        }
    });
}

function _markAlternate(newChild, oldChild) {
    newChild.alternate_ = oldChild;
}

function _addDeletion(current, childToDelete) {
    if (current.deletions_ === null) {
        current.deletions_ = [childToDelete];
    } else {
        current.deletions_.push(childToDelete);
    }
}

function _mapChildren(node) {
    const map = new Map();
    let child = node.child_;
    while (child !== null) {
        if (child.key_ !== null) {
            map.set(child.key_, child);
        } else {
            map.set(child.slot_, child);
        }
        child = child.sibling_;
    }
    return map;
}

function renderTree(current) {
    const effectMountNodes = new Map();
    const effectDestroyNodes = new Map();
    
    // The mounting point of the current
    const mpt = resolveMountingPoint(current);

    // In the tree, the mounting point lies at a higher level
    // than the current, so we need to initialize/cleanup
    // its temporary properties from outside of the work loop
    walkNativeChildren(function (nativeChild) {
        mpt.mountingRef_ = nativeChild;
    }, mpt, current);

    // Main work
    _workLoop(
        _performUnitOfWork, _onReturn, current,
        effectMountNodes, effectDestroyNodes
    );
    
    // Cleanup
    mpt.mountingRef_ = null;

    // Layout effects
    effectDestroyNodes.forEach(function (isUnmounted, node) {
        destroyEffects(EFFECT_LAYOUT, node, isUnmounted);
    });
    effectMountNodes.forEach(function (isNewlyMounted, node) {
        mountEffects(EFFECT_LAYOUT, node, isNewlyMounted);
    });

    // Effects
    setTimeout(function () {
        effectDestroyNodes.forEach(function (isUnmounted, node) {
            destroyEffects(EFFECT_NORMAL, node, isUnmounted);
        });
        effectMountNodes.forEach(function (isNewlyMounted, node) {
            mountEffects(EFFECT_NORMAL, node, isNewlyMounted);
        });
    });
}

// Optimize insertion to reduce number of reflows on the browser
const INSERT_IN_RETURN = 0;
const INSERT_OFFSCREEN = 1;

function _performUnitOfWork(current, root, effectMountNodes, effectDestroyNodes) {
    const isRenderRoot = current === root;
    
    // Reconcile current's children
    reconcileChildren(current, isRenderRoot);

    // Portal nodes never change the view itself
    if (current.type_ !== Portal) {
        if (isRenderRoot) {
            if (current.effectHook_ !== null) {
                effectDestroyNodes.set(current, false);
                effectMountNodes.set(current, false);
            }
        } else {
            if (current.alternate_ !== null) {
                updateView(current, current.alternate_);
                if (current.effectHook_ !== null) {
                    effectDestroyNodes.set(current.alternate_, false);
                    effectMountNodes.set(current, false);
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
                        // Insert-in-return nodes must have a native node!
                        if (current.nativeNode_ !== null) {
                            current.insertion_ = INSERT_IN_RETURN;
                        }
                    }
                } else {
                    insertView(current);
                }
                if (current.effectHook_ !== null) {
                    effectMountNodes.set(current, true);
                }
            }
        }
    }
    
    // Delete subtrees that no longer exist
    if (current.deletions_ !== null) {
        for (let i = 0; i < current.deletions_.length; ++i) {
            deleteView(current.deletions_[i]);
            _workLoop(function (node) {
                if (node.effectHook_ !== null) {
                    effectDestroyNodes.set(node, true);
                }
            }, null, current.deletions_[i]);
        }
        current.deletions_ = null;
    }
}

// Callback called after walking through a node and all of its ascendants
function _onReturn(current) {
    // Process insert-in-return node before walk out of its subtree
    if (current.insertion_ === INSERT_IN_RETURN) {
        insertView(current);
    }

    // This is when we cleanup the remaining temporary properties
    current.mountingRef_ = null;
    current.insertion_ = null;
}

// Reference: https://github.com/facebook/react/issues/7942
function _workLoop(performUnit, onReturn, root, D0, D1) {
    let current = root;
    while (true) {
        performUnit(current, root, D0, D1);
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
            if (onReturn !== null) {
                onReturn(current);
            }
        }
        current = current.sibling_;
    }
}

/**
 * 
 * @param {any} children 
 * @param {Element} targetNativeNode
 */
 function render(children, targetNativeNode) {
    const portal = createPortal(children, targetNativeNode);

    renderTree(portal);
}

/**
 * 
 * @param {any} children 
 * @param {Element} targetNativeNode
 * @returns {VirtualNode}
 */
function createPortal(children, targetNativeNode) {
    /**
     * @type {VirtualNode}
     */
    let portal;

    if (!(portal = extractVirtualNode(targetNativeNode))) {
        if (true) {
            if (targetNativeNode.firstChild) {
                console.error('Target node must be empty');
            }
        }
        
        portal = new VirtualNode(Portal, {});

        // Determine the namespace (we only support SVG and HTML namespaces)
        portal.namespace_ = ('ownerSVGElement' in targetNativeNode) ? NAMESPACE_SVG : NAMESPACE_HTML;
        
        linkNativeNode(portal, targetNativeNode);
        attachVirtualNode(targetNativeNode, portal);
    }

    portal.props_.children = children;

    return portal;
}

exports.Fragment = Fragment;
exports.TextNode = TextNode;
exports.createElement = createElement;
exports.createPortal = createPortal;
exports.createRef = createRef;
exports.jsx = createElement;
exports.render = render;
exports.useEffect = useEffect;
exports.useError = useError;
exports.useLayoutEffect = useLayoutEffect;
exports.useRef = useRef;
exports.useState = useState;
