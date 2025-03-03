<template>
    <div class="_fd-tree-opt">
        <a-form-item-rest>
            <a-tree
                :tree-data="treeData"
                :selectable="false"
                :virtual="false">
                <template #title="node">
                    <div class="_fd-tree-opt-node">
                            <a-input class="_fd-tree-opt-first" size="small"
                                     v-model:value="node.data[overColumns.label]"
                                     @blur="change"/>
                            <ValueInput class="_fd-tree-opt-last" size="small" v-model="node.data[overColumns.value]"
                                     @blur="change" @change-type="change">
                                <template #addonAfter>
                                    <div class="_fd-tree-opt-btn" @click="add(node)">
                                        <i class="fc-icon icon-add"></i>
                                    </div>
                                    <div class="_fd-tree-opt-btn" @click="append(node.data)">
                                        <i class="fc-icon icon-add-child"></i>
                                    </div>
                                    <div class="_fd-tree-opt-btn _fd-tree-opt-danger" @click="remove(node)">
                                        <i class="fc-icon icon-delete"></i>
                                    </div>
                                </template>
                            </ValueInput>
                    </div>
                </template>
            </a-tree>
        </a-form-item-rest>
    </div>

</template>

<script>

import {defineComponent} from 'vue';
import {deepCopy} from '@form-create/utils/lib/deepextend';
import {addParentReference} from '../utils/index';
import ValueInput from './ValueInput.vue';

export default defineComponent({
    name: 'TreeOptions',
    emits: ['update:modelValue'],
    components: {
        ValueInput
    },
    props: {
        modelValue: Array,
        columns: Object,
    },
    inject: ['designer'],
    data() {
        return {
            value: [...deepCopy(this.modelValue || [])],
        };
    },
    computed: {
        t() {
            return this.designer.setupState.t;
        },
        treeData() {
            return addParentReference(this.value || []);
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
            }
        }
    },
    created() {
        if (!this.value.length) {
            this.value = [{}]
        }
    },
    methods: {
        tidyValue() {
            return deepCopy(this.value);
        },
        change() {
            this.$emit('update:modelValue', this.tidyValue());
        },
        add(node) {
            const parent = node.data.$parent;
            if (parent) {
                parent.children.push({});
            } else {
                this.value.push({});
            }
        },
        append(data) {
            if (!data.children) {
                data.children = [];
            }
            data.children.push({});
        },
        remove(node) {
            const parent = node.data.$parent;
            if (parent) {
                parent.children.splice(parent.children.indexOf(node.data), 1);
                if (!parent.children.length) {
                    delete parent.children;
                }
            } else {
                this.value.splice(this.value.indexOf(node.data), 1);
            }
            this.change();
        },
    }
});
</script>

<style>
._fd-tree-opt ._fd-tree-opt-btn {
    height: 18px;
    width: 22px;
    color: #fff;
    text-align: center;
    line-height: 18px;
    padding-bottom: 1px;
    float: left;
    cursor: pointer;
    justify-content: center;
    background-color: #2E73FF;
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
    width: 170px;
}

._fd-tree-opt-last._label {
    width: 160px;
}

._fd-tree-opt ._fd-tree-opt-danger {
    background-color: #FF2E2E;
    border-radius: 0 2px 2px 0;
}

._fd-tree-opt .ant-input-group-addon {
    width: 70px;
    padding-right: 1px;
    padding-left: 1px;
    background: #FFFFFF;
}

._fd-tree-opt .ant-tree-indent-unit {
    width: 5px;
}

._fd-tree-opt .ant-tree-switcher {
    width: 12px !important;
}
</style>
