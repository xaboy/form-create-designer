<style>
._fc-designer {
    height: 100%;
    min-height: 500px;
    overflow: hidden;
    cursor: default;
    position: relative;
}

._fc-designer > .el-main {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0px;
}

._fc-m .form-create ._fc-l-item {
    background: #2E73FF;
    width: 100%;
    height: 10px;
    overflow: hidden;
    transition: all .3s ease;
}

._fc-l, ._fc-m, ._fc-r {
    border-top: 1px solid #ECECEC;
    box-sizing: border-box;
}

._fc-l-group {
    padding: 0 12px;
}

._fc-l-title {
    font-weight: 600;
    font-size: 14px;
    margin: 18px 0px 5px;
}

._fc-l-item {
    display: inline-block;
    background: #FFF;
    color: #000;
    min-width: 70px;
    width: 33.33%;
    height: 70px;
    line-height: 1;
    text-align: center;
    transition: all .2s ease;
    cursor: pointer;
}

._fc-l-item i {
    font-size: 21px;
    display: inline-block;
}

._fc-l-item ._fc-l-name {
    font-size: 12px;
}

._fc-l-item ._fc-l-icon {
    padding: 10px 5px 12px;
}

._fc-l-item:hover {
    background: #2E73FF;
    color: #fff;
}

._fc-m-tools {
    height: 40px;
    align-items: center;
    display: flex;
    justify-content: flex-end;
    border: 1px solid #ECECEC;
    border-top: 0 none;
}

._fc-m-tools button.el-button {
    padding: 5px 14px;
    display: flex;
    align-items: center;
}

._fc-m-tools .fc-icon {
    font-size: 14px;
    margin-right: 2px;
}

._fc-r .el-tabs__nav-wrap::after {
    height: 1px;
    background-color: #ECECEC;
}

._fc-r ._fc-r-tabs {
    display: flex;
    padding: 0;
    border-bottom: 1px solid #ECECEC;
}

._fc-r ._fc-r-tab {
    height: 40px;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    font-weight: 600;
    color: #303133;
    position: relative;
    flex: 1;
    text-align: center;
}

._fc-r ._fc-r-tab.active {
    color: #409EFF;
    border-bottom: 2px solid #409EFF;
}

.drag-box {
    min-height: 60px;
    width: 100%;
}

._fc-m-drag {
    overflow: auto;
    padding: 2px;
    box-sizing: border-box;
}

._fc-m-drag, .draggable-drag {
    background: #fff;
    height: 100%;
    position: relative;
}

._fc-m-drag > form, ._fc-m-drag > form > .el-row {
    height: 100%;
}
</style>

