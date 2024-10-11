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