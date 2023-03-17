import uniqueId from '@form-create/utils/lib/unique';
import {localeProps, makeOptionsRule, makeRequiredRule} from '../../utils/index';

const label = '级联选择器';
const name = 'cascader';

export default {
    icon: 'icon-cascader',
    label,
    name,
    rule({t}) {
        const opt = t('props.option');
        return {
            type: name,
            field: uniqueId(),
            title: t('components.cascader.name'),
            info: '',
            effect: {
                fetch: ''
            },
            $required: false,
            props: {
                options: [1, 2].map(value => {
                    return {
                        label: opt + value,
                        value,
                        children: [],
                    }
                }),
            }
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            makeRequiredRule(),
            makeOptionsRule(t, 'props.options', false),
            {
                type: 'Object',
                field: 'props',
                title: '配置选项',
                props: {
                    rule: localeProps(t, name + '.propsOpt', [{
                        type: 'select',
                        field: 'expandTrigger',
                        title: '次级菜单的展开方式',
                        options: [{label: 'click', value: 'click'}, {label: 'hover', value: 'hover'}]
                    }, {type: 'switch', field: 'multiple', title: '是否多选'}, {
                        type: 'switch',
                        field: 'checkStrictly',
                        title: '是否严格的遵守父子节点不互相关联'
                    }, {
                        type: 'switch',
                        field: 'emitPath',
                        title: '在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值',
                        value: true
                    }, {type: 'input', field: 'value', title: '指定选项的值为选项对象的某个属性值', value: 'value'}, {
                        type: 'input',
                        field: 'label',
                        title: '指定选项标签为选项对象的某个属性值',
                        value: 'label'
                    }, {type: 'input', field: 'children', title: '指定选项的子选项为选项对象的某个属性值', value: 'children'}, {
                        type: 'input',
                        field: 'disabled',
                        title: '指定选项的禁用为选项对象的某个属性值',
                        value: 'disabled'
                    }, {type: 'input', field: 'leaf', title: '指定选项的叶子节点的标志位为选项对象的某个属性值'}])
                }
            }, {
                type: 'select',
                field: 'size',
                title: '尺寸',
                options: [{label: 'large', value: 'large'}, {label: 'default', value: 'default'}, {
                    label: 'small',
                    value: 'small'
                }]
            }, {type: 'input', field: 'placeholder', title: '输入框占位文本'}, {
                type: 'switch',
                field: 'disabled',
                title: '是否禁用'
            }, {type: 'switch', field: 'clearable', title: '是否支持清空选项'}, {
                type: 'switch',
                field: 'showAllLevels',
                title: '输入框中是否显示选中值的完整路径',
                value: true
            }, {type: 'switch', field: 'collapseTags', title: '多选模式下是否折叠Tag'}, {
                type: 'input',
                field: 'separator',
                title: '选项分隔符'
            }]);
    }
};
