import uniqueId from '@form-create/utils/lib/unique';
import {localeProps} from '../../utils';

const label = '穿梭框';
const name = 'el-transfer';

const generateData = () => {
    const data = [];
    for (let i = 1; i <= 15; i++) {
        data.push({
            key: i,
            label: `备选项 ${i}`,
            disabled: i % 4 === 0
        });
    }
    return data;
};

export default {
    icon: 'icon-transfer',
    label,
    name,
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('components.el-transfer.name'),
            info: '',
            $required: false,
            props: {
                data: generateData()
            }
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [{
            type: 'Struct',
            field: 'data',
            title: 'Transfer 的数据源',
            props: {defaultValue: []}
        }, {type: 'switch', field: 'filterable', title: '是否可搜索'}, {
            type: 'input',
            field: 'filterPlaceholder',
            title: '搜索框占位符'
        }, {
            type: 'select',
            field: 'targetOrder',
            title: '右侧列表元素的排序策略',
            info: '若为 original，则保持与数据源相同的顺序；若为 push，则新加入的元素排在最后；若为 unshift，则新加入的元素排在最前',
            options: [{label: 'original', value: 'original'}, {
                label: 'push',
                value: 'push'
            }, {label: 'unshift', value: 'unshift'}]
        }, {
            type: 'Struct',
            field: 'titles',
            title: '自定义列表标题',
            props: {defaultValue: []}
        }, {
            type: 'Struct',
            field: 'buttonTexts',
            title: '自定义按钮文案',
            props: {defaultValue: []}
        }, {
            type: 'Struct',
            field: 'format',
            title: '列表顶部勾选状态文案',
            props: {defaultValue: {}}
        }, {
            type: 'Struct',
            field: 'props',
            title: '数据源的字段别名',
            props: {defaultValue: {}}
        }, {
            type: 'Struct',
            field: 'leftDefaultChecked',
            title: '初始状态下左侧列表的已勾选项的 key 数组',
            props: {defaultValue: []}
        }, {
            type: 'Struct',
            field: 'rightDefaultChecked',
            title: '初始状态下右侧列表的已勾选项的 key 数组',
            props: {defaultValue: []}
        }]);
    }
};
