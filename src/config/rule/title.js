import {localeOptions, localeProps} from '../../utils';

const label = '标题';
const name = 'fcTitle';

export default {
    menu: 'aide',
    icon: 'icon-title',
    label,
    name,
    event: [],
    rule({t}) {
        return {
            type: 'fcTitle',
            props: {
                title: t('props.title'),
            },
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [{type: 'input', field: 'title'}, {
            type: 'select',
            field: 'size',
            value: 'H2',
            options: [1, 2, 3, 4, 5, 6].map(k => {
                return {label: 'H' + k, value: 'h' + k};
            })
        }, {
            type: 'select',
            field: 'align',
            options: localeOptions(t, [{label: 'left', value: 'left'}, {label: 'center', value: 'center'}, {
                label: 'right',
                value: 'right'
            }])
        }]);
    }
};
