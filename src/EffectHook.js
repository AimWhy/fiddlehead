import {resolveCurrentlyProcessing} from "./currentlyProcessing";

/**
 *
 * @param {function} callback
 * @param {[]?} deps
 * @param {function?} lastDestroy
 * @return {EffectHook}
 * @constructor
 */
export function EffectHook(callback, deps, lastDestroy) {
    this.tag = EFFECT_NONE;
    this.callback = callback;
    this.deps = deps;
    this.destroy = undefined;
    this.lastDestroy = lastDestroy;
}

export const EFFECT_NONE = 0;
export const EFFECT_ALWAYS = 1;
export const EFFECT_LAZY = 2;
export const EFFECT_DEPS = 3;
export const EFFECT_DEPS_CHANGED = 4;


export function useEffect(callback, deps = null) {
    const [functionalVirtualNode, hookIndex] = resolveCurrentlyProcessing();

    if (functionalVirtualNode.hooks.length > hookIndex) {
        /**
         * @type {EffectHook}
         */
        const currentHook = functionalVirtualNode.hooks[hookIndex];

        if (!(
            deps === null && currentHook.deps === null ||
            deps.length === currentHook.deps.length
        )) {
            throw new Error('Deps must be size-fixed');
        }

        const effectTag = _getEffectTag(deps, currentHook.deps);

        if (effectTag === EFFECT_LAZY) {
            return;
        }

        if (effectTag === EFFECT_DEPS) {
            currentHook.tag = effectTag;
            return;
        }

        if (effectTag === EFFECT_ALWAYS || effectTag === EFFECT_DEPS_CHANGED) {
            const newHook = new EffectHook(callback, deps, currentHook.destroy);
            newHook.tag = effectTag;
            functionalVirtualNode.hooks[hookIndex] = newHook;
            return;
        }

        return;
    }

    const hook = new EffectHook(callback, deps);
    hook.tag = _getEffectTag(deps);

    functionalVirtualNode.hooks.push(hook);
}

/**
 *
 * @param {VirtualNode} functionalVirtualNode
 * @param {boolean} isNewNodeMounted
 */
export function mountEffectsByFunctionalVirtualNode(functionalVirtualNode, isNewNodeMounted) {
    functionalVirtualNode.hooks.forEach(hook => {
        if (!(hook instanceof EffectHook)) {
            return;
        }

        if (isNewNodeMounted || hook.tag === EFFECT_ALWAYS || hook.tag === EFFECT_DEPS_CHANGED) {
            _mountEffectHook(hook);
        }
    });
}

/**
 *
 * @param {VirtualNode} functionalVirtualNode
 * @param {boolean} isNodeUnmounted
 */
export function destroyEffectsByFunctionalVirtualNode(functionalVirtualNode, isNodeUnmounted) {
    functionalVirtualNode.hooks.forEach(hook => {
        if (!(
            hook instanceof EffectHook &&
            (hook.lastDestroy !== undefined || hook.destroy !== undefined)
        )) {
            return;
        }

        if (isNodeUnmounted || hook.tag === EFFECT_ALWAYS || hook.tag === EFFECT_DEPS_CHANGED) {
            _destroyEffectHook(hook, isNodeUnmounted);
        }
    });
}

function _getEffectTag(deps, lastDeps = false) {
    // Always
    if (deps === null) {
        return EFFECT_ALWAYS;
    }

    // Lazy
    if (deps.length === 0) {
        return EFFECT_LAZY;
    }

    // Deps
    if (lastDeps === false || _compareSameLengthArrays(deps, lastDeps)) {
        return EFFECT_DEPS;
    }

    // DepsChanged
    {
        return EFFECT_DEPS_CHANGED;
    }
}

function _compareSameLengthArrays(a, b) {
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }

    return true;
}

/**
 *
 * @param {EffectHook} effectHook
 */
function _mountEffectHook(effectHook) {
    effectHook.destroy = effectHook.callback();
}

/**
 *
 * @param {EffectHook} hook
 * @param {boolean} isNodeUnmounted
 */
function _destroyEffectHook(hook, isNodeUnmounted = false) {
    if (hook.lastDestroy !== undefined && !isNodeUnmounted) {
        hook.lastDestroy();
        return;
    }

    if (hook.destroy !== undefined) {
        hook.destroy();
    }
}
