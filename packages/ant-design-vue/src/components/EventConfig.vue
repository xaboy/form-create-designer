<template>
    <div class="_fd-event">
        <a-badge color="orange" :count="eventNum">
            <a-button class="_fd-plain-button" type="primary" size="small" ghost @click="visible=true">
                {{ t('event.title') }}
            </a-button>
        </a-badge>
        <a-modal class="_fd-event-dialog _fd-config-dialog" :title="t('event.title')" v-model:open="visible"
                 centered :maskClosable="false" :destroyOnClose="true"
                 width="1080px">
            <a-layout class="_fd-event-con" style="height: 600px">
                <a-layout-sider width="300px">
                    <a-layout class="_fd-event-l">
                        <a-layout-header class="_fd-event-head" style="height:40px;">
                            <a-dropdown trigger="click" size="default">
                                <a-button type="link" size="middle">
                                    {{ t('event.create') }}<i class="fc-icon icon-down" style="font-size: 14px;"></i>
                                </a-button>
                                <template #overlay>
                                    <a-menu>
                                        <a-menu-item v-for="name in eventList" :key="name" @click="add(name)"
                                                     :disabled="useEventKeys.indexOf(name) > -1">
                                            <div class="_fd-event-item">
                                                <span>{{ name }}</span>
                                                <span class="_fd-label" v-if="eventInfo[name]">
                                                    {{ eventInfo[name] }}
                                                </span>
                                            </div>
                                        </a-menu-item>
                                        <a-menu-divider v-if="eventList.length > 0"/>
                                        <template v-for="(hook) in hookList">
                                            <a-menu-item @click="add(hook)"
                                                         :disabled="useEventKeys.indexOf(hook) > -1">
                                                <div class="_fd-event-item">
                                                    <span>{{ hook }}</span>
                                                    <span class="_fd-label">
                                                    {{ eventInfo[hook] }}
                                                </span>
                                                </div>
                                            </a-menu-item>
                                        </template>
                                        <a-menu-divider v-if="eventList.length > 0"/>
                                        <a-menu-item @click="cusEvent">
                                            <div>{{ t('props.custom') }}</div>
                                        </a-menu-item>
                                    </a-menu>
                                </template>
                            </a-dropdown>
                        </a-layout-header>
                        <a-layout-content>
                            <div class="_fd-menu">
                                <template v-for="(item, idx) in event" :key="item.id">
                                    <div class="_fd-menu-item" :class="{'is-active': item.id === defActive }">
                                        <div class="_fd-event-title"
                                             @click.stop="edit(idx)">
                                            <div class="_fd-event-method">
                                                        <span>function<span>{{
                                                                item.name
                                                            }}</span></span>
                                                <span class="_fd-label"
                                                      v-if="eventInfo[item.name]">{{ eventInfo[item.name] }}</span>
                                            </div>
                                            <i class="fc-icon icon-delete-circle"
                                               @click.stop="rm(idx)"></i>
                                        </div>
                                    </div>
                                </template>
                                <div class="_fd-menu-item" v-if="cus" style="padding-left: 10px;">
                                    <div class="_fd-event-title">
                                        <a-input type="text" v-model:value="cusValue" size="default"
                                                 @keydown.enter="addCus"
                                                 :placeholder="t('event.placeholder')">
                                        </a-input>
                                        <div>
                                            <i class="fc-icon icon-add" @click.stop="addCus"></i>
                                            <i class="fc-icon icon-delete" @click.stop="closeCus"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a-layout-content>
                    </a-layout>
                </a-layout-sider>
                <a-layout-content>
                    <a-layout class="_fd-event-r">
                        <a-layout-header class="_fd-event-head" style="height:40px;"
                                         v-if="activeData">
                            <div>
                                <a target="_blank" href="https://form-create.com/v3/instance/">{{
                                        t('form.document')
                                    }}</a>
                            </div>
                            <div>
                                <a-button size="small" @click="close">{{ t('props.cancel') }}</a-button>
                                <a-button size="small" type="primary" @click="save" style="margin-left: 8px">{{
                                        t('props.save')
                                    }}
                                </a-button>
                            </div>
                        </a-layout-header>
                        <a-layout-content v-if="activeData">
                            <FnEditor ref="fn" v-model="eventStr" body :name="activeData.name"
                                      :args="fnArgs"/>
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
import {deepCopy} from '@form-create/utils/lib/deepextend';
import is from '@form-create/utils/lib/type';
import {defineComponent} from 'vue';
import FnEditor from './FnEditor.vue';
import {getInjectArg} from '../utils';

