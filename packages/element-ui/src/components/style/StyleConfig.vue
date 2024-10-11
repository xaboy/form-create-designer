<template>
    <div class="_fd-style-config">
        <BoxSizeInput v-model="size" @change="onInput" style="margin-bottom: 15px;"></BoxSizeInput>
        <ConfigItem :label="t('style.color')">
            <ColorInput v-model="color" @change="onInput"></ColorInput>
        </ConfigItem>
        <ConfigItem :label="t('style.backgroundColor')">
            <ColorInput v-model="backgroundColor" @change="onInput"></ColorInput>
        </ConfigItem>
        <BorderInput v-model="border" @change="onInput"></BorderInput>
        <RadiusInput v-model="radius" @change="onInput"/>
        <FontInput v-model="font" @change="onInput"/>
        <ShadowInput v-model="boxShadow" @change="onInput"></ShadowInput>
        <ConfigItem :label="t('style.opacity')" class="_fd-opacity-input">
            <el-slider :show-tooltip="false" v-model="opacity"
                       @change="onInput"></el-slider>
            <span>{{ opacity }}%</span>
        </ConfigItem>
        <ConfigItem :label="t('style.scale')" class="_fd-opacity-input">
            <el-slider :min="80" :max="120" :show-tooltip="false" v-model="scale"
                       @change="onInput"></el-slider>
            <span>{{ scale }}%</span>
        </ConfigItem>
        <ConfigItem :label="t('props.custom')" :info="Object.keys(formData).length > 0 ? t('struct.configured') : ''">
            <template #append>
                <TableOptions v-model="formData" @change="onInput" v-bind="{
                column: [{label: t('props.key'), key: 'label'}, {label: t('props.value'), key: 'value'}],
                valueType: 'object'
            }"></TableOptions>
            </template>
        </ConfigItem>
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import BoxSizeInput from './BoxSizeInput.vue';
import BorderInput from './BorderInput.vue';
import RadiusInput from './RadiusInput.vue';
import FontInput from './FontInput.vue';
import ConfigItem from './ConfigItem.vue';
import ColorInput from './ColorInput.vue';
import ShadowInput from './ShadowInput.vue';
import {isNull} from '../../utils/index';
import TableOptions from '../TableOptions.vue';

const fontKey = [
    'fontSize',
    'fontWeight',
    'fontStyle',
    'textDecoration',
    'textAlign',
    'lineHeight',
    'letterSpacing',
];

const styleKey = [
    'color',
    'backgroundColor',
    'scale',
    'borderRadius',
    'boxShadow',
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'margin',
    'padding',
    'opacity',
    'height',
    'width',
    'borderStyle',
    'borderColor',
    'borderWidth',
    'borderTopStyle',
    'borderTopColor',
    'borderTopWidth',
    'borderLeftStyle',
    'borderLeftColor',
    'borderLeftWidth',
    'borderBottomStyle',
    'borderBottomColor',
    'borderBottomWidth',
    'borderRightStyle',
    'borderRightColor',
    'borderRightWidth',
    ...fontKey
];

export default defineComponent({
    name: 'StyleConfig',
    inject: ['designer'],
    emits: ['update:modelValue'],
    components: {
        TableOptions,
        ColorInput,
        ConfigItem,
        RadiusInput,
        BoxSizeInput,
        BorderInput,
        ShadowInput,
        FontInput,
    },
    props: {
        modelValue: {
            type: Object,
            default: () => ({})
        }
    },
    watch: {
        modelValue() {
            this.tidyStyle();
        },
    },
    data() {
        const t = this.designer.setupState.t;
        return {
            t,
            formData: {},
            size: {},
            border: {},
            font: {},
            radius: '',
            backgroundColor: '',
            color: '',
            boxShadow: '',
            opacity: 100,
            scale: 100,
        }
    },
    methods: {
        tidyStyle() {
            const style = {...this.modelValue || {}};
            const size = {};
            Object.keys(style).forEach(k => {
                if (['margin', 'padding', 'height', 'width'].indexOf(k) > -1) {
                    size[k] = style[k];
                } else if (k.indexOf('margin') > -1 || k.indexOf('padding') > -1) {
                    size[k] = style[k];
                }
            });

            const border = {};
            Object.keys(style).forEach(k => {
                if (k.indexOf('border') === 0) {
                    border[k] = style[k];
                }
            });

            let opacity = isNull(style.opacity) ? 100 : (parseFloat(style.opacity) || 0);
            if (opacity && opacity < 1) {
                opacity = opacity * 100;
            }

            let scale = style.scale;
            if (isNull(style.scale)) {
                scale = 100
            } else if (isNaN(Number(scale))) {
                scale = parseFloat(scale) || 100;
            } else {
                scale = scale > 0 ? scale * 100 : 0;
            }

            const font = {};
            fontKey.forEach(k => {
                if (style[k]) {
                    font[k] = style[k];
                }
            });
            this.opacity = opacity;
            this.scale = scale;
            this.size = size;
            this.border = border;
            this.font = font;
            this.radius = style.borderRadius || '';
            this.boxShadow = style.boxShadow || '';
            this.color = style.color || '';
            this.backgroundColor = style.backgroundColor || '';
            styleKey.forEach(k => {
                delete style[k];
            })
            this.formData = style;
        },
        onInput() {
            let temp = {...this.formData};
            styleKey.forEach(k => {
                delete temp[k];
            })
            const style = {
                ...temp,
                color: this.color || '',
                backgroundColor: this.backgroundColor || '',
                opacity: (this.opacity >= 0 && this.opacity < 100) ? (this.opacity + '%') : '',
                borderRadius: this.radius || '',
                boxShadow: this.boxShadow || '',
                scale: (this.scale >= 0 && this.scale !== 100) ? (this.scale + '%') : '',
                ...this.size, ...this.border, ...this.font
            }
            Object.keys(style).forEach(k => {
                if (isNull(style[k])) {
                    delete style[k];
                }
            })
            this.$emit('update:modelValue', style);
        },
    },
    created() {
        this.tidyStyle();
    }

});
</script>

<style>
._fd-style-config {
    width: 100%;
    display: flex;
    flex-direction: column;
}

._fd-opacity-input ._fd-ci-con {
    display: flex;
    justify-content: space-between;
    width: 150px;
    align-items: center;
}

._fd-opacity-input ._fd-ci-con > span {
    width: 32px;
}

._fd-opacity-input .el-slider {
    flex: 1;
    margin-right: 15px;
}
</style>
