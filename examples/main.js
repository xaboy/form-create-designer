import formCreate from "@form-create/element-ui";
import ELEMENT from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Vue from "vue";
import FcDesigner from "../src/index.js";
import App from "./App.vue";

Vue.use(ELEMENT);
Vue.use(formCreate);
Vue.component("FcDesigner", FcDesigner);

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
}).$mount("#app");
