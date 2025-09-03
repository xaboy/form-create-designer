<template>
    <el-container class="_fc-designer" :style="height ? `height:${dragHeight};flex:0;` : ''" @dragenter="handleDragenter" @dragleave="handleDragleave" @drop="handleDrop">
        <el-main>
            <el-container style="height: 100%;" :key="locale && locale.name">
                <el-aside class="_fc-l-menu" v-show="!hiddenLeft" width="40px" v-if="false !== getConfig('showMenuBar')">
                    <el-tooltip
                        effect="dark"
                        :content="t('designer.comList')"
                        placement="right"
                        :hide-after="0"
                    >
                        <div class="_fc-l-menu-item" :class="{active: activeModule === 'base'}"
                             @click="activeModule = 'base'">
                            <i class="fc-icon icon-menu"></i>
                        </div>
                    </el-tooltip>
                    <el-tooltip
                        v-if="getConfig('showLanguage', true)"
                        effect="dark"
                        :content="t('language.name')"
                        placement="right"
                        :hide-after="0"
                    >
                        <div class="_fc-l-menu-item" :class="{active: activeModule === 'language'}"
                             @click="activeModule = 'language'">
                            <i class="fc-icon icon-language"></i>
                        </div>
                    </el-tooltip>
                    <el-tooltip
                        v-if="getConfig('showJsonPreview', true)"
                        effect="dark"
                        content="JSON"
                        placement="right"
                        :hide-after="0"
                    >
                        <div class="_fc-l-menu-item" :class="{active: activeModule === 'json'}"
                             @click="activeModule = 'json'">
                            <i class="fc-icon icon-script"></i>
                        </div>
                    </el-tooltip>
                </el-aside>
                <el-aside class="_fc-l" v-if="!hiddenLeft" :width="activeModule === 'language' ? '450px' : '266px'">
                    <div class="_fc-l-close" @click="hiddenLeft = true"><i class="fc-icon icon-arrow"></i></div>
                    <LanguageConfig v-if="activeModule === 'language'"></LanguageConfig>
                    <JsonPreview v-if="activeModule === 'json'"></JsonPreview>
                    <el-container style="height: 100%;" v-if="activeModule === 'base'">
                        <el-header height="40px" class="_fc-l-tabs">
                            <div class="_fc-l-tab" :class="{active: activeMenuTab==='menu'}"
                                 @click="activeMenuTab='menu'"> {{ t('menu.component') }}
                            </div>
                            <div class="_fc-l-tab" :class="{active: activeMenuTab==='tree'}"
                                 @click="activeMenuTab='tree'"> {{ t('menu.tree') }}
                            </div>
                        </el-header>
                        <el-main v-show="activeMenuTab === 'menu'">
                            <template v-for="(item, index) in menuList">
                                <div class="_fc-l-group" :key="index"
                                     v-if="hiddenMenu.indexOf(item.name) === -1">
                                    <h4 class="_fc-l-title" @click="item.hidden = !item.hidden">
                                        {{ t('menu.' + item.name) || item.title }}
                                        <i class="fc-icon icon-arrow" :class="{down: !item.hidden}"/>
                                    </h4>
                                    <fcDraggable :group="{name:'default', pull:'clone', put:false}" :sort="false"
                                               itemKey="name"
                                               class="_fc-l-list"
                                               :list="item.list" v-show="!item.hidden">
                                        <template #item="{element}">
                                            <div class="_fc-l-item" v-if="hiddenItem.indexOf(element.name) === -1"
                                                 @click="clickMenu(element)">
                                                <div class="_fc-l-icon">
                                                    <i class="fc-icon" :class="element.icon || 'icon-input'"></i>
                                                </div>
                                                <span class="_fc-l-name">{{
                                                        t('com.' + element.name + '.name') || element.label
                                                    }}</span>
                                            </div>
                                        </template>
                                    </fcDraggable>
                                </div>
                            </template>
                        </el-main>
                        <el-main v-if="activeMenuTab === 'tree'">
                            <el-tree
                                ref="treeRef"
                                :data="treeInfo"
                                default-expand-all
                                :expand-on-click-node="false"
                                @currentChange="treeChange"
                            >
                                <template #default="{ node, data }">
                                    <div class="_fc-tree-node" :class="{active: activeRule === data.rule}">
                                        <div class="_fc-tree-label">
                                            <i class="fc-icon"
                                               :class="(data.rule._menu && data.rule._menu.icon) || 'icon-cell'"></i>
                                            <span>{{
                                                    (data.rule?.__fc__?.refRule?.__$title?.value || data.rule.title || '').trim() || (data.rule.props && data.rule.props.label) || t('com.' + (data.rule._menu && data.rule._menu.name) + '.name') || (data.rule._menu && data.rule._menu.label) || data.rule.type
                                                }}</span>
                                        </div>
                                        <div class="_fc-tree-more" @click.stop v-if="!data.slot">
                                            <el-dropdown trigger="click" size="default">
                                                <i class="fc-icon icon-more"></i>
                                                <template #dropdown>
                                                    <el-dropdown-menu>
                                                        <el-dropdown-item v-if="data.rule._fc_drag_tag !== '_'" key="1"
                                                                          @click="toolHandle(data.rule ,'copy')">
                                                            {{ t('props.copy') }}
                                                        </el-dropdown-item>
                                                        <el-dropdown-item
                                                            v-if="data.rule._menu && data.rule._menu.children && data.rule._fc_drag_tag !== '_'"
                                                            key="2"
                                                            @click="toolHandle(data.rule, 'addChild')">
                                                            {{ t('form.appendChild') }}
                                                        </el-dropdown-item>
                                                        <el-dropdown-item key="3"
                                                                          @click="toolHandle(data.rule, 'delete')">
                                                            {{ t('props.delete') }}
                                                        </el-dropdown-item>
                                                    </el-dropdown-menu>
                                                </template>
                                            </el-dropdown>
                                        </div>
                                    </div>
                                </template>
                            </el-tree>
                        </el-main>
                    </el-container>
                </el-aside>
                <el-container class="_fc-m">
                    <el-header class="_fc-m-tools" height="45">
                        <div class="_fc-m-tools-l">
                            <template v-if="!inputForm.state">
                                <template v-if="getConfig('showDevice') !== false">
                                    <div class="devices">
                                        <i class="fc-icon icon-pc" :class="{active: device === 'pc'}"
                                           @click="setDevice('pc')"></i>
                                        <i class="fc-icon icon-pad" :class="{active: device === 'pad'}"
                                           @click="setDevice('pad')"></i>
                                        <i class="fc-icon icon-mobile" :class="{active: device === 'mobile'}"
                                           @click="setDevice('mobile')"></i>
                                    </div>
                                    <div class="line"></div>
                                </template>
                                <div>
                                    <i class="fc-icon icon-pre-step"
                                       :class="{disabled: !operation.list[operation.idx - 1]}"
                                       @click="prevOperationRecord"></i>
                                    <i class="fc-icon icon-next-step"
                                       :class="{disabled: !operation.list[operation.idx + 1]}"
                                       @click="nextOperationRecord"></i>
                                </div>
                            </template>
                        </div>
                        <div class="_fc-m-tools-r">
                            <template v-if="!inputForm.state">
                                <slot name="handle"></slot>
                                <el-button v-if="getConfig('showSaveBtn', false)" type="success" plain size="small"
                                           @click="handleSave"><i class="fc-icon icon-save-online"></i> {{
                                        t('props.save')
                                    }}
                                </el-button>
                                <el-button v-if="false !== getConfig('showPreviewBtn')" type="primary" plain size="small"
                                           @click="openPreview"><i class="fc-icon icon-preview"></i> {{
                                        t('props.preview')
                                    }}
                                </el-button>
                                <el-popconfirm
                                    :title="t('designer.clearWarn')"
                                    width="200px"
                                    :confirm-button-text="t('props.clear')"
                                    :cancel-button-text="t('props.cancel')"
                                    @confirm="clearDragRule">
                                    <template #reference>
                                        <el-button type="danger" plain size="small"><i
                                            class="fc-icon icon-delete"></i>{{ t('props.clear') }}
                                        </el-button>
                                    </template>
                                </el-popconfirm>
                                <el-dropdown trigger="click" size="default" v-if="handle && handle.length">
                                    <el-button class="_fd-m-extend" plain size="small">
                                        <i class="fc-icon icon-more"></i>
                                    </el-button>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item v-for="item in handle" @click.stop="triggerHandle(item)">
                                                <div>{{ item.label }}</div>
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>

                            </template>
                            <template v-if="getConfig('showInputData', true)">
                                <div class="line"></div>
                                <div class="_fd-input-btn">
                                    <el-switch size="default" :model-value="inputForm.state" inline-prompt @update:model-value="openInputData">
                                        <template #active-action>
                                            <i class="fc-icon icon-edit2" style="font-size: 12px;color:#fff;"></i>
                                        </template>
                                        <template #inactive-action>
                                            <i class="fc-icon icon-edit2" style="font-size: 12px;color:#333;"></i>
                                        </template>
                                    </el-switch>
                                </div>
                            </template>
                        </div>
                    </el-header>
                    <el-main class="_fc-m-con">
                        <a :key="activeRule ? activeRule._fc_id : ''" style="background-image: url(data:image/png;base64,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) !important;background-repeat: no-repeat !important;background-size: cover !important;background-position: center !important;position: absolute !important;overflow: hidden !important;left: 50% !important;width: 160px!important;right: 0 !important;top: auto !important;bottom: 9px !important;display: block !important;height: 17px !important;text-align: center !important;opacity: 1 !important;visibility: visible !important;margin: 0 0 0 -80px !important;padding: 0 !important;" target="_blank" href="https://form-create.com/"></a>
                        <div class="_fc-m-drag" :class="device"
                             ref="dragCon"
                             :style="{'--fc-drag-empty': `'${t('designer.dragEmpty')}'`,'--fc-child-empty': `'${t('designer.childEmpty')}'`}">
                            <div class="_fc-m-input" v-if="inputForm.state">
                                <ViewForm :key="inputForm.key" :rule="inputForm.rule" :option="inputForm.option"
                                          :locale="locale?.name"
                                          v-model:api="inputForm.api" :disabled="false"></ViewForm>
                            </div>
                            <DragForm v-else :rule="dragForm.rule" :option="formOptions"
                                      :locale="locale?.name"
                                      v-model:api="dragForm.api"></DragForm>
                        </div>
                        <div class="_fc-m-input-handle" v-if="inputForm.state">
                            <el-button plain @click="inputClear()">{{ t('props.clear') }}</el-button>
                            <el-button plain @click="inputReset()">{{ t('props.reset') }}</el-button>
                            <el-button type="primary" plain @click="inputSave()">{{ t('props.save') }}</el-button>
                        </div>
                    </el-main>
                </el-container>
                <el-aside class="_fc-r" width="320px" v-show="!hiddenRight" v-if="!config || config.showConfig !== false">
                    <div class="_fc-r-close" @click="hiddenRight = true"><i class="fc-icon icon-arrow"></i></div>
                    <el-container style="height: 100%;">
                        <el-header height="40px" class="_fc-r-tabs">
                            <div class="_fc-r-tab" :class="{active: activeTab==='props'}"
                                 v-if="!!activeRule || customForm.isShow || (config && config.showFormConfig === false)"
                                 @click="activeTab='props'"> {{ t('designer.component') }}
                            </div>
                            <div class="_fc-r-tab" v-if="!config || config.showFormConfig !== false"
                                 :class="{active: activeTab==='form' && (!!activeRule || customForm.isShow)}"
                                 @click="activeTab='form'">{{ t('designer.form') }}
                            </div>
                        </el-header>
                        <el-main class="_fc-r-tab-form" v-show="activeTab==='form'"
                                 v-if="!config || config.showFormConfig !== false">
                            <DragForm :rule="form.rule" :option="form.option"
                                      :modelValue="form.value" @change="formOptChange"
                                      v-model:api="form.api"  @mounted="formMounted">
                                <template #title="scope">
                                    <template v-if="scope.rule.warning">
                                        <Warning :tooltip="scope.rule.warning">
                                            {{ scope.rule.title }}
                                        </Warning>
                                    </template>
                                    <template v-else>
                                        {{scope.rule.title}}
                                    </template>
                                </template>
                            </DragForm>
                        </el-main>
                        <el-main class="_fc-r-tab-props" v-show="activeTab==='props'"
                                 :key="activeRule ? activeRule._fc_id: (customForm.config ? customForm.key : '')">
                            <div class="_fc-r-tools-close" @click="clearActiveRule">
                                <i class="fc-icon icon-add2"></i>
                            </div>
                            <template
                                v-if="activeRule || (customForm.config && (customForm.config.name || customForm.config.label))">
                                <p class="_fc-r-title">{{ t('designer.type') }}</p>
                                <TypeSelect :disabled="activePermission.switchType === false"></TypeSelect>
                                <template
                                    v-if="activePermission.name !== false && (activeRule && activeRule.name && config.showComponentName !== false)">
                                    <p class="_fc-r-title">
                                        <Warning :tooltip="t('warning.name')">
                                            {{ t('designer.name') }}
                                        </Warning>
                                    </p>
                                    <el-input size="small" class="_fc-r-name-input"
                                              v-model.trim="activeRule.name"
                                              :readonly="getConfig('nameReadonly') !== false">
                                        <template #suffix>
                                            <i class="fc-icon icon-group" @click="copyName"></i>
                                        </template>
                                        <template #append>
                                            <i class="fc-icon icon-auto" @click="updateName"></i>
                                        </template>
                                    </el-input>
                                </template>
                            </template>
                            <div class="_fc-r-config" :style="{'grid-template-areas': configFormOrderStyle}">
                                <div style="grid-area: base;">
                                    <el-divider v-if="baseForm.isShow">{{ t('designer.rule') }}</el-divider>
                                    <DragForm v-show="baseForm.isShow" v-model:api="baseForm.api"
                                              :rule="baseForm.rule"
                                              :option="baseForm.options"
                                              :modelValue="baseForm.value"
                                              @change="baseChange">
                                        <template #title="scope">
                                            <template v-if="scope.rule.warning">
                                                <Warning :tooltip="scope.rule.warning">
                                                    {{ scope.rule.title }}
                                                </Warning>
                                            </template>
                                            <template v-else>
                                                {{scope.rule.title}}
                                            </template>
                                        </template>
                                    </DragForm>
                                </div>
                                <div style="grid-area: props;">
                                    <el-divider v-if="propsForm.isShow">{{ t('designer.props') }}
                                        <PropsInput
                                            v-if="activeRule && getConfig('showCustomProps', true)"></PropsInput>
                                    </el-divider>
                                    <DragForm v-show="propsForm.isShow" v-model:api="propsForm.api"
                                              :rule="propsForm.rule"
                                              :option="propsForm.options"
                                              :modelValue="propsForm.value"
                                              @change="propChange" @removeField="propRemoveField">
                                        <template #title="scope">
                                            <template v-if="scope.rule.warning">
                                                <Warning :tooltip="scope.rule.warning">
                                                    {{ scope.rule.title }}
                                                </Warning>
                                            </template>
                                            <template v-else>
                                                {{scope.rule.title}}
                                            </template>
                                        </template>
                                    </DragForm>
                                    <el-divider v-if="customForm.isShow && customForm.propsShow">
                                        {{ t('designer.props') }}
                                    </el-divider>
                                    <DragForm v-if="customForm.isShow && customForm.propsShow"
                                              v-model:api="customForm.api"
                                              :rule="customForm.rule"
                                              :option="customForm.options" :key="customForm.key"
                                              @change="customFormChange"></DragForm>
                                </div>
                                <div style="grid-area: style;">
                                    <el-divider v-if="styleForm.isShow" id="_fd-config-style">{{
                                            t('designer.style')
                                        }}
                                    </el-divider>
                                    <DragForm v-show="styleForm.isShow" :rule="styleForm.rule"
                                              :option="styleForm.options"
                                              :modelValue="styleForm.value"
                                              @change="styleChange" v-model:api="styleForm.api"></DragForm>
                                </div>
                                <div style="grid-area: event;">
                                    <el-divider
                                        v-if="eventShow">
                                        {{ t('designer.event') }}
                                    </el-divider>
                                    <EventConfig
                                        v-if="eventShow"
                                        :event-name="(activeRule && activeRule._menu.event) || []"
                                        :component-name="(activeRule && activeRule._menu.name) || ''"
                                        :model-value="(activeRule && activeRule._on) || {}"
                                        @update:modelValue="changeEvent"></EventConfig>
                                </div>
                                <div v-if="activeRule" style="grid-area: validate;">
                                    <el-divider v-if="validateForm.isShow">{{
                                            t('designer.validate')
                                        }}
                                    </el-divider>
                                    <DragForm v-if="validateForm.isShow" v-model:api="validateForm.api"
                                              :rule="validateForm.rule"
                                              :option="validateForm.options"
                                              :modelValue="validateForm.value"
                                              @change="validateChange"
                                              :key="activeRule._fc_id"></DragForm>
                                </div>
                            </div>
                        </el-main>
                    </el-container>
                </el-aside>
                <div class="_fc-l-open" v-if="hiddenLeft" @click="hiddenLeft = false"><i class="fc-icon icon-arrow"></i></div>
                <div class="_fc-r-open" v-if="hiddenRight" @click="hiddenRight = false"><i class="fc-icon icon-arrow"></i></div>
                <el-dialog v-model="preview.state" width="80%" class="_fd-preview-dialog" append-to-body>
                    <el-tabs class="_fd-preview-tabs" v-model="previewStatus">
                        <el-tab-pane :label="t('form.formMode')" name="form"></el-tab-pane>
                        <el-tab-pane :label="t('form.componentMode')" name="component"></el-tab-pane>
                        <el-tab-pane :label="t('form.htmlMode')" name="html"></el-tab-pane>
                    </el-tabs>
                    <div class="_fd-preview-copy" v-if="['component', 'html'].indexOf(previewStatus) > -1"
                         @click="copyCode">
                        <i class="fc-icon icon-copy"></i>
                    </div>
                    <template v-if="previewStatus === 'form'">
                        <ViewForm :rule="preview.rule" :option="preview.option" v-model:api="preview.api"
                                  @submit="previewSubmit"
                                  @reset="previewReset"
                                  :locale="locale?.name"
                                  v-if="preview.state">
                            <template v-for="(_, name) in $slots" #[name]="scope">
                                <slot :name="name" v-bind="scope ?? {}"/>
                            </template>
                        </ViewForm>
                    </template>
                    <pre class="_fd-preview-code" ref="previewCode" v-else-if="previewStatus === 'component'"><code v-html="preview.component"></code></pre>
                    <pre class="_fd-preview-code" ref="previewCode" v-else><code v-html="preview.html"></code></pre>
                </el-dialog>
            </el-container>
        </el-main>
    </el-container>
