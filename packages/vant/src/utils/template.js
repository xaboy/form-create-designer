export function mobileTemplate(json, options) {
    return `<template>
  <form-create-mobile
    v-model="formData"
    v-model:api="fapi"
    :rule="rule"
    :option="option"
    @submit="onSubmit"
  ></form-create-mobile>
</template>

<script>
import formCreateMobile from "@form-create/vant";

export default {
  components: {
    formCreateMobile: formCreateMobile.$form()
  },
  data () {
    const option = formCreateMobile.parseJson('${options.replaceAll('\\', '\\\\').replaceAll('\'', '\\\'')}');
    //开启阅读模式
    //option.preview = true;
    return {
      formData: {},
      fapi: null,
      rule: formCreateMobile.parseJson('${json.replaceAll('\\', '\\\\').replaceAll('\'', '\\\'')}'),
      option: option
    }
  },
  methods: {
    onSubmit (formData) {
      //todo 提交表单
    }
  }
}
<\/script>`
}

export function mobileTemplateV3(json, options) {
    return `<template>
  <form-create-mobile
    v-model="formData"
    v-model:api="fapi"
    :rule="rule"
    :option="option"
    @submit="onSubmit"
  ></form-create-mobile>
</template>

<script setup>
import {ref} from "vue";
import formCreateMobile from "@form-create/vant";

const option = ref(formCreateMobile.parseJson('${options.replaceAll('\\', '\\\\').replaceAll('\'', '\\\'')}'));
const rule = ref(formCreateMobile.parseJson('${json.replaceAll('\\', '\\\\').replaceAll('\'', '\\\'')}'));
const fapi = ref(null);
const formData = ref({});

const onSubmit =  (formData) => {
  //todo 提交表单
}
<\/script>`
}


export function htmlTemplate(json, options) {
    return `<html lang="zh">
    <head>
        <meta charset="UTF-8">
        <!-- Import style -->
        <link rel="stylesheet" href="https://unpkg.com/vant@4/lib/index.css"/>
        <!-- Import Vue 3 -->
        <script src="https://unpkg.com/vue@3"></script>
        <!-- Import vant -->
        <script src="https://unpkg.com/vant@4/lib/vant.min.js"></script>
        <!-- Import formCreateMobile -->
        <script src="https://unpkg.com/@form-create/vant@3"><\/script>
    </head>
    <body>
        <div id="app">
            <form-create-mobile :rule="rule" :option="options" v-model="formData" v-model:api="api" @submit="onSubmit"></form-create-mobile>
        </div>
        <script>
            const App = {
                data() {
                    return {
                        rule: formCreateMobile.parseJson('${json.replaceAll('\\', '\\\\').replaceAll('\'', '\\\'')}'),
                        options: formCreateMobile.parseJson('${options.replaceAll('\\', '\\\\').replaceAll('\'', '\\\'')}'),
                        formData: {},
                        api: null,
                    };
                },
                methods: {
                    onSubmit(formData){
                        console.log('submit', formData);
                    }
                }
            };
            const app = Vue.createApp(App);
            app.use(vant).use(formCreateMobile);
            app.mount("#app");
        </script>
    </body>
</html>`
}
