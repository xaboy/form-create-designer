import {localeProps} from '../../utils';

const label = '提示';
const name = 'aAlert';

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
                message: t('com.aAlert.name'),
                description: t('com.aAlert.description'),
                type: 'success',
            },
            style: {
                width: '100%',
            },
            children: []
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [{type: 'input', field: 'message'}, {
            type: 'select',
            field: 'type',
            options: [{label: 'success', value: 'success'}, {label: 'warning', value: 'warning'}, {
                label: 'info',
                value: 'info'
            }, {label: 'error', value: 'error'}]
        }, {type: 'input', field: 'description'}, {
            type: 'switch',
            field: 'closable',
            value: false
        }, {type: 'switch', field: 'banner', value: false}, {
            type: 'input',
            field: 'closeText'
        }, {type: 'switch', field: 'showIcon'}]);
    }
};
