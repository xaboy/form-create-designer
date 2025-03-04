<template>
    <div id="app">
        <div class="_fc-top">
            <div v-if="topImg" @click="goPro" class="js-top-img top_img"
                 style="background: url('https://static.form-create.com/file/img/top2.jpg');height: 60px;background-repeat: no-repeat;background-size: cover;background-position: center;">
                <div class="container pos">
                    <div class="close" @click.stop="topImg = false">X</div>
                </div>
            </div>
            <div class="_fc-top-nav">
                <div class="_fc-top-copyright">
                    <img class="_fc-t-logo" src="http://form-create.com/logo.png" alt="logo"/>
                    <div class="_fc-t-name"><span>FcDesigner | <span style="font-size: 14px;">ElementUI 开源版</span></span></div>
                </div>
                <div class="_fc-top-link">
                    <a href="https://form-create.com/" target="_blank" class="item">官网</a>
                    <a href="https://pro.form-create.com/view" class="item pro-version">高级版🔥</a>
                    <a href="https://view.form-create.com/" target="_blank" class="item">文档</a>
                    <a href="https://form-create.com/v3/designer" target="_blank" class="item">Vue3版本</a>
                    <a href="https://github.com/xaboy/form-create-designer" target="_blank" class="item">查看源码</a>
                </div>
            </div>
        </div>
        <fc-designer ref="designer" :key="lang" :config="config" :handle="handle" :locale="locale">
            <template #handle>
                <div class="handle">
                    <el-dropdown @command="e=>e()" style="margin-right: 10px;">
                        <div class="el-dropdown-link">
                            <span>导入</span>
                            <i class="el-icon el-icon-arrow-down"></i>
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item :command="()=>setJson()">导入JSON</el-dropdown-item>
                                <el-dropdown-item :command="()=>setOption()">导入Options</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <el-dropdown @command="e=>e()">
                        <div class="el-dropdown-link">
                            <span>导出</span>
                            <i class="el-icon el-icon-arrow-down"></i>
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item :command="()=>showJson()">生成JSON</el-dropdown-item>
                                <el-dropdown-item :command="()=>showOption()">生成Options</el-dropdown-item>
                                <el-dropdown-item :command="()=>copyUrl()">生成预览链接</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </template>
        </fc-designer>

        <ElFooter class="_fc-copyright" height="30px">
            <div class="_fc-b-item">
                <iframe
                    src="https://ghbtns.com/github-btn.html?user=xaboy&repo=form-create-designer&type=star&count=true"
                    frameborder="0" scrolling="0" width="120" height="21" title="GitHub"></iframe>
            </div>
            <span style="margin: 0 10px;">|</span>
            <div class="_fc-b-item">
                <a href='https://gitee.com/xaboy/form-create-designer' target="_blank"
                   style="display: inline-flex;"><img
                    src='https://gitee.com/xaboy/form-create-designer/badge/star.svg?theme=dark' alt='gitee'/></a>
            </div>
            <span style="margin: 0 10px;">|</span>
            <div class="_fc-b-item">
                <a href="https://github.com/xaboy/form-create-designer" target="_blank" style="display: inline-flex;">
                    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="mit"/>
                </a>
            </div>
        </ElFooter>

        <el-dialog :title="title[type]" :visible.sync="state" class="_fc-t-dialog">
            <div ref="editor" v-if="state"></div>
            <span style="color: red;" v-if="err">输入内容格式有误!</span>
            <template #footer v-if="type > 2">
                <span slot="footer" class="dialog-footer">
            <el-button @click="state = false" size="small">取 消</el-button>
            <el-button type="primary" @click="onOk" size="small">确 定</el-button>
          </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import jsonlint from 'jsonlint-mod';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/lint/lint.css';
import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/json-lint';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/vue/vue';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/addon/mode/overlay';
import 'codemirror/addon/mode/simple';
import 'codemirror/addon/selection/selection-pointer';
import 'codemirror/mode/handlebars/handlebars';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/pug/pug';

