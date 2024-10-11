
export function formTemplate(json, options) {
    return `<template>
  <form-create
    v-model="formData"
    v-model:api="fapi"
    :rule="rule"
    :option="option"
    @submit="onSubmit"
  ></form-create>
</template>

<script>
import formCreate from "@form-create/element-ui";

export default {
  components: {
    formCreate: formCreate.$form()
  },
  data () {
    const option = formCreate.parseJson('${options.replaceAll('\\', '\\\\').replaceAll('\'', '\\\'')}');
    return {
      formData: {},
      fapi: null,
      rule: formCreate.parseJson('${json.replaceAll('\\', '\\\\').replaceAll('\'', '\\\'')}'),
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

export function formTemplateV3(json, options) {
    return `<template>
  <form-create
    v-model="formData"
    v-model:api="fapi"
    :rule="rule"
    :option="option"
    @submit="onSubmit"
  ></form-create>
</template>

<script setup>
import {ref} from "vue";
import formCreate from "@form-create/element-ui";

const option = ref(formCreate.parseJson('${options.replaceAll('\\', '\\\\').replaceAll('\'', '\\\'')}'));
const rule = ref(formCreate.parseJson('${json.replaceAll('\\', '\\\\').replaceAll('\'', '\\\'')}'));
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
        <link rel="stylesheet" href="//unpkg.com/element-plus/dist/index.css"/>
        <!-- Import Vue 3 -->
        <script src="//unpkg.com/vue@3"></script>
        <!-- Import element-plus -->
        <script src="//unpkg.com/element-plus"></script>
        <!-- Import formCreate -->
        <script src="//unpkg.com/@form-create/element-ui@3"><\/script>
    </head>
    <body>
        <div id="app">
            <form-create :rule="rule" :option="options" v-model="formData" v-model:api="api" @submit="onSubmit"></form-create>
        </div>
        <script>
            const App = {
                data() {
                    return {
                        rule: formCreate.parseJson('${json.replaceAll('\\', '\\\\').replaceAll('\'', '\\\'')}'),
                        options: formCreate.parseJson('${options.replaceAll('\\', '\\\\').replaceAll('\'', '\\\'')}'),
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
            app.use(ElementPlus).use(formCreate);
            app.mount("#app");
        </script>
    </body>
</html>`
}
