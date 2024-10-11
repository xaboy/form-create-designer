import {localeOptions, localeProps} from '../../utils';

const label = '按钮';
const name = 'elButton';

export default {
    menu: 'aide',
    icon: 'icon-button',
    label,
    name,
    mask: true,
    event: ['click'],
    rule({t}) {
        return {
            type: name,
            props: {},
            children: [t('com.elButton.name')],
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [{
            type: 'input',
            field: 'formCreateChild',
        }, {
            type: 'select',
            field: 'size',
            options: localeOptions(t, [{label: 'large', value: 'large'}, {label: 'default', value: 'default'}, {
                label: 'small',
                value: 'small'
            }])
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
        }, {type: 'switch', field: 'plain'}, {
            type: 'switch',
            field: 'round'
        }, {type: 'switch', field: 'circle'}, {
            type: 'switch',
            field: 'loading'
        }, {type: 'switch', field: 'disabled'}]);
    }
};
