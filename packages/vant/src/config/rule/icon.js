import {localeProps} from '../../utils';

const label = '图标';
const name = 'vanIcon';

export default {
    menu: 'aide',
    icon: 'icon-icon',
    label,
    name,
    event: ['click'],
    rule() {
        return {
            type: name,
            props: {
                name: 'https://fastly.jsdelivr.net/npm/@vant/assets/icon-demo.png',
                size: '1em',
            },
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            {
                type: 'input',
                field: 'name',
            },
            {
                type: 'switch',
                field: 'dot',
            },
            {
                type: 'input',
                field: 'badge',
            },
            {
                type: 'ColorInput',
                field: 'color',
            },
            {
                type: 'SizeInput',
                field: 'size',
            }
        ]);
    }
};
