<template>
    <div class="_fd-struct-editor">
        <div ref="editor"></div>
    </div>
</template>

<script>
import 'codemirror/lib/codemirror.css';
import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/mode/javascript/javascript';
import {toJSON} from '../utils/index';
import {defineComponent, markRaw} from 'vue';
import errorMessage from '../utils/message';
import {designerForm} from '../utils/form';
import beautify from 'js-beautify';

export default defineComponent({
    name: 'StructEditor',
    props: {
        value: [Object, Array, Function],
        format: Boolean,
        defaultValue: {
            require: false
        }
    },
    emits: ['blur', 'focus', 'input'],
    inject: ['designer'],
    data() {
        return {
            editor: null,
            visible: false,
            err: false,
            oldVal: null,
        };
    },
    computed: {
        t() {
            return this.designer.t;
        },
    },
    watch: {
        value(n) {
            if (this.editor) {
                const val = n ? this.toJson(n) : '';
                this.oldVal = val;
                const scrollInfo = this.editor.getScrollInfo();
                const scrollTop = scrollInfo.top;
                this.editor.setValue(val);
                this.editor.scrollTo(0, scrollTop);
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.load();
        });
    },
    methods: {
        toJson(val) {
            return this.format ? designerForm.toJson(val, 2) : toJSON(val);
        },
        load() {
            const val = this.value ? this.toJson(this.value) : '';
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
                this.editor.on('blur', () => {
                    this.$emit('blur');
                });
                this.editor.on('focus', () => {
                    this.$emit('focus');
                });
            });
        },
        save() {
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
                this.err = true;
                return false;
            }
            this.visible = false;
            if (this.toJson(val) !== this.oldVal) {
                this.$emit('input', val);
            }
            return true;
        },
    }
});
</script>

<style>
._fd-struct-editor {
    flex: 1;
    width: 100%;
}

._fd-struct-editor > div {
    height: 100%;
}
</style>
