import uniqueId from '@form-create/utils/lib/unique';
import {localeOptions, localeProps} from '../../utils';

const label = '时间';
const name = 'timePicker';

export default {
    menu: 'main',
    icon: 'icon-time',
    label,
    name,
    input: true,
    event: ['change', 'blur', 'focus', 'visibleChange'],
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
        }
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [{type: 'switch', field: 'readonly'}, {
            type: 'switch',
            field: 'disabled'
        }, {
            type: 'switch',
            field: 'isRange'
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
