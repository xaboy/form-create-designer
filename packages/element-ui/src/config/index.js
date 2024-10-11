import radio from './rule/radio';
import checkbox from './rule/checkbox';
import input from './rule/input';
import textarea from './rule/textarea';
import password from './rule/password';
import number from './rule/number';
import select from './rule/select';
import _switch from './rule/switch';
import slider from './rule/slider';
import time from './rule/time';
import timeRange from './rule/timeRange';
import date from './rule/date';
import dateRange from './rule/dateRange';
import rate from './rule/rate';
import color from './rule/color';
import row from './rule/row';
import col from './rule/col';
import tabPane from './rule/tabPane';
import divider from './rule/divider';
import cascader from './rule/cascader';
import upload from './rule/upload';
import transfer from './rule/transfer';
import tree from './rule/tree';
import alert from './rule/alert';
import text from './rule/text';
import space from './rule/space';
import tabs from './rule/tabs';
import button from './rule/button';
import editor from './rule/editor';
import group from './rule/group';
import subForm from './rule/subForm';
import card from './rule/card';
import collapse from './rule/collapse';
import collapseItem from './rule/collapseItem';
import treeSelect from './rule/treeSelect';
import tag from './rule/tag';
import html from './rule/html';
import table from './rule/table';
import tableForm from './rule/tableForm';
import tableFormColumn from './rule/tableFormColumn';


const ruleList = [
    input, textarea, password, number, radio, checkbox, select, _switch, rate, time, timeRange, slider, date, dateRange, color, cascader, upload, transfer, tree, treeSelect, editor,
    group, subForm, tableForm, tableFormColumn,
    alert, button, text, html, divider, tag,
    row, table, tabs, space, card, collapse,
    col, tabPane, collapseItem,
];

export default ruleList;

export function defaultDrag(rule) {
    return {
        icon: rule.field ? 'icon-input' : 'icon-cell',
        label: rule.field || rule.type,
        name: '_',
        mask: true,
        handleBtn: ['delete'],
        rule() {
            return rule;
        },
        props() {
            return [];
        }
    }
}
