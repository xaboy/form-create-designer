<template>
    <div class="_td-table-opt">
        <a-form-item-rest>
            <a-table
                :data-source="value"
                :columns="columns"
                :size="size || 'small'"
                rowKey="index"
                bordered
                :pagination="false"
                style="width: 100%">
                <template #bodyCell="scope">
                    <template v-if="scope.column.dataIndex !== 'handle'">
                        <template v-if="scope.column.value">
                            <ValueInput :size="size || 'small'" :modelValue="scope.record[scope.column.key]"
                                        @update:modelValue="(n)=>(scope.record[scope.column.key] = n)"
                                        @blur="onInput(scope.record)" @change-type="onInput(scope.record)"></ValueInput>
                        </template>
                        <template v-else>
                            <a-input :size="size || 'small'" v-model:value="scope.record[scope.column.key]"
                                     @blur="onInput(scope.record)"></a-input>
                        </template>
                    </template>
                    <template v-else>
                        <i class="fc-icon icon-delete" @click="del(scope.index)"></i>
                    </template>
                </template>
            </a-table>
            <div class="_td-table-opt-handle">
                <a-button type="link" @click="add" size="small" v-if="!max || max > value.length">
                    <i class="fc-icon icon-add"></i> {{ t('tableOptions.add') }}
                </a-button>
            </div>
        </a-form-item-rest>
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import {copy} from '@form-create/utils/lib/extend';
import ValueInput from './ValueInput.vue';

export default defineComponent({
    name: 'TableOptions',
    emits: ['update:modelValue', 'change'],
    components: {
        ValueInput
    },
    props: {
        modelValue: [Array, Object],
        column: {
            type: Array,
            default: () => [{label: 'label', key: 'label'}, {label: 'value', key: 'value'}]
        },
        valueType: String,
        max: Number,
        size: String,
    },
    inject: ['designer'],
    watch: {
        modelValue() {
            this.value = this.tidyModelValue();
        }
    },
    computed: {
        t() {
            return this.designer.setupState.t;
        },
        columns() {
            const columns = this.overColumn.map(col => {
                return {...col, title: col.label};
            })
            columns.push({
                title: '',
                width: '40px',
                dataIndex: 'handle'
            })

            return columns;
        },
        overColumn() {
            return this.column;
        },
    },
    data() {
        return {
            value: this.tidyModelValue(),
        };
    },
    methods: {
        tidyModelValue() {
            const modelValue = this.modelValue;
            if (this.valueType === 'string') {
                return (modelValue || []).map(value => {
                    return {value: '' + value}
                })
            } else if (this.valueType === 'object') {
                return Object.keys((modelValue || {})).map(label => {
                    return {label, value: modelValue[label]}
                })
            } else {
                return [...modelValue || []].map(v => {
                    return copy(v);
                });
            }
        },
        tidyValue() {
            if (this.valueType === 'object') {
                const obj = {};
                this.value.forEach(v => {
                    if (v.label && v.value) {
                        obj[v.label] = v.value;
                    }
                })
                return obj;
            } else {
                return this.value.map(v => {
                    if (this.valueType === 'string') {
                        return v.value;
                    }
                    return {...v}
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
            })
            if (flag) {
                this.input();
            }
        },
        input() {
            const value = this.tidyValue();
            this.$emit('update:modelValue', value);
            this.$emit('change', value);
        },
        add() {
            this.value.push(this.column.reduce((initial, v) => {
                initial[v.key] = '';
                return initial;
            }, {}));
        },
        del(idx) {
            this.value.splice(idx, 1);
            this.input();
        }
    }
});
</script>

<style>
._td-table-opt {
    width: 100%;
}

._td-table-opt .icon-delete {
    cursor: pointer;
}

._td-table-opt tr td:last-child {
    text-align: center;
}

._td-table-opt-handle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 5px;
}

._td-table-opt-handle .ant-btn {
    display: flex;
    align-items: center;
    font-size: 12px;
}
</style>
