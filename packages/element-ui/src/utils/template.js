
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
