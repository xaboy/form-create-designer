import {localeProps, makeRequiredRule} from '../../utils';
import uniqueId from '@form-create/utils/lib/unique';

const label = '子表单';
const name = 'group';

export default {
    icon: 'icon-group',
    label,
    name,
    inside: false,
    drag: true,
    dragBtn: true,
    mask: false,
    loadRule(rule) {
        rule.children = rule.props.rule || [];
        if (!rule.props) rule.props = {};
        rule.props.mode = ['fcSubForm', 'object', 'subForm'].indexOf(rule.type) > -1 ? 'subForm' : 'group'
        rule.type = 'FcRow';
        delete rule.props.rule;
    },
    parseRule(rule) {
        rule.props.rule = rule.children;
        rule.type = rule.props.mode === 'subForm' ? 'subForm' : 'group';
        delete rule.children;
        delete rule.props.mode;
    },
    rule({t}) {
        return {
            type: 'FcRow',
            field: uniqueId(),
            title: t('components.group.name'),
            info: '',
            $required: false,
            props: {},
            children: []
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [makeRequiredRule(), {
            type: 'switch',
            field: 'disabled',
            title: '是否禁用'
        }, {type: 'switch', field: 'syncDisabled', title: '是否与子表单强制同步 disabled 状态', value: true},
        {
            type: 'select',
            field: 'mode',
            title: '组件类型',
            options: [{
                label: t('components.group.props.modeOpts.group'),
                value: 'group'
            }, {label: t('components.group.props.modeOpts.subform'), value: 'subForm'}],
            value: 'group'
        },
        {type: 'switch', field: 'button', title: '是否显示操作按钮', value: true},
        {type: 'switch', field: 'sortBtn', title: '是否显示排序按钮', value: true},
        {type: 'inputNumber', field: 'expand', title: '设置默认展开几项'},
        {type: 'inputNumber', field: 'min', title: '设置最小添加几项'},
        {type: 'inputNumber', field: 'max', title: '设置最多添加几项'},
        ]);
    }
};
