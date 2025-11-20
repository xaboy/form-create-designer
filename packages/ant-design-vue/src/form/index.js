import formCreate from '@form-create/ant-design-vue';
import FcEditor from '@form-create/component-wangeditor';
import FcTitle from '../components/FcTitle.vue';
import SignaturePad from '../components/SignaturePad.vue';
import TableForm from '../components/tableForm/TableForm.vue';
import Table from '../components/table/Table.vue';

const install = (formCreate) => {
    formCreate.component('FcEditor', FcEditor);
    formCreate.component('FcTitle', FcTitle);
    formCreate.component('SignaturePad', SignaturePad);
    formCreate.component('TableForm', TableForm);
    formCreate.component('FcTable', Table);
}

install(formCreate);

export default install;
