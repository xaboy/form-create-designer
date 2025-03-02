import uniqueId from '@form-create/utils/lib/unique';
import {localeOptions, localeProps} from '../../utils';

const label = '日历区间';
const name = 'calendarRange';

export default {
    menu: 'main',
    icon: 'icon-date-range',
    label,
    name,
    input: true,
    event: ['select', 'confirm', 'open', 'close', 'opened', 'closed', 'unselect', 'monthShow', 'overRange', 'clickSubtitle', 'clickDisabledDate', 'panelChange'],
    rule({t}) {
        return {
            type: 'calendar',
            field: uniqueId(),
            title: t('com.' + name + '.name'),
            info: '',
            $required: false,
            props: {
                type: 'range'
            },
        };
    },
    props(_, {t}) {
        return localeProps(t, 'calendar.props', [
            {
                type: 'switch',
                field: 'disabled'
            },
            {
                type: 'switch',
                field: 'clearable',
            },
            {
                'type': 'input',
                'field': 'title',
            },
            {
                'type': 'select',
                'field': 'switchMode',
                options: localeOptions(t, [
                    {label: 'none', value: 'none'},
                    {label: 'month', value: 'month'},
                    {label: 'year-month', value: 'year-month'},
                ], 'com.calendar.switchMode')
            },
            {
                'type': 'datePicker',
                'field': 'minDate',
            },
            {
                'type': 'datePicker',
                'field': 'maxDate',
            },
            {
                type: 'input',
                field: 'placeholder',
            },
        ]);
    }
};