</template>

<style>

</style>

<script>
import form from '../config/base/form';
import field from '../config/base/field';
import style from '../config/base/style';
import validate from '../config/base/validate';
import {deepCopy} from '@form-create/utils/lib/deepextend';
import is, {hasProperty} from '@form-create/utils/lib/type';
import {lower} from '@form-create/utils/lib/tocase';
import toArray from '@form-create/utils/lib/toarray';
import Mitt from '@form-create/utils/lib/mitt';
import ruleList, {defaultDrag} from '../config';
import fcDraggable from 'vuedraggable/src/vuedraggable';
import menus from '../config/menu';
import {
    copyTextToClipboard,
    formTemplate,
    formTemplateV3,
    getFormRuleDescription,
    getRuleDescription,
    getRuleTree,
    htmlTemplate,
    isNull,
    uniqueArray,
    upper,
    useLocale,
} from '../utils/index';
import viewForm, {designerForm} from '../utils/form';
import {t as globalT} from '../utils/locale';
import EventConfig from './EventConfig.vue';
import {
    computed,
    defineComponent,
    getCurrentInstance,
    markRaw,
    nextTick,
    provide,
    reactive,
    ref,
    toRef,
    toRefs,
    watch
} from 'vue';
import uniqueId from '@form-create/utils/lib/unique';
import debounce from '@form-create/utils/lib/debounce';
import errorMessage from '../utils/message';
import hljs from '../utils/highlight/highlight.min';
import xml from '../utils/highlight/xml.min';
import javascript from '../utils/highlight/javascript.min';
import TypeSelect from './TypeSelect.vue';
import PropsInput from './PropsInput.vue';
import LanguageConfig from './language/LanguageConfig.vue';
import JsonPreview from './JsonPreview.vue';
import Warning from './Warning.vue';
import mergeProps from '@form-create/utils/lib/mergeprops';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);

