import uniqueId from '@form-create/utils/lib/unique';
import {localeProps, makeRequiredRule} from '../../utils';

const label = '时间选择器';
const name = 'timePicker';

export default {
    icon: 'icon-time',
    label,
    name,
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('components.timePicker.name'),
            info: '',
            $required: false,
            props: {},
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [makeRequiredRule(), {
            type: 'Struct',
            field: 'pickerOptions',
            title: '当前时间日期选择器特有的选项',
            props: {defaultValue: {}}
        }, {type: 'switch', field: 'readonly', title: '完全只读'}, {
            type: 'switch',
            field: 'disabled',
            title: '禁用'
        }, {type: 'switch', field: 'editable', title: '文本框可输入', value: true}, {
            type: 'switch',
            field: 'clearable',
            title: '是否显示清除按钮',
            value: true
        }, {type: 'input', field: 'placeholder', title: '非范围选择时的占位内容'}, {
            type: 'input',
            field: 'startPlaceholder',
            title: '范围选择时开始日期的占位内容'
        }, {type: 'input', field: 'endPlaceholder', title: '范围选择时开始日期的占位内容'}, {
            type: 'switch',
            field: 'isRange',
            title: '是否为时间范围选择'
        }, {type: 'switch', field: 'arrowControl', title: '是否使用箭头进行时间选择'}, {
            type: 'select',
            field: 'align',
            title: '对齐方式',
            options: [{label: 'left', value: 'left'}, {label: 'center', value: 'center'}, {
                label: 'right',
                value: 'right'
            }]
        }, {type: 'input', field: 'prefixIcon', title: '自定义头部图标的类名'}, {
            type: 'input',
            field: 'clearIcon',
            title: '自定义清空图标的类名'
        }]);
    }
};
