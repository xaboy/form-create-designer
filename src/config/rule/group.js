import {localeProps} from '../../utils';
import uniqueId from '@form-create/utils/lib/unique';

const label = '子表单';
const name = 'group';

export default {
    menu: 'subform',
    icon: 'icon-subform',
    label,
    name,
    inside: false,
    drag: true,
    dragBtn: true,
    mask: false,
    input: true,
    event: ['change'],
    subForm: 'array',
    loadRule(rule) {
        rule.children = rule.props.rule || [];
        rule.type = 'FcRow';
        delete rule.props.rule;
    },
    parseRule(rule) {
        rule.props.rule = rule.children;
        rule.type = 'group';
        delete rule.children;
        delete rule.props.mode;
    },
    rule({t}) {
        return {
            type: 'fcRow',
            field: uniqueId(),
            title: t('com.group.name'),
            info: '',
            $required: false,
            props: {},
            children: []
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [{
            type: 'switch',
            field: 'disabled'
        }, {type: 'switch', field: 'syncDisabled', value: true},
        {type: 'switch', field: 'button', value: true},
        {type: 'switch', field: 'sortBtn', value: true},
        {type: 'inputNumber', field: 'expand'},
        {type: 'inputNumber', field: 'min'},
        {type: 'inputNumber', field: 'max'},
        ]);
    }
};
