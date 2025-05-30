<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="800px"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    @closed="onClose"
  >
    <div class="import-steps">
      <div class="step-bar mb-20px">
        <div
          v-for="(label, index) in stepLabels"
          :key="index"
          class="step-item"
          :class="{
            'is-active': activeStep === index,
            'is-done': activeStep > index
          }"
        >
          <div class="step-index">{{ index + 1 }}</div>
          <div class="step-title">{{ label }}</div>
        </div>
      </div>

      <div class="step-content">
        <!-- 步骤1: 选择EXCEL表 -->
        <StepSelectFile
          v-if="activeStep === 0"
          :columns="columns"
          :table-title="tableTitle"
          @select-file="handleFileSelected"
          @download-template="handleDownloadTemplate"
        />

        <!-- 步骤2: 数据预览 -->
        <StepPreviewData
          v-if="activeStep === 1"
          :excel-data="excelData"
          :sheets="excelSheets"
          :selected-sheet="selectedSheet"
          @change-sheet="handleSheetChange"
        />

        <!-- 步骤3: 导入设置 -->
        <StepImportSettings
          v-if="activeStep === 2"
          :excel-data="excelData"
          :columns="columns"
          :column-mapping="columnMapping"
          @update-mapping="handleUpdateMapping"
        />

        <!-- 步骤4: 导入数据 -->
        <StepImportData
          v-if="activeStep === 3"
          :status="importStatus"
          :total="importTotal"
          :success="importSuccess"
          :fail="importFail"
          :warnings="importWarnings"
        />
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button v-if="activeStep > 0" @click="prevStep">上一步</el-button>
        <el-button 
          v-if="activeStep < 3" 
          type="primary" 
          :disabled="!canGoNext"
          @click="nextStep"
        >
          下一步
        </el-button>
        <el-button 
          v-if="activeStep === 3 && importStatus === 'success'"
          type="primary" 
          @click="dialogVisible = false"
        >
          完成
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import StepSelectFile from './StepSelectFile.vue'
import StepPreviewData from './StepPreviewData.vue'
import StepImportSettings from './StepImportSettings.vue'
import StepImportData from './StepImportData.vue'
import * as XLSX from 'xlsx'
import { ElMessage } from 'element-plus'

defineOptions({ name: 'ImportSteps' })

// 定义组件接受的参数
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  columns: {
    type: Array,
    required: true
  },
  tableTitle: {
    type: String,
    default: ''
  },
  onImport: {
    type: Function,
    required: true
  }
})

// 定义组件事件
const emit = defineEmits(['update:modelValue', 'imported'])

// 对话框可见性
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

// 对话框标题
const title = computed(() => `批量导入${props.tableTitle || '数据'}`)

const stepLabels = [
  '选择EXCEL表',
  '数据预览',
  '导入设置',
  '导入数据'
]

// 当前激活的步骤
const activeStep = ref(0)

// Excel相关数据
const excelFile = ref<File | null>(null)
const excelData = ref<any[]>([])
const excelSheets = ref<string[]>([])
const selectedSheet = ref('')

// 映射关系
const columnMapping = ref<Record<string, string>>({})

// 导入状态和结果
const importStatus = ref<'idle' | 'importing' | 'success' | 'error'>('idle')
const importTotal = ref(0)
const importSuccess = ref(0)
const importFail = ref(0)
const importWarnings = ref<string[]>([])

// 是否可以进入下一步
const canGoNext = computed(() => {
  switch (activeStep.value) {
    case 0:
      return !!excelFile.value
    case 1:
      return excelData.value.length > 0
    case 2:
      return Object.keys(columnMapping.value).length > 0
    default:
      return true
  }
})

// 上一步
const prevStep = () => {
  if (activeStep.value > 0) {
    activeStep.value--
  }
}

// 下一步
const nextStep = async () => {
  if (activeStep.value < 3) {
    if (activeStep.value === 2) {
      importStatus.value = 'importing'
      startImport()
    }
    activeStep.value++
  }
}

