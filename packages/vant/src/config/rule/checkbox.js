import uniqueId from '@form-create/utils/lib/unique';
import {localeOptions, localeProps, makeOptionsRule, makeTreeOptions} from '../../utils/index';

const label = '多选框';
const name = 'checkbox';

export default {
    menu: 'main',
    icon: 'icon-checkbox',
    label,
    name,
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
            optionsTo: 'props.options',
            options: makeTreeOptions(t('props.option'), {label: 'text', value: 'value'}, 1)
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            makeOptionsRule(t, 'options'),
            {
                type: 'switch',
                field: 'disabled',
            },
            {
                type: 'inputNumber',
                field: 'max',
            },
            {
                type: 'ColorInput',
                field: 'checkedColor',
            },
            {
                type: 'select',
                field: 'direction',
                options: localeOptions(t, [
                    {label: 'horizontal', value: 'horizontal'},
                    {label: 'vertical', value: 'vertical'},
                ]),
            },
        ]);
    }
};
