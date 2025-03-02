import uniqueId from '@form-create/utils/lib/unique';
import {localeOptions, localeProps} from '../../utils';

const label = '计数器';
const name = 'inputNumber';

export default {
    menu: 'main',
    icon: 'icon-number',
    label,
    name,
    input: true,
    event: ['blur', 'focus', 'change'],
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
        },  {
            type: 'inputNumber',
            title: 'precision',
            field: 'precision',
        }, {type: 'inputNumber', field: 'step', props: {min: 0}}, {
            type: 'switch',
            field: 'stepStrictly'
        }, {
            type: 'switch',
            field: 'controls',
            value: true
        }, {
            type: 'select',
            field: 'controlsPosition',
            options: localeOptions(t, [{label: 'default', value: ''}, {label: 'right', value: 'right'}])
        }, {type: 'input', field: 'placeholder'}]);
    }
};
