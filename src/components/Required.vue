<template>
    <div class="_fd-required">
        <el-switch v-model="required"></el-switch>
        <el-input v-model="requiredMsg" v-if="required" :placeholder="t('validate.requiredPlaceholder')"></el-input>
    </div>
</template>

<script>
import is from '@form-create/utils/lib/type';
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'Required',
    emits: ['input'],
    props: {
        value: {}
    },
    inject: ['designer'],
    watch: {
        required() {
            this.update();
        },
        requiredMsg() {
            this.update();
        },
        value(n) {
            const flag = is.String(n);
            this.required = n === undefined ? false : (flag ? true : !!n);
            this.requiredMsg = flag ? n : '';
        },
    },
    computed: {
        t() {
            return this.designer.t;
        },
    },
    data() {
        const flag = is.String(this.value);
        return {
            required: this.value === undefined ? false : (flag ? true : !!this.value),
            requiredMsg: flag ? this.value : ''
        };
    },
    methods: {
        update() {
            let val;
            if (this.required === false) {
                val = false;
            } else {
                val = this.requiredMsg || true;
            }
            this.$emit('input', val);
        },
    }
});
</script>

<style>
._fd-required {
    display: flex;
    align-items: center;
    width: 100%;
}

._fd-required .el-input {
    margin-left: 15px;
}

._fd-required .el-switch {
    height: 28px;
}
</style>
