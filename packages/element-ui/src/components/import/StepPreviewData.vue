<template>
  <div class="step-preview-data">
    <div class="preview-header">
      <div class="sheet-selector" v-if="sheets.length > 1">
        <span class="label">工作表:</span>
        <el-select v-model="currentSheet" @change="handleSheetChange" size="small">
          <el-option 
            v-for="sheet in sheets" 
            :key="sheet" 
            :label="sheet" 
            :value="sheet"
          />
        </el-select>
      </div>

      <div class="data-info">
        <el-alert
          :title="`数据预览最多展示100条数据，共${excelData.length}条数据`"
          type="info"
          :closable="false"
          show-icon
        />
      </div>
    </div>

    <div class="preview-table" v-if="excelData.length > 0">
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="350"
        size="small"
        border
      >
        <el-table-column
          type="index"
          width="50"
          label="序号"
          align="center"
        />
        <el-table-column
          v-for="column in tableColumns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          min-width="120"
        />
      </el-table>
    </div>

    <div class="empty-data" v-else>
      <el-empty description="没有检测到数据" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'

defineOptions({ name: 'StepPreviewData' })

const props = defineProps({
  excelData: { type: Array, required: true },
  sheets: { type: Array, default: () => [] },
  selectedSheet: { type: String, default: '' }
})

const emit = defineEmits(['change-sheet'])

const currentSheet = ref(props.selectedSheet)

watch(() => props.selectedSheet, (val) => { currentSheet.value = val })

const tableData = computed(() => props.excelData.slice(0, 100))

const tableColumns = computed(() => {
  if (props.excelData.length === 0) return []
  const firstRow = props.excelData[0]
  return Object.keys(firstRow).map(key => ({ prop: key, label: key }))
})

const handleSheetChange = (sheet) => { emit('change-sheet', sheet) }
</script>

<style scoped>
.step-preview-data {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.step-preview-data .preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.step-preview-data .preview-header .sheet-selector {
  display: flex;
  align-items: center;
  gap: 10px;
}

.step-preview-data .preview-header .sheet-selector .label {
  font-size: 14px;
  color: #606266;
}

.step-preview-data .empty-data {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
</style>
