<template>
  <div class="step-select-file">
    <div class="upload-area">
      <el-upload
        class="upload-excel"
        drag
        action="#"
        :auto-upload="false"
        :show-file-list="true"
        :limit="1"
        :on-change="handleFileChange"
        :on-exceed="handleExceed"
        :before-upload="beforeUpload"
        :file-list="fileList"
        accept=".xls,.xlsx"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          点击或者拖动文件到此区域上传
          <div class="el-upload__tip">
            支持 XLS, XLSX 等类型的文件
          </div>
        </div>
      </el-upload>
    </div>

    <div class="upload-tips">
      <el-alert
        title="为了保证数据导入顺利，推荐您下载使用导入模板"
        type="info"
        show-icon
        class="mb-10px"
      />

      <div class="tips-list">
        <div class="tip-item">• 文件大小不超过 10MB</div>
        <div class="tip-item">• 仅支持 .xls 和 .xlsx 文件</div>
        <div class="tip-item">• 请确保您需要导入的excel: 不含合并单元格、sheet表头不含空单元格</div>
        <div class="tip-item">• 批量导入的数据不支持"内置变量"作为条件的过滤</div>
        <div class="tip-item">• 导入文件 不支持Excel公式计算，如SUM，=H2*I2等</div>
        <div class="tip-item">• 自动导入 图片/附件 会转存，占用一定附件容量</div>
      </div>

      <div class="template-download">
        <el-button type="primary" link @click="downloadTemplate">
          <el-icon><download /></el-icon>
          <span>下载导入模板</span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { UploadFilled, Download } from '@element-plus/icons-vue'
import type { UploadProps, UploadUserFile } from 'element-plus'

defineOptions({ name: 'StepSelectFile' })

const props = defineProps({
  columns: { type: Array, required: true },
  tableTitle: { type: String, default: '' }
})

const emit = defineEmits(['select-file', 'download-template'])

const fileList = ref([])

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  const isExcel = file.type === 'application/vnd.ms-excel' ||
    file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    /(\.xls|\.xlsx)$/.test(file.name.toLowerCase())
  if (!isExcel) { ElMessage.error('只能上传Excel文件!'); return false }
  const isLt10M = file.size / 1024 / 1024 < 10
  if (!isLt10M) { ElMessage.error('文件大小不能超过10MB!'); return false }
  return true
}

const handleFileChange: UploadProps['onChange'] = (uploadFile) => {
  fileList.value = [uploadFile.raw]
  emit('select-file', uploadFile.raw)
}

const handleExceed: UploadProps['onExceed'] = () => {
  ElMessage.warning('只能上传一个文件，请先删除已上传的文件')
}

const downloadTemplate = () => { emit('download-template') }
</script>


<style scoped>
.step-select-file {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.step-select-file .upload-area {
  display: flex;
  justify-content: center;
}
.step-select-file .upload-area .upload-excel {
  width: 100%;
}
.step-select-file .upload-area .upload-excel :deep(.el-upload) {
  width: 100%;
}
.step-select-file .upload-area .upload-excel :deep(.el-upload-dragger) {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.step-select-file .upload-tips {
  padding: 10px;
}
.step-select-file .upload-tips .mb-10px {
  margin-bottom: 10px;
}
.step-select-file .upload-tips .tips-list {
  padding: 10px;
}
.step-select-file .upload-tips .tips-list .tip-item {
  line-height: 1.8;
  color: #606266;
  font-size: 14px;
}
.step-select-file .upload-tips .template-download {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>