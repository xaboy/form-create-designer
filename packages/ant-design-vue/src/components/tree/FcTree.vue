<template>
    <div class="_fd-tree-block">
        <div class="_fd-tree__search">
            <a-input class="_fc-search-input" v-model:value="rawKeyword" :placeholder="placeholder" allow-clear @change="onInput">
                <template #suffix>
                    <i class="fc-icon icon-search"></i>
                </template>
            </a-input>
        </div>

        <div class="_fd-tree">
            <ul class="_fd-tree__list" role="tree" ref="rootList" data-parent-key="__root__">
                <FcTreeNode
                    v-for="item in viewTree"
                    :key="getKey(item)"
                    :item="item"
                    :level="1"
                    :indent="indent"
                    :expanded-keys="expandedKeys"
                    :get-key="getKey"
                    :get-children="getChildren"
                    :drag-state="dragState"
                    @toggle="toggle"
                    @select="select"
                >
                    <template #default="{ node, data }">
                        <slot :node="node" :data="data" />
                    </template>
                </FcTreeNode>
            </ul>
            <div v-if="showRootDropLine" class="_fd-tree__drop-line"></div>
        </div>
    </div>
</template>

<script>
import Sortable from 'sortablejs';
import FcTreeNode from './FcTreeNode.vue';

function defaultGetKey(item) {
    return item?.id ?? item?.key ?? item;
}

function defaultGetChildren(item) {
    return item?.children;
}

