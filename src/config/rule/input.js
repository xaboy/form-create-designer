import uniqueId from '@form-create/utils/lib/unique';
import {localeProps} from '../../utils';

const label = '输入框';
const name = 'input';

export default {
    menu: 'main',
    icon: 'icon-input',
    label,
    name,
    event: ['blur', 'focus', 'change', 'input', 'clear'],
    validate: ['string', 'url', 'email'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.input.name'),
            info: '',
            $required: false,
            props: {}
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
                type: 'inputNumber',
                field: 'minlength',
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
