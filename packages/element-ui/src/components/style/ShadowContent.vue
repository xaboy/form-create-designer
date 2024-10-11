<template>
    <div class="_fd-shadow-content">
        <el-form label-width="50px" label-position="top" inline class="_fd-sc-form" size="small">
            <el-form-item :label="t('style.shadow.mode')">
                <el-radio-group v-model="form.type" @change="onInput" size="small" class="_fd-sc-radio">
                    <template v-for="item in options" :key="item.key">
                        <el-tooltip
                            effect="dark"
                            :content="t('style.shadow.' + item.key)"
                            placement="top"
                            :hide-after="0"
                            persistent
                        >
                            <el-radio-button :label="item.key" :value="item.key">
                                <i class="fc-icon" :class="'icon-' + item.icon"></i>
                            </el-radio-button>
                        </el-tooltip>
                    </template>
                </el-radio-group>
            </el-form-item>
            <el-form-item :label="t('style.color')">
                <ColorInput v-model="form.color" @change="onInput"></ColorInput>
            </el-form-item>
            <el-form-item :label="t('style.shadow.x')">
                <el-input v-model="form.x" type="number" @change="onInput">
                    <template #append>
                        <el-select v-model="form.x_unit" @change="onInput">
                            <el-option v-for="item in units" :key="item" :label="item" :value="item"/>
                        </el-select>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item :label="t('style.shadow.y')">
                <el-input v-model="form.y" type="number" @change="onInput">
                    <template #append>
                        <el-select v-model="form.y_unit" @change="onInput">
                            <el-option v-for="item in units" :key="item" :label="item" :value="item"/>
                        </el-select>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item :label="t('style.shadow.vague')">
                <el-input v-model="form.vague" type="number" @change="onInput">
                    <template #append>
                        <el-select v-model="form.vague_unit" @change="onInput">
                            <el-option v-for="item in units" :key="item" :label="item" :value="item"/>
                        </el-select>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item :label="t('style.shadow.extend')">
                <el-input v-model="form.extend" type="number" @change="onInput">
                    <template #append>
                        <el-select v-model="form.extend_unit" @change="onInput">
                            <el-option v-for="item in units" :key="item" :label="item" :value="item"/>
                        </el-select>
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
        <div class="_fd-sc-right">
            <div
                ref="box"
                class="_fd-sc-box"
                :class="down ? 'down' : ''"
                @click="getMouseXY($event, 1)"
                @mousedown="onMousedown"
                @mouseup="onMouseup"
                @mousemove="getMouseXY($event, 0)"
            >
                <span class="spot" :style="spotStyle">
                  <i class="spot-id"/>
                </span>
                <span class="center-spot"/>
                <div class="x-hr"/>
                <div class="y-hr"/>
            </div>
        </div>
    </div>
</template>


<script>
import {defineComponent} from 'vue';
import ColorInput from './ColorInput.vue';