function debounce(fn, wait = 300) {
    let t = null;
    return function (...args) {
        if (t) clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
}

function runOptional(fn, arg) {
    if (!fn) return true;
    try {
        return fn(arg) !== false;
    } catch (e) {
        return true;
    }
}

export default {
    name: 'FcTree',
    components: { FcTreeNode },
    props: {
        data: { type: Array, default: () => [] },
        indent: { type: Number, default: 10 },
        defaultExpandAll: { type: Boolean, default: true },
        placeholder: { type: String, default: '' },
        filterNodeMethod: { type: Function, default: null },
        getKey: { type: Function, default: defaultGetKey },
        getChildren: { type: Function, default: defaultGetChildren },

        draggable: { type: Boolean, default: false },
        canInnerDrop: { type: Function, default: null },
        canDrop: { type: Function, default: null },
        beforeDrag: { type: Function, default: null },
        beforeDrop: { type: Function, default: null },
        ensureChildren: { type: Boolean, default: false },
    },
    emits: ['select', 'toggle', 'drop'],
    data() {
        return {
            rawKeyword: '',
            debouncedKeyword: '',
            expandedKeys: new Set(),
            dragState: this.createEmptyDragState(),
            debounceKeywordFn: null,
            sortableInstances: [],
            debounceInitSortableFn: null,
            expandBootstrapped: false,
            activeSortable: null,
            keydownEscHandler: null,
            dragPointerMoveHandler: null,
            pointerMoveRaf: null,
            pendingDragMoveEvent: null,
            cancelingDrag: false,
            sortableGroupName: '',
        };
    },
    computed: {
        viewTree() {
            const val = this.debouncedKeyword;
            const nodes = this.data || [];
            return this.filterTree(nodes, val);
        },
        showRootDropLine() {
            return (
                this.dragState.active &&
                this.dragState.allowed !== false &&
                !this.dragState.hoverKey &&
                this.dragState.resolvedParentKey === '__root__'
            );
        },
    },
    watch: {
        data: {
            immediate: true,
            deep: false,
            handler(nodes) {
                nodes = nodes || [];
                this.pruneExpandedKeys(nodes);

                const hasNodes = nodes.length > 0;
                if (!this.expandBootstrapped && hasNodes) {
                    if (!this.debouncedKeyword) {
                        if (this.defaultExpandAll) this.applyExpandAll(nodes);
                    } else {
                        this.$nextTick(() => this.applyExpandAll(this.viewTree));
                    }
                    this.expandBootstrapped = true;
                } else if (this.expandBootstrapped && this.debouncedKeyword) {
                    this.$nextTick(() => this.applyExpandAll(this.viewTree));
                }

                this.queueInitSortable();
            },
        },
        draggable() {
            this.queueInitSortable();
        },
        debouncedKeyword() {
            this.queueInitSortable();
        },
    },
    created() {
        this.sortableGroupName = `fc-tree-${this._uid || Math.random().toString(36).slice(2)}`;
        this.debounceKeywordFn = debounce(v => {
            this.debouncedKeyword = (v || '').trim();
            this.syncExpandOnKeyword(this.debouncedKeyword);
        }, 500);

        this.debounceInitSortableFn = debounce(() => {
            this.initSortable();
        }, 60);
    },
    mounted() {
        this.keydownEscHandler = e => {
            const key = e?.key || '';
            if (key !== 'Escape' && key !== 'Esc') return;
            if (!this.dragState?.active) return;
            e?.preventDefault?.();
            e?.stopPropagation?.();
            this.cancelDrag(e);
        };
        window.addEventListener('keydown', this.keydownEscHandler);
        this.queueInitSortable();
    },
    beforeUnmount() {
        if (this.keydownEscHandler) window.removeEventListener('keydown', this.keydownEscHandler);
        this.keydownEscHandler = null;
        this.destroySortable();
    },
    methods: {
        createEmptyDragState() {
            return {
                active: false,
                draggingKey: '',
                sourceParentKey: '__root__',
                sourceIndex: -1,
                hoverKey: '',
                dropItem: null,
                dropType: 'none',
                resolvedParentKey: '',
                resolvedIndex: -1,
                allowed: false,
            };
        },
        cleanupDragState({ reinitSortable = true } = {}) {
            this.dragState = this.createEmptyDragState();
            this.activeSortable = null;
            this.detachPointerTracking();
            if (reinitSortable) this.$nextTick(() => this.queueInitSortable());
        },
        attachPointerTracking() {
            if (this.dragPointerMoveHandler) return;
            this.pointerMoveRaf = null;
            this.pendingDragMoveEvent = null;
            const handler = e => {
                if (!this.dragState.active) return;
                this.pendingDragMoveEvent = e;
                if (this.pointerMoveRaf != null) return;
                this.pointerMoveRaf = requestAnimationFrame(() => {
                    this.pointerMoveRaf = null;
                    const ev = this.pendingDragMoveEvent;
                    this.pendingDragMoveEvent = null;
                    if (!ev || !this.dragState.active) return;
                    this.handleDragMove({ originalEvent: ev });
                });
            };
            this.dragPointerMoveHandler = handler;
            if (typeof window !== 'undefined' && window.PointerEvent) {
                document.addEventListener('pointermove', handler, true);
            } else {
                document.addEventListener('mousemove', handler, true);
                document.addEventListener('touchmove', handler, { capture: true, passive: true });
            }
        },
        detachPointerTracking() {
            const handler = this.dragPointerMoveHandler;
            if (handler) {
                if (typeof window !== 'undefined' && window.PointerEvent) {
                    document.removeEventListener('pointermove', handler, true);
                } else {
                    document.removeEventListener('mousemove', handler, true);
                    document.removeEventListener('touchmove', handler, { capture: true, passive: true });
                }
                this.dragPointerMoveHandler = null;
            }
            if (this.pointerMoveRaf != null) {
                cancelAnimationFrame(this.pointerMoveRaf);
                this.pointerMoveRaf = null;
            }
            this.pendingDragMoveEvent = null;
        },
        filter(val) {
            this.rawKeyword = val || '';
            this.debounceKeywordFn?.(this.rawKeyword);
        },
        onInput() {
            this.debounceKeywordFn?.(this.rawKeyword);
        },
        clear() {
            this.rawKeyword = '';
            this.debouncedKeyword = '';
            this.syncExpandOnKeyword('');
        },
        toggle(item) {
            const k = this.getKey(item);
            const next = new Set(this.expandedKeys);
            if (next.has(k)) next.delete(k);
            else next.add(k);
            this.expandedKeys = next;
            this.$emit('toggle', item);
            this.queueInitSortable();
        },
        select(item) {
            this.$emit('select', item);
        },
        getNodeKey(item) {
            return String(this.getKey(item));
        },
        applyExpandAll(nodes) {
            const keys = new Set();
            const walk = list => {
                (list || []).forEach(n => {
                    const children = this.getChildren(n);
                    if (Array.isArray(children) && children.length) {
                        keys.add(this.getKey(n));
                        walk(children);
                    }
                });
            };
            walk(nodes);
            this.expandedKeys = keys;
        },
        applyCollapseAll() {
            this.expandedKeys = new Set();
        },
        pruneExpandedKeys(nodes) {
            const alive = new Set();
            const walk = list => {
                (list || []).forEach(n => {
                    alive.add(this.getKey(n));
                    const children = this.getChildren(n);
                    if (Array.isArray(children) && children.length) walk(children);
                });
            };
            walk(nodes || []);
            const prev = this.expandedKeys;
            const next = new Set();
            prev.forEach(k => {
                if (alive.has(k)) next.add(k);
            });
            if (next.size !== prev.size) this.expandedKeys = next;
        },
        syncExpandOnKeyword(val) {
            if (!val) {
                if (this.defaultExpandAll) this.applyExpandAll(this.data);
                else this.applyCollapseAll();
                return;
            }
            this.$nextTick(() => this.applyExpandAll(this.viewTree));
        },
        matchSelf(val, item) {
            if (!val) return true;
            if (this.filterNodeMethod) {
                try {
                    return !!this.filterNodeMethod(val, item);
                } catch (e) {
                    return true;
                }
            }
            try {
                return JSON.stringify(item).indexOf(val) > -1;
            } catch (e) {
                return true;
            }
        },
        filterTree(list, val) {
            if (!val) return list || [];
            const out = [];
            (list || []).forEach(item => {
                const children = this.getChildren(item);
                const filteredChildren = this.filterTree(Array.isArray(children) ? children : [], val);
                const selfOk = this.matchSelf(val, item);
                if (selfOk || filteredChildren.length) {
                    out.push({
                        ...item,
                        children: filteredChildren,
                    });
                }
            });
            return out;
        },

        queueInitSortable() {
            this.$nextTick(() => this.debounceInitSortableFn?.());
        },

        destroySortable() {
            this.sortableInstances.forEach(ins => {
                try {
                    ins?.destroy?.();
                } catch (e) {}
            });
            this.sortableInstances = [];
            this.cancelingDrag = false;
            this.cleanupDragState({ reinitSortable: false });
        },

        initSortable() {
            if (this.dragState?.active) return;
            this.destroySortable();
            if (!this.draggable) return;
            if (this.debouncedKeyword) return;

            this.$nextTick(() => {
                this.$nextTick(() => {
                    const root = this.$refs.rootList;
                    if (!root) return;

                    const containers = [root, ...Array.from(root.querySelectorAll('ul._fd-tree-node__children'))];
                    containers.forEach(el => {
                        this.sortableInstances.push(this.createSortable(el));
                    });
                });
            });
        },

        createSortable(el) {
            const self = this;
            return new Sortable(el, {
                animation: 0,
                sort: false,
                forceFallback: true,
                fallbackOnBody: true,
                fallbackTolerance: 0,
                filter: '._fd-tree-node__expand',
                preventOnFilter: true,
                group: {
                    name: this.sortableGroupName,
                    pull: true,
                    put: [this.sortableGroupName],
                },
                onStart(evt) {
                    self.handleDragStart(evt, this);
                },
                onMove: () => false,
                onEnd() {
                    self.handleDragEnd();
                },
            });
        },

        getParentKeyByEl(el) {
            const k = el?.dataset?.parentKey;
            return k || '__root__';
        },
        getContainerParentKey(el) {
            return this.getParentKeyByEl(el?.closest?.('[data-parent-key]') || el);
        },
        getClosestNodeEl(target) {
            return target?.closest?.('li._fd-tree-node') || null;
        },
        getClientPoint(evt) {
            const oe = evt?.originalEvent ?? evt;
            const t = oe?.touches?.[0] || oe?.changedTouches?.[0] || oe;
            const x = Number(t?.clientX);
            const y = Number(t?.clientY);
            if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
            return { x, y };
        },
        getItemByKey(key, list = this.data || []) {
            if (!key) return null;
            for (const item of list) {
                if (this.getNodeKey(item) === String(key)) return item;
                const children = this.getChildren(item);
                const found = this.getItemByKey(key, Array.isArray(children) ? children : []);
                if (found) return found;
            }
            return null;
        },
        getListByParentKey(parentKey) {
            if (!parentKey || parentKey === '__root__') return this.data || [];
            const parentNode = this.getItemByKey(parentKey);
            if (!parentNode) return null;
            if (this.ensureChildren && !Array.isArray(parentNode.children)) parentNode.children = [];
            const children = this.getChildren(parentNode);
            return Array.isArray(children) ? children : null;
        },
        getIndexInList(list, item) {
            return (list || []).findIndex(v => this.getNodeKey(v) === this.getNodeKey(item));
        },
        canDropInner(item) {
            if (this.canInnerDrop) {
                return runOptional(this.canInnerDrop, item);
            }
            const children = this.getChildren(item);
            if (Array.isArray(children)) return true;
            return !!this.ensureChildren;
        },
        ensureExpandedForInnerDrop(hoverKey) {
            if (!hoverKey) return;
            const item = this.getItemByKey(hoverKey);
            if (!item || !this.canDropInner(item)) return;
            const k = this.getKey(item);
            if (this.expandedKeys?.has?.(k)) return;
            const next = new Set(this.expandedKeys);
            next.add(k);
            this.expandedKeys = next;
        },
        isDescendantKey(parentKey, childKey) {
            const parentItem = this.getItemByKey(parentKey);
            if (!parentItem) return false;
            const walk = list => {
                for (const item of list || []) {
                    if (this.getNodeKey(item) === String(childKey)) return true;
                    const children = this.getChildren(item);
                    if (walk(Array.isArray(children) ? children : [])) return true;
                }
                return false;
            };
            const children = this.getChildren(parentItem);
            return walk(Array.isArray(children) ? children : []);
        },
        standardizeCanDrop(payload) {
            let toParent = null;
            if (payload.dropType === 'inner') {
                toParent = payload.dropItem || null;
            } else if (payload.resolvedParentKey !== '__root__') {
                toParent = this.getItemByKey(payload.resolvedParentKey) || null;
            }
            return {
                dragItem: payload.dragItem,
                dropItem: payload.dropItem || null,
                dropType: payload.dropType,
                fromParent: payload.fromParent,
                toParent,
                toIndex: payload.resolvedIndex,
                fromKey: payload.sourceParentKey,
                toKey: payload.resolvedParentKey,
            };
        },
        cancelDrag(originalEvent) {
            const inst = this.activeSortable;
            const evt = (() => {
                try {
                    return new MouseEvent('mouseup', { bubbles: true, cancelable: true });
                } catch (e) {
                    return originalEvent || { cancelable: false, preventDefault() {}, stopPropagation() {} };
                }
            })();
            if (inst && typeof inst._onDrop === 'function') {
                this.cancelingDrag = true;
                inst._onDrop(evt);
                return;
            }
            this.cancelingDrag = false;
            this.cleanupDragState();
        },
        handleDragStart(evt, sortableInst) {
            const dragKey = evt?.item?.dataset?.key;
            const sourceParentKey = this.getContainerParentKey(evt?.from);
            const sourceList = this.getListByParentKey(sourceParentKey) || [];
            const sourceIndex = evt?.oldIndex ?? sourceList.findIndex(item => this.getNodeKey(item) === String(dragKey));
            const dragTreeItem = this.getItemByKey(dragKey);
            if (!runOptional(this.beforeDrag, { dragItem: dragTreeItem, sourceParentKey, sourceIndex })) {
                const inst = sortableInst || (evt?.from && Sortable.get(evt.from));
                if (inst && typeof inst._onDrop === 'function') inst._onDrop(evt?.originalEvent || evt);
                return;
            }
            this.activeSortable = sortableInst || (evt?.from && Sortable.get(evt.from)) || null;
            this.attachPointerTracking();
            this.dragState = {
                active: true,
                draggingKey: String(dragKey || ''),
                sourceParentKey,
                sourceIndex,
                hoverKey: '',
                dropItem: null,
                dropType: 'none',
                resolvedParentKey: sourceParentKey,
                resolvedIndex: sourceIndex,
                allowed: false,
            };
        },
        resolveDropState(evt) {
            const dragKey = this.dragState.draggingKey;
            const dragItem = this.getItemByKey(dragKey);
            if (!dragItem) return this.createEmptyDragState();

            const pt = this.getClientPoint(evt);
            if (!pt) {
                return {
                    ...this.createEmptyDragState(),
                    active: true,
                    draggingKey: dragKey,
                    sourceParentKey: this.dragState.sourceParentKey,
                    sourceIndex: this.dragState.sourceIndex,
                    allowed: false,
                };
            }

            const pointerTarget = document.elementFromPoint(pt.x, pt.y);
            const nodeEl = this.getClosestNodeEl(pointerTarget);
            const fromParent = this.dragState.sourceParentKey === '__root__' ? null : this.getItemByKey(this.dragState.sourceParentKey);

            let nextState = {
                ...this.createEmptyDragState(),
                active: true,
                draggingKey: dragKey,
                sourceParentKey: this.dragState.sourceParentKey,
                sourceIndex: this.dragState.sourceIndex,
            };

            if (nodeEl) {
                const hoverKey = String(nodeEl.dataset.key || '');
                const hoverItem = this.getItemByKey(hoverKey);
                const contentEl = nodeEl.querySelector('._fd-tree-node__content') || nodeEl;
                const rect = contentEl.getBoundingClientRect();
                const offsetY = pt.y - rect.top;
                const quarter = rect.height * 0.25;
                let dropType = offsetY <= quarter ? 'before' : offsetY >= rect.height - quarter ? 'after' : 'inner';
                let innerPrepend = false;

                if (dropType === 'inner' && !this.canDropInner(hoverItem)) {
                    dropType = offsetY < rect.height / 2 ? 'before' : 'after';
                }
                if (
                    dropType === 'after' &&
                    hoverItem &&
                    (this.getChildren(hoverItem) || []).length > 0 &&
                    this.expandedKeys?.has?.(this.getKey(hoverItem)) &&
                    this.canDropInner(hoverItem)
                ) {
                    dropType = 'inner';
                    innerPrepend = true;
                }

                let resolvedParentKey = '__root__';
                let resolvedIndex = 0;
                if (dropType === 'inner') {
                    resolvedParentKey = hoverKey;
                    const children = this.getChildren(hoverItem);
                    resolvedIndex = innerPrepend ? 0 : Array.isArray(children) ? children.length : 0;
                } else {
                    const container = nodeEl.closest('[data-parent-key]');
                    resolvedParentKey = this.getParentKeyByEl(container);
                    const siblings = this.getListByParentKey(resolvedParentKey) || [];
                    const targetIndex = this.getIndexInList(siblings, hoverItem);
                    resolvedIndex = targetIndex + (dropType === 'after' ? 1 : 0);
                }

                nextState.hoverKey = hoverKey;
                nextState.dropItem = hoverItem;
                nextState.dropType = dropType;
                nextState.resolvedParentKey = resolvedParentKey;
                nextState.resolvedIndex = resolvedIndex;
            } else {
                const container = pointerTarget?.closest?.('[data-parent-key]');
                const resolvedParentKey = this.getParentKeyByEl(container);
                const targetList = this.getListByParentKey(resolvedParentKey) || [];
                nextState.hoverKey = '';
                nextState.dropItem = null;
                nextState.dropType = resolvedParentKey === '__root__' ? 'after' : 'inner';
                nextState.resolvedParentKey = resolvedParentKey;
                nextState.resolvedIndex = targetList.length;
            }

            if (nextState.hoverKey === dragKey && nextState.dropType !== 'inner') {
                nextState.allowed = false;
                return nextState;
            }

            if (
                (nextState.dropType === 'inner' &&
                    (nextState.resolvedParentKey === dragKey || this.isDescendantKey(dragKey, nextState.resolvedParentKey))) ||
                (nextState.dropItem && this.isDescendantKey(dragKey, this.getNodeKey(nextState.dropItem)))
            ) {
                nextState.allowed = false;
                return nextState;
            }

            const standardPayload = this.standardizeCanDrop({
                dragItem,
                dropItem: nextState.dropItem,
                dropType: nextState.dropType,
                resolvedParentKey: nextState.resolvedParentKey,
                resolvedIndex: nextState.resolvedIndex,
                sourceParentKey: nextState.sourceParentKey,
                fromParent,
            });
            nextState.allowed = runOptional(this.canDrop, standardPayload);
            return nextState;
        },
        handleDragMove(evt) {
            if (!this.dragState.active || !evt?.originalEvent) return;
            const next = this.resolveDropState(evt);
            if (next.dropType === 'inner' && next.hoverKey && next.allowed !== false) {
                this.ensureExpandedForInnerDrop(next.hoverKey);
            }
            const prev = this.dragState;
            if (
                prev.hoverKey === next.hoverKey &&
                prev.dropType === next.dropType &&
                prev.resolvedParentKey === next.resolvedParentKey &&
                prev.resolvedIndex === next.resolvedIndex &&
                prev.allowed === next.allowed
            ) {
                return;
            }
            this.dragState = next;
        },
        emitDropFromState(state) {
            const dragItem = this.getItemByKey(state.draggingKey);
            if (!dragItem) return false;
            const fromParent = state.sourceParentKey === '__root__' ? null : this.getItemByKey(state.sourceParentKey);

            const dropPayload = this.standardizeCanDrop({
                dragItem,
                dropItem: state.dropItem,
                dropType: state.dropType,
                resolvedParentKey: state.resolvedParentKey,
                resolvedIndex: state.resolvedIndex,
                sourceParentKey: state.sourceParentKey,
                fromParent,
            });
            if (!runOptional(this.beforeDrop, dropPayload)) return false;

            this.$emit('drop', {
                ...dropPayload,
                fromIndex: state.sourceIndex,
            });
            return true;
        },
        handleDragEnd() {
            if (this.cancelingDrag) {
                this.cancelingDrag = false;
                this.cleanupDragState();
                return;
            }
            const state = { ...this.dragState };
            if (state.active && state.allowed !== false && state.resolvedIndex > -1 && state.dropType !== 'none') {
                this.emitDropFromState(state);
            }
            this.cleanupDragState();
        },
    },
};
</script>

<style scoped>
._fd-tree__search :deep(.ant-input-affix-wrapper) {
    margin-bottom: 8px;
}

._fd-tree__list {
    list-style: none;
    padding: 0;
    margin: 0;
}

._fd-tree__drop-line {
    height: 2px;
    background: #2e73ff;
    margin-left: 18px;
    border-radius: 1px;
}
</style>
