<template>
  <div class="_fd-condition-builder">
    <el-form label-width="80px" size="small">
      <el-form-item label="Logic">
        <el-radio-group v-model="local.mode">
          <el-radio-button label="AND">AND</el-radio-button>
          <el-radio-button label="OR">OR</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Action">
        <el-radio-group v-model="action">
          <el-radio-button label="hide">{{ t('props.hide') || 'Hide' }}</el-radio-button>
          <el-radio-button label="show">{{ t('props.show') || 'Show' }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <div class="_fd-cond-group">
        <div v-for="(cond, idx) in local.group" :key="idx" class="_fd-cond-row">
          <el-select v-model="cond.type" class="_fd-cond-type" size="small" style="width:80px;">
            <el-option label="{{ t('props.component') || 'Component' }}" value="field" />
            <el-option label="{{ t('props.variable') || 'Variable' }}" value="var" />
          </el-select>
          <template v-if="cond.type==='field'">
            <el-select v-model="cond.field" size="small" class="_fd-cond-field" style="width:140px;">
              <el-option v-for="f in fields" :key="f" :label="f" :value="f" />
            </el-select>
          </template>
          <template v-else>
            <el-input v-model="cond.field" size="small" style="width:140px;" />
          </template>
          <el-select v-model="cond.condition" size="small" class="_fd-cond-op" style="width:100px;">
            <el-option label="==" value="==" />
            <el-option label="!=" value="!=" />
            <el-option label="on" value="on" />
            <el-option label="notOn" value="notOn" />
            <el-option label="empty" value="empty" />
            <el-option label="notEmpty" value="notEmpty" />
          </el-select>
          <el-input v-if="needValue(cond.condition)" v-model="cond.value" size="small" style="width:120px;" />
          <el-button text type="primary" size="small" @click="remove(idx)">
            <i class="fc-icon icon-delete" />
          </el-button>
        </div>
        <el-button type="primary" plain size="small" @click="add">{{ t('props.add') || 'Add' }}</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import {defineComponent, reactive, watch, ref} from 'vue';

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

    const load = (val) => {
      if (val && typeof val === 'object') {
        local.mode = val.mode || 'AND';
        local.group = JSON.parse(JSON.stringify(val.group || []));
        action.value = val.invert ? 'show' : 'hide';
      } else {
        local.mode = 'AND';
        local.group = [];
        action.value = 'hide';
      }
    };
    watch(() => props.modelValue, load, { immediate: true });

    const add = () => {
      local.group.push({ type: 'field', field: '', condition: '==', value: '' });
    };
    const remove = (idx) => {
      local.group.splice(idx, 1);
    };

    const toVal = () => {
      const val = {
        mode: local.mode,
        group: local.group.map(c => {
          const r = { type: c.type, field: c.field, condition: c.condition };
          if (needValue(c.condition)) r.value = c.value;
          return r;
        })
      };
      if (action.value === 'show') val.invert = true;
      return val;
    };

    watch([() => local.mode, () => local.group, action], () => {
      emit('update:modelValue', toVal());
    }, { deep: true });

    return { local, action, add, remove, needValue };
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
}
</style>

