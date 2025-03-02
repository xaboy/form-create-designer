import uniqueId from '@form-create/utils/lib/unique';
import {localeProps, makeOptionsRule, makeTreeOptions} from '../../utils/index';

const label = '选择器';
const name = 'select';

export default {
    menu: 'main',
    icon: 'icon-select',
    label,
    name,
    input: true,
    event: ['confirm', 'cancel', 'change', 'clickOption', 'scrollInto'],
    validate: ['string', 'number'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.select.name'),
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
                type: 'input',
                field: 'title',
            },
            {
                type: 'switch',
                field: 'disabled',
            },
            {
                type: 'switch',
                field: 'readonly',
            },
            {
                type: 'inputNumber',
                field: 'visibleOptionNum',
                value: 6,
            },
        ])
    }
};
