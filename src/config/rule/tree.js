import uniqueId from '@form-create/utils/lib/unique';
import {localeProps, makeOptionsRule, makeRequiredRule} from '../../utils/index';

const label = '树形控件';
const name = 'tree';

export default {
    icon: 'icon-tree',
    label,
    name,
    rule({t}) {
        const opt = t('props.option');
        return {
            type: name,
            field: uniqueId(),
            title: t('components.tree.name'),
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
                data: [1, 2].map(value => {
                    return {
                        label: opt + value,
                        id: value,
                        children: [],
                    }
                }),
            },
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            makeRequiredRule(),
            makeOptionsRule(t, 'props.data', false),
            {type: 'input', field: 'emptyText', title: '内容为空的时候展示的文本'}, {
                type: 'Struct',
                field: 'props',
                title: '配置选项，具体看下表',
                props: {defaultValue: {}}
            }, {type: 'switch', field: 'renderAfterExpand', title: '是否在第一次展开某个树节点后才渲染其子节点', value: true}, {
                type: 'switch',
                field: 'defaultExpandAll',
                title: '是否默认展开所有节点',
            }, {
                type: 'switch',
                field: 'expandOnClickNode',
                title: '是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。',
                value: true
            }, {
                type: 'switch',
                field: 'checkOnClickNode',
                title: '是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。'
            }, {type: 'switch', field: 'autoExpandParent', title: '展开子节点的时候是否自动展开父节点', value: true}, {
                type: 'switch',
                field: 'checkStrictly',
                title: '在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false'
            }, {type: 'switch', field: 'accordion', title: '是否每次只打开一个同级树节点展开'}, {
                type: 'inputNumber',
                field: 'indent',
                title: '相邻级节点间的水平缩进，单位为像素'
            }, {type: 'input', field: 'iconClass', title: '自定义树节点的图标'}, {
                type: 'input',
                field: 'nodeKey',
                title: '每个树节点用来作为唯一标识的属性，整棵树应该是唯一的'
            }]);
    }
};
