<template>
    <div class="_fd-color-input">
        <el-input clearable v-model="value">
            <template #append>
                <el-color-picker show-alpha color-format="hex" v-model="value"/>
            </template>
        </el-input>
    </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'ColorInput',
    inject: ['designer'],
    emits: ['update:modelValue', 'change'],
    props: {
        modelValue: String,
    },
    watch: {
        modelValue() {
            this.value = this.modelValue || '';
        },
        value(n) {
            this.$emit('update:modelValue', n);
            this.$emit('change', n);
        },
    },
    data() {
        return {
            value: this.modelValue || ''
        }
    },
    methods: {},
    created() {
    }

});
</script>

<style>
._fd-color-input {
    width: 150px;
}

._fd-color-input .el-input .el-color-picker {
    margin: 0;
}

._fd-color-input .el-input .el-input-group__append {
    padding: 0;
    width: 24px;
}

._fd-color-input .el-input .el-color-picker__trigger {
    border-left: 0 none;
    border-radius: 0px 3px 3px 0px;
}
</style>
