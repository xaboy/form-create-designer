<template>
    <div class="_fc_table_opt">
      <el-container>
        <el-header v-if="title" class="_fc_table_header" height="40px">{{title}}</el-header>
        <el-main>
          <el-table
              :data="modelValue"
              border
              size="small"
              style="width: 100%">
            <template v-for="(col,idx) in column" :key="col.label + idx">
              <el-table-column :label="col.label">
                <template #default="scope">
                  <el-input size="small" :modelValue="scope.row[col.key] || ''"
                            @Update:modelValue="(n)=>(scope.row[col.key] = n, onInput(scope.row))"></el-input>
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
        </el-main>
      </el-container>
    </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'TableOptions',
    inheritAttrs: false,
    props: {
        modelValue: [Object, Array, String],
        column:[Object,Array],
        title:[Object]
    },
    inject: ['designer'],
    data() {
        return {
            // column: [{label: 'label', key: 'label'}, {label: 'value', key: 'value'}],
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
            this.modelValue.push(this.column.reduce((initial, v) => {
                initial[v.key] = '';
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
._fc_table_header {
  text-align: center;
  line-height: 40px;
  vertical-align: middle;
}
</style>
