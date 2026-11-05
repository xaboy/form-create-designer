import {localeOptions, localeProps} from '../../utils';

const label = '按钮组';
const name = 'aButtonGroup';

export default {
    menu: 'aide',
    icon: 'icon-btn-group',
    label,
    name,
    mask: false,
    drag: true,
    children: 'aButton',
    childrenLen: 2,
    allowDrag: ['aButton'],
    subRender({t, h, resolveComponent, subRule}) {
        const text = (subRule.children && subRule.children[0]) || '';
        return [
            {
                label: t('com.aButton.props.formCreateChild'),
                vnode: h(resolveComponent('a-input'), {
                    size: 'small',
                    value: typeof text === 'string' ? text : '',
                    'onUpdate:value': v => {
                        if (!subRule.children) {
                            subRule.children = [v];
                        } else {
                            subRule.children.splice(0, 1, v);
                        }
                    },
                }),
            },
        ];
    },
    rule() {
        return {
            type: name,
            props: {},
            children: [],
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            {
                type: 'select',
                field: 'size',
                options: localeOptions(t, [
                    {label: 'large', value: 'large'},
                    {label: 'middle', value: 'middle'},
                    {label: 'small', value: 'small'},
                ]),
            },
        ]);
    },
};
