<template>
  <el-dialog :model-value="visible" width="700px" @close="close">
    <template #title>批量导入</template>
    <el-steps :active="step" align-center class="mb-20">
      <el-step title="选择文件" />
      <el-step title="预览数据" />
      <el-step title="字段映射" />
      <el-step title="完成" />
    </el-steps>
    <div class="step-body">
      <StepSelectFile v-if="step===0" :columns="columns" :table-title="tableTitle" @select-file="handleFile" @download-template="downloadTemplate" />
      <StepPreviewData v-if="step===1" :excel-data="excelData" :sheets="sheets" :selected-sheet="sheet" @change-sheet="changeSheet" />
      <StepImportSettings v-if="step===2" :excel-data="excelData" :columns="columns" :column-mapping="mapping" @update-mapping="val => mapping = val" />
      <StepImportData v-if="step===3" :status="importStatus" :total="excelData.length" :success="success" :fail="fail" :warnings="warnings" />
    </div>
    <template #footer>
      <el-button v-if="step>0" @click="prev">上一步</el-button>
      <el-button v-if="step<3" type="primary" :disabled="nextDisabled" @click="next">下一步</el-button>
      <el-button v-else type="primary" @click="doImport" :disabled="importStatus==='importing'">开始导入</el-button>
      <el-button @click="close">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import * as XLSX from 'xlsx'
import StepSelectFile from './StepSelectFile.vue'
import StepPreviewData from './StepPreviewData.vue'
import StepImportSettings from './StepImportSettings.vue'
import StepImportData from './StepImportData.vue'

defineOptions({ name: 'ImportSteps' })

const props = defineProps({
  visible: { type: Boolean, default: false },
  columns: { type: Array, required: true },
  tableTitle: { type: String, default: '' }
})

const emit = defineEmits(['update:visible', 'done'])

const step = ref(0)
const file = ref(null)
const sheets = ref([])
const sheet = ref('')
const excelData = ref([])
const mapping = ref({})
const importStatus = ref('idle')
const success = ref(0)
const fail = ref(0)
const warnings = ref([])

const nextDisabled = computed(() => {
  if (step.value === 0) return !file.value
  if (step.value === 1) return excelData.value.length === 0
  if (step.value === 2) return Object.keys(mapping.value).length === 0
  return false
})

const handleFile = (f) => {
  file.value = f
  readFile()
}

const readFile = () => {
  const reader = new FileReader()
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result)
    const workbook = XLSX.read(data, { type: 'array' })
    sheets.value = workbook.SheetNames
    sheet.value = workbook.SheetNames[0]
    parseSheet(workbook)
    step.value = 1
  }
  reader.readAsArrayBuffer(file.value)
}

const parseSheet = (workbook) => {
  const ws = workbook.Sheets[sheet.value]
  excelData.value = XLSX.utils.sheet_to_json(ws, { defval: '' })
}

const changeSheet = (s) => {
  sheet.value = s
  const workbook = XLSX.read(file.value, { type: 'array' })
  parseSheet(workbook)
}

const next = () => { if (step.value < 3) step.value++ }
const prev = () => { if (step.value > 0) step.value-- }

const doImport = () => {
  importStatus.value = 'importing'
  setTimeout(() => {
    const data = excelData.value.map(row => {
      const item = {}
      for (const [excelCol, field] of Object.entries(mapping.value)) {
        if (field) item[field] = row[excelCol]
      }
      return item
    })
    success.value = data.length
    fail.value = 0
    warnings.value = []
    importStatus.value = 'success'
    emit('done', data)
  }, 1000)
}

const downloadTemplate = () => {
  const headers = props.columns.map(c => c.label)
  const ws = XLSX.utils.aoa_to_sheet([headers])
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  XLSX.writeFile(wb, props.tableTitle || 'template.xlsx')
}

const close = () => {
  emit('update:visible', false)
  step.value = 0
  file.value = null
  excelData.value = []
  mapping.value = {}
  importStatus.value = 'idle'
}
</script>

<style scoped>
.mb-20 { margin-bottom: 20px; }
.step-body { min-height: 380px; }
</style>
