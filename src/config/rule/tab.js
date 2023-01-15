import {localeProps} from '../../utils';

const label = '标签页';
const name = 'tab';

export default {
    icon: 'icon-tab',
    label,
    name,
    children: 'tab-pane',
    mask: false,
    rule() {
        return {
            type: 'el-tabs',
            style: 'width:100%;',
            children: []
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [{
            type: 'select',
            field: 'type',
            title: '风格类型',
            options: [{
                label: 'card',
                value: 'card'
            }, {label: 'border-card', value: 'border-card'}]
        }, {type: 'switch', field: 'closable', title: '标签是否可关闭'}, {
            type: 'select',
            field: 'tabPosition',
            title: '选项卡所在位置',
            options: [{label: 'top', value: 'top'}, {label: 'right', value: 'right'}, {
                label: 'left',
                value: 'left'
            }]
        }, {type: 'switch', field: 'stretch', title: '标签的宽度是否自撑开'}]);
    }
};
