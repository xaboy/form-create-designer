import uniqueId from '@form-create/utils/lib/unique';
import {localeOptions, localeProps, makeOptionsRule, makeTreeOptions} from '../../utils/index';

const label = '单选框';
const name = 'radio';

export default {
    menu: 'main',
    icon: 'icon-radio',
    label,
    name,
    event: ['change'],
    validate: ['string', 'number'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.radio.name'),
            info: '',
            effect: {
                fetch: ''
            },
            $required: false,
            props: {},
            optionsTo: 'props.options',
            options: makeTreeOptions(t('props.option'), {label: 'text', value: 'value'}, 1)
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            makeOptionsRule(t, 'options'),
            {
                type: 'switch',
                field: 'disabled',
            },
            {
                type: 'ColorInput',
                field: 'checkedColor',
            },
            {
                type: 'select',
                field: 'direction',
                options: localeOptions(t, [
                    {label: 'horizontal', value: 'horizontal'},
                    {label: 'vertical', value: 'vertical'},
                ]),
            },
        ]);
    }
};
