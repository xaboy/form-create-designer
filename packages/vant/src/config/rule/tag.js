import {localeOptions, localeProps, makeTitleRule} from '../../utils';

const label = '标签';
const name = 'vanTag';

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
            native: true,
            children: [t('com.vanTag.name')]
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
                field: 'formCreateTitle',
            }, {
                type: 'input',
                field: 'formCreateChild'
            }, {
                type: 'select',
                field: 'type',
                options: [{label: 'primary', value: 'primary'}, {
                    label: 'success',
                    value: 'success'
                }, {label: 'warning', value: 'warning'}, {label: 'danger', value: 'danger'}]
            }, {
                type: 'select',
                field: 'size',
                options: localeOptions(t, [{label: 'large', value: 'large'}, {
                    label: 'medium',
                    value: 'medium'
                }, {label: 'default', value: 'default'}])
            }, {
                type: 'ColorInput',
                field: 'color',
            }, {
                type: 'switch',
                field: 'plain',
            }, {
                type: 'switch',
                field: 'round',
            }, {
                type: 'ColorInput',
                field: 'textColor',
            }]);
    }
};
