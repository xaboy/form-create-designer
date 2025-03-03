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
    event: ['change', 'ok'],
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
        return localeProps(t, name + '.props', [{
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
            field: 'placeholder'
        }, {
            type: 'input',
            field: 'format'
        }, {
            type: 'input',
            field: 'valueFormat'
        }]);
    }
};
