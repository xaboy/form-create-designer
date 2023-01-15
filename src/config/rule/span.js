import {localeProps} from '../../utils';

const label = '文字';
const name = 'span';

export default {
    icon: 'icon-span',
    label,
    name,
    rule({t}) {
        return {
            type: name,
            title: t('components.span.name'),
            native: false,
            children: [t('components.span.name')],
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            {
                type: 'input',
                field: 'formCreateTitle',
                title: 'title',
            },
            {
                type: 'input',
                field: 'formCreateChild',
                title: '内容',
                props: {
                    type: 'textarea'
                }
            }
        ]);
    }
};
