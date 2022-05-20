import {RefHook} from './RefHook';
import {isArray, isFunction, isNumber, isString} from './Util';

/**
 *
 * @param {string|function} type
 * @constructor
 */
export function VirtualNode(type) {
    this.type_ = type;
    this.props_ = {};
    this.key_ = null;
    this.ref_ = null;

    this.hooks_ = [];

    /**
     * @type {VirtualNode|null}
     */
    this.parent_ = null;

    /**
     * @type {VirtualNode[]}
     */
    this.children_ = [];

    this.path_ = '';
    this.posInRow_ = null;

    this.nativeNode_ = null;
    this.ns_ = null;

    this.tag_ = (type === NODE_FRAGMENT || type === NODE_ARRAY
        ? TAG_COLLECTIVE
        : (isFunction(type)
            ? TAG_FUNCTIONAL
            : TAG_VIEWABLE));
}

// Do not support namespace MathML as almost browsers do not support as well
export const NS_HTML = 0;
export const NS_SVG = 1;

// Note:
// Use special URI characters

export const NODE_TEXT = '#';
export const NODE_ARRAY = '[';
export const NODE_FRAGMENT = '=';

export const TAG_VIEWABLE = 0;
export const TAG_FUNCTIONAL = 1;
export const TAG_COLLECTIVE = 2;

export const PATH_SEP = '/';

export const RootType = props => props.children;

/**
 * 
 * @param {*} key 
 * @returns {string}
 */
export function escapeVirtualNodeKey(key) {
    return '@' + encodeURIComponent(key);
}

let functionalTypeInc = 0;

/**
 * 
 * @param {Function} type 
 * @returns {string}
 */
export function createFunctionalTypeAlias(type) {
    return (
        (__DEV__ ? type.name : '') +
        '{' + (++functionalTypeInc).toString(36)
    );
}

let rootIdInc = 0;

/**
 * 
 * @returns {string}
 */
export function createRootId() {
    return '~' + (++rootIdInc).toString(36);
}

/**
 * 
 * @param {VirtualNode} virtualNode 
 * @param {Node} nativeNode 
 */
export function linkNativeNode(virtualNode, nativeNode) {
    virtualNode.nativeNode_ = nativeNode;

    if (virtualNode.ref_ instanceof RefHook) {
        virtualNode.ref_.current = nativeNode;
    }
}

/**
 *
 * @param {*} content
 * @return {null|VirtualNode}
 */
export function createVirtualNodeFromContent(content) {
    let node = null;

    if (content instanceof VirtualNode) {
        node = content;
    }
    else if (isString(content) || isNumber(content)) {
        node = new VirtualNode(NODE_TEXT);
        node.props_.children = content;
    }
    else if (isArray(content)) {
        node = new VirtualNode(NODE_ARRAY);
        appendChildrenFromContent(node, content);
    }

    return node;
}

/**
 * 
 * @param {VirtualNode} parent 
 * @param {VirtualNode} child
 * @param {number} posInRow
 */
export function appendChildVirtualNode(parent, child, posInRow) {
    child.parent_ = parent;
    child.posInRow_ = posInRow;
    parent.children_[posInRow] = child;
}

/**
 * 
 * @param {VirtualNode} virtualNode 
 * @param {Array} content
 */
export function appendChildrenFromContent(virtualNode, content) {
    for (
        let childNode, posInRow = -1, i = 0, len = content.length
        ; i < len
        ; ++i
    ) {
        childNode = createVirtualNodeFromContent(content[i]);
        if (childNode !== null) {
            appendChildVirtualNode(virtualNode, childNode, ++posInRow);
        }
    }
}