const $T = '$FNX:';

const isFNX = v => {
    return is.String(v) && v.indexOf($T) === 0;
};

export default defineComponent({
    name: 'EventConfig',
    emits: ['update:modelValue'],
    props: {
        modelValue: [Object, undefined, null],
        componentName: String,
        eventName: {
            type: Array,
            default: () => []
        }
    },
    inject: ['designer'],
    components: {
        FnEditor,
    },
    data() {
        return {
            visible: false,
            activeData: null,
            val: null,
            defActive: 'no',
            hookList: ['hook_load', 'hook_mounted', 'hook_deleted', 'hook_watch', 'hook_value', 'hook_hidden'],
            event: [],
            cus: false,
            cusValue: '',
            eventKey: '',
            eventStr: '',
            eventNum: 0,
            id: 0,
        };
    },
    computed: {
        useEventKeys() {
            const events = {};
            this.event.forEach(item => {
                events[item.name] = true;
            });
            return Object.keys(events);
        },
        t() {
            return this.designer.setupState.t;
        },
        activeRule() {
            return this.designer.setupState.activeRule;
        },
        orgEvent() {
            if (!this.eventName || !this.eventName.length) {
                return ['click'];
            }
            return this.eventName;
        },
        eventList() {
            return this.orgEvent.map(v => {
                return typeof v === 'object' ? v.name : v;
            })
        },
        eventInfo() {
            const info = {};
            this.orgEvent.forEach(v => {
                if (typeof v === 'object') {
                    info[v.name] = this.t('com.' + this.componentName + '.event.' + v.name) || v.info || this.t('eventInfo.' + v.name) || '';
                } else {
                    info[v] = this.t('com.' + this.componentName + '.event.' + v) || this.t('eventInfo.' + v) || '';
                }
            })
            this.hookList.forEach(v => {
                info[v] = this.t('eventInfo.' + v) || '';
            })
            return info;
        },
        fnArgs() {
            return [getInjectArg(this.t)];
        }
    },
    watch: {
        visible(v) {
            if (!v) {
                this.destroy();
                this.closeCus();
            } else {
                this.init();
            }
        },
    },
    methods: {
        addCus() {
            const val = this.cusValue && this.cusValue.trim();
            if (val) {
                this.closeCus();
                this.add(val);
            }
        },
        closeCus() {
            this.cus = false;
            this.cusValue = '';
        },
        cusEvent() {
            this.cus = true;
        },
        loadFnStr(v) {
            if (isFNX(v)) {
                return v.replace($T, '');
            } else if (is.Function(v)) {
                const json = v.__json || '';
                if (!json) {
                    return '' + v;
                } else if (isFNX(json)) {
                    return json.replace($T, '');
                } else {
                    return json;
                }
            } else if (v && v.indexOf('$GLOBAL:') === 0) {
                return v;
            }
        },
        init() {
            const hooks = this.activeRule ? {...this.activeRule.hook || {}} : {};
            const ons = {...deepCopy(this.modelValue || {})};
            Object.keys(hooks).forEach(k => {
                ons['hook_' + k] = hooks[k];
            })
            const event = [];
            Object.keys(ons).forEach(k => {
                const val = Array.isArray(ons[k]) ? ons[k] : [ons[k]];
                val.forEach(v => {
                    const item = {
                        name: k,
                        id: this.id++,
                    };
                    const fn = this.loadFnStr(v);
                    if (fn) {
                        item.handle = fn;
                    }
                    event.push(item);
                });
            });
            this.event = event;
            this.eventNum = event.length;
        },
        getValue() {
            const on = {};
            const hooks = {};
            let num = 0;

            this.event.forEach(item => {
                let flag = false;
                if (item.handle) {
                    flag = true;
                    let list = on;
                    const handle = item.handle.indexOf('$GLOBAL:') !== 0 ? ($T + item.handle) : item.handle;
                    if (item.name.indexOf('hook_') > -1) {
                        hooks[item.name.replace('hook_', '')] = handle;
                    } else {
                        if (!list[item.name]) {
                            list[item.name] = [];
                        }
                        list[item.name].push(handle);
                    }
                }
                if (flag) {
                    num++;
                }
            });

            Object.keys(on).forEach(k => {
                on[k] = on[k].length === 1 ? on[k][0] : on[k];
            });

            return {on, hooks, num};
        },
        add(name) {
            this.event.push({
                name,
                id: this.id++,
            })
            if (!this.activeData) {
                this.edit(this.event.length - 1);
            }
        },
        edit(idx) {
            if (this.defActive === this.event[idx].id) {
                return;
            }
            this.destroy();
            this.activeData = this.event[idx];
            this.val = this.activeData.handle || '';
            this.eventStr = this.val;
            this.eventKey = '';
            this.defActive = this.activeData.id;
        },
        rm(idx) {
            this.event.splice(idx, 1);
            if ((this.activeData && this.defActive === this.activeData.id)) {
                this.destroy();
            }
        },
        save() {
            return new Promise((resolve) => {
                if (this.activeData) {
                    let str = this.eventKey;
                    if (!this.$refs.fn.save()) {
                        return false;
                    }
                    str = this.eventStr;
                    this.activeData.handle = str;
                    this.destroy();
                    resolve();
                } else {
                    resolve();
                }
            });
        },
        destroy() {
            this.activeData = null;
            this.val = null;
            this.defActive = null;
        },
        close() {
            this.destroy();
        },
        submit() {
            this.save().then(() => {
                const {on, num, hooks} = this.getValue();
                this.$emit('update:modelValue', on);
                this.activeRule.hook = hooks;
                this.visible = false;
                this.eventNum = num;
            });
        },
    },
    beforeCreate() {
        window.$inject = {
            $f: {},
            rule: [],
            self: {},
            option: {},
            inject: {},
            args: [],
        };
    },
    created() {
        this.init();
    }
});
</script>

