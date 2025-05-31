<template>
    <div class="_fd-struct">
        <el-badge type="warning" is-dot :hidden="!configured">
            <div @click="visible=true">
                <slot>
                    <el-button class="_fd-plain-button" plain size="small">
                        {{ title || t('form.setHiddenCondition') }}
                    </el-button>
                </slot>
            </div>
        </el-badge>
        <el-dialog class="_fd-struct-con" :title="title || t('form.setHiddenCondition')" v-model="visible" destroy-on-close
                   :close-on-click-modal="false"
                   append-to-body width="800px">
            <ConditionBuilder v-if="visible" v-model="localVal" :fields="fields" :t="t" />
            <template #footer>
                <div>
                    <el-button @click="visible = false" size="default">{{ t('props.cancel') }}</el-button>
                    <el-button type="primary" @click="onOk" size="default" color="#2f73ff">{{ t('props.ok') }}</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import {defineComponent, computed, ref, watch, inject} from 'vue';
import is from '@form-create/utils/lib/type';
import ConditionBuilder from './ConditionBuilder.vue';

export default defineComponent({
    name: 'HiddenConfig',
    emits: ['update:modelValue'],
    props: {
        modelValue: [Object, Array, Function],
        title: String,
        defaultValue: {
            require: false
        },
        validate: Function,
    },
    components: {ConditionBuilder},
    setup(props, {emit}) {
        const designer = inject('designer');
        const visible = ref(false);
        const localVal = ref({});
        const t = computed(() => designer.setupState.t);
        const fields = computed(() => {
            return designer.setupState.fields ? designer.setupState.fields() : [];
        });
        const configured = computed(() => {
            return !is.empty(props.modelValue) && Object.keys(props.modelValue).length > 0;
        });

        watch(() => props.modelValue, (v) => {
            localVal.value = v || props.defaultValue || {};
        }, {immediate: true});

        watch(visible, (n) => {
            if (n) {
                localVal.value = props.modelValue || props.defaultValue || {};
            }
        });

        function onOk() {
            if (props.validate && false === props.validate(localVal.value)) {
                return false;
            }
            visible.value = false;
            emit('update:modelValue', localVal.value);
            return true;
        }

        return {visible, localVal, onOk, t, fields, configured};
    }
});
</script>

<style>
._fd-struct {
    width: 100%;
}

._fd-struct .el-badge {
    width: 100%;
}

._fd-struct .el-button {
    font-weight: 400;
    width: 100%;
    border-color: #2E73FF;
    color: #2E73FF;
}

._fd-struct-con .el-dialog__body {
    padding: 0px;
}
</style>
