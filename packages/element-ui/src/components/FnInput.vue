<template>
    <div class="_fd-fn-input">
        <el-badge type="warning" is-dot :hidden="!configured">
            <el-button @click="visible=true" size="small">
                <slot>
                    {{t('event.title')}}
                </slot>
            </el-button>
        </el-badge>
        <el-dialog class="_fd-fn-input-dialog _fd-config-dialog" :title="title || t('struct.title')" v-model="visible"
                   destroy-on-close
                   :close-on-click-modal="false"
                   append-to-body width="800px">
            <FnEditor ref="editor" v-model="value" :name="name" :args="args" :body="body" :fnx="fnx"></FnEditor>
            <template #footer>
                <div>
                    <el-button @click="visible = false" size="default">{{ t('props.cancel') }}</el-button>
                    <el-button type="primary" @click="onOk" size="default">{{ t('props.ok') }}</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import {defineComponent} from 'vue';
import FnEditor from './FnEditor.vue';

export default defineComponent({
    name: 'FnInput',
    components: {FnEditor},
    emits: ['update:modelValue', 'change'],
    props: {
        modelValue: [String, Function],
        name: String,
        args: Array,
        title: String,
        body: Boolean,
        fnx: Boolean,
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
            return !!this.modelValue;
        },
    },
    data() {
        return {
            visible: false,
            value: this.modelValue
        };
    },
    watch: {
        modelValue(n){
            this.value = n;
        }
    },
    methods: {
        onOk() {
            if(this.$refs.editor.save()) {
                this.$emit('update:modelValue', this.value);
                this.$emit('change', this.value);
                this.visible = false;
            }
        },
    }
});
</script>

<style>
._fd-fn-input {
    width: 100%;
}

._fd-fn-input .el-badge {
    width: 100%;
}

._fd-fn-input .el-button {
    font-weight: 400;
    width: 100%;
    border-color: #2E73FF;
    color: #2E73FF;
}

._fd-fn-input-dialog .CodeMirror-lint-tooltip {
    z-index: 2021 !important;
}

._fd-fn-input-dialog .el-dialog__body {
    padding: 0px;
    height: 500px;
}
</style>