import is from '@form-create/utils/lib/type';
import formCreate from '@form-create/element-ui';
import ZhCn from '../src/locale/zh-cn';
import En from '../src/locale/en';
import {copyTextToClipboard} from "../src/utils";

const CACHE_KEY = 'fc-config-$101';
const TITLE = ['生成规则', '表单规则', '生成组件', '设置生成规则', '设置表单规则'];

export default {
    name: 'app',
    data() {
        let data = window.location.hash.substring(1);
        let hashData = null;
        if (data) {
            try {
                hashData = JSON.parse(decodeURIComponent(escape(atob(data))));
            } catch (e) {
            }
        }
        return {
            state: false,
            value: null,
            title: TITLE,
            editor: null,
            err: false,
            type: -1,
            autoSaveId: null,
            lang: 'cn',
            locale: null,
            hashData,
            topImg: true,
            config: {
                fieldReadonly: false,
                showSaveBtn: true,
            },
            handle: [
                {
                    label: '中英切换',
                    handle: () => {
                        this.changeLocale();
                    },
                },
            ],
        };
    },
    watch: {
        state(n) {
            if (!n) {
                this.value = null;
                this.err = false;
            }
        },
        value() {
            this.load();
        }
    },
    methods: {
        goPro() {
            location.href = 'https://pro.form-create.com/view';
        },
        getCache() {
            function def() {
                return {opt: null, rule: null};
            }

            try {
                let cache = localStorage.getItem(CACHE_KEY);
                if (!cache) {
                    return def();
                }
                cache = JSON.parse(cache);
                cache.rule = formCreate.parseJson(cache.rule);
                return cache;
            } catch (e) {
                return def();
            }
        },
        setCache({opt, rule}) {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                opt,
                rule: formCreate.toJson(rule)
            }));
        },
        loadAutoSave() {
            const s = this.autosave;
            if (s === false) return;
            this.autoSaveId = setInterval(() => {
                this.setCache({opt: this.$refs.designer.getOption(), rule: this.$refs.designer.getRule()});
            }, is.Number(s) ? s : 2000);
        },
        changeLocale() {
            if (this.lang === 'cn') {
                this.locale = En;
                this.lang = 'en';
            } else {
                this.locale = ZhCn;
                this.lang = 'cn';
            }
        },
        load() {
            let val;
            if (this.type === 2) {
                val = this.value;
            } else if (this.type === 0) {
                val = formCreate.toJson(this.value, 2);
            } else {
                val = JSON.stringify(this.value, null, 2);
            }
            this.$nextTick(() => {
                this.editor = CodeMirror(this.$refs.editor, {
                    lineNumbers: true,
                    mode: this.type === 2 ? {name: 'vue'} : 'application/json',
                    gutters: ['CodeMirror-lint-markers'],
                    lint: true,
                    line: true,
                    tabSize: 2,
                    lineWrapping: true,
                    value: val || ''
                });
                this.editor.on('blur', () => {
                    this.err = this.editor.state.lint.marked.length > 0;
                });
            });
        },
        onValidationError(e) {
            this.err = e.length !== 0;
        },
        showJson() {
            this.state = true;
            this.type = 0;
            this.value = this.$refs.designer.getRule();
        },
        showOption() {
            this.state = true;
            this.type = 1;
            this.value = this.$refs.designer.getOption();
        },
        showTemplate() {
            this.state = true;
            this.type = 2;
            this.value = this.makeTemplate();
        },
        setJson() {
            this.state = true;
            this.type = 3;
            this.value = [];
        },
        setOption() {
            this.state = true;
            this.type = 4;
            this.value = {form: {}};
        },
        copyUrl() {
            const rule = this.$refs.designer.getJson();
            const options = this.$refs.designer.getOptionsJson();
            const str = btoa(unescape(encodeURIComponent(JSON.stringify({rule, options}))));
            copyTextToClipboard('https://form-create.com/designer#' + str);
        },
        onOk() {
            if (this.err) return;
            const json = this.editor.getValue();
            let val = JSON.parse(json);
            if (this.type === 3) {
                if (!Array.isArray(val)) {
                    this.err = true;
                    return;
                }
                this.$refs.designer.setRule(formCreate.parseJson(json));
            } else {
                if (!is.Object(val) || !val.form) {
                    this.err = true;
                    return;
                }
                this.$refs.designer.setOption(val);
            }
            this.state = false;
        },
        makeTemplate() {
            const rule = this.$refs.designer.getRule();
            const opt = this.$refs.designer.getOption();
            return `<template>
  <form-create
    v-model="fapi"
    :rule="rule"
    :option="option"
    @submit="onSubmit"
  ></form-create>
</template>

<script>
import formCreate from "@form-create/element-ui";

export default {
  data () {
    return {
        fapi: null,
        rule: formCreate.parseJson('${formCreate.toJson(rule).replaceAll('\\', '\\\\')}'),
        option: formCreate.parseJson('${JSON.stringify(opt)}')
    }
  },
  methods: {
    onSubmit (formData) {
      //todo 提交表单
    }
  }
}
<\/script>`;
        }
    },
    mounted() {
        if (this.hashData && this.hashData.rule) {
            this.$refs.designer.setRule(this.hashData.rule);
            if (this.hashData.options) {
                this.$refs.designer.setOptions(this.hashData.options);
            }
        } else {
            // const cache = this.getCache();
            // if (cache.rule) {
            //     this.$refs.designer.setRule(cache.rule);
            // }
            // if (cache.opt) {
            //     this.$refs.designer.setOption(cache.opt);
            // }
            // const cache = this.getCache();
            // if (cache.rule) {
            //     this.$refs.designer.setRule(cache.rule);
            // }
            // if (cache.opt) {
            //     this.$refs.designer.setOption(cache.opt);
            // }
            this.$refs.designer.setRule("[{\"type\":\"html\",\"native\":true,\"attrs\":{\"innerHTML\":\"\"},\"style\":{\"display\":\"block\",\"width\":\"100%\"},\"children\":[\"<div class=\\\"_fd-view-box\\\">\\n  <div class=\\\"title\\\">FormCreate 设计器开源版演示站</div>\\n  <div class=\\\"desc\\\">开源免费可商用的可视化表单设计器</div>\\n<div class=\\\"_fd-view-products\\\">\\n        <a class=\\\"_fd-view-product\\\" href=\\\"https://form-create.com/v3/designer\\\" target=\\\"_blank\\\">\\n            <div><div>ElementPlus版PC端设计器👨🏻‍💻(Vue3)</div><span>立即体验</span></div> <span>采用 Vue3.0 和 ElementPlus 进行页面构建</span>\\n        </a>\\n        <a class=\\\"_fd-view-product vue2\\\" href=\\\"https://form-create.com/designer\\\" target=\\\"_blank\\\">\\n            <div><div>ElementUI版PC端设计器👨🏻‍💻(Vue2)</div><span>立即体验</span></div> <span>采用 Vue2.7 和 ElementUI 进行页面构建</span>\\n        </a>\\n        <a class=\\\"_fd-view-product\\\" href=\\\"https://form-create.com/v3/mobile\\\" target=\\\"_blank\\\">\\n            <div><div>ElementPlus版移动端设计器📱(Vue3)</div><span>立即体验</span></div> <span>采用 Vue3.0 和 ElementPlus 进行页面构建，移动端采用Vant4.0</span>\\n        </a>\\n        <a class=\\\"_fd-view-product\\\" href=\\\"https://form-create.com/v3/antd/designer\\\" target=\\\"_blank\\\">\\n            <div><div>Ant Design Vue版PC端设计器👨🏻‍💻(Vue3)</div><span>立即体验</span></div> <span>采用 Vue3.0 和 Ant Design Vue 进行页面构建</span>\\n        </a>\\n    </div>\\n</div>\"],\"_fc_id\":\"id_Fr6ym35jirw4acc\",\"name\":\"ref_Fcfnm35jirw4adc\",\"_fc_drag_tag\":\"html\",\"display\":true,\"hidden\":false},{\"type\":\"html\",\"native\":true,\"attrs\":{\"innerHTML\":\"\"},\"style\":{\"display\":\"block\",\"width\":\"100%\"},\"children\":[\"<div class=\\\"_fd-view-box\\\">\\n  <div class=\\\"title\\\">FormCreate 设计器<span style=\\\"color:#cd7f32;\\\">高级版</span>演示站</div>\\n  <div class=\\\"desc\\\">全面实现多端表单设计，为企业提供低代码表单解决方案</div>\\n<div class=\\\"_fd-view-products\\\">\\n        <a class=\\\"_fd-view-product\\\" href=\\\"https://pro.form-create.com/view\\\" target=\\\"_blank\\\">\\n            <div><div>ElementPlus版PC端设计器👨🏻‍💻(Vue3)</div><span>立即体验</span></div> <span>采用 Vue3.0 和 ElementPlus 进行页面构建</span>\\n        </a>\\n        <a class=\\\"_fd-view-product vue2\\\" href=\\\"https://pro.form-create.com/vue2/view\\\" target=\\\"_blank\\\">\\n            <div><div>ElementUI版PC端设计器👨🏻‍💻(Vue2)</div><span>立即体验</span></div> <span>采用 Vue2.7 和 ElementUI 进行页面构建</span>\\n        </a>\\n        <a class=\\\"_fd-view-product\\\" href=\\\"https://pro.form-create.com/mobile\\\" target=\\\"_blank\\\">\\n            <div><div>ElementPlus版移动端设计器📱(Vue3)</div><span>立即体验</span></div> <span>采用 Vue3.0 和 ElementPlus 进行页面构建，移动端采用Vant4.0</span>\\n        </a>\\n        <a class=\\\"_fd-view-product vue2\\\" href=\\\"https://pro.form-create.com/vue2/mobile\\\" target=\\\"_blank\\\">\\n            <div><div>ElementUI版移动端设计器📱(Vue2)</div><span>立即体验</span></div> <span>采用 Vue2.7 和 ElementUI 进行页面构建，移动端采用Vant2.0</span>\\n        </a>\\n        <a class=\\\"_fd-view-product\\\" href=\\\"https://pro.form-create.com/antd/view\\\" target=\\\"_blank\\\">\\n            <div><div>Ant Design Vue版PC端设计器👨🏻‍💻(Vue3)</div><span>立即体验</span></div> <span>采用 Vue3.0 和 Ant Design Vue 进行页面构建</span>\\n        </a>\\n        <a class=\\\"_fd-view-product vue2\\\" href=\\\"https://pro.form-create.com/vue2/antd/view\\\" target=\\\"_blank\\\">\\n            <div><div>Ant Design Vue版PC端设计器👨🏻‍💻(Vue2)</div><span>立即体验</span></div> <span>采用 Vue2.7 和 Ant Design Vue 进行页面构建</span>\\n        </a>\\n        <a class=\\\"_fd-view-product\\\" href=\\\"https://pro.form-create.com/antd/mobile\\\" target=\\\"_blank\\\">\\n            <div><div>Ant Design Vue版移动端设计器📱(Vue3)</div><span>立即体验</span></div> <span>采用 Vue3.0 和 Ant Design Vue 进行页面构建，移动端采用Vant4.0</span>\\n        </a>\\n        <a class=\\\"_fd-view-product vue2\\\" href=\\\"https://pro.form-create.com/vue2/antd/mobile\\\" target=\\\"_blank\\\">\\n            <div><div>Ant Design Vue版移动端设计器📱(Vue2)</div><span>立即体验</span></div> <span>采用 Vue2.7 和 Ant Design Vue 进行页面构建，移动端采用Vant2.0</span>\\n        </a>\\n    </div>\\n</div>\"],\"_fc_id\":\"id_Fv9um7t07ek9abc\",\"name\":\"ref_Fwthm7t07ek9acc\",\"_fc_drag_tag\":\"html\",\"display\":true,\"hidden\":false}]");
            this.$refs.designer.setOption({
                language: {
                    "zh-cn": {
                        "Az87OmQS": "商品名称",
                        "BAVvUidu": "商品价格",
                        "CkD1fG2H": "商品描述",
                        "DgH2iJ3K": "库存数量",
                        "EhI3jK4L": "发货方式",
                        "FiJ4kL5M": "配送时间",
                        "GjK5lM6N": "用户评价",
                        "HkL6mN7O": "添加到购物车",
                        "IkM7nO8P": "立即购买",
                        "JlN8oP9Q": "优惠活动",
                        "KmO9pQ0R": "搜索商品",
                        "LnP0qR1S": "分类",
                        "MoQ1rS2T": "品牌",
                        "NpR2sT3U": "付款方式",
                        "OqS3tU4V": "订单确认",
                        "PrT4uV5W": "用户注册",
                        "QsU5vW6X": "用户登录",
                        "RtV6wX7Y": "联系客服",
                        "SuW7xY8Z": "退出登录",
                        "TvX8yZ9A": "个人信息",
                        "UwY9zA0B": "购物车",
                        "VxZ0aB1C": "结算",
                        "WyA1bC2D": "运费",
                        "XzB2cD3E": "订单状态",
                        "YaC3dE4F": "支付成功",
                        "ZbD4eF5G": "支付失败"
                    },
                    "en": {
                        "Az87OmQS": "Goods name",
                        "BAVvUidu": "Goods price",
                        "CkD1fG2H": "Product description",
                        "DgH2iJ3K": "Stock quantity",
                        "EhI3jK4L": "Shipping method",
                        "FiJ4kL5M": "Delivery time",
                        "GjK5lM6N": "User reviews",
                        "HkL6mN7O": "Add to cart",
                        "IkM7nO8P": "Buy now",
                        "JlN8oP9Q": "Promotions",
                        "KmO9pQ0R": "Search products",
                        "LnP0qR1S": "Category",
                        "MoQ1rS2T": "Brand",
                        "NpR2sT3U": "Payment method",
                        "OqS3tU4V": "Order confirmation",
                        "PrT4uV5W": "User registration",
                        "QsU5vW6X": "User login",
                        "RtV6wX7Y": "Contact customer service",
                        "SuW7xY8Z": "Logout",
                        "TvX8yZ9A": "Personal information",
                        "UwY9zA0B": "Shopping cart",
                        "VxZ0aB1C": "Checkout",
                        "WyA1bC2D": "Shipping fee",
                        "XzB2cD3E": "Order status",
                        "YaC3dE4F": "Payment successful",
                        "ZbD4eF5G": "Payment failed"
                    }
                }
            });
        }
        this.$nextTick(() => {
            this.loadAutoSave();
        });
    },
    beforeDestroy() {
        const id = this.autoSaveId;
        id && clearInterval(id);
    },
    beforeCreate() {
        window.jsonlint = jsonlint;
    }
};


