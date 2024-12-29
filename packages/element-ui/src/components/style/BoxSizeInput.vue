<template>
    <div class="_fd-box-size-input">
        <ConfigItem :label="t('props.size')" :info="Object.keys(modelValue).length > 0 ? t('struct.configured') : ''">
            <template #append>
                <el-form label-position="top" size="small">
                    <el-form-item :label="t('style.' + key)" v-for="key in keys" :key="key">
                        <SizeInput v-model="boxStyle[key]" @change="onInput"></SizeInput>
                    </el-form-item>
                    <el-form-item :label="t('style.overflow.name')" style="grid-column: span 2;">
                        <el-radio-group :modelValue="boxStyle.overflow">
                            <el-tooltip
                                effect="dark"
                                :content="t('style.overflow.' + item.value)"
                                placement="top"
                                persistent
                                :hide-after="0"
                                v-for="item in overflow"
                                :key="item.value"
                            >
                                <el-radio-button :label="item.value" :value="item.value"
                                                 @click="changeOverflow(item.value)">
                                    <template v-if="item.text">
                                        <span style="font-size: 12px;line-height: 16px;">Auto
                                        </span>
                                    </template>
                                    <template v-else>
                                        <i class="fc-icon" :class="item.icon"></i>
                                    </template>
                                </el-radio-button>
                            </el-tooltip>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </template>
        </ConfigItem>
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import ConfigItem from './ConfigItem.vue';
import SizeInput from './SizeInput.vue';

export default defineComponent({
    name: 'BoxSizeInput',
    components: {SizeInput, ConfigItem},
    props: {
        modelValue: {
            type: Object,
            default: () => ({}),
        }
    },
    inject: ['designer'],
    emits: ['update:modelValue', 'change'],
    data() {
        return {
            overflow: [
                {
                    value: 'visible',
                    icon: 'icon-eye',
                },
                {
                    value: 'hidden',
                    icon: 'icon-eye-close',
                },
                {
                    value: 'scroll',
                    icon: 'icon-scroll',
                },
                {
                    value: 'auto',
                    text: 'Auto',
                },
            ],
            keys: ['width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight'],
            boxStyle: {
                width: '',
                minWidth: '',
                maxWidth: '',
                height: '',
                minHeight: '',
                maxHeight: '',
                overflow: '',
            },
        }
    },
    watch: {
        modelValue() {
            this.tidyValue();
        },
    },
    computed: {
        t() {
            return this.designer.setupState.t;
        }
    },
    methods: {
        tidyValue() {
            this.boxStyle = {
                width: '',
                minWidth: '',
                maxWidth: '',
                height: '',
                minHeight: '',
                maxHeight: '',
                overflow: '',
            };
            if (!this.modelValue) {
                return;
            }
            Object.keys(this.boxStyle).forEach(k => {
                if (this.modelValue[k]) {
                    this.boxStyle[k] = this.modelValue[k];
                }
            });
        },
        onInput() {
            const style = Object.keys(this.boxStyle).reduce((acc, key) => {
                if (this.boxStyle[key] !== '') {
                    acc[key] = this.boxStyle[key]
                }
                return acc
            }, {})
            this.$emit('update:modelValue', style)
            this.$emit('change', style)
        },
        changeOverflow(val) {
            this.boxStyle.overflow = this.boxStyle.overflow === val ? '' : val;
            this.onInput();
        },
        change(type, e) {
            this.boxStyle[type] = e.target.value;
        },
    },
    created() {
        this.tidyValue();
    }
});

</script>

<style>
._fd-box-size-input .el-form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    grid-column-gap: 10px;
}

._fd-box-size-input .el-radio-group {
    width: 100%;
}

._fd-box-size-input .el-radio-button__inner {
    width: 100%;
    padding: 4px;
}

._fd-box-size-input .el-radio-button {
    flex: 1;
}

._fd-box-size-input ._fd-size-input .el-input-number--small {
    width: 100%;
}
</style>