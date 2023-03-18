<template>
    <div class="_fc_struct">
        <ElButton @click="visible=true" style="width: 100%;">{{ title }}</ElButton>
        <ElDialog :title="title" :visible.sync="visible" :close-on-click-modal="false" append-to-body>
            <div ref="editor" v-if="visible"></div>
            <span slot="footer" class="dialog-footer">
                <span class="_fc_err" v-if="err">
                    输入内容格式有误{{ err !== true ? err : '' }}</span>
                <ElButton @click="visible = false" size="small">取 消</ElButton>
                <ElButton type="primary" @click="onOk" size="small">确 定</ElButton>
            </span>
        </ElDialog>
    </div>
</template>

<script>
import 'codemirror/lib/codemirror.css';
import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/mode/javascript/javascript';
import {deepParseFn, toJSON} from '../utils/index';
import {deepCopy} from '@form-create/utils/lib/deepextend';

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
        validate: Function,
    },
    data() {
        return {
            editor: null,
            visible: false,
            err: false,
            oldVal: null,
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
            const val = toJSON(this.value ? deepParseFn(deepCopy(this.value)) : this.defaultValue);
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
                val = eval('(function (){return ' + str + '}())');
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
                this.$emit('input', val);
            }
        },
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

._fc_err {
    color: red;
    float: left;
    text-align: left;
    width: 65%;
}
</style>
