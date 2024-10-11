import uniqueId from '@form-create/utils/lib/unique';
import {localeOptions, localeProps} from '../../utils';

const label = '数字输入框';
const name = 'stepper';

export default {
    menu: 'main',
    icon: 'icon-number',
    label,
    name,
    event: ['change', 'overlimit', 'plus', 'minus', 'focus', 'blur'],
    validate: ['number', 'integer', 'float'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.stepper.name'),
            info: '',
            $required: false,
            props: {}
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            {
                type: 'inputNumber',
                field: 'min',
            },
            {
                type: 'inputNumber',
                field: 'max',
            },
            {
                type: 'inputNumber',
                field: 'step',
            },
            {
                type: 'inputNumber',
                field: 'decimalLength',
            },
            {
                type: 'select',
                field: 'theme',
                options: localeOptions(t, [
                    {
                        label: 'round',
                        value: 'round',
                    },
                    {
                        label: 'default',
                        value: 'default',
                    },
                ]),
            }, {
                type: 'input',
                field: 'placeholder',
            }, {
                type: 'switch',
                field: 'integer',
            },
            {
                type: 'switch',
                field: 'disabled',
            }
        ]);
    }
};
