<template>
    <div class="_fd-color-input">
        <el-input clearable v-model="value">
            <template #append>
                <el-color-picker show-alpha color-format="hex" :predefine="predefine" v-model="value"/>
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
            value: this.modelValue || '',
            predefine: [
                '#c9e6fc',
                '#c3f2f2',
                '#c2f1d2',
                '#fef6c6',
                '#ffe5c2',
                '#fdcac2',
                '#fadcce',
                '#dec2fa',
                '#ccd2f1',
                '#2196f3',
                '#08c9c9',
                '#00c344',
                '#fad714',
                '#ff9300',
                '#f52222',
                '#eb2f96',
                '#800080',
                '#7500ea',
                '#2d46c4',
                '#000000',
                '#333333',
                '#5a5a5a',
                '#757575',
                '#9e9e9e',
                '#bdbdbd',
                '#dddddd',
                '#f5f5f5',
                '#ffffff',
            ]
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
