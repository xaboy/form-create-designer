import {createApp} from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import formCreate from '@form-create/ant-design-vue';
import App from './App.vue';
import FcDesigner from '../src/index';

const app = createApp(App);

app.use(Antd);
app.use(formCreate);
app.use(FcDesigner);


app.mount('#app')
