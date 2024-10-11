import uniqueId from '@form-create/utils/lib/unique';
import {localeOptions, localeProps} from '../../utils';

const label = '日期区间';
const name = 'dateRange';

export default {
    menu: 'main',
    icon: 'icon-date',
    label,
    name,
    event: ['change', 'blur', 'focus', 'calendarChange', 'panelChange', 'visibleChange'],
    rule({t}) {
        return {
            type: 'datePicker',
            field: uniqueId(),
            title: t('com.dateRange.name'),
            info: '',
            $required: false,
            props: {
                type: 'datetimerange',
            },
        };
    },
    props(_, {t}) {
        return localeProps(t, 'datePicker.props', [{type: 'switch', field: 'readonly'}, {
            type: 'switch',
            field: 'disabled'
        }, {
            type: 'select',
            field: 'type',
            options: localeOptions(t, [
                {label: 'datetimerange', value: 'datetimerange'},
                {label: 'daterange', value: 'daterange'},
                {label: 'monthrange', value: 'monthrange'}
            ])
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
