<template>
    <div class="_fc-required">
        <ElSwitch v-model="required"></ElSwitch>
        <ElInput v-model="requiredMsg" v-if="required" placeholder="请输入提示语"></ElInput>
    </div>
</template>

<script>
import is from '@form-create/utils/lib/type';

export default {
    name: 'Required',
    props: {
        value: {}
    },
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
};
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
