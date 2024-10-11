<template>
    <div class="_fd-table-view">
        <table border="1" cellspacing="0" cellpadding="0" :style="tableColor">
            <template v-for="(_,pid) in rule.row" :key="pid">
                <tr>
                    <template v-for="(_, idx) in rule.col">
                        <td v-if="lattice[pid][idx].show" :key="`${pid}${idx}`"
                            v-bind="lattice[pid][idx] ? {colspan:lattice[pid][idx].colspan, rowspan:lattice[pid][idx].rowspan} : {}"
                            :style="[tableColor, (style && style[`${pid}:${idx}`]) || {}]"
                            :class="(rule.class && rule.class[`${pid}:${idx}`]) || ''">
                            <div class="_fd-table-view-cell">
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
                                             @click="addRow({pid,idx,data: lattice[pid][idx]}, 0)">
                                            <i class="fc-icon icon-add-tr"></i>
                                        </div>
                                        <div class="_fd-drag-btn _fd-table-view-btn"
                                             @click="addCol({pid,idx,data: lattice[pid][idx]}, 0)">
                                            <i class="fc-icon icon-add-tr"
                                               style="transform: rotate(90deg);"></i>
                                        </div>
                                        <div class="_fd-drag-btn _fd-table-view-btn">
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
                            </div>
                        </td>
                    </template>
                </tr>
            </template>
        </table>
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
            dragProp: {
                rule: {
                    props: {
                        tag: 'el-col',
                        group: 'default',
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
            return this.designer.setupState.t;
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
            const designer = this.designer.setupState;
            const children = this.formCreateInject.children;
            const slot = `${item.pid}:${item.idx}`;
            const rule = e.item._underlying_vm_;
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
            const designer = this.designer.setupState;
            const children = this.formCreateInject.children;
            const rule = e.item._underlying_vm_;
            const oldIdx = children.indexOf(rule);
            e.newIndex = oldIdx + (e.newIndex - e.oldIndex);
            e.oldIndex = oldIdx;
            designer.dragEnd(this.formCreateInject.children, e, `${item.pid}:${item.idx}`);
        },
        dragStart() {
            // console.log('dragStart');
            this.designer.setupState.dragStart(this.formCreateInject.children);
        },
        dragUnchoose(e) {
            // console.log('dragUnchoose');
            this.designer.setupState.dragUnchoose(this.formCreateInject.children, e);
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
            this.designer.setupState.customActive({
                name: 'fcTableGrid',
                style: {
                    formData: {
                        style: this.rule.style[key] || {},
                        class: this.rule.class[key] || '',
                    },
                    change: (field, value) => {
                        this.rule[field][key] = value;
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
        mergeRight(item) {
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
    },
    beforeMount() {
        this.loadRule();
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
    border: 1px inset rgba(0, 0, 0, .1);
    background: #fff;
}

._fd-table-view-cell > ._fd-drag-tool {
    height: 100%;
    border: 0px;
    margin: 0px;
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
}

._fd-table-view tr {
    min-height: 50px;
}

._fd-table-view td {
    padding: 5px;
    min-height: 50px;
    min-width: 80px;
    position: relative;
    box-sizing: border-box;
    overflow-wrap: break-word;
    white-space: nowrap;
    border: 0 none;
    border-right: 1px solid #EBEEF5;
    border-bottom: 1px solid #EBEEF5;
}

._fd-tableCell-drag {
    height: 100%;
}
</style>
