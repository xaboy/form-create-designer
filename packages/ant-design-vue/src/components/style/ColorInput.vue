<template>
    <div class="_fd-color-input">
        <a-input type="text" allowClear v-model:value="value">
            <template #addonAfter>
                <a-input type="color" v-model:value="value">
                </a-input>
            </template>
        </a-input>
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

._fd-color-input .ant-input-group-addon {
    padding: 0;
}

._fd-color-input .ant-input-group-addon .ant-input {
    display: block;
    padding: 0;
    width: 30px;
    margin: 0;
    height: 22px;
    cursor: pointer;
    border: 0 none;
}
</style>
