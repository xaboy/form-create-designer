<template>
    <div class="_fd-table-view" :class="{'is-mini': mini}">
        <table border="1" cellspacing="0" cellpadding="0" :style="tableColor" @mouseleave="mouseup" @mouseup="mouseup">
            <template v-for="(_,pid) in rule.row">
                <tr :key="pid">
                    <template v-for="(_, idx) in rule.col">
                        <td v-if="lattice[pid][idx].show" :key="`${pid}${idx}`" :ref="`td_${pid}:${idx}`"
                            class="_fd-table-view-cell"
                            v-bind="lattice[pid][idx] ? {colspan:lattice[pid][idx].colspan, rowspan:lattice[pid][idx].rowspan} : {}"
                            :style="[tableColor, (style && style[`${pid}:${idx}`]) || {}]"
                            :class="[(rule.class && rule.class[`${pid}:${idx}`]) || '', {selected: selection.indexOf(`${pid}:${idx}`) > -1}]"
                            @contextmenu="contextmenu($event, {pid, idx})"
                            @mousedown="mousedown($event, {pid, idx})"
                            @mousemove="mousemove($event, {pid, idx})"
                            @dblclick="dblclick($event, {pid, idx})">
                            <div class="_fd-table-row-handle" v-if="pid !== rule.row - 1"
                                 @mousedown="rowResize($event, {pid, idx})"></div>
                            <div class="_fd-table-col-handle" v-if="idx !== rule.col - 1"
                                 @mousedown="colResize($event, {pid, idx})"></div>
                            <DragTool :drag-btn="false" :handle-btn="true" @active="active({pid, idx})"
                                      :unique="lattice[pid][idx].id">
                                <DragBox v-bind="dragProp" @add="e=>dragAdd(e, {pid, idx})"
                                         :ref="'drag' + pid + idx"
                                         @end="e=>dragEnd(e, {pid, idx})" @start="e=>dragStart(e)"
                                         @unchoose="e=>dragUnchoose(e)"
                                         :list="getSlotChildren([`${pid}:${idx}`, ...lattice[pid][idx].slot])">
                                    <slot :name="`${pid}:${idx}`"></slot>
                                </DragBox>
                                <template #handle>
                                    <div class="_fd-drag-btn _fd-table-view-btn"
                                         @click.stop="addRow({pid,idx,data: lattice[pid][idx]}, 0)">
                                        <i class="fc-icon icon-add-col"></i>
                                    </div>
                                    <div class="_fd-drag-btn _fd-table-view-btn"
                                         @click.stop="addCol({pid,idx,data: lattice[pid][idx]}, 0)">
                                        <i class="fc-icon icon-add-col"
                                           style="transform: rotate(90deg);"></i>
                                    </div>
                                    <div class="_fd-drag-btn _fd-table-view-btn" @click.stop>
                                        <el-dropdown trigger="click" @command="command">
                                            <i class="fc-icon icon-setting"></i>
                                            <template #dropdown>
                                                <el-dropdown-menu>
                                                    <el-dropdown-item
                                                        :command="['addCol', [{pid,idx,data: lattice[pid][idx]}, 1]]">
                                                        {{ t('tableOptions.addLeft') }}
                                                    </el-dropdown-item>
                                                    <el-dropdown-item
                                                        :command="['addCol', [{pid,idx,data: lattice[pid][idx]}, 0]]">
                                                        {{ t('tableOptions.addRight') }}
                                                    </el-dropdown-item>
                                                    <el-dropdown-item
                                                        :command="['addRow', [{pid,idx,data: lattice[pid][idx]}, 1]]">
                                                        {{ t('tableOptions.addTop') }}
                                                    </el-dropdown-item>
                                                    <el-dropdown-item
                                                        :command="['addRow', [{pid,idx,data: lattice[pid][idx]}, 0]]">
                                                        {{ t('tableOptions.addBottom') }}
                                                    </el-dropdown-item>
                                                    <el-dropdown-item divided :disabled="lattice[pid][idx].right"
                                                                      :command="['mergeRight', [{pid,idx,data: lattice[pid][idx]}]]">
                                                        {{ t('tableOptions.mergeRight') }}
                                                    </el-dropdown-item>
                                                    <el-dropdown-item :disabled="lattice[pid][idx].bottom"
                                                                      :command="['mergeBottom', [{pid,idx,data: lattice[pid][idx]}]]">
                                                        {{ t('tableOptions.mergeBottom') }}
                                                    </el-dropdown-item>
                                                    <el-dropdown-item divided
                                                                      :disabled="!(lattice[pid][idx].layout && lattice[pid][idx].layout.col > 1)"
                                                                      :command="['splitCol', [{pid,idx,data: lattice[pid][idx]}]]">
                                                        {{ t('tableOptions.splitCol') }}
                                                    </el-dropdown-item>
                                                    <el-dropdown-item
                                                        :disabled="!(lattice[pid][idx].layout && lattice[pid][idx].layout.row > 1)"
                                                        :command="['splitRow', [{pid,idx,data: lattice[pid][idx]}]]">
                                                        {{ t('tableOptions.splitRow') }}
                                                    </el-dropdown-item>
                                                    <el-dropdown-item divided :disabled="rule.col < 2"
                                                                      :command="['rmCol', [{pid,idx,data: lattice[pid][idx]}]]">
                                                        {{ t('tableOptions.rmCol') }}
                                                    </el-dropdown-item>
                                                    <el-dropdown-item :disabled="rule.row < 2"
                                                                      :command="['rmRow', [{pid,idx,data: lattice[pid][idx]}]]">
                                                        {{ t('tableOptions.rmRow') }}
                                                    </el-dropdown-item>
                                                </el-dropdown-menu>
                                            </template>
                                        </el-dropdown>
                                    </div>

                                </template>
                            </DragTool>
                        </td>
                    </template>
                </tr>
            </template>
        </table>
        <div class="_fd-table-context-menu" v-if="visible" :style="menuPos">
            <div class="_fd-table-context-menuitem" @click.stop="selectionStyle">{{ t('props.style') }}</div>
            <div class="_fd-table-context-menuitem" @click.stop="rmSelectionContent">{{ t('props.clear') }}</div>
            <div class="_fd-table-context-menu-separator"></div>
            <div class="_fd-table-context-menuitem" @click.stop="mergeSelection(false)">{{
                    t('tableOptions.batchMerge')
                }}
            </div>
            <div class="_fd-table-context-menuitem" @click.stop="mergeSelection(true)">{{
                    t('tableOptions.batchSplit')
                }}
            </div>
            <div class="_fd-table-context-menuitem"
                 @click.stop="addCol({pid: selectionPos.startRow, idx: selectionPos.startCol}, 1)">
                {{ t('tableOptions.addLeft') }}
            </div>
            <div class="_fd-table-context-menuitem"
                 @click.stop="addCol({pid: selectionPos.startRow, idx: selectionPos.endCol}, 0)">
                {{ t('tableOptions.addRight') }}
            </div>
            <div class="_fd-table-context-menuitem"
                 @click.stop="addRow({pid: selectionPos.startRow, idx: selectionPos.startCol}, 1)">
                {{ t('tableOptions.addTop') }}
            </div>
            <div class="_fd-table-context-menuitem"
                 @click.stop="addRow({pid: selectionPos.startRow, idx: selectionPos.endCol}, 0)">
                {{ t('tableOptions.addBottom') }}
            </div>
            <div class="_fd-table-context-menu-separator"></div>
            <div class="_fd-table-context-menuitem" @click.stop="rmSelectionRow">{{
                    t('tableOptions.batchRmRow')
                }}
            </div>
            <div class="_fd-table-context-menuitem" @click.stop="rmSelectionCol">{{
                    t('tableOptions.batchRmCol')
                }}
            </div>
        </div>
    </div>
