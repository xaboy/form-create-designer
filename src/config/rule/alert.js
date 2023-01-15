import {localeProps} from '../../utils';

const label = '提示';
const name = 'el-alert';

export default {
    icon: 'icon-alert',
    label,
    name,
    rule({t}) {
        return {
            type: name,
            props: {
                title: t('components.el-alert.name'),
                description: t('components.el-alert.description'),
                type: 'success',
                effect: 'dark',
            },
            children: []
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [{type: 'input', field: 'title', title: '标题'}, {
            type: 'select',
            field: 'type',
            title: '主题',
            options: [{label: 'success', value: 'success'}, {label: 'warning', value: 'warning'}, {
                label: 'info',
                value: 'info'
            }, {label: 'error', value: 'error'}]
        }, {type: 'input', field: 'description', title: '辅助性文字'}, {
            type: 'switch',
            field: 'closable',
            title: '是否可关闭',
            value: true
        }, {type: 'switch', field: 'center', title: '文字是否居中', value: true}, {
            type: 'input',
            field: 'closeText',
            title: '关闭按钮自定义文本'
        }, {type: 'switch', field: 'showIcon', title: '是否显示图标'}, {
            type: 'select',
            field: 'effect',
            title: '选择提供的主题',
            options: [{label: 'light', value: 'light'}, {label: 'dark', value: 'dark'}]
        }]);
    }
};
