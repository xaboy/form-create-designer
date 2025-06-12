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
            props: {type: 'text'}
        };
    },
    watch: {
        value({value, rule}) {
            rule._link = /^https?:/.test(value) ? value : '';
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
