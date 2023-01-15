import {localeProps} from '../../utils';

const label = '标签页';
const name = 'tab-pane';

export default {
    label,
    name,
    inside: true,
    drag: true,
    dragBtn: false,
    mask: false,
    rule({t}) {
        return {
            type: 'el-tab-pane',
            props: {label: t('components.el-transfer.name')},
            children: []
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [{type: 'input', field: 'label', title: '选项卡标题'}, {
            type: 'switch',
            field: 'disabled',
            title: '是否禁用'
        }, {type: 'input', field: 'name', title: '与选项卡绑定值 value 对应的标识符，表示选项卡别名'}, {
            type: 'switch',
            field: 'lazy',
            title: '标签是否延迟渲染'
        }]);
    }
};
