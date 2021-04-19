import uniqueId from '@form-create/utils/lib/unique';

const label = '多选框';
const name = 'checkbox';

export default {
    icon: 'icon-checkbox',
    label,
    name,
    rule() {
        return {
            type: name,
            field: uniqueId(),
            title: label,
            info: '',
            props: {},
            effect:{
                fetch:{}
            },
            options: [
                {value: '1', label: '选项1'},
                {value: '2', label: '选项2'},
            ]
        };
    },
    props() {
        return [
            {
                type: 'radio',
                title: '数据类型',
                field: '_optionType',
                value: 0,
                options: [
                    {'label': '静态数据', 'value': 0},
                    {'label': '动态数据', 'value': 1},
                ],
                props: {
                    type: 'button'
                },
                control: [
                    {
                        value: 0,
                        rule: [
                            {
                                type: 'Struct',
                                field: 'formCreateOptions',
                                props: {defaultValue: []}
                            },
                        ],
                    },
                    {
                        value: 1,
                        rule: [
                            {
                                type: 'Fetch',
                                field: 'formCreateEffect>fetch',
                            }
                        ]
                    }
                ]

            },
            {
                type: 'switch',
                field: 'type',
                title: '按钮类型',
                props: {activeValue: 'button', inactiveValue: 'default'}
            }, {type: 'switch', field: 'disabled', title: '是否禁用'}, {
                type: 'inputNumber',
                field: 'min',
                title: '可被勾选的 checkbox 的最小数量'
            }, {type: 'inputNumber', field: 'max', title: '可被勾选的 checkbox 的最大数量'}, {
                type: 'input',
                field: 'textColor',
                title: '按钮形式的 Checkbox 激活时的文本颜色'
            }, {type: 'input', field: 'fill', title: '按钮形式的 Checkbox 激活时的填充色和边框色'}];
    }
};