// 处理文件选择
const handleFileSelected = async (file: File) => {
  excelFile.value = file
  try {
    const arrayBuffer = await file.arrayBuffer()
    const data = new Uint8Array(arrayBuffer)

    const readOpts = {
      type: 'array',
      raw: true,
      cellDates: true,
      cellStyles: true,
      cellNF: true,
      dateNF: 'yyyy-mm-dd',
      sheetStubs: true,
      WTF: true
    }

    const workbook = XLSX.read(data, readOpts)
    if (!workbook || !workbook.SheetNames || workbook.SheetNames.length === 0) {
      throw new Error('无效的Excel文件结构')
    }

    excelSheets.value = workbook.SheetNames
    selectedSheet.value = workbook.SheetNames[0]

    const sheetName = selectedSheet.value
    const worksheet = workbook.Sheets[sheetName]

    if (!worksheet) {
      throw new Error(`无法获取工作表: ${sheetName}`)
    }

    let allData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: '',
      blankrows: false
    })

    if (!allData || allData.length === 0) {
      throw new Error('Excel文件为空或格式不正确')
    }

    const headers = allData[0]

    if (Array.isArray(headers)) {
      excelData.value = allData.slice(1).map(row => {
        const obj: Record<string, any> = {}
        headers.forEach((header, index) => {
          if (header) {
            obj[header] = Array.isArray(row) && index < row.length ? row[index] : ''
          }
        })
        return obj
      })
    } else {
      excelData.value = XLSX.utils.sheet_to_json(worksheet, {
        defval: '',
        blankrows: false
      })
    }

    if (!excelData.value || excelData.value.length === 0) {
      throw new Error('无法从Excel提取有效数据')
    }

    createInitialMapping()
  } catch (error: any) {
    excelData.value = []
    ElMessage.error('解析Excel文件失败: ' + (error.message || '未知错误'))
  }
}

// 创建初始字段映射关系
const createInitialMapping = () => {
  if (excelData.value.length === 0) return
  const firstRow = excelData.value[0]
  const mapping: Record<string, string> = {}

  for (const excelCol in firstRow) {
    const matchedColumn = props.columns.find((col: any) => {
      return col.label === excelCol || (col.rule && col.rule[0] && col.rule[0].field === excelCol)
    })

    if (matchedColumn) {
      mapping[excelCol] = matchedColumn.rule[0].field
    }
  }

  columnMapping.value = mapping
}

// 切换Sheet
const handleSheetChange = (sheet: string) => {
  selectedSheet.value = sheet
  if (!excelFile.value) return

  const reader = new FileReader()
  reader.onload = (e) => {
    if (!e.target || !e.target.result) return
    try {
      const data = new Uint8Array(e.target.result as ArrayBuffer)
      const readOpts = {
        type: 'array',
        raw: true,
        cellDates: true,
        cellStyles: true,
        cellNF: true,
        dateNF: 'yyyy-mm-dd',
        sheetStubs: true,
        WTF: true
      }
      const workbook = XLSX.read(data, readOpts)
      const worksheet = workbook.Sheets[sheet]
      if (!worksheet) {
        throw new Error(`无法获取工作表: ${sheet}`)
      }
      let allData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: '',
        blankrows: false
      })
      if (!allData || allData.length === 0) {
        throw new Error('Excel工作表为空或格式不正确')
      }
      const headers = allData[0]
      if (Array.isArray(headers)) {
        excelData.value = allData.slice(1).map(row => {
          const obj: Record<string, any> = {}
          headers.forEach((header, index) => {
            if (header) {
              obj[header] = Array.isArray(row) && index < row.length ? row[index] : ''
            }
          })
          return obj
        })
      } else {
        excelData.value = XLSX.utils.sheet_to_json(worksheet, {
          defval: '',
          blankrows: false
        })
      }
      if (!excelData.value || excelData.value.length === 0) {
        throw new Error('无法从Excel工作表提取有效数据')
      }
      createInitialMapping()
    } catch (error: any) {
      excelData.value = []
      ElMessage.error('切换Excel工作表失败: ' + (error.message || '未知错误'))
    }
  }
  reader.onerror = () => {
    ElMessage.error('读取Excel文件失败')
  }
  reader.readAsArrayBuffer(excelFile.value as File)
}

