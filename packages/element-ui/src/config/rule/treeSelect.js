import uniqueId from '@form-create/utils/lib/unique';
import {localeProps, makeTreeOptions, makeTreeOptionsRule} from '../../utils/index';

const label = '树形选择';
const name = 'elTreeSelect';

export default {
    menu: 'main',
    icon: 'icon-tree-select',
    label,
    name,
    input: true,
    event: ['change', 'visibleChange', 'removeTag', 'clear', 'blur', 'focus'],
    validate: ['string', 'number', 'array'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.elTreeSelect.name'),
            info: '',
            effect: {
                fetch: ''
            },
            $required: false,
            props: {
                nodeKey: 'value',
                showCheckbox: true,
                data: makeTreeOptions(t('props.option'), {label: 'label', value: 'value'}, 3),
            },
        };
    },
    watch: {
        multiple({rule}) {
            rule.key = uniqueId();
        }
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            makeTreeOptionsRule(t, 'props.data', 'label', 'value'),
            {type: 'switch', field: 'multiple'}, {
                type: 'switch',
                field: 'disabled'
            }, {type: 'switch', field: 'clearable'}, {
                type: 'switch',
                field: 'collapseTags'
            }, {
                type: 'inputNumber',
                field: 'multipleLimit',
                props: {min: 0}
            }, {type: 'input', field: 'placeholder'},
            {
                type: 'TableOptions',
                field: 'props',
                props: {
                    column: [{label: t('props.key'), key: 'label'}, {label: t('props.value'), key: 'value'}],
                    valueType: 'object'
                }
            }, {
                type: 'switch',
                field: 'renderAfterExpand',
                value: true
            }, {
                type: 'switch',
                field: 'defaultExpandAll',
            }, {
                type: 'switch',
                field: 'expandOnClickNode',
                value: true
            }, {
                type: 'switch',
                field: 'checkOnClickNode'
            }, {
                type: 'input',
                field: 'nodeKey'
            }]);
    }
};
