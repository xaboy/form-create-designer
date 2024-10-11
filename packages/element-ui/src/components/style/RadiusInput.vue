<template>
    <div class="_fd-radius-input">
        <ConfigItem :label="t('style.borderRadius')">
            <SizeInput :unit="unit" v-model="style.com" @change="batch"/>
            <template #append>
                <div class="_fd-radius-con">
                    <div class="_fd-radius-item">
                        <div class="_fd-radius-icon" style="transform: rotate(180deg);">
                            <i class="fc-icon icon-radius"></i>
                        </div>
                        <SizeInput :unit="unit" v-model="style.left" @change="onInput"/>
                    </div>
                    <div class="_fd-radius-item">
                        <div class="_fd-radius-icon" style="transform: rotate(-90deg);">
                            <i class="fc-icon icon-radius"></i>
                        </div>
                        <SizeInput :unit="unit" v-model="style.top" @change="onInput"/>
                    </div>
                    <div class="_fd-radius-item">
                        <div class="_fd-radius-icon" style="transform: rotate(90deg);">
                            <i class="fc-icon icon-radius"></i>
                        </div>
                        <SizeInput :unit="unit" v-model="style.bottom" @change="onInput"/>
                    </div>
                    <div class="_fd-radius-item">
                        <div class="_fd-radius-icon">
                            <i class="fc-icon icon-radius"></i>
                        </div>
                        <SizeInput :unit="unit" v-model="style.right" @change="onInput"/>
                    </div>
                </div>
            </template>
        </ConfigItem>
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import SizeInput from './SizeInput.vue';
import ColorInput from './ColorInput.vue';
import ConfigItem from './ConfigItem.vue';

export default defineComponent({
    name: 'RadiusInput',
    components: {ConfigItem, ColorInput, SizeInput},
    inject: ['designer'],
    emits: ['update:modelValue', 'change'],
    props: {
        modelValue: String
    },
    watch: {
        modelValue(n) {
            n !== this.oldValue && this.tidyValue();
        },
    },
    computed: {
        t() {
            return this.designer.setupState.t;
        },
    },
    data() {
        return {
            visit: false,
            active: '',
            style: {
                com: '',
                left: '',
                right: '',
                top: '',
                bottom: '',
            },
            unit: ['px', '%'],
            oldValue: '',
        }
    },
    methods: {
        batch() {
            this.style.left = this.style.com;
            this.style.right = this.style.com;
            this.style.top = this.style.com;
            this.style.bottom = this.style.com;
            this.onInput();
        },
        tidyValue() {
            this.style = {
                com: '',
                left: '',
                right: '',
                top: '',
                bottom: '',
            };
            if (!this.modelValue) {
                return;
            }
            let split = (this.modelValue || '').split(' ').filter(v => v !== '');
            if (split.length === 1) {
                split = [split[0], split[0], split[0], split[0]];
            } else if (split.length === 2) {
                split = [split[0], split[1], split[0], split[1]];
            } else if (split.length === 3) {
                split = [split[0], split[1], split[2], split[1]];
            }
            this.style.left = split[0];
            this.style.top = split[1];
            this.style.right = split[2];
            this.style.bottom = split[3];
            this.updateCom();
        },
        updateCom() {
            let value = `${this.style.left || '0px'} ${this.style.top || '0px'} ${this.style.right || '0px'} ${this.style.bottom || '0px'}`;
            this.style.com = value.replaceAll(this.style.left, '').trim() === '' ? this.style.left : '';
        },
        onInput() {
            let value = `${this.style.left || '0px'} ${this.style.top || '0px'} ${this.style.right || '0px'} ${this.style.bottom || '0px'}`;
            if ('' === `${this.style.left}${this.style.top}${this.style.right}${this.style.bottom}`.trim()) {
                value = '';
            } else {
                this.updateCom();
            }
            this.oldValue = value;
            this.$emit('update:modelValue', value);
            this.$emit('change', value);
        },
    },
    created() {
        this.tidyValue();
    }

});
</script>

<style>
._fd-radius-input {
    width: 100%;
    display: flex;
    flex-direction: column;
}

._fd-radius-con {
    display: flex;
    flex-wrap: wrap;
}

._fd-radius-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    padding: 5px 0;
    box-sizing: border-box;
}

._fd-radius-item ._fd-radius-icon {
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
}

._fd-radius-item ._fd-size-input .el-input-number--small {
    width: 70px;
}
</style>
