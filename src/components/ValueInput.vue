<template>
    <el-input class="_fd-value-input" v-model="inputValue" :size="size || undefined" @blur="onBlur" v-bind="$attrs">
        <template #prepend>
            <el-select v-model="type" size="mini" style="width: 55px">
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
    emits: ['input', 'change', 'change-type', 'blur'],
    inject: ['designer'],
    props: {
        value: [String, Number, Boolean],
        size: String,
    },
    data() {
        return {
            type: '1',
            inputValue: '',
        }
    },
    computed: {
        t() {
            return this.designer.t;
        }
    },
    watch: {
        value: {
            handler: function (val) {
                if (typeof val === 'number') {
                    this.type = '2';
                } else if (typeof val === 'boolean') {
                    this.type = '3';
                } else {
                    this.type = '1';
                }
                this.inputValue = null == val ? '' : ('' + val);
            },
            immediate: true,
        },
        type() {
            this.updateValue(this.inputValue);
            this.$emit('change-type', this.type);
        }
    },
    methods: {
        onBlur(...args) {
            if (this.inputValue !== this.toValue(this.value)) {
                this.updateValue(this.inputValue);
            }
            this.$emit('blur', ...args);
        },
        updateValue(val) {
            const value = this.toValue(val);
            this.$emit('input', value);
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

._fd-value-input .el-select__caret {
    width: 20px;
}

._fd-value-input .el-input__inner {
    padding: 0 5px;
}
</style>
