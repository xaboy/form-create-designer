<template>
    <a-input class="_fd-language-input" :class="{'is-variable': isVar}" :placeholder="placeholder" :disabled="disabled"
             :value="modelValue"
             @update:value="onInput"
             @blur="$emit('blur')"
             :size="size || 'small'">
        <template #addonAfter v-if="showLanguage !== false">
            <a-popover v-model:open="popVisible" placement="bottomLeft" trigger="click" overlayClassName="_fd-language-popover">
                <i class="fc-icon icon-language"></i>
                <template #content>
                    <div class="_fd-language-list">
                        <div class="_fd-language-header">
                            <div class="_fd-language-title">
                                {{ t('language.select') }}<i class="fc-icon icon-setting" @click="openConfig"></i>
                            </div>
                            <div class="_fd-language-name">
                                <template v-for="item in localeList" :key="item.value">
                                    <div>{{ item.label }}</div>
                                </template>
                            </div>
                        </div>
                        <template v-for="lang in language" :key="lang.key">
                            <div class="_fd-language-item" @click="clickLang(lang.key)">
                                <template v-for="item in localeList" :key="item.value">
                                    <div>{{ lang[item.value] || '-' }}</div>
                                </template>
                            </div>
                        </template>
                    </div>
                </template>
            </a-popover>
        </template>
    </a-input>
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
    data() {
        return {
            popVisible: false,
        }
    },
    computed: {
        isVar() {
            return !!(this.modelValue || '').match(/^\{\{\s*\$t\.(.+)\s*\}\}$/);
        },
        t() {
            return this.designer.setupState.t;
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
        showLanguage() {
            return this.designer.setupState.getConfig('showLanguage');
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
        openConfig() {
            this.designer.setupState.activeModule = 'language';
        },
        clickLang(key) {
            this.onInput(`{{$t.${key}}}`);
            this.popVisible = false;
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
._fd-language-popover {
    width: 300px;
}

._fd-language-list {
    max-height: 320px;
    padding-top: 70px;
    overflow: auto;
}

._fd-language-input .ant-input-group-addon {
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
    flex-direction: column;
    line-height: 1.4;
}

._fd-language-name > div, ._fd-language-item > div {
    flex: 1;
    font-size: 12px;
    padding: 5px;
    min-width: 70px;
}

._fd-language-title {
    margin: 6px 0;
}

._fd-language-title .fc-icon {
    color: #2E73FF;
    cursor: pointer;
    font-size: 14px;
}

._fd-language-name {
    display: flex;
}

._fd-language-name > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #AAAAAA;
}

._fd-language-item {
    cursor: pointer;
}

._fd-language-item:hover {
    color: #2E73FF;
    background-color: rgba(46, 115, 255, 0.05);
}

._fd-language-popover .ant-popover-inner{
    padding: 0 !important;
}
</style>
