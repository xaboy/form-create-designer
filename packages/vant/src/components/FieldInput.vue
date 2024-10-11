<template>
    <div class="_fd-field-input">
        <i class="fc-icon icon-group" @click.stop="copy"></i>
        <el-input
            v-model="value"
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
    emits: ['update:modelValue'],
    props: {
        modelValue: String,
        disabled: Boolean,
    },
    computed: {
        fieldReadonly() {
            return this.designer.setupState.fieldReadonly;
        },
        activeRule() {
            return this.designer.setupState.activeRule;
        },
        t() {
            return this.designer.setupState.t;
        }
    },
    data() {
        return {
            value: this.modelValue || '',
            oldValue: '',
        }
    },
    watch: {
        modelValue(n) {
            this.value = n;
        }
    },
    methods: {
        copy() {
            copyTextToClipboard(this.modelValue);
        },
        getSubChildren() {
            let subChildren = this.designer.setupState.getSubFormChildren(this.activeRule) || [];
            subChildren = is.trueArray(subChildren) ? subChildren : this.designer.setupState.children;
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
            }
            return getRule(subChildren);
        },
        checkValue() {
            const oldField = this.oldValue;
            let field = (this.value || '').replace(/[\s\　]/g, '');
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
            this.oldValue = this.value;
        },
        makeField() {
            this.oldValue = this.value;
            this.value = uniqueId();
            this.onInput();
        },
        onInput() {
            if (this.value !== this.modelValue) {
                this.value = this.checkValue();
                if (this.value !== this.modelValue) {
                    this.$emit('update:modelValue', this.value);
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
}
</style>
