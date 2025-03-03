import uniqueId from '@form-create/utils/lib/unique';
import {localeProps, makeTreeOptions, makeTreeOptionsRule} from '../../utils/index';

const label = '级联选择器';
const name = 'cascader';

export default {
    menu: 'main',
    icon: 'icon-cascader',
    label,
    name,
    input: true,
    event: ['change', 'dropdownVisibleChange', 'search'],
    validate: ['string', 'number', 'array'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.cascader.name'),
            info: '',
            effect: {
                fetch: ''
            },
            $required: false,
            props: {
                options: makeTreeOptions(t('props.option'), {label: 'label', value: 'value'}, 3)
            }
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            makeTreeOptionsRule(t, 'props.options'),
            ...[
                {
                    type: 'switch',
                    field: 'disabled'
                },
                {
                    type: 'switch',
                    field: 'allowClear'
                },
                {
                    type: 'switch',
                    field: 'multiple'
                },
                {
                    type: 'input',
                    field: 'placeholder'
                },
                {
                    type: 'switch',
                    field: 'showSearch'
                },
            ]
        ]);
    }
};
