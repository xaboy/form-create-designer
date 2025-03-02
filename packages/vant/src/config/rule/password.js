import uniqueId from '@form-create/utils/lib/unique';
import {localeProps} from '../../utils';

const label = '密码输入框';
const name = 'password';

export default {
    menu: 'main',
    icon: 'icon-password',
    label,
    name,
    input: true,
    event: ['blur', 'focus', 'clear', 'click'],
    validate: ['string'],
    rule({t}) {
        return {
            type: 'input',
            field: uniqueId(),
            title: t('com.password.name'),
            info: '',
            $required: false,
            props: {
                type: 'password'
            }
        };
    },
    props(_, {t}) {
        return localeProps(t, 'input.props', [
            {
                'type': 'switch',
                'field': 'disabled',
            },
            {
                'type': 'switch',
                'field': 'readonly',
            },
            {
                'type': 'input',
                'field': 'placeholder',
            },
            {
                'type': 'inputNumber',
                'field': 'maxlength',
            },
            {
                'type': 'switch',
                'field': 'clearable',
            },
        ]);
    }
};
