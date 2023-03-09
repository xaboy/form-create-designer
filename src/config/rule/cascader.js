import uniqueId from '@form-create/utils/lib/unique';
import {makeOptionsRule, makeRequiredRule} from '../../utils/index';

const label = '级联选择器';
const name = 'cascader';

export default {
    icon: 'icon-cascader',
    label,
    name,
    rule() {
        return {
            type: name,
            field: uniqueId(),
            title: label,
            info: '',
            effect: {
                fetch: ''
            },
            $required: false,
            props: {
                options: [{
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [{
                            value: 'yizhi',
                            label: '一致'
                        }, {
                            value: 'fankui',
                            label: '反馈'
                        }, {
                            value: 'xiaolv',
                            label: '效率'
                        }, {
                            value: 'kekong',
                            label: '可控'
                        }]
                    }, {
                        value: 'daohang',
                        label: '导航',
                        children: [{
                            value: 'cexiangdaohang',
                            label: '侧向导航'
                        }, {
                            value: 'dingbudaohang',
                            label: '顶部导航'
                        }]
                    }]
                }, {
                    value: 'zujian',
                    label: '组件',
                    children: [{
                        value: 'basic',
                        label: 'Basic',
                        children: [{
                            value: 'layout',
                            label: 'Layout 布局'
                        }, {
                            value: 'color',
                            label: 'Color 色彩'
                        }, {
                            value: 'typography',
                            label: 'Typography 字体'
                        }, {
                            value: 'icon',
                            label: 'Icon 图标'
                        }, {
                            value: 'button',
                            label: 'Button 按钮'
                        }]
                    }, {
                        value: 'form',
                        label: 'Form',
                        children: [{
                            value: 'radio',
                            label: 'Radio 单选框'
                        }, {
                            value: 'checkbox',
                            label: 'Checkbox 多选框'
                        }, {
                            value: 'input',
                            label: 'Input 输入框'
                        }, {
                            value: 'input-number',
                            label: 'InputNumber 计数器'
                        }, {
                            value: 'select',
                            label: 'Select 选择器'
                        }, {
                            value: 'cascader',
                            label: 'Cascader 级联选择器'
                        }, {
                            value: 'switch',
                            label: 'Switch 开关'
                        }, {
                            value: 'slider',
                            label: 'Slider 滑块'
                        }, {
                            value: 'time-picker',
                            label: 'TimePicker 时间选择器'
                        }, {
                            value: 'date-picker',
                            label: 'DatePicker 日期选择器'
                        }, {
                            value: 'datetime-picker',
                            label: 'DateTimePicker 日期时间选择器'
                        }, {
                            value: 'upload',
                            label: 'Upload 上传'
                        }, {
                            value: 'rate',
                            label: 'Rate 评分'
                        }, {
                            value: 'form',
                            label: 'Form 表单'
                        }]
                    }]
                }]
            }
        };
    },
    props() {
        return [
            makeRequiredRule(),
            makeOptionsRule('props.options', false),
            {
                type: 'Object',
                field: 'props',
                title: '配置选项',
                props: {
                    rule: [{
                        type: 'select',
                        field: 'expandTrigger',
                        title: '次级菜单的展开方式',
                        options: [{label: 'click', value: 'click'}, {label: 'hover', value: 'hover'}]
                    }, {type: 'switch', field: 'multiple', title: '是否多选'}, {
                        type: 'switch',
                        field: 'checkStrictly',
                        title: '是否严格的遵守父子节点不互相关联'
                    }, {
                        type: 'switch',
                        field: 'emitPath',
                        title: '在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值',
                        value: true
                    }, {type: 'input', field: 'value', title: '指定选项的值为选项对象的某个属性值'}, {
                        type: 'input',
                        field: 'label',
                        title: '指定选项标签为选项对象的某个属性值'
                    }, {type: 'input', field: 'children', title: '指定选项的子选项为选项对象的某个属性值'}, {
                        type: 'input',
                        field: 'disabled',
                        title: '指定选项的禁用为选项对象的某个属性值'
                    }, {type: 'input', field: 'leaf', title: '指定选项的叶子节点的标志位为选项对象的某个属性值'}]
                }
            }, {
                type: 'select',
                field: 'size',
                title: '尺寸',
                options: [{label: 'medium', value: 'medium'}, {label: 'small', value: 'small'}, {
                    label: 'mini',
                    value: 'mini'
                }]
            }, {type: 'input', field: 'placeholder', title: '输入框占位文本'}, {
                type: 'switch',
                field: 'disabled',
                title: '是否禁用'
            }, {type: 'switch', field: 'clearable', title: '是否支持清空选项'}, {
                type: 'switch',
                field: 'showAllLevels',
                title: '输入框中是否显示选中值的完整路径',
                value: true
            }, {type: 'switch', field: 'collapseTags', title: '多选模式下是否折叠Tag'}, {
                type: 'input',
                field: 'separator',
                title: '选项分隔符'
            }];
    }
};
