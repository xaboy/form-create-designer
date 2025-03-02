import uniqueId from '@form-create/utils/lib/unique';
import {localeProps} from '../../utils';

const label = '滑块';
const name = 'slider';

export default {
    menu: 'main',
    icon: 'icon-slider',
    label,
    name,
    input: true,
    event: ['change', 'input'],
    validate: ['number', 'array'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.slider.name'),
            info: '',
            $required: false,
            props: {},
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [{type: 'switch', field: 'disabled'}, {
            type: 'switch',
            field: 'range'
        }, {
            type: 'inputNumber',
            field: 'min',
            props: {min: 0}
        }, {
            type: 'inputNumber',
            field: 'max',
            props: {min: 0},
        }, {
            type: 'inputNumber',
            field: 'step',
            props: {min: 0},
        }, {type: 'switch', field: 'showInput'}, {
            type: 'switch',
            field: 'showInputControls',
            value: true
        }, {type: 'switch', field: 'showStops'}, {
            type: 'switch',
            field: 'vertical'
        }, {
            type: 'input',
            field: 'height'
        }]);
    }
};
