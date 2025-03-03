import uniqueId from '@form-create/utils/lib/unique';
import {localeOptions, localeProps} from '../../utils';

const label = '日期区间';
const name = 'dateRange';

export default {
    menu: 'main',
    icon: 'icon-date-range',
    label,
    name,
    input: true,
    event: ['change', 'ok', 'calendarChange'],
    rule({t}) {
        return {
            type: 'datePicker',
            field: uniqueId(),
            title: t('com.dateRange.name'),
            info: '',
            $required: false,
            props: {
                range: true
            },
        };
    },
    watch: {
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
        startPlaceholder({rule}) {
            return Array.isArray(rule.props.placeholder) ? rule.props.placeholder[0] : '';
        },
        endPlaceholder({rule}) {
            return Array.isArray(rule.props.placeholder) ? rule.props.placeholder[1] : '';
        },
    },
    props(_, {t}) {
        return localeProps(t, 'datePicker.props', [{
            type: 'switch',
            field: 'disabled'
        }, {
            type: 'switch',
            field: 'bordered',
            value: true,
        }, {
            type: 'select',
            field: 'picker',
            options: localeOptions(t, [{label: 'year', value: 'year'}, {label: 'month', value: 'month'}, {
                label: 'date',
                value: 'date'
            }, {label: 'week', value: 'week'}, {
                label: 'quarter',
                value: 'quarter'
            }])
        }, {
            type: 'switch',
            field: 'showTime',
        }, {
            type: 'switch',
            field: 'allowClear',
        }, {type: 'switch', field: 'inputReadOnly'}, {
            type: 'input',
            field: '__startPlaceholder'
        }, {
            type: 'input',
            field: '__endPlaceholder'
        }, {
            type: 'input',
            field: 'separator'
        }, {
            type: 'input',
            field: 'format'
        }, {
            type: 'input',
            field: 'valueFormat'
        }]);
    }
};
