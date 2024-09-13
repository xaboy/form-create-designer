<template>
    <div class="_fd-tree-opt">
        <el-tree
            :data="formValue"
            node-key="index"
            :expand-on-click-node="false">
            <template #default="{ node, data }">
                <div class="_fd-tree-opt-node">
                    <el-input size="mini" class="_fd-tree-opt-first" v-model="data[overColumns.label]"
                              @blur="change"/>
                    <el-input class="_fd-tree-opt-last" v-model="data[overColumns.value]" @blur="change">
                        <template #append>
                            <div class="_fd-tree-opt-btn" @click="add(node, data)">
                                <i class="fc-icon icon-add"></i>
                            </div>
                            <div class="_fd-tree-opt-btn" @click="append(data)">
                                <i class="fc-icon icon-add-child"></i>
                            </div>
                            <div class="_fd-tree-opt-btn _fd-tree-opt-danger" @click="remove(node, data)">
                                <i class="fc-icon icon-delete"></i>
                            </div>
                        </template>
                    </el-input>
                </div>
            </template>
        </el-tree>
    </div>

</template>

<script>

import {defineComponent} from 'vue';
import {deepCopy} from '@form-create/utils/lib/deepextend';

export default defineComponent({
    name: 'TreeOptions',
    emits: ['input'],
    props: {
        value: Array,
        columns: Object,
    },
    inject: ['designer'],
    data() {
        return {
            formValue: [...deepCopy(this.value || [])],
        };
    },
    computed: {
        t() {
            return this.designer.t;
        },
        overColumns() {
            if (!this.columns) {
                return {
                    label: 'label',
                    value: 'value',
                };
            }
            return {
                label: this.columns.label || 'label',
                value: this.columns.value || 'value',
            };
        }
    },
    created() {
        if (!this.formValue.length) {
            this.formValue = [{}];
        }
    },
    methods: {
        tidyValue() {
            return deepCopy(this.formValue);
        },
        change() {
            this.$emit('input', this.tidyValue());
        },
        add(node) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            children.push({});
        },
        append(data) {
            if (!data.children) {
                this.$set(data, 'children', []);
            }
            data.children.push({});
        },
        remove(node, data) {
            const parent = node.parent;
            if (parent.data.children) {
                parent.data.children.splice(parent.data.children.indexOf(data), 1);
                if (!parent.data.children.length) {
                    delete parent.data.children;
                }
            } else {
                parent.data.splice(parent.data.indexOf(data), 1);
            }
            this.change();
        },
    }
});
</script>

<style>
._fd-tree-opt ._fd-tree-opt-btn {
    height: 19px;
    width: 18px;
    color: #fff;
    text-align: center;
    line-height: 20px;
    padding-bottom: 1px;
    float: left;
    cursor: pointer;
    justify-content: center;
    background-color: #2f73ff;
}

._fd-tree-opt-node {
    display: flex;
    align-items: center;
}

._fd-tree-opt-first {
    width: 60px;
    margin-right: 5px;
}

._fd-tree-opt-last {
    width: 110px;
}

._fd-tree-opt .el-table{
    z-index: 1;
}

._fd-tree-opt ._fd-tree-opt-danger {
    background-color: #ff2d2e;
    border-radius: 0 2px 2px 0;
}

._fd-tree-opt .el-tree-node__content {
    margin-bottom: 3px;
    height: 28px;
}

._fd-tree-opt .el-input__inner {
    border-right: 0 none;
    padding: 1px 7px;
}

._fd-tree-opt .el-input-group__append {
    width: 55px;
    padding-right: 2px;
    padding-left: 1px;
    background: #fff;
}
</style>
