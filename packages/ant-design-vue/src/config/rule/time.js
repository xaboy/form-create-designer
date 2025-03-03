import uniqueId from '@form-create/utils/lib/unique';
import {localeProps} from '../../utils';

const label = '时间';
const name = 'timePicker';

export default {
    menu: 'main',
    icon: 'icon-time',
    label,
    name,
    input: true,
    event: ['change'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.timePicker.name'),
            info: '',
            $required: false,
            props: {},
        };
    },
    watch: {
        isRange({rule}) {
            rule.key = uniqueId();
        },
        __format({value, rule}) {
            rule.props.format = value;
            rule.props.valueFormat = value;
        },
    },
    attrs: {
        format({rule}) {
            return rule.props.format || '';
        },
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [{
            type: 'switch',
            field: 'disabled'
        }, {
            type: 'switch',
            field: 'allowClear',
            value: true
        }, {
            type: 'select',
            field: '__format',
            options: [
                {
                    label: t('com.' + name + '.HH:mm:ss'),
                    value: 'HH:mm:ss'
                },
                {
                    label: t('com.' + name + '.HH:mm'),
                    value: 'HH:mm'
                }
            ]
        }, {
            type: 'inputNumber',
            field: 'hourStep'
        }, {
            type: 'inputNumber',
            field: 'minuteStep'
        }, {
            type: 'inputNumber',
            field: 'secondStep'
        }, {type: 'switch', field: 'inputReadOnly', value: false}, {
            type: 'input',
            field: 'placeholder'
        }, {
            type: 'switch',
            field: 'bordered',
            value: true,
        }]);
    }
};
