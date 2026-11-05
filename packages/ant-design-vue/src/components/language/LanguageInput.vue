<template>
    <a-input class="_fd-language-input" :class="{'is-variable': isVar, 'is-break': hasBreak}" :placeholder="placeholder" :disabled="disabled"
             :readonly="hasBreak"
             :value="modelValue"
             @update:value="onInput"
             @click="onClick"
             @blur="$emit('blur')"
             :size="size || 'small'">
        <template #suffix v-if="html">
            <HtmlEditor ref="htmlEditor" class="_fd-language-html" :modelValue="modelValue" :title="t('form.info')"
                        @update:modelValue="onInput" @click.stop>
                <i class="fc-icon icon-script"></i>
            </HtmlEditor>
        </template>
        <template #addonAfter v-if="showLanguage !== false">
            <a-popover v-model:open="popVisible" placement="bottomLeft" trigger="click" overlayClassName="_fd-language-popover">
                <i class="fc-icon icon-language"></i>
                <template #content>
                    <div class="_fd-language-list">
                        <div class="_fd-language-header">
                            <div class="_fd-language-title">
                                <div>{{ t('language.select') }}<i class="fc-icon icon-setting" @click="openConfig"></i></div>
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
import HtmlEditor from '../HtmlEditor.vue';

export default defineComponent({
    name: 'LanguageInput',
    inject: ['designer'],
    components: {HtmlEditor},
    emits: ['update:modelValue', 'blur', 'change'],
    props: {
        size: String,
        placeholder: String,
        modelValue: String,
        disabled: Boolean,
        html: Boolean,
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
        hasBreak() {
            return this.html && /[\r\n]/.test(this.modelValue || '');
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
        },
        onClick(e) {
            if (!this.hasBreak || this.disabled) {
                return;
            }
            if (e.target.closest('.ant-input-group-addon, ._fd-language-html')) {
                return;
            }
            this.$refs.htmlEditor.open();
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
    overflow: auto;
}

._fd-language-input ._fd-language-html._fd-html-editor {
    width: auto;
    display: inline-flex;
    line-height: 1;
}

._fd-language-input ._fd-language-html ._fd-html-editor-trigger {
    display: inline-flex;
    line-height: 1;
}

._fd-language-html .fc-icon {
    cursor: pointer;
    font-size: 14px;
    color: #AAAAAA;
}

._fd-language-html .fc-icon:hover {
    color: #2E73FF;
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

._fd-language-input.is-break input {
    cursor: pointer;
}

._fd-language-header, ._fd-language-item {
    display: flex;
    border-bottom: 1px solid #ECECEC;
}

._fd-language-header {
    font-weight: 500;
    overflow: hidden;
    color: #262626;
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #FFFFFF;
    flex-direction: column;
    border-bottom: none;
    line-height: 1.4;
}

._fd-language-name > div, ._fd-language-item > div {
    flex: 1;
    font-size: 12px;
    line-height: 18px;
    padding: 8px 12px;
    min-width: 0;
    word-break: break-word;
}

._fd-language-name > div + div,
._fd-language-item > div + div {
    border-left: 1px solid #ECECEC;
}

._fd-language-title {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
    margin: 0;
    padding: 10px 12px 8px;
}

._fd-language-title > div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    line-height: 20px;
}

._fd-language-title .ant-input {
    width: 100%;
}

._fd-language-title .fc-icon {
    color: #2E73FF;
    cursor: pointer;
    font-size: 14px;
}

._fd-language-name {
    display: flex;
    background: #F5F5F5;
    border-top: 1px solid #ECECEC;
    border-bottom: 1px solid #ECECEC;
}

._fd-language-name > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #AAAAAA;
    font-weight: 400;
}

._fd-language-item {
    cursor: pointer;
    align-items: flex-start;
}

._fd-language-empty {
    color: #AAAAAA;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
}

._fd-language-item:hover {
    color: #2E73FF;
    background-color: rgba(46, 115, 255, 0.05);
}

._fd-language-popover .ant-popover-inner{
    padding: 0 !important;
}
</style>
