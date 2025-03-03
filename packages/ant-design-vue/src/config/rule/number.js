import uniqueId from '@form-create/utils/lib/unique';
import {localeProps} from '../../utils';

const label = '计数器';
const name = 'inputNumber';

export default {
    menu: 'main',
    icon: 'icon-number',
    label,
    name,
    input: true,
    event: ['blur', 'focus', 'change', 'pressEnter', 'step'],
    validate: ['number', 'integer', 'float'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.inputNumber.name'),
            info: '',
            $required: false,
            props: {}
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [{type: 'switch', field: 'disabled'}, {
            type: 'inputNumber',
            field: 'min'
        }, {
            type: 'inputNumber',
            field: 'max',
        }, {
            type: 'inputNumber',
            title: 'precision',
            field: 'precision',
        }, {type: 'inputNumber', field: 'step', props: {min: 0}}, {
            type: 'switch',
            field: 'controls',
            value: true
        }, {
            type: 'switch',
            field: 'bordered',
            value: true
        }, {type: 'input', field: 'placeholder'}]);
    }
};
