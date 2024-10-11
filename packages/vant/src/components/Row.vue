<template>
    <el-col :span="24">
        <div class="_fd-row el-row" :class="{'_fc-child-empty' : !$slots.default}" v-bind="$attrs">
            <slot name="default"></slot>
        </div>
    </el-col>

</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'fcRow',
    mounted() {
    }

});
</script>

<style>
._fd-row {
    width: 100%;
}
</style>
