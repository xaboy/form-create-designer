import uniqueId from '@form-create/utils/lib/unique';

const label = '评分';
const name = 'rate';

export default {
    icon: 'icon-rate',
    label,
    name,
    rule() {
        return {
            type: name,
            field: uniqueId(),
            title: label,
            info: '',
            props: {},
        };
    },
    props() {
        return [{type: 'inputNumber', field: 'max', title: '最大分值'}, {
            type: 'switch',
            field: 'disabled',
            title: '是否为只读'
        }, {type: 'switch', field: 'allowHalf', title: '是否允许半选'}, {
            type: 'input',
            field: 'voidColor',
            title: '未选中 icon 的颜色'
        }, {type: 'input', field: 'disabledVoidColor', title: '只读时未选中 icon 的颜色'}, {
            type: 'input',
            field: 'voidIconClass',
            title: '未选中 icon 的类名'
        }, {type: 'input', field: 'disabledVoidIconClass', title: '只读时未选中 icon 的类名'}, {
            type: 'switch',
            field: 'showScore',
            title: '是否显示当前分数，show-score 和 show-text 不能同时为真'
        }, {type: 'input', field: 'textColor', title: '辅助文字的颜色'}, {
            type: 'input',
            field: 'scoreTemplate',
            title: '分数显示模板'
        }];
    }
};