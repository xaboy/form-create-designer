import uniqueId from '@form-create/utils/lib/unique';
import {localeOptions, localeProps, makeOptionsRule, makeTreeOptions} from '../../utils/index';

const label = '选择器';
const name = 'select';

export default {
    menu: 'main',
    icon: 'icon-select',
    label,
    name,
    input: true,
    event: ['change', 'search', 'select', 'blur', 'focus'],
    validate: ['string', 'number', 'array'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.select.name'),
            info: '',
            effect: {
                fetch: ''
            },
            $required: false,
            props: {},
            options: makeTreeOptions(t('props.option'), {label: 'label', value: 'value'}, 1)
        };
    },
    watch: {
        multiple({rule}) {
            rule.key = uniqueId();
        }
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            makeOptionsRule(t, 'options'),
            {
                type: 'switch',
                field: 'disabled'
            }, {type: 'switch', field: 'allowClear'}, {
                type: 'select',
                field: 'mode',
                options: localeOptions(t, [
                    {label: 'multiple', value: 'multiple'},
                    {label: 'tags', value: 'tags'},
                    {label: 'combobox', value: 'combobox'},
                ], 'com.select.modeOpt'),
            }, {type: 'input', field: 'placeholder'}, {type: 'switch', field: 'bordered'}])
    }
};
