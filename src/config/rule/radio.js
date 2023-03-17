import uniqueId from '@form-create/utils/lib/unique';
import {localeProps, makeOptionsRule, makeRequiredRule} from '../../utils/index';

const label = '单选框';
const name = 'radio';

export default {
    icon: 'icon-radio',
    label,
    name,
    rule({t}) {
        const opt = t('props.option');
        return {
            type: name,
            field: uniqueId(),
            title: t('components.radio.name'),
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
            makeRequiredRule(),
            makeOptionsRule(t, 'options'),
            {type: 'switch', field: 'disabled', title: '是否禁用'}, {
                type: 'switch',
                field: 'type',
                title: '按钮形式',
                props: {activeValue: 'button', inactiveValue: 'default'}
            }, {type: 'input', field: 'textColor', title: '按钮形式的 Radio 激活时的文本颜色'}, {
                type: 'input',
                field: 'fill',
                title: '按钮形式的 Radio 激活时的填充色和边框色'
            }]);
    }
};
