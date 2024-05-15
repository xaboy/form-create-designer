import {localeProps} from '../../utils';
import uniqueId from '@form-create/utils/lib/unique';

const label = '表格';
const name = 'tableForm';
// const title = ''
export default {
    icon: 'icon-tab',
    label,
    name,
    children: 'table-column',
    mask: false,
    loadRule(rule) {
        rule.props.mode = ['fcSubForm', 'object', 'subForm'].indexOf(rule.type) > -1 ? 'subForm' : 'tableForm'
        rule.type = 'el-row';

    },
    parseRule(rule) {
        rule.props.columns = rule.children
        rule.type = rule.props.mode === 'subForm' ? 'subForm' : 'tableForm';
        rule.value=[{}]
    },

    rule() {
        return {
            type: 'el-row',
            field: uniqueId(),
            style: 'width:100%;',
            props: {
                columns: []
            },
            children: []
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', []);
    }
};
