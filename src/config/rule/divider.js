import {localeProps} from '../../utils';

const label = '分割线';
const name = 'el-divider';

export default {
    icon: 'icon-divider',
    label,
    name,
    rule() {
        return {
            type: name,
            props: {},
            wrap: {show: false},
            native: false,
            children: [''],
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [{
            type: 'select',
            field: 'direction',
            title: '设置分割线方向',
            options: [{label: 'horizontal', value: 'horizontal'}, {label: 'vertical', value: 'vertical'}]
        }, {
            type: 'input',
            field: 'formCreateChild',
            title: '设置分割线文案',
        }, {
            type: 'select',
            field: 'contentPosition',
            title: '设置分割线文案的位置',
            options: [{label: 'left', value: 'left'}, {label: 'right', value: 'right'}, {
                label: 'center',
                value: 'center'
            }]
        }]);
    }
};
