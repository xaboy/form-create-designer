import FcDesignerMobile from './components/FcDesigner.vue';
import DragTool from './components/DragTool.vue';
import Struct from './components/Struct.vue';
import Row from './components/Row.vue';
import HtmlEditor from './components/HtmlEditor.vue';
import FnEditor from './components/FnEditor.vue';
import FnInput from './components/FnInput.vue';
import FetchConfig from './components/FetchConfig.vue';
import ConfigItem from './components/style/ConfigItem.vue';
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
import TableFormView from './components/tableForm/TableFormView.vue';
import TableForm from './components/tableForm/TableForm.vue';
import TableFormColumnView from './components/tableForm/TableFormColumnView.vue';
import SizeInput from './components/style/SizeInput.vue';
import ColorInput from './components/style/ColorInput.vue';
import StyleConfig from './components/style/StyleConfig.vue';
import LanguageInput from './components/language/LanguageInput.vue';
import FcEditor from '@form-create/component-wangeditor';
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
import formCreate, {designerForm, elmFormCreate} from './utils/form';
import globalUseLocale, {t} from './utils/locale';
import './style/index.css';
import './style/icon.css';
import './utils/highlight/style.css';

const addComponent = (id, component, previewComponent) => {
    designerForm.component(id, previewComponent || component);
    formCreate.component(id, component);
}

designerForm.component('DragTool', DragTool);
designerForm.component('DragBox', DragBox);
elmFormCreate.component('draggable', draggable);
elmFormCreate.component('DragTool', DragTool);
elmFormCreate.component('DragBox', DragBox);
elmFormCreate.component('Validate', Validate);
elmFormCreate.component('Struct', Struct);
elmFormCreate.component('HtmlEditor', HtmlEditor);
elmFormCreate.component('FetchConfig', FetchConfig);
elmFormCreate.component('FnEditor', FnEditor);
elmFormCreate.component('FnInput', FnInput);
elmFormCreate.component('Required', Required);
elmFormCreate.component('TableOptions', TableOptions);
elmFormCreate.component('TreeOptions', TreeOptions);
elmFormCreate.component('TableFormColumn', TableFormColumnView);
elmFormCreate.component('EventConfig', EventConfig);
elmFormCreate.component('ColorInput', ColorInput);
elmFormCreate.component('SizeInput', SizeInput);
elmFormCreate.component('StyleConfig', StyleConfig);
elmFormCreate.component('LanguageInput', LanguageInput);
elmFormCreate.component('ConfigItem', ConfigItem);
elmFormCreate.component('FieldInput', FieldInput);
elmFormCreate.component('FnConfig', FnConfig);
designerForm.component('FcRow', Row);
addComponent('FcEditor', FcEditor);
addComponent('TableForm', TableForm, TableFormView);
addComponent('FcTable', Table, TableView);

const install = function (Vue) {
    Vue.component('FcDesignerMobile', FcDesignerMobile);
};

FcDesignerMobile.install = install;
FcDesignerMobile.makeOptionsRule = makeOptionsRule;
FcDesignerMobile.copyTextToClipboard = copyTextToClipboard;
FcDesignerMobile.getInjectArg = getInjectArg;
FcDesignerMobile.localeOptions = localeOptions;
FcDesignerMobile.localeProps = localeProps;
FcDesignerMobile.makeRequiredRule = makeRequiredRule;
FcDesignerMobile.makeTreeOptions = makeTreeOptions;
FcDesignerMobile.makeTreeOptionsRule = makeTreeOptionsRule;
FcDesignerMobile.toJSON = toJSON;
FcDesignerMobile.formCreate = formCreate;
FcDesignerMobile.designerForm = designerForm;
FcDesignerMobile.component = addComponent;
FcDesignerMobile.useLocale = globalUseLocale;
FcDesignerMobile.t = t;

FcDesignerMobile.utils = {
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

if (compareVersion('3.1.27', formCreate.version) === 1) {
    console.warn('Please use FormCreate version 3.1.27 or greater, see https://github.com/xaboy/form-create.');
}

export default FcDesignerMobile;

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
    toJSON
};
