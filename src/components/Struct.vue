<template>
    <div class="_fd-struct">
        <el-badge type="warning" is-dot :hidden="!configured">
            <el-button @click="visible=true" size="mini">{{ title || t('struct.title') }}</el-button>
        </el-badge>
        <el-dialog class="_fd-struct-con" :title="title || t('struct.title')" :visible.sync="visible" destroy-on-close
                  :close-on-click-modal="false"
                  append-to-body>
            <div ref="editor" v-if="visible"></div>
            <template #footer>
                <div>
                    <el-button @click="visible = false" size="small">{{ t('props.cancel') }}</el-button>
                    <el-button type="primary" @click="onOk" size="small" color="#2f73ff">{{ t('props.ok') }}</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import 'codemirror/lib/codemirror.css';
import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/mode/javascript/javascript';
import {deepParseFn, toJSON, empty} from '../utils/index';
import {deepCopy} from '@form-create/utils/lib/deepextend';
import {defineComponent, markRaw} from 'vue';
import errorMessage from '../utils/message';

export default defineComponent({
    name: 'Struct',
    emits: ['input'],
    props: {
        value: [Object, Array, Function],
        title: String,
        defaultValue: {
            require: false
        },
        validate: Function,
    },
    inject: ['designer'],
    computed: {
        t() {
            return this.designer.t;
        },
        configured() {
            return !empty(this.value);
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
        value() {
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
            const val = toJSON(deepParseFn(this.value ? deepCopy(this.value) : this.defaultValue));
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
        onOk() {
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
                errorMessage(this.t('struct.errorMsg'));
                return false;
            }
            this.visible = false;
            if (toJSON(val, null, 2) !== this.oldVal) {
                this.$emit('input', val);
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

._fd-struct .el-badge {
    width: 100%;
}

._fd-struct .el-button {
    font-weight: 400;
    width: 100%;
    border-color: #2E73FF;
    color: #2E73FF;
}

._fd-struct .CodeMirror {
    height: 450px;
}

._fd-struct .CodeMirror-line {
    line-height: 16px !important;
    font-size: 13px !important;
}

._fd-struct-con .CodeMirror-lint-tooltip {
    z-index: 2021 !important;
}

._fd-struct-con .el-dialog__body {
    padding: 0px 20px;
}
</style>
