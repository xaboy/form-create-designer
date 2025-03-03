<template>
    <a-tooltip
        placement="topLeft"
        trigger="hover"
        overlayClassName="_fd-warning-pop"
    >
        <template #title>
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
    </a-tooltip>
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
