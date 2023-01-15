import {localeProps} from '../../utils';

const label = '按钮';
const name = 'el-button';

export default {
    icon: 'icon-button',
    label,
    name,
    mask: false,
    rule({t}) {
        return {
            type: name,
            props: {},
            children: [t('components.el-button.name')],
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [{
            type: 'input',
            field: 'formCreateChild',
            title: '内容',
        }, {
            type: 'select',
            field: 'size',
            title: '尺寸',
            options: [{label: 'large', value: 'large'}, {label: 'default', value: 'default'}, {
                label: 'small',
                value: 'small'
            }]
        }, {
            type: 'select',
            field: 'type',
            title: '类型',
            options: [{label: 'primary', value: 'primary'}, {
                label: 'success',
                value: 'success'
            }, {label: 'warning', value: 'warning'}, {label: 'danger', value: 'danger'}, {
                label: 'info',
                value: 'info'
            }]
        }, {type: 'switch', field: 'plain', title: '是否朴素按钮'}, {
            type: 'switch',
            field: 'round',
            title: '是否圆角按钮'
        }, {type: 'switch', field: 'circle', title: '是否圆形按钮'}, {
            type: 'switch',
            field: 'loading',
            title: '是否加载中状态'
        }, {type: 'switch', field: 'disabled', title: '是否禁用状态'}, {
            type: 'input',
            field: 'icon',
            title: '图标类名'
        }]);
    }
};
