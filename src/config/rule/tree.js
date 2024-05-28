import uniqueId from '@form-create/utils/lib/unique';
import {localeProps, makeTreeOptions, makeTreeOptionsRule} from '../../utils/index';

const label = '树形控件';
const name = 'tree';

export default {
    menu: 'main',
    icon: 'icon-tree',
    label,
    name,
    event: ['nodeClick', 'nodeContextmenu', 'checkChange', 'check', 'currentChange', 'nodeExpand', 'nodeCollapse', 'nodeDragStart', 'nodeDragEnter', 'nodeDragLeave', 'nodeDragOver', 'nodeDragEnd', 'nodeDrop'],
    validate: ['string', 'number', 'array'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.tree.name'),
            info: '',
            effect: {
                fetch: ''
            },
            $required: false,
            props: {
                props: {
                    label: 'label',
                },
                showCheckbox: true,
                nodeKey: 'id',
                data: makeTreeOptions(t('props.option'), {label: 'label', value: 'id'}, 3),
            },
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            makeTreeOptionsRule({t, to: 'props.data', label: 'label', value: 'id'}),
            {type: 'input', field: 'emptyText'}, {
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
            }, {type: 'switch', field: 'autoExpandParent', value: true}, {
                type: 'switch',
                field: 'checkStrictly'
            }, {type: 'switch', field: 'accordion'}, {
                type: 'inputNumber',
                field: 'indent'
            }, {
                type: 'input',
                field: 'nodeKey'
            }]);
    }
};
