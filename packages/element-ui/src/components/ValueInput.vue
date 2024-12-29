<template>
    <el-input class="_fd-value-input" v-model="value" @blur="onBlur" v-bind="$attrs">
        <template #prepend>
            <el-select v-model="type" style="width: 60px">
                <el-option :label="t('validate.types.string')" value="1"/>
                <el-option :label="t('validate.types.number')" value="2"/>
                <el-option :label="t('validate.types.boolean')" value="3"/>
            </el-select>
        </template>
        <template #append v-if="$slots.append">
            <slot name="append"></slot>
        </template>
    </el-input>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'ValueInput',
    emits: ['update:modelValue', 'change', 'change-type', 'blur'],
    inject: ['designer'],
    props: {
        modelValue: [String, Number, Boolean],
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
._fd-value-input .el-input__validateIcon {
    display: none;
}

._fd-value-input .el-select, ._fd-value-input .el-select__wrapper {
    height: 100%;
}
</style>
