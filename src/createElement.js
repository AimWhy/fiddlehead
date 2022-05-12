import {isFunction} from './Util';
import {createVirtualNodeFromContent, NODE_FRAGMENT, VirtualNode} from './VirtualNode';
import {findMemoizedHooks, linkMemoizedHooks, unlinkMemoizedHooks} from './MemoizedHooks';
import {generateTemporaryPath} from './Path';
import {StateHook} from './StateHook';

/**
 *
 * @param {string|function} type
 * @param {{}?} attributes
 * @param {[]} content
 * @return {VirtualNode}
 */
export function createElement(type, attributes, ...content) {
    attributes = attributes || {};

    if (type === null) {
        return _createStaticVirtualNode(NODE_FRAGMENT, attributes, ...content);
    }

    if (isFunction(type)) {
        return _createFunctionalVirtualNode(type, attributes, ...content);
    }

    return _createStaticVirtualNode(type, attributes, ...content);
}

function _createFunctionalVirtualNode(type, attributes, ...content) {
    const {key = null, ref = null, ...props} = attributes;
    props.children = content;

    const tempPath = generateTemporaryPath();

    const virtualNode = new VirtualNode(type, props, key, ref);
    linkMemoizedHooks(tempPath, virtualNode.hooks);

    virtualNode.resolvePath = () => {
        unlinkMemoizedHooks(tempPath);

        const memoizedHooks = findMemoizedHooks(virtualNode.path);
        if (memoizedHooks !== null) {
            // Here, new node does not have any hooks
            // because it is in the pending state
            // After when the tree is established
            // and then updating, the hooks will be called (or created if it is the first time)
            virtualNode.hooks = memoizedHooks;

            for (let i = 0; i < virtualNode.hooks.length; i++) {
                const hook = virtualNode.hooks[i];
                if (hook instanceof StateHook) {
                    hook.context = virtualNode;
                }
            }
        }

        linkMemoizedHooks(virtualNode.path, virtualNode.hooks);
    };

    return virtualNode;
}

function _createStaticVirtualNode(type, attributes, ...content) {
    const {key = null, ref = null, ...props} = attributes;

    const virtualNode = new VirtualNode(type, props, key, ref);

    for (let i = 0; i < content.length; i++) {
        const childNode = createVirtualNodeFromContent(content[i]);
        if (childNode !== null) {
            childNode.parent = virtualNode;
            childNode.posInRow = i;
            virtualNode.children.push(childNode);
        }
    }

    return virtualNode;
}
