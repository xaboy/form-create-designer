<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'MyRow',
    inheritAttrs: false,
    props: {
        title: [String]
    },
    inject: ['designer']
});

</script>

<template>
  <el-col :span="8">
    {{title}}
    <slot/>
  </el-col>

</template>

<style scoped>

</style>
