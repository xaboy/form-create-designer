<template>
  <div class="_fc_fetch">
    <component :is="FormCreate" v-model="api" :value="formValue" :rule="rule" :option="option" @change="input"/>
  </div>
</template>

<script>
import debounce from '@form-create/utils/lib/debounce';
import is from '@form-create/utils/lib/type';
import {designerForm} from '../utils/form';

export default {
    name: 'Fetch',
    props: {
        value: [Object, String],
        to: String,
    },
    computed: {
        formValue() {
            const val = this.value;
            if (!val) return {};
            if (is.String(val)) {
                return {
                    action: val
                };
            }
            if (!val._parse && val.parse) {
                return {...val, _parse: '' + val.parse};
            } else if(is.Function(val._parse)){
                return {...val, _parse: '' + val._parse};
            }
            return val;
        }
    },
    data() {
        return {
            FormCreate: designerForm.$form(),
            api: {},
            fetch: {},
            option: {
                form: {
                    labelPosition: 'right',
                    size: 'mini',
                    labelWidth: '90px'
                },
                submitBtn: false,
            },
            rule: [
                {
                    type: 'input',
                    field: 'action',
                    title: '接口: ',
                    validate: [{required: true, message: '请数据接口'}]
                },
                {
                    type: 'select',
                    field: 'method',
                    title: '请求方式: ',
                    value: 'GET',
                    options: [
                        {label: 'GET', value: 'GET'},
                        {label: 'POST', value: 'POST'},
                    ],
                    control: [
                        {
                            value:'POST',
                            rule: [
                                {
                                    type: 'select',
                                    field: 'dataType',
                                    title: '提交方式: ',
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
                    title: '附带数据: ',
                    value: {},
                    props: {
                        defaultValue: {},
                    }
                },
                {
                    type: 'Struct',
                    field: 'headers',
                    title: 'header信息: ',
                    value: {},
                    props: {
                        defaultValue: {},
                    }
                },
                {
                    type: 'input',
                    field: '_parse',
                    title: '解析函数',
                    info: '解析接口数据，返回组件所需的数据结构',
                    value: 'function (res){\n   return res.data;\n}',
                    props: {
                        type: 'textarea',
                        rows: 8,
                    },
                    validate: [{
                        validator: (_, v, cb) => {
                            if (!v) return cb();
                            try {
                                this.parseFn(v);
                            } catch (e) {
                                return cb(false);
                            }
                            cb();
                        }, message: '请输入正确的解析函数'
                    }]
                },
            ]
        };
    },
    methods: {
        parseFn(v){
            return eval(`(function(){return ${v} })()`);
        },
        _input() {
            this.api.submit((formData) => {
                formData.to = this.to || 'options';
                if (formData._parse) formData.parse = this.parseFn(formData._parse);
                this.$emit('input', formData);
            });
        },
        input: debounce(function () {
            this._input();
        }, 1000),
    },
    mounted() {
        this._input();
    }
};
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
