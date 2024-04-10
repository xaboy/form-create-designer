import FcDesigner from './components/FcDesigner.vue';
import DragTool from './components/DragTool.vue';
import Struct from './components/Struct.vue';
import Fetch from './components/Fetch.vue';
import Validate from './components/Validate.vue';
import DragBox from './components/DragBox.vue';
import Required from './components/Required.vue';
import TableOptions from './components/CustomTable.vue';
import CustomTableOptions from './components/CustomTableOptions.vue';
import {designerForm} from './utils/form';
import FcEditor from '@form-create/component-wangeditor';
import './style/index.css';
import draggable from 'vuedraggable/src/vuedraggable';
import unique from '@form-create/utils/lib/unique';
import {makeOptionsRule} from './utils/index';
import formCreate from './utils/form';
import globalUseLocale, {t} from './utils/locale';

const addComponent = (id, component) => {
    designerForm.component(id, component);
    formCreate.component(id, component);
}


designerForm.component('draggable', draggable);
designerForm.component('DragTool', DragTool);
designerForm.component('DragBox', DragBox);
designerForm.component('Validate', Validate);
designerForm.component('Struct', Struct);
designerForm.component('Fetch', Fetch);
designerForm.component('Required', Required);
designerForm.component('TableOptions', TableOptions);
designerForm.component('CustomTableOptions', CustomTableOptions);
addComponent('FcEditor', FcEditor);

designerForm.register('_fc', {
    load(fc, rule) {
        rule._id = unique();
        // if (fc.repeat)
        //     rule.field = unique();
        // if (fc.value) {
        //     rule.effect._fc = false;
        // }
    }
});

designerForm.register('_fc_tool', {
    load(_, rule) {
        rule.props.unique = unique();
    }
});

const install = function (Vue) {
    Vue.component('FcDesigner', FcDesigner);
};

FcDesigner.install = install;
FcDesigner.makeOptionsRule = makeOptionsRule;
FcDesigner.formCreate = formCreate;
FcDesigner.designerForm = designerForm;
FcDesigner.component = addComponent;
FcDesigner.useLocale = globalUseLocale;
FcDesigner.t = t;

export default FcDesigner;

export {formCreate, designerForm, install};
