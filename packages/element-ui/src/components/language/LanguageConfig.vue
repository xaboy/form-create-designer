<template>
    <div class="_fd-language-config">
        <div class="_fc-l-label">{{ t('language.name') }}</div>
        <div class="_fc-l-info">
            {{ t('warning.language') }}
        </div>
        <div class="_fd-lc-header">
            <el-button size="small" @click="addColumn">{{ t('language.add') }}</el-button>
            <el-button size="small" type="danger" plain :disabled="!selected.length" @click="batchRmColumn">
                {{ t('language.batchRemove') }}
            </el-button>
        </div>
        <div class="_fd-lc-body">
            <el-table :data="column" size="small" ref="table"
                      @selection-change="selectionChange" row-key="key">
                <el-table-column type="selection" width="30px"></el-table-column>
                <el-table-column prop="key" label="Key" width="90px"></el-table-column>
                <template v-for="item in localeOptions" :key="item.value">
                    <el-table-column :prop="item.value" :label="item.label" min-width="100px">
                        <template #default="scope">
                            <template v-if="scope.row.input">
                                <el-input size="small" v-model="scope.row[item.value]" @blur="saveColumn(scope.row, true)"></el-input>
                            </template>
                            <template v-else>
                                {{ scope.row[item.value] || '-' }}
                            </template>
                        </template>
                    </el-table-column>
                </template>
                <el-table-column width="75px" :label="t('tableOptions.handle')" fixed="right">
                    <template #default="scope">
                        <div class="_fd-lc-handle">
                            <i class="fc-icon icon-edit" v-if="!scope.row.input" @click="scope.row.input = true"></i>
                            <i class="fc-icon icon-check" v-else @click="saveColumn(scope.row)"></i>
                            <i class="fc-icon icon-group" @click="copy(scope.row.key)"></i>
                            <i class="fc-icon icon-delete-circle" @click="rmColumn(scope.$index)"></i>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>

</template>

<script>
import {defineComponent} from 'vue';
import {copyTextToClipboard} from '../../utils';

export default defineComponent({
    name: 'LanguageConfig',
    inject: ['designer'],
    computed: {
        localeOptions() {
            return this.designer.setupState.getConfig('localeOptions', [
                {value: 'zh-cn', label: '简体中文'},
                {value: 'en', label: 'English'},
            ]);
        },
        t() {
            return this.designer.setupState.t;
        },
    },
    data() {
        return {
            column: [],
            uni: 0,
            selected: [],
        }
    },
    methods: {
        copy(key) {
            copyTextToClipboard(key);
        },
        addColumn() {
            this.column.unshift({
                key: this.randomString(),
                input: true,
            })
        },
        saveColumn(row, input) {
            row.input = input || false;
            const language = this.designer.setupState.formOptions.language;
            this.localeOptions.forEach(item => {
                if (!language[item.value]) {
                    language[item.value] = {};
                }
                language[item.value][row.key] = row[item.value];
            })
        },
        rmColumn(idx) {
            const row = this.column[idx];
            this.column.splice(idx, 1);
            const language = this.designer.setupState.formOptions.language;
            this.localeOptions.forEach(item => {
                if (language[item.value]) {
                    delete language[item.value][row.key]
                }
            })
        },
        batchRmColumn() {
            this.selected.forEach(item => {
                this.rmColumn(this.column.indexOf(item));
            });
            this.selected = [];
        },
        selectionChange(list) {
            this.selected = list;
        },
        randomString() {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            const charactersLength = characters.length;

            for (let i = 0; i < 7; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return characters.charAt((this.uni++) % 26) + result;
        }
    },
    mounted() {
        const language = this.designer.setupState.formOptions.language || {};
        const column = {};
        Object.keys(language).forEach(lang => {
            Object.keys(language[lang]).forEach(key => {
                if (!column[key]) {
                    column[key] = {
                        key: key,
                    }
                }
                column[key][lang] = language[lang][key];
            })
        });
        this.column = Object.values(column);
    }

});
</script>

<style>
._fd-language-config {
    height: 100%;
    overflow: auto;
}

._fd-lc-body, ._fd-lc-header {
    padding: 0 12px;
}

._fd-lc-body {
    overflow: auto;
}

._fd-lc-header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 12px;
}

._fd-language-config .el-table__cell {
    height: 34px;
}

._fd-language-config ._fc-l-info {
    margin-bottom: 12px;
}

._fd-lc-handle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
}
</style>
