<template>
    <div class="_fd-size-input">
        <template v-if="unit[idx] === 'auto'">
            <a-button :size="size" style="width: 150px;" @click="changeType()">{{ unit[idx] }}</a-button>
        </template>
        <template v-else>
            <a-inputNumber :size="size" v-model:value="num" @change="submit"/>
            <a-dropdown trigger="click" size="small">
                <a-button :size="size">{{ unit[idx] }}</a-button>
                <template #overlay>
                    <a-menu>
                        <a-menu-item v-for="(name, idx) in unit" :key="name" @click="changeType(idx)">
                            <div>{{ name }}</div>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </template>
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import {isNull} from '../../utils/index';

export default defineComponent({
    name: 'SizeInput',
    inject: ['designer'],
    emits: ['update:modelValue', 'change'],
    props: {
        modelValue: String,
        size: String,
        unit: {
            type: Array,
            default: () => ['auto', 'px', '%', 'vh', 'vw', 'em', 'rem']
        },
        defaultUnit: {
            type: String,
            default: 'px'
        }
    },
    watch: {
        modelValue() {
            this.parseValue();
        }
    },
    data() {
        return {
            idx: 1,
            num: 0,
            oldValue: this.modelValue || '',
        }
    },
    methods: {
        parseValue() {
            if (this.modelValue !== 'auto') {
                this.idx = Math.max(this.unit.indexOf(this.defaultUnit), 0);
                this.unit.forEach((v, i) => {
                    if ((this.modelValue || '').indexOf(v) > -1) {
                        this.idx = i;
                    }
                });
                this.num = isNull(this.modelValue) ? null : parseFloat(this.modelValue || 0);
            } else {
                this.idx = 0;
                this.num = 0;
            }
        },
        submit() {
            this.oldValue = !isNull(this.num) ? '' + this.num + this.unit[this.idx] : '';
            this.$emit('update:modelValue', this.oldValue);
            this.$emit('change', this.oldValue);
        },
        changeType(idx) {
            if (idx !== undefined) {
                if (this.idx === idx) {
                    return;
                }
                this.idx = idx;
            } else {
                this.idx++;
                if (this.idx > 4) {
                    this.idx = 0;
                }
            }
            if (this.unit[this.idx] === 'auto') {
                this.oldValue = 'auto';
                this.$emit('update:modelValue', 'auto');
                this.$emit('change', 'auto');
            } else {
                this.submit();
            }
        },
    },
    created() {
        this.parseValue();
    }

});
</script>

<style>
._fd-size-input {
    display: flex;
    align-items: center;
    width: 100%;
}

._fd-size-input .ant-input-number {
    flex: 1;
}
</style>
