<template>
    <div class="_fc-table-form" :class="{'_fc-disabled': disabled}">
        <component :is="Form" :option="options" :rule="rule" :extendOption="true"
                   :disabled="disabled"
                   @change="formChange"
                   v-model="fapi"
                   @emit-event="$emit"></component>
        <el-button type="text" size="mini" class="fc-clock" v-if="addable && (!max || max > this.trs.length)"
                   @click="addRaw(true)"><i class="fc-icon icon-add-circle" style="font-weight: 700;"></i>
            {{formCreateInject.t('add') || '添加'}}
        </el-button>
    </div>
</template>

<script>
import {markRaw, reactive} from 'vue';

export default {
    name: 'TableForm',
    emits: ['change', 'add', 'delete', 'input'],
    props: {
        formCreateInject: Object,
        value: {
            type: Array,
            default: () => [],
        },
        columns: {
            type: Array,
            required: true,
            default: () => []
        },
        filterEmptyColumn: {
            type: Boolean,
            default: true,
        },
        deletable: {
            type: Boolean,
            default: true,
        },
        addable: {
            type: Boolean,
            default: true,
        },
        options: {
            type: Object,
            default: () => reactive(({
                submitBtn: false,
                resetBtn: false,
            }))
        },
        max: Number,
        min: Number,
        disabled: Boolean,
    },
    watch: {
        value: {
            handler() {
                this.updateTable()
            },
            deep: true
        },
        'formCreateInject.preview': function (n) {
            this.emptyRule.children[0].attrs.colspan = this.columns.length + (n ? 1 : 2);
        }
    },
    data() {
        return {
            rule: [],
            trs: [],
            fapi: {},
            Form: markRaw(this.formCreateInject.form.$form()),
            copyTrs: '',
            oldValue: '',
            emptyRule: {
                type: 'tr',
                _isEmpty: true,
                native: true,
                subRule: true,
                children: [
                    {
                        type: 'td',
                        style: {
                            textAlign: 'center',
                        },
                        native: true,
                        subRule: true,
                        attrs: {
                            colspan: this.columns.length + (this.formCreateInject.preview ? 1 : 2),
                        },
                        children: [this.formCreateInject.t('dataEmpty') || '暂无数据']
                    }
                ]
            },
        };
    },
    methods: {
        formChange() {
            this.updateValue();
        },
        updateValue() {
            const value = this.trs.map((tr, idx) => {
                return {
                    ...(this.value[idx] || {}),
                    ...this.fapi.getChildrenFormData(tr)
                }
            }).filter(v => {
                if (!this.filterEmptyColumn) {
                    return true;
                }
                if (v === undefined || v === null) {
                    return false;
                }
                let flag = false;
                Object.keys(v).forEach(k => {
                    flag = flag || (v[k] !== undefined && v[k] !== '' && v[k] !== null)
                })
                return flag;
            });
            const str = JSON.stringify(value);
            if (str !== this.oldValue) {
                this.oldValue = str;
                this.$emit('input', value);
                this.$emit('change', value);
            }
        },
        setRawData(idx, formData) {
            const raw = this.trs[idx];
            this.fapi.setChildrenFormData(raw, formData, true);
        },
        updateTable() {
            const str = JSON.stringify(this.value);
            if (this.oldValue === str) {
                return;
            }
            this.oldValue = str;
            this.trs = this.trs.splice(0, this.value.length);
            if (!this.value.length) {
                this.addEmpty();
            } else {
                this.clearEmpty();
            }
            this.value.forEach((data, idx) => {
                if (!this.trs[idx]) {
                    this.addRaw();
                }
                this.setRawData(idx, data || {});
            });
            this.rule[0].children[1].children = this.trs;
        },
        addEmpty() {
            if (this.trs.length) {
                this.trs.splice(0, this.trs.length);
            }
            this.trs.push(this.emptyRule);
        },
        clearEmpty() {
            if (this.trs[0] && this.trs[0]._isEmpty) {
                this.trs.splice(0, 1);
            }
        },
        delRaw(tr) {
            if (this.disabled || !this.deletable || (this.min > 0 && this.trs.length <= this.min)) {
                return;
            }
            const idx = this.trs.indexOf(tr);
            this.trs.splice(idx, 1);
            this.updateValue();
            if (this.trs.length) {
                this.trs.forEach(tr => this.updateRaw(tr));
            } else {
                this.addEmpty();
            }
            this.$emit('delete', idx);
        },
        addRaw(flag) {
            if (flag && this.disabled) {
                return;
            }
            const tr = this.formCreateInject.form.parseJson(this.copyTrs)[0];
            if (this.trs.length === 1 && this.trs[0]._isEmpty) {
                this.trs.splice(0, 1);
            }
            this.trs.push(tr);
            this.updateRaw(tr);
            if (flag) {
                this.$emit('add', this.trs.length);
                this.updateValue();
            }
        },
        updateRaw(tr) {
            const idx = this.trs.indexOf(tr);
            tr.children[0].domProps.innerText = idx + 1;
            tr.children[tr.children.length - 1].children[0].on.click = () => {
                this.delRaw(tr);
            };
        },
        loadRule() {
            const header = [{
                type: 'th',
                native: true,
                class: '_fc-tf-head-idx',
            }];
            let body = [{
                type: 'td',
                class: '_fc-tf-idx',
                native: true,
                domProps: {
                    innerText: '0'
                }
            }];
            this.columns.forEach((column) => {
                header.push({
                    type: 'th',
                    native: true,
                    style: {...column.style||{}, textAlign: column.align || 'center'},
                    class: column.required ? '_fc-tf-head-required' : '',
                    domProps: {
                        innerText: column.label || ''
                    }
                });
                body.push({
                    type: 'td',
                    native: true,
                    children: [...(column.rule || [])]
                });
            });
            header.push({
                type: 'th',
                native: true,
                class: '_fc-tf-edit fc-clock',
                domProps: {
                    innerText: this.formCreateInject.t('operation') || '操作'
                }
            });
            body.push({
                type: 'td',
                native: true,
                class: '_fc-tf-btn fc-clock',
                children: [
                    {
                        type: 'i',
                        native: true,
                        class: 'fc-icon icon-delete',
                        props: {},
                        on: {},
                    }
                ],
            });
            this.copyTrs = this.formCreateInject.form.toJson([
                {
                    type: 'tr',
                    native: true,
                    subRule: true,
                    children: body
                }
            ]);
            this.rule = [
                {
                    type: 'table',
                    native: true,
                    class: '_fc-tf-table',
                    attrs: {
                        border: '1',
                        cellspacing: '0',
                        cellpadding: '0',
                    },
                    children: [
                        {
                            type: 'thead',
                            native: true,
                            children: [
                                {
                                    type: 'tr',
                                    native: true,
                                    children: header
                                }
                            ]
                        },
                        {
                            type: 'tbody',
                            native: true,
                            children: this.trs
                        }
                    ]
                }
            ]
        },
    },
    created() {
        this.loadRule();
    },
    mounted() {
        this.updateTable();
    }
};
</script>

