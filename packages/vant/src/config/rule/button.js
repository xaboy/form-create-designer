import {localeOptions, localeProps} from '../../utils';

const label = '按钮';
const name = 'vanButton';

export default {
    menu: 'aide',
    icon: 'icon-button',
    label,
    name,
    mask: true,
    event: ['click'],
    rule({t}) {
        return {
            type: name,
            props: {},
            children: [t('com.' + name + '.name')],
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            {
                type: 'input',
                field: 'formCreateChild',
            }, {
                type: 'select',
                field: 'type',
                options: [
                    {label: 'primary', value: 'primary'},
                    {label: 'success', value: 'success'},
                    {label: 'warning', value: 'warning'},
                    {label: 'danger', value: 'danger'},
                ]
            }, {
                type: 'select',
                field: 'size',
                options: localeOptions(t, [
                    {label: 'large', value: 'large'},
                    {label: 'small', value: 'small'},
                    {label: 'mini', value: 'mini'},
                ])
            }, {
                type: 'ColorPicker',
                field: 'color',
            },
            {
                type: 'switch',
                field: 'block',
            },
            {
                type: 'switch',
                field: 'square',
            },
            {
                type: 'switch',
                field: 'round',
            },
            {
                type: 'switch',
                field: 'disabled',
            },
        ]);
    }
};
