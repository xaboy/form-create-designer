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
import group from './rule/group';

export default function createMenu({t}) {
    return [
        {
            name: 'main',
            title: t('menu.main'),
            list: [
                input, number, radio, checkbox, select, _switch, time, date, slider, rate, color, cascader, upload, transfer, tree, editor, group
            ]
        },
        {
            name: 'aide',
            title: t('menu.aide'),
            list: [
                alert, button, span, divider
            ]
        },
        {
            name: 'layout',
            title: t('menu.layout'),
            list: [
                row, tab, space
            ]
        },
    ];
}
