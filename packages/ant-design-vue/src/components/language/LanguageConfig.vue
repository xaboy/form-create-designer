<template>
    <div class="_fd-language-config">
        <div class="_fc-l-label">{{ t('language.name') }}</div>
        <div class="_fc-l-info">
            {{ t('warning.language') }}
        </div>
        <div class="_fd-lc-header">
            <a-button size="small" @click="addColumn">{{ t('language.add') }}</a-button>
            <a-button size="small" danger plain :disabled="!selected.length" @click="batchRmColumn">
                {{ t('language.batchRemove') }}
            </a-button>
        </div>
        <div class="_fd-lc-body">
            <a-table :data-source="column" :columns="tableColumns" :row-selection="{onChange: selectionChange}"
                     size="small" ref="table"
                     :pagination="false" row-key="key">
                <template #bodyCell="scope">
                    <template v-if="scope.column.dataIndex === 'key'">
                        {{ scope.record.key }}
                    </template>
                    <template v-else-if="scope.column.dataIndex === 'handle'">
                        <div class="_fd-lc-handle">
                            <i class="fc-icon icon-edit" v-if="!scope.record.input"
                               @click="scope.record.input = true"></i>
                            <i class="fc-icon icon-check" v-else @click="saveColumn(scope.record)"></i>
                            <i class="fc-icon icon-group" @click="copy(scope.record.key)"></i>
                            <i class="fc-icon icon-delete-circle" @click="rmColumn(scope.index)"></i>
                        </div>
                    </template>
                    <template v-else>
                        <template v-if="scope.record.input">
                            <a-input size="small" v-model:value="scope.record[scope.column.dataIndex]"
                                     @blur="saveColumn(scope.record, true)"></a-input>
                        </template>
                        <template v-else>
                            {{ scope.record[scope.column.dataIndex] || '-' }}
                        </template>
                    </template>

                </template>
            </a-table>
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
        tableColumns() {
            const columns = [
                {
                    title: 'Key',
                    width: '90px',
                    dataIndex: 'key',
                },
            ]
            this.localeOptions.forEach((item) => {
                columns.push({
                    minWidth: '100px',
                    title: item.label,
                    dataIndex: item.value,
                })
            })
            columns.push({
                title: this.t('tableOptions.handle'),
                width: '75px',
                dataIndex: 'handle',
            })
            return columns;
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
        selectionChange(keys, list) {
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

._fd-lc-body .ant-table-cell {
    padding: 8px 4px !important;
}

._fd-lc-header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 12px;
}

._fd-lc-header .ant-btn + .ant-btn {
    margin-left: 12px;
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
