import uniqueId from '@form-create/utils/lib/unique';
import {localeOptions, localeProps} from '../../utils';

const label = '日期';
const name = 'datePicker';

export default {
    menu: 'main',
    icon: 'icon-date',
    label,
    name,
    event: ['confirm', 'cancel', 'change'],
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
                type: 'input',
                field: 'title',
            },
            {
                type: 'checkbox',
                field: 'columnsType',
                props: {
                    type: 'button'
                },
                options:localeOptions(t, [
                    {
                        label: 'year',
                        value: 'year',
                    },
                    {
                        label: 'month',
                        value: 'month',
                    },
                    {
                        label: 'day',
                        value: 'day',
                    },
                ]),
            }, {
                type: 'datePicker',
                field: 'minDate',
            }, {
                type: 'datePicker',
                field: 'maxDate',
            },
            {
                type: 'inputNumber',
                field: 'visibleOptionNum',
            },
            {
                type: 'input',
                field: 'placeholder',
            },
        ]);
    }
};
