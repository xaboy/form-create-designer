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
    event: ['blur', 'focus', 'change', 'pressEnter'],
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
                slot: 'addonAfter',
                native: true,
                _fc_drag_tag: '_',
                attrs: {
                    href: '',
                    target: '_blank',
                    style: 'display:none;margin-left:4px;color:#52c41a;cursor:pointer;'
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
            anchor.attrs.style = link
                ? 'margin-left:4px;color:#52c41a;cursor:pointer;'
                : 'display:none;margin-left:4px;color:#52c41a;cursor:pointer;';
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
