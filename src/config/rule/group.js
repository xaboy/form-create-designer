import uniqueId from '@form-create/utils/lib/unique';
import {makeRequiredRule} from '../../utils';

const label = '数组组件';
const name = 'fc-group';

export default {
    icon: 'el-icon-copy-document',
    label,
    name,
    inside: true,
    drag: true,
    dragBtn: false,
    mask: false,
    rule() {
        return {
            type: name,
            field: uniqueId(),
            title: label,
            children: [],
        };
    },
    props() {
        return [
            makeRequiredRule(),
            // {
            //     type: 'Struct',
            //     title: '嵌套组件规则',
            //     field: 'rule',
            //     props: {
            //         defaultValue: [],
            //     },
            // },
            {
                type: 'Struct',
                title: '默认值数据',
                field: 'defaultValue',
                props: {
                    defaultValue: [],
                },
            },
            {
                type: 'inputNumber',
                field: 'max',
                title: '最大数量',
                props: {min: 0},
            },
            {
                type: 'inputNumber',
                field: 'min',
                title: '最小数量',
                props: {min: 0},
            },
            {
                type: 'inputNumber',
                field: 'expand',
                title: '默认展开几项',
                props: {min: 0},
            },
            {type: 'switch', field: 'button', title: '是否显示操作按钮', value: true},
            {
                type: 'inputNumber',
                field: 'fontSize',
                value: 28,
                title: '操作按钮字体大小',
            },
            {
                type: 'Struct',
                title: '子表单配置',
                field: 'options',
                props: {
                    defaultValue: [],
                },
            },
            {type: 'switch', field: 'disabled', title: '是否禁用', value: false},
            {
                type: 'switch',
                field: 'syncDisabled',
                title: '与子表单强制同步 disabled 状态',
                value: true,
            },
        ];
    },
};