</script>

<style>
._fc-top {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    position: relative;
    cursor: default;
}

:focus-visible {
    outline: 0 none;
}

.top_img {
    cursor: pointer;
}

._fc-top .close {
    position: absolute;
    right: 15px;
    top: 6px;
    color: #FFFFFF;
    background-color: #c6c6c652;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    cursor: pointer;
}

._fc-top-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 20px;
}

._fc-top-copyright {
    display: flex;
}

._fc-top-link {
}

._fc-top a {
    height: 35px;
    font-size: 14px;
    line-height: 35px;
    color: #333;
    text-decoration: none;
}

._fc-top a + a {
    margin-left: 20px;
}

._fc-t-header {
    height: 60px;
    margin: 0 20px;
    position: relative;
    display: flex;
    align-items: center;
    cursor: default;
}

._fc-t-logo {
    height: 26px;
}

._fc-t-name {
    display: inline-block;
    color: #282828;
    font-size: 18px;
    font-weight: 600;
    margin-left: 5px;
}

._fc-t-menu {
    position: absolute;
    right: 0;
}

._fc-t-menu i {
    font-size: 12px;
}

.handle {
    display: flex;
    align-items: center;
    margin-right: 15px;
}

._fc-t-menu .el-dropdown, .handle .el-dropdown {
    cursor: pointer;
}

