<template>
  <div class="_fc_table_opt">
    <el-table
        :data="modelValue"
        border
        size="small"
        style="width: 100%">
      <el-table-column type="index" width="50" label="序号"/>
      <template v-for="(item, index) in columns" :key="index">
        <el-table-column :label="item.props.title" :min-width="item.minWidth">
          <template #default="scope">
            <component v-bind="i.props"  v-for="(i, j) in item.children" :key="j" :is="`el-${i.type}`" size="small" :modelValue="scope.row[i.field] || ''"
                       @Update:modelValue="(n)=>(scope.row[i.field] = n, onInput(scope.row))">
            </component>
          </template>
        </el-table-column>
      </template>
      <el-table-column min-width="50" align="center" fixed="right" :label="t('tableOptions.handle')">

        <template #default="scope">
          <i class="fc-icon icon-delete" @click="del(scope.$index)"></i>
        </template>
      </el-table-column>
    </el-table>
    <el-button link type="primary" @click="add">
      <i class="fc-icon icon-add"></i> {{ t('tableOptions.add') }}
    </el-button>
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'TableForm',
    inheritAttrs: false,
    props: {
        modelValue: {
            type: Array,
        },
        columns: [Object, Array, String]
    },
    inject: ['designer'],
    data() {
        return {
            data:[{}],
            t: this.designer.setupState.t,
        };
    },
    created() {
        if (!Array.isArray(this.modelValue)) {
            this.$emit('input', []);
        }
    },
    methods: {
        onInput(item) {
            if (item.label !== undefined && item.value !== undefined) {
                this.input();
            }
        },
        input() {
            this.$emit('update:modelValue', this.modelValue);
        },
        add() {
            this.modelValue.push(this.columns.reduce((initial, v) => {
                initial[v.children[0].field] = '';
                return initial;
            }, {}));
        },
        del(idx) {
            this.modelValue.splice(idx, 1);
            this.input(this.modelValue);
        }
    }
});
</script>

<style scoped>
._fc_table_opt {
  width: 100%;
}
</style>
