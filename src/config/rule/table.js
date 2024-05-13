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
        rule.children = rule.props.columns || [];
        if (!rule.props) rule.props = {};
        rule.props.mode = ['fcSubForm', 'object', 'subForm'].indexOf(rule.type) > -1 ? 'subForm' : 'tableForm'
        rule.type = 'el-row';
    },
    parseRule(rule) {
        rule.props.columns=rule.children.map(i=>{
            i.rule = i.children
            i.children = undefined
            return i
        });
        rule.type = rule.props.mode === 'subForm' ? 'subForm' : 'tableForm';
    },

    rule() {
        return {
            type: 'el-row',
            field:  uniqueId(),
            style: 'width:100%;',
            props: {
                columns:[]
            },
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
