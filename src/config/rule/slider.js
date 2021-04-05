import uniqueId from '@form-create/utils/lib/unique';

const label = '滑块';
const name = 'slider';

export default {
    icon: 'icon-slider',
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
        return [{type: 'inputNumber', field: 'min', title: '最小值'}, {
            type: 'inputNumber',
            field: 'max',
            title: '最大值'
        }, {type: 'switch', field: 'disabled', title: '是否禁用'}, {
            type: 'inputNumber',
            field: 'step',
            title: '步长'
        }, {type: 'switch', field: 'showInput', title: '是否显示输入框，仅在非范围选择时有效'}, {
            type: 'switch',
            field: 'showInputControls',
            title: '在显示输入框的情况下，是否显示输入框的控制按钮',
            value: true
        }, {type: 'switch', field: 'showStops', title: '是否显示间断点'}, {
            type: 'switch',
            field: 'range',
            title: '是否为范围选择'
        }, {type: 'switch', field: 'vertical', title: '是否竖向模式'}, {
            type: 'input',
            field: 'height',
            title: 'Slider 高度，竖向模式时必填'
        }];
    }
};