<style>
._fc-table-form {
    overflow: auto;
    color: #666666;
}

._fc-table-form .form-create .el-form-item {
    margin-bottom: 1px;
}

._fc-table-form .form-create .el-form-item.is-error {
    margin-bottom: 22px;
}

._fc-table-form .el-form-item__label,._fc-table-form .van-field__label {
    display: none !important;
}

._fc-table-form .el-form-item__content {
    display: flex;
    margin-left: 0px !important;
    width: 100% !important;
}

._fc-tf-head-idx, ._fc-tf-idx {
    width: 40px;
    min-width: 40px;
    font-weight: 500;
    text-align: center;
}

._fc-tf-edit, ._fc-tf-btn {
    width: 70px;
    min-width: 70px;
    text-align: center;
}

._fc-tf-btn .fc-icon {
    cursor: pointer;
}

._fc-table-form._fc-disabled ._fc-tf-btn .fc-icon, ._fc-table-form._fc-disabled > .el-button {
    cursor: not-allowed;
}

._fc-tf-table {
    width: 100%;
    height: 100%;
    overflow: hidden;
    table-layout: fixed;
    border: 1px solid #EBEEF5;
    border-bottom: 0 none;
}

._fc-table-form ._fc-tf-table > thead > tr > th {
    border: 0 none;
    border-bottom: 1px solid #EBEEF5;
    height: 40px;
    font-weight: 500;
    padding: 0 5px;
    box-sizing: border-box;
}

._fc-table-form ._fc-tf-table > thead > tr > th + th {
    border-left: 1px solid #EBEEF5;
}

._fc-table-form tr {
    min-height: 50px;
}

._fc-table-form ._fc-read-view {
    text-align: center;
    width: 100%;
}

._fc-table-form td {
    padding: 5px;
    min-height: 50px;
    min-width: 80px;
    position: relative;
    box-sizing: border-box;
    overflow-wrap: break-word;
    /*white-space: nowrap;*/
    overflow: hidden;
    border: 0 none;
    border-bottom: 1px solid #EBEEF5;
}

._fc-table-form td + td {
    border-left: 1px solid #EBEEF5;
}

._fc-tf-table .el-input-number, ._fc-tf-table .el-select, ._fc-tf-table .el-slider, ._fc-tf-table .el-cascader, ._fc-tf-table .el-date-editor {
    width: 100%;
}

._fc-tf-head-required:before{
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
}
</style>
