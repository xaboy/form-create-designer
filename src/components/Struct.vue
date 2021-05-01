<template>
  <div class="_fc_struct">
    <ElButton @click="visible=true" style="width: 100%;">{{ title }}</ElButton>
    <ElDialog :title="title" :visible.sync="visible" :close-on-click-modal="false" append-to-body>
      <div ref="editor" v-if="visible"></div>
      <span slot="footer" class="dialog-footer">
                <span style="color: red;float:left;" v-if="err">输入内容格式有误!</span>
                <ElButton @click="visible = false" size="small">取 消</ElButton>
                <ElButton type="primary" @click="onOk" size="small">确 定</ElButton>
            </span>
    </ElDialog>
  </div>
</template>

<script>
import jsonlint from 'jsonlint-mod';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/lint/lint.css';
import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/json-lint';
import 'codemirror/mode/javascript/javascript';

export default {
    name: 'Struct',
    props: {
        value: [Object, Array],
        title: {
            type: String,
            default: '编辑数据'
        },
        defaultValue: {
            require: false
        },
    },
    data() {
        return {
            editor: null,
            visible: false,
            err: false,
        };
    },
    watch: {
        value() {
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
            const val = JSON.stringify(this.value || this.defaultValue, null, 2);
            this.$nextTick(() => {
                this.editor = CodeMirror(this.$refs.editor, {
                    lineNumbers: true,
                    mode: 'application/json',
                    gutters: ['CodeMirror-lint-markers'],
                    lint: true,
                    line: true,
                    tabSize: 2,
                    lineWrapping: true,
                    value: val || ''
                });
                this.editor.on('blur', () => {
                    this.err = this.editor.state.lint.marked.length > 0;
                });
            });
        },
        onOk() {
            if (this.err) return;
            this.visible = false;
            const val = JSON.parse(this.editor.getValue());
            if (JSON.stringify(val) !== JSON.stringify(this.defaultValue)) {
                this.$emit('input', val);
            }
        },
    },
    beforeCreate() {
        window.jsonlint = jsonlint;
    }
};
</script>

<style>
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
</style>