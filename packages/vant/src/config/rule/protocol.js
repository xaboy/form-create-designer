import uniqueId from '@form-create/utils/lib/unique';
import {localeProps} from '../../utils';

const label = '协议';
const name = 'protocol';

export default {
    menu: 'main',
    icon: 'icon-link',
    label,
    name,
    input: true,
    event: ['blur', 'focus', 'clear', 'click'],
    rule({t}) {
        return {
            type: 'input',
            field: uniqueId(),
            title: t('com.protocol.name'),
            info: '',
            $required: false,
            props: {type: 'text'},
            children: [{
                type: 'a',
                slot: 'button',
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
                children: [t('com.protocol.jump')]
            }]
        };
    },
    watch: {
        __link({value, rule}) {
            const safeValue = String(value || '');
            const link = /^https?:/.test(safeValue) ? safeValue : '';
            rule._link = link;
            if (rule) {
                rule.value = link;
            }

            const anchor = rule.children && rule.children[0];
            if (!anchor) return;
            anchor.attrs.href = link || 'javascript:void(0);';
            anchor.attrs.style = {
                ...anchor.attrs.style,
                display: link ? 'inline-block' : 'none',
                color: '#52c41a',
            };
            anchor.on = {
                click(e) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    if (link) window.open(link, '_blank');
                }
            };
        },
        value({value, rule}) {
            const safeValue = String(value || '');
            const link = /^https?:/.test(safeValue) ? safeValue : '';
            if (rule) {
                rule._link = link;
                if (rule.props) rule.props.__link = safeValue;
            }
            const anchor = rule.children && rule.children[0];
            if (!anchor) return;
            anchor.attrs.href = link || 'javascript:void(0);';
            anchor.attrs.style = {
                ...anchor.attrs.style,
                display: link ? 'inline-block' : 'none',
                color: '#52c41a',
            };
            anchor.on = {
                click(e) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    if (link) window.open(link, '_blank');
                }
            };
        }
    },
    attrs: {
        link({rule}) {
            return rule._link || '';
        }
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            { type: 'input', field: 'placeholder' },
            { type: 'input', field: '__link' }
        ]);
    }
};
