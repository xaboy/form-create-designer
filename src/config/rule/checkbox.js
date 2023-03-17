import uniqueId from '@form-create/utils/lib/unique';
import {localeProps, makeOptionsRule, makeRequiredRule} from '../../utils/index';

const label = '多选框';
const name = 'checkbox';

export default {
    icon: 'icon-checkbox',
    label,
    name,
    rule({t}) {
        const opt = t('props.option');
        return {
            type: name,
            field: uniqueId(),
            title: t('components.checkbox.name'),
            info: '',
            effect: {
                fetch: ''
            },
            $required: false,
            props: {},
            options: [1, 2].map(value => {
                return {
                    label: opt + value,
                    value,
                }
            })
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            makeRequiredRule(), makeOptionsRule(t, 'options'),
            {
                type: 'switch',
                field: 'type',
                title: '按钮类型',
                props: {activeValue: 'button', inactiveValue: 'default'}
            }, {type: 'switch', field: 'disabled', title: '是否禁用'}, {
                type: 'inputNumber',
                field: 'min',
                title: '可被勾选的 checkbox 的最小数量',
                props: {min: 0},
            }, {type: 'inputNumber', field: 'max', title: '可被勾选的 checkbox 的最大数量', props: {min: 0}}, {
                type: 'input',
                field: 'textColor',
                title: '按钮形式的 Checkbox 激活时的文本颜色'
            }, {type: 'input', field: 'fill', title: '按钮形式的 Checkbox 激活时的填充色和边框色'}
        ]);
    }
};