.handle .el-icon {
    margin-left: 0;
}

body {
    min-height: 100vh;
    padding: 0;
    margin: 0;
    display: flex !important;
    flex-direction: column !important;
}

#app {
    display: flex;
    flex-direction: column;
    flex: 1;
}

._fc-copyright {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px;
    font-size: 16px;
    border-top: 1px solid #ECECEC;
    background-color: #fff;
    cursor: pointer;
}

._fc-t-dialog .CodeMirror {
    height: 450px;
}

._fc-t-dialog .CodeMirror-line {
    line-height: 16px !important;
    font-size: 13px !important;
}

.CodeMirror-lint-tooltip {
    z-index: 2021 !important;
}

._fc-t-dialog .el-dialog__body {
    padding: 0px 20px;
}

._fc-b-item {
    display: flex;
}

._fc-zz {
    background-image: -webkit-linear-gradient(left, #cd7f32, #d81159 10%, #ffbc42 20%, #75d701 30%, #30a9de 40%, #d81159 60%, #ffbc42 70%, #75d701 80%, #30a9de 90%, #cd7f32);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    background-size: 200% 100%;
    -webkit-animation: flowlight 5s linear infinite;
    animation: flowlight 5s linear infinite;
    font-weight: 700;
}

@keyframes flowlight {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: -100% 0;
    }
}

