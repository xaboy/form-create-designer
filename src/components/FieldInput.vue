<template>
    <div class="_fd-field-input">
        <i class="fc-icon icon-group" @click.stop="copy"></i>
        <el-input
            v-model="formValue"
            :readonly="fieldReadonly || disabled"
            :disabled="fieldReadonly || disabled"
            @focus="onFocus"
            @blur="onInput"
        >
            <template #append v-if="!fieldReadonly">
                <i class="fc-icon icon-auto" @click="makeField"></i>
            </template>
        </el-input>
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import uniqueId from '@form-create/utils/lib/unique';
import errorMessage from '../utils/message';
import {copyTextToClipboard} from '../utils/index';
import is from '@form-create/utils/lib/type';

export default defineComponent({
    name: 'FieldInput',
    inject: ['designer'],
    emits: ['input'],
    props: {
        value: String,
        disabled: Boolean,
    },
    computed: {
        fieldReadonly() {
            return this.designer.fieldReadonly;
        },
        activeRule() {
            return this.designer.activeRule;
        },
        t() {
            return this.designer.t;
        }
    },
    data() {
        return {
            formValue: this.value || '',
            oldValue: '',
        };
    },
    watch: {
        value(n) {
            this.formValue = n;
        }
    },
    methods: {
        copy() {
            copyTextToClipboard(this.value);
        },
        getSubChildren() {
            let subChildren = this.designer.getSubFormChildren(this.activeRule) || [];
            subChildren = is.trueArray(subChildren) ? subChildren : this.designer.children;
            return subChildren;
        },
        getSubFieldChildren() {
            const subChildren = this.getSubChildren();
            const list = [];
            const getRule = (children) => {
                children && children.forEach(rule => {
                    if (rule && rule._fc_drag_tag && rule.field) {
                        list.push({...rule, children: []});
                    } else if (rule && rule.children) {
                        getRule(rule.children);
                    }
                });
                return list;
            };
            return getRule(subChildren);
        },
        checkValue() {
            const oldField = this.oldValue;
            let field = (this.formValue || '').replace(/[\s\　]/g, '');
            if (!field) {
                errorMessage(this.t('computed.fieldEmpty'));
                return oldField;
            } else if (!/^[a-zA-Z]/.test(field)) {
                errorMessage(this.t('computed.fieldChar'));
                return oldField;
            } else if (oldField !== field) {
                const flag = field.indexOf('.') > -1;
                if (flag) {
                    field = field.replaceAll('.', '_');
                }
                if (this.getSubFieldChildren().filter(v => v.field === field).length > 0) {
                    errorMessage(this.t('computed.fieldExist', {label: field}));
                    return oldField;
                }
                if (flag) {
                    return field;
                }
            }
            this.oldValue = '';
            return field;
        },
        onFocus() {
            this.oldValue = this.formValue;
        },
        makeField() {
            this.oldValue = this.formValue;
            this.formValue = uniqueId();
            this.onInput();
        },
        onInput() {
            if (this.formValue !== this.value) {
                this.formValue = this.checkValue();
                this.oldValue = this.formValue;
                if (this.formValue !== this.value) {
                    this.designer.$emit('changeField', {field: this.formValue, oldField: this.value, rule: this.activeRule})
                    this.$emit('input', this.formValue);
                }
            }
        },
    },
});
</script>

<style>
._fd-field-input {
    width: 100%;
}

._fd-field-input > .fc-icon {
    position: absolute;
    right: 28px;
    top: 1px;
    z-index: 3;
    color: #a8abb2;
    cursor: pointer;
    width: 24px;
    height: 24px;
    text-align: center;
}

._fd-field-input > .fc-icon:hover {
    color: #2E73FF;
}

._fd-field-input .el-input-group__append {
    width: 25px;
    padding: 0;
    margin: 0;
    color: #606266;
    cursor: pointer;
    text-align: center;
}
</style>
