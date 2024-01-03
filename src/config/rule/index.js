import radio from './radio';
import checkbox from './checkbox';
import input from './input';
import number from './number';
import select from './select';
import _switch from './switch';
import slider from './slider';
import time from './time';
import date from './date';
import rate from './rate';
import color from './color';
import row from './row';
import col from './col';
import tabPane from './tabPane';
import divider from './divider';
import cascader from './cascader';
import upload from './upload';
import transfer from './transfer';
import tree from './tree';
import alert from './alert';
import span from './span';
import space from './space';
import tab from './tab';
import button from './button';
import editor from './editor';
import group from './group';


const ruleList = {
    [radio.name]: radio,
    [checkbox.name]: checkbox,
    [input.name]: input,
    [number.name]: number,
    [select.name]: select,
    [_switch.name]: _switch,
    [slider.name]: slider,
    [time.name]: time,
    [date.name]: date,
    [rate.name]: rate,
    [color.name]: color,
    [row.name]: row,
    [col.name]: col,
    [tab.name]: tab,
    [tabPane.name]: tabPane,
    [divider.name]: divider,
    [cascader.name]: cascader,
    [upload.name]: upload,
    [transfer.name]: transfer,
    [tree.name]: tree,
    [alert.name]: alert,
    [span.name]: span,
    [space.name]: space,
    [button.name]: button,
    [editor.name]: editor,
    [group.name]: group,
};

export default ruleList;
