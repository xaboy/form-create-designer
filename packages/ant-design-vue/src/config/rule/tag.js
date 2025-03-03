import {localeProps, makeTitleRule} from '../../utils';

const label = '标签';
const name = 'aTag';

export default {
    menu: 'aide',
    icon: 'icon-tag',
    label,
    name,
    mask: true,
    event: ['click', 'close'],
    rule({t}) {
        return {
            type: name,
            title: '',
            children: [t('com.aTag.name')]
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            ...makeTitleRule(t),
            {
                type: 'input',
                field: 'formCreateChild'
            }, {
                type: 'ColorInput', field: 'color'
            }, {
                type: 'switch', field: 'closable'
            }, {
                type: 'switch', field: 'bordered', value: true
            }]);
    }
};
