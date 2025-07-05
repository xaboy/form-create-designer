import unique from '@form-create/utils/lib/unique';
import {localeProps} from '../../utils';

const label = '表格表单';
const name = 'tableForm';

export default {
    menu: 'subform',
    icon: 'icon-table-form',
    label,
    name,
    mask: false,
    input: true,
    subForm: 'array',
    languageKey: ['add', 'operation', 'dataEmpty'],
    event: ['change', 'add', 'delete'],
    children: 'tableFormColumn',
    loadRule(rule) {
        if (!rule.props) rule.props = {};
        const columns = rule.props.columns || [];
        rule.children = columns.map(column => {
            return {
                type: 'tableFormColumn',
                _fc_drag_tag: 'tableFormColumn',
                props: {
                    label: column.label,
                    align: column.align,
                    required: column.required || false,
                    width: column.style.width || '',
                    color: column.style.color || '',
                },
                children: column.rule || []
            }
        });
        delete rule.props.columns;
    },
    parseRule(rule) {
        const children = rule.children || [];
        rule.props.columns = children.map(column => {
            return {
                label: column.props.label,
                required: column.props.required,
                align: column.props.align,
                style: {
                    width: column.props.width,
                    color: column.props.color,
                },
                rule: column.children || []
            };
        })
        rule.children = [];
    },
    rule({t}) {
        return {
            type: name,
            field: unique(),
            title: t('com.tableForm.name'),
            info: '',
            props: {},
            children: []
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            {
                type: 'switch',
                field: 'disabled'
            },
            {
                type: 'switch',
                field: 'addable',
                value: true,
            },
            {
                type: 'switch',
                field: 'deletable',
                value: true,
            },
            {
                type: 'switch',
                field: 'filterEmptyColumn',
                value: true,
            },
            {
                type: 'inputNumber',
                field: 'min',
                props: {min: 0}
            },
            {
                type: 'inputNumber',
                field: 'max',
                props: {min: 0}
            },
        ]);
    }
};
