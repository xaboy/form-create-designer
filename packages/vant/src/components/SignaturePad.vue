<template>
    <div class="_fc-m-signature" :class="{disabled: disabled}">
        <template v-if="modelValue">
            <div class="_fc-m-signature-preview">
                <i class="fc-icon icon-delete2" v-if="!disabled" @click="remove"></i>
                <img :src="modelValue" alt="signature">
            </div>
        </template>
        <template v-else>
            <div class="_fc-m-signature-btn" @click="open">
                <i class="fc-icon icon-edit2"></i> {{ formCreateInject.t('signaturePadTip') || '点击添加手写签名' }}
            </div>
        </template>
        <van-dialog v-model:show="visible" class="_fc-m-signature-dialog" :beforeClose="beforeClose"
                    @confirm="submit" @cancel="clear" show-cancel-button :confirm-button-text="formCreateInject.t('ok') || '确定'"
                    :cancel-button-text="formCreateInject.t('reset') || '重置'"
                    :confirm-button-disabled="isEmpty">
            <template #title>
                {{ formCreateInject.t('signaturePadTitle') || '请在虚线框内书写' }}
                <i class="fc-icon icon-add2" @click="visible=false"></i>
            </template>
            <canvas class="_fc-m-signature-pad" ref="pad" width="320px" height="145px"></canvas>
        </van-dialog>
    </div>
</template>

<script>
import {defineComponent, markRaw} from 'vue';
import SignaturePad from 'signature_pad';

export default defineComponent({
    name: 'SignaturePad',
    emits: ['update:modelValue', 'change', 'remove'],
    data() {
        return {
            visible: false,
            isEmpty: true,
            signaturePad: null,
        };
    },
    props: {
        modelValue: String,
        penColor: String,
        disabled: Boolean,
        formCreateInject: Object,
        beforeRemove: Function,
    },
    watch: {
        visible(val) {
            if (val) {
                this.isEmpty = true;
                this.$nextTick(() => {
                    this.signaturePad = markRaw(new SignaturePad(this.$refs.pad, {
                        penColor: this.penColor,
                    }));
                    this.signaturePad.addEventListener('endStroke', () => {
                        this.isEmpty = this.signaturePad.isEmpty();
                    });
                });
            } else {
                this.signaturePad.off();
                this.signaturePad = null;
            }
        }
    },

    methods: {
        open() {
            if (!this.disabled) {
                this.visible = true;
            }
        },
        beforeClose() {
            return false;
        },
        clear() {
            this.signaturePad.clear();
            this.isEmpty = true;
        },
        submit() {
            const res = this.signaturePad.toDataURL();
            this.updateValue(res);
            this.visible = false;
        },
        updateValue(val) {
            this.$emit('update:modelValue', val);
            this.$emit('change', val);
        },
        async remove() {
            if (this.disabled) {
                return;
            }
            // 检查是否有删除前置回调
            if (this.beforeRemove) {
                const result = await this.beforeRemove();
                // 如果回调返回 false，则停止删除
                if (result === false) {
                    return;
                }
            }
            this.updateValue('');
            this.$emit('remove');
        },
    },
});
</script>

<style>

._fc-m-signature {
    width: 100%;
}

._fc-m-signature-btn, ._fc-m-signature-preview {
    width: 100%;
    min-width: 160px;
    height: 88px;
    line-height: 88px;
    font-size: 14px;
    color: rgb(201, 204, 216);
    border-radius: 4px;
    border: 1px dashed rgb(212, 215, 224);
    text-align: center;
    background: rgb(255, 255, 255);
    position: relative;
    box-sizing: border-box;
}

._fc-m-signature-btn {
    cursor: pointer;
}

._fc-m-signature.disabled ._fc-m-signature-btn {
    cursor: not-allowed;
    color: rgb(201, 204, 216);
}

._fc-m-signature-preview > img {
    display: inline-block;
    height: 88px;
}

._fc-m-signature-preview .icon-delete2 {
    position: absolute;
    top: 9px;
    right: 9px;
    display: inline-block;
    line-height: 14px;
    font-size: 14px;
    cursor: pointer;
}

._fc-m-signature-btn i {
    font-size: 14px;
}

._fc-m-signature-dialog .van-dialog__header {
    padding: 15px 0;
    position: relative;
}

._fc-m-signature-dialog .icon-add2 {
    position: absolute;
    right: 18px;
    display: inline-block;
    color: #AAAAAA;
    transform: rotate(45deg);
}

._fc-m-signature-pad {
    width: 100%;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px dashed #D4D7E0;
    background-image: linear-gradient(#FFFFFF 14px, transparent 0), linear-gradient(90deg, #FFFFFF 14px, #D4D7E0 0);
    background-size: 15px 15px;
    min-height: 170px;
}
</style>
