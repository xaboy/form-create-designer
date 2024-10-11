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

export default defineComponent({
    name: 'StructEditor',
    props: {
        modelValue: [Object, Array, Function],
        defaultValue: {
            require: false
        }
    },
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
            return this.designer.setupState.t;
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.load();
        });
    },
    methods: {
        load() {
            const val = this.modelValue ? toJSON(this.modelValue) : '';
            this.oldVal = val;
            this.$nextTick(() => {
                this.editor = markRaw(CodeMirror(this.$refs.editor, {
                    lineNumbers: true,
                    mode: 'javascript',
                    lint: true,
                    line: true,
                    tabSize: 2,
                    lineWrapping: true,
                    value: val || ''
                }));
            });
        },
        save() {
            const str = this.editor.getValue();
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
            if (toJSON(val, null, 2) !== this.oldVal) {
                this.$emit('update:modelValue', val);
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
