import FcDesigner from './components/FcDesigner.vue';
import DragTool from './components/DragTool.vue';
import Struct from './components/Struct.vue';
import DragBox from './components/DragBox.vue';
import formCreate from '@form-create/element-ui';
import FcEditor from '@form-create/component-wangeditor';
import './style/index.css';
import draggable from 'vuedraggable';
import unique from '@form-create/utils/lib/unique';

formCreate.component('draggable', draggable);
formCreate.component('DragTool', DragTool);
formCreate.component('DragBox', DragBox);
formCreate.component('Struct', Struct);
formCreate.component('FcEditor', FcEditor);

formCreate.register('_fc', {
    init(_, rule) {
        rule.id = unique();
        if (rule.field)
            rule.field = unique();
    }
});

formCreate.register('_fc_tool', {
    init(_, rule) {
        rule.props.unique = unique();
    }
});

FcDesigner.install = function (Vue) {
    Vue.component('FcDesigner', FcDesigner);
};

export default FcDesigner;