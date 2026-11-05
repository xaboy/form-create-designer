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
    sqlType(rule) {
        const max = rule.props?.max ?? 5;
        const scale = 1;
        const integerDigits = Math.max(1, Math.floor(max).toString().length);
        return {type: 'decimal', precision: integerDigits + scale, scale};
    },
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
