<template>
    <ConfigItem :label="t('style.border')">
        <div class="line-box" :style="borderStyleStr">
            <div class="line-box-con"></div>
        </div>
        <template #append>
            <div class="_fd-border-input">
                <div class="_fd-bi-left">
                    <div class="_fd-bil-row">
                        <div class="_fd-bil-col" :class="active === 'Top' ? 'active' : ''" @click="active = 'Top'">┳
                        </div>
                    </div>
                    <div class="_fd-bil-row">
                        <div class="_fd-bil-col" :class="active === 'Left' ? 'active' : ''" @click="active = 'Left'">┣
                        </div>
                        <div class="_fd-bil-col" :class="active === '' ? 'active' : ''" @click="active = ''">╋</div>
                        <div class="_fd-bil-col" :class="active === 'Right' ? 'active' : ''" @click="active = 'Right'">
                            ┫
                        </div>
                    </div>
                    <div class="_fd-bil-row">
                        <div class="_fd-bil-col" :class="active === 'Bottom' ? 'active' : ''"
                             @click="active = 'Bottom'">┻
                        </div>
                    </div>
                </div>
                <div class="_fd-bi-right">
                    <el-select v-model="curStyle" clearable>
                        <el-option
                            v-for="item in lineType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                            <div class="_fd-bi-opt">
                                <div class="_line" :class="item.value"></div>
                            </div>
                        </el-option>
                    </el-select>
                    <SizeInput v-model="curWidth"/>
                    <ColorInput v-model="curColor"/>
                </div>
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
            this.initCur();
        },
        active() {
            this.initCur();
        },
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
    },
    data() {
        const t = this.designer.setupState.t;
        return {
            t,
            active: '',
            borderStyle: {},
            curStyle: '',
            curColor: '',
            curWidth: '',
            lineType: ['solid', 'dashed', 'dotted', 'double'].map(k => {
                return {value: k, label: t('style.' + k)}
            }),
            position: ['Top', 'Left', 'Bottom', 'Right'],
            type: ['Style', 'Color', 'Width'],
            unwatch: null,
        }
    },
    methods: {
        tidyValue() {
            const key = [];
            this.borderStyle = {};
            ['', ...this.position].forEach(k => {
                this.type.forEach(t => {
                    key.push('border' + k + t);
                });
            });
            key.forEach(k => {
                this.borderStyle[k] = this.modelValue[k] || '';
            });
        },
        onInput() {
            const style = Object.keys(this.borderStyle).reduce((acc, key) => {
                if (this.borderStyle[key] !== '') {
                    acc[key] = this.borderStyle[key]
                }
                return acc
            }, {})
            this.$emit('update:modelValue', style)
            this.$emit('change', style)
        },
        pushCur() {
            this.borderStyle['border' + this.active + 'Style'] = this.curStyle || '';
            this.borderStyle['border' + this.active + 'Color'] = this.curColor || '';
            this.borderStyle['border' + this.active + 'Width'] = this.curWidth || '';
            this.onInput();
        },
        initCur() {
            this.unwatch && this.unwatch();
            this.curStyle = this.borderStyle['border' + this.active + 'Style'] || '';
            this.curColor = this.borderStyle['border' + this.active + 'Color'] || '';
            this.curWidth = this.borderStyle['border' + this.active + 'Width'] || '';
            this.unwatch = this.$watch(() => [this.curStyle, this.curColor, this.curWidth], () => {
                this.pushCur();
            });
        },
    },
    created() {
        this.tidyValue();
        this.initCur();
    }

});
</script>

<style>
._fd-border-input {
    width: 100%;
    height: 110px;
    display: flex;
    justify-content: center;
}

._fd-border-input ._fd-bi-left {
    width: 115px;
    height: 115px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

._fd-border-input ._fd-bi-right {
    width: 140px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 5px;
}

._fd-border-input ._fd-bi-right ._fd-color-input {
    width: 140px;
}

._fd-bi-opt {
    width: 100%;
    display: flex;
    height: 100%;
    align-items: center;
}

._fd-bi-opt ._line {
    width: 100%;
}

._fd-bi-opt .solid {
    border: 1px solid #000;
}

._fd-bi-opt .dashed {
    border: 1px dashed #000;
}

._fd-bi-opt .dotted {
    border: 1px dotted #000;
}

._fd-bi-opt .double {
    border: 1px double #000;
}

._fd-border-input ._fd-bil-row {
    height: 38px;
    display: flex;
    justify-content: center;
}

._fd-border-input ._fd-bil-col {
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 8px;
    font-size: 16px;
}

._fd-border-input ._fd-bil-col.active {
    outline: 1px dashed #2E73FF;
    color: #2E73FF;
}

.line-box {
    width: 150px;
    height: 20px;
    padding: 1px;
    box-sizing: border-box;
}

.line-box-con {
    width: 100%;
    height: 100%;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAD5JREFUOE9jZGBg+M+AChjR+HjlQYqHgQFoXibNS+gBBjKMpDAZHAaQ5GQGBgYUV4+mA7QAgaYokgJ14NMBAK1TIAlUJpxYAAAAAElFTkSuQmCC");
    opacity: 0.3;
}

</style>
