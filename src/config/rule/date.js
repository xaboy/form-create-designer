import uniqueId from '@form-create/utils/lib/unique';
import {localeProps, makeRequiredRule} from '../../utils';

const label = '日期选择器';
const name = 'datePicker';

export default {
    icon: 'icon-date',
    label,
    name,
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('components.datePicker.name'),
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
        }, {
            type: 'select',
            field: 'type',
            title: '显示类型',
            options: [{label: 'year', value: 'year'}, {label: 'month', value: 'month'}, {
                label: 'date',
                value: 'date'
            }, {label: 'dates', value: 'dates'}, {label: 'week', value: 'week'}, {
                label: 'datetime',
                value: 'datetime'
            }, {label: 'datetimerange', value: 'datetimerange'}, {
                label: 'daterange',
                value: 'daterange'
            }, {label: 'monthrange', value: 'monthrange'}]
        }, {type: 'switch', field: 'editable', title: '文本框可输入', value: true}, {
            type: 'switch',
            field: 'clearable',
            title: '是否显示清除按钮',
            value: true
        }, {type: 'input', field: 'placeholder', title: '非范围选择时的占位内容'}, {
            type: 'input',
            field: 'startPlaceholder',
            title: '范围选择时开始日期的占位内容'
        }, {type: 'input', field: 'endPlaceholder', title: '范围选择时结束日期的占位内容'}, {
            type: 'input',
            field: 'format',
            title: '显示在输入框中的格式'
        }, {
            type: 'select',
            field: 'align',
            title: '对齐方式',
            options: [{label: 'left', value: 'left'}, {label: 'center', value: 'center'}, {
                label: 'right',
                value: 'right'
            }, {label: 'left', value: 'left'}]
        }, {type: 'input', field: 'rangeSeparator', title: '选择范围时的分隔符'}, {
            type: 'switch',
            field: 'unlinkPanels',
            title: '在范围选择器里取消两个日期面板之间的联动'
        }, {type: 'input', field: 'prefixIcon', title: '自定义头部图标的类名'}, {
            type: 'input',
            field: 'clearIcon',
            title: '自定义清空图标的类名'
        }]);
    }
};
