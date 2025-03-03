<template>
    <a-col :span="24">
        <div class="_fd-row ant-row" :class="{'_fc-child-empty' : !$slots.default}" v-bind="$attrs">
            <slot name="default"></slot>
        </div>
    </a-col>

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
    display: flex;
    flex-flow: row wrap;
    min-width: 0;
    width: 100%;
}
</style>
