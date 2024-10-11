import {localeOptions, localeProps} from '../../utils';

const label = '分割线';
const name = 'vanDivider';

export default {
    menu: 'aide',
    icon: 'icon-divider',
    label,
    name,
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
            },
            {
                type: 'switch',
                field: 'dashed',
            },
            {
                type: 'select',
                field: 'contentPosition',
                options: localeOptions(t, [
                    {
                        label: 'left', value: 'left',
                    },
                    {
                        label: 'center', value: 'center',
                    },
                    {
                        label: 'right', value: 'right',
                    }
                ])
            },
            {
                type: 'switch',
                field: 'vertical',
            }
        ]);
    }
};