@-webkit-keyframes flowlight {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: -100% 0;
    }
}

.pro-version {
    color: #cd7f32 !important;
    font-weight: 600;
}

._fd-view-box > .title {
    font-weight: 800;
    font-size: 30px;
    line-height: 56px;
    color: #333333;
    text-align: center;
}

._fd-view-box > .desc {
    text-align: center;
    font-size: 16px;
    line-height: 25px;
    color: #666666;
}

._fd-view-products {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    grid-gap: 10px;
    padding: 10px;
    z-index: 1901;
    position: relative;
    box-sizing: border-box;
}

._fd-view-product {
    font-size: 12px;
    font-weight: 400;
    color: rgb(153, 153, 153);
    margin-bottom: 12px;
    border: 1px solid rgb(207, 222, 243);
    border-radius: 4px;
    background: center center / cover no-repeat #f6faff30;
    box-shadow: rgba(3, 51, 123, 0.08) 0px 5px 15px 1px;
    padding: 14px;
    background-image: url(data:image/png;base64,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i637rg08Zm8DpNFsHX4WbY29Q4ZqooR3QI0jJMEjCQydgDWSEfNGsLRDhcjQLxEz4OIVCI2GM/T461FihmYRCZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZDA/waB/wJtBVtyNP/YuwAAAABJRU5ErkJggg==);
    background-position: right;
    background-size: auto;
    cursor: pointer;
    transition: background-color ease .3s;
    opacity: 0.95;
    text-decoration: none;
}

._fd-view-product.vue2 {
    border-color: #CCF6D5;
    background: center center / cover no-repeat #e6fae630;
    background-image: url(data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAQ4AAAB8CAYAAACYLF7bAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFG2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4wLWMwMDAgNzkuZGFiYWNiYiwgMjAyMS8wNC8xNC0wMDozOTo0NCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjQgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDI0LTEyLTIzVDIxOjAwOjE4KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNC0xMi0yM1QyMToxNzowNSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0xMi0yM1QyMToxNzowNSswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkMTEyOWQwYS1jMzEy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);
}

._fd-view-product.vue2 > div {
    color: #00C050;
}

._fd-view-product:hover {
    background-color: #FFFFFF;
    color: rgb(153, 153, 153);
}

._fd-view-product > div {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    font-weight: 600;
    font-size: 15px;
    color: #2E73FF;
    margin-bottom: 6px;
}

._fd-view-product > div > span {
    font-size: 14px;
}
</style>
