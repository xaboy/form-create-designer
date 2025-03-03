<template>
    <div class="_fd-fn-input">
        <a-badge color="orange" :dot="configured">
            <a-button class="_fd-plain-button" type="primary" size="small" ghost @click="visible=true">
                <slot>
                    {{t('event.title')}}
                </slot>
            </a-button>
        </a-badge>
        <a-modal class="_fd-fn-input-dialog _fd-config-dialog" :title="title || t('struct.title')"
                 v-model:open="visible"
                 centered :maskClosable="false" :destroyOnClose="true"
                 width="800px">
            <FnEditor ref="editor" v-model="value" :name="name" :args="args" :body="body" :fnx="fnx"></FnEditor>
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
        modelValue(n) {
            this.value = n;
        }
    },
    methods: {
        onOk() {
            if (this.$refs.editor.save()) {
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

._fd-fn-input .ant-badge {
    width: 100%;
}

._fd-fn-input .ant-btn {
    font-weight: 400;
    width: 100%;
    font-size: 12px;
}

._fd-fn-input-dialog .CodeMirror-lint-tooltip {
    z-index: 2021 !important;
}

._fd-fn-input-dialog .ant-modal-body {
    height: 500px;
}
</style>