export default defineComponent({
    name: 'ShadowContent',
    components: {ColorInput},
    inject: ['designer'],
    emits: ['update:modelValue', 'change'],
    props: {
        modelValue: {
            default: '0px 0px 0px rgba(0, 0, 0, 0)',
            type: String,
        },
    },
    data() {
        return {
            max: 24,
            boxSize: 250,
            options: [
                {key: 'external', icon: 'shadow'},
                {key: 'inset', icon: 'shadow-inset'},
            ],
            form: {
                color: '',
                type: 'external',
                x: 0,
                y: 0,
                vague: 0,
                extend: 0,
                x_unit: 'px',
                y_unit: 'px',
                vague_unit: 'px',
                extend_unit: 'px',
            },
            units: ['px', '%', 'rem', 'em', 'vw', 'vh'],
            down: false,
            position: {
                left: 0,
                top: 0,
            },
        }
    },
    computed: {
        spotStyle() {
            return {
                left: this.position.left + 'px',
                top: this.position.top + 'px',
            }
        },
        t() {
            return this.designer.setupState.t;
        },
    },
    watch: {
        position(n) {
            this.form.x = parseInt(String(((n.left - this.boxSize / 2) / this.boxSize) * this.max));
            this.form.y = parseInt(String(((n.top - this.boxSize / 2) / this.boxSize) * this.max));
            const i = this.max / 2;
            this.form.x = this.form.x < 0 ? Math.max(this.form.x, i * -1) : Math.min(this.form.x, i);
            this.form.y = this.form.y < 0 ? Math.max(this.form.y, i * -1) : Math.min(this.form.y, i);
        },
        modelValue(n) {
            this.initStyle(n);
        },
    },
    methods: {
        getMouseXY(e, force) {
            if (this.down || force) {
                const _box = this.$refs.box.getBoundingClientRect()
                this.position = {
                    left: parseInt(String(e.clientX - _box.x)),
                    top: parseInt(String(e.clientY - _box.y)),
                }
            }
        },
        onMouseup() {
            this.down = false;
            this.onInput();
        },
        onMousedown(e) {
            this.getMouseXY(e, true);
            this.down = true;
        },
        onInput() {
            const n = this.form;
            let value = `${n.x}${n.x_unit} ${n.y}${n.y_unit} ${n.vague}${n.vague_unit} ${n.extend}${n.extend_unit} ${n.color}`
            if (`${n.x}${n.y}${n.vague}${n.extend}`.replaceAll('0', '') === '') {
                value = '';
            } else if (n.type === 'inset') {
                value += ' inset'
            }
            this.$emit('update:modelValue', value);
            this.$emit('change', value);
        },
        initStyle(modelValue) {
            if ((this.modelValue || '').indexOf(' inset') > -1) {
                this.form.type = 'inset'
                modelValue = modelValue.replace(' inset', '')
            }
            const shadowData = modelValue.split('rgba')
            let color, shadowValues;

            if (shadowData.length > 1) {
                // 将颜色值和其他阴影值进行分离
                color = 'rgba' + shadowData[1].trim()
                shadowValues = shadowData[0].trim().split(' ')
            } else {
                shadowValues = shadowData[0].trim().split(' ')
                color = shadowValues.pop()
            }
            this.form.color = color || '#000'
            this.form.x = parseInt(shadowValues[0]) || 0
            this.form.y = parseInt(shadowValues[1]) || 0
            this.form.vague = parseInt(shadowValues[2]) || 0
            this.form.extend = parseInt(shadowValues[3]) || 0

            const getUnit = (value) => {
                return value?.replace(/[-\d.]/g, '') || 'px'
            }
            this.form.x_unit = getUnit(shadowValues[0])
            this.form.y_unit = getUnit(shadowValues[1])
            this.form.vague_unit = getUnit(shadowValues[2])
            this.form.extend_unit = getUnit(shadowValues[3])
            this.position.left = this.boxSize / 2 + (this.form.x / this.max) * this.boxSize || 0
            this.position.top = this.boxSize / 2 + (this.form.y / this.max) * this.boxSize || 0
        }
    },
    mounted() {
        this.initStyle(this.modelValue);
    }

});
</script>

<style>
._fd-shadow-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
}

._fd-sc-form .fc-icon {
    font-size: 12px;
}

._fd-shadow-content .el-form-item {
    width: 50%;
    padding: 0 0 0 10px;
    margin: 0 0 5px !important;
    box-sizing: border-box;
}

._fd-shadow-content .el-input__wrapper {
    flex: 1;
}

._fd-shadow-content ._fd-sc-box {
    width: 250px;
    height: 250px;
    border: 1px solid #ccc;
    border-radius: 5px;
    position: relative;
    cursor: pointer;
    overflow: hidden
}

._fd-shadow-content ._fd-sc-box .spot {
    position: absolute;
    width: 0;
    height: 0;
    border-radius: 100%
}

._fd-shadow-content ._fd-sc-box .spot-id {
    position: absolute;
    top: -5px;
    left: -5px;
    width: 10px;
    height: 10px;
    background: #1989fa;
    border-radius: 100%;
    z-index: 9
}

._fd-shadow-content ._fd-sc-box.down .spot-id {
    box-shadow: 1px 1px 10px 2px #1989fa
}

._fd-shadow-content ._fd-sc-box .center-spot {
    position: absolute;
    width: 0;
    height: 0;
    top: 125px;
    left: 125px;
    border-radius: 100%;
    background: #1989fa
}

._fd-shadow-content ._fd-sc-box .x-hr {
    width: 100%;
    position: absolute;
    height: 1px;
    top: 125px;
    background: #ccc
}

._fd-shadow-content ._fd-sc-box .y-hr {
    height: 100%;
    position: absolute;
    width: 1px;
    left: 125px;
    background: #ccc
}

._fd-shadow-content .el-select__placeholder {
    text-align: center;
}

._fd-shadow-content .el-input-group__append {
    width: 55px;
    padding: 0;
}

._fd-shadow-content .el-input {
    width: 105px;
}

._fd-shadow-content ._fd-sc-right {
    margin-top: 10px;
}

._fd-shadow-content ._fd-sc-radio {
    width: 105px;
}

._fd-shadow-content ._fd-sc-radio .el-radio-button {
    display: flex;
    flex: 1;
}

._fd-shadow-content ._fd-sc-radio .el-radio-button__inner {
    width: 100%;
}

</style>