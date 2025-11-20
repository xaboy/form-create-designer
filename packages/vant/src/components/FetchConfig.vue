<template>
    <div class="_fd-gfc">
        <el-badge type="warning" is-dot :hidden="!configured">
            <el-button @click="visible=true" size="small">{{ t('struct.title') }}</el-button>
        </el-badge>
        <el-dialog class="_fd-gfc-dialog" v-model="visible" destroy-on-close
                   :close-on-click-modal="false"
                   append-to-body
                   width="1080px">
            <template #header>
                {{ t('fetch.optionsType.fetch') }}
                <Warning :tooltip="t('warning.fetch')"></Warning>
            </template>
            <el-container class="_fd-gfc-con" style="height: 600px;">
                <el-tabs model-value="first" class="_fc-tabs" style="width: 100%">
                    <el-tab-pane :label="t('fetch.config')" name="first">
                        <DragForm v-model:api="form.api" v-model="form.formData" :rule="form.rule"
                                  :option="form.options">
                            <template #title="scope">
                                <template v-if="scope.rule.warning">
                                    <Warning :tooltip="scope.rule.warning">
                                        {{ scope.rule.title }}
                                    </Warning>
                                </template>
                                <template v-else>
                                    {{ scope.rule.title }}
                                </template>
                            </template>
                        </DragForm>
                        <div class="_fd-fetch-preview">
                            <div class="_fd-fetch-preview-header">
                                <span class="_fd-fetch-preview-title">{{ t('fetch.preview') }}</span>
                                <el-button size="small" type="primary" @click="previewData" :loading="previewLoading">
                                    {{ t('fetch.test') }}
                                </el-button>
                            </div>
                            <div class="_fd-fetch-preview-content">
                                <div v-if="!previewResult" class="_fd-fetch-preview-empty">
                                    {{ t('fetch.previewEmpty') }}
                                </div>
                                <div v-else class="_fd-fetch-preview-result">
                                    <div class="_fd-fetch-preview-status">
                                        <el-tag disable-transitions
                                                :type="previewResult.success ? 'success' : 'danger'">
                                            {{ previewResult.success ? t('props.success') : t('props.error') }}
                                        </el-tag>
                                        <span class="_fd-fetch-preview-time">{{ previewResult.time }}ms</span>
                                    </div>
                                    <div class="_fd-fetch-preview-data">
                                        <pre>{{ previewResult.data }}</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane lazy :label="t('fetch.beforeFetch')" name="second">
                        <template #label>
                            {{ t('fetch.beforeFetch') }}
                            <Warning :tooltip="t('warning.beforeFetch')"></Warning>
                        </template>
                        <FnEditor style="height: 415px;" v-model="form.beforeFetch" name="beforeFetch"
                                  :args="['config', 'data']"
                                  ref="beforeFetch"></FnEditor>
                    </el-tab-pane>
                    <el-tab-pane lazy name="third">
                        <template #label>
                            {{ t('fetch.parse') }}
                            <Warning :tooltip="t('warning.fetchParse')"></Warning>
                        </template>
                        <FnEditor style="height: 415px;" v-model="form.parse" name="parse"
                                  :args="[{name:'res', info: t('fetch.response')}, 'rule', 'api']"
                                  ref="parse"></FnEditor>
                    </el-tab-pane>
                    <el-tab-pane lazy :label="t('fetch.onError')" name="fourth">
                        <FnEditor style="height: 415px;" v-model="form.onError" name="onError"
                                  :args="['e']"
                                  ref="error"></FnEditor>
                    </el-tab-pane>
                </el-tabs>
            </el-container>
            <template #footer>
                <div>
                    <el-button size="default" @click="visible=false">{{ t('props.cancel') }}</el-button>
                    <el-button type="primary" size="default" @click="save" color="#2f73ff">{{
                            t('props.ok')
                        }}
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import {deepCopy} from '@form-create/utils/lib/deepextend';
import FnEditor from './FnEditor.vue';
import StructEditor from './StructEditor.vue';
import {defineComponent} from 'vue';
import {elmFormCreate as designerForm} from '../utils/form';
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
            props: {size: 'default'},
            validate: [{required: true, message: t('fetch.actionRequired'), trigger: 'blur'}]
        },
        {
            type: 'radio',
            field: 'method',
            title: t('fetch.method'),
            value: 'GET',
            props: {
                size: 'default'
            },
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
            props: {
                size: 'default'
            },
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
            },
            previewLoading: false,
            previewResult: null
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
            this.form.beforeFetch = formData.beforeFetch || '';
            this.form.onError = formData.onError || '';
        },
        save() {
            this.form.api.validate().then(() => {
                const formData = {...this.form.formData};
                if ((this.$refs.parse && !this.$refs.parse.save()) || (this.$refs.beforeFetch && !this.$refs.beforeFetch.save()) || (this.$refs.error && !this.$refs.error.save())) {
                    return;
                }
                formData.parse = designerForm.parseFn(this.form.parse);
                formData.beforeFetch = designerForm.parseFn(this.form.beforeFetch);
                formData.onError = this.form.onError;
                formData.label = this.form.label;
                formData.type = this.form.type;
                formData.to = this.to || 'options';
                this.$emit('update:modelValue', formData);
                this.visible = false;
            }).catch(err => {
                console.error(err);
                errorMessage(err[Object.keys(err)[0]][0].message);
            });
        },
        previewData() {
            this.form.api.validate().then(() => {
                this.previewLoading = true;
                this.previewResult = null;
                const startTime = Date.now();
                const formData = {...this.form.formData};
                delete formData.beforeFetch;
                delete formData.parse;
                delete formData.onError;
                if (this.form.beforeFetch) {
                    formData.beforeFetch = designerForm.parseFn(this.form.beforeFetch);
                }
                this.designer.setupState.dragForm.api
                    .fetch(formData)
                    .then(response => {
                        const endTime = Date.now();
                        this.previewResult = {
                            success: true,
                            time: endTime - startTime,
                            data: JSON.stringify(response, null, 2),
                        };
                        this.previewLoading = false;
                    })
                    .catch(() => {
                        const endTime = Date.now();
                        this.previewResult = {
                            success: false,
                            time: endTime - startTime,
                            data: this.t('fetch.requestFailed'),
                        };
                        this.previewLoading = false;
                    });
            });
        },
    },
    created() {
        this.active();
    }
});
</script>

