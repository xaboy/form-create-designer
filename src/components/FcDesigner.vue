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
    <ElContainer class="_fc-designer" :style="'height:'+height_">
        <ElMain>
            <ElContainer style="height: 100%;">
                <el-aside class="_fc-l" width="266px">
                    <template v-for="(item, index) in menuList">
                        <div class="_fc-l-group" :key="index">
                            <h4 class="_fc-l-title">{{ item.title }}</h4>
                            <draggable :group="{name:'default', pull:'clone',put:false}" :sort="false"
                                       :list="item.list">
                                <div class="_fc-l-item" v-for="(data, index) in item.list"
                                     :key="index">
                                    <div class="_fc-l-icon">
                                        <i :class="[data.icon ? (data.icon.substring(0,3) === 'el-' ? data.icon : 'fc-icon '+data.icon) : 'fc-icon icon-input']"></i>
                                    </div>
                                    <span class="_fc-l-name">{{ data.label }}</span>
                                </div>
                            </draggable>
                        </div>
                    </template>
                </el-aside>
                <ElContainer class="_fc-m">
                    <el-header class="_fc-m-tools" height="45">
                        <slot name="handle"></slot>
                        <el-button type="primary" icon="fc-icon icon-preview" plain round size="mini"
                                   @click="previewFc">预 览
                        </el-button>
                        <el-popconfirm
                            title="清空后将不能恢复，确定要清空吗？"
                            style="margin-left: 10px;"
                            confirm-button-text="清空"
                            cancel-button-text="取消"
                            @confirm="clearDragRule"
                        >
                            <el-button slot="reference" type="danger" icon="fc-icon icon-delete" plain round size="mini">清 空
                            </el-button>
                        </el-popconfirm>

                    </el-header>
                    <ElMain style="background: #F5F5F5;padding: 20px;">
                        <div class="_fc-m-drag">
                            <component :is="FormCreate" :rule="dragForm.rule" :option="form.value"
                                        v-model="dragForm.api"></component>
                        </div>
                    </ElMain>
                </ElContainer>
                <ElAside class="_fc-r" width="320px" v-if="!config || config.showConfig !== false">
                    <ElContainer style="height: 100%;">
                        <el-header height="40px" class="_fc-r-tabs">
                            <div class="_fc-r-tab" :class="{active: activeTab==='props'}" v-if="!!activeRule || (config && config.showFormConfig === false)"
                                 @click="activeTab='props'">组件配置
                            </div>
                            <div class="_fc-r-tab" v-if="!config || config.showFormConfig !== false" :class="{active: activeTab==='form' && !!activeRule}"
                                 @click="activeTab='form'">表单配置
                            </div>
                        </el-header>
                        <ElMain v-show="activeTab==='form'" v-if="!config || config.showFormConfig !== false">
                            <component :is="FormCreate" :rule="form.rule" :option="form.option"
                                        :value.sync="form.value.form"></component>
                        </ElMain>
                        <ElMain v-show="activeTab==='props'" style="padding: 0 20px;"
                                :key="activeRule ? activeRule._id: ''">
                            <div>
                                <ElDivider v-if="showBaseRule">基础配置</ElDivider>
                                <component :is="FormCreate" v-show="showBaseRule" v-model="baseForm.api" :rule="baseForm.rule"
                                            :option="baseForm.options"
                                            @change="baseChange"></component>
                                <ElDivider>属性配置</ElDivider>
                                <component :is="FormCreate" v-model="propsForm.api" :rule="propsForm.rule" :option="propsForm.options"
                                            @change="propChange" @removeField="propRemoveField"></component>
                                <ElDivider v-if="showBaseRule">验证规则</ElDivider>
                                <component :is="FormCreate" v-show="showBaseRule" v-model="validateForm.api" :rule="validateForm.rule"
                                            :option="validateForm.options"
                                            @update:value="validateChange"></component>
                            </div>
                        </ElMain>
                    </ElContainer>
                </ElAside>
                <ElDialog :visible.sync="preview.state" width="800px" append-to-body>
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
import draggable from 'vuedraggable';
import createMenu from '../config/menu';
import {upper} from '../utils/index';
import {designerForm} from '../utils/form';
import viewForm from '../utils/form';