export default defineComponent({
    name: 'FcDesigner',
    components: {
        Warning,
        JsonPreview,
        LanguageConfig,
        PropsInput,
        TypeSelect,
        fcDraggable,
        DragForm: designerForm.$form(),
        ViewForm: viewForm.$form(),
        EventConfig,
    },
    props: {
        menu: Array,
        height: [String, Number],
        config: {
            type: Object,
            default: () => ({})
        },
        mask: {
            type: Boolean,
            default: undefined,
        },
        locale: Object,
        handle: Array
    },
    emits: ['active', 'create', 'copy', 'delete', 'drag', 'inputData', 'save', 'clear', 'copyRule', 'pasteRule', 'sortUp', 'sortDown', 'changeDevice', 'previewSubmit', 'previewReset', 'changeField'],
    setup(props) {
        const {menu, height, mask, locale, handle} = toRefs(props);
        const vm = getCurrentInstance();
        const fcx = reactive({active: null});
        provide('fcx', fcx);
        provide('designer', vm);

        const configRef = toRef(props, 'config', {});
        const baseRule = toRef(configRef.value, 'baseRule', null);
        const componentRule = toRef(configRef.value, 'componentRule', {});
        const validateRule = toRef(configRef.value, 'validateRule', null);
        const formRule = toRef(configRef.value, 'formRule', null);
        const updateDefaultRule = toRef(configRef.value, 'updateDefaultRule', {});

        const dragHeight = computed(() => {
            const h = height.value;
            if (!h) return '100%';
            return is.Number(h) ? `${h}px` : h;
        })
        const fieldReadonly = computed(() => {
            return configRef.value.fieldReadonly !== false;
        })
        const hiddenMenu = computed(() => {
            return configRef.value.hiddenMenu || [];
        });
        const hiddenItem = computed(() => {
            return configRef.value.hiddenItem || [];
        });
        const hiddenDragMenu = computed(() => {
            return configRef.value.hiddenDragMenu === true;
        });
        const hiddenDragBtn = computed(() => {
            return configRef.value.hiddenDragBtn === true;
        });
        const configFormOrderStyle = computed(() => {
            const def = ['base', 'props', 'style', 'event', 'validate'];
            let sort = configRef.value.configFormOrder ? [...configRef.value.configFormOrder] : [];
            let value = [];
            if (!sort.length) {
                value = def;
            } else {
                [...sort, ...def].forEach(v => {
                    if (value.indexOf(v) === -1 && def.indexOf(v) > -1) {
                        value.push(v);
                    }
                });
            }
            return value.map(v => {
                return `"${v}"`;
            }).join(' ');
        });
        let _t = globalT;
        if (locale.value) {
            _t = useLocale(locale).t
        }
        const t = (...args) => _t(...args);

        const tidyRuleConfig = (orgRule, configRule, ...args) => {
            if (configRule) {
                if (is.Function(configRule)) {
                    return configRule(...args);
                }
                if (configRule.rule) {
                    let rule = configRule.rule(...args);
                    if (configRule.prepend) {
                        rule = [...rule, ...orgRule(...args)];
                    } else if (configRule.append) {
                        rule = [...orgRule(...args), ...rule];
                    }
                    return rule;
                }
            }
            return orgRule(...args);
        }

        const defaultMenus = ref(deepCopy(menus));

        const data = reactive({
            cacheProps: {},
            operation: {
                idx: -1,
                list: []
            },
            hiddenLeft: false,
            hiddenRight: false,
            moveRule: null,
            addRule: null,
            added: null,
            bus: Mitt(),
            device: configRef.value?.device || 'pc',
            activeModule: 'base',
            activeTab: 'form',
            activeMenuTab: 'menu',
            activeRule: null,
            activePermission: {},
            children: ref([]),
            treeInfo: [],
            dragRuleList: {},
            eventShow: false,
            unloadStatus: false,
            previewStatus: 'form',
            t,
            preview: {
                state: false,
                rule: [],
                option: {},
                api: {},
            },
            inputForm: {
                state: false,
                rule: [],
                option: {},
                api: {},
                data: {},
                key: '',
            },
            dragForm: ref({
                rule: [],
                api: {},
            }),
            formOptions: {},
            oldOptionsKeys: [],
            form: {
                rule: tidyRuleConfig(form, formRule.value, {t}),
                api: {},
                option: {
                    global: {
                        input: configRef.value?.updateConfigOnBlur !== false ? {
                            modelEmit:  'blur'
                        } : {},
                        select: {
                            props: {
                                clearable: true,
                            }
                        }
                    },
                    form: {
                        labelPosition: 'top',
                        size: 'small'
                    },
                    submitBtn: false
                },
                value: {
                    form: {},
                    submitBtn: false
                }
            },
            baseForm: {
                isShow: false,
                rule: tidyRuleConfig(field, baseRule.value, {t}),
                api: {},
                value: {},
                options: {
                    global: {
                        input: configRef.value?.updateConfigOnBlur !== false ? {
                            modelEmit:  'blur'
                        } : {},
                    },
                    form: {
                        labelPosition: 'top',
                        size: 'small'
                    },
                    submitBtn: false,
                    mounted: (fapi) => {
                        fapi.activeRule = data.activeRule;
                        fapi.setValue(fapi.options.formData || {});
                    }
                }
            },
            styleForm: {
                isShow: false,
                rule: style({t}),
                api: {},
                value: {},
                options: {
                    form: {
                        labelPosition: 'left',
                        size: 'small',
                    },
                    submitBtn: false,
                    mounted: (fapi) => {
                        fapi.activeRule = data.activeRule;
                        fapi.setValue(fapi.options.formData || {});
                    }
                }
            },
            validateForm: {
                isShow: false,
                rule: tidyRuleConfig(validate, validateRule.value, {t}),
                api: {},
                value: [],
                options: {
                    global: {
                        input: configRef.value?.updateConfigOnBlur !== false ? {
                            modelEmit:  'blur'
                        } : {},
                    },
                    form: {
                        labelPosition: 'top',
                        size: 'small'
                    },
                    submitBtn: false,
                    mounted: (fapi) => {
                        fapi.activeRule = data.activeRule;
                        fapi.setValue(fapi.options.formData || {});
                    }
                }
            },
            propsForm: {
                isShow: false,
                rule: [],
                api: {},
                value: {},
                options: {
                    global: {
                        input: configRef.value?.updateConfigOnBlur !== false ? {
                            modelEmit:  'blur'
                        } : {},
                        inputNumber: {
                            props: {
                                controlsPosition: 'right'
                            }
                        }
                    },
                    form: {
                        labelPosition: 'top',
                        size: 'small'
                    },
                    submitBtn: false,
                    mounted: (fapi) => {
                        fapi.activeRule = data.activeRule;
                        fapi.setValue(fapi.options.formData || {});
                    }
                }
            },
            customForm: {
                isShow: false,
                config: null,
                key: '',
                rule: [],
                api: {},
                options: {
                    global: {
                        input: configRef.value?.updateConfigOnBlur !== false ? {
                            modelEmit:  'blur'
                        } : {},
                    },
                    form: {
                        labelPosition: 'top',
                        size: 'small'
                    },
                    submitBtn: false,
                }
            },
        });

        watch(() => data.preview.state, function (n) {
            if (!n) {
                nextTick(() => {
                    data.previewStatus = 'form';
                    data.preview.rule = data.preview.option = null;
                });
            }
        })

        let unWatchActiveRule = null;

        const propFieldDeepFn = (field, call) => {
            if (field[10] !== '>') {
                field = field.replace('formCreate', '');
                if (!field) return;
                field = lower(field);
            } else {
                field = field.replace('formCreate>', '');
            }
            const split = field.split('>');
            const lastField = split.pop();
            let source = data.activeRule;
            split.forEach((id, idx) => {
                if (!idx) {
                    id = lower(id);
                }
                if (!source[id]) {
                    source[id] = {};
                }
                source = source[id];
            });
            call({source, field: lastField});
        }

        watch(() => locale.value, (n) => {
            _t = n ? useLocale(locale).t : globalT;
            methods.clearActiveRule();
            const formVal = data.form.api.formData && data.form.api.formData();
            const baseFormVal = data.baseForm.api.formData && data.baseForm.api.formData();
            const validateFormVal = data.validateForm.api.formData && data.validateForm.api.formData();
            data.validateForm.rule = tidyRuleConfig(validate, validateRule.value, {t});
            data.baseForm.rule = tidyRuleConfig(field, baseRule.value, {t});
            data.form.rule = tidyRuleConfig(form, formRule.value, {t});
            data.cacheProps = {};
            const rule = data.activeRule;
            let propsVal = null;
            if (rule) {
                propsVal = data.propsForm.api.formData && data.propsForm.api.formData();
                data.propsForm.rule = data.cacheProps[rule._fc_id] = methods.getPropsRule(rule);
            }
            nextTick(() => {
                formVal && data.form.api.setValue(formVal);
                baseFormVal && data.baseForm.api.setValue(baseFormVal);
                validateFormVal && data.validateForm.api.setValue(validateFormVal);
                propsVal && data.propsForm.api.setValue(propsVal);
            });
        });

        const menuList = computed(() => {
            return Array.isArray(menu.value) ? menu.value : defaultMenus.value;
        });

        const methods = {
            setDevice(device) {
                data.device = device;
                vm.emit('changeDevice', device);
            },
            unWatchActiveRule() {
                unWatchActiveRule && unWatchActiveRule();
                unWatchActiveRule = null;
            },
            watchActiveRule() {
                methods.unWatchActiveRule();
                unWatchActiveRule = watch(() => data.activeRule, function (n) {
                    n && methods.updateRuleFormData()
                }, {deep: true, flush: 'post'});
            },
            makeChildren(children) {
                return reactive({children}).children;
            },
            addMenu(config) {
                if (!config.name) return;
                if (!config.list) {
                    config.list = [];
                }
                let flag = true;
                menuList.value.forEach((v, i) => {
                    if (v.name === config.name) {
                        menuList.value[i] = config
                        flag = false;
                    }
                });
                if (flag) {
                    if (config.before) {
                        menuList.value.unshift(config);
                    } else {
                        menuList.value.push(config);
                    }
                }
            },
            removeMenu(name) {
                [...menuList.value].forEach((v, i) => {
                    if (v.name === name) {
                        menuList.value.splice(i, 1);
                    }
                });
            },
            setMenuItem(name, list) {
                menuList.value.forEach(v => {
                    if (v.name === name) {
                        v.list = list;
                    }
                });
            },
            appendMenuItem(name, item) {
                menuList.value.forEach(v => {
                    if (v.name === name) {
                        if (!v.list) {
                            v.list = [];
                        }
                        v.list.push(...(Array.isArray(item) ? item : [item]));
                    }
                });
            },
            removeMenuItem(item) {
                menuList.value.forEach(v => {
                    let idx;
                    if (is.String(item)) {
                        [...v.list].forEach((menu, idx) => {
                            if (menu.name === item) {
                                v.list.splice(idx, 1);
                            }
                        });
                    } else {
                        if ((idx = v.list.indexOf(item)) > -1) {
                            v.list.splice(idx, 1);
                        }
                    }
                });
            },
            addComponent(component) {
                if (Array.isArray(component)) {
                    component.forEach(v => {
                        data.dragRuleList[v.name] = v;
                        v.menu && methods.appendMenuItem(v.menu, v);
                    });
                } else {
                    data.dragRuleList[component.name] = component;
                    component.menu && methods.appendMenuItem(component.menu, component);
                }
            },
            openInputData(state) {
                data.inputForm.state = state === undefined ? !data.inputForm.state : !!state;
                if (data.inputForm.state) {
                    data.inputForm.rule = designerForm.parseJson(methods.getJson());
                    data.inputForm.option = designerForm.parseJson(methods.getOptionsJson());
                    data.inputForm.option.formData = deepCopy(data.inputForm.data);
                    data.inputForm.option.appendValue = false;
                    data.inputForm.option.submitBtn.show = false;
                    data.inputForm.option.resetBtn.show = false;
                    methods.clearActiveRule();
                }
            },
            inputSave() {
                const formData = data.inputForm.api.formData();
                Object.keys(formData).forEach(k => {
                    if (isNull(formData[k])) {
                        delete formData[k];
                    }
                });
                const flag = JSON.stringify(data.inputForm.data) !== JSON.stringify(formData);
                data.inputForm.data = formData;
                data.inputForm.state = false;
                vm.emit('inputData', formData);
                flag && methods.addOperationRecord();
            },
            inputClear() {
                methods.inputReset({});
            },
            inputReset(formData) {
                data.inputForm.rule = designerForm.parseJson(methods.getJson());
                data.inputForm.option.formData = formData || deepCopy(data.inputForm.data);
                data.inputForm.key = uniqueId();
            },
            setFormData(formData) {
                data.inputForm.data = formData || {};
            },
            getFormData() {
                return data.inputForm.data;
            },
            getParent(rule) {
                let parent = rule.__fc__.parent.rule;
                const config = parent._menu;
                if (config && config.inside) {
                    rule = parent;
                    parent = parent.__fc__.parent.rule;
                }
                return {root: parent, parent: rule};
            },
            copyName() {
                copyTextToClipboard(data.activeRule.name);
            },
            updateName() {
                data.activeRule.name = 'ref_' + uniqueId();
            },
            makeDrag(group, tag, children, on, slot) {
                return {
                    type: 'DragBox',
                    wrap: {
                        show: false
                    },
                    col: {
                        show: false
                    },
                    inject: true,
                    props: {
                        rule: {
                            props: {
                                tag: 'el-col',
                                group: {
                                    name: group === true ? 'default' : group,
                                    put(...args) {
                                        return methods.dragPut(...args);
                                    }
                                },
                                swapThreshold: tag === 'draggable' ? 0.25 : 0.8,
                                ghostClass: 'ghost',
                                animation: 150,
                                handle: '._fd-drag-btn',
                                emptyInsertThreshold: 0,
                                direction: 'auto',
                                itemKey: '_fc_id',
                            }
                        },
                        tag,
                    },
                    children,
                    slot,
                    on
                };
            },
            clearDragRule() {
                methods.setRule([]);
                methods.addOperationRecord();
                data.unloadStatus = false;
                vm.emit('clear');
            },
            makeDragRule(children) {
                return methods.makeChildren([methods.makeDrag(true, 'draggable', children, {
                    add: (inject, evt) => methods.dragAdd(children, evt),
                    end: (inject, evt) => methods.dragEnd(children, evt),
                    start: (inject, evt) => methods.dragStart(children, evt),
                    unchoose: (inject, evt) => methods.dragUnchoose(children, evt),
                })]);
            },
            handleSave() {
                vm.emit('save', {
                    rule: methods.getJson(),
                    options: methods.getOptionsJson(),
                });
            },
            previewSubmit(...args) {
                vm.emit('previewSubmit', ...args);
            },
            previewReset(...args) {
                vm.emit('previewReset', ...args);
            },
            openPreview() {
                data.preview.state = true;
                const rule = methods.getJson();
                const options = methods.getOptionsJson();
                data.preview.rule = designerForm.parseJson(rule);
                data.preview.option = designerForm.parseJson(options);
                const useV2 = methods.getConfig('useTemplate', false);
                data.preview.component = hljs.highlight(
                    useV2 ? formTemplate(rule, options) : formTemplateV3(rule, options),
                    {language: 'xml'}
                ).value
                data.preview.html = hljs.highlight(
                    htmlTemplate(rule, options),
                    {language: 'xml'}
                ).value
            },
            copyCode() {
                copyTextToClipboard(this.$refs.previewCode.innerText);
            },
            getHtml() {
                return htmlTemplate(methods.getJson(), methods.getOptionsJson());
            },
            getRule() {
                return methods.parseRule(deepCopy(data.dragForm.rule[0].children));
            },
            getJson() {
                return designerForm.toJson(methods.getRule());
            },
            getOption() {
                const options = deepCopy(data.formOptions);
                ['onReset', 'onSubmit', 'beforeSubmit', 'onCreated', 'onMounted', 'onReload', 'onChange', 'beforeFetch'].forEach(key => {
                    delete options[key];
                });
                Object.keys(options._event || {}).forEach(k => {
                    if (options._event[k]) {
                        options[k] = options._event[k];
                    }
                });
                delete options._event;
                options.submitBtn = options._submitBtn;
                options.resetBtn = options._resetBtn;
                options.resetBtn.innerText = t('props.reset');
                options.submitBtn.innerText = t('props.submit');
                const formData = deepCopy(data.inputForm.data);
                if (Object.keys(formData).length > 0) {
                    options.formData = formData;
                }
                if (options.language) {
                    Object.keys(options.language).forEach(k => {
                        Object.keys(options.language[k]).forEach(id => {
                            if (!options.language[k][id]) {
                                delete options.language[k][id];
                            }
                        })
                        if (!Object.keys(options.language[k]).length) {
                            delete options.language[k];
                        }
                    })
                }
                Object.keys(options).forEach(k => {
                    if (is.Object(options[k]) && !Object.keys(options[k]).length) {
                        delete options[k];
                    }
                })
                delete options._submitBtn;
                delete options._resetBtn;
                return options;
            },
            getOptions() {
                return methods.getOption();
            },
            getOptionsJson() {
                return designerForm.toJson([methods.getOption()]).slice(1).slice(0, -1);
            },
            setRule(rules) {
                if (!rules) {
                    rules = [];
                }
                data.children = ref(methods.loadRule(is.String(rules) ? designerForm.parseJson(rules) : deepCopy(rules)));
                methods.clearActiveRule();
                data.dragForm.rule = methods.makeDragRule(methods.makeChildren(data.children));
                methods.updateTree();
            },
            setBaseRuleConfig(rule, append) {
                baseRule.value = {rule, append};
                data.baseForm.rule = tidyRuleConfig(field, baseRule.value, {t});
            },
            setComponentRuleConfig(name, rule, append) {
                componentRule.value[name] = {rule, append};
                data.cacheProps = {};
                const activeRule = data.activeRule;
                if (activeRule) {
                    const propsVal = data.propsForm.api.formData && data.propsForm.api.formData();
                    data.propsForm.rule = data.cacheProps[activeRule._fc_id] =
                        tidyRuleConfig(activeRule._menu.props, componentRule.value && componentRule.value[activeRule._menu.name], activeRule, {
                            t,
                            api: data.dragForm.api
                        });
                    nextTick(() => {
                        propsVal && data.propsForm.api.setValue(propsVal);
                    });
                }
            },
            setValidateRuleConfig(rule, append) {
                validateRule.value = {rule, append};
                data.validateForm.rule = tidyRuleConfig(field, validateRule.value, {t});
            },
            setFormRuleConfig(rule, append) {
                formRule.value = {rule, append};
                data.form.rule = tidyRuleConfig(field, formRule.value, {t});
            },
            clearActiveRule() {
                data.activeRule = null;
                data.activePermission = {};
                data.customForm.config = null;
                data.activeTab = 'form';
                fcx.active = '';
            },
            setOption(opt) {
                const defOptions = deepCopy(methods.getConfig('formOptions', {}));
                const defForm = defOptions.form || {};
                delete defOptions.form;
                let options = {...defOptions, ...is.String(opt) ? JSON.parse(opt) : deepCopy(opt || {})};
                options.form = {
                    inline: false,
                    hideRequiredAsterisk: false,
                    labelPosition: 'right',
                    size: 'default',
                    labelWidth: '125px',
                    ...defForm,
                    ...options.form || {}
                };
                options._event = {
                    onReset: options.onReset || '',
                    onSubmit: options.onSubmit || '',
                    onCreated: options.onCreated || '',
                    onMounted: options.onMounted || '',
                    beforeSubmit: options.beforeSubmit || '',
                    onReload: options.onReload || '',
                    onChange: options.onChange || '',
                    beforeFetch: options.beforeFetch || '',
                }
                if (!hasProperty(options, 'language')) {
                    options.language = {};
                }
                options._resetBtn = typeof options.resetBtn === 'object' ? options.resetBtn : {show: options.resetBtn === true};
                options._submitBtn = typeof options.submitBtn === 'object' ? options.submitBtn : {show: options.submitBtn !== false};
                options.submitBtn = options.resetBtn = false;
                data.inputForm.data = options.formData || {};
                data.oldOptionsKeys = Object.keys(data.form.value);
                delete options.formData;
                data.formOptions = options;
                methods.updateOptionsValue();
            },
            setOptions(opt) {
                methods.setOption(opt);
            },
            mergeOptions(options) {
                ['form'].forEach((key) => {
                    if (options[key]) {
                        data.formOptions[key] = {...(data.formOptions[key] || {}), ...options[key]};
                    }
                });
                if(options.style && (!data.formOptions.style || data.formOptions.style.indexOf(options.style) === -1))  {
                    data.formOptions.style = (data.formOptions.style || '') + '\n' + options.style;
                }
                if (!data.formOptions.language) {
                    data.formOptions.language = {};
                }
                if (options.language) {
                    Object.keys(options.language).forEach((key) => {
                        data.formOptions.language[key] = {...(data.formOptions.language[key] || {}), ...options.language[key]};
                    })
                }
                if(options.languageKey) {
                    const language =  methods.getConfig('localeOptions', [
                        {value: 'zh-cn', label: '简体中文'},
                        {value: 'en', label: 'English'},
                    ]);
                    options.languageKey.forEach((key) => {
                        language.forEach(({value}) => {
                            if(!data.formOptions.language[value]){
                                data.formOptions.language[value] = {};
                            }
                            if(!data.formOptions.language[value][key]){
                                data.formOptions.language[value][key] = '';
                            }
                        })
                    })
                }
            },
            updateOptionsValue() {
                const old = {};
                data.oldOptionsKeys.forEach(k => {
                    old[k] = undefined;
                });
                const value = {...old, ...data.formOptions.form};
                Object.keys(data.formOptions).forEach(key => {
                    const item = data.formOptions[key];
                    value['>' + key] = item;
                    value['formCreate' + upper(key)] = item;
                    if (typeof item === 'object') {
                        Object.keys(item).forEach(k => {
                            value[key + '>' + k] = item[k];
                        })
                    }
                });
                data.form.value = value;
            },
            loadRule(rules, pConfig, template) {
                const loadRule = [];
                rules.forEach(rule => {
                    if (is.String(rule)) {
                        return loadRule.push(rule);
                    }
                    let config = data.dragRuleList[rule._fc_drag_tag] || data.dragRuleList[rule.type];
                    if (!config) {
                        config = defaultDrag(rule);
                        rule._fc_drag_tag = '_';
                    }
                    if (template) {
                        rule._fc_template = template;
                    }
                    config && config.loadRule && config.loadRule(rule);
                    rule.children = methods.loadRule(rule.children || [], config, template);
                    if (rule.control) {
                        rule._control = rule.control;
                        delete rule.control;
                    }
                    if (rule.computed) {
                        rule._computed = rule.computed;
                        delete rule.computed;
                    }
                    if (rule.on) {
                        rule._on = rule.on;
                        delete rule.on;
                    }
                    if (config) {
                        const slot = rule.slot;
                        let _config;
                        if (pConfig && pConfig.slot && slot && slot !== 'default') {
                            _config = methods.getSlotConfig(pConfig, slot, config)
                        }
                        delete rule.slot;
                        rule = methods.makeRule(_config || config, rule);
                        if (slot) {
                            rule.slot = slot;
                        }
                    }
                    loadRule.push(rule);
                });
                return loadRule;
            },
            parseRule(children, pSlot) {
                return [...children].reduce((initial, rule) => {
                    let slot = pSlot;
                    if (is.String(rule)) {
                        initial.push(rule);
                        return initial;
                    } else if (rule.type === 'DragBox') {
                        initial.push(...methods.parseRule(rule.children, slot || rule.slot));
                        return initial;
                    } else if (rule.type === 'DragTool') {
                        slot = rule.slot || pSlot;
                        rule = rule.children[0];
                        if (is.String(rule)) {
                            initial.push(rule);
                            return initial;
                        }
                        if (rule.type === 'DragBox') {
                            initial.push(...methods.parseRule(rule.children, slot || rule.slot));
                            return initial;
                        }
                    }
                    if (!rule) return initial;
                    rule = {...rule};
                    if (slot && slot !== 'default') {
                        rule.slot = slot;
                    }
                    if (rule.children && rule.children.length) {
                        rule.children = methods.parseRule(rule.children);
                    }

                    delete rule.key;
                    delete rule.component;
                    if (rule._menu) {
                        rule._menu.parseRule && rule._menu.parseRule(rule);
                        delete rule._menu;
                    }
                    if (rule._fc_drag_tag === '_') {
                        delete rule._fc_drag_tag;
                    }
                    if (rule._control) {
                        rule.control = rule._control;
                        delete rule._control;
                    }
                    if (rule._computed) {
                        rule.computed = rule._computed;
                        delete rule._computed;
                    }
                    if (!rule.slot) {
                        delete rule.slot;
                    }
                    if (rule._on) {
                        rule.on = rule._on;
                        delete rule._on;
                    }
                    rule.props && Object.keys(rule.props).forEach(k => {
                        const v = rule.props[k];
                        if (isNull(v)) {
                            delete rule.props[k];
                        }
                    });
                    Object.keys(rule).filter(k => k.indexOf('__') === 0 || (Array.isArray(rule[k]) && rule[k].length === 0) || (is.Object(rule[k]) && Object.keys(rule[k]).length === 0)).forEach(k => {
                        delete rule[k];
                    });
                    initial.push(rule);
                    return initial;
                }, []);
            },
            fields() {
                return data.dragForm.api.all().map(rule => rule.field).filter(id => !!id);
            },
            formMounted() {
                data.form.api.hidden(true, configRef.value.hiddenFormConfig || []);
                data.form.api.disabled(true, configRef.value.disabledFormConfig || []);
            },
            baseChange(field, value, _, fapi) {
                methods.handleChange('', field, value, _, fapi);
            },
            formOptChange(field, value) {
                data.form.value[field] = value;
                if (field.indexOf('formCreate') === 0) {
                    field = '>' + lower(field.replace('formCreate', ''));
                }
                if (field.indexOf('>') === -1) {
                    field = 'form>' + field;
                }
                let source = data.formOptions;
                const split = field.split('>');
                const lastField = split.pop();
                split.forEach(k => {
                    if (k) {
                        if (!source[k]) {
                            source[k] = {};
                        }
                        source = source[k];
                    }
                });
                source[lastField] = value;
            },
            propRemoveField(field, _, fapi) {
                if (data.activeRule && fapi[data.activeRule._fc_id] === data.activeRule) {
                    methods.unWatchActiveRule();
                    const org = field;
                    data.dragForm.api.sync(data.activeRule);
                    if (field.indexOf('__') !== 0) {
                        if (field === 'formCreateChild') {
                            delete data.activeRule.children[0];
                        } else if (field.indexOf('formCreate') === 0 || field.indexOf('>') > 0) {
                            if (field.indexOf('formCreate') < 0) {
                                field = 'props>' + field;
                            }
                            propFieldDeepFn(field, ({source, field}) => {
                                delete source[field];
                            })
                        } else {
                            delete data.activeRule.props[field];
                        }
                    }
                    methods.watchActiveRule();
                    data.activeRule._menu?.watch?.[org]?.({
                        field: org,
                        value: undefined,
                        api: fapi,
                        rule: data.activeRule,
                        ctx: vm,
                    });
                }
            },
            propChange(field, value, _, fapi) {
                methods.handleChange('props', field, value, _, fapi);
            },
            styleChange(field, value, _, fapi) {
                if (data.customForm.config) {
                    return data.customForm.config.style.change(field, value);
                }
                methods.handleChange('', field, value, _, fapi);
            },
            handleChange(key, field, value, _, fapi) {
                if (data.activeRule && fapi[data.activeRule._fc_id] === data.activeRule) {
                    methods.unWatchActiveRule();
                    const org = field;
                    if (field.indexOf('__') !== 0) {
                        if (field === 'formCreateChild') {
                            data.activeRule.children[0] = value;
                        } else if (field.indexOf('formCreate') === 0 || field.indexOf('>') > 0) {
                            if (field.indexOf('formCreate') < 0) {
                                field = (key ? key + '>' : '') + field;
                            }
                            propFieldDeepFn(field, ({source, field}) => {
                                if (isNull(value)) {
                                    delete source[field];
                                } else {
                                    source[field] = value;
                                }
                            })
                        } else {
                            if (key && isNull(value)) {
                                delete data.activeRule[key][field];
                            } else {
                                (key ? data.activeRule[key] : data.activeRule)[field] = value;
                            }
                        }
                    }
                    methods.watchActiveRule();
                    data.activeRule._menu?.watch?.[org]?.({
                        field: org,
                        value,
                        api: fapi,
                        rule: data.activeRule,
                        ctx: vm,
                    });
                }
            },
            validateChange(field, value, _, fapi) {
                if (!data.activeRule || data.validateForm.api[data.activeRule._fc_id] !== data.activeRule) return;
                methods.handleChange('', field, value, _, fapi);
                data.dragForm.api.refreshValidate();
                data.dragForm.api.nextTick(() => {
                    data.dragForm.api.clearValidateState(data.activeRule.__fc__.id);
                });
            },
            triggerActive(rule) {
                let dragTool;
                if (is.String(rule)) {
                    rule = methods.findRule(rule);
                }
                if (!rule) {
                    return;
                }
                if (rule._menu.inside) {
                    dragTool = rule.children[0];
                } else {
                    dragTool = rule.__fc__.parent.rule;
                }
                if (dragTool && dragTool.type === 'DragTool') {
                    const el = data.dragForm.api.el(dragTool.__fc__.id);
                    if (el) {
                        fcx.active = el.id;
                        vm.emit('active', rule);
                        methods.toolActive(rule);
                    }
                }
            },
            customFormChange(field, value) {
                if (data.customForm.config) {
                    data.customForm.config.change(field, value);
                }
            },
            customActive(config) {
                data.baseForm.isShow = false;
                data.propsForm.isShow = false;
                data.eventShow = false;
                data.validateForm.isShow = false;
                data.styleForm.isShow = !!config.style && methods.getConfig('showStyleForm') !== false;
                data.activeRule = null;
                data.activePermission = {};
                fcx.active = '';

                data.customForm.config = config;
                data.customForm.isShow = true;
                data.customForm.propsShow = config.props && methods.getConfig('showPropsForm') !== false;
                data.customForm.key = uniqueId();
                data.customForm.rule = data.customForm.propsShow ? config.props({t}) : [];
                data.customForm.options.formData = config.formData;
                if (config.style) {
                    data.styleForm.value = config.style.formData || {};
                }
                nextTick(() => {
                    data.activeTab = 'props';
                });
            },
            getPropsRule(rule) {
                let propsRule = tidyRuleConfig(rule._menu.props, componentRule.value && componentRule.value[rule._menu.name], rule, {
                    t,
                    api: data.dragForm.api
                });
                if (componentRule.value && componentRule.value.default) {
                    const def = componentRule.value.default;
                    propsRule = tidyRuleConfig(() => propsRule, is.Function(def) ? {
                        rule: def,
                        append: true
                    } : def, rule, {
                        t,
                        api: data.dragForm.api
                    });
                }
                return propsRule;
            },
            findRule(id) {
                let rule = undefined;
                const findTree = children => {
                    children.forEach(item => {
                        if ([item.rule.field, item.rule.name, item.rule._fc_id].indexOf(id) > -1) {
                            rule = item.rule;
                        } else if (item.children) {
                            findTree(item.children);
                        }
                    })
                }
                findTree(data.treeInfo);
                return rule;
            },
            toolActive(rule) {
                if (configRef.value.beforeActiveRule && false === configRef.value.beforeActiveRule({rule})) {
                    return;
                }
                methods.unWatchActiveRule();
                data.customForm.isShow = false;
                data.customForm.config = null;
                if (data.activeRule) {
                    delete data.propsForm.api[data.activeRule._fc_id];
                    delete data.baseForm.api[data.activeRule._fc_id];
                    delete data.validateForm.api[data.activeRule._fc_id];
                    delete data.styleForm.api[data.activeRule._fc_id];
                    delete data.dragForm.api.activeRule;
                }
                const permission = methods.getPermission(rule);
                data.activeRule = rule;
                data.activePermission = permission;
                data.dragForm.api.activeRule = rule;

                nextTick(() => {
                    data.activeTab = 'props';
                    nextTick(() => {
                        data.propsForm.api[data.activeRule._fc_id] = data.activeRule;
                        data.baseForm.api[data.activeRule._fc_id] = data.activeRule;
                        data.validateForm.api[data.activeRule._fc_id] = data.activeRule;
                        data.styleForm.api[data.activeRule._fc_id] = data.activeRule;
                    });
                });
                if (!data.cacheProps[rule._fc_id]) {
                    data.cacheProps[rule._fc_id] = methods.getPropsRule(rule);
                }
                const hiddenItemConfig = methods.getConfig('hiddenItemConfig', {});
                const disabledItemConfig = methods.getConfig('disabledItemConfig', {});
                const hiddenField = uniqueArray([...permission.hiddenConfig || [], ...hiddenItemConfig?.default || [], ...hiddenItemConfig?.[rule._menu.name] || []]);
                const hiddenBaseField = [...hiddenField, ...rule._menu.hiddenBaseField || []];
                const disabledField = uniqueArray([...permission.disabledConfig || [], ...disabledItemConfig?.default || [], ...disabledItemConfig?.[rule._menu.name] || []]);
                data.baseForm.api.disabled(false);
                data.baseForm.api.hidden(false);
                nextTick(() => {
                    data.baseForm.api.all().forEach((item) => {
                        if (item.name || item.field) {
                            item.hidden = hiddenBaseField.indexOf(item.name) !== -1 || hiddenBaseField.indexOf(item.field) !== -1;
                        }
                    })
                    data.propsForm.api.hidden(true, hiddenField);
                });
                if (disabledField.length) {
                    data.baseForm.api.disabled(true, disabledField);
                    nextTick(() => {
                        data.propsForm.api.disabled(true, disabledField);
                    });
                }
                if (!methods.getConfig('showControl', true)) {
                    data.baseForm.api.hidden(true, '_control');
                }
                const input = hasProperty(rule, 'field');
                data.baseForm.isShow = permission.base !== false && input && rule.input !== false && methods.getConfig('showBaseForm') !== false;
                data.propsForm.isShow = permission.props !== false && data.cacheProps[rule._fc_id].length > 0 && methods.getConfig('showPropsForm') !== false;
                data.styleForm.isShow = permission.style !== false && rule._menu.style !== false && methods.getConfig('showStyleForm') !== false;
                data.eventShow = permission.event !== false && rule._menu.event !== false && methods.getConfig('showEventForm') !== false;
                const showValidateForm = methods.getConfig('showValidateForm');
                data.validateForm.isShow = permission.validate !== false && ((data.baseForm.isShow && showValidateForm !== false) || showValidateForm === true) && rule._menu.validate !== false;
                data.propsForm.rule = data.cacheProps[rule._fc_id];
                if (data.validateForm.isShow) {
                    nextTick(() => {
                        data.validateForm.api.hidden(methods.getConfig('validateOnlyRequired') === true || rule._menu.validate === 'required', ['validate']);
                    })
                }
                methods.updateRuleFormData();
                methods.watchActiveRule();
            },
            getConfig(key, def) {
                return configRef.value ? (hasProperty(configRef.value, key) ? configRef.value[key] : def) : def;
            },
            getPermission(rule) {
                let permission = {};
                (configRef.value?.componentPermission || []).forEach(item => {
                    let flag = false
                    if (item.field && (Array.isArray(item.field) ? item.field.indexOf(rule.field) > -1 : item.field === rule.field)) {
                        flag = true;
                    } else if (item.name && (Array.isArray(item.name) ? item.name.indexOf(rule.name) > -1 : item.name === rule.name)) {
                        flag = true;
                    } else if (item.id && (Array.isArray(item.id) ? item.id.indexOf(rule._fc_id) > -1 : item.id === rule._fc_id)) {
                        flag = true;
                    } else if (item.tag && (Array.isArray(item.tag) ? item.tag.indexOf(rule._fc_drag_tag) > -1 : item.tag === rule._fc_drag_tag)) {
                        flag = true;
                    }
                    if (flag) {
                        permission = item.permission || {};
                    }
                })
                return permission;
            },
            updateRuleFormData() {
                const rule = data.activeRule;
                let formData = {
                    formCreateChild: '' + rule.children[0],
                    'formCreateWrap>labelWidth': ''
                };
                const appendConfigData = configRef.value.appendConfigData;
                if (is.Function(appendConfigData)) {
                    formData = {...formData, ...appendConfigData(rule)};
                } else if (Array.isArray(appendConfigData)) {
                    appendConfigData.forEach(v => {
                        formData[v] = undefined;
                    });
                }
                Object.keys(rule).forEach(k => {
                    if (['effect', 'config', 'payload', 'id', 'type', '_menu'].indexOf(k) < 0)
                        formData['formCreate' + upper(k)] = deepCopy(rule[k]);
                });
                Object.keys(rule.props).forEach(k => {
                    const item = rule.props[k];
                    formData[k] = deepCopy(item);
                    if (is.Object(item)) {
                        Object.keys(item).forEach(sub => {
                            formData[k + '>' + sub] = deepCopy(item[sub]);
                        });
                    }
                });
                ['props', 'effect', 'attrs', 'style', 'wrap'].forEach(name => {
                    rule[name] && (typeof rule[name] === 'object') && Object.keys(rule[name]).forEach(k => {
                        formData['formCreate' + upper(name) + '>' + k] = deepCopy(rule[name][k]);
                    });
                });
                const configAttrs = rule._menu.attrs || {};
                Object.keys(configAttrs).forEach(k => {
                    formData['__' + k] = configAttrs[k]({rule});
                });
                data.propsForm.value = formData;
                data.styleForm.value = {
                    style: rule.style,
                    class: rule.class,
                    id: rule.id,
                };

                if (data.baseForm.isShow) {
                    data.baseForm.value = {
                        field: rule.field,
                        title: rule.title || '',
                        info: rule.info,
                        _control: rule._control,
                        ...formData
                    };
                    data.validateForm.value = {
                        validate: rule.validate ? [...rule.validate] : [],
                        $required: formData.formCreate$required
                    };
                    data.dragForm.api.refreshValidate();
                    data.dragForm.api.nextTick(() => {
                        data.dragForm.api.clearValidateState(rule.__fc__.id);
                    });
                }
            },
            dragStart(children) {
                // console.log('top dragStart')
                data.moveRule = children;
                data.added = false;
            },
            dragUnchoose(children, evt) {
                // console.log('top dragUnchoose')
                data.addRule = {
                    children,
                    oldIndex: evt.oldIndex
                };
            },
            clickMenu(menu) {
                if (this.checkDragToContainer(menu)) {
                    methods.dragMenu({menu, children: data.children, index: data.children.length});
                }
            },
            checkOnly(menu) {
                let flag = false;
                data.dragForm.api.all().forEach(rule => {
                    flag = flag || rule._fc_template === menu.name || (rule._menu && rule._menu.name === menu.name);
                });
                if (flag) {
                    errorMessage(data.t('struct.only', {label: t('com.' + menu.name + '.name') || menu.label}));
                }
                return flag;
            },
            dragMenu({menu, children, index, slot}) {
                if (data.inputForm.state) {
                    return;
                }
                if (menu.only && methods.checkOnly(menu)) {
                    return;
                }
                methods.handleAddBefore();
                const dragRule = data.dragRuleList[menu.name];
                vm.emit('drag', {
                    item: menu, dragRule
                });
                const rule = methods.makeRule(data.dragRuleList[dragRule.name]);
                if (slot) {
                    rule.slot = slot;
                }
                children.splice(index, 0, rule);
                const firstRule = (rule.type === 'DragTool') ? rule.children[0] : rule;
                methods.handleAddAfter({rule});
                if (firstRule && methods.getConfig('autoActive', true)) {
                    nextTick(() => {
                        methods.triggerActive(firstRule);
                    });
                }
            },
            replaceField(rule) {
                const flag = ['array', 'object'].indexOf(rule._menu.subForm) > -1;
                let temp = methods.parseRule(deepCopy([rule]))[0];
                const autoResetName = false !== methods.getConfig('autoResetName');
                if (flag) {
                    temp.field = uniqueId();
                    if (autoResetName) {
                        temp.name = 'ref_' + uniqueId();
                    }
                }
                temp = designerForm.toJson(temp);
                if (flag) {
                    temp = methods.batchReplaceUni(temp);
                } else {
                    temp = methods.batchReplaceField(temp);
                    if (autoResetName) {
                        temp = methods.batchReplaceName(temp);
                    }
                }
                return methods.loadRule([designerForm.parseJson(temp)])[0];
            },
            batchReplaceField(json) {
                const regex = /"field"\s*:\s*"(\w[\w\d]+)"/g;
                const matches = [];
                json = json.replace(regex, (match, p1) => {
                    const key = uniqueId();
                    matches.push({old: p1, key: key});
                    return `"field":"${key}"`;
                });
                return methods.batchReplaceUni(json);
            },
            batchReplaceUni(json) {
                const regex = /"_fc_id"\s*:\s*"(\w[\w\d]+)"/g;
                json = json.replace(regex, () => {
                    return `"_fc_id":"id_${uniqueId()}"`;
                });
                return json;
            },
            batchReplaceName(json) {
                const regex = /"name"\s*:\s*"ref_(\w[\w\d]+)"/g;
                json = json.replace(regex, () => {
                    return `"name":"ref_${uniqueId()}"`;
                });
                return json;
            },
            getTrueRule(rule) {
                if (!rule) {
                    return;
                }
                if (rule._menu) {
                    return rule._menu._get();
                }
                if (rule._config) {
                    return rule._config._get();
                }
            },
            checkDragToContainer(menu) {
                return !menu.allowDragTo || (Array.isArray(menu.allowDragTo) ? menu.allowDragTo.indexOf('draggable') > -1 : menu.allowDragTo === 'draggable');
            },
            dragPut(to, from, dragEl) {
                const toRule = methods.getTrueRule(to.el.__rule__);
                const _menu = dragEl._underlying_vm_.__fc__ ? (dragEl._underlying_vm_._config || dragEl._underlying_vm_._menu) : dragEl._underlying_vm_;
                if (!toRule) {
                    return !_menu || this.checkDragToContainer(_menu);
                }
                const toMenu = toRule._menu;
                const _fc_allow_drag = dragEl._fc_allow_drag || {};
                if (_fc_allow_drag[toRule._fc_id] === undefined) {
                    const _rule = methods.getTrueRule(dragEl._underlying_vm_);
                    _fc_allow_drag[toRule._fc_id] = !(_menu && toMenu && !methods.checkDrag({
                        menu: _menu,
                        toMenu,
                        rule: _rule,
                        toRule
                    }));
                    dragEl._fc_allow_drag = _fc_allow_drag;
                }
                return dragEl._fc_allow_drag[toRule._fc_id];
            },
            checkDrag({menu, toMenu, rule, toRule}) {
                if (!methods.checkAllowDrag(menu, toMenu)) {
                    return false;
                }
                if (toRule.children && toMenu.maxChildren && toMenu.maxChildren <= toRule.children[0]?.children?.length) {
                    return false;
                }
                if (menu.checkDrag && false === menu.checkDrag({
                    menu,
                    toMenu,
                    rule,
                    toRule,
                    designer: vm
                })) {
                    return false;
                }
                if (toMenu.checkDrag && false === toMenu.checkDrag({
                    menu,
                    toMenu,
                    rule,
                    toRule,
                    designer: vm
                })) {
                    return false;
                }
                if (configRef.value.checkDrag && false === configRef.value.checkDrag({
                    menu,
                    toMenu,
                    rule,
                    toRule
                })) {
                    return false;
                }
                return true;
            },
            checkAllowDrag(from, to) {
                function checkDragCondition(tmp) {
                    if (Array.isArray(tmp)) {
                        tmp = {item: tmp};
                    }
                    if (toArray(tmp.item).indexOf(from.name) > -1) {
                        return true;
                    }
                    return toArray(tmp.menu).indexOf(from.menu) > -1;
                }

                const globalAllowDrag = methods.getConfig('allowDrag', {})[to.name];
                const globalDenyDrag = methods.getConfig('denyDrag', {})[to.name];
                if (from.allowDragTo && (Array.isArray(from.allowDragTo) ? from.allowDragTo.indexOf(to.name) === -1 : from.allowDragTo !== to.name)) {
                    return false;
                }
                if (to.allowDrag && checkDragCondition(to.allowDrag)) {
                    return true;
                }
                if (globalAllowDrag && checkDragCondition(globalAllowDrag)) {
                    return true;
                }
                if (to.allowDrag || globalAllowDrag) {
                    return false;
                }
                if (to.denyDrag && checkDragCondition(to.denyDrag)) {
                    return false;
                }
                return !(globalDenyDrag && checkDragCondition(globalDenyDrag));
            },
            dragAdd(children, evt, slot) {
                // console.log('top dragAdd')
                delete evt.item._fc_allow_drag;
                const newIndex = evt.newIndex;
                const menu = evt.item._underlying_vm_ || evt.item.__rule__;
                data.added = true;
                if (menu && menu.__fc__) {
                    if (data.addRule) {
                        methods.handleSortBefore();
                        const rule = data.addRule.children.splice(data.addRule.children.indexOf(menu), 1)[0];
                        if (slot) {
                            rule.slot = slot;
                        } else {
                            delete rule.slot;
                        }
                        children.splice(newIndex, 0, rule);
                        methods.handleSortAfter({rule: rule});
                    }
                } else {
                    methods.dragMenu({menu, children, index: newIndex, slot});
                }
                // data.dragForm.api.refresh();
            },
            dragEnd(children, {item, newIndex, oldIndex}, slot) {
                delete item._fc_allow_drag;
                if (!data.added && !(data.moveRule === children && newIndex === oldIndex)) {
                    methods.handleSortBefore();
                    const rule = data.moveRule.splice(oldIndex, 1);
                    if (slot) {
                        rule.slot = slot;
                    }
                    children.splice(newIndex, 0, rule[0]);
                    methods.handleSortAfter({rule: rule[0]});
                }
                data.moveRule = null;
                data.addRule = null;
                data.added = false;
                // data.dragForm.api.refresh();
            },
            getSlotConfig(pConfig, slot, config) {
                let slotConfig = {};
                (pConfig.slot || []).forEach(item => {
                    if (item.name === slot) {
                        slotConfig = item.config || {};
                    }
                });
                return {...config, dragBtn: false, handleBtn: config.children ? ['addChild'] : false, ...slotConfig}
            },
            makeRule(config, _rule) {
                let rule = _rule || config.rule({t});
                const updateRule = updateDefaultRule.value && updateDefaultRule.value[config.name];
                if (!_rule && updateRule) {
                    if (typeof updateRule === 'function') {
                        try{
                            updateRule(rule);
                        }catch (e) {
                            console.error(e);
                        }
                    } else {
                        let _rule = deepCopy(updateRule);
                        delete _rule.children;
                        delete _rule.component;
                        rule = mergeProps([rule, _rule]);
                    }
                }
                rule._menu = markRaw({...config});
                rule._menu._get = () => {
                    return rule;
                }
                if (!rule._fc_id) {
                    rule._fc_id = 'id_' + uniqueId();
                }
                if (!rule.name) {
                    rule.name = 'ref_' + uniqueId();
                }
                if (config.component) {
                    rule.component = markRaw(config.component);
                }
                if (!rule._computed) {
                    rule._computed = {};
                }
                if (!rule.effect) {
                    rule.effect = {};
                }
                if (config.input && !rule.field) {
                    rule.field = uniqueId();
                }
                if (config.languageKey) {
                    methods.mergeOptions({
                        languageKey: config.languageKey
                    })
                }
                if (!hasProperty(rule, 'display')) {
                    rule.display = true;
                }
                if (!hasProperty(rule, 'hidden')) {
                    rule.hidden = false;
                }
                if (!rule.children) {
                    rule.children = [];
                }
                rule._fc_drag_tag = config.name;
                let only = config.only === true;
                let drag;

                const children = rule.children || [];
                if (config.drag) {
                    rule.children = [drag = methods.makeDrag(config.drag, rule._menu ? rule._menu.name : rule.type, children, {
                        end: (inject, evt) => methods.dragEnd(inject.self.children, evt),
                        add: (inject, evt) => methods.dragAdd(inject.self.children, evt),
                        start: (inject, evt) => methods.dragStart(inject.self.children, evt),
                        unchoose: (inject, evt) => methods.dragUnchoose(inject.self.children, evt),
                    })];
                    drag._config = rule._menu;
                }

                if (config.children && !_rule && !children.length) {
                    for (let i = 0; i < (config.childrenLen || 1); i++) {
                        const child = methods.makeRule(data.dragRuleList[config.children]);
                        (drag || rule).children.push(child);
                    }
                }
                const dragMask = mask.value !== undefined ? mask.value !== false : config.mask !== false;
                if (config.tool === false) {
                    return rule;
                }
                if (config.inside) {
                    rule.children = methods.makeChildren([{
                        type: 'DragTool',
                        props: {
                            dragBtn: config.dragBtn !== false,
                            children: config.children,
                            mask: dragMask,
                            handleBtn: config.handleBtn,
                            only,
                        },
                        inject: true,
                        on: {
                            delete: ({self}) => {
                                const parent = methods.getParent(self).parent;
                                if (methods.handleRemoveBefore({parent, rule: parent}) !== false) {
                                    parent.__fc__.rm();
                                    vm.emit('delete', parent);
                                    if (data.activeRule === parent) {
                                        methods.clearActiveRule();
                                    }
                                    methods.handleRemoveAfter({rule: parent});
                                }
                            },
                            create: ({self}) => {
                                methods.handleAddBefore();
                                const top = methods.getParent(self);
                                vm.emit('create', top.parent);
                                const rule = methods.makeRule(top.parent._menu);
                                if (top.parent.slot) {
                                    rule.slot = top.parent.slot;
                                }
                                top.root.children.splice(top.root.children.indexOf(top.parent) + 1, 0, rule);
                                methods.handleAddAfter({rule: top.parent});
                            },
                            addChild: ({self}) => {
                                methods.handleAddBefore();
                                const top = methods.getParent(self);
                                const config = top.parent._menu;
                                const item = data.dragRuleList[config.children];
                                if (!item) return;
                                const rule = methods.makeRule(item);
                                (!config.drag ? top.parent : top.parent.children[0]).children[0].children.push(rule);
                                methods.handleAddAfter({rule});
                            },
                            copy: ({self}) => {
                                methods.handleCopyBefore();
                                const top = methods.getParent(self);
                                vm.emit('copy', top.parent);
                                const temp = methods.replaceField(top.parent);
                                top.root.children.splice(top.root.children.indexOf(top.parent) + 1, 0, temp);
                                methods.handleCopyAfter({rule: top.parent});
                            },
                            active: ({self}) => {
                                const top = methods.getParent(self);
                                vm.emit('active', top.parent);
                                setTimeout(() => {
                                    methods.toolActive(top.parent);
                                }, 10);
                            }
                        },
                        _config: rule._menu,
                        children: rule.children
                    }]);
                    return rule;
                } else {
                    return {
                        type: 'DragTool',
                        props: {
                            dragBtn: config.dragBtn !== false,
                            children: config.children,
                            mask: dragMask,
                            handleBtn: config.handleBtn,
                            only,
                        },
                        inject: true,
                        display: !!rule.display,
                        on: {
                            delete: ({self}) => {
                                if (methods.handleRemoveBefore({parent: self, rule: self.children[0]}) !== false) {
                                    vm.emit('delete', self.children[0]);
                                    self.__fc__.rm();
                                    if (data.activeRule === self.children[0]) {
                                        methods.clearActiveRule();
                                    }
                                    methods.handleRemoveAfter({rule: self.children[0]});
                                }
                            },
                            create: ({self}) => {
                                methods.handleAddBefore();
                                vm.emit('create', self.children[0]);
                                const top = methods.getParent(self);
                                const rule = methods.makeRule(self.children[0]._menu);
                                if (top.parent.slot) {
                                    rule.slot = top.parent.slot;
                                }
                                top.root.children.splice(top.root.children.indexOf(top.parent) + 1, 0, rule);
                                methods.handleAddAfter({rule})
                            },
                            addChild: ({self}) => {
                                methods.handleAddBefore();
                                const config = self.children[0]._menu;
                                const item = data.dragRuleList[config.children];
                                if (!item) return;
                                const rule = methods.makeRule(item);
                                (!config.drag ? self : self.children[0]).children[0].children.push(rule);
                                methods.handleAddAfter({rule})
                            },
                            copy: ({self}) => {
                                methods.handleCopyBefore();
                                vm.emit('copy', self.children[0]);
                                const top = methods.getParent(self);
                                const temp = methods.replaceField(self.children[0]);
                                if(self.slot) {
                                    temp.slot = self.slot;
                                }
                                top.root.children.splice(top.root.children.indexOf(top.parent) + 1, 0, temp);
                                methods.handleCopyAfter({rule: self.children[0]});
                            },
                            active: ({self}) => {
                                vm.emit('active', self.children[0]);
                                setTimeout(() => {
                                    methods.toolActive(self.children[0]);
                                }, 10);
                            }
                        },
                        _config: rule._menu,
                        children: methods.makeChildren([rule])
                    };
                }
            },
            toolHandle(rule, event) {
                if (!rule._fc_drag_tag || rule._menu.tool === false) {
                    rule.__fc__.rm();
                    return;
                }
                let toolVm;
                if (rule._menu.inside) {
                    toolVm = rule.children[0].__fc__.exportEl;
                } else {
                    toolVm = rule.__fc__.parent.exportEl;
                }
                toolVm.$emit(event);
            },
            handleAddBefore() {
            },
            handleRemoveBefore({rule}) {
                if (configRef.value.beforeRemoveRule && false === configRef.value.beforeRemoveRule({rule})) {
                    return false;
                }
            },
            handleCopyBefore() {
            },
            handleSortBefore() {
            },
            addOperationRecord() {
                const rule = methods.getJson();
                const formData = deepCopy(data.inputForm.data);
                const list = data.operation.list.slice(0, data.operation.idx + 1);
                list.push({rule, formData});
                data.operation.list = list;
                data.operation.idx = list.length - 1;
                data.unloadStatus = list.length !== 1;
            },
            prevOperationRecord() {
                if (!data.operation.list[data.operation.idx - 1]) {
                    return;
                }
                const item = data.operation.list[--data.operation.idx];
                methods.useOperationRecord(item);
                methods.clearActiveRule();
            },
            nextOperationRecord() {
                if (!data.operation.list[data.operation.idx + 1]) {
                    return;
                }
                const item = data.operation.list[++data.operation.idx];
                methods.useOperationRecord(item);
                methods.clearActiveRule();
            },
            useOperationRecord(item) {
                data.inputForm.data = item.formData;
                methods.setRule(item.rule);
            },
            handleAddAfter() {
                methods.addOperationRecord();
                methods.updateTree();
            },
            handleRemoveAfter() {
                methods.addOperationRecord();
                methods.updateTree();
            },
            handleCopyAfter() {
                methods.addOperationRecord();
                methods.updateTree();
            },
            handleSortAfter() {
                methods.addOperationRecord();
                methods.updateTree();
            },
            treeChange(data) {
                methods.triggerActive(data.rule);
            },
            getFormDescription() {
                return getFormRuleDescription(methods.getDescription());
            },
            getDescription() {
                return getRuleDescription(data.dragForm.rule[0].children);
            },
            getSubFormDescription(rule) {
                let ctx = rule.__fc__ && rule.__fc__.parent;
                while (ctx) {
                    if (ctx.rule._menu && ['array', 'object'].indexOf(ctx.rule._menu.subForm) > -1) {
                        return getFormRuleDescription(getRuleDescription(ctx.rule.children));
                    } else {
                        ctx = ctx.parent;
                    }
                }
                return null;
            },
            getSubFormChildren(rule) {
                let ctx = rule.__fc__ && rule.__fc__.parent;
                while (ctx) {
                    if (ctx.rule._menu && ['array', 'object'].indexOf(ctx.rule._menu.subForm) > -1) {
                        return ctx.rule.children || [];
                    } else {
                        ctx = ctx.parent;
                    }
                }
                return null;
            },
            updateTree: debounce(function () {
                nextTick(() => {
                    data.treeInfo = getRuleTree(data.dragForm.rule[0].children);
                });
            }, 300),
            findTree(field) {
                let tree = undefined;
                const findTree = children => {
                    children.forEach(item => {
                        if (item.rule.field === field) {
                            tree = item.children;
                        } else if (item.children) {
                            findTree(item.children);
                        }
                    })
                }
                findTree(data.treeInfo);
                return tree || [];

            },
            handleDragenter(e) {
                data.bus.$emit('dragenter', e);
            },
            handleDragleave(e) {
                data.bus.$emit('dragleave', e);
            },
            handleDrop(e) {
                data.bus.$emit('drop', e);
            },
            changeEvent(on) {
                data.activeRule._on = on;
            },
            triggerHandle(item) {
                item.handle();
            },
            bindHotkey(event) {
                const isCtrlOrCmd = event.ctrlKey || event.metaKey;
                if (!getSelection().toString() && isCtrlOrCmd && event.target.tagName === 'BODY' && ['ArrowUp', 'ArrowDown', 'Backspace', 'c', 'x', 'z', 'p', '1', '2', '3', '4'].indexOf(event.key) > -1) {
                    event.preventDefault();
                    if (data.inputForm.state) {
                        return;
                    }
                    if (hotKey[event.key]) {
                        hotKey[event.key](event)
                    } else if ('1234'.indexOf(event.key) > -1) {
                        hotKey.num(event);
                    }
                }
            },
            bindPaste(event) {
                if (data.inputForm.state) {
                    return;
                }
                let content = event.clipboardData.getData('text/plain');
                if (content && content.indexOf('FormCreate:') === 0) {
                    let children = data.children;
                    content = content.slice(11, content.length);
                    if (methods.getConfig('autoResetField') !== false) {
                        content = methods.batchReplaceField(content);
                    }
                    if (methods.getConfig('autoResetName') !== false) {
                        content = methods.batchReplaceName(content);
                    }
                    const copyRule = methods.loadRule([designerForm.parseJson(content)])[0];
                    let flag = true;
                    if (data.activeRule && data.activeRule._menu.drag) {
                        const _rule = methods.getTrueRule(copyRule);
                        if (_rule && !methods.checkDrag({
                            rule: _rule,
                            menu: _rule._menu,
                            toRule: data.activeRule,
                            toMenu: data.activeRule._menu
                        })) {
                            return;
                        }
                        if (data.activeRule._menu.inside) {
                            children = data.activeRule.children[0].children[0].children;
                        } else {
                            children = data.activeRule.children[0].children;
                        }
                    } else if (data.customForm.config && data.customForm.config.onPaste) {
                        data.customForm.config.onPaste(copyRule)
                        flag = false;
                    }
                    if (flag) {
                        children.push(copyRule);
                    }
                    methods.updateTree();
                    methods.addOperationRecord();
                    vm.emit('pasteRule', {event, copyRule});
                }
            }
        }
        methods.addDragRule = methods.addComponent;

        const hotKey = {
            z(e) {
                if (e.shiftKey) {
                    methods.nextOperationRecord();
                } else {
                    methods.prevOperationRecord();
                }
            },
            Backspace() {
                if (!data.activeRule) {
                    return;
                }
                methods.toolHandle(data.activeRule, 'delete');
            },
            c(event) {
                const rule = data.activeRule;
                if (!rule) {
                    return;
                }
                copyTextToClipboard('FormCreate:' + designerForm.toJson(methods.parseRule([rule])[0]));
                vm.emit('copyRule', {event, rule});
            },
            x(e) {
                if (!data.activeRule) {
                    return;
                }
                hotKey.c(e);
                methods.toolHandle(data.activeRule, 'delete');
            },
            p() {
                methods.openPreview();
            },
            num(event) {
                const num = event.key;
                if (event.key === '1') {
                    data.activeModule = 'base';
                    data.activeMenuTab = 'menu';
                } else if (event.key === '2') {
                    data.activeModule = 'base';
                    data.activeMenuTab = 'tree';
                } else if (event.key === '3') {
                    data.activeModule = 'json';
                } else if (event.key === '4') {
                    data.activeModule = 'language';
                }
            },
            ArrowUp(event) {
                let rule = data.activeRule;
                if (!rule) {
                    return;
                }
                if (!rule._menu.inside) {
                    rule = rule.__fc__.parent.rule;
                }
                const parentRule = rule.__fc__.parent.rule;
                const idx = parentRule.children.indexOf(rule);

                if (parentRule.children.length > 1 && idx >= 0) {
                    const direction = event.key === 'ArrowUp' ? -1 : (event.key === 'ArrowDown' ? 1 : 0);

                    if (direction && idx + direction >= 0 && idx + direction < parentRule.children.length) {
                        parentRule.children.splice(idx, 1);
                        parentRule.children.splice(idx + direction, 0, rule);
                        methods.updateTree();
                        methods.addOperationRecord();
                        vm.emit('sort' + (event.key === 'ArrowUp' ? 'Up' : 'Down'), {event, rule});
                    }
                }
            },
            ArrowDown(event) {
                hotKey.ArrowUp(event);
            }
        }
        data.dragForm.rule = methods.makeDragRule(methods.makeChildren(data.children));
        methods.setOption({});
        if (!menu.value) {
            methods.addComponent(ruleList);
        } else {
            ruleList.forEach(v => {
                data.dragRuleList[v.name] = v;
            });
        }

        const inputCheckStatus = computed(() => {
            return Object.keys(data.inputForm.data).length > 0;
        })

        return {
            ...toRefs(data), ...methods,
            dragHeight,
            t,
            handle,
            inputCheckStatus,
            fieldReadonly,
            hiddenMenu,
            hiddenItem,
            hiddenDragMenu,
            hiddenDragBtn,
            menuList,
            configFormOrderStyle,
        }
    },
    created() {
        document.body.ondrop = e => {
            e.preventDefault();
            e.stopPropagation();
        };
        window.onbeforeunload = (e) => {
            if (this.unloadStatus && this.config?.exitConfirm !== false) {
                e.returnValue = this.t('designer.unload');
            }
        }
    },
    mounted() {
        if (this.config?.hotKey !== false) {
            document.addEventListener('keydown', this.bindHotkey);
            document.addEventListener('paste', this.bindPaste);
        }
    },
    unmounted() {
        document.removeEventListener('keydown', this.bindHotkey);
        document.removeEventListener('paste', this.bindPaste);
    }
});
</script>
