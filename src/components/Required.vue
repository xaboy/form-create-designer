<template>
    <div class="_fc-required">
        <ElSwitch v-model="required"></ElSwitch>
        <ElInput v-model="requiredMsg" v-if="required" :placeholder="t('validate.requiredPlaceholder')"></ElInput>
    </div>
</template>

<script>
import is from '@form-create/utils/lib/type';
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'Required',
    props: {
        modelValue: {}
    },
    inject: ['designer'],
    watch: {
        required() {
            this.update();
        },
        requiredMsg() {
            this.update();
        },
        modelValue(n) {
            const flag = is.String(n);
            this.required = n === undefined ? false : (flag ? true : !!n);
            this.requiredMsg = flag ? n : '';
        },
    },
    data() {
        const flag = is.String(this.modelValue);
        const t = this.designer.setupState.t;
        return {
            t,
            required: this.modelValue === undefined ? false : (flag ? true : !!this.modelValue),
            requiredMsg: flag ? this.modelValue : ''
        };
    },
    methods: {
        update() {
            let val;
            if (this.required === false) {
                val = false;
            } else {
                val = this.requiredMsg;
            }
            this.$emit('update:modelValue', val);
        },
    }
});
</script>

<style>
._fc-required {
    display: flex;
    align-items: center;
}

._fc-required .el-input {
    margin-left: 15px;
}

._fc-required .el-switch {
    height: 28px;
}
</style>
