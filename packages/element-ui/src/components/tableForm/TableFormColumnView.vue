<template>
    <div class="_fd-tf-col" :style="colStyle">
        <div class="_fd-tf-title">
            {{ label || '' }}
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
        width: [Number, String],
        color: String,
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

._fd-tf-col ._fd-tf-con .el-form-item {
    margin-bottom: 1px;
}

._fd-tf-col {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 180px;
    flex-shrink: 0;
}

._fd-tf-con .el-form-item__label {
    display: none !important;
}

._fd-tf-con {
    display: flex;
    flex: 1;
    width: 100%;
}

._fd-tf-con .el-form-item__content {
    display: flex;
    margin-left: 0px !important;
    width: 100% !important;
}


._fd-tf-title {
    display: flex;
    height: 40px;
    width: 100% !important;
    border-bottom: 1px solid #ebeef5;
    align-items: center;
    margin-bottom: 0px;
    padding-left: 5px;
}

._fd-tf-con ._fc-l-item {
    display: flex;
    width: 100%;
    margin-top: 4px;
    flex-shrink: 0;
}

._fd-tf-con ._fc-l-item > * {
    display: none !important;
}

._fd-tf-con .el-input-number, ._fd-tf-con .el-select, ._fd-tf-con .el-slider, ._fd-tf-con .el-cascader, ._fd-tf-con .el-date-editor {
    width: 100%;
}

</style>
