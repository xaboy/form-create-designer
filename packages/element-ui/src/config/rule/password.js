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
    event: ['blur', 'focus', 'change', 'input', 'clear'],
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
        return localeProps(t, name + '.props', [
            {
                type: 'switch',
                field: 'disabled'
            },
            {
                type: 'switch',
                field: 'readonly'
            },
            {
                type: 'inputNumber',
                field: 'maxlength',
                props: {min: 0}
            },
            {
                type: 'input',
                field: 'placeholder'
            },
            {
                type: 'switch',
                field: 'clearable'
            },
        ]);
    }
};