<style>
._fd-gfc, ._fd-gfc .el-badge {
    width: 100%;
}

._fd-gfc .el-button {
    font-weight: 400;
    width: 100%;
    border-color: #2E73FF;
    color: #2E73FF;
}

._fd-gfc-dialog .el-tabs__header {
    margin-bottom: 0;
}

._fd-gfc-dialog .form-create {
    margin-top: 15px;
}

._fd-gfc-con .CodeMirror {
    height: 100%;
    width: 100%;
}

._fd-gfc-con .CodeMirror-wrap pre.CodeMirror-line {
    padding-left: 20px;
}

._fd-fetch-preview {
    margin-top: 20px;
    margin-left: 15px;
    border: 1px solid #ececec;
    border-radius: 6px;
    background: #ffffff;
}

._fd-fetch-preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 15px;
    border-bottom: 1px solid #ececec;
    background: #f5f5f5;
    border-radius: 6px 6px 0 0;
}

._fd-fetch-preview-title {
    font-size: 14px;
    font-weight: 500;
    color: #262626;
}

._fd-fetch-preview-content {
    padding: 15px;
    min-height: 120px;
    max-height: 300px;
    overflow-y: auto;
}

._fd-fetch-preview-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90px;
    color: #aaaaaa;
    font-size: 13px;
    background: rgba(170, 170, 170, 0.05);
    border-radius: 4px;
    border: 1px dashed #ececec;
}

._fd-fetch-preview-result {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

._fd-fetch-preview-status {
    display: flex;
    align-items: center;
    gap: 10px;
}

._fd-fetch-preview-time {
    font-size: 12px;
    color: #aaaaaa;
    font-family: monospace;
}

._fd-fetch-preview-data {
    background: #f5f5f5;
    border: 1px solid #ececec;
    border-radius: 4px;
    padding: 10px;
    max-height: 200px;
    overflow-y: auto;
}

._fd-fetch-preview-data pre {
    margin: 0;
    font-size: 12px;
    line-height: 1.4;
    color: #666666;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    white-space: pre-wrap;
    word-break: break-word;
}
</style>
