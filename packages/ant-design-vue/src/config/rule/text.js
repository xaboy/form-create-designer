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
            style: {
                whiteSpace: 'pre-line',
            },
            children: [t('com.text.name')],
        };
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
