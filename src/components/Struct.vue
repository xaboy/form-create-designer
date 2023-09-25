<template>
    <div class="_fc_struct">
        <ElButton @click="visible=true" style="width: 100%;">{{ title || t('struct.title') }}</ElButton>
        <ElDialog :title="title || t('struct.title')" v-model="visible" :close-on-click-modal="false" append-to-body>
            <div ref="editor" v-if="visible"></div>
            <template #footer>
                <span class="dialog-footer">
                    <span class="_fc_err" v-if="err">
                        {{ t('struct.error') }}{{ err !== true ? err : '' }}</span>
                    <ElButton @click="visible = false" size="small">{{ t('struct.cancel') }}</ElButton>
                    <ElButton type="primary" @click="onOk" size="small">{{ t('struct.submit') }}</ElButton>
                </span>
            </template>
        </ElDialog>
    </div>
</template>

<script>
import 'codemirror/lib/codemirror.css';
import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/mode/javascript/javascript';
import {deepParseFn, toJSON} from '../utils/index';
import {deepCopy} from '@form-create/utils/lib/deepextend';
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'Struct',
    props: {
        modelValue: [Object, Array, Function],
        title: String,
        defaultValue: {
            require: false
        },
        validate: Function,
    },
    inject: ['designer'],
    data() {
        return {
            editor: null,
            visible: false,
            err: false,
            oldVal: null,
            t: this.designer.setupState.t,
        };
    },
    watch: {
        modelValue() {
            this.load();
        },
        visible(n) {
            if (n) {
                this.load();
            } else {
                this.err = false;
            }
        }
    },
    methods: {
        load() {
            const val = toJSON(deepParseFn(this.modelValue ? deepCopy(this.modelValue) : this.defaultValue));
            this.oldVal = val;
            this.$nextTick(() => {
                this.editor = CodeMirror(this.$refs.editor, {
                    lineNumbers: true,
                    mode: 'javascript',
                    gutters: ['CodeMirror-lint-markers'],
                    lint: true,
                    line: true,
                    tabSize: 2,
                    lineWrapping: true,
                    value: val || ''
                });
            });
        },
        onOk() {
            const str = this.editor.getValue();
            let val;
            try {
                val = (new Function('return ' + str))();
            } catch (e) {
                this.err = ` (${e})`;
                return;
            }
            if (this.validate && false === this.validate(val)) {
                this.err = true;
                return;
            }
            this.visible = false;
            if (toJSON(val, null, 2) !== this.oldVal) {
                this.$emit('update:modelValue', val);
            }
        },
    }
});
</script>

<style>
._fc_struct {
    width: 100%;
}

._fc_struct .CodeMirror {
    height: 450px;
}

._fc_struct .CodeMirror-line {
    line-height: 16px !important;
    font-size: 13px !important;
}

.CodeMirror-lint-tooltip {
    z-index: 2021 !important;
}

._fc_struct .el-dialog__body {
    padding: 0px 20px;
}

._fc_err {
    color: red;
    float: left;
    text-align: left;
    width: 65%;
}
</style>
