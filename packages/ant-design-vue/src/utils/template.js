
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
import formCreate from "@form-create/ant-design-vue";

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
import formCreate from "@form-create/ant-design-vue";

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
        <link rel="stylesheet" href="https://unpkg.com/ant-design-vue@4/dist/reset.css"/>
        <!-- Import Vue 3 -->
        <script src="https://unpkg.com/vue@3"></script>
        <!-- Import dayjs -->
        <script src="https://unpkg.com/dayjs/dayjs.min.js"></script>
        <script src="https://unpkg.com/dayjs/plugin/customParseFormat.js"></script>
        <script src="https://unpkg.com/dayjs/plugin/weekday.js"></script>
        <script src="https://unpkg.com/dayjs/plugin/localeData.js"></script>
        <script src="https://unpkg.com/dayjs/plugin/weekOfYear.js"></script>
        <script src="https://unpkg.com/dayjs/plugin/weekYear.js"></script>
        <script src="https://unpkg.com/dayjs/plugin/advancedFormat.js"></script>
        <script src="https://unpkg.com/dayjs/plugin/quarterOfYear.js"></script>
        <!-- Import ant-design-vue -->
        <script src="https://unpkg.com/ant-design-vue@4/dist/antd.min.js"></script>
        <!-- Import formCreate -->
        <script src="https://unpkg.com/@form-create/ant-design-vue@3"><\/script>
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
            app.use(antd).use(formCreate);
            app.mount("#app");
        </script>
    </body>
</html>`
}
