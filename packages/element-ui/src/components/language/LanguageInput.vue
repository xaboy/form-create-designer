<template>
    <el-input class="_fd-language-input" :class="{'is-variable': isVar}" :placeholder="placeholder" :disabled="disabled"
              :modelValue="modelValue"
              @update:modelValue="onInput"
              @blur="$emit('blur')"
              :size="size || 'small'">
        <template #append>
            <el-popover placement="bottom-end" :width="220" :hide-after="0" trigger="click" ref="pop" popper-class="_fd-language-popover">
                <template #reference>
                    <i class="fc-icon icon-language"></i>
                </template>
                <div class="_fd-language-list">
                    <div class="_fd-language-header">
                        <template v-for="item in localeList" :key="item.value">
                            <div>{{ item.label }}</div>
                        </template>
                    </div>
                    <template v-for="lang in language" :key="lang.key">
                        <div class="_fd-language-item" @click="clickLang(lang.key)">
                            <template v-for="item in localeList" :key="item.value">
                                <div>{{ lang[item.value] || '-' }}</div>
                            </template>
                        </div>
                    </template>
                </div>
            </el-popover>
        </template>
    </el-input>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'LanguageInput',
    inject: ['designer'],
    emits: ['update:modelValue', 'blur', 'change'],
    props: {
        size: String,
        placeholder: String,
        modelValue: String,
        disabled: Boolean,
    },
    computed: {
        isVar() {
            return !!(this.modelValue || '').match(/^\{\{\s*\$t\.(.+)\s*\}\}$/);
        },
        localeList() {
            const localeOptions = this.designer.setupState.getConfig('localeOptions', [
                {value: 'zh-cn', label: '简体中文'},
                {value: 'en', label: 'English'},
            ]);
            const localeList = [];
            const locale = this.designer.props?.locale?.name || 'zh-cn';
            localeOptions.forEach((item) => {
                if (item.value === locale) {
                    localeList.unshift(item);
                } else if (localeList.length < 2) {
                    localeList.push(item);
                }
            });
            if (localeList.length > 2) {
                localeList.pop();
            }
            return localeList;
        },
        language() {
            const language = this.designer.setupState.formOptions.language || {};
            const column = {};
            Object.keys(language).forEach(lang => {
                Object.keys(language[lang]).forEach(key => {
                    if (!column[key]) {
                        column[key] = {
                            key: key,
                        }
                    }
                    column[key][lang] = language[lang][key];
                })
            });
            return Object.values(column);
        }
    },
    methods: {
        clickLang(key) {
            this.onInput(`{{$t.${key}}}`);
            this.$refs.pop.hide();
        },
        onInput(val) {
            this.$emit('update:modelValue', val);
            this.$emit('change', val);
        }
    },
    mounted() {
    }

});
</script>

<style>
._fd-language-list {
    max-height: 320px;
    padding-top: 38px;
    overflow: auto;
}

._fd-language-input .el-input-group__append {
    width: 25px;
    padding: 0;
    margin: 0;
    color: #AAAAAA;
    cursor: pointer;
}

._fd-language-input.is-variable input {
    color: #2E73FF;
}

._fd-language-header, ._fd-language-item {
    display: flex;
    border-bottom: 1px solid #ECECEC;
    padding: 0 12px;
}

._fd-language-header {
    font-weight: 500;
    padding-top: 10px;
    overflow: auto;
    color: #262626;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: #FFFFFF;
}

._fd-language-header > div, ._fd-language-item > div {
    flex: 1;
    font-size: 12px;
    padding: 5px;
    min-width: 70px;
}

._fd-language-header > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

._fd-language-item {
    cursor: pointer;
}

._fd-language-item:hover {
    color: #2E73FF;
    background-color: #CCDFFF;
}

._fd-language-popover {
    padding: 0 !important;
}
</style>