<style>

._fd-event .ant-btn {
    font-weight: 400;
    width: 100%;
    font-size: 12px;
}

._fd-event .ant-badge {
    width: 100%;
}

._fd-event-dialog .ant-layout-content, ._fd-event-dialog .ant-layout-sider {
    background: #FFFFFF;
    overflow: auto;
}

._fd-event-select {
    display: flex;
    align-items: center;
    margin-left: 15px;
    margin-top: 15px;
}

._fd-event-con ._fd-event-l, ._fd-event-con ._fd-event-r {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    border: 1px solid #ECECEC;
}

._fd-event-con ._fd-event-head {
    display: flex;
    padding: 5px 15px;
    border-bottom: 1px solid #ECECEC;
    background: #ECECEC;
    align-items: center;
}

._fd-event-r {
    display: flex;
    flex-direction: column;
    border-left: 0 none;
}

._fd-event-r ._fd-event-head {
    justify-content: space-between;
}

._fd-event-r > .ant-layout-content {
    display: flex;
    flex-direction: column;
}

._fd-event-r .ant-tabs-nav-wrap {
    padding: 0 15px;
}

._fd-event-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 250px;
    font-size: 14px;
    overflow: hidden;
    white-space: pre-wrap;
}

._fd-event-item ._fd-label {
    font-size: 12px;
    color: #AAAAAA;
}

._fd-event-method {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 225px;
    font-size: 14px;
    font-family: monospace;
    color: #9D238C;
    overflow: hidden;
    white-space: pre-wrap;
}

._fd-event-method ._fd-label {
    margin-top: 4px;
    color: #AAAAAA;
    font-size: 12px;
}

._fd-event-method > span:first-child, ._fd-fn-list-method > span:first-child {
    color: #9D238C;
}

._fd-event-method > span:first-child > span, ._fd-fn-list-method > span:first-child > span {
    color: #262626;
    margin-left: 10px;
}

._fd-event-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 12px 0;
    cursor: pointer;
}

._fd-event-title .fc-icon {
    margin-right: 6px;
    font-size: 18px;
    color: #666666;
}

._fd-event-title .ant-input {
    border: 0 none;
    box-shadow: none;
}

._fd-event-con .CodeMirror {
    height: 100%;
    width: 100%;
}

._fd-event-con .CodeMirror-wrap pre.CodeMirror-line {
    padding-left: 20px;
}

._fd-event-con .ant-form-item {
    margin-bottom: 18px;
}

._fd-event-con .ant-form-item ._fd-form-item-warning {
    font-weight: 400;
    font-size: 12px;
    color: #AAAAAA;
    line-height: 17px;
    margin-top: 6px;
}
</style>
