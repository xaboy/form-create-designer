<template>
    <div class="_fd-color-input">
        <el-input clearable v-model="color">
            <template #append>
                <el-color-picker show-alpha color-format="hex" v-model="color"/>
            </template>
        </el-input>
    </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'ColorInput',
    inject: ['designer'],
    emits: ['input', 'change'],
    props: {
        value: String,
    },
    watch: {
        value() {
            this.value = this.value || '';
        },
        color(n) {
            this.$emit('input', n);
            this.$emit('change', n);
        },
    },
    data() {
        return {
            color: this.value || ''
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
    display: flex;
    height: 26px;
}

._fd-color-input .el-input .el-input-group__append {
    padding: 0;
    width: 24px;
}

._fd-color-input .el-input .el-color-picker__trigger {
    border-left: 0 none;
    border-radius: 0px 3px 3px 0px;
    height: 26px;
    width: 26px;
}
</style>
