<template>
    <el-tooltip
        effect="dark"
        placement="top-start"
        popper-class="_fd-warning-pop"
    >
        <template #content>
            <span v-html="tooltip"></span>
        </template>
        <template v-if="$slots.default">
            <span class="_fd-warning-text">
                <slot></slot>
            </span>
        </template>
        <template v-else>
            <i class="fc-icon icon-question"></i>
        </template>
    </el-tooltip>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'Warning',
    props: {
        tooltip: String,
    },
    data() {
        return {}
    },
});
</script>

<style>
._fd-warning-pop {
    max-width: 400px;
}

._fd-warning-text {
    text-decoration: underline;
    text-decoration-style: dashed;
    cursor: help;
}
</style>
