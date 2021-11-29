import Vue from 'vue';
import ELEMENT from 'element-ui';
import IVIEW from'view-design';
import 'element-ui/lib/theme-chalk/index.css';
import 'view-design/dist/styles/iview.css';
import formCreate from '@form-create/iview4';
import App from './App';
import FcDesigner from '../src/index';

Vue.use(ELEMENT);
Vue.use(IVIEW);
Vue.use(formCreate);
Vue.component('FcDesigner', FcDesigner);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount('#app');
