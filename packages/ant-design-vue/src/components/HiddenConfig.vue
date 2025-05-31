<template>
    <div class="_fd-struct">
        <a-badge color="orange" :dot="configured">
            <div @click="visible=true">
                <slot>
                    <a-button class="_fd-plain-button" type="primary" size="small" ghost @click="visible=true">
                        {{ title || t('form.setHiddenCondition') }}
                    </a-button>
                </slot>
            </div>
        </a-badge>
        <a-modal class="_fd-struct-dialog _fd-config-dialog" v-model:open="visible" :title="title || t('form.setHiddenCondition')"
                 width="800px" centered :maskClosable="false" :destroyOnClose="true">
            <div ref="editor" v-if="visible"></div>
            <template #footer>
                <div>
                    <a-button @click="visible = false" size="middle">{{ t('props.cancel') }}</a-button>
                    <a-button type="primary" @click="onOk" size="middle">{{ t('props.ok') }}</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>

<script>
import 'codemirror/lib/codemirror.css';
import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/mode/javascript/javascript';
import {deepParseFn, toJSON} from '../utils/index';
import {deepCopy} from '@form-create/utils/lib/deepextend';
import {defineComponent, markRaw} from 'vue';
import is from '@form-create/utils/lib/type';
import errorMessage from '../utils/message';
import beautify from 'js-beautify';

export default defineComponent({
    name: 'HiddenConfig',
    emits: ['update:modelValue'],
    props: {
        modelValue: [Object, Array, Function],
        title: String,
        defaultValue: {
            require: false
        },
        validate: Function,
    },
    inject: ['designer'],
    computed: {
        t() {
            return this.designer.setupState.t;
        },
        configured() {
            return !is.empty(this.modelValue) && Object.keys(this.modelValue).length > 0;
        },
    },
    data() {
        return {
            editor: null,
            visible: false,
            oldVal: null,
        };
    },
    watch: {
        modelValue() {
            this.load();
        },
        visible(n) {
            if (n) {
                this.load();
            }
        },
    },
    methods: {
        load() {
            const val = toJSON(deepParseFn(this.modelValue ? deepCopy(this.modelValue) : this.defaultValue));
            this.oldVal = val;
            this.$nextTick(() => {
                this.editor = markRaw(CodeMirror(this.$refs.editor, {
                    lineNumbers: true,
                    mode: 'javascript',
                    lint: true,
                    line: true,
                    tabSize: 2,
                    lineWrapping: true,
                    value: val ? beautify.js(val, {
                        indent_size: '2',
                        indent_char: ' ',
                        max_preserve_newlines: '5',
                        indent_scripts: 'separate',
                    }) : '',
                }));
            });
        },
        onOk() {
            const str = (this.editor.getValue() || '').trim();
            let val;
            try {
                val = (new Function('return ' + str))();
            } catch (e) {
                console.error(e);
                errorMessage(this.t('struct.errorMsg'));
                return false;
            }
            if (this.validate && false === this.validate(val)) {
                errorMessage(this.t('struct.errorMsg'));
                return false;
            }
            this.visible = false;
            if (toJSON(val, null, 2) !== this.oldVal) {
                this.$emit('update:modelValue', val);
            }
            return true;
        },
    }
});
</script>

<style>
._fd-struct {
    width: 100%;
}

._fd-struct .ant-badge {
    width: 100%;
}

._fd-struct .ant-btn {
    font-weight: 400;
    width: 100%;
    font-size: 12px;
}

._fd-struct-dialog .CodeMirror {
    height: 500px;
}
</style>
