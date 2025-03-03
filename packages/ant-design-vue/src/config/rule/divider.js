import {localeOptions, localeProps} from '../../utils';

const label = '分割线';
const name = 'aDivider';

export default {
    menu: 'aide',
    icon: 'icon-divider',
    label,
    name,
    rule({t}) {
        return {
            type: name,
            props: {},
            children: [t('com.aDivider.name')],
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [{
            type: 'select',
            field: 'type',
            options: localeOptions(t, [{label: 'horizontal', value: 'horizontal'}, {
                label: 'vertical',
                value: 'vertical'
            }])
        }, {
            type: 'input',
            field: 'formCreateChild',
        }, {
            type: 'select',
            field: 'orientation',
            options: localeOptions(t, [{label: 'left', value: 'left'}, {label: 'right', value: 'right'}, {
                label: 'center',
                value: 'center'
            }])
        }, {
            type: 'switch',
            field: 'plain',
        }, {
            type: 'switch',
            field: 'dashed',
        }]);
    }
};
