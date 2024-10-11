<template>
    <el-col :span="24">
        <div class="_fc-table">
            <table border="1" cellspacing="0" cellpadding="0" :style="tableColor">
                <template v-for="(_,pid) in rule.row" :key="pid">
                    <tr>
                        <template v-for="(_, idx) in rule.col" :key="`${pid}${idx}`">
                            <td v-if="lattice[pid][idx].show"
                                v-bind="lattice[pid][idx] ? {colspan:lattice[pid][idx].colspan, rowspan:lattice[pid][idx].rowspan} : {}"
                                valign="top"
                                :class="(tdClass && tdClass[`${pid}:${idx}`]) || ''"
                                :style="[tableColor, (tdStyle && tdStyle[`${pid}:${idx}`]) || {}]">
                                <slot :name="`${pid}:${idx}`"></slot>
                                <template v-for="slot in lattice[pid][idx].slot">
                                    <slot :name="`${slot}`"></slot>
                                </template>
                            </td>
                        </template>
                    </tr>
                </template>
            </table>
        </div>
    </el-col>
</template>

<script>

export default {
    name: 'FcTable',
    props: {
        label: String,
        width: [Number, String],
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
    watch: {
        rule: {
            handler() {
                this.initRule();
                this.loadRule();
                this.tdStyle = this.rule.style || {};
                this.tdClass = this.rule.class || {};
            },
            immediate: true,
            deep: true,
        }
    },
    data() {
        return {
            tdStyle: {},
            tdClass: {},
            lattice: {},
        };
    },
    computed: {
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
        initRule() {
            const rule = this.rule;
            if (!rule.style) {
                rule.style = {};
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
        loadRule() {
            const lattice = [];
            const rule = this.rule || {row: 1, col: 1};
            for (let index = 0; index < rule.row; index++) {
                const sub = [];
                lattice.push(sub);
                for (let idx = 0; idx < rule.col; idx++) {
                    sub.push({rowspan: 1, colspan: 1, slot: [], show: true});
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
        },
    }
};
</script>

<style>

._fc-table {
    overflow: auto;
}

._fc-table > table {
    width: 100%;
    height: 100%;
    overflow: hidden;
    table-layout: fixed;
    border: 1px solid #EBEEF5;
    border-bottom: 0 none;
    border-right: 0 none;
}

._fc-table tr {
    min-height: 50px;
}

._fc-table td {
    padding: 5px;
    min-height: 50px;
    min-width: 80px;
    position: relative;
    box-sizing: border-box;
    overflow-wrap: break-word;
    /*white-space: nowrap;*/
    overflow: hidden;
    border: 0 none;
    border-right: 1px solid #EBEEF5;
    border-bottom: 1px solid #EBEEF5;
}
</style>
