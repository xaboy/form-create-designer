import {localeOptions, localeProps} from '../../utils';

const label = '标签页';
const name = 'vanTabs';

export default {
    menu: 'layout',
    icon: 'icon-tab',
    label,
    name,
    mask: false,
    event: ['clickTab', 'change', 'rendered', 'scroll'],
    children: 'vanTab',
    childrenLen: 2,
    rule() {
        return {
            type: name,
            style: {width: '100%'},
            children: []
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            {
                type: 'select',
                field: 'type',
                options: localeOptions(t, [
                    {label: 'card', value: 'card'},
                    {label: 'line', value: 'line'}
                ])
            },
            {
                type: 'ColorInput',
                field: 'color',
            },
            {
                type: 'ColorInput',
                field: 'background',
            },
            {
                type: 'switch',
                field: 'sticky',
            },
            {
                type: 'switch',
                field: 'swipeable',
            },
            {
                type: 'switch',
                field: 'scrollspy',
            },
            {
                type: 'ColorInput',
                field: 'titleActiveColor',
            },
            {
                type: 'ColorInput',
                field: 'titleInactiveColor',
            }
        ]);
    }
};
