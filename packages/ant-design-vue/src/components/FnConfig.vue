<template>
    <div class="_fd-fn-list">
        <a-badge color="orange" :count="eventNum">
            <a-button class="_fd-plain-button" type="primary" size="small" ghost @click="visible=true">
                {{ t('event.title') }}
            </a-button>
        </a-badge>
        <a-modal class="_fd-fn-list-dialog _fd-config-dialog" :title="t('event.title')" v-model:open="visible"
                 centered :maskClosable="false" :destroyOnClose="true"
                 width="980px">
            <a-layout class="_fd-fn-list-con" style="height: 600px">
                <a-layout-sider width="300px">
                    <a-layout class="_fd-fn-list-l">
                        <a-layout-header class="_fd-fn-list-head" style="height:40px;">
                            <span style="color:#2E73FF;">{{ t('event.list') }}</span>
                        </a-layout-header>
                        <a-layout-content>
                            <div class="_fd-menu">
                                <template v-for="(item, name) in event" :key="name">
                                    <div class="_fd-menu-item" @click.stop="edit(item)"
                                         :class="{'is-active':name === defActive}">
                                        <div class="_fd-fn-list-method">
                                            <span>function<span>{{ name }}</span></span>
                                            <span class="_fd-label" v-if="eventInfo[name]">{{ eventInfo[name] }}</span>
                                            <span class="_fd-dot" v-if="item.fn"></span>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </a-layout-content>
                    </a-layout>
                </a-layout-sider>
                <a-layout-content>
                    <a-layout class="_fd-fn-list-r">
                        <a-layout-header class="_fd-fn-list-head" style="height:40px;" v-if="activeData">
                            <a-button size="small" @click="close">{{ t('props.cancel') }}</a-button>
                            <a-button size="small" type="primary" @click="save" style="margin-left: 8px">{{
                                    t('props.save')
                                }}
                            </a-button>
                        </a-layout-header>
                        <a-layout-content v-if="activeData">
                            <FnEditor ref="fn" v-model="eventStr" :name="activeData.item.name"
                                      :args="activeData.item.args"/>
                        </a-layout-content>
                    </a-layout>
                </a-layout-content>
            </a-layout>
            <template #footer>
                <div>
                    <a-button @click="visible = false" size="middle">{{ t('props.cancel') }}</a-button>
                    <a-button type="primary" @click="submit" size="middle">{{ t('props.ok') }}</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>

<script>
import unique from '@form-create/utils/lib/unique';
import deepExtend from '@form-create/utils/lib/deepextend';
import {defineComponent} from 'vue';
import FnEditor from './FnEditor.vue';

const PREFIX = '[[FORM-CREATE-PREFIX-';
const SUFFIX = '-FORM-CREATE-SUFFIX]]';

export default defineComponent({
    name: 'FnConfig',
    emits: ['update:modelValue'],
    props: {
        modelValue: [Object, undefined, null],
        eventConfig: {
            type: Array,
            default: () => []
        },
    },
    inject: ['designer'],
    components: {
        FnEditor,
    },
    data() {
        return {
            visible: false,
            activeData: null,
            defActive: 'no',
            event: {},
            cus: false,
            eventStr: '',
        };
    },
    computed: {
        eventInfo() {
            const info = {};
            this.eventConfig.forEach(v => {
                info[v.name] = v.info;
            });
            return info;
        },
        t() {
            return this.designer.setupState.t;
        },
        eventNum() {
            let num = 0;
            Object.keys(this.modelValue || {}).forEach(k => {
                if (this.modelValue[k]) {
                    num++;
                }
            });
            return num;
        },
    },
    watch: {
        visible(v) {
            this.event = v ? this.loadFN(deepExtend({}, this.modelValue || {})) : {};
            if (!v) {
                this.destroy();
            }
        },
    },
    methods: {
        getArgs(item) {
            return item.args.join(', ');
        },
        loadFN(e) {
            const val = {};
            this.eventConfig.forEach(item => {
                const k = item.name;
                const fn = e[k] || '';
                val[k] = {
                    item, fn
                }
            });
            return val;
        },
        parseFN(e) {
            const on = {};
            Object.keys(e).forEach(k => {
                if (e[k].fn) {
                    on[k] = e[k].fn;
                }
            });
            return on;
        },
        edit(data) {
            data.key = unique();
            this.activeData = data;
            this.eventStr = data.fn || (PREFIX + `function ${data.item.name}(${this.getArgs(data.item)}){}` + SUFFIX);
            this.defActive = data.item.name;
        },
        save() {
            if (this.$refs.fn.save()) {
                this.activeData.fn = this.eventStr;
                this.destroy();
                return true;
            }
            return false;
        },
        destroy() {
            this.activeData = null;
            this.defActive = 'no';
        },
        close() {
            this.destroy();
        },
        submit() {
            if (this.activeData && !this.save()) {
                return;
            }
            this.$emit('update:modelValue', this.parseFN(this.event));
            this.visible = false;
            this.destroy();
        },
    }
});
</script>

<style>
._fd-fn-list, ._fd-fn-list .ant-badge {
    width: 100%;
}

._fd-fn-list .ant-btn {
    font-weight: 400;
    width: 100%;
    font-size: 12px;
}

._fd-fn-list-l, ._fd-fn-list-r {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    border: 1px solid #ECECEC;
}

._fd-fn-list-con ._fd-fn-list-head {
    display: flex;
    padding: 5px 15px;
    border-bottom: 1px solid #ECECEC;
    background: #ECECEC;
    align-items: center;
}

._fd-fn-list-con ._fd-fn-list-head > span {
    color: #2E73FF;
    line-height: 1em;
}

._fd-fn-list-con .ant-layout-content {
    display: flex;
    background: #FFFFFF;
    overflow: auto;
}

._fd-fn-list-head .ant-btn.ant-btn-link {
    padding: 0;
    color: #2E73FF;
}

._fd-fn-list-r {
    border-left: 0 none;
    background: #FFFFFF;
}

._fd-fn-list-r ._fd-fn-list-head {
    justify-content: flex-end;
}

._fd-fn-list-method {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px 20px 10px 0;
    font-size: 14px;
    line-height: 1em;
    font-family: monospace;
    width: 100%;
    overflow: hidden;
    white-space: pre-wrap;
    position: relative;
    box-sizing: border-box;
}

._fd-fn-list-method ._fd-label {
    margin-top: 4px;
    color: #AAAAAA;
    font-size: 12px;
}

._fd-fn-list-method ._fd-dot {
    position: absolute;
    top: 50%;
    margin-top: -3px;
    right: 0px;
    display: block;
    width: 6px;
    height: 6px;
    background: #00C050;
    border-radius: 15px;
}

._fd-fn-list-method-info > span:first-child, ._fd-fn-list-method > span:first-child {
    color: #9D238C;
}

._fd-fn-list-method-info > span:first-child > span, ._fd-fn-list-method > span:first-child > span {
    color: #262626;
    margin-left: 10px;
}

._fd-fn-list-con .CodeMirror {
    height: 100%;
    width: 100%;
}

._fd-fn-list-con .CodeMirror-wrap pre.CodeMirror-line {
    padding-left: 20px;
}
</style>
