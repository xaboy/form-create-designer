<template>
    <div class="_fd-fn">
        <div class="_fd-fn-tip">
            <div class="_fd-fn-ind"></div>
            <div class="cm-keyword"><span>function {{ name }}(<template
                v-for="(item, idx) in argList" :key="idx">{{ idx > 0 ? ', ' : '' }}<template
                v-if="item.type === 'string'"><span>{{ item.name }}</span>
</template><template v-else><a-popover trigger="click"
                                       :title="item.name"
                                       :content="item.info || undefined"
            ><span class="_fd-fn-arg">{{ item.name }}<i
                class="fc-icon icon-question"></i></span>
                            <template #content v-if="item.columns">
                                <a-table
                                    :data-source="item.columns"
                                    :columns="columns"
                                    size="small"
                                    bordered
                                    :pagination="false"
                                    style="width: 400px">
                                    <template #bodyCell="scope">
                                        {{ scope.record[scope.column.dataIndex] }}
                                    </template>
                                </a-table>
                            </template>
                        </a-popover>
                    </template>
                    </template>) {</span></div>
        </div>
        <div ref="editor" class="_fd-fn-editor"></div>
        <div class="_fd-fn-tip">
            <div class="_fd-fn-ind"></div>
            <div class="cm-keyword">}</div>
        </div>
        <a-button v-if="visible && button" type="primary" size="small" @click="save">{{ t('props.save') }}</a-button>
    </div>
</template>

<script>
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/hint/show-hint.css';
import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import {defineComponent, markRaw} from 'vue';
import {addAutoKeyMap, toJSON} from '../utils';
import errorMessage from '../utils/message';

const PREFIX = '[[FORM-CREATE-PREFIX-';
const SUFFIX = '-FORM-CREATE-SUFFIX]]';

export default defineComponent({
    name: 'FnEditor',
    emits: ['update:modelValue', 'change'],
    props: {
        modelValue: [String, Function],
        name: String,
        args: Array,
        body: Boolean,
        button: Boolean,
        fnx: Boolean,
    },
    inject: ['designer'],
    data() {
        return {
            editor: null,
            fn: '',
            visible: false,
            value: '',
        };
    },
    watch: {
        modelValue(n) {
            if (n != this.value && (!n || !n.__json || (n.__json && n.__json != this.value))) {
                this.editor && this.editor.setValue(this.tidyValue());
            }
        },
    },
    computed: {
        t() {
            return this.designer.setupState.t;
        },
        columns() {
            return [
                {
                    title: this.t('props.field'),
                    dataIndex: 'label',
                    width: '120px',
                },
                {
                    title: this.t('event.info'),
                    dataIndex: 'info',
                },
                {
                    title: this.t('event.type'),
                    dataIndex: 'type',
                    width: '80px',
                },
            ];
        },
        argStr() {
            return (this.args || []).map(arg => {
                if (typeof arg === 'string') {
                    return arg;
                }
                return arg.name;
            }).join(', ');
        },
        argList() {
            return this.args.map(arg => {
                if (typeof arg === 'string') {
                    return {
                        name: arg,
                        type: 'string'
                    }
                }
                return arg;
            });
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.load();
        });
    },
    methods: {
        save() {
            const str = this.editor.getValue() || '';
            if (str.trim() === '') {
                this.fn = '';
            } else {
                let fn;
                try {
                    fn = (new Function('return function (' + this.argStr + '){\n' + str + '\n}'))();
                } catch (e) {
                    console.error(e);
                    errorMessage(this.t('struct.errorMsg'));
                    return false;
                }
                if (this.body) {
                    this.fn = (this.fnx ? '$FNX:' : '') + str;
                } else {
                    this.fn = PREFIX + fn + SUFFIX;
                }
            }
            this.submit();
            return true;
        },
        submit() {
            this.$emit('update:modelValue', this.fn);
            this.$emit('change', this.fn);
            this.value = this.fn;
            this.visible = false;
        },
        trimString(input) {
            const firstIndex = input.indexOf('{');
            const lastIndex = input.lastIndexOf('}');
            if (firstIndex === -1 || lastIndex === -1 || firstIndex >= lastIndex) {
                return input;
            }
            return input.slice(firstIndex + 1, lastIndex).replace(/^\n+|\n+$/g, '');
        },
        tidyValue() {
            let value = this.modelValue || '';
            if (value.__json) {
                value = value.__json;
            }
            if (this.fnx && typeof value === 'string' && value.indexOf('$FNX:') === 0) {
                value = value.slice(5);
            }
            if (typeof value === 'function') {
                value = this.trimString(toJSON(value)).trim();
            } else if (!this.body) {
                value = this.trimString(value).trim();
            }
            this.value = value;
            return value;
        },
        load() {
            this.$nextTick(() => {
                let value = this.tidyValue();
                this.editor = markRaw(CodeMirror(this.$refs.editor, {
                    lineNumbers: true,
                    mode: {name: 'javascript', globalVars: true},
                    extraKeys: {'Ctrl-Space': 'autocomplete'},
                    line: true,
                    tabSize: 2,
                    lineWrapping: true,
                    value,
                }));
                this.editor.on('inputRead', (cm, event) => {
                    if (event.keyCode === 32 && event.ctrlKey) { // 检测 Ctrl + Space 快捷键
                        CodeMirror.showHint(cm, CodeMirror.hint.javascript); // 触发代码提示
                    }
                });
                this.editor.on('change', () => {
                    this.visible = true;
                });
                addAutoKeyMap(this.editor);
            });
        },
    }
});
</script>

<style>

._fd-fn {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
}

._fd-fn .ant-btn {
    position: absolute;
    bottom: 3px;
    right: 5px;
    font-size: 12px;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
}

._fd-fn-editor {
    display: flex;
    flex: 1;
    width: 100%;
    overflow: auto;
}

._fd-fn-editor .CodeMirror {
    height: 100%;
    width: 100%;
}

._fd-fn-tip {
    color: #262626;
    font-family: monospace;
    direction: ltr;
    background: #F5F5F5;
}

._fd-fn-tip .cm-keyword {
    color: #708;
    line-height: 24px;
    white-space: nowrap;
    overflow-x: auto;
}

._fd-fn-tip .cm-keyword::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
}

._fd-fn-ind {
    background-color: #ECECEC;
    width: 29px;
    height: 24px;
    display: inline-block;
    margin-right: 4px;
    border-right: 1px solid #D9D9D9;
    float: left;
}

._fd-fn-arg {
    text-decoration: underline;
    cursor: pointer;
}

._fd-fn-arg i {
    font-size: 12px;
    color: #2E73FF;
}

</style>
