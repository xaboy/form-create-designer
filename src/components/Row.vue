<template>
    <div class="_fd-row el-row" :class="{'_fc-child-empty' : !$slots.default}" v-bind="$attrs">
        <slot name="default"></slot>
    </div>

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
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    position: relative;
}
</style>
