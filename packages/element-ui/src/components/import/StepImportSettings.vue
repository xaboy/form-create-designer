<template>
  <div class="step-import-settings">
    <div class="settings-header">
      <el-alert
        title="请设置Excel列和字段的对应关系"
        type="info"
        :closable="false"
        show-icon
      />
    </div>

    <div class="mapping-area">
      <div class="mapping-header">
        <div class="excel-column">Excel列名</div>
        <div class="field-column">对应字段</div>
      </div>

      <div class="mapping-rows">
        <div class="mapping-row" v-for="(excelColumn, index) in excelColumns" :key="index">
          <div class="excel-column">{{ excelColumn }}</div>
          <div class="field-column">
            <el-select
              v-model="mapping[excelColumn]"
              placeholder="请选择"
              clearable
              filterable
              @change="updateMapping"
            >
              <el-option
                v-for="field in fieldOptions"
                :key="field.value"
                :label="field.label"
                :value="field.value"
              />
            </el-select>
          </div>
        </div>
      </div>
    </div>

    <div class="validation-results" v-if="validationMessage">
      <el-alert
        :title="validationMessage"
        :type="hasMapping ? 'success' : 'warning'"
        :closable="false"
        show-icon
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'

defineOptions({ name: 'StepImportSettings' })

const props = defineProps({
  excelData: { type: Array, required: true },
  columns: { type: Array, required: true },
  columnMapping: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update-mapping'])

const excelColumns = computed(() => {
  if (props.excelData.length === 0) return []
  const firstRow = props.excelData[0]
  return Object.keys(firstRow)
})

const fieldOptions = computed(() => {
  return props.columns.map((col) => {
    const field = col.rule?.[0]?.field || ''
    const required = col.rule?.[0]?.$required || false
    return { label: `${col.label}${required ? ' (必填)' : ''}`, value: field }
  })
})

const mapping = ref({})

onMounted(() => { mapping.value = { ...props.columnMapping } })

watch(() => props.columnMapping, (val) => { mapping.value = { ...val } }, { deep: true })

const updateMapping = () => { emit('update-mapping', mapping.value) }

const hasMapping = computed(() => Object.values(mapping.value).some(v => !!v))

const validationMessage = computed(() => {
  if (!hasMapping.value) return '请至少设置一个字段映射关系'
  const requiredFields = props.columns
    .filter((col) => col.rule?.[0]?.$required)
    .map((col) => col.rule[0].field)
  const mappedFields = Object.values(mapping.value)
  const missingRequired = requiredFields.filter(field => !mappedFields.includes(field))
  if (missingRequired.length > 0) {
    const missingLabels = missingRequired.map(field => {
      const col = props.columns.find((c) => c.rule?.[0]?.field === field)
      return col ? col.label : field
    })
    return `有${missingRequired.length}个必填字段未映射: ${missingLabels.join(', ')}`
  }
  return `已设置${Object.keys(mapping.value).length}个字段映射`
})
</script>

<style lang="scss" scoped>
.step-import-settings {
  display: flex;
  flex-direction: column;
  gap: 20px;
  .mapping-area {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    overflow: hidden;
    .mapping-header {
      display: flex;
      background-color: #f5f7fa;
      padding: 10px;
      font-weight: bold;
      .excel-column { flex: 1; padding: 0 10px; }
      .field-column { flex: 1; padding: 0 10px; }
    }
    .mapping-rows {
      max-height: 350px;
      overflow-y: auto;
      .mapping-row {
        display: flex;
        border-top: 1px solid #ebeef5;
        padding: 10px;
        &:hover { background-color: #f5f7fa; }
        .excel-column {
          flex: 1; padding: 0 10px; display: flex; align-items: center;
        }
        .field-column {
          flex: 1; padding: 0 10px;
          :deep(.el-select) { width: 100%; }
        }
      }
    }
  }
  .validation-results { margin-top: 10px; }
}
</style>
