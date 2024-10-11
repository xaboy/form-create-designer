<template>
    <div class="_fd-table-form">
        <div class="_fd-tf-wrap" v-if="$slots.default">
            <slot></slot>
        </div>
        <div class="_fc-child-empty" v-else></div>
    </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'TableFormView',
    data() {
        return {};
    },
});
</script>

<style>
._fd-table-form {
    min-height: 130px;
    width: 100%;
    border: 1px solid #ECECEC;
    background: #fff;
}

._fc-child-empty {
    min-height: 130px;
}

._fd-tf-wrap {
    display: flex;
    overflow: auto;
}

._fd-tf-wrap > ._fd-drag-tool {
    flex-shrink: 0;
    display: flex;
    margin: 2px;
    height: auto;
}

</style>
