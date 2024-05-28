import uniqueId from '@form-create/utils/lib/unique';
import {localeOptions, localeProps} from '../../utils';

const label = '时间区间';
const name = 'timeRange';

export default {
    menu: 'main',
    icon: 'icon-time',
    label,
    name,
    event: ['change', 'blur', 'focus', 'visibleChange'],
    rule({t}) {
        return {
            type: 'timePicker',
            field: uniqueId(),
            title: t('com.timeRange.name'),
            info: '',
            $required: false,
            props: {
                isRange: true,
            },
        };
    },
    props(_, {t}) {
        return localeProps(t, 'timePicker.props', [{type: 'switch', field: 'readonly'}, {
            type: 'switch',
            field: 'disabled'
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
            type: 'switch',
            field: 'arrowControl'
        }, {
            type: 'select',
            field: 'align',
            options: localeOptions(t, [{label: 'left', value: 'left'}, {label: 'center', value: 'center'}, {
                label: 'right',
                value: 'right'
            }])
        }]);
    }
};