</template>

<script>

import DragTool from '../DragTool.vue';
import DragBox from '../DragBox.vue';
import {defineComponent} from 'vue';
import uniqueId from '@form-create/utils/lib/unique';


export default defineComponent({
    name: 'FcTableView',
    props: {
        mini: Boolean,
        label: String,
        width: [Number, String],
        formCreateInject: Object,
        border: {
            type: Boolean,
            default: true
        },
        borderWidth: String,
        borderColor: String,
        rule: {
            type: Object,
            default: () => ({row: 1, col: 1})
        },
    },
    inject: ['designer'],
    components: {
        DragTool,
        DragBox,
    },
    watch: {
        rule: {
            handler() {
                this.initRule();
                this.style = this.rule.style;
            },
            immediate: true,
        }
    },
    data() {
        return {
            unique: {},
            style: {},
            selection: [],
            selectionPos: null,
            visible: false,
            resize: {
                isResizing: false,
                startX: 0,
                startY: 0,
                startWidth: 0,
                startHeight: 0,
            },
            menuPos: {
                left: 0,
                top: 0,
            },
            isSelecting: null,
            oldSelection: null,
            dragProp: {
                rule: {
                    props: {
                        tag: 'el-col',
                    },
                    attrs: {
                        group: {
                            name: 'default',
                            put: (to, ...args) => {
                                to.el.__rule__ = this.formCreateInject.rule;
                                return this.designer.dragPut(to, ...args);
                            }
                        },
                        ghostClass: 'ghost',
                        animation: 150,
                        handle: '._fd-drag-btn',
                        emptyInsertThreshold: 0,
                        direction: 'vertical',
                        itemKey: 'type',
                    }
                },
                tag: 'tableCell',
            },
            lattice: {},
            uni: {},

        };
    },
    computed: {
        t() {
            return this.designer.t;
        },
        tableColor() {
            const border = {};
            if (this.border === false) {
                border['border'] = '0 none';
            } else {
                if (this.borderColor) {
                    border['borderColor'] = this.borderColor;
                }
                if (this.borderWidth) {
                    border['borderWidth'] = this.borderWidth;
                }
            }
            return border;
        },
    },
    methods: {
        contextmenu(e) {
            e.preventDefault();
            e.stopPropagation();
            if (this.selectionPos) {
                this.menuPos = {
                    left: `${e.clientX}px`,
                    top: `${e.clientY}px`,
                };
                this.visible = true;
            }
        },
        rowResize(e, {pid, idx}) {
            e.preventDefault();
            e.stopPropagation();
            let height;
            let key = `${this.lattice[pid][idx].startRow || pid}:${this.lattice[pid][idx].startCol || 0}`;
            if (!this.$refs[`td_${key}`] || this.lattice[pid][idx].colspan > 1 || this.lattice[pid][idx].rowspan > 1) {
                key = `${pid}:${idx}`;
            }
            const currentResizeElement = this.$refs[`td_${key}`][0].parentElement;
            const style = this.rule.style[key] || {};

            const doRowResize = (e) => {
                if (!this.resize.isResizing) return;

                const dy = e.clientY - this.resize.startY;
                const newHeight = this.resize.startHeight + dy;
                if (newHeight > 20) {
                    currentResizeElement.style.height = `${newHeight}px`;
                    height = newHeight
                }
            }

            const stopResize = () => {
                if (!this.resize.isResizing) return;

                this.resize.isResizing = false;

                style.height = `${height}px`;

                this.rule.style[key] = style;

                document.removeEventListener('mousemove', doRowResize);
                document.removeEventListener('mouseup', stopResize);
            }
            this.resize.isResizing = true;
            this.resize.startY = e.clientY;
            this.resize.startHeight = currentResizeElement.offsetHeight;
            if (style.height) {
                currentResizeElement.style.height = style.height;
                delete style.height;
            }

            document.addEventListener('mousemove', doRowResize);
            document.addEventListener('mouseup', stopResize);
        },
        colResize(e, {pid, idx}) {
            e.preventDefault();
            e.stopPropagation();
            let width;
            let key = `${this.lattice[pid][idx].startRow || 0}:${this.lattice[pid][idx].startCol || idx}`;
            if (!this.$refs[`td_${key}`] || this.lattice[pid][idx].colspan > 1 || this.lattice[pid][idx].rowspan > 1) {
                key = `${pid}:${idx}`;
            }
            const currentResizeElement = this.$refs[`td_${key}`][0];
            const style = this.rule.style[key] || {};

            const doRowResize = (e) => {
                if (!this.resize.isResizing) return;

                const dy = e.clientX - this.resize.startX;
                const newWidth = this.resize.startWidth + dy;
                if (newWidth > 20) {
                    currentResizeElement.style.width = `${newWidth}px`;
                    width = newWidth
                }
            }

            const stopResize = () => {
                if (!this.resize.isResizing) return;

                this.resize.isResizing = false;

                style.width = `${width}px`;

                this.rule.style[key] = style;

                document.removeEventListener('mousemove', doRowResize);
                document.removeEventListener('mouseup', stopResize);
            }
            this.resize.isResizing = true;
            this.resize.startX = e.clientX;
            this.resize.startWidth = currentResizeElement.offsetWidth;

            document.addEventListener('mousemove', doRowResize);
            document.addEventListener('mouseup', stopResize);
        },
        mousedown(e, {pid, idx}) {
            if (e.button === 0 && !e.target.classList.contains('icon-move') && !e.target.classList.contains('_fd-table-row-handle') && !e.target.classList.contains('_fd-table-col-handle')) {
                e.stopPropagation();
                e.preventDefault();
                if (this.visible) {
                    this.visible = false;
                } else {
                    this.isSelecting = {pid, idx};
                    this.updateSelection({pid, idx});
                }
            }
        },
        mousemove(e, {pid, idx}) {
            if (this.isSelecting) {
                e.stopPropagation();
                if (!this.oldSelection || this.oldSelection.pid !== pid || this.oldSelection.idx !== idx) {
                    this.updateSelection({pid, idx});
                    this.oldSelection = {pid, idx};
                }
            }
        },
        mouseup() {
            this.isSelecting = null;
        },
        dblclick(e, {pid, idx}) {
            let flag = false;
            this.formCreateInject.children.forEach(child => {
                flag = flag || (child && child.slot === `${pid}:${idx}`);
            });
            if (!flag) {
                const designer = this.designer;
                designer.dragMenu({
                    menu: designer.dragRuleList.text,
                    children: this.formCreateInject.children,
                    index: this.formCreateInject.children.length,
                    slot: `${pid}:${idx}`,
                })
            }
        },
        updateSelection({pid, idx}) {
            const selection = this.selectionRect(this.isSelecting, {pid, idx});
            const {startRow, startCol, endRow, endCol} = this.getSelectionPos({
                startRow: selection[0].pid,
                startCol: selection[0].idx,
                endRow: selection[selection.length - 1].pid,
                endCol: selection[selection.length - 1].idx,
                selection
            })
            this.selectionPos = {startRow, startCol, endRow, endCol};
            this.selection = this.selectionRect({pid: startRow, idx: startCol}, {
                pid: endRow,
                idx: endCol
            }, true);
        },
        getSelectionPos(data) {
            let {startRow, startCol, endRow, endCol} = data;
            const selection = data.selection || this.selectionRect({pid: startRow, idx: startCol}, {
                pid: endRow,
                idx: endCol
            });
            selection.forEach(item => {
                const cell = this.lattice[item.pid][item.idx];
                if (!cell.show) {
                    const startCell = this.lattice[cell.startRow][cell.startCol];
                    startRow = Math.min(startRow, cell.startRow);
                    startCol = Math.min(startCol, cell.startCol);
                    endRow = Math.max(endRow, cell.startRow + startCell.rowspan - 1);
                    endCol = Math.max(endCol, cell.startCol + startCell.colspan - 1);
                } else {
                    if (cell.rowspan > 1) {
                        endRow = Math.max(endRow, item.pid + cell.rowspan - 1);
                    }
                    if (cell.colspan > 1) {
                        endCol = Math.max(endCol, item.idx + cell.colspan - 1);
                    }
                }
            });
            if (data.startRow !== startRow || data.endRow !== endRow || data.startCol !== startCol || data.endCol !== endCol) {
                return this.getSelectionPos({startRow, startCol, endRow, endCol});
            }
            return {startRow, startCol, endRow, endCol};
        },
        selectionRect(start, end, flag) {
            const startRow = start.pid;
            const startCol = start.idx;
            const endRow = end.pid;
            const endCol = end.idx;

            const minRow = Math.min(startRow, endRow);
            const maxRow = Math.max(startRow, endRow);
            const minCol = Math.min(startCol, endCol);
            const maxCol = Math.max(startCol, endCol);
            const selection = [];

            for (let i = minRow; i <= maxRow; i++) {
                for (let j = minCol; j <= maxCol; j++) {
                    selection.push(flag ? `${i}:${j}` : {pid: i, idx: j});
                }
            }
            return selection;
        },
        clearSelection() {
            this.isSelecting = null;
            this.oldSelection = null;
            this.selection = [];
            this.selectionPos = null;
        },
        getUnique(key) {
            if (!this.unique[key]) {
                this.unique[key] = uniqueId();
            }
            return this.unique[key];
        },
        getSlotChildren(slots) {
            const children = [];
            this.formCreateInject.children.forEach(child => {
                if (slots.indexOf(child.slot) > -1) {
                    children.push(child);
                }
            });
            return children;
        },
        dragAdd(e, item) {
            // console.log('dragAdd');
            const designer = this.designer;
            const children = this.formCreateInject.children;
            const slot = `${item.pid}:${item.idx}`;
            const rule = e.item._underlying_vm_ || e.item.__rule__;
            const flag = designer.addRule && designer.addRule.children === designer.moveRule;
            if (flag) {
                designer.moveRule.splice(designer.moveRule.indexOf(rule), 1);
            }
            let idx = 0;
            const refKey = 'drag' + item.pid + item.idx;
            if (this.$refs[refKey][0].list.length) {
                let beforeRule = this.$refs[refKey][0].list[!e.newIndex ? 0 : e.newIndex - 1];
                idx = children.indexOf(beforeRule) + (e.newIndex ? 1 : 0);
            } else if (children.length) {
                const dragSlotKeys = Object.keys(this.$refs);
                for (let i = dragSlotKeys.indexOf(refKey) - 1; i >= 0; i--) {
                    if (!this.$refs[dragSlotKeys[i]] || !this.$refs[dragSlotKeys[i]].length) {
                        continue;
                    }
                    const list = this.$refs[dragSlotKeys[i]][0].list || [];
                    if (list.length) {
                        idx = children.indexOf(list[list.length - 1]) + 1;
                        break;
                    }
                }
            }
            e.newIndex = idx;
            if (flag) {
                rule.slot = slot;
                children.splice(e.newIndex, 0, rule);
                designer.added = true;
                designer.handleSortAfter({rule});
            } else {
                designer.dragAdd(children, e, `${item.pid}:${item.idx}`);
            }
        },
        dragEnd(e, item) {
            // console.log('dragEnd');
            const designer = this.designer;
            const children = this.formCreateInject.children;
            const rule = e.item._underlying_vm_;
            const oldIdx = children.indexOf(rule);
            e.newIndex = oldIdx + (e.newIndex - e.oldIndex);
            e.oldIndex = oldIdx;
            designer.dragEnd(this.formCreateInject.children, e, `${item.pid}:${item.idx}`);
        },
        dragStart() {
            // console.log('dragStart');
            this.designer.dragStart(this.formCreateInject.children);
        },
        dragUnchoose(e) {
            // console.log('dragUnchoose');
            this.designer.dragUnchoose(this.formCreateInject.children, e);
        },
        initRule() {
            const rule = this.rule;
            if (!rule.style) {
                rule.style = {};
            }
            if (!rule.class) {
                rule.class = {};
            }
            if (!rule.layout) {
                rule.layout = [];
            }
            if (!rule.row) {
                rule.row = 1;
            }
            if (!rule.col) {
                rule.col = 1;
            }
        },
        active(item) {
            const key = `${item.pid}:${item.idx}`;
            this.designer.customActive({
                name: 'fcTableGrid',
                onPaste: (rule) => {
                    rule.slot = key;
                    this.formCreateInject.children.push(rule);
                },
                style: {
                    formData: {
                        style: this.rule.style[key] || {},
                        class: this.rule.class[key] || '',
                    },
                    change: (field, value) => {
                        if (!value || Object.keys(value).length === 0) {
                            this.$delete(this.rule[field], key);
                            delete this.rule[field][key];
                        } else {
                            this.$set(this.rule[field], key, value);
                        }
                    },
                }
            });
        },
        command(type) {
            this[type[0]](...type[1]);
        },
        rmSlot(slot, rmSlot) {
            const slotKey = Object.keys(slot);
            const children = this.formCreateInject.children;
            let del = 0;
            [...children].forEach((child, index) => {
                if (!child.slot) {
                    return;
                }
                let idx;
                if (rmSlot.indexOf(child.slot) > -1) {
                    children.splice(index - del, 1);
                    del++;
                } else if (((idx = slotKey.indexOf(child.slot)) > -1)) {
                    child.slot = slot[slotKey[idx]];
                }
            });
            rmSlot.forEach(v => {
                delete this.style[v];
            });
            this.loadRule();
        },
        rmRow(row) {
            this.clearSelection();
            this.rule.row--;
            const slot = {};
            const rmSlot = [];
            for (let index = row.pid; index < this.rule.row + 1; index++) {
                for (let idx = 0; idx < this.rule.col; idx++) {
                    if (index === row.pid) {
                        rmSlot.push(`${row.pid}:${idx}`);
                    } else {
                        slot[`${index}:${idx}`] = `${index - 1}:${idx}`;
                    }
                }
            }
            let del = 0;
            const layout = this.rule.layout;
            [...layout].forEach((v, i) => {
                if (v.top === row.pid) {
                    layout.splice(i - del, 1);
                    del++;
                }
            });
            layout.forEach(v => {
                if (v.top > row.pid) {
                    v.top--;
                }
            });
            this.rmSlot(slot, rmSlot);
        },
        rmCol(row) {
            this.clearSelection();
            this.rule.col--;
            const slot = {};
            const rmSlot = [];
            for (let index = 0; index < this.rule.row; index++) {
                for (let idx = row.idx + 1; idx < this.rule.col + 1; idx++) {
                    slot[`${index}:${idx}`] = `${index}:${idx - 1}`;
                }
                rmSlot.push(`${index}:${row.idx}`);
            }
            let del = 0;
            const layout = this.rule.layout;
            [...layout].forEach((v, i) => {
                if (v.left === row.idx) {
                    layout.splice(i - del, 1);
                    del++;
                }
            });
            layout.forEach(v => {
                if (v.left > row.idx) {
                    v.left--;
                }
            });
            this.rmSlot(slot, rmSlot);
        },
        splitRow(item) {
            this.clearSelection();
            const layout = item.data.layout;
            const row = layout.row;
            layout.row = 0;
            if (row > 1) {
                for (let i = 1; i < row; i++) {
                    this.rule.layout.push({
                        ...layout, top: layout.top + i
                    });
                }
            }
            this.loadRule();
        },
        splitCol(item) {
            this.clearSelection();
            const layout = item.data.layout;
            const col = layout.col;
            layout.col = 0;
            if (col > 1) {
                for (let i = 1; i < col; i++) {
                    this.rule.layout.push({
                        ...layout, left: layout.left + i
                    });
                }
            }
            this.loadRule();
        },
        makeMap(layout) {
            let map = [];
            for (let x = layout.top; x < (layout.row || layout.top + 1); x++) {
                for (let y = layout.left; y < (layout.col || layout.left + 1); y++) {
                    map.push(`${x}:${y}`);
                }
            }
            return map;
        },
        rmSelectionContent() {
            this.rmSlot({}, this.selection);
        },
        selectionStyle() {
            const oldStyle = {...this.rule.style[this.selection[0]] || {}};
            const tempStyle = this.selection.reduce((acc, cur) => {
                acc[cur] = {...this.rule.style[cur] || {}};
                return acc;
            }, {})
            this.designer.customActive({
                name: 'fcTableGrid',
                style: {
                    formData: {
                        style: oldStyle,
                        class: this.rule.class[this.selection[0]] || '',
                    },
                    change: (field, value) => {
                        this.selection.forEach(key => {
                            if (!value || Object.keys(value).length === 0) {
                                this.$delete(this.rule[field], key);
                                delete this.rule[field][key];
                            } else if (field === 'style') {
                                const newStyle = {...tempStyle[key]};
                                Object.keys(value).forEach(k => {
                                    if (value[k] !== oldStyle[k]) {
                                        newStyle[k] = value[k];
                                    }
                                });
                                this.$set(this.rule[field], key, newStyle);
                            } else {
                                this.$set(this.rule[field], key, value);
                            }
                        })
                    },
                }
            });
        },
        rmSelectionCol() {
            const len = this.selectionPos.endCol - this.selectionPos.startCol + 1;
            const slot = {};
            for (let index = 0; index < this.rule.row; index++) {
                for (let idx = this.selectionPos.endCol + 1; idx < this.rule.col; idx++) {
                    slot[`${index}:${idx}`] = `${index}:${idx - len}`;
                }
            }
            const layout = this.filterSelectionLayout();
            layout.forEach(v => {
                if (v.left > this.selectionPos.startCol) {
                    v.left -= len;
                }
            });
            this.$set(this.rule, 'layout', layout);
            if (this.rule.col - len <= 0) {
                this.formCreateInject.children.splice(0, this.formCreateInject.children.length);
            } else {
                this.rmSlot(slot, this.selectionRect({pid: 0, idx: this.selectionPos.startCol}, {
                    pid: this.rule.row,
                    idx: this.selectionPos.endCol
                }, true));
            }
            this.$set(this.rule, 'col', Math.max(1, this.rule.col - len));
            this.clearSelection();
        },
        rmSelectionRow() {
            const len = this.selectionPos.endRow - this.selectionPos.startRow + 1;
            const slot = {};
            for (let index = this.selectionPos.endRow + 1; index < this.rule.row; index++) {
                for (let idx = 0; idx < this.rule.col; idx++) {
                    slot[`${index}:${idx}`] = `${index - len}:${idx}`;
                }
            }
            const layout = this.filterSelectionLayout();
            layout.forEach(v => {
                if (v.top > this.selectionPos.startRow) {
                    v.top -= len;
                }
            });
            this.rule.layout = layout;
            this.$set(this.rule, 'layout', layout);
            if (this.rule.row - len <= 0) {
                this.formCreateInject.children.splice(0, this.formCreateInject.children.length);
            } else {
                this.rmSlot(slot, this.selectionRect({
                    pid: this.selectionPos.startRow,
                    idx: 0
                }, {pid: this.selectionPos.endRow, idx: this.rule.col}, true));
            }
            this.$set(this.rule, 'row', Math.max(1, this.rule.row - len));
            this.clearSelection();
        },
        filterSelectionLayout() {
            return (this.rule.layout || []).filter(item => {
                return (item.top < this.selectionPos.startRow || item.top > this.selectionPos.endRow)
                    || (item.left < this.selectionPos.startCol || item.left > this.selectionPos.endCol);
            });
        },
        mergeSelection(split) {
            const layout = this.filterSelectionLayout();
            if (!split) {
                layout.push({
                    top: this.selectionPos.startRow,
                    left: this.selectionPos.startCol,
                    row: this.selectionPos.endRow - this.selectionPos.startRow + 1,
                    col: this.selectionPos.endCol - this.selectionPos.startCol + 1,
                })
                const slot = {};
                for (let index = this.selectionPos.startRow; index <= this.selectionPos.endRow; index++) {
                    for (let idx = this.selectionPos.startCol; idx <= this.selectionPos.endCol; idx++) {
                        slot[`${index}:${idx}`] = `${this.selectionPos.startRow}:${this.selectionPos.startCol}`;
                    }
                }
                this.rmSlot(slot, []);
            }
            this.rule.layout = layout;
            this.loadRule();
        },
        mergeRight(item) {
            this.clearSelection();
            let layout;
            if (item.data.layout) {
                const col = (item.data.layout.col || 1) + 1;
                item.data.layout.col = (col + item.idx) > this.rule.col ? this.rule.col - item.idx : col;
                layout = item.data.layout;
            } else {
                layout = {
                    top: item.pid,
                    left: item.idx,
                    col: 2,
                };
                this.rule.layout.push(layout);
            }
            const map = this.makeMap(layout);
            this.formCreateInject.children.forEach(child => {
                if (!child.slot) return;
                if (map.indexOf(child.slot) > -1) {
                    child.slot = `${item.pid}:${item.idx}`;
                }
            });
            this.loadRule();
        },
        mergeBottom(item) {
            this.clearSelection();
            let layout;
            if (item.data.layout) {
                const row = (item.data.layout.row || 1) + 1;
                item.data.layout.row = (row + row.pid) > this.rule.col ? this.rule.col - item.pid : row;
                layout = item.data.layout;
            } else {
                layout = {
                    top: item.pid,
                    left: item.idx,
                    row: 2,
                };
                this.rule.layout.push(layout);
            }
            const map = this.makeMap(layout);
            this.formCreateInject.children.forEach(child => {
                if (!child.slot) return;
                if (map.indexOf(child.slot) > -1) {
                    child.slot = `${item.pid}:${item.idx}`;
                }
            });
            this.loadRule();
        },
        addCol(row, type) {
            this.clearSelection();
            this.rule.col++;
            this.rule.layout.forEach(v => {
                if (v.left > (type ? row.idx - 1 : row.idx)) {
                    v.left++;
                }
            });
            if (type || row.idx < this.rule.col - 2) {
                const slot = {};
                for (let index = 0; index < this.rule.row; index++) {
                    for (let idx = type ? row.idx - 1 : row.idx + 1; idx < this.rule.col - 1; idx++) {
                        slot[`${index}:${idx}`] = `${index}:${idx + 1}`;
                    }
                }
                const slotKey = Object.keys(slot);
                this.formCreateInject.children.forEach(child => {
                    let idx;
                    if (child.slot && ((idx = slotKey.indexOf(child.slot)) > -1)) {
                        child.slot = slot[slotKey[idx]];
                    }
                });
                slotKey.forEach(v => {
                    if (this.style[v]) {
                        this.style[slot[v]] = this.style[v];
                        delete this.style[v];
                    }
                });
            }
            this.loadRule();
        },
        addRow(row, type) {
            this.clearSelection();
            this.rule.row++;
            this.rule.layout.forEach(v => {
                if (v.top > (type ? row.pid - 1 : row.pid)) {
                    v.top++;
                }
            });
            if (type || row.pid < this.rule.row - 2) {
                const slot = {};
                for (let index = type ? row.pid - 1 : row.pid + 1; index < this.rule.row; index++) {
                    for (let idx = 0; idx < this.rule.col; idx++) {
                        slot[`${index}:${idx}`] = `${index + 1}:${idx}`;
                    }
                }
                const slotKey = Object.keys(slot);
                this.formCreateInject.children.forEach(child => {
                    let idx;
                    if (child.slot && ((idx = slotKey.indexOf(child.slot)) > -1)) {
                        child.slot = slot[slotKey[idx]];
                    }
                });
                slotKey.reverse().forEach(v => {
                    if (this.style[v]) {
                        this.style[slot[v]] = this.style[v];
                        delete this.style[v];
                    }
                });
            }
            this.loadRule();
        },
        loadRule() {
            const lattice = [];
            const rule = this.rule || {row: 1, col: 1};
            for (let index = 0; index < rule.row; index++) {
                const sub = [];
                lattice.push(sub);
                for (let idx = 0; idx < rule.col; idx++) {
                    sub.push({rowspan: 1, colspan: 1, slot: [], show: true, id: this.getUnique(`${index}${idx}`)});
                }
            }
            [...(rule.layout || [])].forEach((v, i) => {
                if (((!v.row || v.row <= 0) && (!v.col || v.col <= 0)) || !lattice[v.top] || !lattice[v.top][v.left] || !lattice[v.top][v.left].show) {
                    rule.layout.splice(i, 1);
                    return;
                }
                const data = lattice[v.top][v.left];
                data.layout = v;
                let col = 1;
                let row = 1;
                if (v.col) {
                    col = (v.col + v.left) > rule.col ? rule.col - v.left : v.col;
                    data.colspan = col;
                }
                if (v.row) {
                    row = (v.row + v.top) > rule.row ? rule.row - v.top : v.row;
                    data.rowspan = row;
                }
                if (row && col) {
                    for (let index = 0; index < row; index++) {
                        const row = lattice[v.top + index];
                        if (row) {
                            for (let idx = 0; idx < col; idx++) {
                                if (!idx && !index)
                                    continue;

                                if (row[v.left + idx]) {
                                    row[v.left + idx].show = false;
                                    row[v.left + idx].startRow = v.top;
                                    row[v.left + idx].startCol = v.left;
                                }
                                data.slot.push(`${v.top + index}:${v.left + idx}`);
                            }
                        }
                    }
                }
            });

            const checkCol = (col) => {
                return !!(!col || col.layout || !col.show);
            };

            lattice.forEach((v, index) => {
                v.forEach((item, idx) => {
                    let right = false;
                    let bottom = false;
                    if (item.layout) {
                        const col = item.layout.col || 1;
                        const row = item.layout.row || 1;
                        for (let i = 0; i < col; i++) {
                            if (!lattice[index + row] || checkCol(lattice[index + row][idx + i])) {
                                bottom = true;
                                continue;
                            }
                        }
                        for (let i = 0; i < row; i++) {
                            if (!lattice[index + i] || checkCol(lattice[index + i][idx + col])) {
                                right = true;
                                continue;
                            }
                        }
                    } else {
                        right = checkCol(v[idx + 1]);
                        bottom = lattice[index + 1] ? checkCol(lattice[index + 1][idx]) : true;
                    }
                    item.right = right;
                    item.bottom = bottom;
                });
            });
            this.lattice = lattice;
            this.formCreateInject.rule.props.rule = rule;
        },
        hideMenu() {
            setTimeout(() => {
                this.visible = false;
            }, 100);
        },
    },
    beforeMount() {
        this.loadRule();
    },
    mounted() {
        document.addEventListener('click', this.hideMenu, true);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.hideMenu, true)
    }
});
</script>

