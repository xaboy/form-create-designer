<template>
    <ConfigItem :label="t('style.font.name')">
        <div class="_fd-fi-box" :style="fontStyle">
            {{ t('style.font.preview') }}
        </div>
        <template #append>
            <div class="_fd-font-input">
                <a-form size="small" layout="vertical">
                    <a-form-item :label="t('style.font.size')">
                        <SizeInput v-model="fontStyle.fontSize" size="small" @change="onInput"/>
                    </a-form-item>
                    <a-form-item :label="t('style.weight.name')">
                        <a-select v-model:value="fontStyle.fontWeight" clearable @change="onInput">
                            <a-select-option
                                v-for="item in weightType"
                                :key="item.value"
                                :value="item.value"
                            >
                                <span :style="{fontWeight: item.value}">{{ item.label }}</span>
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item :label="t('style.decoration.name')">
                        <a-select v-model:valuel="fontStyle.textDecoration" clearable @change="onInput">
                            <a-select-option
                                v-for="item in decorationType"
                                :key="item.value"
                                :value="item.value"
                            >
                                <span :style="{textDecoration: item.value}">{{ item.label }}</span>
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item :label="t('style.font.align')">
                        <a-select v-model:value="fontStyle.textAlign" clearable @change="onInput">
                            <a-select-option
                                v-for="item in alignType"
                                :key="item.value"
                                :value="item.value"
                            >{{ item.label }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item :label="t('style.font.height')">
                        <SizeInput v-model="fontStyle.lineHeight" size="small" @change="onInput"/>
                    </a-form-item>
                    <a-form-item :label="t('style.font.spacing')">
                        <SizeInput v-model="fontStyle.letterSpacing" size="small" @change="onInput"/>
                    </a-form-item>
                </a-form>
            </div>
        </template>
    </ConfigItem>
</template>

<script>
import {defineComponent} from 'vue';
import SizeInput from './SizeInput.vue';
import ColorInput from './ColorInput.vue';
import ConfigItem from './ConfigItem.vue';
import {toLine} from '@form-create/utils';

export default defineComponent({
    name: 'BorderInput',
    components: {ColorInput, SizeInput, ConfigItem},
    inject: ['designer'],
    emits: ['update:modelValue', 'change'],
    props: {
        modelValue: {
            type: Object,
            default: () => ({}),
        }
    },
    watch: {
        modelValue() {
            this.tidyValue();
        }
    },
    computed: {
        borderStyleStr() {
            let str = '';
            Object.keys(this.borderStyle).forEach((key) => {
                if (this.borderStyle[key] !== '') {
                    str += toLine(key) + ': ' + this.borderStyle[key] + ';';
                }
            }, {})
            return str;
        },
        alignType() {
            return ['left', 'center', 'right'].map(v => {
                return {label: this.t('props.' + v), value: v};
            })
        },
        decorationType() {
            return ['underline', 'line-through', 'overline'].map(v => {
                return {label: this.t('style.decoration.' + v), value: v};
            });
        },
        weightType() {
            return [300, 400, 500, 700].map(v => {
                return {label: this.t('style.weight.' + v), value: v};
            });
        },
    },
    data() {
        const t = this.designer.setupState.t;
        return {
            t,
            fontStyle: {
                fontSize: '',
                fontWeight: '',
                fontStyle: '',
                textDecoration: '',
                textAlign: '',
                lineHeight: '',
                letterSpacing: '',
            },
        }
    },
    methods: {
        tidyValue() {
            Object.keys(this.fontStyle).forEach(k => {
                this.fontStyle[k] = this.modelValue[k] || '';
            });
        },
        onInput() {
            const style = Object.keys(this.fontStyle).reduce((acc, key) => {
                if (this.fontStyle[key] !== '') {
                    acc[key] = this.fontStyle[key]
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
._fd-font-input {
    display: flex;
    justify-content: center;
    padding: 0 5px;
}

._fd-fi-box {
    width: 150px;
    overflow: hidden;
}

._fd-font-input .ant-form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    grid-column-gap: 10px;
}

._fd-font-input .ant-form-item {
    display: grid;
}

._fd-font-input .ant-form-item-label {
    padding-bottom: 2px;
}
</style>
