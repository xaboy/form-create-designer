import uniqueId from '@form-create/utils/lib/unique';
import {localeOptions, localeProps} from '../../utils';

const label = '日历';
const name = 'calendar';

export default {
    menu: 'main',
    icon: 'icon-calendar',
    label,
    name,
    event: ['select', 'confirm', 'open', 'close', 'opened', 'closed', 'unselect', 'monthShow', 'overRange', 'clickSubtitle', 'clickDisabledDate', 'panelChange'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.' + name + '.name'),
            info: '',
            $required: false,
            props: {},
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
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
                'field': 'type',
                options: localeOptions(t, [
                    {label: 'single', value: 'single'},
                    {label: 'multiple', value: 'multiple'},
                ])
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
