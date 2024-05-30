import {localeProps} from '../../utils';

const label = '提示';
const name = 'elAlert';

export default {
    menu: 'aide',
    icon: 'icon-alert',
    label,
    name,
    event: ['close'],
    rule({t}) {
        return {
            type: name,
            props: {
                title: t('com.elAlert.name'),
                description: t('com.elAlert.description'),
                type: 'success',
                effect: 'dark',
            },
            children: []
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [{type: 'input', field: 'title'}, {
            type: 'select',
            field: 'type',
            options: [{label: 'success', value: 'success'}, {label: 'warning', value: 'warning'}, {
                label: 'info',
                value: 'info'
            }, {label: 'error', value: 'error'}]
        }, {type: 'input', field: 'description'}, {
            type: 'switch',
            field: 'closable',
            value: true
        }, {type: 'switch', field: 'center', value: true}, {
            type: 'input',
            field: 'closeText'
        }, {type: 'switch', field: 'showIcon'}, {
            type: 'select',
            field: 'effect',
            options: [{label: 'light', value: 'light'}, {label: 'dark', value: 'dark'}]
        }]);
    }
};
