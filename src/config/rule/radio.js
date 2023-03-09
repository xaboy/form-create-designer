import uniqueId from '@form-create/utils/lib/unique';
import {makeOptionsRule, makeRequiredRule} from '../../utils/index';

const label = '单选框';
const name = 'radio';

export default {
    icon: 'icon-radio',
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
            props: {},
            options: [
                {value: '1', label: '选项1'},
                {value: '2', label: '选项2'},
            ]
        };
    },
    props() {
        return [
            makeRequiredRule(),
            makeOptionsRule('options'),
            {type: 'switch', field: 'disabled', title: '是否禁用'}, {
                type: 'switch',
                field: 'type',
                title: '按钮形式',
                props: {activeValue: 'button', inactiveValue: 'default'}
            }, {type: 'input', field: 'textColor', title: '按钮形式的 Radio 激活时的文本颜色'}, {
                type: 'input',
                field: 'fill',
                title: '按钮形式的 Radio 激活时的填充色和边框色'
            }];
    }
};
