<template>
  <div class="step-import-data">
    <!-- 导入中 -->
    <div v-if="status === 'importing'" class="importing">
      <div class="loading-icon">
        <el-icon class="is-loading" size="60"><loading /></el-icon>
      </div>
      <div class="loading-text">数据导入中，请耐心等待...</div>
    </div>

    <!-- 导入成功 -->
    <div v-else-if="status === 'success'" class="success">
      <div class="result-icon">
        <el-icon color="#67C23A" size="60"><circle-check /></el-icon>
      </div>
      <div class="result-title">导入成功</div>
      <div class="result-summary">
        共{{total}}条数据，成功导入{{success}}条
        <template v-if="fail > 0">，失败{{fail}}条</template>
      </div>

      <!-- 有警告信息 -->
      <div class="warning-area" v-if="warnings.length > 0">
        <el-alert
          title="以下数据存在问题，但不影响导入"
          type="warning"
          :closable="false"
          show-icon
        />
        <el-scrollbar height="150px">
          <div class="warning-list">
            <div class="warning-item" v-for="(warning, index) in warnings" :key="index">
              {{ warning }}
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>

    <!-- 导入失败 -->
    <div v-else-if="status === 'error'" class="error">
      <div class="result-icon">
        <el-icon color="#F56C6C" size="60"><circle-close /></el-icon>
      </div>
      <div class="result-title">导入失败</div>
      <div class="result-summary">
        请检查数据格式或稍后重试
      </div>
    </div>

    <!-- 默认状态 -->
    <div v-else class="idle">
      <el-empty description="准备导入数据" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CircleCheck, CircleClose, Loading } from '@element-plus/icons-vue'

defineOptions({ name: 'StepImportData' })

const props = defineProps({
  status: { type: String, default: 'idle' },
  total: { type: Number, default: 0 },
  success: { type: Number, default: 0 },
  fail: { type: Number, default: 0 },
  warnings: { type: Array, default: () => [] }
})
</script>

<style lang="scss" scoped>
.step-import-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  .importing, .success, .error, .idle {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .loading-text, .result-title {
    font-size: 18px;
    font-weight: bold;
    margin: 20px 0 10px;
  }
  .result-summary {
    color: #606266;
    margin-bottom: 20px;
  }
  .warning-area {
    width: 100%;
    margin-top: 20px;
    .warning-list {
      margin-top: 10px;
      .warning-item {
        padding: 8px;
        border-bottom: 1px solid #ebeef5;
        color: #E6A23C;
        &:last-child { border-bottom: none; }
      }
    }
  }
}
</style>
