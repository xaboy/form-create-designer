import FcDesigner from './components/FcDesigner.vue';
import DragTool from './components/DragTool.vue';
import Struct from './components/Struct.vue';
import Row from './components/Row.vue';
import HtmlEditor from './components/HtmlEditor.vue';
import FnEditor from './components/FnEditor.vue';
import FnInput from './components/FnInput.vue';
import FetchConfig from './components/FetchConfig.vue';
import FieldInput from './components/FieldInput.vue';
import EventConfig from './components/EventConfig.vue';
import FnConfig from './components/FnConfig.vue';
import TableView from './components/table/TableView.vue';
import Table from './components/table/Table.vue';
import Validate from './components/Validate.vue';
import DragBox from './components/DragBox.vue';
import Required from './components/Required.vue';
import TableOptions from './components/TableOptions.vue';
import TreeOptions from './components/TreeOptions.vue';
import SizeInput from './components/style/SizeInput.vue';
import ColorInput from './components/style/ColorInput.vue';
import StyleConfig from './components/style/StyleConfig.vue';
import LanguageInput from './components/language/LanguageInput.vue';
import ValueInput from './components/ValueInput.vue';
import TableFormView from './components/tableForm/TableFormView.vue';
import TableForm from './components/tableForm/TableForm.vue';
import SignaturePad from './components/SignaturePad.vue';
import FcTitle from './components/FcTitle.vue';
import TableFormColumnView from './components/tableForm/TableFormColumnView.vue';
import ConfigItem from './components/style/ConfigItem.vue';
import formCreate, {designerForm} from './utils/form';
import FcEditor from '@form-create/component-wangeditor/dist/index.es.js';
import './style/index.css';
import './style/icon.css';
import draggable from 'vuedraggable/src/vuedraggable';
import {
    compareVersion,
    copyTextToClipboard,
    getInjectArg,
    localeOptions,
    localeProps,
    makeOptionsRule,
    makeRequiredRule,
    makeTreeOptions,
    makeTreeOptionsRule,
    toJSON
} from './utils/index';
import globalUseLocale, {t} from './utils/locale';
import './utils/highlight/style.css';
import menus from './config/menu';
import dragRuleList from './config/index';

const addComponent = (id, component, previewComponent) => {
    designerForm.component(id, previewComponent || component);
    formCreate.component(id, component);
};

designerForm.component('draggable', draggable);
designerForm.component('DragTool', DragTool);
designerForm.component('DragBox', DragBox);
designerForm.component('Validate', Validate);
designerForm.component('Struct', Struct);
designerForm.component('HtmlEditor', HtmlEditor);
designerForm.component('FetchConfig', FetchConfig);
designerForm.component('FnEditor', FnEditor);
designerForm.component('FnInput', FnInput);
designerForm.component('Required', Required);
designerForm.component('TableOptions', TableOptions);
designerForm.component('TreeOptions', TreeOptions);
designerForm.component('EventConfig', EventConfig);
designerForm.component('SizeInput', SizeInput);
designerForm.component('ColorInput', ColorInput);
designerForm.component('StyleConfig', StyleConfig);
designerForm.component('LanguageInput', LanguageInput);
designerForm.component('ConfigItem', ConfigItem);
designerForm.component('FieldInput', FieldInput);
designerForm.component('FnConfig', FnConfig);
designerForm.component('FcRow', Row);
designerForm.component('ValueInput', ValueInput);
designerForm.component('TableFormColumn', TableFormColumnView);
addComponent('FcEditor', FcEditor);
addComponent('FcTitle', FcTitle);
addComponent('SignaturePad', SignaturePad);
addComponent('FcTable', Table, TableView);
addComponent('TableForm', TableForm, TableFormView);

const addMenu = function (menu, before) {
    if (!Array.isArray(menu)) {
        menu = [menu];
    }
    if (before) {
        menus.unshift(...menu);
    } else {
        menus.push(...menu);
    }
}

const addDragRule = function (dragRule, before) {
    if (!Array.isArray(dragRule)) {
        dragRule = [dragRule];
    }
    if (before) {
        dragRuleList.unshift(...dragRule);
    } else {
        dragRuleList.push(...dragRule);
    }
}

const install = function (Vue) {
    Vue.component('FcDesigner', FcDesigner);
};

FcDesigner.install = install;
FcDesigner.makeOptionsRule = makeOptionsRule;
FcDesigner.copyTextToClipboard = copyTextToClipboard;
FcDesigner.getInjectArg = getInjectArg;
FcDesigner.localeOptions = localeOptions;
FcDesigner.localeProps = localeProps;
FcDesigner.makeRequiredRule = makeRequiredRule;
FcDesigner.makeTreeOptions = makeTreeOptions;
FcDesigner.makeTreeOptionsRule = makeTreeOptionsRule;
FcDesigner.toJSON = toJSON;
FcDesigner.formCreate = formCreate;
FcDesigner.designerForm = designerForm;
FcDesigner.component = addComponent;
FcDesigner.useLocale = globalUseLocale;
FcDesigner.addMenu = addMenu;
FcDesigner.addDragRule = addDragRule;
FcDesigner.t = t;

FcDesigner.utils = {
    copyTextToClipboard,
    getInjectArg,
    localeOptions,
    localeProps,
    makeOptionsRule,
    makeRequiredRule,
    makeTreeOptions,
    makeTreeOptionsRule,
    toJSON
}

const minVersion = '2.7.7';

if (compareVersion(minVersion, formCreate.version) === 1) {
    console.warn('Please use FormCreate version ' + minVersion + ' or greater, see https://github.com/xaboy/form-create.');
}

FcDesigner.version = '1.3.0';

if (typeof window !== 'undefined') {
    window.FcDesigner = FcDesigner;
}


export default FcDesigner;

export {
    formCreate,
    designerForm,
    install,
    copyTextToClipboard,
    getInjectArg,
    localeOptions,
    localeProps,
    makeOptionsRule,
    makeRequiredRule,
    makeTreeOptions,
    makeTreeOptionsRule,
    addDragRule,
    addMenu,
    toJSON
};

