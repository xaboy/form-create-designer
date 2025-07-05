<template>
    <div class="_fc-signature" :class="{disabled: disabled}">
        <template v-if="modelValue">
            <div class="_fc-signature-preview">
                <i class="fc-icon icon-delete2" v-if="!disabled" @click="remove"></i>
                <img :src="modelValue" alt="signature">
            </div>
        </template>
        <template v-else>
            <div class="_fc-signature-btn" @click="open">
                <i class="fc-icon icon-edit2"></i> {{ formCreateInject.t('signaturePadTip') || '点击添加手写签名' }}
            </div>
        </template>
        <el-dialog class="_fc-signature-dialog" :title="formCreateInject.t('signaturePadTitle') || '请在虚线框内书写'"
                   :visible.sync="visible"
                   destroy-on-close
                   :close-on-click-modal="false"
                   append-to-body width="640px">
            <canvas class="_fc-signature-pad" ref="pad" width="600px" height="270px"></canvas>
            <template #footer>
                <div>
                    <el-button size="small" @click="clear()">{{ formCreateInject.t('reset') || '重置' }}</el-button>
                    <el-button type="primary" :disabled="isEmpty" @click="submit" size="small">{{ formCreateInject.t('ok') || '确定' }}</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import {defineComponent, markRaw} from 'vue';
import SignaturePad from 'signature_pad';

export default defineComponent({
    name: 'SignaturePad',
    model: {
        prop: 'modelValue',
        event: 'update:modelValue',
    },
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
        remove() {
            if (this.disabled) {
                return ;
            }
            this.updateValue('');
            this.$emit('remove');
        },
    },
});
</script>

<style>

._fc-signature {
    width: 100%;
}

._fc-signature-btn, ._fc-signature-preview {
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

._fc-signature-btn {
    cursor: pointer;
}

._fc-signature.disabled ._fc-signature-btn {
    cursor: not-allowed;
}

._fc-signature-preview > img {
    display: inline-block;
    height: 88px;
}

._fc-signature-preview .icon-delete2 {
    position: absolute;
    top: 9px;
    right: 9px;
    display: inline-block;
    line-height: 14px;
    font-size: 14px;
    cursor: pointer;
}

._fc-signature-btn i {
    font-size: 14px;
}

._fc-signature-dialog .el-dialog__body {
    text-align: center;
}

._fc-signature-pad {
    border-radius: 4px;
    border: 1px dashed #D4D7E0;
    background-image: linear-gradient(#FFFFFF 14px, transparent 0), linear-gradient(90deg, #FFFFFF 14px, #D4D7E0 0);
    background-size: 15px 15px;
}
</style>