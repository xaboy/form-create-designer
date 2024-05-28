import {localeOptions, localeProps} from '../../utils';

const label = '标签';
const name = 'elTag';

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
            children: [t('com.elTag.name')]
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
            {
                type: 'switch', field: 'formCreateNative', props: {
                    activeValue: false,
                    inactiveValue: true,
                },
                control: [{value: false, rule: ['formCreateTitle']}]
            },
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
                }, {label: 'warning', value: 'warning'}, {label: 'danger', value: 'danger'}, {
                    label: 'info',
                    value: 'info'
                }]
            }, {
                type: 'select',
                field: 'size',
                options: localeOptions(t, [{label: 'large', value: 'large'}, {
                    label: 'default',
                    value: 'default'
                }, {label: 'small', value: 'small'}])
            }, {
                type: 'select',
                field: 'effect',
                options: [{label: 'dark', value: 'dark'}, {
                    label: 'light',
                    value: 'light'
                }, {label: 'plain', value: 'plain'}]
            }, {
                type: 'switch', field: 'closable'
            }, {
                type: 'switch', field: 'disableTransitions'
            }, {
                type: 'switch', field: 'hit'
            }, {
                type: 'switch', field: 'round'
            }, {
                type: 'ColorInput', field: 'color'
            }]);
    }
};
