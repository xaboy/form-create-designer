<template>
    <div class="_fd-tf-col" :style="colStyle">
        <div class="_fd-tf-title" :style="{textAlign: align || 'center'}">
            <span v-if="required" class="_fd-tf-required">*</span>{{ label || '' }}
        </div>
        <div class="_fd-tf-con">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import is from '@form-create/utils/lib/type';
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'TableFormColumnView',
    props: {
        label: String,
        align: String,
        width: [Number, String],
        color: String,
        required: Boolean,
    },
    computed: {
        colStyle() {
            const w = this.width;
            const style = {width: is.Number(w) ? `${w}px` : ((!w || w === 'auto') ? '180px' : w)};
            if (this.color) {
                style.color = this.color;
            }
            return style;
        }
    },
    data() {
        return {};
    }
});
</script>

<style>

._fd-tf-col ._fd-tf-con .ant-form-item {
    margin-bottom: 1px !important;
}

._fd-tf-col {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 180px;
    flex-shrink: 0;
}

._fd-tf-con .ant-form-item-label,._fd-tf-con .van-field__label {
    display: none !important;
}

._fd-tf-con {
    display: flex;
    flex: 1;
    width: 100%;
}

._fd-tf-title {
    height: 40px;
    border-bottom: 1px solid #ebeef5;
    margin-bottom: 0px;
    padding: 0 5px;
    box-sizing: border-box;
    line-height: 32px;
}

._fd-tf-required {
    color: #f56c6c;
    margin-right: 4px;
}

._fd-tf-con ._fc-l-item > * {
    display: none !important;
}

._fd-tf-con .ant-input-number, ._fd-tf-con .ant-select, ._fd-tf-con .ant-slider, ._fd-tf-con .ant-cascader, ._fd-tf-con .ant-picker {
    width: 100%;
}

._fd-tf-col:has(._fd-tf-col) {
    width: auto !important;
}
</style>
