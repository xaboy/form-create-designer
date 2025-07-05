<template>
    <div class="_fc-title" :class="size || 'h2'" :style="textStyle">
        {{ title }}
    </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'FcTitle',
    data() {
        return {};
    },
    props: {
        title: String,
        size: String,
        align: String,
    },
    computed: {
        textStyle() {
            return {
                textAlign: this.align || 'left',
            }
        }
    }
});
</script>
<style>
._fc-title {
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    margin-top: 1em;
    margin-bottom: 16px;
}

._fc-title.h1, ._fc-title.h2 {
    padding-bottom: .3em;
    border-bottom: 1px solid #eee
}

._fc-title.h1 {
    font-size: 32px;
    line-height: 1.2
}

._fc-title.h2 {
    font-size: 24px;
    line-height: 1.225
}

._fc-title.h3 {
    font-size: 20px;
    line-height: 1.43
}

._fc-title.h4 {
    font-size: 16px;
}

._fc-title.h5 {
    font-size: 14px;
}

._fc-title.h6 {
    font-size: 12px;
}
</style>