<template>
    <ElContainer class="_fc-designer" :style="'height:'+dragHeight">
        <ElMain>
            <ElContainer style="height: 100%;">
                <el-aside class="_fc-l" width="266px">
                    <template v-for="(item, index) in menuList" :key="index">
                        <div class="_fc-l-group">
                            <h4 class="_fc-l-title">{{ item.title }}</h4>
                            <draggable :group="{name:'default', pull:'clone',put:false}" :sort="false"
                                       itemKey="name"
                                       :list="item.list">
                                <template #item="{element}">
                                    <div class="_fc-l-item">
                                        <div class="_fc-l-icon">
                                            <i class="fc-icon" :class="element.icon || 'icon-input'"></i>
                                        </div>
                                        <span class="_fc-l-name">{{
                                                t('components.' + element.name + '.name') || element.label
                                            }}</span>
                                    </div>
                                </template>
                            </draggable>
                        </div>
                    </template>
                </el-aside>
                <ElContainer class="_fc-m">
                    <el-header class="_fc-m-tools" height="45">
                        <slot name="handle"></slot>
                        <el-button type="primary" plain round size="small"
                                   @click="previewFc"><i class="fc-icon icon-preview"></i> {{ t('designer.preview') }}
                        </el-button>
                        <el-popconfirm
                            :title="t('designer.clearConfirmTitle')"
                            width="200px"
                            :confirm-button-text="t('designer.clearConfirm')"
                            :cancel-button-text="t('designer.clearCancel')"
                            @confirm="clearDragRule">
                            <template #reference>
                                <el-button type="danger" plain round size="small"><i
                                    class="fc-icon icon-delete"></i>{{ t('designer.clear') }}
                                </el-button>
                            </template>
                        </el-popconfirm>

                    </el-header>
                    <ElMain style="background: #F5F5F5;padding: 20px;">
                        <div class="_fc-m-drag">
                            <DragForm :rule="dragForm.rule" :option="form.value"
                                      v-model:api="dragForm.api"></DragForm>
                        </div>
                    </ElMain>
                </ElContainer>
                <ElAside class="_fc-r" width="320px">
                    <ElContainer style="height: 100%;">
                        <el-header height="40px" class="_fc-r-tabs">
                            <div class="_fc-r-tab" :class="{active: activeTab==='props'}" v-if="!!activeRule"
                                 @click="activeTab='props'"> {{ t('designer.config.component') }}
                            </div>
                            <div class="_fc-r-tab" :class="{active: activeTab==='form' && !!activeRule}"
                                 @click="activeTab='form'">{{ t('designer.config.form') }}
                            </div>
                        </el-header>
                        <ElMain v-show="activeTab==='form'">
                            <DragForm :rule="form.rule" :option="form.option"
                                      v-model="form.value.form" v-model:api="form.api"></DragForm>
                        </ElMain>
                        <ElMain v-show="activeTab==='props'" style="padding: 0 20px;"
                                :key="activeRule ? activeRule._id: ''">
                            <div>
                                <ElDivider v-if="showBaseRule">{{ t('designer.config.rule') }}</ElDivider>
                                <DragForm v-show="showBaseRule" v-model:api="baseForm.api"
                                          :rule="baseForm.rule"
                                          :option="baseForm.options"
                                          @change="baseChange"></DragForm>
                                <ElDivider>{{ t('designer.config.props') }}</ElDivider>
                                <DragForm v-model:api="propsForm.api" :rule="propsForm.rule"
                                          :option="propsForm.options"
                                          @change="propChange" @removeField="propRemoveField"></DragForm>
                                <ElDivider v-if="showBaseRule">{{ t('designer.config.validate') }}</ElDivider>
                                <DragForm v-show="showBaseRule" v-model:api="validateForm.api"
                                          :rule="validateForm.rule"
                                          :option="validateForm.options"
                                          @update:modelValue="validateChange"></DragForm>
                            </div>
                        </ElMain>
                    </ElContainer>
                </ElAside>
                <ElDialog v-model="preview.state" width="800px" append-to-body>
                    <ViewForm :rule="preview.rule" :option="preview.option" v-if="preview.state"></ViewForm>
                </ElDialog>
            </ElContainer>
        </ElMain>
    </ElContainer>
</template>

<style>

</style>

<script>

import form from '../config/base/form';
import field from '../config/base/field';
import validate from '../config/base/validate';
import {deepCopy} from '@form-create/utils/lib/deepextend';
import is, {hasProperty} from '@form-create/utils/lib/type';
import {lower} from '@form-create/utils/lib/tocase';
import ruleList from '../config/rule';
import draggable from 'vuedraggable/src/vuedraggable';
import createMenu from '../config/menu';
import {upper, useLocale} from '../utils/index';
import {designerForm} from '../utils/form';
import viewForm from '../utils/form';
import {computed, reactive, toRefs, ref, getCurrentInstance, provide, nextTick, watch, defineComponent} from 'vue';

