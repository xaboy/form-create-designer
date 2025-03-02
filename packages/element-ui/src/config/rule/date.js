import uniqueId from '@form-create/utils/lib/unique';
import {localeOptions, localeProps} from '../../utils';

const label = '日期';
const name = 'datePicker';

export default {
    menu: 'main',
    icon: 'icon-date',
    label,
    name,
    input: true,
    event: ['change', 'blur', 'focus', 'calendarChange', 'panelChange', 'visibleChange'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.datePicker.name'),
            info: '',
            $required: false,
            props: {},
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [{type: 'switch', field: 'readonly'}, {
            type: 'switch',
            field: 'disabled'
        }, {
            type: 'select',
            field: 'type',
            options: localeOptions(t, [{label: 'year', value: 'year'}, {label: 'month', value: 'month'}, {
                label: 'date',
                value: 'date'
            }, {label: 'dates', value: 'dates'}, {label: 'week', value: 'week'}, {
                label: 'datetime',
                value: 'datetime'
            }, {label: 'datetimerange', value: 'datetimerange'}, {
                label: 'daterange',
                value: 'daterange'
            }, {label: 'monthrange', value: 'monthrange'}])
        }, {
            type: 'switch',
            field: 'clearable',
            value: true
        }, {
            type: 'Struct',
            field: 'pickerOptions',
            props: {defaultValue: {}}
        }, {type: 'switch', field: 'editable', value: true}, {
            type: 'input',
            field: 'placeholder'
        }, {
            type: 'input',
            field: 'startPlaceholder'
        }, {type: 'input', field: 'endPlaceholder'}, {
            type: 'input',
            field: 'format'
        }, {
            type: 'select',
            field: 'align',
            options: localeOptions(t, [{label: 'left', value: 'left'}, {label: 'center', value: 'center'}, {
                label: 'right',
                value: 'right'
            }])
        }, {type: 'input', field: 'rangeSeparator'}, {
            type: 'switch',
            field: 'unlinkPanels'
        }]);
    }
};
