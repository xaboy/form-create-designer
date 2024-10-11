<template>
    <div class="_fd-shadow-input">
        <ConfigItem :label="t('style.shadow.name')">
            <el-input clearable v-model="value" class="_fd-si-input">
                <template #append>
                    <el-dropdown>
                        <i class="fc-icon icon-setting"></i>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item v-for="item in options" @click="changeValue(item.value)">
                                    {{ item.label }}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </el-input>
            <template #append>
                <ShadowContent v-model="value"></ShadowContent>
            </template>
        </ConfigItem>
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import ShadowContent from './ShadowContent.vue';
import ConfigItem from './ConfigItem.vue';

export default defineComponent({
    name: 'ShadowInput',
    emits: ['update:modelValue', 'change'],
    components: {ConfigItem, ShadowContent},
    inject: ['designer'],
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
        const t = this.designer.setupState.t;
        return {
            t,
            options: [
                {label: t('style.shadow.classic'), value: '3px 5px 7px 2px #CBCBCBFF'},
                {label: t('style.shadow.flat'), value: '4px 4px 3px -2px #E7E5E5FF'},
                {label: t('style.shadow.solid'), value: '1px 2px 4px 2px #979797FF'}
            ],
            value: this.modelValue || ''
        }
    },
    methods: {
        changeValue(val) {
            this.value = val;
        },
    },
    created() {
    }

});
</script>

<style>
._fd-shadow-input ._fd-ci-con {
    width: 150px;
}

._fd-shadow-input :focus-visible {
    outline: 0 none;
}

._fd-si-input .el-input-group__append {
    display: inline-flex;
    width: 24px;
    padding: 0;
}

._fd-si-input .el-input__wrapper {
    flex: 1;
}

._fd-shadow-input ._fd-ci-con .fc-icon {
    cursor: pointer;
}

</style>
