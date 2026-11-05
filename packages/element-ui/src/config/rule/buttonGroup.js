import {localeOptions, localeProps} from '../../utils';

const label = '按钮组';
const name = 'elButtonGroup';

export default {
    menu: 'aide',
    icon: 'icon-btn-group',
    label,
    name,
    mask: false,
    drag: true,
    children: 'elButton',
    childrenLen: 2,
    allowDrag: ['elButton'],
    subRender({t, h, resolveComponent, subRule}) {
        const text = (subRule.children && subRule.children[0]) || '';
        return [
            {
                label: t('com.elButton.props.formCreateChild'),
                vnode: h(resolveComponent('el-input'), {
                    size: 'small',
                    modelValue: typeof text === 'string' ? text : '',
                    'onUpdate:modelValue': v => {
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
                    {label: 'default', value: 'default'},
                    {label: 'small', value: 'small'},
                ]),
            },
            {
                type: 'select',
                field: 'type',
                options: localeOptions(t, [
                    {label: 'primary', value: 'primary'},
                    {label: 'success', value: 'success'},
                    {label: 'warning', value: 'warning'},
                    {label: 'danger', value: 'danger'},
                    {label: 'info', value: 'info'},
                ]),
            },
        ]);
    },
};