<style>

._fd-table-view {
    overflow: auto;
}

._fd-table-view-cell {
    min-height: 50px;
    height: 100%;
    position: relative;
}

._fd-table-row-handle {
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 100%;
    height: 8px;
    cursor: row-resize;
    z-index: 1;
    background-color: transparent;
}

._fd-table-col-handle {
    position: absolute;
    top: 0;
    right: -4px;
    width: 8px;
    height: 100%;
    cursor: col-resize;
    z-index: 1;
    background-color: transparent;
}

._fd-table-view-cell.selected > ._fd-drag-tool {
    background-color: rgba(46, 115, 255, 0.05);
    outline: 1px solid #2E73FF;
}

._fd-table-view-cell > ._fd-drag-tool {
    height: 100%;
    width: 100%;
    min-width: unset;
    border: 0;
    outline: 0;
    margin: 0;
    max-width: 100%;
    max-height: 100%;
}

._fd-table-view-cell > ._fd-drag-tool > ._fd-tableCell-drag {
    min-height: 80px;
}

._fd-table-view-btn {
    flex-direction: column;
    padding: 0;
}

._fd-table-view-btn .fc-icon {
    width: 18px;
    color: #fff;
    font-size: 16px;
}

._fd-table-view-icon {
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin-top: 1px;
}

