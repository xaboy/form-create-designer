<template>
    <div class="_fd-pos-input">
        <ConfigItem :label="t('style.position.name')">
            <el-select v-model="style.position" clearable @change="onInput">
                <el-option
                    v-for="item in positionType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                    {{ item.label }}
                </el-option>
            </el-select>
            <template #append>
                <div class="_fd-pos-con">
                    <div class="_fd-pos-item">
                        <div class="_fd-pos-icon">
                            <i class="fc-icon icon-position-left"></i>
                        </div>
                        <SizeInput v-model="style.left" @change="onInput"/>
                    </div>
                    <div class="_fd-pos-item">
                        <div class="_fd-pos-icon" style="transform: rotate(90deg);">
                            <i class="fc-icon icon-position-left"></i>
                        </div>
                        <SizeInput v-model="style.top" @change="onInput"/>
                    </div>
                    <div class="_fd-pos-item">
                        <div class="_fd-pos-icon" style="transform: rotate(-90deg);">
                            <i class="fc-icon icon-position-left"></i>
                        </div>
                        <SizeInput v-model="style.bottom" @change="onInput"/>
                    </div>
                    <div class="_fd-pos-item">
                        <div class="_fd-pos-icon" style="transform: rotate(180deg);">
                            <i class="fc-icon icon-position-left"></i>
                        </div>
                        <SizeInput v-model="style.right" @change="onInput"/>
                    </div>
                </div>
            </template>
        </ConfigItem>
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import SizeInput from './SizeInput.vue';
import ConfigItem from './ConfigItem.vue';

export default defineComponent({
    name: 'PositionInput',
    components: {ConfigItem, SizeInput},
    inject: ['designer'],
    emits: ['update:modelValue', 'change'],
    model: {
        prop: 'modelValue',
        event: 'update:modelValue',
    },
    props: {
        modelValue: Object,
    },
    watch: {
        modelValue() {
            this.tidyValue();
        },
    },
    computed: {
        t() {
            return this.designer.t;
        },
        positionType() {
            return ['static', 'relative', 'absolute', 'fixed', 'sticky'].map(v => {
                return {label: this.t('style.position.' + v), value: v}
            })
        },
    },
    data() {
        return {
            style: {
                position: '',
                left: '',
                right: '',
                top: '',
                bottom: '',
            },
        }
    },
    methods: {
        tidyValue() {
            this.style = {
                position: '',
                left: '',
                right: '',
                top: '',
                bottom: '',
                ...this.modelValue,
            };
        },
        onInput() {
            const style = Object.keys(this.style).reduce((acc, key) => {
                if (this.style[key] !== '') {
                    acc[key] = this.style[key]
                }
                return acc
            }, {})
            this.$emit('update:modelValue', style)
            this.$emit('change', style)
        },
    },
    created() {
        this.tidyValue();
    }

});
</script>

<style>
._fd-pos-input {
    width: 100%;
    display: flex;
    flex-direction: column;
}

._fd-pos-input ._fd-ci-con .el-select {
    width: 150px;
}

._fd-pos-con {
    display: flex;
    flex-wrap: wrap;
}

._fd-pos-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    padding: 5px 0;
    box-sizing: border-box;
}

._fd-pos-item ._fd-pos-icon {
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
}

._fd-pos-item ._fd-size-input .el-input-number--mini {
    width: 70px;
}
</style>
