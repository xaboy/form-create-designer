<template>
    <template v-if="open">
        <div class="designer-config-panel">
            <div class="panel-container">
                <div class="panel-header-group">
                    <div class="panel-header">
                        <span class="panel-title">设计器配置</span>
                        <i class="fc-icon icon-add-circle collapse-icon" @click="open = false"></i>
                    </div>
                    <span
                        class="panel-description">控制设计器中的功能模块的显示与隐藏。这些配置可以帮助您根据业务需求定制设计器的界面和功能。</span>
                    <div class="divider-line"></div>
                </div>
                <div style="height: 80px;"></div>
                <!-- 多语言设置 -->
                <div class="section-header">
                    <span class="section-title">多语言设置 <a href="https://view.form-create.com/form-locale" target="_blank"><i class="fc-icon icon-question"></i></a></span>
                </div>
                <div class="theme-selector">
                    <template v-for="item in locale">
                        <div class="theme-option" :class="{active: item.value === activeLocale}"
                             @click="activeLocale = item.value">
                            <span class="theme-name">{{ item.label }}</span>
                        </div>
                    </template>
                </div>
                <div class="section-header">
                    <span class="section-title">功能设置 <a href="https://view.form-create.com/hidden-item" target="_blank"><i class="fc-icon icon-question"></i></a></span>
                </div>
                <div class="feature-block">
                    <template v-for="item in feature">
                        <div class="section-subtitle">
                            {{ item.label }}
                        </div>
                        <template v-for="child in item.children">
                            <div class="feature-item">
                                <div class="setting-item">
                                    <span class="item-title">{{ child.label }}
                                        <template v-if="child.img">
                                            <el-popover placement="top" :width="350" trigger="hover">
                                             <template #reference>
                                                <i class="fc-icon icon-question"></i>
                                             </template>
                                            <a href="https://view.form-create.com/hidden-module" target="_blank"><img
                                                class="item-img" :src="child.img" :alt="child.label"></a>
                                        </el-popover>
                                        </template>
                                    </span>
                                    <el-switch size="default" v-model="activeFeature[child.value]"></el-switch>
                                </div>
                            </div>
                        </template>
                    </template>
                </div>
                <!-- 菜单设置 -->
                <div class="section-header">
                    <span class="section-title">菜单设置 <a href="https://view.form-create.com/hidden-item" target="_blank"><i class="fc-icon icon-question"></i></a></span>
                </div>
                <div>
                    <template v-for="menu in menus">
                        <div class="setting-item">
                            <span class="section-subtitle">{{ menu.title }}</span>
                            <el-switch size="default" v-model="menu.open"></el-switch>
                        </div>
                        <div>
                            <el-checkbox-group class="template-grid" v-model="menu.checked" :disabled="!menu.open">
                                <template v-for="item in menu.list">
                                    <div class="grid-item">
                                        <el-checkbox :value="item.name" :label="item.name">{{
                                                item.label
                                            }}
                                        </el-checkbox>
                                    </div>
                                </template>
                            </el-checkbox-group>
                        </div>
                    </template>
                </div>
                <div class="section-header">
                    <span class="section-title">操作权限 <a href="https://view.form-create.com/component-permission" target="_blank"><i class="fc-icon icon-question"></i></a></span>
                </div>
                <div class="permission-block">
                    <template v-for="(com, idx) in componentPermission">
                        <div class="permission-item">
                            <el-select multiple clearable size="default" placeholder="请选择" v-model="com.tag" style="width: 100%">
                                <template v-for="item in items">
                                    <el-option :value="item.value" :label="item.label">{{ item.label }}</el-option>
                                </template>
                            </el-select>
                            <div class="permission-item-checkbox">
                                <el-checkbox-group class="template-grid" v-model="com.permission">
                                    <template v-for="item in permission">
                                        <div class="grid-item">
                                            <el-checkbox :value="item.value" :label="item.value">{{
                                                    item.label
                                                }}
                                            </el-checkbox>
                                        </div>
                                    </template>
                                </el-checkbox-group>
                            </div>
                            <i class="collapse-icon fc-icon icon-add-circle" v-if="componentPermission.length > 1"
                               @click="componentPermission.splice(idx, 1)"></i>
                        </div>
                    </template>
                    <div class="permission-add" @click="addPermission"><i class="fc-icon icon-add"></i> 添加权限</div>
                </div>
                <div class="section-header">
                    <span class="section-title">模板预览</span>
                </div>
                <div class="preview-block">
                    <div class="code-editor">{{ template }}</div>
                </div>
                <div style="height: 80px;"></div>
                <!-- 底部操作按钮 -->
                <div class="action-buttons">
                    <div class="action-button primary" @click="copy">
                        <span class="button-text"> <i class="fc-icon icon-group"></i> 复制配置</span>
                    </div>
                </div>
            </div>
        </div>

    </template>
    <template v-else>
        <div class="designer-config-float" @click="open=true">
            <svg fill="#fff" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20"
                 height="20">
                <path
                    d="M899.2 379.2a439.68 439.68 0 0 0-19.52-47.04 137.28 137.28 0 0 0-187.84-187.84 439.68 439.68 0 0 0-47.04-19.52 137.28 137.28 0 0 0-265.6 0 439.68 439.68 0 0 0-47.04 19.52 137.28 137.28 0 0 0-187.84 187.84 439.68 439.68 0 0 0-19.52 47.04 137.28 137.28 0 0 0 0 265.6 439.68 439.68 0 0 0 19.52 47.04 137.28 137.28 0 0 0 187.84 187.84 439.68 439.68 0 0 0 47.04 19.52 137.28 137.28 0 0 0 265.6 0 439.68 439.68 0 0 0 47.04-19.52 137.28 137.28 0 0 0 187.84-187.84 439.68 439.68 0 0 0 19.52-47.04 137.28 137.28 0 0 0 0-265.6z m-33.6 186.88a41.6 41.6 0 0 0-38.72 32 314.24 314.24 0 0 1-32 77.76 41.92 41.92 0 0 0 5.12 48A54.08 54.08 0 0 1 723.84 800a41.92 41.92 0 0 0-49.28-5.76 314.24 314.24 0 0 1-77.76 32 41.6 41.6 0 0 0-32 38.72 54.08 54.08 0 0 1-108.16 0 41.6 41.6 0 0 0-32-38.72 314.24 314.24 0 0 1-77.76-32 43.84 43.84 0 0 0-20.8-5.44 42.24 42.24 0 0 0-28.48 11.2A54.08 54.08 0 0 1 224 723.84a41.92 41.92 0 0 0 5.76-49.28 314.24 314.24 0 0 1-32-77.76 41.6 41.6 0 0 0-38.72-32 54.08 54.08 0 0 1 0-108.16 41.6 41.6 0 0 0 38.72-32 314.24 314.24 0 0 1 32-77.76A41.92 41.92 0 0 0 224 300.16 54.08 54.08 0 0 1 300.16 224a41.92 41.92 0 0 0 49.28 5.76 314.24 314.24 0 0 1 77.76-32 41.6 41.6 0 0 0 32-38.72 54.08 54.08 0 0 1 108.16 0 41.6 41.6 0 0 0 32 38.72 314.24 314.24 0 0 1 77.76 32A41.92 41.92 0 0 0 723.84 224 54.08 54.08 0 0 1 800 300.16a41.92 41.92 0 0 0-5.76 49.28 314.24 314.24 0 0 1 32 77.76 41.6 41.6 0 0 0 38.72 32 54.08 54.08 0 0 1 0 108.16z"></path>
                <path
                    d="M512 310.4a201.6 201.6 0 1 0 201.6 201.6A201.92 201.92 0 0 0 512 310.4z m0 320a118.4 118.4 0 1 1 118.4-118.4 118.4 118.4 0 0 1-118.4 118.4z"></path>
            </svg>
        </div>
    </template>
