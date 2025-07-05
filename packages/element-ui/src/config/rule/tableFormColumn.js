import {localeProps, localeOptions} from '../../utils';

const name = 'tableFormColumn';

export default {
    icon: 'icon-cell',
    name,
    aide: true,
    drag: true,
    dragBtn: false,
    mask: false,
    style: false,
    rule({t}) {
        return {
            type: name,
            props: {
                label: t('com.tableFormColumn.label'),
                width: 'auto'
            },
            children: []
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            {
                type: 'input',
                field: 'label',
            },
            {
                type: 'select', field: 'align',
                options: localeOptions(t, [{label: 'left', value: 'left'}, {label: 'center', value: 'center'}, {
                    label: 'right',
                    value: 'right'
                }])
            },
            {
                type: 'switch',
                field: 'required',
            },
            {
                type: 'input',
                field: 'width',
            },
            {
                type: 'ColorInput',
                field: 'color',
            }
        ]);
    }
};
