import uniqueId from '@form-create/utils/lib/unique';
import {localeProps, makeTreeOptions, makeTreeOptionsRule} from '../../utils/index';

const label = '树形控件';
const name = 'tree';

export default {
    menu: 'main',
    icon: 'icon-tree',
    label,
    name,
    input: true,
    event: ['check', 'expand', 'select', 'rightClick'],
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
                fieldNames: {
                    title: 'label',
                    key: 'id',
                },
                checkable: true,
                treeData: makeTreeOptions(t('props.option'), {label: 'label', value: 'id'}, 3),
            },
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            makeTreeOptionsRule(t, 'props.treeData', 'label', 'id'),
            {
                type: 'TableOptions',
                field: 'fieldNames',
                props: {
                    column: [{label: t('props.key'), key: 'label'}, {label: t('props.value'), key: 'value'}],
                    valueType: 'object'
                }
            }, {
                type: 'switch',
                field: 'showLine',
            }, {
                type: 'switch',
                field: 'defaultExpandAll',
            }]);
    }
};
