import {createApp} from 'vue';
import ELEMENT from 'element-plus';
import 'element-plus/dist/index.css';
import formCreate from '@form-create/element-ui';
import App from './App.vue';
import FcDesigner from '../src/index';

const app = createApp(App);

app.use(ELEMENT);
app.use(formCreate);
app.use(FcDesigner);


app.mount('#app')
