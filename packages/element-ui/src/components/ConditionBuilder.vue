<template>
  <div class="_fd-condition-builder">
    <el-form label-width="80px" size="small">
      <el-form-item :label="t ? t('props.logic') : 'Logic'">
        <el-radio-group v-model="local.mode">
          <el-radio-button label="AND">AND</el-radio-button>
          <el-radio-button label="OR">OR</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="t ? t('props.action') : 'Action'">
        <el-radio-group v-model="action">
          <el-radio-button label="hide">{{ t('props.hide') || 'Hide' }}</el-radio-button>
          <el-radio-button label="show">{{ t('props.show') || 'Show' }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <div class="_fd-cond-group">
        <!-- 渲染条件组和条件项 -->
        <template v-for="(item, idx) in local.group" :key="idx">
          <!-- 条件项 -->
          <div v-if="!item.isGroup" class="_fd-cond-row">
            <el-select v-model="item.type" class="_fd-cond-type" size="small" style="width:80px;">
              <el-option :label="t ? t('props.component') : 'Component'" value="field" />
              <el-option :label="t ? t('props.variable') : 'Variable'" value="var" />
            </el-select>
            <!-- 选择组件 -->
            <template v-if="item.type==='field'">
              <el-select v-model="item.field" size="small" class="_fd-cond-field" style="width:140px;">
                <!-- 修改下拉选项，使用新的fields数据格式 -->
                <template v-if="Array.isArray(fields) && fields.length > 0 && fields[0] && typeof fields[0] === 'object'">
                  <!-- 处理新的fields格式（对象数组） -->
                  <el-option 
                    v-for="field in fields" 
                    :key="field.value" 
                    :label="field.label" 
                    :value="field.value" 
                  />
                </template>
                <template v-else>
                  <!-- 向后兼容旧的fields格式（字符串数组） -->
                  <el-option 
                    v-for="f in fields" 
                    :key="f" 
                    :label="f" 
                    :value="f" 
                  />
                </template>
              </el-select>
            </template>
            <!-- 输入变量 -->
            <template v-else>
              <el-input v-model="item.field" size="small" style="width:140px;" />
            </template>
            <!-- 条件选择 -->
            <el-select v-model="item.condition" size="small" class="_fd-cond-op" style="width:100px;">
              <el-option :label="t ? t('props.equal') : 'Equal'" value="==" />
              <el-option :label="t ? t('props.notEqual') : 'Not Equal'" value="!=" />
              <el-option :label="t ? t('props.contain') : 'Contain'" value="on" />
              <el-option :label="t ? t('props.notContain') : 'Not Contain'" value="notOn" />
              <el-option :label="t ? t('props.empty') : 'Empty'" value="empty" />
              <el-option :label="t ? t('props.notEmpty') : 'Not Empty'" value="notEmpty" />
            </el-select>
            <!-- 条件值输入框或组件选择，根据isFieldCompare决定 -->
            <template v-if="needValue(item.condition)">
              <!-- 使用按钮代替复选框，更容易点击 -->
              <el-button 
                :type="item.isFieldCompare ? 'primary' : 'default'"
                size="small" 
                plain
                @click="toggleFieldCompare(item)"
                style="margin-right:5px;"
              >{{ t ? t('props.field') : 'Field' }}</el-button>
              
              <!-- 字段比较模式 - 组件选择 -->
              <template v-if="item.isFieldCompare">
                <el-select v-model="item.compare" size="small" style="width:120px;">
                  <!-- 修改下拉选项，使用新的fields数据格式 -->
                  <template v-if="Array.isArray(fields) && fields.length > 0 && fields[0] && typeof fields[0] === 'object'">
                    <!-- 处理新的fields格式（对象数组） -->
                    <el-option 
                      v-for="field in fields" 
                      :key="field.value" 
                      :label="field.label" 
                      :value="field.value" 
                    />
                  </template>
                  <template v-else>
                    <!-- 向后兼容旧的fields格式（字符串数组） -->
                    <el-option 
                      v-for="f in fields" 
                      :key="f" 
                      :label="f" 
                      :value="f" 
                    />
                  </template>
                </el-select>
              </template>
              <!-- 普通值比较模式 - 输入框 -->
              <template v-else>
                <el-input v-model="item.value" size="small" style="width:120px;" />
              </template>
            </template>
            <!-- 删除按钮 -->
            <el-button text type="primary" size="small" @click="removeItem(idx)">
              <i class="fc-icon icon-delete" />
            </el-button>
          </div>
          
          <!-- 条件组 -->
          <div v-else class="_fd-cond-group-container">
            <!-- 条件组头部 -->
            <div class="_fd-cond-group-header">
              <el-select v-model="item.mode" size="small" style="width:80px;">
                <el-option label="AND" value="AND" />
                <el-option label="OR" value="OR" />
              </el-select>
              <el-button text type="primary" size="small" @click="removeItem(idx)">
                <i class="fc-icon icon-delete" />
              </el-button>
            </div>
            
            <!-- 条件组内的条件项 -->
            <div class="_fd-cond-group-content">
              <template v-for="(subItem, subIdx) in item.children" :key="subIdx">
                <!-- 子条件项 -->
                <div v-if="!subItem.isGroup" class="_fd-cond-row">
                  <el-select v-model="subItem.type" class="_fd-cond-type" size="small" style="width:80px;">
                    <el-option :label="t ? t('props.component') : 'Component'" value="field" />
                    <el-option :label="t ? t('props.variable') : 'Variable'" value="var" />
                  </el-select>
                  <!-- 选择组件 -->
                  <template v-if="subItem.type==='field'">
                    <el-select v-model="subItem.field" size="small" class="_fd-cond-field" style="width:140px;">
                      <!-- 修改下拉选项，使用新的fields数据格式 -->
                      <template v-if="Array.isArray(fields) && fields.length > 0 && fields[0] && typeof fields[0] === 'object'">
                        <!-- 处理新的fields格式（对象数组） -->
                        <el-option 
                          v-for="field in fields" 
                          :key="field.value" 
                          :label="field.label" 
                          :value="field.value" 
                        />
                      </template>
                      <template v-else>
                        <!-- 向后兼容旧的fields格式（字符串数组） -->
                        <el-option 
                          v-for="f in fields" 
                          :key="f" 
                          :label="f" 
                          :value="f" 
                        />
                      </template>
                    </el-select>
                  </template>
                  <!-- 输入变量 -->
                  <template v-else>
                    <el-input v-model="subItem.field" size="small" style="width:140px;" />
                  </template>
                  <!-- 条件选择 -->
                  <el-select v-model="subItem.condition" size="small" class="_fd-cond-op" style="width:100px;">
                    <el-option :label="t ? t('props.equal') : 'Equal'" value="==" />
                    <el-option :label="t ? t('props.notEqual') : 'Not Equal'" value="!=" />
                    <el-option :label="t ? t('props.contain') : 'Contain'" value="on" />
                    <el-option :label="t ? t('props.notContain') : 'Not Contain'" value="notOn" />
                    <el-option :label="t ? t('props.empty') : 'Empty'" value="empty" />
                    <el-option :label="t ? t('props.notEmpty') : 'Not Empty'" value="notEmpty" />
                  </el-select>
                  <!-- 条件值输入框或组件选择，根据isFieldCompare决定 -->
                  <template v-if="needValue(subItem.condition)">
                    <!-- 使用按钮代替复选框，更容易点击 -->
                    <el-button 
                      :type="subItem.isFieldCompare ? 'primary' : 'default'"
                      size="small" 
                      plain
                      @click="toggleFieldCompare(subItem)"
                      style="margin-right:5px;"
                    >{{ t ? t('props.field') : 'Field' }}</el-button>
                    
                    <!-- 字段比较模式 - 组件选择 -->
                    <template v-if="subItem.isFieldCompare">
                      <el-select v-model="subItem.compare" size="small" style="width:120px;">
                        <!-- 修改下拉选项，使用新的fields数据格式 -->
                        <template v-if="Array.isArray(fields) && fields.length > 0 && fields[0] && typeof fields[0] === 'object'">
                          <!-- 处理新的fields格式（对象数组） -->
                          <el-option 
                            v-for="field in fields" 
                            :key="field.value" 
                            :label="field.label" 
                            :value="field.value" 
                          />
                        </template>
                        <template v-else>
                          <!-- 向后兼容旧的fields格式（字符串数组） -->
                          <el-option 
                            v-for="f in fields" 
                            :key="f" 
                            :label="f" 
                            :value="f" 
                          />
                        </template>
                      </el-select>
                    </template>
                    <!-- 普通值比较模式 - 输入框 -->
                    <template v-else>
                      <el-input v-model="subItem.value" size="small" style="width:120px;" />
                    </template>
                  </template>
                  <!-- 删除按钮 -->
                  <el-button text type="primary" size="small" @click="removeSubItem(item, subIdx)">
                    <i class="fc-icon icon-delete" />
                  </el-button>
                </div>
                
                <!-- 子条件组 - 这里仅支持两层嵌套，如需更多层级可以进一步抽象组件 -->
                <div v-else class="_fd-cond-subgroup-container">
                  <!-- 子条件组头部 -->
                  <div class="_fd-cond-group-header">
                    <el-select v-model="subItem.mode" size="small" style="width:80px;">
                      <el-option label="AND" value="AND" />
                      <el-option label="OR" value="OR" />
                    </el-select>
                    <el-button text type="primary" size="small" @click="removeSubItem(item, subIdx)">
                      <i class="fc-icon icon-delete" />
                    </el-button>
                  </div>
                  
                  <!-- 子条件组内的条件项 -->
                  <div class="_fd-cond-group-content">
                    <div v-for="(thirdItem, thirdIdx) in subItem.children" :key="thirdIdx" class="_fd-cond-row">
                      <el-select v-model="thirdItem.type" class="_fd-cond-type" size="small" style="width:80px;">
                        <el-option :label="t ? t('props.component') : 'Component'" value="field" />
                        <el-option :label="t ? t('props.variable') : 'Variable'" value="var" />
                      </el-select>
                      <!-- 选择组件 -->
                      <template v-if="thirdItem.type==='field'">
                        <el-select v-model="thirdItem.field" size="small" class="_fd-cond-field" style="width:140px;">
                          <!-- 修改下拉选项，使用新的fields数据格式 -->
                          <template v-if="Array.isArray(fields) && fields.length > 0 && fields[0] && typeof fields[0] === 'object'">
                            <!-- 处理新的fields格式（对象数组） -->
                            <el-option 
                              v-for="field in fields" 
                              :key="field.value" 
                              :label="field.label" 
                              :value="field.value" 
                            />
                          </template>
                          <template v-else>
                            <!-- 向后兼容旧的fields格式（字符串数组） -->
                            <el-option 
                              v-for="f in fields" 
                              :key="f" 
                              :label="f" 
                              :value="f" 
                            />
                          </template>
                        </el-select>
                      </template>
                      <!-- 输入变量 -->
                      <template v-else>
                        <el-input v-model="thirdItem.field" size="small" style="width:140px;" />
                      </template>
                      <!-- 条件选择 -->
                      <el-select v-model="thirdItem.condition" size="small" class="_fd-cond-op" style="width:100px;">
                        <el-option :label="t ? t('props.equal') : 'Equal'" value="==" />
                        <el-option :label="t ? t('props.notEqual') : 'Not Equal'" value="!=" />
                        <el-option :label="t ? t('props.contain') : 'Contain'" value="on" />
                        <el-option :label="t ? t('props.notContain') : 'Not Contain'" value="notOn" />
                        <el-option :label="t ? t('props.empty') : 'Empty'" value="empty" />
                        <el-option :label="t ? t('props.notEmpty') : 'Not Empty'" value="notEmpty" />
                      </el-select>
                      <!-- 条件值输入框或组件选择，根据isFieldCompare决定 -->
                      <template v-if="needValue(thirdItem.condition)">
                        <!-- 使用按钮代替复选框，更容易点击 -->
                        <el-button 
                          :type="thirdItem.isFieldCompare ? 'primary' : 'default'"
                          size="small" 
                          plain
                          @click="toggleFieldCompare(thirdItem)"
                          style="margin-right:5px;"
                        >{{ t ? t('props.field') : 'Field' }}</el-button>
                        
                        <!-- 字段比较模式 - 组件选择 -->
                        <template v-if="thirdItem.isFieldCompare">
                          <el-select v-model="thirdItem.compare" size="small" style="width:120px;">
                            <!-- 修改下拉选项，使用新的fields数据格式 -->
                            <template v-if="Array.isArray(fields) && fields.length > 0 && fields[0] && typeof fields[0] === 'object'">
                              <!-- 处理新的fields格式（对象数组） -->
                              <el-option 
                                v-for="field in fields" 
                                :key="field.value" 
                                :label="field.label" 
                                :value="field.value" 
                              />
                            </template>
                            <template v-else>
                              <!-- 向后兼容旧的fields格式（字符串数组） -->
                              <el-option 
                                v-for="f in fields" 
                                :key="f" 
                                :label="f" 
                                :value="f" 
                              />
                            </template>
                          </el-select>
                        </template>
                        <!-- 普通值比较模式 - 输入框 -->
                        <template v-else>
                          <el-input v-model="thirdItem.value" size="small" style="width:120px;" />
                        </template>
                      </template>
                      <!-- 删除按钮 -->
                      <el-button text type="primary" size="small" @click="removeThirdItem(subItem, thirdIdx)">
                        <i class="fc-icon icon-delete" />
                      </el-button>
                    </div>
                  </div>
                  
                  <!-- 子条件组底部按钮 -->
                  <div class="_fd-cond-group-footer">
                    <el-button type="primary" plain size="small" @click="addThirdCondition(subItem)">
                      {{ t ? t('props.add') : 'Add Condition' }}
                    </el-button>
                  </div>
                </div>
              </template>
              
              <!-- 条件组底部按钮 -->
              <div class="_fd-cond-group-footer">
                <el-button type="primary" plain size="small" @click="addSubCondition(item)">
                  {{ t ? t('props.add') : 'Add Condition' }}
                </el-button>
                <el-button type="primary" plain size="small" @click="addSubGroup(item)">
                  {{ t ? t('props.addGroup') : 'Add Group' }}
                </el-button>
              </div>
            </div>
          </div>
        </template>
        
        <!-- 底部按钮 -->
        <div class="_fd-cond-buttons">
          <el-button type="primary" plain size="small" @click="addCondition">
            {{ t ? t('props.add') : 'Add Condition' }}
          </el-button>
          <el-button type="primary" plain size="small" @click="addGroup">
            {{ t ? t('props.addGroup') : 'Add Group' }}
          </el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import {defineComponent, reactive, watch, ref, markRaw} from 'vue';

export default defineComponent({
  name: 'ConditionBuilder',
  props: {
    modelValue: Object,
    fields: {
      type: Array,
      default: () => []
    },
    t: Function
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const local = reactive({ mode: 'AND', group: [] });
    const action = ref('hide');
    const needValue = (c) => ['==', '!=', 'on', 'notOn'].indexOf(c) > -1;

    // 切换字段比较模式
    const toggleFieldCompare = (item) => {
      item.isFieldCompare = !item.isFieldCompare;
      
      // 如果切换到字段比较模式，初始化选择第一个字段
      if (item.isFieldCompare && !item.compare && props.fields.length > 0) {
        if (typeof props.fields[0] === 'object' && props.fields[0].value) {
          item.compare = props.fields[0].value;
        } else if (typeof props.fields[0] === 'string') {
          item.compare = props.fields[0];
        }
      }
    };

    // 使用markRaw标记处理过的数据，防止Vue对复杂嵌套数据进行响应式处理
    const load = (val) => {
      if (val && typeof val === 'object') {
        local.mode = val.mode || 'AND';
        
        // 处理旧格式的数据
        let newGroup = [];
        if (Array.isArray(val.group)) {
          for (const item of val.group) {
            if (item.isGroup) {
              // 深拷贝防止引用问题
              const groupCopy = JSON.parse(JSON.stringify(item));
              newGroup.push(groupCopy);
            } else {
              newGroup.push({
                type: item.type || 'field',
                field: item.field || '',
                condition: item.condition || '==',
                value: item.value || '',
                // 处理字段比较模式
                isFieldCompare: !!item.compare,
                compare: item.compare || ''
              });
            }
          }
        }
        // 使用markRaw标记，避免嵌套过深的响应式跟踪
        local.group = markRaw(newGroup);
        action.value = val.invert ? 'show' : 'hide';
      } else {
        local.mode = 'AND';
        local.group = [];
        action.value = 'hide';
      }
    };
    
    // 立即加载数据
    if (props.modelValue) {
      load(props.modelValue);
    }
    
    // 监听modelValue变化
    watch(() => props.modelValue, (newVal) => {
      if (newVal !== undefined) {
        load(newVal);
      }
    });

    // 添加顶层条件
    const addCondition = () => {
      const newCondition = { 
        type: 'field', 
        field: '', 
        condition: '==', 
        value: '',
        isFieldCompare: false,
        compare: ''
      };
      local.group = [...local.group, newCondition];
    };
    
    // 添加顶层条件组
    const addGroup = () => {
      const newGroup = { 
        isGroup: true, 
        mode: 'AND', 
        children: [] 
      };
      local.group = [...local.group, newGroup];
    };
    
    // 删除顶层条件项或条件组
    const removeItem = (idx) => {
      local.group = local.group.filter((_, i) => i !== idx);
    };
    
    // 添加子条件
    const addSubCondition = (item) => {
      if (item.isGroup) {
        const newChildren = [...(item.children || []), { 
          type: 'field', 
          field: '', 
          condition: '==', 
          value: '',
          isFieldCompare: false,
          compare: ''
        }];
        item.children = newChildren;
      }
    };
    
    // 添加子条件组
    const addSubGroup = (item) => {
      if (item.isGroup) {
        const newChildren = [...(item.children || []), { 
          isGroup: true, 
          mode: 'AND', 
          children: [] 
        }];
        item.children = newChildren;
      }
    };
    
    // 删除子条件项或条件组
    const removeSubItem = (parentItem, idx) => {
      if (parentItem.isGroup) {
        parentItem.children = parentItem.children.filter((_, i) => i !== idx);
      }
    };
    
    // 添加第三层条件
    const addThirdCondition = (item) => {
      if (item.isGroup) {
        const newChildren = [...(item.children || []), { 
          type: 'field', 
          field: '', 
          condition: '==', 
          value: '',
          isFieldCompare: false,
          compare: ''
        }];
        item.children = newChildren;
      }
    };
    
    // 删除第三层条件
    const removeThirdItem = (parentItem, idx) => {
      if (parentItem.isGroup) {
        parentItem.children = parentItem.children.filter((_, i) => i !== idx);
      }
    };

    // 递归处理嵌套条件组
    const processGroup = (items) => {
      return items.map(item => {
        if (item.isGroup) {
          const groupItem = {
            isGroup: true,
            mode: item.mode || 'AND',
            children: processGroup(item.children || [])
          };
          return groupItem;
        } else {
          const condItem = { 
            type: item.type || 'field', 
            field: item.field, 
            condition: item.condition 
          };
          
          // 处理条件值，根据是否是字段比较模式
          if (needValue(item.condition)) {
            if (item.isFieldCompare) {
              condItem.compare = item.compare;
            } else {
              condItem.value = item.value;
            }
          }
          
          return condItem;
        }
      });
    };

    const toVal = () => {
      const val = {
        mode: local.mode,
        group: processGroup(local.group)
      };
      if (action.value === 'show') val.invert = true;
      return val;
    };

    // 使用debounce防止频繁更新
    let updateTimer = null;
    const updateModelValue = () => {
      if (updateTimer) clearTimeout(updateTimer);
      updateTimer = setTimeout(() => {
        emit('update:modelValue', toVal());
      }, 100);
    };

    watch(() => local.mode, updateModelValue);
    watch(() => action.value, updateModelValue);
    watch(() => local.group, updateModelValue, { deep: true });

    return { 
      local, 
      action,
      needValue,
      toggleFieldCompare,
      addCondition,
      addGroup,
      removeItem,
      addSubCondition,
      addSubGroup,
      removeSubItem,
      addThirdCondition,
      removeThirdItem
    };
  }
});
</script>

<style scoped>
._fd-cond-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
._fd-cond-row {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 6px;
  flex-wrap: wrap; /* 允许元素换行，防止在小屏幕上挤压 */
}
._fd-cond-buttons {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
._fd-cond-group-container {
  border: 1px dashed #ccc;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
}
._fd-cond-subgroup-container {
  border: 1px dashed #ddd;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
  margin-left: 20px;
  background-color: #f9f9f9;
}
._fd-cond-group-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  justify-content: space-between;
}
._fd-cond-group-content {
  padding-left: 10px;
}
._fd-cond-group-footer {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
</style>