// 更新字段映射
const handleUpdateMapping = (mapping: Record<string, string>) => {
  columnMapping.value = mapping
}

// 处理模板下载
const handleDownloadTemplate = () => {
  const wb = XLSX.utils.book_new()
  const headers = props.columns.map((col: any) => col.label)
  const ws = XLSX.utils.aoa_to_sheet([headers])
  XLSX.utils.book_append_sheet(wb, ws, '导入模板')
  XLSX.writeFile(wb, `${props.tableTitle || '数据'}导入模板.xlsx`)
}

// 开始导入过程
const startImport = async () => {
  importTotal.value = excelData.value.length
  importSuccess.value = 0
  importFail.value = 0
  importWarnings.value = []
  try {
    const transformedData = excelData.value.map(row => {
      const result: Record<string, any> = {}
      for (const excelCol in row) {
        const fieldName = columnMapping.value[excelCol]
        if (fieldName) {
          result[fieldName] = row[excelCol]
        }
      }
      return result
    })

    props.columns.forEach((col: any) => {
      const field = col.rule && col.rule[0]
      if (field && field.$required) {
        transformedData.forEach((row, index) => {
          if (row[field.field] === undefined || row[field.field] === '') {
            importWarnings.value.push(`第${index + 1}行缺少必填字段: ${col.label}`)
          }
        })
      }
    })

    await props.onImport(transformedData)
    importSuccess.value = transformedData.length
    importStatus.value = 'success'
  } catch (error) {
    importFail.value = importTotal.value
    importStatus.value = 'error'
  }
}

// 关闭对话框时重置状态
const onClose = () => {
  activeStep.value = 0
  excelFile.value = null
  excelData.value = []
  excelSheets.value = []
  selectedSheet.value = ''
  columnMapping.value = {}
  importStatus.value = 'idle'
  importTotal.value = 0
  importSuccess.value = 0
  importFail.value = 0
  importWarnings.value = []

  if (importStatus.value === 'success') {
    emit('imported', {
      success: importSuccess.value,
      fail: importFail.value,
      warnings: importWarnings.value
    })
  }
}
</script>

<style scoped>
.import-steps {
  padding: 0 20px;
}
.import-steps .step-bar {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.import-steps .step-bar::before {
  content: '';
  position: absolute;
  top: 15px;
  left: 14px;
  right: 14px;
  height: 2px;
  background-color: #dcdfe6;
  z-index: 0;
}
.import-steps .step-item {
  position: relative;
  flex: 1;
  text-align: center;
  z-index: 1;
}
.import-steps .step-item::after {
  content: '';
  position: absolute;
  top: 15px;
  left: calc(50% + 14px);
  width: calc(100% - 28px);
  height: 2px;
  background-color: #dcdfe6;
  z-index: -1;
}
.import-steps .step-item:last-child::after {
  display: none;
}
.import-steps .step-index {
  width: 28px;
  height: 28px;
  line-height: 28px;
  border-radius: 50%;
  border: 2px solid #dcdfe6;
  background-color: #fff;
  margin: 0 auto;
}
.import-steps .step-title {
  margin-top: 8px;
  font-size: 14px;
  color: #606266;
}
.import-steps .step-item.is-active .step-index {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
}
.import-steps .step-item.is-active .step-title {
  color: #409eff;
  font-weight: 700;
}
.import-steps .step-item.is-done .step-index {
  background-color: #67c23a;
  border-color: #67c23a;
  color: #fff;
}
.import-steps .step-item.is-done .step-title {
  color: #67c23a;
}
.import-steps .step-item.is-done::after {
  background-color: #67c23a;
}
.import-steps .mb-20px {
  margin-bottom: 20px;
}
.import-steps .step-content {
  min-height: 300px;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
