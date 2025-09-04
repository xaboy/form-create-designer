<template>
    <div class="_td-table-opt">
        <el-table
            :data="formValue"
            border
            :size="size || 'mini'"
            style="width: 100%">
            <template v-for="(col,idx) in column">
                <el-table-column :label="col.label" :key="col.label + idx">
                    <template #default="scope">
                        <template v-if="col.value">
                            <ValueInput :size="size || 'small'" :value="scope.row[col.key]" :disabled="disabled"
                                        @input="(n)=>($set(scope.row, col.key, n))"
                                        @blur="onInput(scope.row)" @change-type="onInput(scope.row)"></ValueInput>
                        </template>
                        <template v-else>
                            <el-input :size="size || 'small'" :value="scope.row[col.key]" :disabled="disabled"
                                      @input="(n)=>($set(scope.row, col.key, n))"
                                      @blur="onInput(scope.row)"></el-input>
                        </template>
                    </template>
                </el-table-column>
            </template>
            <el-table-column width="45" align="center" fixed="right" v-if="!disabled">
                <template #default="scope">
                    <i class="fc-icon icon-delete" @click="del(scope.$index)"></i>
                </template>
            </el-table-column>
        </el-table>
        <div class="_td-table-opt-handle">
            <el-button type="text" @click="add" v-if="!max || max > formValue.length">
                <i class="fc-icon icon-add"></i> {{ t('tableOptions.add') }}
            </el-button>
        </div>

    </div>
</template>

<script>
import {defineComponent} from 'vue';
import {copy} from '@form-create/utils/lib/extend';
import ValueInput from './ValueInput.vue';

export default defineComponent({
    name: 'TableOptions',
    emits: ['input', 'change'],
    components: {
        ValueInput
    },
    props: {
        value: [Array, Object],
        column: {
            type: Array,
            default: () => [{label: 'label', key: 'label'}, {label: 'value', key: 'value'}]
        },
        valueType: String,
        max: Number,
        size: String,
        disabled: Boolean,
    },
    inject: ['designer'],
    watch: {
        value() {
            this.formValue = this.tidyModelValue();
        }
    },
    computed: {
        t() {
            return this.designer.t;
        },
    },
    data() {
        return {
            formValue: this.tidyModelValue(),
        };
    },
    methods: {
        tidyModelValue() {
            const modelValue = this.value;
            if (this.valueType === 'string') {
                return (modelValue || []).map(value => {
                    return {value: '' + value};
                });
            } else if (this.valueType === 'object') {
                return Object.keys((modelValue || {})).map(label => {
                    return {label, value: modelValue[label]};
                });
            } else {
                return [...modelValue || []].map(v => {
                    return copy(v);
                });
            }
        },
        tidyValue() {
            if (this.valueType === 'object') {
                const obj = {};
                this.formValue.forEach(v => {
                    if (v.label && v.value) {
                        obj[v.label] = v.value;
                    }
                });
                return obj;
            } else {
                return this.formValue.map(v => {
                    if (this.valueType === 'string') {
                        return v.value;
                    }
                    return {...v};
                });
            }
        },
        onInput(item) {
            if (this.column.length === 1 && '' === item[this.column[0].key]) {
                return;
            }
            const flag = this.column.every(v => {
                if (v.required === false) {
                    return true;
                }
                if (['object', 'string'].indexOf(this.valueType) > -1) {
                    return item[v.key] !== undefined && item[v.key] !== '' && item[v.key] !== null;
                }
                return item[v.key] !== undefined;
            });
            if (flag) {
                this.input();
            }
        },
        input() {
            const value = this.tidyValue();
            this.$emit('input', value);
            this.$emit('change', value);
        },
        add() {
            this.formValue.push(this.column.reduce((initial, v) => {
                initial[v.key] = '';
                return initial;
            }, {}));
        },
        del(idx) {
            this.formValue.splice(idx, 1);
            this.input();
        }
    }
});
</script>

<style scoped>
._td-table-opt {
    width: 100%;
}

._td-table-opt .el-table{
    z-index: 1;
}

._td-table-opt-handle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 5px;
}

._td-table-opt-handle span{
    display: flex;
    align-items: center;
}
</style>
