import uniqueId from '@form-create/utils/lib/unique';
import {localeProps} from '../../utils';

const label = '时间区间';
const name = 'timeRange';

export default {
    menu: 'main',
    icon: 'icon-time-range',
    label,
    name,
    input: true,
    event: ['change'],
    rule({t}) {
        return {
            type: 'timePicker',
            field: uniqueId(),
            title: t('com.timeRange.name'),
            info: '',
            $required: false,
            props: {
                range: true,
            },
        };
    },
    watch: {
        __format({value, rule}) {
            rule.props.format = value;
            rule.props.valueFormat = value;
        },
        __startPlaceholder({value, rule}) {
            if (Array.isArray(rule.props.placeholder)) {
                rule.props.placeholder[0] = value;
            } else {
                rule.props.placeholder = [value];
            }
        },
        __endPlaceholder({value, rule}) {
            if (Array.isArray(rule.props.placeholder)) {
                rule.props.placeholder[1] = value;
            } else {
                rule.props.placeholder = [null, value];
            }
        },
    },
    attrs: {
        format({rule}) {
            return rule.props.format || '';
        },
        startPlaceholder({rule}) {
            return Array.isArray(rule.props.placeholder) ? rule.props.placeholder[0] : '';
        },
        endPlaceholder({rule}) {
            return Array.isArray(rule.props.placeholder) ? rule.props.placeholder[1] : '';
        },
    },
    props(_, {t}) {
        return localeProps(t, 'timePicker.props', [{
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
                    label: t('com.timePicker.HH:mm:ss'),
                    value: 'HH:mm:ss'
                },
                {
                    label: t('com.timePicker.HH:mm'),
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
            field: '__startPlaceholder'
        }, {
            type: 'input',
            field: '__endPlaceholder'
        }, {
            type: 'switch',
            field: 'bordered',
            value: true,
        }]);
    }
};
