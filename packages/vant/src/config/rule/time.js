import uniqueId from '@form-create/utils/lib/unique';
import {localeOptions, localeProps} from '../../utils';

const label = '时间';
const name = 'timePicker';

export default {
    menu: 'main',
    icon: 'icon-time',
    label,
    name,
    event: ['confirm', 'cancel', 'change'],
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
                options: localeOptions(t, [
                    {
                        label: 'hour',
                        value: 'hour',
                    },
                    {
                        label: 'minute',
                        value: 'minute',
                    },
                    {
                        label: 'second',
                        value: 'second',
                    },
                ]),
            }, {
                type: 'timePicker',
                field: 'minTime',
            }, {
                type: 'timePicker',
                field: 'maxTime',
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