export default {
    name: 'FcDesigner',
    components: {
        draggable,
        ViewForm: viewForm.$form(),
    },
    props: ['menu', 'height', 'config', 'mask'],
    computed: {
        height_() {
            const h = this.height;
            if (!h) return '100%';
            return is.Number(h) ? `${h}px` : h;
        }
    },
    provide() {
        return {
            fcx: {
                active: null
            },
            designer: this,
        };
    },
    data() {
        const children = [];
        return {
            FormCreate: designerForm.$form(),
            cacheProps: {},
            moveRule: null,
            addRule: null,
            added: null,
            activeTab: 'form',
            activeRule: null,
            children,
            menuList: this.menu || createMenu(),
            showBaseRule: false,
            visible: {
                preview: false
            },
            preview: {
                state: false,
                rule: [],
                option: {}
            },
            dragForm: {
                rule: this.makeDragRule(children),
                api: {},
            },
            form: {
                rule: form(),
                option: {
                    form: {
                        labelPosition: 'top',
                        size: 'mini'
                    },
                    submitBtn: false
                },
                value: {
                    form: {
                        inline: false,
                        hideRequiredAsterisk: false,
                        labelPosition: 'right',
                        size: 'mini',
                        labelWidth: '125px',
                        formCreateSubmitBtn: true,
                        formCreateResetBtn: false
                    },
                    submitBtn: false
                }
            },
            baseForm: {
                rule: field(),
                api: {},
                options: {
                    form: {
                        labelPosition: 'top',
                        size: 'mini'
                    },
                    submitBtn: false,
                    mounted: (fapi) => {
                        fapi.activeRule = this.activeRule;
                        fapi.setValue(fapi.options.formData || {});
                    }
                }
            },
            validateForm: {
                rule: validate(),
                api: {},
                options: {
                    form: {
                        labelPosition: 'top',
                        size: 'mini'
                    },
                    submitBtn: false,
                    mounted: (fapi) => {
                        fapi.activeRule = this.activeRule;
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
                        size: 'mini'
                    },
                    submitBtn: false,
                    mounted: (fapi) => {
                        fapi.activeRule = this.activeRule;
                        fapi.setValue(fapi.options.formData || {});
                    }
                }
            },
        };
    },
    watch: {
        'preview.state': function (n) {
            if (!n) {
                this.$nextTick(() => {
                    this.preview.rule = this.preview.option = null;
                });
            }
        }
    },
    methods: {
        addMenu(config) {
            if (!config.name || !config.list) return;
            let flag = true;
            this.menuList.forEach((v, i) => {
                if (v.name === config.name) {
                    this.$set(this.menuList, i, config);
                    flag = false;
                }
            });
            if (flag) {
                this.menuList.push(config);
            }
        },
        removeMenu(name) {
            [...this.menuList].forEach((v, i) => {
                if (v.name === name) {
                    this.menuList.splice(i, 1);
                }
            });
        },
        setMenuItem(name, list) {
            this.menuList.forEach(v => {
                if (v.name === name) {
                    v.list = list;
                }
            });
        },
        appendMenuItem(name, item) {
            this.menuList.forEach(v => {
                if (v.name === name) {
                    v.list.push(item);
                }
            });
        },
        removeMenuItem(item) {
            this.menuList.forEach(v => {
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
        addComponent(data) {
            if (Array.isArray(data)) {
                data.forEach(v => {
                    ruleList[v.name] = v;
                });
            } else {
                ruleList[data.name] = data;
            }
        },
        dragStart(children) {
            this.moveRule = children;
            this.added = false;
        },
        dragUnchoose(children, evt) {
            this.addRule = {
                children,
                oldIndex: evt.oldIndex
            };
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
        makeDrag(group, tag, children, on, subRule) {
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
                            tag: 'el-col'
                        },
                        attrs: {
                            group: group === true ? 'default' : group,
                            ghostClass: 'ghost',
                            animation: 150,
                            handle: '._fc-drag-btn',
                            emptyInsertThreshold: 0,
                            direction: 'vertical',
                        }
                    },
                    subRule: subRule || {
                        props: {
                            name: 'fade',
                            tag: 'div'
                        },
                    },
                    tag,
                },
                children,
                on
            };
        },
        clearDragRule() {
            this.setRule([]);
        },
        makeDragRule(children) {
            return [this.makeDrag(true, 'draggable', children, {
                add: (inject, evt) => this.dragAdd(children, evt),
                end: (inject, evt) => this.dragEnd(children, evt),
                start: (inject, evt) => this.dragStart(children, evt),
                unchoose: (inject, evt) => this.dragUnchoose(children, evt),
            }, {
                props: {
                    name: 'fade',
                    tag: 'div'
                }
            })];
        },
        previewFc() {
            this.preview.state = true;
            this.preview.rule = this.getRule();
            this.preview.option = this.getOption();
        },
        getRule() {
            return this.parseRule(deepCopy(this.dragForm.api.rule[0].children));
        },
        getJson() {
            return designerForm.toJson(this.getRule());
        },
        getOption() {
            const option = deepCopy(this.form.value);
            option.submitBtn = option._submitBtn;
            option.resetBtn = option._resetBtn;
            if (typeof option.submitBtn === 'object') {
                option.submitBtn.show = option.form.formCreateSubmitBtn;
            } else {
                option.submitBtn = option.form.formCreateSubmitBtn;
            }
            if (typeof option.resetBtn === 'object') {
                option.resetBtn.show = option.form.formCreateResetBtn;
            } else {
                option.resetBtn = option.form.formCreateResetBtn;
            }
            delete option.form.formCreateSubmitBtn;
            delete option.form.formCreateResetBtn;
            delete option._submitBtn;
            delete option._resetBtn;
            return option;
        },
        getOptions() {
            return this.getOption();
        },
        setRule(rules) {
            const children = this.loadRule(is.String(rules) ? designerForm.parseJson(rules) : rules);
            this.children = children;
            this.clearActiveRule();
            this.dragForm.rule = this.makeDragRule(children);
        },
        clearActiveRule() {
            this.activeRule = null;
            this.activeTab = 'form';
        },
        setOption(data) {
            let option = {...data};
            option.form.formCreateSubmitBtn = typeof option.submitBtn === 'object' ? (option.submitBtn.show === undefined ? true : !!option.submitBtn.show) : !!option.submitBtn;
            option.form.formCreateResetBtn = typeof option.resetBtn === 'object' ? !!option.resetBtn.show : !!option.resetBtn;
            option._resetBtn = option.resetBtn;
            option.resetBtn = false;
            option._submitBtn = option.submitBtn;
            option.submitBtn = false;
            this.form.value = option;
        },
        setOptions(data) {
            this.setOption(data);
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
                    rule = this.makeRule(config, rule);
                    if (_children) {
                        let children = rule.children[0].children;

                        if (config.drag) {
                            children = children[0].children;
                        }
                        children.push(...this.loadRule(_children));
                    }
                } else if (_children) {
                    rule.children = this.loadRule(_children);
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
                    initial.push(...this.parseRule(rule.children));
                    return initial;
                } else if (rule.type === 'DragTool') {
                    rule = rule.children[0];
                    if (rule.type === 'DragBox') {
                        initial.push(...this.parseRule(rule.children));
                        return initial;
                    }
                }
                if (!rule) return initial;
                rule = {...rule};
                if (rule.children.length) {
                    rule.children = this.parseRule(rule.children);
                }

                delete rule._id;
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
            if (this.activeRule && fapi[this.activeRule._id] === this.activeRule) {
                this.$set(this.activeRule, field, value);
            }
        },
        propRemoveField(field, _, fapi) {
            if (this.activeRule && fapi[this.activeRule._id] === this.activeRule) {
                this.dragForm.api.sync(this.activeRule);
                if (field.indexOf('formCreate') === 0) {
                    field = field.replace('formCreate', '');
                    if (!field) return;
                    field = lower(field);
                    if (field.indexOf('effect') === 0 && field.indexOf('>') > -1) {
                        this.$delete(this.activeRule.effect, field.split('>')[1]);
                    } else if (field.indexOf('props') === 0 && field.indexOf('>') > -1) {
                        this.$delete(this.activeRule.props, field.split('>')[1]);
                    } else if (field === 'child') {
                        this.$delete(this.activeRule.children, 0);
                    } else if (field) {
                        this.$set(this.activeRule, field, undefined);
                    }
                } else {
                    this.$delete(this.activeRule.props, field);
                }
            }
        },
        propChange(field, value, _, fapi) {
            if (this.activeRule && fapi[this.activeRule._id] === this.activeRule) {
                if (field.indexOf('formCreate') === 0) {
                    field = field.replace('formCreate', '');
                    if (!field) return;
                    field = lower(field);
                    if (field.indexOf('effect') === 0 && field.indexOf('>') > -1) {
                        this.$set(this.activeRule.effect, field.split('>')[1], value);
                    } else if (field.indexOf('props') === 0 && field.indexOf('>') > -1) {
                        this.$set(this.activeRule.props, field.split('>')[1], value);
                    } else if (field === 'child') {
                        this.$set(this.activeRule.children, 0, value);
                    } else {
                        this.$set(this.activeRule, field, value);
                    }
                } else {
                    this.$set(this.activeRule.props, field, value);
                }
            }
        },
        validateChange(formData) {
            if (!this.activeRule || this.validateForm.api[this.activeRule._id] !== this.activeRule) return;
            this.activeRule.validate = formData.validate || [];
            this.dragForm.api.refreshValidate();
            this.dragForm.api.nextTick(() => {
                this.dragForm.api.clearValidateState(this.activeRule.field);
            });
        },
        toolActive(rule) {
            if (this.activeRule) {
                delete this.propsForm.api[this.activeRule._id];
                delete this.baseForm.api[this.activeRule._id];
                delete this.validateForm.api[this.activeRule._id];
            }
            this.activeRule = rule;

            this.$nextTick(() => {
                this.activeTab = 'props';
                this.$nextTick(() => {
                    this.propsForm.api[this.activeRule._id] = this.activeRule;
                    this.baseForm.api[this.activeRule._id] = this.activeRule;
                    this.validateForm.api[this.activeRule._id] = this.activeRule;
                });
            });

            if (!this.cacheProps[rule._id]) {
                this.cacheProps[rule._id] = rule.config.config.props(rule);
            }

            this.propsForm.rule = this.cacheProps[rule._id];

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
            this.propsForm.options.formData = formData;

            this.showBaseRule = hasProperty(rule, 'field') && rule.input !== false && (!this.config || this.config.showBaseForm !== false);

            if (this.showBaseRule) {
                this.baseForm.options.formData = {
                    field: rule.field,
                    title: rule.title || '',
                    info: rule.info,
                    _control: rule._control,
                };

                this.validateForm.options.formData = {validate: rule.validate ? [...rule.validate] : []};
            }
        },
        dragAdd(children, evt) {
            const newIndex = evt.newIndex;
            const menu = evt.item._underlying_vm_;
            if (!menu) {
                if (this.addRule) {
                    const rule = this.addRule.children.splice(this.addRule.oldIndex, 1);
                    children.splice(newIndex, 0, rule[0]);
                }
            } else {
                const rule = this.makeRule(ruleList[menu.name]);
                children.splice(newIndex, 0, rule);
            }
            this.added = true;
        },
        dragEnd(children, {newIndex, oldIndex}) {
            if (!this.added && !(this.moveRule === children && newIndex === oldIndex)) {
                const rule = this.moveRule.splice(oldIndex, 1);
                children.splice(newIndex, 0, rule[0]);
            }
            this.moveRule = null;
            this.addRule = null;
            this.added = false;
        },
        makeRule(config, _rule) {
            const rule = _rule || config.rule();
            rule.config = {config};
            if (!rule.effect) rule.effect = {};
            rule.effect._fc = true;
            rule._fc_drag_tag = config.name;

            let drag;

            if (config.drag) {
                const children = [];
                rule.children.push(drag = this.makeDrag(config.drag, rule.type, children, {
                    end: (inject, evt) => this.dragEnd(inject.self.children, evt),
                    add: (inject, evt) => this.dragAdd(inject.self.children, evt),
                    start: (inject, evt) => this.dragStart(inject.self.children, evt),
                    unchoose: (inject, evt) => this.dragUnchoose(inject.self.children, evt),
                }));
            }

            if (config.children && !_rule) {
                for (let i = 0; i < (config.childrenLen || 1); i++) {
                    const child = this.makeRule(ruleList[config.children]);
                    (drag || rule).children.push(child);
                }
            }

            const mask = this.mask !== undefined ? this.mask !== false : config.mask !== false;

            if (config.inside) {
                rule.children = [{
                    type: 'DragTool',
                    props: {
                        dragBtn: config.dragBtn !== false,
                        children: config.children,
                        mask,
                    },
                    effect: {
                        _fc_tool: true
                    },
                    inject: true,
                    on: {
                        delete: ({self}) => {
                            const parent = this.getParent(self).parent;
                            parent.__fc__.rm();
                            this.$emit('delete', parent);
                            this.clearActiveRule();
                        },
                        add: ({self}) => {
                            const top = this.getParent(self);
                            this.$emit('add', top.parent);
                            top.root.children.splice(top.root.children.indexOf(top.parent) + 1, 0, this.makeRule(top.parent.config.config));
                        },
                        addChild: ({self}) => {
                            const top = this.getParent(self);
                            const config = top.parent.config.config;
                            const item = ruleList[config.children];
                            if (!item) return;
                            (!config.drag ? top.parent : top.parent.children[0]).children[0].children.push(this.makeRule(item));
                        },
                        copy: ({self}) => {
                            const top = this.getParent(self);
                            this.$emit('copy', top.parent);
                            top.root.children.splice(top.root.children.indexOf(top.parent) + 1, 0, designerForm.copyRule(top.parent));
                        },
                        active: ({self}) => {
                            const top = this.getParent(self);
                            this.$emit('active', top.parent);
                            this.toolActive(top.parent);
                        }
                    },
                    children: rule.children
                }];
                return rule;
            } else {
                return {
                    type: 'DragTool',
                    props: {
                        dragBtn: config.dragBtn !== false,
                        children: config.children,
                        mask,
                    },
                    effect: {
                        _fc_tool: true
                    },
                    inject: true,
                    on: {
                        delete: ({self}) => {
                            this.$emit('delete', self.children[0]);
                            self.__fc__.rm();
                            this.clearActiveRule();
                        },
                        add: ({self}) => {
                            this.$emit('add', self.children[0]);
                            const top = this.getParent(self);
                            top.root.children.splice(top.root.children.indexOf(top.parent) + 1, 0, this.makeRule(self.children[0].config.config));
                        },
                        addChild: ({self}) => {
                            const config = self.children[0].config.config;
                            const item = ruleList[config.children];
                            if (!item) return;
                            (!config.drag ? self : self.children[0]).children[0].children.push(this.makeRule(item));
                        },
                        copy: ({self}) => {
                            this.$emit('copy', self.children[0]);
                            const top = this.getParent(self);
                            top.root.children.splice(top.root.children.indexOf(top.parent) + 1, 0, designerForm.copyRule(top.parent));
                        },
                        active: ({self}) => {
                            this.$emit('active', self.children[0]);
                            this.toolActive(self.children[0]);
                        }
                    },
                    children: [rule]
                };
            }
        },
    },
    created() {
        document.body.ondrop = e => {
            e.preventDefault();
            e.stopPropagation();
        };
    }
};
</script>
