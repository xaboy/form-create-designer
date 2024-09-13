<template>
    <div class="_fd-struct">
        <el-badge type="warning" is-dot :hidden="!configured">
            <el-button @click="visible=true" size="small">{{ title || t('struct.title') }}</el-button>
        </el-badge>
        <el-dialog class="_fd-struct-con" :title="title || t('struct.title')" v-model="visible" destroy-on-close
                  :close-on-click-modal="false"
                   append-to-body width="800px">
            <div ref="editor" v-if="visible"></div>
            <template #footer>
                <div>
                    <el-button @click="visible = false" size="default">{{ t('props.cancel') }}</el-button>
                    <el-button type="primary" @click="onOk" size="default" color="#2f73ff">{{ t('props.ok') }}</el-button>
                </div>
            </template>
        </el-dialog>
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

export default defineComponent({
    name: 'Struct',
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
            return !is.empty(this.modelValue);
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

._fd-struct .el-badge {
    width: 100%;
}

._fd-struct .el-button {
    font-weight: 400;
    width: 100%;
    border-color: #2E73FF;
    color: #2E73FF;
}

._fd-struct-con .CodeMirror {
    height: 500px;
}

._fd-struct-con .el-dialog__body {
    padding: 0px;
}
</style>
