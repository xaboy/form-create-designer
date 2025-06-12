import uniqueId from '@form-create/utils/lib/unique';
import {localeOptions, localeProps} from '../../utils';

const label = '输入框';
const name = 'input';

export default {
    menu: 'main',
    icon: 'icon-input',
    label,
    name,
    input: true,
    event: ['blur', 'focus', 'change', 'input', 'clear'],
    validate: ['string', 'url', 'email'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.input.name'),
            info: '',
            $required: false,
            props: {}
        };
    },
    watch: {
        value({value, rule}) {
            if (rule.props.type === 'protocol') {
                const link = /^https?:/.test(value) ? value : '';
                rule._link = link;
                if (!rule.children || !rule.children.length) {
                    rule.children = [{
                        type: 'a',
                        slot: 'append',
                        native: true,
                        _fc_drag_tag: '_',
                        attrs: {
                            href: '',
                            target: '_blank',
                            style: {
                                display: 'none',
                                marginLeft: '4px',
                                color: '#52c41a',
                                cursor: 'pointer'
                            }
                        },
                        children: ['点击链接']
                    }];
                }
                const anchor = rule.children[0];
                anchor.attrs.href = link;
                anchor.attrs.style.display = link ? '' : 'none';
                anchor.on = {
                    click(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (link) window.open(link, '_blank');
                    }
                };
            } else {
                rule._link = '';
                rule.children = [];
            }
        }
    },
    attrs: {
        link({rule}) {
            return rule._link || '';
        }
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            {
                type: 'switch',
                field: 'disabled'
            },
            {
                type: 'switch',
                field: 'readonly'
            },
            {
                type: 'select',
                field: 'type',
                options: localeOptions(t, [
                    {label: 'text', value: 'text'},
                    {label: 'number', value: 'number'},
                    {label: 'time', value: 'time'},
                    {label: 'date', value: 'date'},
                    {label: 'month', value: 'month'},
                    {label: 'datetime-local', value: 'datetime-local'},
                    {label: 'protocol', value: 'protocol'},
                ])
            },
            {
                type: 'inputNumber',
                field: 'maxlength',
                props: {min: 0}
            },
            {
                type: 'input',
                field: 'placeholder'
            },
            {
                type: 'switch',
                field: 'clearable'
            },
        ]);
    }
};
