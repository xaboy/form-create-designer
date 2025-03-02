import uniqueId from '@form-create/utils/lib/unique';
import {localeProps, makeOptionsRule, makeTreeOptions} from '../../utils/index';

const label = '多选框';
const name = 'checkbox';

export default {
    menu: 'main',
    icon: 'icon-checkbox',
    label,
    name,
    input: true,
    event: ['change'],
    validate: ['array'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.checkbox.name'),
            info: '',
            effect: {
                fetch: ''
            },
            $required: false,
            props: {},
            options: makeTreeOptions(t('props.option'), {label: 'label', value: 'value'}, 1)
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            makeOptionsRule(t, 'options'),
            ...[
                {
                    type: 'switch',
                    field: 'disabled'
                },
                {type: 'switch', field: 'input'},
                {
                    type: 'switch',
                    field: 'type',
                    props: {activeValue: 'button', inactiveValue: 'default'}
                },
                {
                    field: 'min',
                    type: 'inputNumber',
                    props: {
                        min: 0
                    }
                },
                {
                    field: 'max',
                    type: 'inputNumber',
                    props: {
                        min: 0
                    }
                },
                {
                    type: 'ColorInput',
                    field: 'textColor'
                },
                {
                    type: 'ColorInput',
                    field: 'fill'
                }
            ]
        ]);
    }
};
