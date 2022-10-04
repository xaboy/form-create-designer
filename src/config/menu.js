import radio from './rule/radio';
import checkbox from './rule/checkbox';
import input from './rule/input';
import number from './rule/number';
import select from './rule/select';
import _switch from './rule/switch';
import slider from './rule/slider';
import time from './rule/time';
import date from './rule/date';
import rate from './rule/rate';
import color from './rule/color';
import row from './rule/row';
import divider from './rule/divider';
import cascader from './rule/cascader';
import upload from './rule/upload';
import transfer from './rule/transfer';
import tree from './rule/tree';
import alert from './rule/alert';
import span from './rule/span';
import space from './rule/space';
import button from './rule/button';
import editor from './rule/editor';
import tab from './rule/tab';

export default function createMenu() {
    return [
        {
            name: 'main',
            title: '表单组件',
            list: [
                input, number, radio, checkbox, select, _switch, time, date, slider, rate, color, cascader, upload, transfer, tree, editor
            ]
        },
        {
            name: 'aide',
            title: '辅助组件',
            list: [
                alert, button, span, divider
            ]
        },
        {
            name: 'layout',
            title: '布局组件',
            list: [
                row, /*tab,*/ space
            ]
        },
    ];
}