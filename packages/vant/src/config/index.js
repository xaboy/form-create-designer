import input from './rule/input';
import textarea from './rule/textarea';
import password from './rule/password';
import stepper from './rule/stepper';
import checkbox from './rule/checkbox';
import radio from './rule/radio';
import select from './rule/select';
import _switch from './rule/switch';
import rate from './rule/rate';
import date from './rule/date';
import time from './rule/time';
import cascader from './rule/cascader';
import slider from './rule/slider';
import calendar from './rule/calendar';
import calendarRange from './rule/calendarRange';
import uploader from './rule/uploader';
import group from './rule/group';
import subForm from './rule/subForm';
import tableForm from './rule/tableForm';
import tableFormColumn from './rule/tableFormColumn';
import tag from './rule/tag';
import noticeBar from './rule/noticeBar';
import divider from './rule/divider';
import collapse from './rule/collapse';
import collapseItem from './rule/collapseItem';
import space from './rule/space';
import row from './rule/row';
import col from './rule/col';
import button from './rule/button';
import tabs from './rule/tabs';
import tabPane from './rule/tabPane';
import cellGroup from './rule/cellGroup';
import cell2 from './rule/cell2';
import text from './rule/text';
import html from './rule/html';
import table from './rule/table';
import icon from './rule/icon';


const ruleList = [
    input, textarea, password, stepper, radio, checkbox, select, _switch, rate, time, date, cascader, calendar, calendarRange, slider, uploader,
    group, subForm, tableForm, tableFormColumn,
    noticeBar, button, text, html, divider, tag, icon,
    row, col, table,
    tabs, tabPane, space, collapse, collapseItem, cellGroup, cell2,

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