._fd-table-view > table {
    width: 100%;
    height: 100%;
    overflow: hidden;
    table-layout: fixed;
    border: 1px solid #EBEEF5;
    border-bottom: 0 none;
    border-right: 0 none;
    border-collapse: collapse;
}

._fd-table-view tr {
    min-height: 50px;
}

._fd-table-view td {
    padding: 0;
    min-height: 50px;
    min-width: 80px;
    position: relative;
    box-sizing: border-box;
    overflow-wrap: break-word;
    white-space: nowrap;
    border: 1px solid #EBEEF5;
}

._fd-tableCell-drag {
    height: 100%;
}

._fd-table-view.is-mini td {
    padding: 0;
    min-height: 12px;
}

._fd-table-view.is-mini .el-form-item {
    padding: 0;
    margin: 0;
}

._fd-table-context-menu {
    position: fixed;
    display: block;
    background-color: white;
    border: 1px solid #ddd;
    z-index: 1905;
    min-width: 120px;
    font-size: 14px;
    box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    padding: 6px 0;
    color: #666666;
}

._fd-table-context-menuitem {
    line-height: 22px;
    padding: 5px 16px;
    cursor: pointer;
}

._fd-table-context-menuitem:hover {
    background-color: #f0f0f0;
}

._fd-table-context-menu-separator {
    height: 1px;
    background-color: #eee;
    margin: 6px 0;
}
</style>
