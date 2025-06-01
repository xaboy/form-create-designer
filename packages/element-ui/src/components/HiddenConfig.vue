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
        
        // 修改fields计算属性，返回包含字段名称和ID的对象数组
        const fields = computed(() => {
            if (!designer.setupState.fields) return [];
            
            // 获取原始字段列表
            const fieldList = designer.setupState.fields();
            
            // 获取所有规则，以便从中提取标题
            const rules = designer.setupState.children || [];
            
            // 创建字段ID到标题的映射
            const fieldTitleMap = {};
            
            // 递归遍历规则，构建字段ID到标题的映射
            const buildFieldTitleMap = (items) => {
                items.forEach(rule => {
                    if (rule && rule.field && rule.title) {
                        fieldTitleMap[rule.field] = rule.title;
                    }
                    if (rule && rule.children && rule.children.length > 0) {
                        buildFieldTitleMap(rule.children);
                    }
                });
            };
            
            // 构建映射
            buildFieldTitleMap(rules);
            
            // 返回包含标题和ID的对象数组
            return fieldList.map(fieldId => ({
                label: fieldTitleMap[fieldId] || fieldId, // 使用标题或默认使用字段ID
                value: fieldId                          // 字段ID作为值
            }));
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