</template>

<script>
import {defineComponent} from 'vue'
import {copyTextToClipboard, toJSON} from '../../src/index.js';

export default defineComponent({
    name: 'ConfigPanel',
    props: {
        menus: Array,
    },
    emits: ['change'],
    data() {
        return {
            open: false,
            dark: false,
            init: false,
            activeTheme: 'blue',
            activeLocale: 'zh-cn',
            theme: ['blue', 'orange', 'green', 'purple', 'pink'],
            locale: [{value: 'zh-cn', label: '中文'}, {value: 'en', label: '英文'}],
            constants: {},
            componentPermission: [],
            permission: [
                {label: '可拖动', value: 'move'},
                {label: '可删除', value: 'delete'},
                {label: '可复制', value: 'copy'},
                {label: '可切换组件', value: 'switchType'},
                {label: '显示编码', value: 'name'},
                {label: '基础配置', value: 'base'},
                {label: '组件配置', value: 'props'},
                {label: '样式配置', value: 'style'},
                {label: '事件配置', value: 'event'},
                {label: '验证配置', value: 'validate'},
            ],
            feature: [
                {
                    label: '板块开关', children: [
                        {
                            label: '左侧边栏',
                            value: 'showMenuBar',
                            img: 'https://view.form-create.com/img/hidden1.png'
                        },
                        {
                            label: '多语言板块',
                            value: 'showLanguage',
                            img: 'https://view.form-create.com/img/version-550-2.png'
                        },
                        {
                            label: 'JSON预览板块',
                            value: 'showJsonPreview',
                            img: 'https://view.form-create.com/img/version-541-2.png'
                        },
                        {
                            label: '多端切换按钮',
                            value: 'showDevice',
                            img: 'https://view.form-create.com/img/showDevice.png'
                        },
                        {
                            label: '保存按钮',
                            value: 'showSaveBtn',
                            img: 'https://view.form-create.com/img/showSaveBtn.png'
                        },
                        {
                            label: '预览按钮',
                            value: 'showPreviewBtn',
                            img: 'https://view.form-create.com/img/hidden3.png'
                        },
                        {
                            label: '默认值按钮',
                            value: 'showInputData',
                            img: 'https://view.form-create.com/img/showInputData.png'
                        },
                        {
                            label: '右侧配置栏',
                            value: 'showConfig',
                            img: 'https://view.form-create.com/img/showConfig.png'
                        },
                    ],
                },
                {
                    label: '功能开关', children: [
                        {label: '快捷键', value: 'hotKey', img: 'https://view.form-create.com/img/hotkey.png'},
                        {
                            label: '复制组件时自动重置编码',
                            value: 'autoResetName',
                            img: 'https://view.form-create.com/img/showComponentName.png'
                        },
                        {
                            label: '字段ID可编辑',
                            value: 'fieldReadonly',
                            img: 'https://view.form-create.com/img/custom-field.png'
                        },
                        {
                            label: '组件编码可编辑',
                            value: 'nameReadonly',
                            img: 'https://pro.form-create.com/doc/img/custom-name.png'
                        },
                        {
                            label: '隐藏组件操作按钮',
                            value: 'hiddenDragMenu',
                            img: 'https://view.form-create.com/img/hiddenDragMenu.png'
                        },
                        {
                            label: '隐藏组件拖拽',
                            value: 'hiddenDragBtn',
                            img: 'https://view.form-create.com/img/hiddenDragBtn.png'
                        },
                        {
                            label: '关闭页面时确认弹窗',
                            value: 'exitConfirm',
                            img: 'https://view.form-create.com/img/exitConfirm.png'
                        },
                    ],
                },
                {
                    label: '配置开关', children: [
                        {
                            label: '表单配置',
                            value: 'showFormConfig',
                            img: 'https://view.form-create.com/img/showFormConfig.png'
                        },
                        {
                            label: '组件编码',
                            value: 'showComponentName',
                            img: 'https://view.form-create.com/img/showComponentName.png'
                        },
                        {
                            label: '组件基础配置',
                            value: 'showBaseForm',
                            img: 'https://view.form-create.com/img/showBaseForm.png'
                        },
                        {
                            label: '组件联动配置',
                            value: 'showControl',
                            img: 'https://view.form-create.com/img/showControl.png'
                        },
                        {
                            label: '组件自定义属性按钮',
                            value: 'showCustomProps',
                            img: 'https://view.form-create.com/img/version-541-1.png'
                        },
                        {
                            label: '组件属性配置',
                            value: 'showPropsForm',
                            img: 'https://view.form-create.com/img/showPropsForm.png'
                        },
                        {
                            label: '组件样式配置',
                            value: 'showStyleForm',
                            img: 'https://view.form-create.com/img/showStyleForm.png'
                        },
                        {
                            label: '组件事件配置',
                            value: 'showEventForm',
                            img: 'https://view.form-create.com/img/showEventForm.png'
                        },
                        {
                            label: '组件验证配置',
                            value: 'showValidateForm',
                            img: 'https://view.form-create.com/img/showValidateForm.png'
                        },
                        {
                            label: '只显示组件必填验证',
                            value: 'validateOnlyRequired',
                            img: 'https://pro.form-create.com/doc/img/validateOnlyRequired.png'
                        },
                    ],
                },
            ],
            activeFeature: {
                fieldReadonly: false,
                showSaveBtn: true,
            },
            defaultFeature: {
                hotKey: true,
                autoResetName: true,
                fieldReadonly: false,
                hiddenDragMenu: false,
                hiddenDragBtn: false,
                showAi: true,
                showMenuBar: true,
                showSaveBtn: false,
                showGridLine: true,
                showQuickLayout: true,
                showPreviewBtn: true,
                showPrintBtn: true,
                showConfig: true,
                showVariable: true,
                showJsonPreview: true,
                showCustomProps: true,
                showPageManage: true,
                showComponentName: true,
                showBaseForm: true,
                showControl: true,
                showAdvancedForm: true,
                showPropsForm: true,
                showStyleForm: true,
                showEventForm: true,
                showValidateForm: true,
                showFormConfig: true,
                showTemplate: true,
                showDevice: true,
                showInputData: true,
                showLanguage: true,
                showLabelConfig: true,
                exitConfirm: true,
            },
            defaultAuth: ['move', 'delete', 'copy', 'switchType', 'name', 'base', 'advanced', 'props', 'slots', 'style', 'validate', 'event'],
        };
    },
    computed: {
        items() {
            const items = [];
            this.menus.forEach(menu => {
                if (menu.name !== 'template' && menu.list) {
                    menu.list.forEach((item) => {
                        items.push({value: item.name, label: item.label});
                    });
                }
            })
            return items;
        },
        template() {
            const config = this.getConfig();
            return `<template>
    <fc-designer :config="config"${this.activeTheme === 'blue' ? '' : ' theme="' + this.activeTheme + '"'}${this.activeLocale === 'zh-cn' ? '' : ' :locale="' + this.activeLocale + '"'}></fc-designer>
</template>
<script setup>
    ${this.activeLocale === 'zh-cn' ? '' : `import ${this.activeLocale} from '@form-create/designer/locale/${this.activeLocale}.js`}
    const config=ref(${toJSON(config)})
<\/script>`
        },
    },
    watch: {
        template() {
            this.change();
        },
        dark() {
            this.change();
        },
        open(n) {
            if (n && !this.init) {
                this.init = true;
                this.menus.forEach((menu) => {
                    menu.open = true;
                    if (menu.list) {
                        menu.checked = menu.list.map(item => item.name);
                    }
                });
                this.addPermission();
                this.activeFeature = {
                    ...this.defaultFeature,
                    fieldReadonly: false,
                    showSaveBtn: true
                };
            }
        }
    },
    methods: {
        change() {
            if (!this.open) {
                return;
            }
            const value = this.getConfig(true);
            if (this.dark) {
                value.dark = true;
            }
            if (this.activeTheme !== 'blue') {
                value.theme = this.activeTheme;
            }
            if (this.activeLocale !== 'zh-cn') {
                value.locale = this.activeLocale;
            }
            this.$emit('change', value);
        },
        addPermission() {
            this.componentPermission.push({
                tag: [],
                permission: this.defaultAuth,
            })
        },
        getConfig(flag) {
            const config = {};
            Object.keys(this.activeFeature).forEach(k => {
                if (flag || this.activeFeature[k] !== this.defaultFeature[k]) {
                    config[k] = this.activeFeature[k];
                }
            })
            const componentPermission = [];
            this.componentPermission.forEach(item => {
                if (item.tag.length) {
                    const p = {
                        tag: item.tag,
                        permission: {},
                    };
                    this.defaultAuth.forEach(a => {
                        if (item.permission.indexOf(a) === -1) {
                            p.permission[a] = false;
                        }
                    })
                    componentPermission.push(p)
                }
            })
            if (componentPermission.length) {
                config.componentPermission = componentPermission;
            }
            const hiddenMenu = [];
            const hiddenItem = [];
            this.menus.forEach(menu => {
                if (menu.open === false) {
                    hiddenMenu.push(menu.name);
                } else if(menu.list) {
                    menu.list.forEach((item) => {
                        if (menu.checked?.indexOf(item.name) === -1) {
                            hiddenItem.push(item.name);
                        }
                    })
                }
            })
            if (hiddenMenu.length || flag) {
                config.hiddenMenu = hiddenMenu;
            }
            if (hiddenItem.length || flag) {
                config.hiddenItem = hiddenItem;
            }
            return config;
        },
        copy() {
            copyTextToClipboard(toJSON(this.getConfig()));
        }
    }
});
</script>

<style scoped>
@keyframes rotating {
    0% {
        transform: rotate(0)
    }

    to {
        transform: rotate(360deg)
    }
}

.designer-config-float {
    position: fixed;
    right: 0px;
    top: 300px;
    background-color: #2E73FF;
    cursor: pointer;
    padding: 4px;
    border-radius: 5px 0 0 4px;
    width: 40px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
    z-index: 1902;
}

.designer-config-float svg {
    animation: rotating 10s linear infinite;
}

.designer-config-panel {
    position: fixed;
    width: 600px;
    right: 0;
    overflow: auto;
    top: 0;
    bottom: 0;
    z-index: 1902;
    box-shadow: -2px 0 10px 0 rgba(0, 0, 0, 0.3);
    color: #262626;
}

.designer-config-panel /deep/ .el-checkbox__input + .el-checkbox__label {
    color: #262626 !important;
    font-weight: 400 !important;
    font-size: 13px !important;
}

.panel-container {
    background-color: #FFFFFF;
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
}

.panel-header-group {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: #FFFFFF;
    z-index: 10;
}

.panel-header {
    margin: 16px 16px 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.panel-title {
    overflow-wrap: break-word;
    color: #262626;
    font-size: 16px;
    font-weight: 500;
}

.collapse-icon {
    font-size: 26px;
    cursor: pointer;
}

.collapse-icon:before {
    display: inline-block;
    transform: rotate(45deg);
}

.panel-description {
    color: #AAAAAA;
    font-size: 12px;
    margin: 3px 0 0 15px;
}

.divider-line {
    background-color: #ECECEC;
    height: 1px;
    margin-top: 16px;
}

.section-subtitle {
    display: flex;
    align-items: center;
    margin: 26px 0 16px;
    font-size: 14px;
    padding-left: 10px;
    position: relative;
    margin-left: 16px;
}

.section-subtitle:before {
    content: " ";
    width: 2px;
    height: 20px;
    position: absolute;
    left: 0;
    display: block;
    background-color: #2E73FF;
}

.section-header {
    background-color: rgba(46, 115, 255, 0.05);
    margin: 24px 16px 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 36px;
}

.section-title {
    color: #2E73FF;
    font-size: 14px;
    font-weight: 500;
    margin-left: 11px;
}

.section-title a {
    color: #2E73FF;
    text-decoration: none;
}

.dropdown-icon {
    width: 11px;
    height: 6px;
    margin-right: 11px;
}

.theme-selector {
    background-color: rgba(46, 115, 255, 0.05);
    border-radius: 6px;
    width: 240px;
    margin: 20px auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.theme-option {
    border-radius: 4px;
    width: 115px;
    height: 30px;
    margin: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.theme-option.active {
    background-color: #ECECEC;
}

.theme-icon {
    width: 14px;
    height: 14px;
}

.theme-name {
    color: #262626;
    font-size: 14px;
    font-weight: 500;
    margin-left: 4px;
}

.theme-list {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    gap: 24px;
}

.theme-item {
    border: 2px solid #4272F7;
    height: 48px;
    width: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    cursor: pointer;
}

.theme-item-radio {
    background: #4272F7;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
}

.theme-item.orange {
    border-color: rgb(242, 112, 36);
}

.theme-item.orange .theme-item-radio {
    background-color: rgb(242, 112, 36);
}

.theme-item.green {
    border-color: rgb(24, 191, 130);
}

.theme-item.green .theme-item-radio {
    background-color: rgb(24, 191, 130);
}

.theme-item.purple {
    border-color: rgb(136, 76, 255);
}

.theme-item.purple .theme-item-radio {
    background-color: rgb(136, 76, 255);
}

.theme-item.pink {
    border-color: rgb(254, 103, 154);
}

.theme-item.pink .theme-item-radio {
    background-color: rgb(254, 103, 154);
}

.permission-block {
    padding: 12px 16px;
}

.permission-item {
    background: #F5F5F5;
    border-radius: 6px;
    padding: 15px;
    position: relative;
}

.permission-item .collapse-icon {
    position: absolute;
    right: -4px;
    top: -6px;
    background: red;
    color: #fff;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.permission-item + .permission-item {
    margin-top: 10px;
}

.permission-item .template-grid {
    background: unset;
    margin: 0;
}

.permission-add {
    font-size: 13px;
    color: #2E73FF;
    cursor: pointer;
    margin-top: 16px;
    display: inline-flex;
    align-items: center;
}

.setting-item {
    margin: 20px 16px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.setting-item .section-subtitle {
    margin-left: 0;
    margin-top: 0;
}

.item-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 39px;
}

.item-title {
    display: flex;
    align-items: center;
    color: #262626;
    font-size: 13px;
}

.item-title .fc-icon {
    cursor: pointer;
}

.item-img {
    display: block;
    width: 100%;
}

.item-description {
    color: #AAAAAA;
    font-size: 12px;
    margin-top: 2px;
    margin-left: 16px;
}

.template-grid {
    background-color: #F5F5F5;
    border-radius: 6px;
    padding: 15px;
    margin: 12px 16px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-row-gap: 24px;
    grid-column-gap: 8px;
}

.grid-item {
    display: flex;
    align-items: center;
    gap: 5px;
}

.code-editor {
    border-radius: 6px;
    min-height: 180px;
    border: 1px solid #DDDDDD;
    margin: 13px 16px 0 16px;
    position: relative;
    white-space: pre-line;
}

.action-buttons {
    position: absolute;
    bottom: 10px;
    right: 10px;
    left: 10px;
    display: flex;
    z-index: 10;
}

.action-button {
    width: 100%;
    border-radius: 6px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #2E73FF;
}

.button-text {
    color: #FFF;
    font-size: 14px;
    display: flex;
    align-items: center;
}
</style>