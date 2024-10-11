import {localeProps, makeTitleRule} from '../../utils';

const label = '文字';
const name = 'text';

export default {
    menu: 'aide',
    icon: 'icon-span',
    label,
    name,
    rule({t}) {
        return {
            type: 'div',
            title: '',
            native: true,
            style: {
                whiteSpace: 'pre-line',
                display: 'block',
                width: '100%',
            },
            children: [t('com.text.name')],
        };
    },
    watch: {
        formCreateNative({value, rule}) {
            if (value) {
                rule.title = '';
            }
        }
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            ...makeTitleRule(t),
            {
                type: 'input',
                field: 'formCreateChild',
                props: {
                    type: 'textarea'
                }
            }
        ]);
    }
};
