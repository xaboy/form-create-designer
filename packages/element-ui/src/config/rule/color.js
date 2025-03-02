import uniqueId from '@form-create/utils/lib/unique';
import {localeProps} from '../../utils';

const label = '颜色选择器';
const name = 'colorPicker';

export default {
    menu: 'main',
    icon: 'icon-color',
    label,
    name,
    input: true,
    event: ['change', 'activeChange', 'focus', 'blur'],
    validate: ['string'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.colorPicker.name'),
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
                field: 'showAlpha'
            },
            {
                type: 'select',
                field: 'colorFormat',
                options: [{label: 'hsl', value: 'hsl'}, {label: 'hsv', value: 'hsv'}, {
                    label: 'hex',
                    value: 'hex'
                }, {label: 'rgb', value: 'rgb'}]
            },
            {
                type: 'tableOptions',
                field: 'predefine',
                props: {
                    column: [{label: t('props.value'), key: 'value'}],
                    valueType: 'string'
                }
            },
        ]);
    }
};
