<template>
    <a-input class="_fd-value-input" :size="size" v-model:value="value" @blur="onBlur" v-bind="$attrs">
        <template #addonBefore>
            <a-select v-model:value="type" :size="size" style="width: 100%">
                <a-select-option style="font-size: 13px;padding: 3px 0;text-align: center;" value="1">{{t('validate.types.string')}}</a-select-option>
                <a-select-option style="font-size: 13px;padding: 5px 0;text-align: center;" value="2">{{t('validate.types.number')}}</a-select-option>
                <a-select-option style="font-size: 13px;padding: 5px 0;text-align: center;" value="3">{{t('validate.types.boolean')}}</a-select-option>
            </a-select>
        </template>
        <template #addonAfter v-if="$slots.addonAfter">
            <slot name="addonAfter"></slot>
        </template>
    </a-input>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'ValueInput',
    emits: ['update:modelValue', 'change', 'change-type', 'blur'],
    inject: ['designer'],
    props: {
        modelValue: [String, Number, Boolean],
        size: String,
    },
    data() {
        return {
            type: '1',
            value: '',
        }
    },
    computed: {
        t() {
            return this.designer.setupState.t;
        }
    },
    watch: {
        modelValue: {
            handler: function (val) {
                if (typeof val === 'number') {
                    this.type = '2';
                } else if (typeof val === 'boolean') {
                    this.type = '3';
                } else {
                    this.type = '1';
                }
                this.value = null == val ? '' : ('' + val);
            },
            immediate: true,
        },
        type() {
            this.updateValue(this.value);
            this.$emit('change-type', this.type);
        }
    },
    methods: {
        onBlur(...args) {
            if (this.value !== this.toValue(this.modelValue)) {
                this.updateValue(this.value);
            }
            this.$emit('blur', ...args);
        },
        updateValue(val) {
            const value = this.toValue(val);
            this.$emit('update:modelValue', value);
            this.$emit('change', value);
        },
        toValue(val) {
            if (this.type === '1') {
                return '' + val;
            } else if (this.type === '2') {
                return parseFloat(val) || 0;
            }
            return val === 'true';
        }
    }
});
</script>

<style>
._fd-value-input .ant-input-group-addon:first-child {
    width: 55px !important;
    padding: 0;
}
._fd-value-input .ant-select-selector {
    padding: 0 !important;
}

</style>
