import {localeProps} from '../../utils';

const label = '折叠面板';
const name = 'vanCollapse';

export default {
    menu: 'layout',
    icon: 'icon-collapse',
    label,
    name,
    mask: false,
    event: ['change'],
    children: 'vanCollapseItem',
    parseRule(rule) {
        rule.props.modelValue = [];
    },
    loadRule(rule) {
        rule.props.modelValue = [];
    },
    rule() {
        return {
            type: name,
            props: {
                modelValue: []
            },
            sync: ['modelValue'],
            style: {
                width: '100%',
            },
            children: []
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [{
            type: 'switch',
            field: 'accordion'
        }]);
    }
};
