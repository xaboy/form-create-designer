import uniqueId from '@form-create/utils/lib/unique';
import {localeProps} from '../../utils';

const label = '评分';
const name = 'rate';

export default {
    menu: 'main',
    icon: 'icon-rate',
    label,
    name,
    input: true,
    event: ['change'],
    validate: ['number'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.rate.name'),
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
                field: 'allowHalf',
            },
            {
                type: 'inputNumber',
                field: 'count',
            },
            {
                type: 'ColorInput',
                field: 'color',
            },
            {
                type: 'ColorInput',
                field: 'voidColor',
            }
        ]);
    }
};
