import uniqueId from '@form-create/utils/lib/unique';
import {localeOptions, localeProps} from '../../utils';

const label = '输入框';
const name = 'input';

export default {
    menu: 'main',
    icon: 'icon-input',
    label,
    name,
    input: true,
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
                type: 'select',
                field: 'type',
                options: localeOptions(t, [
                    {label: 'text', value: 'text'},
                    {label: 'number', value: 'number'},
                    {label: 'time', value: 'time'},
                    {label: 'date', value: 'date'},
                    {label: 'month', value: 'month'},
                    {label: 'datetime-local', value: 'datetime-local'},
                ])
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
