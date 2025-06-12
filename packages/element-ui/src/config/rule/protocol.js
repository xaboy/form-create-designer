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
    event: ['blur', 'focus', 'change', 'input', 'clear'],
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
                children: [t('com.protocol.jump')]
            }]
        };
    },
    watch: {
        value({value, rule}) {
            const link = /^https?:/.test(value) ? value : '';
            rule._link = link;
            const anchor = rule.children[0];
            anchor.attrs.href = link;
            anchor.attrs.style.display = link ? '' : 'none';
            anchor.on = {
                click(e) {
                    e.stopPropagation();
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
        ]);
    }
};
