<template>
    <div class="_fc_fetch">
        <DragForm v-model:api="api" :modelValue="formValue" :rule="rule" :option="option" @change="input"/>
    </div>
</template>

<script>
import debounce from '@form-create/utils/lib/debounce';
import is from '@form-create/utils/lib/type';
import {designerForm} from '../utils/form';
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'Fetch',
    props: {
        modelValue: [Object, String],
        to: String,
    },
    components: {
        DragForm: designerForm.$form(),
    },
    inject: ['designer'],
    computed: {
        formValue() {
            const val = this.modelValue;
            if (!val) return {};
            if (is.String(val)) {
                return {
                    action: val
                };
            }
            return val;
        }
    },
    data() {
        const t = this.designer.setupState.t;
        return {
            api: {},
            fetch: {},
            t,
            option: {
                form: {
                    labelPosition: 'right',
                    size: 'small',
                    labelWidth: '90px'
                },
                submitBtn: false,
            },
            rule: [
                {
                    type: 'input',
                    field: 'action',
                    title: t('fetch.action') + ': ',
                    validate: [{required: true, message: t('fetch.actionRequired')}]
                },
                {
                    type: 'select',
                    field: 'method',
                    title: t('fetch.method') + ': ',
                    value: 'GET',
                    options: [
                        {label: 'GET', value: 'GET'},
                        {label: 'POST', value: 'POST'},
                    ],
                    control: [
                        {
                            value: 'POST',
                            rule: [
                                {
                                    type: 'select',
                                    field: 'dataType',
                                    title: t('fetch.dataType') + ': ',
                                    value: 'FormData',
                                    options: [
                                        {label: 'FormData', value: 'FormData'},
                                        {label: 'JSON', value: 'JSON'},
                                    ]
                                },
                            ]
                        }
                    ]
                },
                {
                    type: 'Struct',
                    field: 'data',
                    title: t('fetch.data') + ': ',
                    value: {},
                    props: {
                        defaultValue: {},
                    }
                },
                {
                    type: 'Struct',
                    field: 'headers',
                    title: t('fetch.headers') + ': ',
                    value: {},
                    props: {
                        defaultValue: {},
                    }
                },
                {
                    type: 'Struct',
                    field: 'parse',
                    title: t('fetch.parse') + ': ',
                    info: t('fetch.parseInfo'),
                    value: null,
                    props: {
                        defaultValue: function parse(res){
                            return res
},
                    }
                },
                // {
                //     type: 'input',
                //     field: '_parse',
                //     title: t('fetch.parse') + ': ',
                //     info: t('fetch.parseInfo'),
                //     value: 'function (res){\n   return res.data;\n}',
                //     props: {
                //         type: 'textarea',
                //         rows: 8,
                //     },
                //     validate: [{
                //         validator: (_, v, cb) => {
                //             if (!v) return cb();
                //             try {
                //                 this.parseFn(v);
                //             } catch (e) {
                //                 return cb(false);
                //             }
                //             cb();
                //         }, message: t('fetch.parseValidate')
                //     }]
                // },
            ]
        };
    },
    methods: {
        parseFn(v) {
            return (new Function('return ' + v))();
        },
        _input() {
            this.api.submit((formData) => {
                formData.to = this.to || 'options';
                // if (formData._parse) formData.parse = this.parseFn(formData._parse);
                this.$emit('update:modelValue', formData);
            });
        },
        input: debounce(function () {
            this._input();
        }, 1000),
    },
    mounted() {
        this._input();
    }
});
</script>
<style>
._fc_fetch .el-form-item__label {
    float: left;
    display: inline-block;
    text-align: right;
    padding-right: 5px;
}

._fc_fetch {
    background-color: #bfdaf7;
    padding: 10px;
}
</style>
