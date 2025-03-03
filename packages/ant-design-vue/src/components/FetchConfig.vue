<template>
    <div class="_fd-fetch-config">
        <a-badge color="orange" :dot="configured">
            <a-button class="_fd-plain-button" type="primary" size="small" ghost @click="visible=true">{{ t('struct.title') }}
            </a-button>
        </a-badge>
        <a-modal class="_fd-fetch-dialog _fd-config-dialog" v-model:open="visible"
                 centered :maskClosable="false" :destroyOnClose="true"
                 width="980px">
            <template #title>
                {{ t('fetch.optionsType.fetch') }}
                <Warning :tooltip="t('warning.fetch')"></Warning>
            </template>
            <a-layout class="_fd-fetch-con" style="height: 450px;">
                <a-tabs class="_fc-tabs">
                    <a-tab-pane :tab="t('fetch.config')" key="first" style="padding-right: 15px;">
                        <DragForm v-model:api="form.api" v-model="form.formData" :rule="form.rule"
                                  :option="form.options">
                            <template #title="scope">
                                <template v-if="scope.rule.warning">
                                    <Warning :tooltip="scope.rule.warning">
                                        {{ scope.rule.title }}
                                    </Warning>
                                </template>
                                <template v-else>
                                    {{scope.rule.title}}
                                </template>
                            </template>
                        </DragForm>
                    </a-tab-pane>
                    <a-tab-pane lazy key="second">
                        <template #tab>
                            {{ t('fetch.parse') }}
                            <Warning :tooltip="t('warning.fetchParse')"></Warning>
                        </template>
                        <FnEditor style="height: 100%;" v-model="form.parse" name="parse"
                                  :args="[{name:'res', info: t('fetch.response')}, 'rule', 'api']"
                                  ref="parse"></FnEditor>
                    </a-tab-pane>
                    <a-tab-pane lazy :tab="t('fetch.onError')" key="third">
                        <FnEditor style="height: 100%;" v-model="form.onError" name="onError"
                                  :args="['e']"
                                  ref="error"></FnEditor>
                    </a-tab-pane>
                </a-tabs>
            </a-layout>
            <template #footer>
                <div>
                    <a-button @click="visible = false" size="middle">{{ t('props.cancel') }}</a-button>
                    <a-button type="primary" @click="save" size="middle">{{ t('props.ok') }}</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>

<script>
import {deepCopy} from '@form-create/utils/lib/deepextend';
import FnEditor from './FnEditor.vue';
import StructEditor from './StructEditor.vue';
import {defineComponent} from 'vue';
import {designerForm} from '../utils/form';
import errorMessage from '../utils/message';
import is from '@form-create/utils/lib/type';
import Warning from './Warning.vue';

const makeRule = (t) => {
    return [
        {
            type: 'input',
            field: 'action',
            title: t('fetch.action'),
            value: '',
            validate: [{required: true, message: t('fetch.actionRequired'), trigger: 'blur'}],
        },
        {
            type: 'radio',
            field: 'method',
            title: t('fetch.method'),
            value: 'GET',
            options: [
                {label: 'GET', value: 'GET'},
                {label: 'POST', value: 'POST'},
            ],
            $required: true,
        },
        {
            type: 'radio',
            field: 'dataType',
            title: t('fetch.dataType'),
            warning: t('warning.fetchDataType'),
            value: 'json',
            options: [
                {label: 'JSON', value: 'json'},
                {label: 'FormData', value: 'formData'},
            ],
            $required: true,
        },
        {
            type: 'TableOptions',
            field: 'headers',
            title: t('fetch.headers'),
            value: {},
            props: {
                column: [{label: t('props.key'), key: 'label'}, {label: t('props.value'), key: 'value'}],
                valueType: 'object',
                size: 'default'
            },
        },
        {
            type: 'TableOptions',
            field: 'query',
            title: t('fetch.query'),
            warning: t('warning.fetchQuery'),
            value: {},
            props: {
                column: [{label: t('props.key'), key: 'label'}, {label: t('props.value'), key: 'value'}],
                valueType: 'object',
                size: 'default'
            },
        },
        {
            type: 'TableOptions',
            field: 'data',
            title: t('fetch.data'),
            warning: t('warning.fetchData'),
            value: {},
            props: {
                column: [{label: t('props.key'), key: 'label'}, {label: t('props.value'), key: 'value'}],
                valueType: 'object',
                size: 'default'
            },
        }];
}

export default defineComponent({
    name: 'FetchConfig',
    emits: ['update:modelValue'],
    props: {
        modelValue: [Object, String],
        to: String,
    },
    components: {
        Warning,
        DragForm: designerForm.$form(),
        FnEditor,
        StructEditor
    },
    inject: ['designer'],
    data() {
        return {
            visible: false,
            value: deepCopy(this.modelValue || {}),
            form: {
                api: {},
                formData: {},
                rule: [],
                options: {
                    form: {
                        labelWidth: '90px',
                        size: 'default'
                    },
                    submitBtn: false,
                    resetBtn: false,
                }
            }
        };
    },
    computed: {
        t() {
            return this.designer.setupState.t;
        },
        configured() {
            return !is.empty(this.modelValue);
        },
    },
    watch: {
        visible(v) {
            if (v) {
                this.value = deepCopy(this.modelValue || {});
                this.active();
            }
        },
    },
    methods: {
        open() {
            this.visible = true;
        },
        active() {
            const formData = this.value;
            this.form.rule = formData.type === 'static' ? [] : makeRule(this.t);
            this.form.formData = {...formData};
            this.form.label = formData.label;
            this.form.type = formData.type;
            this.form.data = formData.data;
            this.form.dataType = formData.dataType;
            this.form.parse = formData.parse || '';
            this.form.onError = formData.onError || '';
        },
        save() {
            this.form.api.validate().then(() => {
                const formData = {...this.form.formData};
                if ((this.$refs.parse && !this.$refs.parse.save()) || (this.$refs.error && !this.$refs.error.save())) {
                    return;
                }
                formData.parse = this.form.parse;
                formData.onError = this.form.onError;
                formData.label = this.form.label;
                formData.type = this.form.type;
                formData.to = this.to || 'options';
                this.$emit('update:modelValue', formData);
                this.visible = false;
            }).catch(err => {
                console.error(err);
                errorMessage(err.errorFields[0].errors[0]);
            });
        },
    },
    created() {
        this.active();
    }
});
</script>

<style>
._fd-fetch-config, ._fd-fetch-config .ant-badge {
    width: 100%;
}

._fd-fetch-config .ant-btn {
    font-weight: 400;
    width: 100%;
    font-size: 12px;
}

._fd-fetch-dialog .form-create {
    margin-top: 15px;
}

._fd-fetch-dialog ._fc-tabs {
    display: flex;
}

._fd-fetch-info {
    display: flex;
    font-size: 12px;
    position: relative;
    margin-top: 8px;
    margin-left: 15px;
    padding: 8px 13px;
    line-height: 18px;
    background: rgba(170, 170, 170, 0.1);
    border-radius: 6px;
    color: #666666;
}

._fd-fetch-con {
    background: #FFFFFF;
}

._fd-fetch-con .CodeMirror {
    height: 100%;
    width: 100%;
}

._fd-fetch-con .CodeMirror-wrap pre.CodeMirror-line {
    padding-left: 20px;
}
</style>