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
    event: ['change', 'dragStart', 'dragEnd'],
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
        return localeProps(t, name + '.props', [
            {
                type: 'switch',
                field: 'disabled',
            },
            {
                type: 'switch',
                field: 'readonly',
            },
            {
                type: 'switch',
                field: 'range',
            },
            {
                type: 'inputNumber',
                field: 'max',
            },
            {
                type: 'inputNumber',
                field: 'min',
            },
            {
                type: 'inputNumber',
                field: 'step',
            }
        ]);
    }
};