export default defineComponent({
    name: 'FcDesigner',
    components: {
        draggable,
        DragForm: designerForm.$form(),
        ViewForm: viewForm.$form(),
    },
    props: ['menu', 'height', 'config', 'mask', 'locale'],
    setup(props) {
        const {menu, height, config, mask, locale} = toRefs(props);
        const vm = getCurrentInstance();
        provide('fcx', ref({active: null}));
        provide('designer', vm);

        const dragHeight = computed(() => {
            const h = height.value;
            if (!h) return '100%';
            return is.Number(h) ? `${h}px` : h;
        })
        const t = useLocale(locale).t;
        const data = reactive({
            cacheProps: {},
            moveRule: null,
            addRule: null,
            added: null,
            activeTab: 'form',
            activeRule: null,
            children: ref([]),
            menuList: menu.value || createMenu({t}),
            showBaseRule: false,
            visible: {
                preview: false
            },
            preview: {
                state: false,
                rule: [],
                option: {}
            },
            dragForm: ref({
                rule: [],
                api: {},
            }),
            form: {
                rule: form({t}),
                api: {},
                option: {
                    form: {
                        labelPosition: 'top',
                        size: 'small'
                    },
                    submitBtn: false
                },
                value: {
                    form: {
                        inline: false,
                        hideRequiredAsterisk: false,
                        labelPosition: 'right',
                        size: 'small',
                        labelWidth: '125px',
                        formCreateSubmitBtn: true,
                        formCreateResetBtn: false
                    },
                    submitBtn: false
                }
            },
            baseForm: {
                rule: field({t}),
                api: {},
                options: {
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
            validateForm: {
                rule: validate({t}),
                api: {},
                options: {
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
                rule: [],
                api: {},
                options: {
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
            }
        });

        watch(() => data.preview.state, function (n) {
            if (!n) {
                nextTick(() => {
                    data.preview.rule = data.preview.option = null;
                });
            }
        })

        watch(() => locale.value, () => {
            const formVal = data.form.api.formData && data.form.api.formData();
            const baseFormVal = data.baseForm.api.formData && data.baseForm.api.formData();
            const validateFormVal = data.validateForm.api.formData && data.validateForm.api.formData();
            data.validateForm.rule = validate({t});
            data.baseForm.rule = field({t});
            data.form.rule = form({t});
            nextTick(() => {
                formVal && data.form.api.setValue(formVal);
                baseFormVal && data.baseForm.api.setValue(baseFormVal);
                validateFormVal && data.validateForm.api.setValue(validateFormVal);
            });
        });

        const methods = {
            makeChildren(children) {
                return reactive({children}).children;
            },
            addMenu(config) {
                if (!config.name || !config.list) return;
                let flag = true;
                data.menuList.forEach((v, i) => {
                    if (v.name === config.name) {
                        data.menuList[i] = config
                        flag = false;
                    }
                });
                if (flag) {
                    data.menuList.push(config);
                }
            },
            removeMenu(name) {
                [...data.menuList].forEach((v, i) => {
                    if (v.name === name) {
                        data.menuList.splice(i, 1);
                    }
                });
            },
            setMenuItem(name, list) {
                data.menuList.forEach(v => {
                    if (v.name === name) {
                        v.list = list;
                    }
                });
            },
            appendMenuItem(name, item) {
                data.menuList.forEach(v => {
                    if (v.name === name) {
                        v.list.push(item);
                    }
                });
            },
            removeMenuItem(item) {
                data.menuList.forEach(v => {
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
                        ruleList[v.name] = v;
                    });
                } else {
                    ruleList[component.name] = component;
                }
            },
            getParent(rule) {
                let parent = rule.__fc__.parent.rule;
                const config = parent.config;
                if (config && config.config.inside) {
                    rule = parent;
                    parent = parent.__fc__.parent.rule;
                }
                return {root: parent, parent: rule};
            },
            makeDrag(group, tag, children, on) {
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
                                group: group === true ? 'default' : group,
                                ghostClass: 'ghost',
                                animation: 150,
                                handle: '._fc-drag-btn',
                                emptyInsertThreshold: 0,
                                direction: 'vertical',
                                itemKey: 'type',
                            }
                        },
                        tag,
                    },
                    children,
                    on
                };
            },
            clearDragRule() {
                methods.setRule([]);
            },
            makeDragRule(children) {
                return methods.makeChildren([methods.makeDrag(true, 'draggable', children, {
                    add: (inject, evt) => methods.dragAdd(children, evt),
                    end: (inject, evt) => methods.dragEnd(children, evt),
                    start: (inject, evt) => methods.dragStart(children, evt),
                    unchoose: (inject, evt) => methods.dragUnchoose(children, evt),
                })]);
            },
            previewFc() {
                data.preview.state = true;
                data.preview.rule = methods.getRule();
                data.preview.option = methods.getOption();
            },
            getRule() {
                return methods.parseRule(deepCopy(data.dragForm.api.rule[0].children));
            },
            getJson() {
                return designerForm.toJson(methods.getRule());
            },
            getOption() {
                const option = deepCopy(data.form.value);
                option.submitBtn = {
                    show: option.form.formCreateSubmitBtn,
                    innerText: t('form.submit'),
                };
                option.resetBtn = {
                    show: option.form.formCreateResetBtn,
                    innerText: t('form.reset'),
                };
                delete option.form.formCreateSubmitBtn;
                delete option.form.formCreateResetBtn;
                return option;
            },
            setRule(rules) {
                if (!rules) {
                    rules = [];
                }
                data.children = methods.makeChildren(methods.loadRule(is.String(rules) ? designerForm.parseJson(rules) : deepCopy(rules)));
                methods.clearActiveRule();
                data.dragForm.rule = methods.makeDragRule(data.children);
            },
            clearActiveRule() {
                data.activeRule = null;
                data.activeTab = 'form';
            },
            setOption(opt) {
                let option = {...opt};
                option.form.formCreateSubmitBtn = !!option.submitBtn;
                option.form.formCreateResetBtn = !!option.resetBtn;
                option.submitBtn = false;
                delete option.resetBtn;
                data.form.value = option;
            },
            loadRule(rules) {
                const loadRule = [];
                rules.forEach(rule => {
                    if (is.String(rule)) {
                        return loadRule.push(rule);
                    }
                    const config = ruleList[rule._fc_drag_tag] || ruleList[rule.type];
                    const _children = rule.children;
                    rule.children = [];
                    if (rule.control) {
                        rule._control = rule.control;
                        delete rule.control;
                    }
                    if (config) {
                        rule = methods.makeRule(config, rule);
                        if (_children) {
                            let children = rule.children[0].children;

                            if (config.drag) {
                                children = children[0].children;
                            }
                            children.push(...methods.loadRule(_children));
                        }
                    } else if (_children) {
                        rule.children = methods.loadRule(_children);
                    }
                    loadRule.push(rule);
                });
                return loadRule;
            },
            parseRule(children) {
                return [...children].reduce((initial, rule) => {
                    if (is.String(rule)) {
                        initial.push(rule);
                        return initial;
                    } else if (rule.type === 'DragBox') {
                        initial.push(...methods.parseRule(rule.children));
                        return initial;
                    } else if (rule.type === 'DragTool') {
                        rule = rule.children[0];
                        if (rule.type === 'DragBox') {
                            initial.push(...methods.parseRule(rule.children));
                            return initial;
                        }
                    }
                    if (!rule) return initial;
                    rule = {...rule};
                    if (rule.children.length) {
                        rule.children = methods.parseRule(rule.children);
                    }

                    delete rule._id;
                    delete rule.key;
                    if (rule.config) {
                        delete rule.config.config;
                    }
                    if (rule.effect) {
                        delete rule.effect._fc;
                        delete rule.effect._fc_tool;
                    }
                    if (rule._control) {
                        rule.control = rule._control;
                        delete rule._control;
                    }
                    Object.keys(rule).filter(k => (Array.isArray(rule[k]) && rule[k].length === 0) || (is.Object(rule[k]) && Object.keys(rule[k]).length === 0)).forEach(k => {
                        delete rule[k];
                    });
                    initial.push(rule);
                    return initial;
                }, []);
            },
            baseChange(field, value, _, fapi) {
                if (data.activeRule && fapi[data.activeRule._id] === data.activeRule) {
                    data.activeRule[field] = value;
                    data.activeRule.config.config?.watch?.['$' + field]?.({
                        field,
                        value,
                        api: fapi,
                        rule: data.activeRule
                    });
                }
            },
            propRemoveField(field, _, fapi) {
                if (data.activeRule && fapi[data.activeRule._id] === data.activeRule) {
                    const org = field;
                    data.dragForm.api.sync(data.activeRule);
                    if (field.indexOf('formCreate') === 0) {
                        field = field.replace('formCreate', '');
                        if (!field) return;
                        field = lower(field);
                        if (field.indexOf('effect') === 0 && field.indexOf('>') > -1) {
                            delete data.activeRule.effect[field.split('>')[1]];
                        } else if (field.indexOf('props') === 0 && field.indexOf('>') > -1) {
                            delete data.activeRule.props[field.split('>')[1]];
                        } else if (field === 'child') {
                            delete data.activeRule.children[0];
                        } else if (field) {
                            data.activeRule[field] = undefined;
                        }
                    } else {
                        delete data.activeRule.props[field];
                    }
                    data.activeRule.config.config?.watch?.[org]?.({
                        field: org,
                        value: undefined,
                        api: fapi,
                        rule: data.activeRule
                    });
                }
            },
            propChange(field, value, _, fapi) {
                if (data.activeRule && fapi[data.activeRule._id] === data.activeRule) {
                    const org = field;
                    if (field.indexOf('formCreate') === 0) {
                        field = field.replace('formCreate', '');
                        if (!field) return;
                        field = lower(field);
                        if (field.indexOf('effect') === 0 && field.indexOf('>') > -1) {
                            data.activeRule.effect[field.split('>')[1]] = value;
                        } else if (field.indexOf('props') === 0 && field.indexOf('>') > -1) {
                            data.activeRule.props[field.split('>')[1]] = value;
                        } else if (field === 'child') {
                            data.activeRule.children[0] = value;
                        } else {
                            data.activeRule[field] = value;
                        }
                    } else {
                        data.activeRule.props[field] = value;
                    }
                    data.activeRule.config.config?.watch?.[org]?.({
                        field: org,
                        value,
                        api: fapi,
                        rule: data.activeRule
                    });
                }
            },
            validateChange(formData) {
                if (!data.activeRule || data.validateForm.api[data.activeRule._id] !== data.activeRule) return;
                data.activeRule.validate = formData.validate || [];
                data.dragForm.api.refreshValidate();
                data.dragForm.api.nextTick(() => {
                    data.dragForm.api.clearValidateState(data.activeRule.field);
                });
            },
            toolActive(rule) {
                if (data.activeRule) {
                    delete data.propsForm.api[data.activeRule._id];
                    delete data.baseForm.api[data.activeRule._id];
                    delete data.validateForm.api[data.activeRule._id];
                    delete data.dragForm.api.activeRule;
                }
                data.activeRule = rule;
                data.dragForm.api.activeRule = rule;

                nextTick(() => {
                    data.activeTab = 'props';
                    nextTick(() => {
                        data.propsForm.api[data.activeRule._id] = data.activeRule;
                        data.baseForm.api[data.activeRule._id] = data.activeRule;
                        data.validateForm.api[data.activeRule._id] = data.activeRule;
                    });
                });

                if (!data.cacheProps[rule._id]) {
                    data.cacheProps[rule._id] = rule.config.config.props(rule, {t, api: data.dragForm.api});
                }

                data.propsForm.rule = data.cacheProps[rule._id];

                const formData = {...rule.props, formCreateChild: rule.children[0]};
                Object.keys(rule).forEach(k => {
                    if (['effect', 'config', 'payload', 'id', 'type'].indexOf(k) < 0)
                        formData['formCreate' + upper(k)] = rule[k];
                });
                ['props', 'effect'].forEach(name => {
                    rule[name] && Object.keys(rule[name]).forEach(k => {
                        formData['formCreate' + upper(name) + '>' + k] = rule[name][k];
                    });
                });
                data.propsForm.options.formData = formData;

                data.showBaseRule = hasProperty(rule, 'field') && rule.input !== false && (!config.value || config.value.showBaseForm !== false);

                if (data.showBaseRule) {
                    data.baseForm.options.formData = {
                        field: rule.field,
                        title: rule.title || '',
                        info: rule.info,
                        _control: rule._control,
                    };

                    data.validateForm.options.formData = {validate: rule.validate ? [...rule.validate] : []};
                }
            },
            dragStart(children) {
                data.moveRule = children;
                data.added = false;
            },
            dragUnchoose(children, evt) {
                data.addRule = {
                    children,
                    oldIndex: evt.oldIndex
                };
            },
            dragAdd(children, evt) {
                const newIndex = evt.newIndex;
                const menu = evt.item._underlying_vm_;
                if (!menu || menu.__fc__) {
                    if (data.addRule) {
                        const rule = data.addRule.children.splice(data.addRule.oldIndex, 1);
                        children.splice(newIndex, 0, rule[0]);
                    }
                } else {
                    const rule = methods.makeRule(ruleList[menu.name]);
                    children.splice(newIndex, 0, rule);
                }
                data.added = true;
                // data.dragForm.api.refresh();
            },
            dragEnd(children, {newIndex, oldIndex}) {
                if (!data.added && !(data.moveRule === children && newIndex === oldIndex)) {
                    const rule = data.moveRule.splice(oldIndex, 1);
                    children.splice(newIndex, 0, rule[0]);
                }
                data.moveRule = null;
                data.addRule = null;
                data.added = false;
                // data.dragForm.api.refresh();
            },
            makeRule(config, _rule) {
                const rule = _rule || config.rule({t});
                rule.config = {config};
                if (!rule.effect) rule.effect = {};
                rule.effect._fc = true;
                rule._fc_drag_tag = config.name;

                let drag;

                if (config.drag) {
                    rule.children.push(drag = methods.makeDrag(config.drag, rule.type, methods.makeChildren([]), {
                        end: (inject, evt) => methods.dragEnd(inject.self.children, evt),
                        add: (inject, evt) => methods.dragAdd(inject.self.children, evt),
                        start: (inject, evt) => methods.dragStart(inject.self.children, evt),
                        unchoose: (inject, evt) => methods.dragUnchoose(inject.self.children, evt),
                    }));
                }

                if (config.children && !_rule) {
                    const child = methods.makeRule(ruleList[config.children]);
                    (drag || rule).children.push(child);
                }

                const dragMask = mask.value !== undefined ? mask.value !== false : config.mask !== false;

                if (config.inside) {
                    rule.children = methods.makeChildren([{
                        type: 'DragTool',
                        props: {
                            dragBtn: config.dragBtn !== false,
                            children: config.children,
                            mask: dragMask,
                        },
                        effect: {
                            _fc_tool: true
                        },
                        inject: true,
                        on: {
                            delete: ({self}) => {
                                const parent = methods.getParent(self).parent;
                                parent.__fc__.rm();
                                vm.emit('delete', parent);
                                methods.clearActiveRule();
                            },
                            create: ({self}) => {
                                const top = methods.getParent(self);
                                vm.emit('create', top.parent);
                                top.root.children.splice(top.root.children.indexOf(top.parent) + 1, 0, methods.makeRule(top.parent.config.config));
                            },
                            addChild: ({self}) => {
                                const top = methods.getParent(self);
                                const config = top.parent.config.config;
                                const item = ruleList[config.children];
                                if (!item) return;
                                (!config.drag ? top.parent : top.parent.children[0]).children[0].children.push(methods.makeRule(item));
                            },
                            copy: ({self}) => {
                                const top = methods.getParent(self);
                                vm.emit('copy', top.parent);
                                top.root.children.splice(top.root.children.indexOf(top.parent) + 1, 0, designerForm.copyRule(top.parent));
                            },
                            active: ({self}) => {
                                const top = methods.getParent(self);
                                vm.emit('active', top.parent);
                                methods.toolActive(top.parent);
                            }
                        },
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
                        },
                        effect: {
                            _fc_tool: true
                        },
                        inject: true,
                        on: {
                            delete: ({self}) => {
                                vm.emit('delete', self.children[0]);
                                self.__fc__.rm();
                                methods.clearActiveRule();
                            },
                            create: ({self}) => {
                                vm.emit('create', self.children[0]);
                                const top = methods.getParent(self);
                                top.root.children.splice(top.root.children.indexOf(top.parent) + 1, 0, methods.makeRule(self.children[0].config.config));
                            },
                            addChild: ({self}) => {
                                const config = self.children[0].config.config;
                                const item = ruleList[config.children];
                                if (!item) return;
                                (!config.drag ? self : self.children[0]).children[0].children.push(methods.makeRule(item));
                            },
                            copy: ({self}) => {
                                vm.emit('copy', self.children[0]);
                                const top = methods.getParent(self);
                                top.root.children.splice(top.root.children.indexOf(top.parent) + 1, 0, designerForm.copyRule(top.parent));
                            },
                            active: ({self}) => {
                                vm.emit('active', self.children[0]);
                                methods.toolActive(self.children[0]);
                            }
                        },
                        children: methods.makeChildren([rule])
                    };
                }
            },
        }
        data.dragForm.rule = methods.makeDragRule(methods.makeChildren(data.children));
        return {
            ...toRefs(data), ...methods, dragHeight, t
        }
    },
    created() {
        document.body.ondrop = e => {
            e.preventDefault();
            e.stopPropagation();
        };
    }
});
</script>
